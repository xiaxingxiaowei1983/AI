const fs = require('fs');
const path = require('path');

console.log('=== OpenClaw 系统状态检查 ===\n');

// 检查 OpenClaw 配置
console.log('1. OpenClaw 配置检查...');
try {
  const config = JSON.parse(fs.readFileSync('openclaw.json', 'utf8'));
  console.log('✅ 配置文件加载成功');
  console.log('   网关模式:', config.gateway?.mode);
  console.log('   认证模式:', config.gateway?.auth?.mode);
  console.log('   认证令牌:', config.gateway?.auth?.token?.substring(0, 20) + '...');
  console.log('   Ark API 启用:', config.models?.ark?.enabled);
  console.log('   Ark API 模型:', config.models?.ark?.model);
} catch (error) {
  console.log('❌ 配置文件错误:', error.message);
}

console.log('\n2. 智能体目录检查...');
try {
  const agentsDir = 'agents';
  const agentFolders = fs.readdirSync(agentsDir).filter(f => 
    fs.statSync(path.join(agentsDir, f)).isDirectory()
  );
  console.log('✅ 智能体目录存在');
  console.log('   智能体数量:', agentFolders.length);
  console.log('   智能体列表:', agentFolders.join(', '));
} catch (error) {
  console.log('❌ 智能体目录检查失败:', error.message);
}

console.log('\n3. Ark API 适配器检查...');
try {
  const arkAdapter = require('./ark-simple-adapter');
  console.log('✅ Ark API 适配器加载成功');
} catch (error) {
  console.log('❌ Ark API 适配器加载失败:', error.message);
}

console.log('\n4. 网关服务检查...');
try {
  const http = require('http');
  const options = {
    hostname: 'localhost',
    port: 18789,
    path: '/',
    method: 'GET',
    timeout: 2000
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      console.log('✅ 网关服务响应成功');
      console.log('   状态码:', res.statusCode);
      try {
        const response = JSON.parse(data);
        console.log('   网关状态:', response.status);
        console.log('   智能体端口:', Object.keys(response.agents || {}).join(', '));
      } catch (e) {
        console.log('   响应内容:', data.substring(0, 100) + '...');
      }
    });
  });
  
  req.on('error', (error) => {
    console.log('❌ 网关服务无响应:', error.message);
  });
  
  req.on('timeout', () => {
    req.destroy();
    console.log('❌ 网关服务超时');
  });
  
  req.end();
} catch (error) {
  console.log('❌ 网关服务检查失败:', error.message);
}

console.log('\n5. 进程检查...');
try {
  const { execSync } = require('child_process');
  const output = execSync('tasklist | findstr node', { encoding: 'utf8' });
  console.log('✅ Node.js 进程运行中:');
  console.log(output.trim());
} catch (error) {
  console.log('❌ 进程检查失败:', error.message);
}

console.log('\n=== 检查完成 ===');
