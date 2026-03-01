// 测试绿茶智能体查找胶囊功能
const http = require('http');

console.log('========================================');
console.log('🔍 测试绿茶智能体查找胶囊功能');
console.log('========================================');
console.log(`📅 测试时间: ${new Date().toISOString()}`);
console.log('');

// 步骤1: 连接EvoMap
console.log('📌 步骤1: 连接EvoMap');
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
    try {
      const connectResponse = JSON.parse(data);
      if (connectResponse.success) {
        console.log('✅ EvoMap连接成功');
        console.log('📡 节点ID:', connectResponse.message.match(/节点ID: (\S+)/)?.[1]);
        
        // 步骤2: 查找胶囊
        console.log('\n📌 步骤2: 查找EvoMap胶囊');
        searchCapsules();
      } else {
        console.log('❌ EvoMap连接失败');
        console.log('📝 错误:', connectResponse.message);
      }
    } catch (error) {
      console.log('\n❌ 解析连接响应失败:', error.message);
    }
  });
}).on('error', (err) => {
  console.error('❌ 连接EvoMap命令发送失败:', err.message);
});

connectReq.write(connectData);
connectReq.end();

// 查找胶囊
function searchCapsules() {
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

  console.log(`📤 发送命令: @绿茶 查找EvoMap上的胶囊或高价值SKILL`);

  const searchReq = http.request(searchOptions, (res) => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const searchResponse = JSON.parse(data);
        if (searchResponse.success) {
          console.log('\n🎉 查找成功');
          console.log('📝 查找结果:');
          console.log(searchResponse.message);
        } else {
          console.log('\n❌ 查找失败');
          console.log('📝 错误:', searchResponse.message);
        }
      } catch (error) {
        console.log('\n❌ 解析查找响应失败:', error.message);
      }
    });
  }).on('error', (err) => {
    console.error('❌ 查找命令发送失败:', err.message);
  });

  searchReq.write(searchData);
  searchReq.end();
}

console.log('\n========================================');
console.log('💡 测试说明');
console.log('========================================');
console.log('1. 绿茶智能体将连接到EvoMap网络');
console.log('2. 连接成功后，将查找已上架的胶囊');
console.log('3. 胶囊将按GDI评分排序');
console.log('4. 显示前10个高价值胶囊');
console.log('5. 查找结果将包含：');
console.log('   - 胶囊ID');
console.log('   - 置信度');
console.log('   - GDI评分');
console.log('   - 触发词');
console.log('   - 内容长度');
console.log('');
console.log('========================================');
