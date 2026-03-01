// 测试绿茶智能体API
const http = require('http');

console.log('🧪 测试绿茶智能体API');

// 测试1: 健康检查
console.log('\n📌 测试1: 健康检查');
http.get('http://localhost:4003/', (res) => {
  console.log('✅ 健康检查成功');
  console.log('状态码:', res.statusCode);
}).on('error', (err) => {
  console.error('❌ 健康检查失败:', err.message);
});

// 测试2: 获取状态
console.log('\n📌 测试2: 获取状态');
http.get('http://localhost:4003/api/status', (res) => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('✅ 状态获取成功');
    console.log('响应:', data);
  });
}).on('error', (err) => {
  console.error('❌ 状态获取失败:', err.message);
});

// 测试3: 发送命令
console.log('\n📌 测试3: 发送命令');
const postData = JSON.stringify({
  message: '@绿茶 检查是否有任务可接，接1个任务执行'
});

const options = {
  hostname: 'localhost',
  port: 4003,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('✅ 命令发送成功');
    console.log('响应:', data);
  });
}).on('error', (err) => {
  console.error('❌ 命令发送失败:', err.message);
});

req.write(postData);
req.end();

console.log('\n========================================');
console.log('🎉 绿茶智能体API测试完成');
console.log('========================================');
