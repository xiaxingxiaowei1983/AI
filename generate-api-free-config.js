// 生成免密钥配置脚本
const fs = require('fs');
const path = require('path');

// 生成免密钥配置
function generateApiFreeConfig(agentType = 'business') {
  return {
    model: {
      provider: 'trea',
      useInternalModel: true,
      optimization: {
        enableCache: true,
        cacheSize: 100,
        enableStreaming: true
      },
      session: {
        maxHistory: 50,
        enableSummary: true,
        summaryThreshold: 20
      }
    },
    agent: {
      type: agentType,
      autoRun: true
    },
    evo: {
      enable: true,
      review: true,
      autoImprove: false
    }
  };
}

// 保存配置到文件
function saveConfig(config, agentName) {
  const configPath = path.join(__dirname, 'agents', agentName, 'config.json');
  
  // 确保目录存在
  const agentDir = path.dirname(configPath);
  if (!fs.existsSync(agentDir)) {
    fs.mkdirSync(agentDir, { recursive: true });
  }
  
  // 读取现有配置
  let existingConfig = {};
  if (fs.existsSync(configPath)) {
    try {
      existingConfig = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
      console.error('❌ 读取现有配置失败:', error.message);
    }
  }
  
  // 合并配置
  const finalConfig = {
    ...existingConfig,
    ...config
  };
  
  // 保存配置
  fs.writeFileSync(configPath, JSON.stringify(finalConfig, null, 2));
  console.log(`✅ 配置已保存到: ${configPath}`);
  
  return finalConfig;
}

// 主函数
function main() {
  console.log('🧠 生成免密钥配置...');
  
  // 为business智能体生成配置
  const businessConfig = generateApiFreeConfig('business');
  const savedConfig = saveConfig(businessConfig, 'business');
  
  console.log('\n📋 生成的配置:');
  console.log(JSON.stringify(savedConfig, null, 2));
  
  console.log('\n✅ 免密钥配置生成完成！');
  console.log('\n🎯 接下来可以使用以下命令启动智能体:');
  console.log('node start-business-agent.js');
}

// 执行主函数
if (require.main === module) {
  main();
}

module.exports = {
  generateApiFreeConfig,
  saveConfig
};
