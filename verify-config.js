const fs = require('fs');
const path = require('path');

console.log('=== 验证配置文件 ===\n');

try {
  const configPath = path.join(__dirname, 'openclaw-final-config.json');
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  
  console.log('✅ 配置文件格式正确');
  
  // 验证关键部分
  if (config.channels) {
    console.log('\n✅ 通道配置存在:');
    Object.keys(config.channels).forEach(channel => {
      console.log(`   - ${channel}: ${config.channels[channel].enabled ? '已启用' : '未启用'}`);
    });
  }
  
  if (config.agentCommunication) {
    console.log('\n✅ 智能体间通信配置存在');
    console.log(`   已启用: ${config.agentCommunication.enabled}`);
    if (config.agentCommunication.permissions) {
      console.log(`   权限配置: ${Object.keys(config.agentCommunication.permissions).length} 个智能体`);
    }
  }
  
  if (config.bindings) {
    console.log('\n✅ 路由绑定规则存在');
    console.log(`   绑定规则数量: ${config.bindings.length}`);
  }
  
  if (config.agents && config.agents.list) {
    console.log('\n✅ 智能体配置存在');
    console.log(`   智能体数量: ${config.agents.list.length}`);
    config.agents.list.forEach(agent => {
      console.log(`   - ${agent.name} (${agent.id})`);
    });
  }
  
  if (config.plugins && config.plugins.entries) {
    console.log('\n✅ 插件配置存在');
    Object.keys(config.plugins.entries).forEach(plugin => {
      console.log(`   - ${plugin}: ${config.plugins.entries[plugin].enabled ? '已启用' : '未启用'}`);
    });
  }
  
  console.log('\n=== 配置验证完成 ===');
  console.log('\n📝 使用说明:');
  console.log('1. 将此配置文件复制到 C:\\Users\\10919\\.openclaw\\openclaw.json');
  console.log('2. 设置 Discord 相关环境变量:');
  console.log('   - DISCORD_BOT_TOKEN');
  console.log('   - DISCORD_GUILD_ID');
  console.log('3. 重启 OpenClaw 网关');
  
} catch (error) {
  console.error('❌ 配置文件验证失败:', error.message);
  process.exit(1);
}
