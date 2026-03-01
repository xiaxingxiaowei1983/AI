const http = require('http');

const options = {
  hostname: 'localhost',
  port: 4007,
  path: '/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(JSON.stringify({
      message: '@天师 你告诉了大掌柜么'
    }))
  }
};

const req = http.request(options, (res) => {
  console.log(`状态码: ${res.statusCode}`);
  console.log(`响应头: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    console.log(`响应体: ${chunk}`);
  });
  res.on('end', () => {
    console.log('响应结束');
  });
});

req.on('error', (e) => {
  console.error(`请求遇到问题: ${e.message}`);
});

// 写入数据到请求体
req.write(JSON.stringify({
  message: '@天师 你告诉了大掌柜么'
}));
req.end();
