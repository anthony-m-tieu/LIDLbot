import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const rendererRoot = fileURLToPath(
  new URL('../src/renderer/', import.meta.url)
);

export default defineConfig({
  root: rendererRoot
});