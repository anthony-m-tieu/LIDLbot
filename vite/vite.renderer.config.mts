import { defineConfig } from 'vite';
import { fileURLToPath } from 'node:url';

const rendererRoot = fileURLToPath(
    new URL('../src/renderer/', import.meta.url)
);

export default defineConfig({
    root: rendererRoot
});