const http = require('http');

const postData = JSON.stringify({
  message: '连接EvoMap'
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

console.log('📡 向谛听智能体发送连接 EvoMap 命令...');

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('✅ 命令发送成功！');
      console.log('🤖 谛听智能体响应:');
      console.log(`   ${response.response}`);
      console.log('\n🎯 连接状态: 正在连接到 EvoMap...');
    } catch (error) {
      console.error('❌ 解析响应失败:', error.message);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ 发送命令失败:', error.message);
});

req.write(postData);
req.end();
