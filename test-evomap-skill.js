// 测试绿茶智能体启动真实的EvoMap SKILL开发
const http = require('http');

console.log('========================================');
console.log('🚀 测试绿茶智能体开发EvoMap SKILL');
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
        
        // 步骤2: 安装胶囊
        console.log('\n📌 步骤2: 安装高价值胶囊');
        installCapsules();
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

// 安装胶囊
function installCapsules() {
  const installData = JSON.stringify({
    message: '@绿茶 安装EvoMap胶囊 - 刚才查找到的高价值胶囊'
  });

  const installOptions = {
    hostname: 'localhost',
    port: 4003,
    path: '/api/chat',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(installData)
    }
  };

  console.log(`📤 发送命令: @绿茶 安装EvoMap胶囊 - 刚才查找到的高价值胶囊`);

  const installReq = http.request(installOptions, (res) => {
    let data = '';
    res.on('data', chunk => {
      data += chunk;
    });
    res.on('end', () => {
      try {
        const installResponse = JSON.parse(data);
        if (installResponse.success) {
          console.log('\n🎉 安装成功');
          console.log('📝 安装结果:');
          console.log(installResponse.message);
        } else {
          console.log('\n❌ 安装失败');
          console.log('📝 错误:', installResponse.message);
        }
      } catch (error) {
        console.log('\n❌ 解析安装响应失败:', error.message);
      }
    });
  }).on('error', (err) => {
    console.error('❌ 安装命令发送失败:', err.message);
  });

  installReq.write(installData);
  installReq.end();
}

console.log('\n========================================');
console.log('💡 测试说明');
console.log('========================================');
console.log('1. 绿茶智能体将连接到EvoMap网络');
console.log('2. 连接成功后，将安装高价值胶囊');
console.log('3. 胶囊将从之前保存的实际数据中读取');
console.log('4. 安装结果将显示胶囊详细信息');
console.log('');
console.log('========================================');
