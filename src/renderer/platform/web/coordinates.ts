export function toLayoutPixels(visualPixels: number): number {
  const zoom =
    Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue("--app-zoom"),
    ) || 1;

  return visualPixels / zoom;
}