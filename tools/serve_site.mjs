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
  const cleanUrl = decodeURIComponent(urlObj.pathname);

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

  let relPath = cleanUrl === '/' ? projectConfig.paths.entryHtml : cleanUrl.replace(/^\/+/, '');
  let filePath = path.join(ROOT, relPath);
  if (!fs.existsSync(filePath) && fs.existsSync(path.join(ROOT, 'public', relPath))) {
    filePath = path.join(ROOT, 'public', relPath);
  }
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    filePath = path.join(filePath, 'index.html');
  }

  if (!fs.existsSync(filePath) || !fs.statSync(filePath).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('404 Not Found');
    return;
  }

  const ext = path.extname(filePath).toLowerCase();
  const mime = MIME_TYPES[ext] || 'application/octet-stream';
  res.writeHead(200, { 'Content-Type': mime, 'Cache-Control': 'no-cache' });
  fs.createReadStream(filePath).pipe(res);
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`🌐 [Web Software Factory Server] Serving ${projectConfig.id} at http://127.0.0.1:${PORT}`);
});
