import JSZip from "jszip";
import { projectFileSchema } from "./schema";
import type { Project } from "./types";

export async function deserializeProject(
  data: Uint8Array,
): Promise<Project> {
  const zip = await JSZip.loadAsync(data);

  const projectFile = zip.file("project.json");

  if (!projectFile) {
    throw new Error("Invalid project file: project.json is missing.");
  }

  const contents = await projectFile.async("string");

  let parsed: unknown;

  try {
    parsed = JSON.parse(contents);
  } catch {
    throw new Error("Invalid project file: project.json is not valid JSON.");
  }

  const validated = projectFileSchema.parse(parsed);

  return validated.project;
}