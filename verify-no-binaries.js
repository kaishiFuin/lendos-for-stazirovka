#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { TextDecoder } = require('util');

const forbiddenExtensions = new Set([
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

const allowedTextExtensions = new Set(['.svg']);

function isBinaryContent(buffer) {
  const sample = buffer.subarray(0, 8000);
  for (const byte of sample) {
    if (byte === 0) {
      return true;
    }
  }
  try {
    new TextDecoder('utf-8', { fatal: true }).decode(sample);
    return false;
  } catch (error) {
    return true;
  }
}

function checkDirectory(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules' || entry.name === 'dist' || entry.name === 'build') {
      continue;
    }
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      checkDirectory(fullPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (forbiddenExtensions.has(ext)) {
        throw new Error(`Binary file extension detected: ${fullPath}`);
      }
      const stat = fs.statSync(fullPath);
      if (stat.size === 0) {
        continue;
      }
      const buffer = fs.readFileSync(fullPath);
      if (!allowedTextExtensions.has(ext) && isBinaryContent(buffer)) {
        throw new Error(`Binary-like content detected: ${fullPath}`);
      }
    }
  }
}

try {
  checkDirectory(process.cwd());
  console.log('No binary files detected.');
} catch (error) {
  console.error('Binary files are not allowed in this PR.');
  console.error(error.message);
  process.exit(1);
}
