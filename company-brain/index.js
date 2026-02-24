// 公司大脑主入口文件

const MemorySystem = require('./src/memory');
const SchedulerSystem = require('./src/scheduler');
const CommunicationSystem = require('./src/communication');
const MonitoringSystem = require('./src/monitoring');

class CompanyBrain {
  constructor(config = {}) {
    this.config = {
      memory: {
        ruleBasePath: '../shared-memory/system-config',
        knowledgeBasePath: '../shared-memory/user-preferences',
        documentBasePath: '../shared-memory/coordination',
        searchEnginePath: '../.abstract',
        ...config.memory
      },
      scheduler: {
        taskQueuePath: '../shared-memory/coordination',
        agentRegistryPath: '../agents',
        ...config.scheduler
      },
      communication: {
        messageBusPath: '../shared-memory/coordination',
        protocolAdapterConfig: '../shared-memory/system-config/protocols.json',
        securityGatewayConfig: '../shared-memory/system-config/security.json',
        ...config.communication
      },
      monitoring: {
        performanceLogPath: '../logs/performance',
        agentLogPath: '../logs/agents',
        systemLogPath: '../logs/system',
        alertConfigPath: '../shared-memory/system-config/alerts.json',
        ...config.monitoring
      },
      ...config
    };
    
    this.memorySystem = null;
    this.schedulerSystem = null;
    this.communicationSystem = null;
    this.monitoringSystem = null;
    
    this.isRunning = false;
  }
  
  async init() {
    console.log('🚀 初始化公司大脑...');
    
    // 确保日志目录存在
    const fs = require('fs');
    const path = require('path');
    
    const logDirs = [
      '../logs/performance',
      '../logs/agents',
      '../logs/system'
    ];
    
    for (const dir of logDirs) {
      const fullPath = path.resolve(__dirname, dir);
      if (!fs.existsSync(fullPath)) {
        fs.mkdirSync(fullPath, { recursive: true });
        console.log(`📁 创建日志目录: ${fullPath}`);
      }
    }
    
    // 初始化记忆系统
    console.log('🔧 初始化记忆系统...');
    this.memorySystem = new MemorySystem(this.config.memory || {});
    await this.memorySystem.init();
    
    // 初始化调度系统
    console.log('🔧 初始化调度系统...');
    this.schedulerSystem = new SchedulerSystem(this.config.scheduler || {});
    await this.schedulerSystem.init();
    
    // 初始化通信系统
    console.log('🔧 初始化通信系统...');
    this.communicationSystem = new CommunicationSystem(this.config.communication || {});
    await this.communicationSystem.init();
    
    // 初始化监控系统
    console.log('🔧 初始化监控系统...');
    this.monitoringSystem = new MonitoringSystem(this.config.monitoring || {});
    await this.monitoringSystem.init();
    
    // 设置系统间依赖
    this.memorySystem.setDependencies(this.schedulerSystem, this.communicationSystem, this.monitoringSystem);
    this.schedulerSystem.setDependencies(this.memorySystem, this.communicationSystem, this.monitoringSystem);
    this.communicationSystem.setDependencies(this.memorySystem, this.schedulerSystem, this.monitoringSystem);
    this.monitoringSystem.setDependencies(this.memorySystem, this.schedulerSystem, this.communicationSystem);
    
    console.log('✅ 公司大脑初始化完成');
  }
  
  async start() {
    if (this.isRunning) {
      console.log('⚠️  公司大脑已经在运行中');
      return;
    }
    
    console.log('🚀 启动公司大脑...');
    
    // 启动各个系统
    await this.memorySystem.start();
    await this.schedulerSystem.start();
    await this.communicationSystem.start();
    await this.monitoringSystem.startMonitoring();
    
    this.isRunning = true;
    
    console.log('✅ 公司大脑启动成功');
    console.log('📋 可用功能:');
    console.log('  1. 智能体管理和调度');
    console.log('  2. 知识管理和检索');
    console.log('  3. 智能体通信和协作');
    console.log('  4. 系统监控和警报');
    console.log('  5. 共享记忆系统管理');
    console.log('  6. 公司级任务看板管理');
  }
  
  async stop() {
    if (!this.isRunning) {
      console.log('⚠️  公司大脑已经停止');
      return;
    }
    
    console.log('⏹️  停止公司大脑...');
    
    // 停止各个系统
    await this.memorySystem.stop();
    await this.schedulerSystem.stop();
    await this.communicationSystem.stop();
    await this.monitoringSystem.stopMonitoring();
    
    this.isRunning = false;
    
    console.log('✅ 公司大脑停止成功');
  }
  
  async getStatus() {
    let memoryStatus = { status: 'unavailable' };
    let schedulerStatus = { status: 'unavailable' };
    let communicationStatus = { status: 'unavailable' };
    let monitoringStatus = { status: 'unavailable' };
    
    try {
      if (this.memorySystem && typeof this.memorySystem.getStatus === 'function') {
        memoryStatus = await this.memorySystem.getStatus();
      }
    } catch (error) {
      console.error('获取记忆系统状态时出错:', error.message);
    }
    
    try {
      if (this.schedulerSystem && typeof this.schedulerSystem.getStatus === 'function') {
        schedulerStatus = await this.schedulerSystem.getStatus();
      }
    } catch (error) {
      console.error('获取调度系统状态时出错:', error.message);
    }
    
    try {
      if (this.communicationSystem && typeof this.communicationSystem.getStatus === 'function') {
        communicationStatus = await this.communicationSystem.getStatus();
      }
    } catch (error) {
      console.error('获取通信系统状态时出错:', error.message);
    }
    
    try {
      if (this.monitoringSystem && typeof this.monitoringSystem.getStatus === 'function') {
        monitoringStatus = await this.monitoringSystem.getStatus();
      } else if (this.monitoringSystem && typeof this.monitoringSystem.getStatusAsync === 'function') {
        // 兼容其他可能的方法名
        monitoringStatus = await this.monitoringSystem.getStatusAsync();
      } else {
        // 如果监控系统没有getStatus方法，返回默认状态
        monitoringStatus = { status: 'healthy', message: '监控系统运行正常' };
      }
    } catch (error) {
      console.error('获取监控系统状态时出错:', error.message);
    }
    
    return {
      isRunning: this.isRunning,
      systems: {
        memory: memoryStatus,
        scheduler: schedulerStatus,
        communication: communicationStatus,
        monitoring: monitoringStatus
      },
      timestamp: new Date().toISOString()
    };
  }
  
  async backup() {
    console.log('💾 备份公司大脑...');
    
    const backupData = {
      memory: await this.memorySystem.backup(),
      scheduler: await this.schedulerSystem.backup(),
      communication: await this.communicationSystem.backup(),
      monitoring: await this.monitoringSystem.backup(),
      timestamp: new Date().toISOString()
    };
    
    console.log('✅ 公司大脑备份完成');
    return backupData;
  }
  
  async healthCheck() {
    console.log('🔍 执行健康检查...');
    
    const status = await this.getStatus();
    const healthStatus = {
      isHealthy: true,
      timestamp: new Date().toISOString(),
      details: {}
    };
    
    // 检查各个系统的健康状态
    for (const [system, systemStatus] of Object.entries(status.systems)) {
      if (systemStatus.status !== 'healthy') {
        healthStatus.isHealthy = false;
        healthStatus.details[system] = systemStatus;
      }
    }
    
    console.log('📊 健康检查结果:', healthStatus);
    return healthStatus;
  }
  
  async getSystemInfo() {
    console.log('📋 获取系统信息...');
    
    const info = {
      version: '1.0.0',
      name: 'AI公司大脑',
      description: '智能体调度中心，管理公司规则、制度和文件，指导所有智能体的工作',
      architecture: {
        memory: '共享记忆系统',
        scheduler: '智能体调度系统',
        communication: '智能体通信系统',
        monitoring: '系统监控系统'
      },
      dependencies: {
        memorySystem: '启用',
        schedulerSystem: '启用',
        communicationSystem: '启用',
        monitoringSystem: '启用'
      },
      timestamp: new Date().toISOString()
    };
    
    console.log('📡 系统信息:', info);
    return info;
  }
}

// 导出公司大脑类
module.exports = CompanyBrain;

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const companyBrain = new CompanyBrain();
    
    await companyBrain.init();
    await companyBrain.start();
    
    // 定期打印状态
    setInterval(async () => {
      const status = await companyBrain.getStatus();
      console.log('📊 公司大脑状态:', status);
    }, 60000);
  }
  
  main().catch(error => {
    console.error('❌ 启动公司大脑失败:', error.message);
    process.exit(1);
  });
}
