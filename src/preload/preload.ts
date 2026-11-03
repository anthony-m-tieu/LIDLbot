import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
  openExternal: (url: string) => ipcRenderer.invoke("open-external", url),
  setZoomFactor: (factor: number) => ipcRenderer.invoke("window:set-zoom-factor", factor),
});
