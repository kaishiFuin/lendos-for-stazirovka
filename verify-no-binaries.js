import { readdirSync, statSync, readFileSync } from 'fs';
import path from 'path';

const disallowedExtensions = new Set([
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
  '.zip',
]);

const skipDirs = new Set(['.git', 'node_modules', 'dist', 'build', '.venv', '__pycache__']);

const offenders = [];

function isBinaryContent(buffer) {
  for (let i = 0; i < buffer.length; i += 1) {
    const byte = buffer[i];
    if (byte === 0) {
      return true;
    }
  }

  try {
    new TextDecoder('utf-8', { fatal: true }).decode(buffer);
    return false;
  } catch (error) {
    return true;
  }
}

function walk(currentPath) {
  const entries = readdirSync(currentPath, { withFileTypes: true });

  for (const entry of entries) {
    if (skipDirs.has(entry.name)) {
      continue;
    }

    const entryPath = path.join(currentPath, entry.name);

    if (entry.isDirectory()) {
      walk(entryPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (disallowedExtensions.has(ext)) {
      offenders.push({
        file: entryPath,
        reason: `disallowed extension ${ext}`,
      });
      continue;
    }

    const stats = statSync(entryPath);
    if (stats.size === 0) {
      continue;
    }

    const sampleSize = Math.min(stats.size, 4096);
    const buffer = readFileSync(entryPath);
    if (isBinaryContent(buffer.subarray(0, sampleSize))) {
      offenders.push({
        file: entryPath,
        reason: 'binary content detected',
      });
    }
  }
}

walk(process.cwd());

if (offenders.length > 0) {
  console.error('Binary files are not allowed in this PR.');
  for (const offender of offenders) {
    console.error(`- ${offender.file}: ${offender.reason}`);
  }
  process.exit(1);
}

console.log('No binary files detected.');
