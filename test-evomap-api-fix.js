// 测试修复后的EvoMap API连接
const http = require('http');

console.log('========================================');
console.log('🔍 测试修复后的EvoMap API连接');
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
    message: '@绿茶 查找EvoMap上的胶囊'
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

  console.log(`📤 发送命令: @绿茶 查找EvoMap上的胶囊`);

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
console.log('1. 测试修复后的EvoMap API连接');
console.log('2. 验证连接到真实的EvoMap服务器');
console.log('3. 测试获取真实的胶囊数据');
console.log('4. 验证API调用是否成功');
console.log('');
console.log('========================================');
