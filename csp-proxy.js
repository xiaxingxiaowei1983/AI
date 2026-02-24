const http = require('http');
const httpProxy = require('http-proxy');

// 创建代理服务器
const proxy = httpProxy.createProxyServer({
  target: 'http://localhost:18789',
  changeOrigin: true
});

// 监听请求事件，修改响应头
proxy.on('proxyRes', function(proxyRes, req, res, options) {
  // 获取原始CSP头
  const originalCSP = proxyRes.headers['content-security-policy'];
  
  if (originalCSP) {
    // 检查CSP头是否已经包含Google Fonts域名
    let modifiedCSP = originalCSP;
    
    // 只有在不包含Google Fonts时才添加
    if (!modifiedCSP.includes('fonts.googleapis.com')) {
      modifiedCSP = modifiedCSP.replace(/style-src\s+'self'\s+'unsafe-inline'/g, "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com");
    }
    
    if (!modifiedCSP.includes('fonts.gstatic.com')) {
      modifiedCSP = modifiedCSP.replace(/font-src\s+'self'/g, "font-src 'self' https://fonts.gstatic.com");
    }
    
    // 更新响应头
    proxyRes.headers['content-security-policy'] = modifiedCSP;
    console.log('Modified CSP header:', modifiedCSP);
  } else {
    // 如果没有CSP头，添加一个默认的
    const defaultCSP = "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; connect-src 'self';";
    proxyRes.headers['content-security-policy'] = defaultCSP;
    console.log('Added default CSP header:', defaultCSP);
  }
});

// 监听错误事件
proxy.on('error', function(err, req, res) {
  res.writeHead(500, {
    'Content-Type': 'text/plain'
  });
  res.end('Error: ' + err.message);
});

// 创建HTTP服务器
const server = http.createServer(function(req, res) {
  // 代理所有请求到OpenClaw网关
  proxy.web(req, res);
});

// 启动服务器
const PORT = 18790;
server.listen(PORT, function() {
  console.log(`CSP proxy server running on port ${PORT}`);
  console.log(`Access OpenClaw at http://localhost:${PORT}`);
  console.log(`Original OpenClaw gateway: http://localhost:18789`);
});

// 监听关闭事件
server.on('close', function() {
  proxy.close();
});

console.log('Starting CSP proxy server...');
console.log('This server will modify Content Security Policy headers to allow Google Fonts.');
