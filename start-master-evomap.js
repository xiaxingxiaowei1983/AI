/**
 * 大宗师 EvoMap 连接脚本
 * 版本: 1.0.0
 * 描述: 让大宗师连接到 EvoMap 平台，启用进化能力
 */

const { getBindingStatus, sendHeartbeat } = require('./evomap-binding');
const fs = require('fs');
const path = require('path');

// 检查大掌柜的配置
function loadDaZhangGuiConfig() {
  const configPath = path.join(__dirname, 'evolver', 'config.json');
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
      console.error('读取大掌柜配置失败:', error.message);
      return null;
    }
  }
  return null;
}

// 为大宗师创建配置
function createMasterConfig(daZhangGuiConfig) {
  const masterConfigPath = path.join(__dirname, 'evolver', 'master-config.json');
  const masterConfig = {
    agent_id: `node_${Date.now()}_master`,
    agent_name: '大宗师',
    role: 'CEO / 核心意志',
    registered_at: new Date().toISOString(),
    owner_email: daZhangGuiConfig.owner_email,
    hub_node_id: daZhangGuiConfig.hub_node_id,
    heartbeat_interval_ms: daZhangGuiConfig.heartbeat_interval_ms
  };
  
  fs.writeFileSync(masterConfigPath, JSON.stringify(masterConfig, null, 2));
  console.log('✅ 大宗师配置创建成功');
  return masterConfig;
}

async function connectMasterToEvoMap() {
  console.log('=== 大宗师 EvoMap 连接流程 ===\n');
  
  try {
    // 步骤1: 检查大掌柜配置
    console.log('步骤1: 检查大掌柜 EvoMap 配置...');
    const daZhangGuiConfig = loadDaZhangGuiConfig();
    
    if (!daZhangGuiConfig) {
      throw new Error('大掌柜未绑定 EvoMap，请先绑定大掌柜');
    }
    
    console.log('✅ 大掌柜配置检查完成');
    console.log(`   大掌柜节点ID: ${daZhangGuiConfig.agent_id}`);
    console.log(`   所有者邮箱: ${daZhangGuiConfig.owner_email}`);
    console.log(`   节点状态: ${daZhangGuiConfig.node_status}`);
    console.log('');
    
    // 步骤2: 为大宗师创建配置
    console.log('步骤2: 为大宗师创建 EvoMap 配置...');
    const masterConfig = createMasterConfig(daZhangGuiConfig);
    console.log('');
    
    // 步骤3: 检查连接状态
    console.log('步骤3: 检查 EvoMap 连接状态...');
    const status = getBindingStatus();
    console.log('✅ 状态检查完成');
    console.log(`   节点ID: ${status.nodeId || '未设置'}`);
    console.log(`   代理名称: ${status.agentName || '未设置'}`);
    console.log(`   所有者邮箱: ${status.ownerEmail || '未设置'}`);
    console.log(`   注册时间: ${status.registeredAt || '未设置'}`);
    console.log(`   上次心跳: ${status.lastHeartbeat || '未设置'}`);
    console.log(`   节点状态: ${status.nodeStatus || '未知'}`);
    console.log('');
    
    // 步骤4: 尝试发送心跳
    console.log('步骤4: 尝试发送心跳保持连接...');
    try {
      const heartbeatResult = await sendHeartbeat();
      if (heartbeatResult) {
        console.log('✅ 心跳发送成功，节点保持在线');
      } else {
        console.log('⚠️  心跳发送失败，节点可能离线');
      }
    } catch (heartbeatError) {
      console.log('⚠️  心跳发送失败:', heartbeatError.message);
    }
    console.log('');
    
    // 步骤5: 提供使用指南
    console.log('步骤5: 使用指南');
    console.log('=====================================');
    console.log('1. 由于网络连接问题，直接绑定可能暂时不可用');
    console.log('2. 大宗师已使用大掌柜的 EvoMap 配置模板');
    console.log('3. 当网络恢复后，可通过以下命令重新尝试绑定:');
    console.log('   node start-master-evomap.js');
    console.log('4. 或者使用 EvoMap 网页界面手动添加大宗师节点');
    console.log('=====================================\n');
    
    console.log('=== 连接流程完成 ===');
    console.log('大宗师已准备就绪，等待网络恢复后完成 EvoMap 绑定！');
    console.log('');
    
    return {
      status: 'prepared',
      message: '大宗师配置已准备就绪，等待网络恢复后完成绑定',
      daZhangGuiConfig: {
        nodeId: daZhangGuiConfig.agent_id,
        email: daZhangGuiConfig.owner_email,
        status: daZhangGuiConfig.node_status
      }
    };
    
  } catch (error) {
    console.error('❌ 连接失败:', error.message);
    throw error;
  }
}

// 主函数
async function main() {
  try {
    await connectMasterToEvoMap();
  } catch (error) {
    console.error('❌ 执行失败:', error.message);
    process.exit(1);
  }
}

// 执行主函数
if (require.main === module) {
  main();
}

// 导出模块
module.exports = {
  connectMasterToEvoMap,
  getBindingStatus,
  sendHeartbeat
};
