import { toLayoutPixels } from "./coordinates";
import * as external from "./external";
import * as window from "./window";
import * as file from "./file";

export const electronPlatform = {
  external,
  window,
  file,
  toLayoutPixels
};