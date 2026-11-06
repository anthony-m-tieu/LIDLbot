import { createContext, useContext, useState, type ReactNode } from "react";
import { serializeProject } from "../project/serializeProject";
import { deserializeProject } from "../project/deserializeProject";
import platform from "../platform";

import type { Project } from "../project/types";
import { createProject } from "../project/createProject";

type ProjectContextType = {
  project: Project;
  filePath: string | null;
  isDirty: boolean;

  updateProject: (updates: Partial<Project>) => void;

  newProject: (name?: string) => Promise<void>;
  openProject: () => Promise<void>;
  saveProject: () => Promise<void>;
  saveProjectAs: () => Promise<void>;
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [project, setProject] = useState<Project>(() => createProject());
  const [filePath, setFilePath] = useState<string | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  async function newProject(name?: string) {
    await platform.file.newFile();

    setProject(createProject(name));
    setFilePath(null);
    setIsDirty(false);
  }

  async function openProject() {
    const result = await platform.file.openFile();

    if (result.status === "cancelled") {
      return;
    }

    const loadedProject = await deserializeProject(result.data);

    setProject(loadedProject);
    setFilePath(result.filePath);
    setIsDirty(false);
  }

  async function saveProject() {
    const data = await serializeProject(project);

    const result = await platform.file.saveFile(data, project.name, false);

    if (result.status === "saved") {
      setFilePath(result.filePath);
      setIsDirty(false);
    }
  }

  async function saveProjectAs() {
    const data = await serializeProject(project);

    const result = await platform.file.saveFile(data, project.name, true);

    if (result.status === "saved") {
      setFilePath(result.filePath);
      setIsDirty(false);
    }
  }

  function updateProject(updates: Partial<Project>) {
    setProject((current) => ({ ...current, ...updates }));
    setIsDirty(true);
  }

  return (
    <ProjectContext.Provider
      value={{
        project,
        filePath,
        isDirty,
        newProject,
        openProject,
        saveProject,
        saveProjectAs,
        updateProject,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const context = useContext(ProjectContext);

  if (!context) {
    throw new Error("useProject must be used within ProjectProvider");
  }

  return context;
}
