#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const IGNORED_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', '.venv', '__pycache__']);
const FORBIDDEN_EXTENSIONS = new Set([
  '.png',
  '.jpg',
  '.jpeg',
  '.webp',
  '.gif',
  '.ico',
  '.mp4',
  '.mov',
  '.pdf',
  '.ttf',
  '.otf',
  '.woff',
  '.woff2',
  '.zip'
]);

const isBinaryBuffer = (buffer) => {
  for (let i = 0; i < buffer.length; i += 1) {
    if (buffer[i] === 0) {
      return true;
    }
  }

  try {
    new TextDecoder('utf-8', { fatal: true }).decode(buffer);
    return false;
  } catch (error) {
    return true;
  }
};

const scan = async (dir) => {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (IGNORED_DIRS.has(entry.name)) {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      await scan(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (FORBIDDEN_EXTENSIONS.has(ext)) {
      throw new Error(`Forbidden binary extension detected: ${fullPath}`);
    }

    const buffer = await fs.readFile(fullPath);
    if (isBinaryBuffer(buffer)) {
      throw new Error(`Binary content detected: ${fullPath}`);
    }
  }
};

scan(ROOT)
  .then(() => {
    console.log('No binary files detected.');
  })
  .catch((error) => {
    console.error('Binary files are not allowed in this PR');
    console.error(error.message);
    process.exit(1);
  });
