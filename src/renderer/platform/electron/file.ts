export function saveFile(
  data: Uint8Array,
  suggestedName: string,
  saveAs: boolean,
) {
  if (!window.electron) {
    throw new Error("Electron API unavailable");
  }

  return window.electron.saveFile(data, suggestedName, saveAs);
}

export function openFile() {
  if (!window.electron) {
    throw new Error("Electron API unavailable");
  }

  return window.electron.openFile();
}

export function newFile() {
  if (!window.electron) {
    throw new Error("Electron API unavailable");
  }

  return window.electron.newFile();
}