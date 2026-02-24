const http = require('http');
const https = require('https');
const url = require('url');

// 目标服务器配置
const TARGET_HOST = 'localhost';
const TARGET_PORT = 18789;

// 代理服务器配置
const PROXY_PORT = 18790;

// 创建代理服务器
const proxyServer = http.createServer((req, res) => {
  // 解析请求URL
  const parsedUrl = url.parse(req.url);
  
  // 构建目标请求选项
  const options = {
    hostname: TARGET_HOST,
    port: TARGET_PORT,
    path: parsedUrl.path,
    method: req.method,
    headers: req.headers
  };

  // 发送请求到目标服务器
  const proxyReq = http.request(options, (proxyRes) => {
    // 获取原始CSP头
    const originalCSP = proxyRes.headers['content-security-policy'];
    
    if (originalCSP) {
      // 修改CSP头，添加Google Fonts域名
      const modifiedCSP = originalCSP
        .replace(/style-src\s+'self'\s+'unsafe-inline'/g, "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com")
        .replace(/font-src\s+'self'/g, "font-src 'self' https://fonts.gstatic.com");
      
      // 更新响应头
      proxyRes.headers['content-security-policy'] = modifiedCSP;
      console.log('Modified CSP header:', modifiedCSP);
    } else {
      // 如果没有CSP头，添加一个默认的
      const defaultCSP = "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; connect-src 'self';";
      proxyRes.headers['content-security-policy'] = defaultCSP;
      console.log('Added default CSP header:', defaultCSP);
    }

    // 复制响应头到客户端
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    
    // 复制响应体到客户端
    proxyRes.pipe(res);
  });

  // 处理错误
  proxyReq.on('error', (err) => {
    console.error('Proxy request error:', err);
    res.writeHead(500, {
      'Content-Type': 'text/plain'
    });
    res.end('Proxy error: ' + err.message);
  });

  // 复制请求体到目标服务器
  req.pipe(proxyReq);
});

// 启动代理服务器
proxyServer.listen(PROXY_PORT, () => {
  console.log(`CSP proxy server running on port ${PROXY_PORT}`);
  console.log(`Access OpenClaw at http://localhost:${PROXY_PORT}`);
  console.log(`Original OpenClaw gateway: http://localhost:${TARGET_PORT}`);
});

// 监听错误
proxyServer.on('error', (err) => {
  console.error('Proxy server error:', err);
});

console.log('Starting simple CSP proxy server...');
console.log('This server will modify Content Security Policy headers to allow Google Fonts.');
