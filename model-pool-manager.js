const fs = require('fs');
const path = require('path');

class ModelPoolManager {
  constructor(configPath) {
    this.configPath = configPath;
    this.config = this.loadConfig();
    this.modelStatus = {};
    this.initModelStatus();
  }

  // 加载配置
  loadConfig() {
    try {
      const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
      return config;
    } catch (error) {
      console.error('加载模型池配置失败:', error);
      return {
        modelPools: {},
        healthCheck: {
          enabled: false,
          interval: 6
        },
        fallback: {
          enabled: false
        },
        taskAssignment: {}
      };
    }
  }

  // 初始化模型状态
  initModelStatus() {
    for (const poolName in this.config.modelPools) {
      const pool = this.config.modelPools[poolName];
      this.modelStatus[poolName] = {};
      
      for (const model of pool.models) {
        this.modelStatus[poolName][model.id] = {
          status: 'healthy',
          lastCheck: null,
          responseTime: 0,
          errorCount: 0
        };
      }
    }
  }

  // 获取任务对应的模型池
  getPoolForTask(taskType) {
    return this.config.taskAssignment[taskType] || 'highSpeed';
  }

  // 获取模型池中可用的模型
  getAvailableModel(poolName) {
    const pool = this.config.modelPools[poolName];
    if (!pool) {
      return null;
    }

    // 首先尝试主模型
    for (const model of pool.models) {
      if (model.type === 'primary' && this.modelStatus[poolName][model.id].status === 'healthy') {
        return model;
      }
    }

    // 如果主模型不可用，尝试备份模型
    for (const model of pool.models) {
      if (model.type === 'backup' && this.modelStatus[poolName][model.id].status === 'healthy') {
        return model;
      }
    }

    // 所有模型都不可用，返回第一个模型作为最后选择
    return pool.models[0] || null;
  }

  // 标记模型为不可用
  markModelUnavailable(poolName, modelId, reason) {
    if (this.modelStatus[poolName] && this.modelStatus[poolName][modelId]) {
      this.modelStatus[poolName][modelId].status = 'unhealthy';
      this.modelStatus[poolName][modelId].lastError = reason;
      console.warn(`模型 ${modelId} 标记为不可用: ${reason}`);
    }
  }

  // 执行健康检查
  async performHealthCheck() {
    if (!this.config.healthCheck.enabled) {
      return;
    }

    console.log('开始执行模型健康检查...');

    for (const poolName in this.config.modelPools) {
      const pool = this.config.modelPools[poolName];
      
      for (const model of pool.models) {
        await this.checkModelHealth(poolName, model);
      }
    }

    console.log('模型健康检查完成');
  }

  // 检查单个模型健康状态
  async checkModelHealth(poolName, model) {
    try {
      // 这里应该调用实际的模型API进行健康检查
      // 由于是模拟环境，我们模拟一个健康检查
      const responseTime = Math.random() * 5000; // 模拟响应时间
      const isHealthy = responseTime < this.config.healthCheck.thresholds.responseTime;

      this.modelStatus[poolName][model.id] = {
        status: isHealthy ? 'healthy' : 'unhealthy',
        lastCheck: new Date().toISOString(),
        responseTime: responseTime,
        errorCount: isHealthy ? 0 : (this.modelStatus[poolName][model.id].errorCount || 0) + 1
      };

      console.log(`模型 ${model.name} 健康检查: ${isHealthy ? '健康' : '不健康'}，响应时间: ${responseTime.toFixed(2)}ms`);

    } catch (error) {
      console.error(`模型 ${model.name} 健康检查失败:`, error);
      this.modelStatus[poolName][model.id].status = 'unhealthy';
      this.modelStatus[poolName][model.id].lastError = error.message;
      this.modelStatus[poolName][model.id].errorCount = (this.modelStatus[poolName][model.id].errorCount || 0) + 1;
    }
  }

  // 启动健康检查定时任务
  startHealthCheckScheduler() {
    if (!this.config.healthCheck.enabled) {
      return;
    }

    const interval = this.config.healthCheck.interval * 60 * 60 * 1000; // 转换为毫秒
    
    setInterval(() => {
      this.performHealthCheck();
    }, interval);

    console.log(`模型健康检查已启动，每 ${this.config.healthCheck.interval} 小时执行一次`);

    // 立即执行一次健康检查
    this.performHealthCheck();
  }

  // 处理模型错误，尝试fallback
  handleModelError(poolName, currentModelId, error) {
    if (!this.config.fallback.enabled) {
      return null;
    }

    // 检查错误是否符合fallback条件
    const errorType = this.getErrorType(error);
    if (!this.config.fallback.conditions.includes(errorType)) {
      return null;
    }

    console.log(`模型 ${currentModelId} 出现错误: ${errorType}，尝试切换到其他模型`);

    // 标记当前模型为不可用
    this.markModelUnavailable(poolName, currentModelId, errorType);

    // 尝试获取其他可用模型
    const pool = this.config.modelPools[poolName];
    for (const model of pool.models) {
      if (model.id !== currentModelId && this.modelStatus[poolName][model.id].status === 'healthy') {
        console.log(`切换到备用模型: ${model.name}`);
        return model;
      }
    }

    return null;
  }

  // 识别错误类型
  getErrorType(error) {
    const errorMessage = error.message.toLowerCase();
    
    if (errorMessage.includes('token') && errorMessage.includes('exhaust')) {
      return 'token_exhausted';
    }
    if (errorMessage.includes('rate') && errorMessage.includes('limit')) {
      return 'rate_limit_exceeded';
    }
    if (errorMessage.includes('service') && errorMessage.includes('unavailable')) {
      return 'service_unavailable';
    }
    if (errorMessage.includes('timeout')) {
      return 'timeout';
    }
    
    return 'unknown';
  }

  // 获取模型池状态
  getPoolStatus() {
    return this.modelStatus;
  }

  // 更新配置
  updateConfig(newConfig) {
    this.config = newConfig;
    fs.writeFileSync(this.configPath, JSON.stringify(newConfig, null, 2));
    this.initModelStatus();
    console.log('模型池配置已更新');
  }
}

// 导出模块
module.exports = ModelPoolManager;

// 如果直接运行
if (require.main === module) {
  const manager = new ModelPoolManager('./model-pool-config.json');
  manager.startHealthCheckScheduler();
  
  // 测试获取模型
  console.log('测试获取高速池模型:', manager.getAvailableModel('highSpeed'));
  console.log('测试获取智能池模型:', manager.getAvailableModel('intelligent'));
  console.log('测试获取文本池模型:', manager.getAvailableModel('text'));
  
  // 测试任务分配
  console.log('对话任务分配到:', manager.getPoolForTask('conversation'));
  console.log('复杂推理任务分配到:', manager.getPoolForTask('complex_reasoning'));
  console.log('文本分析任务分配到:', manager.getPoolForTask('text_analysis'));
}
