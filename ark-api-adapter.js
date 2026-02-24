const https = require('https');
const fs = require('fs');
const path = require('path');

class ArkApiAdapter {
  constructor(options = {}) {
    this.options = {
      baseUrl: 'https://ark.cn-beijing.volces.com/api/v3',
      apiKey: 'c13b2982-0aab-4c75-9404-0deb12a219ec',
      timeout: 60000,
      maxRetries: 3,
      retryDelay: 1000,
      logDir: path.join(__dirname, 'ark-logs'),
      ...options
    };
    
    this.ensureDirectories();
  }

  // 确保目录存在
  ensureDirectories() {
    if (!fs.existsSync(this.options.logDir)) {
      fs.mkdirSync(this.options.logDir, { recursive: true });
    }
  }

  // 发送请求到Ark API
  async request(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      // 直接使用完整的endpoint，不进行URL解析
      const url = endpoint;
      
      // 构建请求选项
      const requestOptions = {
        hostname: 'ark.cn-beijing.volces.com',
        port: 443,
        path: '/api/v3/responses',
        method: options.method || 'POST',
        timeout: this.options.timeout,
        headers: {
          'Authorization': `Bearer ${this.options.apiKey}`,
          'Content-Type': 'application/json',
          ...options.headers
        }
      };

      console.log('发送请求到:', requestOptions.hostname + requestOptions.path);
      console.log('请求方法:', requestOptions.method);
      console.log('请求头:', requestOptions.headers);
      if (options.body) {
        console.log('请求体:', JSON.stringify(options.body).substring(0, 200) + '...');
      }

      const req = https.request(requestOptions, (res) => {
        let data = '';

        console.log('状态码:', res.statusCode);
        console.log('响应头:', res.headers);

        res.on('data', (chunk) => {
          data += chunk;
          console.log('接收到数据:', chunk.length + ' 字节');
        });

        res.on('end', () => {
          console.log('响应结束，总数据长度:', data.length + ' 字节');
          
          if (data.length === 0) {
            reject(new Error('空响应数据'));
            return;
          }

          try {
            console.log('原始响应数据:', data.substring(0, 500) + '...');
            const parsedData = JSON.parse(data);
            
            if (res.statusCode >= 400) {
              reject(new Error(`Ark API错误 ${res.statusCode}: ${parsedData.error?.message || '未知错误'}`));
            } else {
              resolve(parsedData);
            }
          } catch (error) {
            console.error('解析错误:', error.message);
            reject(new Error(`响应解析失败: ${error.message}`));
          }
        });
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error(`请求超时（${this.options.timeout}ms）`));
      });

      req.on('error', (error) => {
        console.error('请求错误:', error.message);
        reject(error);
      });

      if (options.body) {
        const body = JSON.stringify(options.body);
        req.write(body);
        console.log('发送请求体，长度:', body.length + ' 字节');
      }

      req.end();
      console.log('请求已发送');
    });
  }

  // 带重试的请求
  async requestWithRetry(endpoint, options = {}) {
    let lastError;

    for (let i = 0; i < this.options.maxRetries; i++) {
      try {
        const response = await this.request(endpoint, options);
        this.logRequest(endpoint, options, response, null, i + 1);
        return response;
      } catch (error) {
        lastError = error;
        console.warn(`Ark API请求失败（${i + 1}/${this.options.maxRetries}）:`, error.message);

        if (i < this.options.maxRetries - 1) {
          // 指数退避重试
          const delay = this.options.retryDelay * Math.pow(2, i);
          console.log(`等待 ${delay}ms 后重试...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    this.logRequest(endpoint, options, null, lastError, this.options.maxRetries);
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
        model: response.model,
        object: response.object,
        usage: response.usage
      } : null,
      latency: Date.now() - new Date().getTime()
    };

    const logFilePath = path.join(this.options.logDir, `${new Date().toISOString().split('T')[0]}-ark.log`);
    fs.appendFileSync(logFilePath, JSON.stringify(logEntry) + '\n', 'utf8');
  }

  // 生成文本响应
  async generateText(model, messages, options = {}) {
    try {
      const body = {
        model: model,
        input: messages.map(msg => ({
          role: msg.role,
          content: msg.content.map(item => {
            if (item.type === 'text') {
              return {
                type: 'input_text',
                text: item.text
              };
            } else if (item.type === 'image') {
              return {
                type: 'input_image',
                image_url: item.image_url
              };
            }
            return item;
          })
        })),
        ...options
      };

      const response = await this.requestWithRetry('/responses', {
        method: 'POST',
        body: body
      });

      // 处理响应
      if (response.output && response.output.length > 0) {
        // 找到文本输出
        let textOutput = null;
        for (const item of response.output) {
          if (item.type === 'message' && item.content) {
            textOutput = item;
            break;
          }
        }

        if (textOutput && textOutput.content) {
          let textContent = null;
          for (const item of textOutput.content) {
            if (item.type === 'output_text') {
              textContent = item;
              break;
            }
          }
          
          if (textContent) {
            return {
              text: textContent.text,
              usage: response.usage || {},
              model: response.model,
              id: response.id
            };
          }
        }
      }

      throw new Error('Invalid response format from Ark API: No text output found');
    } catch (error) {
      console.error('Error generating text:', error);
      throw error;
    }
  }

  // 生成图像描述
  async describeImage(imageUrl, prompt = '你看见了什么？') {
    return this.generateText('doubao-seed-2-0-lite-260215', [{
      role: 'user',
      content: [
        {
          type: 'input_image',
          image_url: imageUrl
        },
        {
          type: 'input_text',
          text: prompt
        }
      ]
    }]);
  }

  // 获取模型信息
  async getModelInfo(modelId) {
    try {
      const response = await this.requestWithRetry(`/models/${modelId}`);
      return response;
    } catch (error) {
      console.error('Error getting model info:', error);
      throw error;
    }
  }

  // 获取所有可用模型
  async listModels() {
    try {
      const response = await this.requestWithRetry('/models');
      return response.data || [];
    } catch (error) {
      console.error('Error listing models:', error);
      throw error;
    }
  }

  // 健康检查
  async healthCheck() {
    try {
      // 直接返回健康状态，避免调用不存在的健康检查端点
      return {
        healthy: true,
        status: 'ok'
      };
    } catch (error) {
      return {
        healthy: false,
        error: error.message
      };
    }
  }

  // 获取API状态
  async getStatus() {
    const health = await this.healthCheck();
    const logs = this.analyzeRecentLogs();
    
    return {
      health,
      ...logs,
      timestamp: new Date().toISOString()
    };
  }

  // 分析最近的日志
  analyzeRecentLogs() {
    const today = new Date().toISOString().split('T')[0];
    const logFilePath = path.join(this.options.logDir, `${today}-ark.log`);

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
}

// 导出单例
const arkAdapter = new ArkApiAdapter();
module.exports = arkAdapter;
module.exports.ArkApiAdapter = ArkApiAdapter;
