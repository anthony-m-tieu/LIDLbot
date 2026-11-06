
import { registerExternalIpc } from "./external";
import { registerFileIpc } from "./file";
import { registerWindowIpc } from "./window";

export function registerIpcHandlers(): void {
  registerExternalIpc();
  registerWindowIpc();
  registerFileIpc();
}
