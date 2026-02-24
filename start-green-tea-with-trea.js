const TreaModelProxy = require('./skills/trea-model-proxy/index.js');

async function startGreenTeaAgent() {
  console.log('🚀 启动绿茶智能体 (使用 Trea 大模型代理)...');
  
  try {
    // 创建 TreaModelProxy 实例
    const proxy = new TreaModelProxy();
    
    // 跳过Trea环境检测，直接生成配置
    console.log('✅ 跳过Trea环境检测');
    
    // 生成免密钥配置
    const config = proxy.generateApiFreeConfig('psychological');
    console.log('✅ 生成免密钥配置成功');
    
    // 启动绿茶智能体
    const startResult = await proxy.startApiFreeAgent('green-tea', config);
    
    if (startResult.success) {
      console.log('✅ 绿茶智能体启动成功！');
      console.log('📢 智能体消息:', startResult.message);
      console.log('\n🎯 现在你可以通过以下方式与绿茶智能体交互:');
      console.log('   1. 访问控制面板: http://127.0.0.1:18789/');
      console.log('   2. 在终端中使用: openclaw agent --agent green-tea --message "@绿茶 你好"');
    } else {
      console.error('❌ 绿茶智能体启动失败:', startResult.error);
    }
  } catch (error) {
    console.error('❌ 启动过程中发生错误:', error.message);
  }
}

// 启动绿茶智能体
startGreenTeaAgent();