import { dialog, ipcMain, type WebContents } from "electron";
import { readFile, writeFile } from "node:fs/promises";

import { isTrustedAppFrame } from "../security";
import { OpenFileResult, SaveFileResult } from "../../renderer/platform/types";

const filePaths = new Map<number, string>();

function getSuggestedFilename(name: string): string {
  const safeName = name.replace(/[<>:"/\\|?*\x00-\x1F]/g, "").trim();
  return `${safeName || "Untitled"}.lidl`;
}

function newProject(sender: WebContents) {
  filePaths.delete(sender.id);
}

async function openFile(sender: WebContents): Promise<OpenFileResult> {
  const result = await dialog.showOpenDialog({
    properties: ["openFile"],
    filters: [{ name: "LIDLbot Project", extensions: ["lidl"] }],
  });

  if (result.canceled || result.filePaths.length === 0) {
    return { status: "cancelled" as const };
  }

  const filePath = result.filePaths[0];
  const buffer = await readFile(filePath);

  filePaths.set(sender.id, filePath);

  return {
    status: "opened" as const,
    data: new Uint8Array(buffer),
    filePath,
  };
}

async function saveFile(
  sender: WebContents,
  data: Uint8Array,
  suggestedName: string,
  saveAs: boolean,
): Promise<SaveFileResult> {
  let filePath = saveAs ? undefined : filePaths.get(sender.id);

  if (!filePath) {
    const result = await dialog.showSaveDialog({
      defaultPath: getSuggestedFilename(suggestedName),
      filters: [{ name: "LIDLbot Project", extensions: ["lidl"] }],
    });
    if (result.canceled || !result.filePath) {
      return { status: "cancelled" as const };
    }
    filePath = result.filePath;
  }

  await writeFile(filePath, data);
  filePaths.set(sender.id, filePath);
  return { status: "saved" as const, filePath };
}

export function registerFileIpc() {
  ipcMain.handle("file:new", async (event) => {
    if (!isTrustedAppFrame(event)) {
      throw new Error("Untrusted IPC sender");
    }
    return newProject(event.sender);
  });

  ipcMain.handle("file:open", async (event) => {
    if (!isTrustedAppFrame(event)) {
      throw new Error("Untrusted IPC sender");
    }
    return openFile(event.sender);
  });

  ipcMain.handle(
    "file:save",
    async (event, data: unknown, name: unknown, saveAs: unknown) => {
      if (!isTrustedAppFrame(event)) {
        throw new Error("Untrusted IPC sender");
      }
      if (!(data instanceof Uint8Array)) {
        throw new Error("Invalid project data");
      }
      if (typeof name !== "string" || typeof saveAs !== "boolean") {
        throw new Error("Invalid save arguments");
      }
      return saveFile(event.sender, data, name, saveAs);
    },
  );
}
