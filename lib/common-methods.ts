import { getCategoryBySlug } from "./category";

export function getUTCDateTime() {
    const now = new Date();
    const year = now.getUTCFullYear();
    const month = now.getUTCMonth() + 1; // Months are zero-indexed
    const day = now.getUTCDate();
    const hours = now.getUTCHours().toString().padStart(2, "0");
    const minutes = now.getUTCMinutes().toString().padStart(2, "0");
    const seconds = now.getUTCSeconds().toString().padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
}

export async function generateSlug(name: string) {

    const slug = name.toLowerCase().replace(" ", "-");
    let uniqueSlug = slug;
    let suffix = 1;

    while (await getCategoryBySlug(uniqueSlug)) {
        uniqueSlug = `${slug}-${suffix}`;
        suffix++;
    }

    return uniqueSlug;

}