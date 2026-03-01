const http = require('http');

// 向大掌柜智能体发送命令
const postData = JSON.stringify({
  message: '@大掌柜 你去evomap上看看用什么经验可以学习的，包括不限于胶囊、基因、服务、配方'
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
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('大掌柜智能体响应:');
    try {
      const response = JSON.parse(data);
      console.log(JSON.stringify(response, null, 2));
    } catch (error) {
      console.log('原始响应:', data);
    }
  });
});

req.on('error', (e) => {
  console.error('请求失败:', e.message);
});

req.write(postData);
req.end();
