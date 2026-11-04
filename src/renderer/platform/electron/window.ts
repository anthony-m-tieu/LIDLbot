export function setZoomFactor(factor: number): void {
  if (!window.electron) {
    throw new Error("Electron API unavailable");
  }

  void window.electron.setZoomFactor(factor);
}