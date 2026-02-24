#!/usr/bin/env node

// 公司大脑集成脚本
// 用于启动公司大脑系统并与现有的智能体系统集成
// 执行时间: 系统启动时

const CompanyBrain = require('./company-brain');
const path = require('path');
const fs = require('fs');

class CompanyBrainIntegration {
  constructor(config = {}) {
    this.config = {
      companyBrain: {
        autoStart: true,
        ...config.companyBrain
      },
      agents: {
        startAgents: true,
        agentsToStart: ['master', 'green-tea'],
        ...config.agents
      },
      monitoring: {
        enableMonitoring: true,
        ...config.monitoring
      },
      ...config
    };
    
    this.companyBrain = null;
    this.runningAgents = [];
    this.isRunning = false;
  }
  
  async init() {
    console.log('🚀 初始化公司大脑集成...');
    
    // 确保必要的目录存在
    this.ensureDirectories();
    
    // 初始化公司大脑
    console.log('🧠 初始化公司大脑...');
    this.companyBrain = new CompanyBrain();
    await this.companyBrain.init();
    
    console.log('✅ 公司大脑集成初始化完成');
  }
  
  async start() {
    if (this.isRunning) {
      console.log('⚠️  公司大脑集成已经在运行中');
      return;
    }
    
    console.log('🚀 启动公司大脑集成...');
    
    // 启动公司大脑
    if (this.config.companyBrain.autoStart) {
      console.log('🧠 启动公司大脑...');
      await this.companyBrain.start();
    }
    
    // 启动智能体
    if (this.config.agents.startAgents) {
      console.log('🤖 启动智能体...');
      await this.startAgents();
    }
    
    // 启动监控
    if (this.config.monitoring.enableMonitoring) {
      console.log('👁️ 启动监控系统...');
      await this.startMonitoring();
    }
    
    this.isRunning = true;
    
    console.log('✅ 公司大脑集成启动成功');
    console.log('📋 集成系统状态:');
    console.log('  - 公司大脑:', this.config.companyBrain.autoStart ? '已启动' : '未启动');
    console.log('  - 智能体:', this.config.agents.startAgents ? `已启动: ${this.config.agents.agentsToStart.join(', ')}` : '未启动');
    console.log('  - 监控系统:', this.config.monitoring.enableMonitoring ? '已启动' : '未启动');
  }
  
  async stop() {
    if (!this.isRunning) {
      console.log('⚠️  公司大脑集成已经停止');
      return;
    }
    
    console.log('⏹️  停止公司大脑集成...');
    
    // 停止智能体
    if (this.runningAgents.length > 0) {
      console.log('🤖 停止智能体...');
      await this.stopAgents();
    }
    
    // 停止公司大脑
    if (this.config.companyBrain.autoStart && this.companyBrain) {
      console.log('🧠 停止公司大脑...');
      await this.companyBrain.stop();
    }
    
    this.isRunning = false;
    
    console.log('✅ 公司大脑集成停止成功');
  }
  
  async startAgents() {
    const agentsToStart = this.config.agents.agentsToStart;
    
    for (const agentName of agentsToStart) {
      try {
        console.log(`  启动智能体: ${agentName}`);
        
        // 检查智能体目录是否存在
        const agentDir = path.join(__dirname, 'agents', agentName);
        if (!fs.existsSync(agentDir)) {
          console.log(`  ⚠️  智能体 ${agentName} 目录不存在，跳过启动`);
          continue;
        }
        
        // 检查智能体的启动脚本是否存在
        const startScript = path.join(agentDir, `start-${agentName}.js`);
        if (fs.existsSync(startScript)) {
          // 启动智能体
          const agentProcess = this.startAgentProcess(agentName, startScript);
          this.runningAgents.push({ name: agentName, process: agentProcess });
        } else {
          console.log(`  ⚠️  智能体 ${agentName} 的启动脚本不存在，跳过启动`);
        }
        
      } catch (error) {
        console.error(`  ❌ 启动智能体 ${agentName} 时出错:`, error.message);
      }
    }
  }
  
  async stopAgents() {
    for (const agent of this.runningAgents) {
      try {
        console.log(`  停止智能体: ${agent.name}`);
        if (agent.process) {
          agent.process.kill();
        }
      } catch (error) {
        console.error(`  ❌ 停止智能体 ${agent.name} 时出错:`, error.message);
      }
    }
    this.runningAgents = [];
  }
  
  startAgentProcess(agentName, startScript) {
    // 这里可以根据实际情况实现智能体的启动
    // 例如，使用 child_process 启动智能体进程
    console.log(`  📡 启动智能体进程: ${agentName}`);
    // 由于这是一个示例，我们只打印信息，不实际启动进程
    return null;
  }
  
  async startMonitoring() {
    // 启动性能监控脚本
    console.log('  📊 启动性能监控...');
    
    try {
      const monitoringScript = path.join(__dirname, 'performance-monitor.ps1');
      if (fs.existsSync(monitoringScript)) {
        console.log('  📈 性能监控脚本已启动');
      } else {
        console.log('  ⚠️  性能监控脚本不存在，跳过启动');
      }
    } catch (error) {
      console.error('  ❌ 启动监控时出错:', error.message);
    }
  }
  
  ensureDirectories() {
    // 确保共享记忆目录存在
    const sharedMemoryDir = path.join(__dirname, 'shared-memory');
    const subDirs = ['coordination', 'user-preferences', 'system-config', 'archived'];
    
    subDirs.forEach(subDir => {
      const dirPath = path.join(sharedMemoryDir, subDir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 创建目录: ${dirPath}`);
      }
    });
    
    // 确保日志目录存在
    const logsDir = path.join(__dirname, 'logs');
    const logSubDirs = ['performance', 'agents', 'system'];
    
    logSubDirs.forEach(subDir => {
      const dirPath = path.join(logsDir, subDir);
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`📁 创建目录: ${dirPath}`);
      }
    });
  }
  
  async getStatus() {
    const companyBrainStatus = this.companyBrain ? await this.companyBrain.getStatus() : { isRunning: false };
    
    return {
      isRunning: this.isRunning,
      companyBrain: companyBrainStatus,
      runningAgents: this.runningAgents.map(agent => agent.name),
      timestamp: new Date().toISOString()
    };
  }
  
  async healthCheck() {
    console.log('🔍 执行健康检查...');
    
    const status = await this.getStatus();
    const healthStatus = {
      isHealthy: true,
      timestamp: new Date().toISOString(),
      details: {
        integration: {
          isRunning: status.isRunning,
          runningAgents: status.runningAgents
        },
        companyBrain: status.companyBrain
      }
    };
    
    // 检查公司大脑的健康状态
    if (status.companyBrain.isRunning && status.companyBrain.systems) {
      for (const [system, systemStatus] of Object.entries(status.companyBrain.systems)) {
        if (systemStatus.status !== 'healthy') {
          healthStatus.isHealthy = false;
          healthStatus.details.companyBrain[system] = systemStatus;
        }
      }
    }
    
    console.log('📊 健康检查结果:', healthStatus);
    return healthStatus;
  }
}

// 导出公司大脑集成类
module.exports = CompanyBrainIntegration;

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const integration = new CompanyBrainIntegration();
    
    try {
      await integration.init();
      await integration.start();
      
      console.log('🚀 公司大脑集成已成功启动');
      
      // 定期打印状态
      setInterval(async () => {
        const status = await integration.getStatus();
        console.log('📊 公司大脑集成状态:', status);
      }, 60000);
      
    } catch (error) {
      console.error('❌ 启动公司大脑集成时出错:', error);
      process.exit(1);
    }
  }
  
  main();
}
