export function setZoomFactor(factor: number): void {
  if (!Number.isFinite(factor)) {
    throw new Error("Invalid zoom factor");
  }

  const clampedFactor = Math.min(2, Math.max(0.5, factor));

  document.documentElement.style.zoom = String(clampedFactor);
  document.documentElement.style.setProperty(
    "--app-zoom",
    String(clampedFactor),
  );
}