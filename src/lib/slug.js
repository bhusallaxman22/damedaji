export function slugify(input) {
    return String(input)
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "");
}

export function publicationTypeFromTitle(title) {
    const normalized = title.toLowerCase();
    if (normalized.includes("review") || normalized.includes("scenario")) {
        return "Applied";
    }
    if (normalized.includes("willingness to pay") || normalized.includes("efficiency")) {
        return "Research";
    }
    if (normalized.includes("status") || normalized.includes("profile")) {
        return "Identity";
    }
    return "Research";
}
