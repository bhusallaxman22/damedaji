import { notFound } from "next/navigation";

import { ResearchDetailTemplate } from "@/components/templates/research-detail-template";
import { getPublicationBySlug } from "@/lib/publication-service";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const publication = await getPublicationBySlug(slug);
    if (!publication) {
        return { title: "Publication Not Found" };
    }

    return {
        title: `${publication.title} | Damodar Gautam`,
        description: publication.summary,
    };
}

export default async function ResearchDetailsPage({ params }) {
    const { slug } = await params;
    const publication = await getPublicationBySlug(slug);

    if (!publication) {
        notFound();
    }

    return <ResearchDetailTemplate publication={publication} />;
}
