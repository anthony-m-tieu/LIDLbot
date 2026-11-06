export interface PlatformAPI {
  isElectron: boolean;
  toLayoutPixels(visualPixels: number): number;
  external: {
    openExternal(url: string): Promise<void>;
  };
  window: {
    setZoomFactor(factor: number): void;
  };
  file: {
    newFile(): Promise<void>;
    openFile(): Promise<OpenFileResult>;
    saveFile(
      data: Uint8Array,
      suggestedName: string,
      saveAs: boolean,
    ): Promise<SaveFileResult>;
  };
}

export type SaveFileResult =
  | { status: "saved"; filePath: string | null }
  | { status: "cancelled" };

export type OpenFileResult =
  | {
      status: "opened";
      data: Uint8Array;
      filePath: string | null;
    }
  | {
      status: "cancelled";
    };