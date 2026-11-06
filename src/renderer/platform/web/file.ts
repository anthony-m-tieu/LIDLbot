import { SaveFileResult, OpenFileResult } from "../types";

export function newFile(): Promise<void> {
  return Promise.resolve();
}

export function openFile(): Promise<OpenFileResult> {
  return new Promise((resolve, reject) => {
    const input = document.createElement("input");

    input.type = "file";
    input.accept = ".lidl,application/zip";

    input.onchange = async () => {
      const file = input.files?.[0];

      if (!file) {
        resolve({ status: "cancelled" });
        return;
      }

      try {
        const data = new Uint8Array(await file.arrayBuffer());

        resolve({
          status: "opened",
          data,
          filePath: null,
        });
      } catch (error) {
        reject(error);
      }
    };

    input.oncancel = () => {
      resolve({ status: "cancelled" });
    };

    input.click();
  });
}

export async function saveFile(
  data: Uint8Array<ArrayBuffer>,
  suggestedName: string,
  _saveAs: boolean,
): Promise<SaveFileResult> {
  const filename = `${suggestedName.replace(/[<>:"/\\|?*]/g, "").trim() || "Untitled"}.lidl`;

  const blob = new Blob([data], {
    type: "application/zip",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");

  anchor.href = url;
  anchor.download = filename;
  anchor.click();

  URL.revokeObjectURL(url);

  return { status: "saved", filePath: null };
}