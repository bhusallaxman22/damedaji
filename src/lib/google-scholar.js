import axios from "axios";
import * as cheerio from "cheerio";

import { publicationTypeFromTitle, slugify } from "./slug.js";

function toAbsoluteScholarUrl(href) {
    if (!href) return "";
    if (href.startsWith("http")) return href;
    return `https://scholar.google.com${href}`;
}

function parseNumber(text) {
    const normalized = String(text || "")
        .replace(/,/g, "")
        .replace(/[^0-9]/g, "");
    const value = Number(normalized);
    return Number.isFinite(value) ? value : 0;
}

async function fetchCitationDetail(citationHref) {
    if (!citationHref) {
        return { abstractText: "", sourceUrl: "" };
    }

    const sourceUrl = toAbsoluteScholarUrl(citationHref);
    try {
        const { data } = await axios.get(sourceUrl, {
            timeout: 12000,
            headers: {
                "User-Agent":
                    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
            },
        });

        const $ = cheerio.load(data);
        const abstractText = $("#gsc_oci_descr").text().trim();
        const sourceAnchor = $("#gsc_oci_title_gg").find("a").first();
        const outbound = sourceAnchor.attr("href") || sourceUrl;

        return {
            abstractText,
            sourceUrl: outbound,
        };
    } catch {
        return {
            abstractText: "",
            sourceUrl,
        };
    }
}

function buildSections(publication) {
    const yearText = publication.year ? ` in ${publication.year}` : "";

    const summary = publication.abstractText
        ? publication.abstractText
        : `This publication presents a focused analysis of ${publication.title.toLowerCase()}${yearText}.`;

    return {
        summary,
        methodology: `This project is documented in ${publication.venue || "the listed venue"} and has been presented as a structured research case derived from Google Scholar metadata and public citation details.`,
        findings: `The publication has currently recorded ${publication.citationCount} citations on Google Scholar, indicating its observed scholarly attention at the time of synchronization.`,
        conclusion: "The work contributes to the broader research portfolio and is archived here with a project-style reading experience for easier communication.",
    };
}

export async function scrapeScholarProfile(userId) {
    const profileUrl = `https://scholar.google.com/citations?hl=en&user=${userId}&cstart=0&pagesize=100`;

    const { data } = await axios.get(profileUrl, {
        timeout: 15000,
        headers: {
            "User-Agent":
                "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
        },
    });

    const $ = cheerio.load(data);
    const rows = $(".gsc_a_tr").toArray();

    const publications = [];
    for (const row of rows) {
        const rowNode = $(row);
        const titleAnchor = rowNode.find(".gsc_a_at").first();
        const title = titleAnchor.text().trim();
        if (!title) continue;

        const authors = rowNode.find(".gs_gray").eq(0).text().trim();
        const venue = rowNode.find(".gs_gray").eq(1).text().trim();
        const citationCount = parseNumber(rowNode.find(".gsc_a_c a").first().text());
        const year = parseNumber(rowNode.find(".gsc_a_y span").first().text());
        const citationHref = titleAnchor.attr("href");
        const detail = await fetchCitationDetail(citationHref);

        const publication = {
            title,
            slug: slugify(title),
            authors,
            venue,
            year,
            citationCount,
            abstractText: detail.abstractText,
            type: publicationTypeFromTitle(title),
            sourceLabel: "Google Scholar",
            sourceUrl: detail.sourceUrl || toAbsoluteScholarUrl(citationHref),
        };

        const sections = buildSections(publication);
        publications.push({ ...publication, ...sections });
    }

    return publications;
}
