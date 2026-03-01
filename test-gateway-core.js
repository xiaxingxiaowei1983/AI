const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

// 模拟网关服务的核心功能
const app = express();

// 中间件
app.use(cors());
app.use(express.json());

// 加载配置
const configPath = path.join(__dirname, 'openclaw.json');
let config = {};
try {
  config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  console.log('✅ 配置文件加载成功');
  console.log('📡 网关配置:', config.gateway);
  console.log('🧠 模型配置:', Object.keys(config.models));
} catch (error) {
  console.error('❌ 无法加载配置文件:', error.message);
  process.exit(1);
}

// 测试路由
app.get('/test/config', (req, res) => {
  res.json({
    success: true,
    config: {
      gateway: config.gateway,
      models: config.models,
      agents: config.agents?.list?.length || 0
    }
  });
});

app.get('/test/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    services: {
      gateway: 'up',
      models: Object.keys(config.models)
    }
  });
});

// 测试豆包模型配置
app.get('/test/doubao', (req, res) => {
  const doubaoConfig = config.models?.doubao;
  if (doubaoConfig && doubaoConfig.enabled) {
    res.json({
      success: true,
      doubao: {
        enabled: doubaoConfig.enabled,
        modelName: doubaoConfig.modelName,
        endpoint: doubaoConfig.endpoint,
        apiKey: doubaoConfig.apiKey ? '***' : 'missing'
      }
    });
  } else {
    res.json({
      success: false,
      error: '豆包模型未配置或未启用'
    });
  }
});

// 启动测试服务器
const PORT = 3001;
try {
  app.listen(PORT, () => {
    console.log(`\n🚀 测试服务器已启动`);
    console.log(`📡 监听地址: http://localhost:${PORT}`);
    console.log(`📋 可用测试端点:`);
    console.log(`   GET  /test/config     - 测试配置加载`);
    console.log(`   GET  /test/health     - 测试健康状态`);
    console.log(`   GET  /test/doubao     - 测试豆包模型配置`);
    
    // 模拟测试请求
    console.log(`\n🔍 正在进行自检...`);
    
    // 测试配置
    const doubaoConfig = config.models?.doubao;
    if (doubaoConfig) {
      console.log('✅ 豆包模型配置存在');
      console.log('   启用状态:', doubaoConfig.enabled);
      console.log('   模型名称:', doubaoConfig.modelName);
      console.log('   端点地址:', doubaoConfig.endpoint);
      console.log('   API密钥:', doubaoConfig.apiKey ? '已配置' : '缺失');
    } else {
      console.log('❌ 豆包模型配置缺失');
    }
    
    // 测试网关配置
    if (config.gateway) {
      console.log('✅ 网关配置存在');
      console.log('   模式:', config.gateway.mode);
      console.log('   认证模式:', config.gateway.auth?.mode);
    } else {
      console.log('❌ 网关配置缺失');
    }
  });
} catch (error) {
  console.error('❌ 启动测试服务器失败:', error);
}