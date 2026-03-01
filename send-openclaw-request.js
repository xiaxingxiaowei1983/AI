const http = require('http');

// 向大掌柜发送OPENCLAW查询请求
const postData = JSON.stringify({
  message: "@大掌柜 你之前说由于系统中没有安装完整的 OPENCLAW，暂时无法将 PCEC 注册为 OPENCLAW 定时任务。如果需要完整集成？我们有安装OPENCLAW啊\n\n1. 安装 OPENCLAW 命令行工具\n2. 使用 openclaw cron add 命令将 PCEC 添加为定时任务\n3. 配置 watchdog 监控 PCEC 执行\n目前，通过 Windows 任务计划程序设置 PCEC 自启动是最直接有效的解决方案。"
});

const options = {
  hostname: 'localhost',
  port: 4004,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  let responseBody = '';
  res.on('data', (chunk) => {
    responseBody += chunk;
  });
  res.on('end', () => {
    console.log('响应体:');
    console.log(responseBody);
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 写入数据到请求主体
req.write(postData);
req.end();