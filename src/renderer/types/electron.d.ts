export {};

declare global {
  interface Window {
    electron?: {
      openExternal: (url: string) => Promise<void>;
      setZoomFactor: (factor: number) => Promise<void>;
      newFile: () => Promise<void>;
      openFile: () => Promise<OpenFileResult>;
      saveFile: (data: unknown, name: unknown, saveAs: unknown) => Promise<SaveFileResult>;
    };
  }
}