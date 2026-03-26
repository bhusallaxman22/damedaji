import "dotenv/config";

import { closePool } from "../src/lib/db.js";
import { scrapeScholarProfile } from "../src/lib/google-scholar.js";
import { ensurePublicationTable, upsertPublications } from "../src/lib/publication-service.js";

function getArg(name) {
    const arg = process.argv.find((item) => item.startsWith(`--${name}=`));
    return arg ? arg.split("=").slice(1).join("=") : undefined;
}

async function main() {
    const userId = getArg("user") || process.env.SCHOLAR_USER_ID;
    if (!userId) {
        throw new Error("Missing Scholar user ID. Provide --user=<GOOGLE_SCHOLAR_USER_ID> or SCHOLAR_USER_ID in .env.");
    }

    await ensurePublicationTable();
    const publications = await scrapeScholarProfile(userId);

    if (publications.length === 0) {
        console.log("No publications found from Google Scholar response.");
        return;
    }

    const result = await upsertPublications(publications);
    console.log(`Scholar sync complete: ${publications.length} records processed.`);
    console.log(`Inserted: ${result.inserted}`);
    console.log(`Updated: ${result.updated}`);
}

main()
    .catch((error) => {
        console.error("Scholar sync failed", error.message);
        process.exitCode = 1;
    })
    .finally(async () => {
        await closePool();
    });
