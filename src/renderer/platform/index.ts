import type { PlatformAPI } from "./types";
import { detectPlatform } from "./detectPlatform";
import { electronPlatform } from "./electron";
import { webPlatform } from "./web";

const platform: PlatformAPI =
  detectPlatform() === "electron"
    ? electronPlatform
    : webPlatform;

export default platform;