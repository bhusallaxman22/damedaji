import Link from "next/link";
import { ArrowRightOutlined } from "@ant-design/icons";

export function PublicationCard({ publication }) {
    const summaryWords = (publication.summary || "").split(/\s+/).filter(Boolean);
    const summaryPreview = summaryWords.length > 12 ? `${summaryWords.slice(0, 12).join(" ")}...` : publication.summary;

    return (
        <Link href={`/research/${publication.slug}`} className="publication-card-link">
            <article className="publication-card">
                <div className="publication-card-year-block">
                    <span className="publication-card-year">{publication.year || "N/A"}</span>
                </div>

                <div className="publication-card-copy">
                    <p className="publication-card-venue">{publication.venue || "Publication venue unavailable"}</p>
                    <h3 className="publication-card-title">{publication.title}</h3>
                    <p className="publication-card-summary">{summaryPreview}</p>
                </div>

                <div className="publication-card-side">
                    <div className="publication-card-meta">
                        <span className="publication-chip publication-chip-neutral">{publication.year || "N/A"}</span>
                        <span className="publication-chip publication-chip-accent">{publication.type}</span>
                        <span className="publication-chip publication-chip-soft">{publication.citationCount || 0} citations</span>
                    </div>

                    <div className="publication-card-footer">
                        <span>Read publication</span>
                        <ArrowRightOutlined />
                    </div>
                </div>
            </article>
        </Link>
    );
}
