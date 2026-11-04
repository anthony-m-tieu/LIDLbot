export function detectPlatform(): "electron" | "web" {
  return window.electron ? "electron" : "web";
}