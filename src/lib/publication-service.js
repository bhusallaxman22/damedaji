import { defaultPublications } from "./default-publications.js";
import { getPool, withConnection } from "./db.js";
import { slugify } from "./slug.js";

function mapDbRecord(record) {
    return {
        id: record.id,
        slug: record.slug,
        title: record.title,
        authors: record.authors,
        venue: record.venue,
        year: record.year,
        citationCount: record.citation_count,
        abstractText: record.abstract_text,
        summary: record.summary,
        methodology: record.methodology,
        findings: record.findings,
        conclusion: record.conclusion,
        type: record.type,
        sourceLabel: record.source_label,
        sourceUrl: record.source_url,
        createdAt: record.created_at,
        updatedAt: record.updated_at,
    };
}

export async function ensurePublicationTable() {
    const pool = getPool();
    if (!pool) return;

    await withConnection(async (connection) => {
        await connection.query(`
      CREATE TABLE IF NOT EXISTS publications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        slug VARCHAR(255) NOT NULL UNIQUE,
        title TEXT NOT NULL,
        authors TEXT,
        venue TEXT,
        year INT,
        citation_count INT DEFAULT 0,
        abstract_text LONGTEXT,
        summary LONGTEXT,
        methodology LONGTEXT,
        findings LONGTEXT,
        conclusion LONGTEXT,
        type VARCHAR(64),
        source_label VARCHAR(255),
        source_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_publications_year (year),
        INDEX idx_publications_type (type)
      );
    `);
    });
}

export async function upsertPublications(publications) {
    const pool = getPool();
    if (!pool || publications.length === 0) {
        return { inserted: 0, updated: 0 };
    }

    await ensurePublicationTable();

    let inserted = 0;
    let updated = 0;

    await withConnection(async (connection) => {
        for (const publication of publications) {
            const slug = slugify(publication.slug || publication.title);
            const existing = await connection.query("SELECT id FROM publications WHERE slug = ? LIMIT 1", [slug]);

            await connection.query(
                `
        INSERT INTO publications (
          slug, title, authors, venue, year, citation_count, abstract_text,
          summary, methodology, findings, conclusion, type, source_label, source_url
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          title = VALUES(title),
          authors = VALUES(authors),
          venue = VALUES(venue),
          year = VALUES(year),
          citation_count = VALUES(citation_count),
          abstract_text = VALUES(abstract_text),
          summary = VALUES(summary),
          methodology = VALUES(methodology),
          findings = VALUES(findings),
          conclusion = VALUES(conclusion),
          type = VALUES(type),
          source_label = VALUES(source_label),
          source_url = VALUES(source_url)
      `,
                [
                    slug,
                    publication.title,
                    publication.authors || "",
                    publication.venue || "",
                    publication.year || null,
                    publication.citationCount || 0,
                    publication.abstractText || "",
                    publication.summary || publication.abstractText || "",
                    publication.methodology || "",
                    publication.findings || "",
                    publication.conclusion || "",
                    publication.type || "Research",
                    publication.sourceLabel || "Google Scholar",
                    publication.sourceUrl || "",
                ]
            );

            if (existing.length > 0) {
                updated += 1;
            } else {
                inserted += 1;
            }
        }
    });

    return { inserted, updated };
}

export async function listPublications({ query = "", type = "All" } = {}) {
    const pool = getPool();
    if (!pool) {
        return defaultPublications.filter((publication) => {
            const matchesType = type === "All" || publication.type === type;
            const matchesQuery =
                query.trim().length === 0 ||
                `${publication.title} ${publication.venue} ${publication.summary}`.toLowerCase().includes(query.toLowerCase());
            return matchesType && matchesQuery;
        });
    }

    await ensurePublicationTable();

    const rows = await withConnection(async (connection) => {
        const conditions = [];
        const params = [];

        if (type && type !== "All") {
            conditions.push("type = ?");
            params.push(type);
        }

        if (query.trim()) {
            conditions.push("(title LIKE ? OR venue LIKE ? OR summary LIKE ? OR authors LIKE ?)");
            const wildcard = `%${query.trim()}%`;
            params.push(wildcard, wildcard, wildcard, wildcard);
        }

        const where = conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
        return connection.query(`SELECT * FROM publications ${where} ORDER BY year DESC, citation_count DESC, id DESC`, params);
    });

    return rows.map(mapDbRecord);
}

export async function getPublicationBySlug(slug) {
    const pool = getPool();
    if (!pool) {
        return defaultPublications.find((publication) => publication.slug === slug) || null;
    }

    await ensurePublicationTable();

    const rows = await withConnection((connection) =>
        connection.query("SELECT * FROM publications WHERE slug = ? LIMIT 1", [slug])
    );

    if (rows.length === 0) {
        return null;
    }

    return mapDbRecord(rows[0]);
}

export async function seedDefaultPublications() {
    return upsertPublications(defaultPublications);
}
