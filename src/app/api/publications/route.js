import { NextResponse } from "next/server";

import { listPublications } from "@/lib/publication-service";

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || "";
    const type = searchParams.get("type") || "All";

    const publications = await listPublications({ query, type });
    return NextResponse.json({ count: publications.length, publications });
}
