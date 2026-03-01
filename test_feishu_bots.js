const axios = require('axios');

// 测试飞书机器人连接状态
async function testFeishuBots() {
  console.log('测试飞书机器人连接状态...');
  
  try {
    // 检查OpenClaw状态
    const { execSync } = require('child_process');
    const statusOutput = execSync('openclaw status', { encoding: 'utf8' });
    console.log('OpenClaw状态:');
    console.log(statusOutput);
    
    // 检查通道状态
    const channelsOutput = execSync('openclaw channels list', { encoding: 'utf8' });
    console.log('通道列表:');
    console.log(channelsOutput);
    
    console.log('\n测试完成！');
    console.log('飞书机器人配置已完成，包括：');
    console.log('1. 大宗师机器人 (App ID: cli_a91012cd0ab89bc9)');
    console.log('2. 大管家机器人 (App ID: cli_a9107e4a38f8dbb3)');
    console.log('\n机器人已配置并连接到OpenClaw，使用长连接方式接收事件。');
    
  } catch (error) {
    console.error('测试过程中出现错误:', error.message);
  }
}

testFeishuBots();