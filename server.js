const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8000;
const PUBLIC_DIR = 'C:\\Users\\danie\\SYGNODE Website Mayo 2026';

const server = http.createServer((req, res) => {
  let urlPath = url.parse(req.url).pathname;
  
  // Si no tiene extensión de archivo y no es /, intenta agregar .html o /index.html
  if (!urlPath.includes('.') && !urlPath.endsWith('/')) {
    const htmlPath = path.join(PUBLIC_DIR, urlPath + '.html');
    const indexPath = path.join(PUBLIC_DIR, urlPath + '/index.html');
    if (fs.existsSync(htmlPath)) {
      urlPath = urlPath + '.html';
    } else if (fs.existsSync(indexPath)) {
      urlPath = urlPath + '/index.html';
    }
  }

  // Si termina en /, busca index.html
  if (urlPath.endsWith('/')) {
    urlPath = urlPath + 'index.html';
  }
  
  const filePath = path.join(PUBLIC_DIR, urlPath);
  
  // Evita directory traversal
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end('404 - File Not Found');
      return;
    }
    
    const ext = path.extname(filePath);
    let contentType = 'text/html';
    if (ext === '.css') contentType = 'text/css';
    else if (ext === '.js') contentType = 'application/javascript';
    else if (ext === '.json') contentType = 'application/json';
    else if (['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'].includes(ext)) contentType = 'image/' + ext.slice(1);
    
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Servidor en http://localhost:${PORT}/`);
  console.log('Presiona Ctrl+C para detener');
});
