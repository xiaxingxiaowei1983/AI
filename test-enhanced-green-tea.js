// 测试增强版绿茶智能体
const http = require('http');

console.log('========================================');
console.log('🧪 测试增强版绿茶智能体');
console.log('========================================');

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

// 测试3: 连接EvoMap
console.log('\n📌 测试3: 连接EvoMap');
const connectData = JSON.stringify({
  message: '@绿茶 链接EvoMap'
});

const connectOptions = {
  hostname: 'localhost',
  port: 4003,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(connectData)
  }
};

const connectReq = http.request(connectOptions, (res) => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('✅ 连接EvoMap命令发送成功');
    console.log('响应:', data);
  });
}).on('error', (err) => {
  console.error('❌ 连接EvoMap命令发送失败:', err.message);
});

connectReq.write(connectData);
connectReq.end();

console.log('\n========================================');
console.log('🎉 增强版绿茶智能体测试完成');
console.log('========================================');
