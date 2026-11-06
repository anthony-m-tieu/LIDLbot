import type { PlatformAPI } from "./types";
import { detectPlatform } from "./detectPlatform";
import { electronPlatform } from "./electron";
import { webPlatform } from "./web";

const isElectron = detectPlatform() === "electron";

const platform: PlatformAPI = {
  ...(isElectron ? electronPlatform : webPlatform),
  isElectron,
};

export default platform;