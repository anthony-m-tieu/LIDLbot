import JSZip from "jszip";
import type { Project, ProjectFile } from "./types";
import { projectFileSchema } from "./schema";

export async function serializeProject(
  project: Project,
): Promise<Uint8Array> {
  const projectFile: ProjectFile = {
    format: "lidl",
    formatVersion: 1,
    project,
  };

  const validated = projectFileSchema.parse(projectFile);

  const zip = new JSZip();

  zip.file("project.json", JSON.stringify(validated, null, 2));

  return zip.generateAsync({
    type: "uint8array",
    compression: "DEFLATE",
    compressionOptions: { level: 6 },
  });
}