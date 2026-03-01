const http = require('http');

// 测试消息
const testMessage = {
  sender: 'life',
  receiver: 'greenTea',
  message: '@大掌柜 我是天师，向您汇报智能体启动情况：人生决策宗师智能体已成功启动并稳定运行在端口4007，解决了技术问题，确保了系统稳定性。'
};

const postData = JSON.stringify(testMessage);

const options = {
  hostname: 'localhost',
  port: 4008,
  path: '/send',
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
    console.log('响应:', data);
  });
});

req.on('error', (error) => {
  console.error('错误:', error);
});

req.write(postData);
req.end();
