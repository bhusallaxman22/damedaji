import "dotenv/config";

import { closePool } from "../src/lib/db.js";
import { ensurePublicationTable, seedDefaultPublications } from "../src/lib/publication-service.js";

async function main() {
    await ensurePublicationTable();
    const seeded = await seedDefaultPublications();
    console.log("Database initialized.");
    console.log(`Seeded default publications: inserted=${seeded.inserted}, updated=${seeded.updated}`);
}

main()
    .catch((error) => {
        console.error("Failed to initialize database", error);
        process.exitCode = 1;
    })
    .finally(async () => {
        await closePool();
    });
