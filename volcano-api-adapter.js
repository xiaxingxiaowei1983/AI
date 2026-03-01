/**
 * Volcano Engine Doubao API 适配器
 * 优化的API集成，包含错误处理、重试机制和API密钥管理
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

class VolcanoAPIAdapter {
  constructor() {
    this.apiKey = this._getApiKey();
    this.endpoint = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
    this.defaultModel = 'doubao-seed-2-0-code-preview-260215';
    this.maxRetries = 3;
    this.retryDelay = 1000; // 1秒
    this.timeout = 30000; // 30秒
    this.rateLimitDelay = 5000; // 5秒
  }

  // 获取API密钥
  _getApiKey() {
    // 从环境变量文件读取
    const envPath = path.join(process.env.USERPROFILE || process.env.HOME, '.openclaw', '.env');
    if (fs.existsSync(envPath)) {
      const envContent = fs.readFileSync(envPath, 'utf8');
      const match = envContent.match(/VOLCANO_ENGINE_API_KEY=(.*)/);
      if (match) {
        return match[1].trim();
      }
    }
    // 从环境变量读取
    if (process.env.VOLCANO_ENGINE_API_KEY) {
      return process.env.VOLCANO_ENGINE_API_KEY;
    }
    // 默认值
    return 'c13b2982-0aab-4c75-9404-0deb12a219ec';
  }

  // 设置API密钥
  setApiKey(apiKey) {
    this.apiKey = apiKey;
    // 保存到环境变量文件
    const envPath = path.join(process.env.USERPROFILE || process.env.HOME, '.openclaw', '.env');
    const envContent = `VOLCANO_ENGINE_API_KEY=${apiKey}\n`;
    fs.writeFileSync(envPath, envContent);
    console.log('API密钥已更新');
  }

  // 构建请求参数
  _buildRequestOptions(prompt, options = {}) {
    const model = options.model || this.defaultModel;
    const temperature = options.temperature || 0.7;
    const maxTokens = options.maxTokens || 1000;

    return {
      hostname: 'ark.cn-beijing.volces.com',
      path: '/api/v3/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'User-Agent': 'OpenClaw/1.0'
      },
      timeout: this.timeout
    };
  }

  // 构建请求体
  _buildRequestBody(prompt, options = {}) {
    const model = options.model || this.defaultModel;
    const temperature = options.temperature || 0.7;
    const maxTokens = options.maxTokens || 1000;

    return {
      model: model,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: temperature,
      max_tokens: maxTokens,
      stream: options.stream || false
    };
  }

  // 处理API响应
  _handleResponse(response, callback) {
    let data = '';

    response.on('data', (chunk) => {
      data += chunk;
    });

    response.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.error) {
          callback(new Error(`API错误: ${result.error.message || '未知错误'}`), null);
        } else {
          callback(null, result);
        }
      } catch (error) {
        callback(new Error(`响应解析失败: ${error.message}`), null);
      }
    });

    response.on('error', (error) => {
      callback(new Error(`响应错误: ${error.message}`), null);
    });
  }

  // 执行API请求（带重试机制）
  _executeRequest(prompt, options = {}, retries = 0) {
    return new Promise((resolve, reject) => {
      const requestOptions = this._buildRequestOptions(prompt, options);
      const requestBody = this._buildRequestBody(prompt, options);

      const req = https.request(requestOptions, (response) => {
        this._handleResponse(response, (error, result) => {
          if (error) {
            // 检查是否需要重试
            if (retries < this.maxRetries) {
              console.log(`请求失败，${this.maxRetries - retries}次重试机会...`);
              console.log(`错误信息: ${error.message}`);
              
              // 检查是否是速率限制错误
              if (error.message.includes('rate limit') || error.message.includes('429')) {
                console.log('遇到速率限制，等待后重试...');
                setTimeout(() => {
                  this._executeRequest(prompt, options, retries + 1)
                    .then(resolve)
                    .catch(reject);
                }, this.rateLimitDelay);
              } else {
                // 其他错误，普通重试
                setTimeout(() => {
                  this._executeRequest(prompt, options, retries + 1)
                    .then(resolve)
                    .catch(reject);
                }, this.retryDelay * (retries + 1));
              }
            } else {
              reject(error);
            }
          } else {
            resolve(result);
          }
        });
      });

      req.on('error', (error) => {
        if (retries < this.maxRetries) {
          console.log(`请求失败，${this.maxRetries - retries}次重试机会...`);
          console.log(`错误信息: ${error.message}`);
          setTimeout(() => {
            this._executeRequest(prompt, options, retries + 1)
              .then(resolve)
              .catch(reject);
          }, this.retryDelay * (retries + 1));
        } else {
          reject(new Error(`请求失败: ${error.message}`));
        }
      });

      req.on('timeout', () => {
        req.destroy();
        if (retries < this.maxRetries) {
          console.log(`请求超时，${this.maxRetries - retries}次重试机会...`);
          setTimeout(() => {
            this._executeRequest(prompt, options, retries + 1)
              .then(resolve)
              .catch(reject);
          }, this.retryDelay * (retries + 1));
        } else {
          reject(new Error('请求超时'));
        }
      });

      req.write(JSON.stringify(requestBody));
      req.end();
    });
  }

  // 发送聊天请求
  async chat(prompt, options = {}) {
    try {
      console.log('发送Doubao API请求...');
      console.log(`模型: ${options.model || this.defaultModel}`);
      console.log(`提示词长度: ${prompt.length} 字符`);

      const startTime = Date.now();
      const result = await this._executeRequest(prompt, options);
      const endTime = Date.now();

      console.log(`API响应时间: ${endTime - startTime}ms`);

      if (result.choices && result.choices.length > 0) {
        const response = result.choices[0].message.content;
        console.log(`响应长度: ${response.length} 字符`);
        return {
          success: true,
          response: response,
          usage: result.usage,
          latency: endTime - startTime
        };
      } else {
        throw new Error('API返回了空响应');
      }
    } catch (error) {
      console.error('聊天请求失败:', error.message);
      return {
        success: false,
        error: error.message
      };
    }
  }

  // 测试API连接
  async testConnection() {
    try {
      console.log('测试Volcano Engine API连接...');
      const testPrompt = '你好，这是一个测试请求';
      const result = await this.chat(testPrompt, {
        maxTokens: 50,
        temperature: 0.5
      });

      if (result.success) {
        console.log('API连接测试成功！');
        console.log('响应:', result.response);
        return {
          success: true,
          message: 'API连接正常'
        };
      } else {
        console.log('API连接测试失败:', result.error);
        return {
          success: false,
          message: result.error
        };
      }
    } catch (error) {
      console.error('API连接测试失败:', error.message);
      return {
        success: false,
        message: error.message
      };
    }
  }

  // 获取API状态
  getStatus() {
    return {
      apiKey: this.apiKey ? '已配置' : '未配置',
      endpoint: this.endpoint,
      defaultModel: this.defaultModel,
      maxRetries: this.maxRetries,
      timeout: this.timeout
    };
  }

  // 批量发送请求
  async batchChat(prompts, options = {}) {
    const results = [];
    
    for (let i = 0; i < prompts.length; i++) {
      console.log(`处理批量请求 ${i + 1}/${prompts.length}`);
      const result = await this.chat(prompts[i], options);
      results.push(result);
      
      // 避免速率限制
      if (i < prompts.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }
    
    return results;
  }

  // 流式响应（如果API支持）
  streamChat(prompt, options = {}, callback) {
    const requestOptions = this._buildRequestOptions(prompt, {
      ...options,
      stream: true
    });
    const requestBody = this._buildRequestBody(prompt, {
      ...options,
      stream: true
    });

    const req = https.request(requestOptions, (response) => {
      let buffer = '';

      response.on('data', (chunk) => {
        buffer += chunk;
        
        // 处理流式响应
        const lines = buffer.split('\n');
        buffer = lines.pop();

        for (const line of lines) {
          if (line.trim() === '') continue;
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            if (data === '[DONE]') {
              callback(null, { done: true });
              return;
            }
            try {
              const chunk = JSON.parse(data);
              if (chunk.choices && chunk.choices.length > 0) {
                const delta = chunk.choices[0].delta;
                if (delta.content) {
                  callback(null, { content: delta.content });
                }
              }
            } catch (error) {
              console.error('流式响应解析失败:', error.message);
            }
          }
        }
      });

      response.on('end', () => {
        callback(null, { done: true });
      });

      response.on('error', (error) => {
        callback(error, null);
      });
    });

    req.on('error', (error) => {
      callback(error, null);
    });

    req.write(JSON.stringify(requestBody));
    req.end();

    return req;
  }
}

// 导出单例实例
const volcanoAPIAdapter = new VolcanoAPIAdapter();

module.exports = {
  VolcanoAPIAdapter,
  volcanoAPIAdapter,
  // 工具函数
  testAPIConnection: () => volcanoAPIAdapter.testConnection(),
  getAPIStatus: () => volcanoAPIAdapter.getStatus(),
  setAPIKey: (apiKey) => volcanoAPIAdapter.setApiKey(apiKey)
};

// 示例用法
if (require.main === module) {
  async function test() {
    console.log('=== 测试Volcano API适配器 ===');
    
    // 测试API状态
    const status = volcanoAPIAdapter.getStatus();
    console.log('API状态:', status);
    
    // 测试API连接
    const connectionTest = await volcanoAPIAdapter.testConnection();
    console.log('连接测试:', connectionTest);
    
    // 测试聊天功能
    if (connectionTest.success) {
      console.log('\n测试聊天功能:');
      const chatResult = await volcanoAPIAdapter.chat('请简单介绍一下你自己');
      console.log('聊天结果:', chatResult);
    }
  }
  
  test().catch(console.error);
}