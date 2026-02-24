// 系统监控配置
// 负责监控系统健康状态并提供自动预警机制

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class SystemMonitor {
  constructor() {
    this.monitoringInterval = 30 * 1000; // 30秒检查一次
    this.alertThresholds = {
      cpu: 80, // CPU使用率阈值（%）
      memory: 90, // 内存使用率阈值（%）
      disk: 95, // 磁盘使用率阈值（%）
      responseTime: 5000, // 响应时间阈值（毫秒）
      errorRate: 10 // 错误率阈值（%）
    };
    this.monitorInterval = null;
    this.isMonitoring = false;
    this.monitoringData = [];
    this.alertHistory = [];
    this.logPath = path.join(__dirname, 'monitoring-logs');
    this.configPath = path.join(__dirname, 'system-monitor-config.json');
    this.initialize();
  }

  // 初始化监控系统
  initialize() {
    // 创建日志目录
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    // 加载配置
    this.loadConfig();

    // 保存配置
    this.saveConfig();
  }

  // 加载配置
  loadConfig() {
    if (fs.existsSync(this.configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        this.monitoringInterval = config.monitoringInterval || this.monitoringInterval;
        this.alertThresholds = { ...this.alertThresholds, ...config.alertThresholds };
      } catch (error) {
        console.error('加载监控配置失败:', error.message);
      }
    }
  }

  // 保存配置
  saveConfig() {
    const config = {
      monitoringInterval: this.monitoringInterval,
      alertThresholds: this.alertThresholds
    };
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
  }

  // 获取系统状态
  getSystemStatus() {
    try {
      // 获取CPU使用率
      const cpuUsage = this.getCpuUsage();

      // 获取内存使用情况
      const memoryUsage = this.getMemoryUsage();

      // 获取磁盘使用情况
      const diskUsage = this.getDiskUsage();

      // 获取系统进程状态
      const processes = this.getProcessStatus();

      // 获取网络状态
      const networkStatus = this.getNetworkStatus();

      return {
        timestamp: Date.now(),
        cpu: cpuUsage,
        memory: memoryUsage,
        disk: diskUsage,
        processes: processes,
        network: networkStatus,
        status: this.evaluateStatus(cpuUsage, memoryUsage, diskUsage)
      };
    } catch (error) {
      console.error('获取系统状态失败:', error.message);
      return {
        timestamp: Date.now(),
        error: error.message,
        status: 'error'
      };
    }
  }

  // 获取CPU使用率
  getCpuUsage() {
    try {
      const powershellCommand = `
      $cpuInfo = Get-WmiObject -Class win32_processor
      $cpuUsage = $cpuInfo.LoadPercentage
      $cpuUsage
      `;
      const cpuUsage = parseInt(execSync(`powershell -Command "${powershellCommand}"`, { encoding: 'utf8' }).trim());
      return cpuUsage;
    } catch (error) {
      console.error('获取CPU使用率失败:', error.message);
      return 0;
    }
  }

  // 获取内存使用情况
  getMemoryUsage() {
    try {
      const powershellCommand = `
      $os = Get-WmiObject -Class win32_operatingsystem
      $totalMemory = $os.TotalVisibleMemorySize / 1MB
      $freeMemory = $os.FreePhysicalMemory / 1MB
      $usedMemory = $totalMemory - $freeMemory
      $usedPercentage = [Math]::Round(($usedMemory / $totalMemory) * 100, 2)
      @{ 
        total = [Math]::Round($totalMemory, 2)
        used = [Math]::Round($usedMemory, 2)
        free = [Math]::Round($freeMemory, 2)
        percentage = $usedPercentage
      } | ConvertTo-Json
      `;
      const memoryInfo = JSON.parse(execSync(`powershell -Command "${powershellCommand}"`, { encoding: 'utf8' }).trim());
      return memoryInfo;
    } catch (error) {
      console.error('获取内存使用情况失败:', error.message);
      return { total: 0, used: 0, free: 0, percentage: 0 };
    }
  }

  // 获取磁盘使用情况
  getDiskUsage() {
    try {
      const powershellCommand = `
      $diskInfo = Get-WmiObject -Class win32_logicaldisk -Filter "DriveType=3"
      $diskInfo | ForEach-Object {
        $usedSpace = $_.Size - $_.FreeSpace
        $usedPercentage = [Math]::Round(($usedSpace / $_.Size) * 100, 2)
        @{ 
          drive = $_.DeviceID
          total = [Math]::Round($_.Size / 1GB, 2)
          used = [Math]::Round($usedSpace / 1GB, 2)
          free = [Math]::Round($_.FreeSpace / 1GB, 2)
          percentage = $usedPercentage
        }
      } | ConvertTo-Json
      `;
      const diskInfo = JSON.parse(execSync(`powershell -Command "${powershellCommand}"`, { encoding: 'utf8' }).trim());
      return diskInfo;
    } catch (error) {
      console.error('获取磁盘使用情况失败:', error.message);
      return [];
    }
  }

  // 获取进程状态
  getProcessStatus() {
    try {
      const powershellCommand = `
      $processes = Get-Process | Where-Object { $_.ProcessName -eq 'node' } | Select-Object ProcessName, ID, CPU, WorkingSet
      $processes | ForEach-Object {
        @{ 
          name = $_.ProcessName
          id = $_.ID
          cpu = [Math]::Round($_.CPU, 2)
          memory = [Math]::Round($_.WorkingSet / 1MB, 2)
        }
      } | ConvertTo-Json
      `;
      const processInfo = JSON.parse(execSync(`powershell -Command "${powershellCommand}"`, { encoding: 'utf8' }).trim());
      return processInfo;
    } catch (error) {
      console.error('获取进程状态失败:', error.message);
      return [];
    }
  }

  // 获取网络状态
  getNetworkStatus() {
    try {
      const powershellCommand = `
      $networkInfo = Get-WmiObject -Class win32_networkadapter | Where-Object { $_.NetConnectionStatus -eq 2 }
      $networkInfo | ForEach-Object {
        @{ 
          name = $_.Name
          status = 'Connected'
          macAddress = $_.MACAddress
        }
      } | ConvertTo-Json
      `;
      const networkInfo = JSON.parse(execSync(`powershell -Command "${powershellCommand}"`, { encoding: 'utf8' }).trim());
      return networkInfo;
    } catch (error) {
      console.error('获取网络状态失败:', error.message);
      return [];
    }
  }

  // 评估系统状态
  evaluateStatus(cpuUsage, memoryUsage, diskUsage) {
    const alerts = [];

    // 检查CPU使用率
    if (cpuUsage > this.alertThresholds.cpu) {
      alerts.push(`CPU使用率过高: ${cpuUsage}%`);
    }

    // 检查内存使用率
    if (memoryUsage.percentage > this.alertThresholds.memory) {
      alerts.push(`内存使用率过高: ${memoryUsage.percentage}%`);
    }

    // 检查磁盘使用率
    diskUsage.forEach(disk => {
      if (disk.percentage > this.alertThresholds.disk) {
        alerts.push(`磁盘 ${disk.drive} 使用率过高: ${disk.percentage}%`);
      }
    });

    if (alerts.length > 0) {
      return {
        status: 'warning',
        alerts: alerts
      };
    }

    return {
      status: 'healthy',
      alerts: []
    };
  }

  // 启动监控
  startMonitoring() {
    if (this.isMonitoring) {
      console.log('监控已启动');
      return;
    }

    console.log('=== 启动系统监控 ===');
    console.log('监控间隔:', this.monitoringInterval / 1000, '秒');
    console.log('预警阈值:', JSON.stringify(this.alertThresholds, null, 2));

    this.isMonitoring = true;
    this.monitorInterval = setInterval(() => {
      this.monitorSystem();
    }, this.monitoringInterval);

    // 初始检查
    this.monitorSystem();

    console.log('✅ 系统监控已启动');
    console.log('📊 系统将每30秒检查一次健康状态');
    console.log('⚠️  当指标超过阈值时会触发预警');
  }

  // 停止监控
  stopMonitoring() {
    if (!this.isMonitoring) {
      console.log('监控未启动');
      return;
    }

    clearInterval(this.monitorInterval);
    this.isMonitoring = false;
    console.log('✅ 系统监控已停止');
  }

  // 监控系统
  monitorSystem() {
    try {
      const systemStatus = this.getSystemStatus();
      const evaluation = this.evaluateStatus(
        systemStatus.cpu,
        systemStatus.memory,
        systemStatus.disk
      );

      const monitoringRecord = {
        timestamp: systemStatus.timestamp,
        status: evaluation.status,
        cpu: systemStatus.cpu,
        memory: systemStatus.memory,
        disk: systemStatus.disk,
        processes: systemStatus.processes,
        network: systemStatus.network,
        alerts: evaluation.alerts
      };

      this.monitoringData.push(monitoringRecord);
      
      // 保留最近24小时的数据
      const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
      this.monitoringData = this.monitoringData.filter(record => 
        record.timestamp > twentyFourHoursAgo
      );

      // 处理预警
      if (evaluation.alerts.length > 0) {
        this.handleAlerts(evaluation.alerts);
      }

      // 记录日志
      this.logMonitoringData(monitoringRecord);

      // 打印当前状态
      this.printStatus(monitoringRecord);

    } catch (error) {
      console.error('监控系统时发生错误:', error.message);
    }
  }

  // 处理预警
  handleAlerts(alerts) {
    const alertRecord = {
      timestamp: Date.now(),
      alerts: alerts,
      severity: alerts.length > 2 ? 'critical' : 'warning'
    };

    this.alertHistory.push(alertRecord);
    
    // 保留最近的预警记录
    if (this.alertHistory.length > 100) {
      this.alertHistory = this.alertHistory.slice(-100);
    }

    // 触发预警通知
    this.triggerAlertNotification(alertRecord);
  }

  // 触发预警通知
  triggerAlertNotification(alertRecord) {
    console.log('\n⚠️  系统预警 ⚠️');
    console.log('时间:', new Date(alertRecord.timestamp).toISOString());
    console.log('严重程度:', alertRecord.severity);
    console.log('预警信息:');
    alertRecord.alerts.forEach(alert => {
      console.log(`- ${alert}`);
    });
    console.log('');

    // 可以在这里添加其他通知方式，如邮件、短信等
  }

  // 记录监控数据
  logMonitoringData(monitoringRecord) {
    // 确保日志目录存在
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath, { recursive: true });
    }

    // 按日期记录日志
    const date = new Date(monitoringRecord.timestamp).toISOString().split('T')[0];
    const logFilePath = path.join(this.logPath, `${date}-monitoring.log`);

    const logEntry = {
      timestamp: new Date(monitoringRecord.timestamp).toISOString(),
      status: monitoringRecord.status,
      cpu: monitoringRecord.cpu,
      memory: monitoringRecord.memory.percentage,
      disk: Math.max(...monitoringRecord.disk.map(d => d.percentage)),
      alerts: monitoringRecord.alerts.length
    };

    // 追加日志
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + '\n', 'utf8');
  }

  // 打印当前状态
  printStatus(monitoringRecord) {
    console.log('=== 系统监控状态 ===');
    console.log('时间:', new Date(monitoringRecord.timestamp).toISOString());
    console.log('状态:', monitoringRecord.status === 'healthy' ? '健康' : '警告');
    console.log('CPU使用率:', monitoringRecord.cpu, '%');
    console.log('内存使用率:', monitoringRecord.memory.percentage, '%');
    console.log('磁盘使用率:');
    monitoringRecord.disk.forEach(disk => {
      console.log(`  ${disk.drive}: ${disk.percentage}% (可用: ${disk.free}GB)`);
    });
    console.log('运行的Node进程数:', monitoringRecord.processes.length);
    if (monitoringRecord.alerts.length > 0) {
      console.log('预警信息:');
      monitoringRecord.alerts.forEach(alert => {
        console.log(`  ⚠️ ${alert}`);
      });
    }
    console.log('=====================\n');
  }

  // 获取监控状态
  getStatus() {
    return {
      isMonitoring: this.isMonitoring,
      monitoringInterval: this.monitoringInterval,
      alertThresholds: this.alertThresholds,
      currentStatus: this.getSystemStatus(),
      alertHistory: this.alertHistory.slice(-10), // 最近10条预警
      monitoringDataCount: this.monitoringData.length
    };
  }

  // 生成监控报告
  generateReport() {
    const report = {
      generatedAt: new Date().toISOString(),
      summary: {
        totalMonitoringTime: this.monitoringData.length * (this.monitoringInterval / 1000 / 60),
        alertCount: this.alertHistory.length,
        averageCpu: this.calculateAverage('cpu'),
        averageMemory: this.calculateAverage('memory'),
        averageDisk: this.calculateAverage('disk')
      },
      alerts: this.alertHistory,
      recommendations: this.generateRecommendations()
    };

    // 保存报告
    const reportPath = path.join(this.logPath, `monitoring-report-${new Date().toISOString().split('T')[0]}.json`);
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2), 'utf8');

    return report;
  }

  // 计算平均值
  calculateAverage(metric) {
    if (this.monitoringData.length === 0) return 0;

    let sum = 0;
    let count = 0;

    this.monitoringData.forEach(record => {
      if (metric === 'cpu') {
        sum += record.cpu;
        count++;
      } else if (metric === 'memory') {
        sum += record.memory.percentage;
        count++;
      } else if (metric === 'disk') {
        const maxDiskUsage = Math.max(...record.disk.map(d => d.percentage));
        sum += maxDiskUsage;
        count++;
      }
    });

    return count > 0 ? sum / count : 0;
  }

  // 生成建议
  generateRecommendations() {
    const recommendations = [];

    const avgCpu = this.calculateAverage('cpu');
    const avgMemory = this.calculateAverage('memory');
    const avgDisk = this.calculateAverage('disk');

    if (avgCpu > this.alertThresholds.cpu * 0.8) {
      recommendations.push('CPU使用率较高，建议检查是否有进程占用过多资源');
    }

    if (avgMemory > this.alertThresholds.memory * 0.8) {
      recommendations.push('内存使用率较高，建议增加系统内存或优化应用程序');
    }

    if (avgDisk > this.alertThresholds.disk * 0.8) {
      recommendations.push('磁盘使用率较高，建议清理磁盘空间或增加存储空间');
    }

    if (this.alertHistory.length > 5) {
      recommendations.push('系统预警频繁，建议进行全面的系统检查和优化');
    }

    return recommendations.length > 0 ? recommendations : ['系统状态良好，无需特殊操作'];
  }

  // 手动触发检查
  manualCheck() {
    console.log('=== 手动触发系统检查 ===');
    this.monitorSystem();
    console.log('✅ 手动检查完成');
  }
}

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const monitor = new SystemMonitor();
    monitor.startMonitoring();

    console.log('\n✅ 系统监控系统启动成功');
    console.log('📊 系统将每30秒检查一次健康状态');
    console.log('⚠️  当指标超过阈值时会触发预警');
    console.log('📋 监控数据将保存在 monitoring-logs 目录');
    console.log('\n按 Ctrl+C 停止监控');

    // 保持进程运行
    process.stdin.resume();
  }

  main().catch(error => {
    console.error('❌ 启动系统监控失败:', error.message);
    process.exit(1);
  });
}

module.exports = SystemMonitor;