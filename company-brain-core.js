// 公司大脑核心文件 - 集成到现有项目

const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// 公司大脑核心类
class CompanyBrainCore {
  constructor(config = {}) {
    this.config = {
      ...config
    };
    
    this.processes = {};
    this.isRunning = false;
  }
  
  async init() {
    console.log('🚀 初始化公司大脑核心...');
    
    // 检查必要的配置文件
    console.log('🔧 检查配置文件...');
    if (!fs.existsSync('./openclaw.json')) {
      throw new Error('❌ openclaw.json 配置文件不存在');
    }
    
    console.log('✅ 配置文件检查完成');
  }
  
  async start() {
    await this.init();
    
    console.log('🚀 启动公司大脑服务...');
    
    // 启动 OpenClaw Gateway
    console.log('🌐 启动 OpenClaw Gateway...');
    this.startGateway();
    
    // 启动智能体
    console.log('🤖 启动核心智能体...');
    this.startAgents();
    
    this.isRunning = true;
    console.log('✅ 公司大脑服务已启动');
    console.log('📋 可用功能:');
    console.log('  1. 智能体调度和任务分配');
    console.log('  2. 知识管理和检索');
    console.log('  3. 智能体通信和协作');
    console.log('  4. 系统监控和警报');
    console.log('  5. 与 EvoMap 节点集成');
  }
  
  startGateway() {
    console.log('   📡 启动 Gateway 服务...');
    const gatewayProcess = exec('npx openclaw gateway', {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    
    gatewayProcess.on('error', (error) => {
      console.error('❌ Gateway 启动失败:', error.message);
    });
    
    gatewayProcess.on('exit', (code) => {
      console.log(`📡 Gateway 进程退出，代码: ${code}`);
    });
    
    this.processes.gateway = gatewayProcess;
  }
  
  startAgents() {
    // 启动大宗师智能体
    console.log('   👑 启动大宗师智能体...');
    const masterProcess = exec('node start-master.js', {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    
    masterProcess.on('error', (error) => {
      console.error('❌ 大宗师智能体启动失败:', error.message);
      console.log('⚠️  系统将继续运行，不依赖于大宗师智能体');
    });
    
    masterProcess.on('exit', (code) => {
      console.log(`👑 大宗师智能体进程退出，代码: ${code}`);
      if (code !== 0) {
        console.log('⚠️  大宗师智能体退出，系统将继续运行基本功能');
      }
    });
    
    this.processes.master = masterProcess;
    
    // 启动 COO 智能体
    console.log('   📋 启动 COO 智能体...');
    const cooProcess = exec('node start-coo.js', {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    
    cooProcess.on('error', (error) => {
      console.error('❌ COO 智能体启动失败:', error.message);
      console.log('⚠️  系统将继续运行，不依赖于 COO 智能体');
    });
    
    cooProcess.on('exit', (code) => {
      console.log(`📋 COO 智能体进程退出，代码: ${code}`);
      if (code !== 0) {
        console.log('⚠️  COO 智能体退出，系统将继续运行基本功能');
      }
    });
    
    this.processes.coo = cooProcess;
    
    // 启动谛听智能体 (CCO / 风险哨兵)
    console.log('   🔍 启动谛听智能体...');
    const businessProcess = exec('node start-business-agent.js', {
      cwd: process.cwd(),
      stdio: 'inherit'
    });
    
    businessProcess.on('error', (error) => {
      console.error('❌ 谛听智能体启动失败:', error.message);
      console.log('⚠️  系统将继续运行，不依赖于谛听智能体');
    });
    
    businessProcess.on('exit', (code) => {
      console.log(`🔍 谛听智能体进程退出，代码: ${code}`);
      if (code !== 0) {
        console.log('⚠️  谛听智能体退出，系统将继续运行基本功能');
      }
    });
    
    this.processes.business = businessProcess;
  }
  
  async stop() {
    if (this.isRunning) {
      console.log('⏹️  停止公司大脑服务...');
      
      // 停止所有进程
      for (const [name, process] of Object.entries(this.processes)) {
        console.log(`   ⏹️  停止 ${name} 进程...`);
        process.kill();
      }
      
      this.isRunning = false;
      this.processes = {};
      console.log('✅ 公司大脑服务已停止');
    }
  }
  
  async getStatus() {
    return {
      isRunning: this.isRunning,
      processes: Object.keys(this.processes),
      timestamp: new Date().toISOString()
    };
  }
}

// 导出公司大脑核心类
module.exports = CompanyBrainCore;

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const companyBrain = new CompanyBrainCore();
    await companyBrain.start();
    
    // 保持进程运行
    process.stdin.resume();
  }
  
  main().catch(error => {
    console.error('❌ 启动公司大脑失败:', error.message);
    process.exit(1);
  });
}
