const ALLOWED_EXTERNAL_URLS = new Set([
  "https://github.com/anthony-m-tieu/LIDLbot",
]);

export async function openExternal(url: string): Promise<void> {
  if (!ALLOWED_EXTERNAL_URLS.has(url)) {
    throw new Error("External URL not allowed");
  }

  window.open(url, "_blank", "noopener,noreferrer");
}