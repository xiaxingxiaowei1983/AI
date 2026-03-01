#!/usr/bin/env node

const feishuClient = require('./skills/feishu-skills/feishu-common/index.js');

async function testBots() {
    console.log('=== 测试飞书双机器人配置 ===\n');
    
    // 测试主机器人
    console.log('1. 测试主机器人 (main):');
    try {
        const mainToken = await feishuClient.getToken(false, 'main');
        console.log('   ✅ 成功获取主机器人 token:', mainToken.substring(0, 20) + '...');
    } catch (e) {
        console.log('   ❌ 主机器人获取 token 失败:', e.message);
    }
    
    // 测试 COO 机器人
    console.log('\n2. 测试 COO 机器人 (coo):');
    try {
        const cooToken = await feishuClient.getToken(false, 'coo');
        console.log('   ✅ 成功获取 COO 机器人 token:', cooToken.substring(0, 20) + '...');
    } catch (e) {
        console.log('   ❌ COO 机器人获取 token 失败:', e.message);
    }
    
    // 测试默认机器人
    console.log('\n3. 测试默认机器人:');
    try {
        const defaultToken = await feishuClient.getToken(false);
        console.log('   ✅ 成功获取默认机器人 token:', defaultToken.substring(0, 20) + '...');
    } catch (e) {
        console.log('   ❌ 默认机器人获取 token 失败:', e.message);
    }
    
    // 显示配置信息
    console.log('\n4. 配置信息:');
    console.log('   机器人配置:', JSON.stringify(feishuClient.botsConfig, null, 2));
    
    console.log('\n=== 测试完成 ===');
}

testBots().catch(console.error);