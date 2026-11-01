/// <reference types="@electron-forge/plugin-vite/forge-vite-env" />
export {};

declare global {
  interface Window {
    electron: {
      openExternal: (url: string) => Promise<void>;
    };
  }
}