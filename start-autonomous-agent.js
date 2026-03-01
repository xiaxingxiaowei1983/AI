#!/usr/bin/env node

/**
 * 自主智能体系统启动脚本
 * 用于启动和管理自主智能体系统
 */

const AutonomousAgent = require('./autonomous-agent');
const fs = require('fs');
const path = require('path');

class AgentManager {
  constructor() {
    this.agent = null;
    this.config = {
      agentName: 'Bilian Autonomous Agent',
      logLevel: 'info',
      storageDir: path.join(__dirname, 'agent-storage')
    };
  }
  
  async start() {
    console.log('========================================');
    console.log('🤖 启动自主智能体系统');
    console.log('========================================');
    
    try {
      // 初始化智能体
      this.agent = new AutonomousAgent({
        name: this.config.agentName,
        logLevel: this.config.logLevel,
        storageDir: this.config.storageDir
      });
      
      // 启动智能体
      const started = await this.agent.start();
      
      if (started) {
        console.log('✅ 自主智能体系统启动成功');
        console.log('📊 系统状态:', this.agent.getStatus());
        
        // 保持进程运行
        this.keepRunning();
      } else {
        console.error('❌ 自主智能体系统启动失败');
        process.exit(1);
      }
      
    } catch (error) {
      console.error('启动错误:', error.message);
      process.exit(1);
    }
  }
  
  keepRunning() {
    // 监听进程信号
    process.on('SIGINT', async () => {
      console.log('\n🔄 接收到停止信号');
      await this.stop();
    });
    
    process.on('SIGTERM', async () => {
      console.log('\n🔄 接收到终止信号');
      await this.stop();
    });
    
    // 防止进程退出
    setInterval(() => {
      // 定期检查系统状态
      if (this.agent) {
        const status = this.agent.getStatus();
        if (status.status === 'failed') {
          console.error('❌ 系统状态异常，正在重启...');
          this.restart();
        }
      }
    }, 60000); // 每分钟检查一次
  }
  
  async stop() {
    if (this.agent) {
      console.log('🛑 停止自主智能体系统');
      await this.agent.stop();
      console.log('✅ 自主智能体系统已停止');
    }
    process.exit(0);
  }
  
  async restart() {
    console.log('🔄 重启自主智能体系统');
    await this.stop();
    await this.start();
  }
  
  getStatus() {
    if (this.agent) {
      return this.agent.getStatus();
    }
    return { status: 'not_started' };
  }
}

// 启动智能体
if (require.main === module) {
  const manager = new AgentManager();
  manager.start();
}

module.exports = AgentManager;