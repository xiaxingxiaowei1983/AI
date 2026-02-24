// 性能监控模块

class PerformanceMonitor {
  constructor(config = {}) {
    this.config = {
      ...config,
      sampleInterval: config.sampleInterval || 5000, // 5秒采样一次
      historySize: config.historySize || 100 // 保存100个历史样本
    };
    
    this.metrics = {
      memoryUsage: [],
      cpuUsage: [],
      responseTimes: [],
      throughput: []
    };
    
    this.isMonitoring = false;
    this.monitoringInterval = null;
  }
  
  async init() {
    console.log('🔧 初始化性能监控...');
    // 这里可以添加初始化逻辑，比如加载历史数据等
    console.log('✅ 性能监控初始化完成');
  }
  
  // 设置外部依赖
  setDependencies(memorySystem, schedulerSystem, communicationSystem) {
    this.memorySystem = memorySystem;
    this.schedulerSystem = schedulerSystem;
    this.communicationSystem = communicationSystem;
  }
  
  // 开始监控
  async start() {
    try {
      if (this.isMonitoring) {
        return;
      }
      
      console.log('🚀 开始性能监控...');
      this.isMonitoring = true;
      
      // 立即采集一次数据
      await this.collectMetrics();
      
      // 设置定时采集
      this.monitoringInterval = setInterval(async () => {
        try {
          await this.collectMetrics();
        } catch (error) {
          console.error('❌ 采集性能指标失败:', error.message);
        }
      }, this.config.sampleInterval);
      
      console.log('✅ 性能监控已开始');
    } catch (error) {
      console.error('❌ 开始性能监控失败:', error.message);
      throw error;
    }
  }
  
  // 停止监控
  async stop() {
    try {
      if (!this.isMonitoring) {
        return;
      }
      
      console.log('⏹️  停止性能监控...');
      this.isMonitoring = false;
      
      if (this.monitoringInterval) {
        clearInterval(this.monitoringInterval);
        this.monitoringInterval = null;
      }
      
      console.log('✅ 性能监控已停止');
    } catch (error) {
      console.error('❌ 停止性能监控失败:', error.message);
      throw error;
    }
  }
  
  // 采集性能指标
  async collectMetrics() {
    try {
      const timestamp = Date.now();
      
      // 采集内存使用情况
      const memoryUsage = process.memoryUsage();
      this.metrics.memoryUsage.push({
        timestamp,
        rss: memoryUsage.rss,
        heapTotal: memoryUsage.heapTotal,
        heapUsed: memoryUsage.heapUsed,
        external: memoryUsage.external
      });
      
      // 限制历史数据大小
      if (this.metrics.memoryUsage.length > this.config.historySize) {
        this.metrics.memoryUsage = this.metrics.memoryUsage.slice(-this.config.historySize);
      }
      
      // 采集CPU使用情况（简化实现）
      const cpuUsage = {
        timestamp,
        usage: process.cpuUsage()
      };
      this.metrics.cpuUsage.push(cpuUsage);
      
      if (this.metrics.cpuUsage.length > this.config.historySize) {
        this.metrics.cpuUsage = this.metrics.cpuUsage.slice(-this.config.historySize);
      }
      
      // 采集响应时间
      if (this.communicationSystem) {
        const responseTime = {
          timestamp,
          average: this.calculateAverageResponseTime()
        };
        this.metrics.responseTimes.push(responseTime);
        
        if (this.metrics.responseTimes.length > this.config.historySize) {
          this.metrics.responseTimes = this.metrics.responseTimes.slice(-this.config.historySize);
        }
      }
      
      // 采集吞吐量
      if (this.communicationSystem) {
        const throughput = {
          timestamp,
          messagesPerSecond: this.calculateThroughput()
        };
        this.metrics.throughput.push(throughput);
        
        if (this.metrics.throughput.length > this.config.historySize) {
          this.metrics.throughput = this.metrics.throughput.slice(-this.config.historySize);
        }
      }
    } catch (error) {
      console.error('❌ 采集性能指标失败:', error.message);
      throw error;
    }
  }
  
  // 计算平均响应时间
  calculateAverageResponseTime() {
    try {
      // 简化实现，实际项目中可以从通信系统获取真实的响应时间数据
      return Math.random() * 100 + 50; // 模拟50-150ms的响应时间
    } catch (error) {
      console.error('❌ 计算平均响应时间失败:', error.message);
      return 0;
    }
  }
  
  // 计算吞吐量
  calculateThroughput() {
    try {
      // 简化实现，实际项目中可以从通信系统获取真实的吞吐量数据
      return Math.random() * 50 + 10; // 模拟10-60条消息/秒
    } catch (error) {
      console.error('❌ 计算吞吐量失败:', error.message);
      return 0;
    }
  }
  
  // 获取性能指标
  async getMetrics() {
    try {
      const now = Date.now();
      
      // 获取最新的内存使用情况
      const latestMemory = this.metrics.memoryUsage[this.metrics.memoryUsage.length - 1] || {
        timestamp: now,
        rss: 0,
        heapTotal: 0,
        heapUsed: 0,
        external: 0
      };
      
      // 计算内存使用百分比
      const memoryUsagePercent = {
        heap: latestMemory.heapUsed / latestMemory.heapTotal * 100 || 0,
        rss: latestMemory.rss / (process.platform === 'win32' ? 4 * 1024 * 1024 * 1024 : 8 * 1024 * 1024 * 1024) * 100 || 0
      };
      
      // 获取最新的CPU使用情况
      const latestCpu = this.metrics.cpuUsage[this.metrics.cpuUsage.length - 1] || {
        timestamp: now,
        usage: { user: 0, system: 0 }
      };
      
      // 获取最新的响应时间
      const latestResponseTime = this.metrics.responseTimes[this.metrics.responseTimes.length - 1] || {
        timestamp: now,
        average: 0
      };
      
      // 获取最新的吞吐量
      const latestThroughput = this.metrics.throughput[this.metrics.throughput.length - 1] || {
        timestamp: now,
        messagesPerSecond: 0
      };
      
      return {
        memoryUsage: {
          current: {
            rss: latestMemory.rss,
            heapTotal: latestMemory.heapTotal,
            heapUsed: latestMemory.heapUsed,
            external: latestMemory.external
          },
          percent: memoryUsagePercent,
          history: this.metrics.memoryUsage
        },
        cpuUsage: {
          current: latestCpu.usage,
          history: this.metrics.cpuUsage
        },
        responseTimes: {
          average: latestResponseTime.average,
          history: this.metrics.responseTimes
        },
        throughput: {
          current: latestThroughput.messagesPerSecond,
          history: this.metrics.throughput
        },
        timestamp: now
      };
    } catch (error) {
      console.error('❌ 获取性能指标失败:', error.message);
      throw error;
    }
  }
  
  // 获取统计信息
  async getStats() {
    try {
      const metrics = await this.getMetrics();
      
      const stats = {
        memory: {
          peakHeapUsed: Math.max(...this.metrics.memoryUsage.map(m => m.heapUsed)),
          averageHeapUsed: this.calculateAverage(this.metrics.memoryUsage.map(m => m.heapUsed)),
          peakRss: Math.max(...this.metrics.memoryUsage.map(m => m.rss)),
          averageRss: this.calculateAverage(this.metrics.memoryUsage.map(m => m.rss))
        },
        responseTime: {
          peak: Math.max(...this.metrics.responseTimes.map(r => r.average)),
          average: this.calculateAverage(this.metrics.responseTimes.map(r => r.average)),
          min: Math.min(...this.metrics.responseTimes.map(r => r.average))
        },
        throughput: {
          peak: Math.max(...this.metrics.throughput.map(t => t.messagesPerSecond)),
          average: this.calculateAverage(this.metrics.throughput.map(t => t.messagesPerSecond)),
          min: Math.min(...this.metrics.throughput.map(t => t.messagesPerSecond))
        },
        timestamp: new Date().toISOString()
      };
      
      return stats;
    } catch (error) {
      console.error('❌ 获取性能统计信息失败:', error.message);
      throw error;
    }
  }
  
  // 计算平均值
  calculateAverage(values) {
    if (values.length === 0) {
      return 0;
    }
    
    const sum = values.reduce((acc, val) => acc + val, 0);
    return sum / values.length;
  }
  
  // 设置配置
  setConfig(config) {
    try {
      this.config = {
        ...this.config,
        ...config
      };
      
      // 如果监控间隔改变，重新设置
      if (config.sampleInterval && this.isMonitoring) {
        if (this.monitoringInterval) {
          clearInterval(this.monitoringInterval);
        }
        
        this.monitoringInterval = setInterval(async () => {
          try {
            await this.collectMetrics();
          } catch (error) {
            console.error('❌ 采集性能指标失败:', error.message);
          }
        }, this.config.sampleInterval);
      }
      
      console.log('✅ 性能监控配置已更新');
    } catch (error) {
      console.error('❌ 设置性能监控配置失败:', error.message);
      throw error;
    }
  }
}

module.exports = PerformanceMonitor;