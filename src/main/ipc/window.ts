import { BrowserWindow, ipcMain } from "electron";
import { isTrustedAppFrame } from "../security";

export function registerWindowIpc(): void {
  ipcMain.handle("window:set-zoom-factor", (event, factor: number) => {
    if (!isTrustedAppFrame(event)) {
      throw new Error("Untrusted IPC sender");
    }

    if (typeof factor !== "number" || !Number.isFinite(factor)) {
      throw new Error("Invalid zoom factor");
    }

    const window = BrowserWindow.fromWebContents(event.sender);

    if (!window) {
      throw new Error("Application window not found");
    }

    window.webContents.setZoomFactor(Math.min(2, Math.max(0.5, factor)));
  });
}
