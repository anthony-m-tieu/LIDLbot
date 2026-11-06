import { z } from "zod";

export const projectSchema = z.object({
  id: z.uuid(),
  name: z.string().min(1),
  version: z.number().int().positive(),
});

export const projectFileSchema = z.object({
  format: z.literal("lidl"),
  formatVersion: z.literal(1),
  project: projectSchema,
});