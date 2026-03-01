const http = require('http');
const https = require('https');
const url = require('url');

const PORT = 18800;
const TARGET_HOST = '127.0.0.1';
const TARGET_PORT = 18790;

console.log(`🔄 创建 CSP 修复代理服务器...`);
console.log(`📡 监听: http://localhost:${PORT}`);
console.log(`🎯 目标: http://${TARGET_HOST}:${TARGET_PORT}`);

const server = http.createServer((req, res) => {
  const targetUrl = url.parse(`http://${TARGET_HOST}:${TARGET_PORT}${req.url}`);
  
  const options = {
    hostname: targetUrl.hostname,
    port: targetUrl.port,
    path: targetUrl.path,
    method: req.method,
    headers: req.headers
  };

  const proxyReq = http.request(options, (proxyRes) => {
    let responseData = [];
    
    proxyRes.on('data', (chunk) => {
      responseData.push(chunk);
    });
    
    proxyRes.on('end', () => {
      const buffer = Buffer.concat(responseData);
      
      let headers = { ...proxyRes.headers };
      
      if (headers['content-type'] && headers['content-type'].includes('text/html')) {
        let content = buffer.toString('utf8');
        
        content = content.replace(
          "style-src 'self' 'unsafe-inline'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com"
        );
        
        content = content.replace(
          "style-src 'self'",
          "style-src 'self' https://fonts.googleapis.com"
        );
        
        headers['content-length'] = Buffer.byteLength(content);
        res.writeHead(proxyRes.statusCode, headers);
        res.end(content);
      } else if (headers['content-type'] && headers['content-type'].includes('text/css')) {
        let content = buffer.toString('utf8');
        
        headers['content-length'] = Buffer.byteLength(content);
        res.writeHead(proxyRes.statusCode, headers);
        res.end(content);
      } else {
        res.writeHead(proxyRes.statusCode, headers);
        res.end(buffer);
      }
    });
  });

  proxyReq.on('error', (error) => {
    console.error(`❌ 代理错误: ${error.message}`);
    res.writeHead(502);
    res.end('Bad Gateway');
  });

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    req.pipe(proxyReq);
  } else {
    proxyReq.end();
  }
});

server.listen(PORT, () => {
  console.log(`✅ CSP 修复代理服务器已启动`);
  console.log(`🌐 访问地址: http://localhost:${PORT}`);
  console.log(`📝 使用此地址访问 OpenClaw 代替原来的 18790 端口`);
});

server.on('error', (error) => {
  console.error(`❌ 服务器启动失败: ${error.message}`);
  process.exit(1);
});
