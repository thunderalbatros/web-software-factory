#!/usr/bin/env node
/**
 * Web Software Factory Studio — Local Static & Edge API Development Server
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { loadProjectConfig } from './lib/project_loader.mjs';

const projectConfig = loadProjectConfig();
const ROOT = projectConfig.projectRoot;
const PORT = Number(process.env.PORT || 8080);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  const urlObj = new URL(req.url || '/', `http://127.0.0.1:${PORT}`);
  let cleanUrl;
  try {
    cleanUrl = decodeURIComponent(urlObj.pathname);
  } catch (_) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }

  if (cleanUrl.includes('\0')) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('400 Bad Request');
    return;
  }

  if (cleanUrl === '/api/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'web-software-factory-edge-api', project: projectConfig.id, uptime: process.uptime() }));
    return;
  }

  if (cleanUrl.startsWith('/api/')) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true, endpoint: cleanUrl }));
    return;
  }

  const segments = cleanUrl.split('/').filter(Boolean);
  if (segments.some((seg) => seg === '..' || (seg.startsWith('.') && seg !== '.well-known'))) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  const resolvedRoot = path.resolve(ROOT);
  const relPath = cleanUrl === '/' ? projectConfig.paths.entryHtml : cleanUrl.replace(/^\/+/, '');
  let filePath = path.resolve(resolvedRoot, relPath);
  if (!fs.existsSync(filePath) && fs.existsSync(path.resolve(resolvedRoot, 'public', relPath))) {
    filePath = path.resolve(resolvedRoot, 'public', relPath);
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.resolve(filePath, 'index.html');
  }

  if (filePath !== resolvedRoot && !filePath.startsWith(resolvedRoot + path.sep)) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 Forbidden');
    return;
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, {
    'Content-Type': mime,
    'Cache-Control': 'no-cache',
    'X-Content-Type-Options': 'nosniff'
  });
  const stream = fs.createReadStream(filePath);
  stream.on('error', () => {
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    }
    res.end('500 Internal Server Error');
  });
  stream.pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`🌐 [Web Software Factory Server] Serving ${projectConfig.id} at http://127.0.0.1:${PORT}`);
});
