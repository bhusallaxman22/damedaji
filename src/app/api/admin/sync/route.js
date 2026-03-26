import { NextResponse } from "next/server";

import { scrapeScholarProfile } from "@/lib/google-scholar";
import { ensurePublicationTable, upsertPublications } from "@/lib/publication-service";

function unauthorized() {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
}

export async function POST(request) {
    const configuredToken = process.env.ADMIN_SYNC_TOKEN;
    const incomingToken = request.headers.get("x-admin-token");

    if (!configuredToken || incomingToken !== configuredToken) {
        return unauthorized();
    }

    const body = await request.json().catch(() => ({}));
    const userId = body.userId || process.env.SCHOLAR_USER_ID;

    if (!userId) {
        return NextResponse.json(
            { message: "Provide userId in body or SCHOLAR_USER_ID in environment." },
            { status: 400 }
        );
    }

    await ensurePublicationTable();
    const publications = await scrapeScholarProfile(userId);
    const result = await upsertPublications(publications);

    return NextResponse.json({
        processed: publications.length,
        ...result,
    });
}
