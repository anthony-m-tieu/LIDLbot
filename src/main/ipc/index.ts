
import { registerExternalIpc } from "./external";
import { registerWindowIpc } from "./window";

export function registerIpcHandlers(): void {
  registerExternalIpc();
  registerWindowIpc();
}
