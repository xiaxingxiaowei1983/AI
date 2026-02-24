// API对接优化模块
// 负责优化公司大脑与大脑作弊器之间的API对接

const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

class ApiAdapter {
  constructor() {
    this.brainCheaterUrl = 'http://localhost:3000'; // 大脑作弊器API地址
    this.timeout = 30000; // 30秒超时
    this.retryCount = 3; // 重试次数
    this.retryDelay = 1000; // 重试延迟（毫秒）
    this.healthCheckInterval = 60000; // 健康检查间隔（1分钟）
    this.isHealthy = true;
    this.healthCheckIntervalId = null;
    this.requestLogPath = path.join(__dirname, 'api-logs');
    this.initialize();
  }

  // 初始化
  initialize() {
    // 创建日志目录
    if (!fs.existsSync(this.requestLogPath)) {
      fs.mkdirSync(this.requestLogPath, { recursive: true });
    }

    // 启动健康检查
    this.startHealthCheck();
  }

  // 启动健康检查
  startHealthCheck() {
    this.healthCheckIntervalId = setInterval(async () => {
      await this.checkHealth();
    }, this.healthCheckInterval);

    // 初始检查
    this.checkHealth();
  }

  // 停止健康检查
  stopHealthCheck() {
    if (this.healthCheckIntervalId) {
      clearInterval(this.healthCheckIntervalId);
      this.healthCheckIntervalId = null;
    }
  }

  // 检查大脑作弊器健康状态
  async checkHealth() {
    try {
      const response = await this.request('/api/process', {
        method: 'GET'
      });
      this.isHealthy = true;
      console.log('✅ 大脑作弊器健康检查通过');
    } catch (error) {
      this.isHealthy = false;
      console.error('❌ 大脑作弊器健康检查失败:', error.message);
    }
  }

  // 发送HTTP请求
  async request(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL(endpoint, this.brainCheaterUrl);
      const protocol = url.protocol === 'https:' ? https : http;

      const defaultOptions = {
        method: 'POST',
        timeout: this.timeout,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      };

      const requestOptions = {
        ...defaultOptions,
        ...options,
        host: url.hostname,
        port: url.port,
        path: url.pathname + url.search
      };

      const req = protocol.request(requestOptions, (res) => {
        let data = '';

        res.on('data', (chunk) => {
          data += chunk;
        });

        res.on('end', () => {
          try {
            const parsedData = JSON.parse(data);
            if (res.statusCode >= 400) {
              reject(new Error(`API错误 ${res.statusCode}: ${parsedData.error || '未知错误'}`));
            } else {
              resolve(parsedData);
            }
          } catch (error) {
            reject(new Error(`响应解析失败: ${error.message}`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`请求超时（${this.timeout}ms）`));
      });

      req.on('error', (error) => {
        reject(error);
      });

      if (options.body) {
        req.write(JSON.stringify(options.body));
      }

      req.end();
    });
  }

  // 带重试的请求
  async requestWithRetry(endpoint, options = {}) {
    let lastError;

    for (let i = 0; i < this.retryCount; i++) {
      try {
        const response = await this.request(endpoint, options);
        this.logRequest(endpoint, options, response, null, i + 1);
        return response;
      } catch (error) {
        lastError = error;
        console.warn(`请求失败（${i + 1}/${this.retryCount}）:`, error.message);

        if (i < this.retryCount - 1) {
          // 指数退避重试
          const delay = this.retryDelay * Math.pow(2, i);
          console.log(`等待 ${delay}ms 后重试...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    this.logRequest(endpoint, options, null, lastError, this.retryCount);
    throw lastError;
  }

  // 记录请求日志
  logRequest(endpoint, options, response, error, attempt) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      endpoint,
      method: options.method || 'POST',
      attempt,
      success: !error,
      error: error ? error.message : null,
      response: response ? {
        hasData: true,
        keys: Object.keys(response)
      } : null,
      latency: Date.now() - new Date().getTime()
    };

    const logFilePath = path.join(this.requestLogPath, `${new Date().toISOString().split('T')[0]}-api.log`);
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + '\n', 'utf8');
  }

  // 生成内容脚本
  async generateContentScript(content, type = 'file') {
    try {
      console.log('🔄 调用大脑作弊器生成内容脚本...');
      
      const response = await this.requestWithRetry('/api/process', {
        method: 'POST',
        body: {
          type,
          content,
          saveToHistory: false
        }
      });

      console.log('✅ 内容脚本生成成功');
      return response;
    } catch (error) {
      console.error('❌ 内容脚本生成失败:', error.message);
      throw error;
    }
  }

  // 处理文件
  async processFile(filePath) {
    try {
      console.log('🔄 处理文件:', filePath);
      
      // 读取文件内容
      const fileContent = fs.readFileSync(filePath, 'utf8');
      
      const response = await this.generateContentScript(fileContent, 'file');
      return response;
    } catch (error) {
      console.error('❌ 文件处理失败:', error.message);
      throw error;
    }
  }

  // 处理URL
  async processUrl(url) {
    try {
      console.log('🔄 处理URL:', url);
      
      const response = await this.generateContentScript(url, 'url');
      return response;
    } catch (error) {
      console.error('❌ URL处理失败:', error.message);
      throw error;
    }
  }

  // 批量处理
  async batchProcess(items, type = 'file') {
    const results = [];
    const errors = [];

    for (let i = 0; i < items.length; i++) {
      try {
        console.log(`🔄 处理项目 ${i + 1}/${items.length}...`);
        const result = await this.generateContentScript(items[i], type);
        results.push({ index: i, success: true, data: result });
      } catch (error) {
        console.error(`❌ 项目 ${i + 1} 处理失败:`, error.message);
        errors.push({ index: i, error: error.message });
      }
    }

    return {
      results,
      errors,
      successRate: (results.length / items.length) * 100
    };
  }

  // 获取API状态
  async getApiStatus() {
    try {
      await this.checkHealth();
      
      // 分析最近的日志
      const recentLogs = this.analyzeRecentLogs();
      
      return {
        healthy: this.isHealthy,
        ...recentLogs
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message
      };
    }
  }

  // 分析最近的日志
  analyzeRecentLogs() {
    const today = new Date().toISOString().split('T')[0];
    const logFilePath = path.join(this.requestLogPath, `${today}-api.log`);

    if (!fs.existsSync(logFilePath)) {
      return {
        todayRequests: 0,
        successRate: 0,
        averageLatency: 0
      };
    }

    try {
      const logs = fs.readFileSync(logFilePath, 'utf8')
        .split('\n')
        .filter(line => line.trim())
        .map(line => JSON.parse(line));

      const totalRequests = logs.length;
      const successfulRequests = logs.filter(log => log.success).length;
      const successRate = totalRequests > 0 ? (successfulRequests / totalRequests) * 100 : 0;
      const averageLatency = totalRequests > 0 ? 
        logs.reduce((sum, log) => sum + (log.latency || 0), 0) / totalRequests : 0;

      return {
        todayRequests: totalRequests,
        successRate,
        averageLatency
      };
    } catch (error) {
      return {
        todayRequests: 0,
        successRate: 0,
        averageLatency: 0,
        error: error.message
      };
    }
  }

  // 优化建议
  getOptimizationSuggestions() {
    const status = this.analyzeRecentLogs();
    const suggestions = [];

    if (status.successRate < 90) {
      suggestions.push('API调用成功率较低，建议检查网络连接和大脑作弊器服务状态');
    }

    if (status.averageLatency > 5000) {
      suggestions.push('API响应时间较长，建议优化网络连接或考虑使用本地部署');
    }

    if (status.todayRequests > 1000) {
      suggestions.push('今日API调用次数较多，建议检查是否存在重复调用或优化调用频率');
    }

    return suggestions.length > 0 ? suggestions : ['API对接状态良好，无需特殊优化'];
  }

  // 关闭适配器
  close() {
    this.stopHealthCheck();
    console.log('✅ API适配器已关闭');
  }
}

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const adapter = new ApiAdapter();

    console.log('=== API对接优化模块测试 ===');
    console.log('检查大脑作弊器健康状态...');
    
    try {
      const status = await adapter.getApiStatus();
      console.log('API状态:', status);
      
      const suggestions = adapter.getOptimizationSuggestions();
      console.log('优化建议:');
      suggestions.forEach(suggestion => {
        console.log(`- ${suggestion}`);
      });

      console.log('\n✅ API对接优化模块测试完成');
    } catch (error) {
      console.error('❌ 测试失败:', error.message);
    } finally {
      adapter.close();
    }
  }

  main();
}

module.exports = ApiAdapter;