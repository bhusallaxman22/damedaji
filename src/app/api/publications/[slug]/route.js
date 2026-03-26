import { NextResponse } from "next/server";

import { getPublicationBySlug } from "@/lib/publication-service";

export async function GET(_request, { params }) {
    const { slug } = await params;
    const publication = await getPublicationBySlug(slug);
    if (!publication) {
        return NextResponse.json({ message: "Publication not found" }, { status: 404 });
    }

    return NextResponse.json(publication);
}
