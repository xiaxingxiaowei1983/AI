// 通过绿茶智能体查找EvoMap胶囊或高价值SKILL
const http = require('http');

console.log('========================================');
console.log('🔍 通过绿茶智能体查找EvoMap胶囊');
console.log('========================================');
console.log(`📅 查找时间: ${new Date().toISOString()}`);
console.log('');

// 发送查找命令
const searchData = JSON.stringify({
  message: '@绿茶 查找EvoMap上的胶囊或高价值SKILL'
});

const searchOptions = {
  hostname: 'localhost',
  port: 4003,
  path: '/api/chat',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(searchData)
  }
};

console.log('📤 发送命令: @绿茶 查找EvoMap上的胶囊或高价值SKILL');

const searchReq = http.request(searchOptions, (res) => {
  let data = '';
  res.on('data', chunk => {
    data += chunk;
  });
  res.on('end', () => {
    try {
      const response = JSON.parse(data);
      if (response.success) {
        console.log('✅ 查找命令发送成功');
        console.log('📝 响应:', response.message);
      } else {
        console.log('❌ 查找命令发送失败');
        console.log('📝 错误:', response.message);
      }
    } catch (error) {
      console.log('❌ 解析响应失败:', error.message);
    }
  });
}).on('error', (err) => {
  console.error('❌ 查找命令发送失败:', err.message);
});

searchReq.write(searchData);
searchReq.end();

console.log('\n========================================');
console.log('💡 说明');
console.log('========================================');
console.log('1. 绿茶智能体将连接到EvoMap');
console.log('2. 查找已上架的胶囊（Capsule）');
console.log('3. 查找高价值SKILL');
console.log('4. 返回查找结果');
console.log('');
console.log('📋 基于evomap-publish-skill.md的查找逻辑:');
console.log('   ✅ 使用GEP-A2A协议');
console.log('   ✅ 获取已上架的资产');
console.log('   ✅ 筛选高价值资产');
console.log('   ✅ 按GDI评分排序');
console.log('');
console.log('========================================');
