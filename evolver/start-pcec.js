const PCECSystem = require('./pcec-core');

console.log('=== Starting PCEC (Periodic Cognitive Expansion Cycle) System ===');
console.log('Current time:', new Date().toISOString());

// Create PCEC system instance
const pcecSystem = new PCECSystem();

// Start the system
pcecSystem.start();

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n=== Stopping PCEC system ===');
  pcecSystem.stop();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n=== Stopping PCEC system ===');
  pcecSystem.stop();
  process.exit(0);
});

// Log system status every 5 minutes
setInterval(() => {
  const status = pcecSystem.getStatus();
  console.log('\n=== PCEC System Status ===');
  console.log('Is running:', status.isRunning);
  console.log('Last execution:', status.lastExecutionTime ? status.lastExecutionTime.toISOString() : 'Never');
  console.log('Consecutive no evolution:', status.consecutiveNoEvolution);
  console.log('Cycle count:', status.cycleCount);
  console.log('Product count:', status.productCount);
  console.log('Breakthrough count:', status.breakthroughCount);
  
  // 健康检查
  performHealthCheck(pcecSystem);
}, 5 * 60 * 1000);

// 健康检查函数
function performHealthCheck(pcecSystem) {
  console.log('\n=== PCEC System Health Check ===');
  
  // 检查系统状态
  const status = pcecSystem.getStatus();
  
  // 检查进化周期是否正常
  if (status.lastExecutionTime) {
    const timeSinceLastExecution = Date.now() - new Date(status.lastExecutionTime).getTime();
    const maxTimeSinceExecution = 70 * 60 * 1000; // 70分钟
    
    if (timeSinceLastExecution > maxTimeSinceExecution) {
      console.log('⚠️  警告: 进化周期可能卡住，上次执行时间超过70分钟');
    } else {
      console.log('✅ 进化周期运行正常');
    }
  } else {
    console.log('⚠️  警告: 系统尚未执行任何进化周期');
  }
  
  // 检查连续无进化周期数
  if (status.consecutiveNoEvolution >= 2) {
    console.log('⚠️  警告: 连续无进化周期数达到或超过2，下次将触发强制突破');
  } else {
    console.log('✅ 连续无进化周期数在正常范围内');
  }
  
  // 检查系统资源使用
  checkSystemResources();
  
  // 检查反进化锁定状态
  checkAntiDegenerationLockStatus(pcecSystem);
}

// 检查系统资源使用
function checkSystemResources() {
  const os = require('os');
  
  // 内存使用情况
  const totalMemory = os.totalmem();
  const freeMemory = os.freemem();
  const memoryUsage = ((totalMemory - freeMemory) / totalMemory * 100).toFixed(2);
  
  // CPU使用情况
  const cpuUsage = os.loadavg()[0] / os.cpus().length * 100;
  
  console.log(`✅ 内存使用: ${memoryUsage}%`);
  console.log(`✅ CPU使用: ${cpuUsage.toFixed(2)}%`);
  
  if (parseFloat(memoryUsage) > 80) {
    console.log('⚠️  警告: 内存使用超过80%');
  }
  
  if (cpuUsage > 80) {
    console.log('⚠️  警告: CPU使用超过80%');
  }
}

// 检查反进化锁定状态
function checkAntiDegenerationLockStatus(pcecSystem) {
  console.log('\n=== Anti-Degeneration Lock Status ===');
  
  // 检查能力版本记录
  const fs = require('fs');
  const path = require('path');
  const capabilityVersionsFile = path.join(__dirname, 'capability-versions.json');
  
  if (fs.existsSync(capabilityVersionsFile)) {
    try {
      const capabilityVersions = JSON.parse(fs.readFileSync(capabilityVersionsFile, 'utf8'));
      const capabilityCount = Object.keys(capabilityVersions).length;
      console.log(`✅ 能力版本记录数: ${capabilityCount}`);
      
      // 检查每个能力的版本数
      Object.keys(capabilityVersions).forEach(capabilityId => {
        const versionCount = capabilityVersions[capabilityId].length;
        console.log(`  - ${capabilityId}: ${versionCount} 个版本`);
      });
    } catch (error) {
      console.error('Error reading capability versions:', error.message);
    }
  } else {
    console.log('⚠️  能力版本记录文件不存在');
  }
  
  console.log('✅ 反进化锁定功能已启用');
}

console.log('=== PCEC System Initialized ===');
console.log('System will run continuously, press Ctrl+C to stop');
