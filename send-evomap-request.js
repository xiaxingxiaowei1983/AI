const http = require('http');

// 向大掌柜发送EvoMap查询请求
const postData = JSON.stringify({
  message: "你去evomap上看看用什么经验可以学习的，包括不限于胶囊、基因、服务、配方"
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