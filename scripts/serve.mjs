// Local web server for dist/. Uses only Node.js built-ins, so no npm install is
// needed to view the ready-built site. Supports HTTP range requests for video seeking.
import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(fileURLToPath(new URL('../dist/', import.meta.url)));
const port = Number(process.env.PORT || 3000);
const mime = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.gz': 'application/octet-stream', '.md': 'text/plain; charset=utf-8', '.txt': 'text/plain; charset=utf-8',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.mp4': 'video/mp4',
};

if (!existsSync(path.join(root, 'index.html'))) {
  console.error('Missing dist/. Run "npm install" and then "npm run build" first.');
  process.exit(1);
}

const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Invalid URL'); return; }
  let file = path.resolve(root, '.' + pathname);
  if (existsSync(file) && statSync(file).isDirectory()) {
    // Page folders are served at /roadmap/ and /tower-overview/. Redirect the bare form.
    if (!pathname.endsWith('/')) { res.writeHead(301, { Location: pathname + '/' }).end(); return; }
    file = path.join(file, 'index.html');
  }
  if (!(file === root || file.startsWith(root + path.sep)) || !existsSync(file) || !statSync(file).isFile()) {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found');
    return;
  }
  const size = statSync(file).size;
  const headers = {
    'Content-Type': mime[path.extname(file).toLowerCase()] || 'application/octet-stream',
    'Accept-Ranges': 'bytes', 'Cache-Control': 'no-cache', 'X-Content-Type-Options': 'nosniff',
  };
  const range = /bytes=(\d*)-(\d*)/.exec(req.headers.range || '');
  let stream;
  if (range) {
    const start = range[1] ? Number(range[1]) : size - Number(range[2]);
    const end = range[1] && range[2] ? Math.min(Number(range[2]), size - 1) : size - 1;
    if (start >= size || start > end) { res.writeHead(416, { 'Content-Range': `bytes */${size}` }).end(); return; }
    res.writeHead(206, { ...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end - start + 1 });
    stream = createReadStream(file, { start, end });
  } else {
    res.writeHead(200, { ...headers, 'Content-Length': size });
    stream = createReadStream(file);
  }
  stream.on('error', () => res.destroy());
  stream.pipe(res);
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE' ? `Port ${port} is busy. Try: PORT=3100 npm start` : error.message);
  process.exit(1);
});
server.listen(port, '127.0.0.1', () => console.log(`GFS KL website is running at http://127.0.0.1:${port}\nKeep this terminal open. Press Control+C to stop.`));
