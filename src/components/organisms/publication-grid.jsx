import { Empty } from "antd";

import { PublicationCard } from "@/components/molecules/publication-card";

export function PublicationGrid({ publications }) {
    if (!publications.length) {
        return <Empty description="No publications match this search." />;
    }

    return <div className="publication-list">{publications.map((publication) => <PublicationCard key={publication.slug} publication={publication} />)}</div>;
}
