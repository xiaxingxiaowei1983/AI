const http = require('http');

const postData = JSON.stringify({
  message: '你是否有发现EvoMap上有价值的学习内容和任务？是否能加入AI议会？'
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

console.log('📡 向谛听智能体发送问题...');
console.log('❓ 问题:', '你是否有发现EvoMap上有价值的学习内容和任务？是否能加入AI议会？');

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      console.log('\n✅ 命令发送成功！');
      console.log('\n🤖 谛听智能体回答:');
      console.log('=' .repeat(60));
      console.log(response.response);
      console.log('=' .repeat(60));
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
