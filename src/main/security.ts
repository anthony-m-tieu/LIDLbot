import { session, type BrowserWindow, type IpcMainInvokeEvent } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";

export function isTrustedAppFrame(event: Electron.IpcMainInvokeEvent): boolean {
  if (event.senderFrame !== event.sender.mainFrame) {
    return false;
  }

  try {
    const senderUrl = new URL(event.senderFrame.url);

    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      const devUrl = new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
      return senderUrl.origin === devUrl.origin;
    }

    const expectedPath = fileURLToPath(
      new URL(
        `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`,
        `file://${__dirname}/`,
      ),
    );

    return (
      senderUrl.protocol === "file:" &&
      fileURLToPath(senderUrl) === expectedPath
    );
  } catch {
    return false;
  }
}

export function configureWindowSecurity(mainWindow: BrowserWindow): void {
  mainWindow.webContents.on("will-navigate", (event, url) => {
    if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
      const devOrigin = new URL(MAIN_WINDOW_VITE_DEV_SERVER_URL).origin;
      if (new URL(url).origin === devOrigin) {
        return;
      }
    }
    event.preventDefault();
  });

  mainWindow.webContents.setWindowOpenHandler(() => {
    return { action: "deny" };
  });
}

export function configureSessionSecurity(): void {
  session.defaultSession.setPermissionRequestHandler(
    (_webContents, _permission, callback) => {
      callback(false);
    },
  );
}
