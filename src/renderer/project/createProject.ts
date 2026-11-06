import type { Project } from "./types";

export function createProject(name = "Untitled"): Project {
  return {
    id: crypto.randomUUID(),
    name,
    version: 1,
  };
}