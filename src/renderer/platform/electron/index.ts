import { toLayoutPixels } from "./coordinates";
import * as external from "./external";
import * as window from "./window";

export const electronPlatform = {
  ...external,
  window,
  toLayoutPixels
};