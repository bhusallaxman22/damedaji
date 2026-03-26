import Link from "next/link";
import { ArrowLeftOutlined, LinkOutlined } from "@ant-design/icons";

export function ResearchDetailTemplate({ publication }) {
    return (
        <main className="detail-shell publication-page">
            <div className="detail-stack">
                <Link href="/" className="detail-back-link">
                    <ArrowLeftOutlined />
                    <span>Back to publications</span>
                </Link>

                <header className="publication-header">
                    <div className="publication-header-main">
                        <div className="detail-hero-meta">
                            <span className="publication-chip publication-chip-accent">{publication.type}</span>
                            <span className="publication-chip publication-chip-neutral">{publication.year || "N/A"}</span>
                            <span className="publication-chip publication-chip-soft">{publication.citationCount || 0} citations</span>
                        </div>

                        <h1 className="detail-title">{publication.title}</h1>
                        <p className="detail-summary">{publication.summary}</p>
                    </div>

                    <aside className="publication-facts">
                        <article className="detail-fact-card">
                            <span className="detail-fact-label">Authors</span>
                            <p>{publication.authors || "N/A"}</p>
                        </article>
                        <article className="detail-fact-card">
                            <span className="detail-fact-label">Venue</span>
                            <p>{publication.venue || "N/A"}</p>
                        </article>
                        <article className="detail-fact-card">
                            <span className="detail-fact-label">Source</span>
                            <p>{publication.sourceLabel || "N/A"}</p>
                        </article>

                        {publication.sourceUrl ? (
                            <a className="detail-source-link" href={publication.sourceUrl} target="_blank" rel="noreferrer">
                                <LinkOutlined />
                                <span>Open source</span>
                            </a>
                        ) : null}
                    </aside>
                </header>

                <article className="publication-article">
                    <section className="detail-sections">
                        <article className="detail-content-card">
                            <span className="section-overline">Methodology</span>
                            <h2>Methodology</h2>
                            <p>{publication.methodology}</p>
                        </article>

                        <article className="detail-content-card">
                            <span className="section-overline">Findings</span>
                            <h2>Findings</h2>
                            <p>{publication.findings}</p>
                        </article>

                        <article className="detail-content-card">
                            <span className="section-overline">Conclusion</span>
                            <h2>Conclusion</h2>
                            <p>{publication.conclusion}</p>
                        </article>
                    </section>
                </article>
            </div>
        </main>
    );
}
