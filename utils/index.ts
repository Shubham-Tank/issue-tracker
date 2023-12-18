export function createSlug(text: string): string {
  // Convert to lowercase
  let slug = text.toLowerCase();

  // Remove special characters, replace spaces with hyphens
  slug = slug.replace(/[^\w\s-]/g, '');
  slug = slug.replace(/\s+/g, '-');

  // Remove leading and trailing hyphens
  slug = slug.replace(/^-+|-+$/g, '');

  return slug;
}