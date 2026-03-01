#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);

const ROOT_DIR = path.resolve(__dirname, '..');
const HEALTH_FILE = path.resolve(ROOT_DIR, 'memory/system-health.json');

async function checkPort(port) {
  try {
    const { stdout } = await execAsync(`netstat -ano | findstr :${port}`);
    return stdout.includes(':') + '';
  } catch (e) {
    return 'false';
  }
}

async function checkOpenClawGateway() {
  const port = 18789;
  const isRunning = await checkPort(port);
  return {
    service: 'OpenClaw Gateway',
    port,
    running: isRunning === 'true',
    status: isRunning === 'true' ? 'healthy' : 'down'
  };
}

async function checkOpenClawCore() {
  const port = 18788;
  const isRunning = await checkPort(port);
  return {
    service: 'OpenClaw Core',
    port,
    running: isRunning === 'true',
    status: isRunning === 'true' ? 'healthy' : 'down'
  };
}

async function checkFeishuBot(botName) {
  const tokenFile = path.resolve(ROOT_DIR, `memory/feishu_token_${botName}.json`);
  let status = 'unknown';
  let lastRefresh = null;
  
  if (fs.existsSync(tokenFile)) {
    try {
      const tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
      const now = Math.floor(Date.now() / 1000);
      if (tokenData.expire && tokenData.expire > now) {
        status = 'healthy';
      } else {
        status = 'expired';
      }
      lastRefresh = tokenData.expire ? new Date(tokenData.expire * 1000).toISOString() : null;
    } catch (e) {
      status = 'error';
    }
  } else {
    status = 'not_initialized';
  }
  
  return {
    bot: botName,
    status,
    lastRefresh,
    healthy: status === 'healthy'
  };
}

async function checkMemory() {
  const memoryDir = path.resolve(ROOT_DIR, 'memory');
  let totalSize = 0;
  let fileCount = 0;
  
  if (fs.existsSync(memoryDir)) {
    const files = fs.readdirSync(memoryDir);
    for (const file of files) {
      const filePath = path.join(memoryDir, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        totalSize += stats.size;
        fileCount++;
      }
    }
  }
  
  return {
    directory: 'memory',
    fileCount,
    totalSize: `${(totalSize / 1024).toFixed(2)} KB`,
    status: 'healthy'
  };
}

async function checkDisk() {
  try {
    const { stdout } = await execAsync('wmic logicaldisk where "DeviceID=\'C:\'" get FreeSpace,Size /value');
    const lines = stdout.trim().split('\n');
    let freeSpace = 0;
    let totalSize = 0;
    
    for (const line of lines) {
      if (line.includes('FreeSpace=')) {
        freeSpace = parseInt(line.split('=')[1]);
      }
      if (line.includes('Size=')) {
        totalSize = parseInt(line.split('=')[1]);
      }
    }
    
    const usedSpace = totalSize - freeSpace;
    const usagePercent = ((usedSpace / totalSize) * 100).toFixed(2);
    
    return {
      drive: 'C:',
      totalSize: `${(totalSize / 1024 / 1024 / 1024).toFixed(2)} GB`,
      freeSpace: `${(freeSpace / 1024 / 1024 / 1024).toFixed(2)} GB`,
      usage: `${usagePercent}%`,
      status: parseFloat(usagePercent) > 90 ? 'warning' : 'healthy'
    };
  } catch (e) {
    return { status: 'error', message: e.message };
  }
}

async function checkNodeProcesses() {
  try {
    const { stdout } = await execAsync('tasklist /FI "IMAGENAME eq node.exe" /nh');
    const lines = stdout.trim().split('\n');
    let count = 0;
    
    for (const line of lines) {
      if (line.includes('node.exe')) {
        count++;
      }
    }
    
    return {
      process: 'node.exe',
      count,
      status: count > 0 ? 'running' : 'stopped'
    };
  } catch (e) {
    return { status: 'error', message: e.message };
  }
}

async function runHealthCheck() {
  console.log('🔍 开始系统健康检查...\n');
  
  const checks = [
    await checkOpenClawGateway(),
    await checkOpenClawCore(),
    await checkFeishuBot('main'),
    await checkFeishuBot('coo'),
    await checkMemory(),
    await checkDisk(),
    await checkNodeProcesses()
  ];
  
  const healthReport = {
    timestamp: new Date().toISOString(),
    overall: 'healthy',
    checks
  };
  
  const unhealthyChecks = checks.filter(c => c.status === 'down' || c.status === 'error' || c.status === 'expired');
  if (unhealthyChecks.length > 0) {
    healthReport.overall = unhealthyChecks.some(c => c.status === 'down' || c.status === 'error') ? 'critical' : 'warning';
  }
  
  const healthDir = path.dirname(HEALTH_FILE);
  if (!fs.existsSync(healthDir)) {
    fs.mkdirSync(healthDir, { recursive: true });
  }
  fs.writeFileSync(HEALTH_FILE, JSON.stringify(healthReport, null, 2));
  
  console.log('=== 系统健康报告 ===\n');
  console.log(`总体状态: ${healthReport.overall.toUpperCase()}\n`);
  
  for (const check of checks) {
    const icon = check.status === 'healthy' || check.status === 'running' ? '✅' : check.status === 'warning' ? '⚠️' : '❌';
    console.log(`${icon} ${check.service || check.bot || check.directory || check.process || 'System'}`);
    console.log(`   状态: ${check.status}`);
    if (check.port) console.log(`   端口: ${check.port}`);
    if (check.running !== undefined) console.log(`   运行中: ${check.running}`);
    if (check.lastRefresh) console.log(`   上次刷新: ${check.lastRefresh}`);
    if (check.usage) console.log(`   磁盘使用: ${check.usage}`);
    if (check.count !== undefined) console.log(`   进程数: ${check.count}`);
    console.log('');
  }
  
  console.log(`报告已保存: ${HEALTH_FILE}`);
  
  return healthReport;
}

if (require.main === module) {
  runHealthCheck().catch(console.error);
}

module.exports = { runHealthCheck, checkOpenClawGateway, checkOpenClawCore, checkFeishuBot };
