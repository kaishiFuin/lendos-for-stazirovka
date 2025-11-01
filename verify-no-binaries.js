#!/usr/bin/env node
import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ROOT = process.cwd();
const bannedExtensions = new Set([
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

const ignored = new Set(['.git', 'node_modules', 'dist', 'build', '.venv']);

const offenders = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (ignored.has(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (bannedExtensions.has(ext)) {
      offenders.push({ file: path.relative(ROOT, fullPath), reason: `Запрещённое расширение ${ext}` });
      continue;
    }

    const buffer = await readFile(fullPath);
    if (buffer.includes(0)) {
      offenders.push({ file: path.relative(ROOT, fullPath), reason: 'Обнаружены нулевые байты' });
      continue;
    }

    const text = buffer.toString('utf8');
    if (!text) continue;
    const decoded = Buffer.from(text, 'utf8');
    if (decoded.includes(0)) {
      offenders.push({ file: path.relative(ROOT, fullPath), reason: 'Файл не декодируется как UTF-8' });
    }
  }
}

const publicApi = {
  async verify() {
    await walk(ROOT);
    if (offenders.length > 0) {
      console.error('Binary files are not allowed in this PR');
      for (const offender of offenders) {
        console.error(`- ${offender.file}: ${offender.reason}`);
      }
      process.exit(1);
    }
    console.log('✅ No binary files detected.');
  },
};

publicApi.verify().catch((error) => {
  console.error('verify-no-binaries failed:', error);
  process.exit(1);
});
