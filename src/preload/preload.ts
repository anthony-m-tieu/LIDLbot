import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  openExternal: (url: string): Promise<void> => ipcRenderer.invoke("external:open", url),
  setZoomFactor: (factor: number): Promise<void> =>
    ipcRenderer.invoke("window:set-zoom-factor", factor),
  newFile: (): Promise<void> => ipcRenderer.invoke("file:new"),
  openFile: (): Promise<void> => ipcRenderer.invoke("file:open"),
  saveFile: (data: Uint8Array, suggestedName: string, saveAs: boolean): Promise<void> =>
    ipcRenderer.invoke("file:save", data, suggestedName, saveAs),
});
