export interface Project {
  id: string;
  name: string;
  version: number;
}

export interface ProjectFile {
  format: "lidl";
  formatVersion: 1;
  project: Project;
}
