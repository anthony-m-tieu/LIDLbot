import { ipcMain, shell } from "electron";
import { isTrustedAppFrame } from "../security";

const ALLOWED_EXTERNAL_URLS = new Set([
  "https://github.com/anthony-m-tieu/LIDLbot",
]);

export function registerExternalIpc(): void {
  ipcMain.handle("open-external", async (event, value: unknown) => {
    if (!isTrustedAppFrame(event)) {
      throw new Error("Untrusted IPC sender");
    }

    if (typeof value !== "string" || !ALLOWED_EXTERNAL_URLS.has(value)) {
      throw new Error("External URL not allowed");
    }

    await shell.openExternal(value);
  });
}
