export interface PlatformAPI {
  openExternal(url: string): Promise<void>;
  toLayoutPixels(visualPixels: number): number;

  window: {
    setZoomFactor(factor: number): void;
  };
}