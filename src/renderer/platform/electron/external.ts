export function openExternal(url: string): Promise<void> {
  if (!window.electron) {
    return Promise.reject(new Error("Electron API unavailable"));
  }

  return window.electron.openExternal(url);
}