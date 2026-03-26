import { HomeTemplate } from "@/components/templates/home-template";
import { listPublications } from "@/lib/publication-service";

export const dynamic = "force-dynamic";

export default async function HomePage() {
    const publications = await listPublications();
    return <HomeTemplate publications={publications} />;
}
