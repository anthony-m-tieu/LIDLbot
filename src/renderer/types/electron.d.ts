export {};

declare global {
  interface Window {
    electron?: {
      openExternal: (url: string) => Promise<void>;
      setZoomFactor: (factor: number) => Promise<void>;
    };
  }
}