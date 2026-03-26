"use client";

import { useMemo, useState } from "react";
import { Typography } from "antd";
import { motion } from "framer-motion";

import { SearchFilterBar } from "@/components/molecules/search-filter-bar";
import { HeroSection } from "@/components/organisms/hero-section";
import { PublicationGrid } from "@/components/organisms/publication-grid";
import { StatCard } from "@/components/atoms/stat-card";

const { Paragraph, Title } = Typography;

const filters = ["All", "Research", "Applied", "Identity"];

export function HomeTemplate({ publications }) {
    const [query, setQuery] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");

    const totalCitations = publications.reduce((sum, publication) => sum + (publication.citationCount || 0), 0);
    const latestYear = publications.reduce((latest, publication) => Math.max(latest, publication.year || 0), 0);
    const spotlight = [...publications].sort((left, right) => (right.year || 0) - (left.year || 0))[0];

    const filtered = useMemo(() => {
        return publications.filter((publication) => {
            const matchesFilter = activeFilter === "All" || publication.type === activeFilter;
            const q = query.trim().toLowerCase();
            const text = `${publication.title} ${publication.venue} ${publication.authors} ${publication.summary}`.toLowerCase();
            const matchesQuery = !q || text.includes(q);
            return matchesFilter && matchesQuery;
        });
    }, [activeFilter, publications, query]);

    const stats = [
        { label: "Publications", value: String(publications.length).padStart(2, "0"), detail: "Peer-reviewed and applied research." },
        {
            label: "Citations",
            value: String(totalCitations).padStart(2, "0"),
            detail: "Recorded across the listed publications.",
        },
        {
            label: "Research Areas",
            value: "4",
            detail: "Agriculture, seed systems, environmental economics, rural development.",
        },
    ];

    const archiveStats = [
        { label: "Latest year", value: latestYear ? String(latestYear) : "Live" },
        { label: "Publications", value: String(publications.length).padStart(2, "0") },
        { label: "Themes", value: "04" },
    ];

    return (
        <main className="page-shell portfolio-page">
            <HeroSection
                areas={["Environmental Economics", "Agricultural Research", "Seed Adoption", "Rural Development"]}
                spotlight={spotlight}
                stats={archiveStats}
            />

            <section className="overview-band">
                <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="overview-grid">
                    <div className="overview-copy">
                        <span className="section-overline">Overview</span>
                        <Title level={2} className="section-title">
                            Research grounded in Nepal&apos;s farming systems
                        </Title>
                        <Paragraph className="section-description">
                            The work spans crop adoption, seed-system performance, value chains, soil management, and climate-related
                            production challenges, with a strong emphasis on practical agricultural outcomes.
                        </Paragraph>
                    </div>

                    <div className="overview-note">
                        <span className="section-side-note-label">Current emphasis</span>
                        <p>
                            Lentil seed adoption, production efficiency, underutilized crops, and evidence that informs rural
                            development policy and practice.
                        </p>
                    </div>
                </motion.div>

                <div className="stats-grid">
                    {stats.map((item) => (
                        <StatCard key={item.label} {...item} />
                    ))}
                </div>
            </section>

            <section id="publications" className="works-section">
                <div className="works-header">
                    <div>
                        <span className="section-overline">Publications</span>
                        <Title level={2} className="section-title">
                            Selected work
                        </Title>
                        <Paragraph className="section-description">
                            Journal articles and applied studies presented as a readable research archive.
                        </Paragraph>
                    </div>

                    <div className="works-tally">
                        <span>{filtered.length}</span>
                        <p>entries</p>
                    </div>
                </div>

                <SearchFilterBar
                    query={query}
                    onQueryChange={setQuery}
                    activeFilter={activeFilter}
                    onFilterChange={setActiveFilter}
                    filters={filters}
                />

                <div className="publication-grid-wrap">
                    <PublicationGrid publications={filtered} />
                </div>
            </section>
        </main>
    );
}
