const https = require('https');
const http = require('http');
const { URL } = require('url');

class BailianClient {
  constructor(options = {}) {
    this.apiKey = options.apiKey || process.env.ALIBABA_CLOUD_API_KEY;
    this.baseURL = options.baseURL || 'https://dashscope.aliyuncs.com/compatible-mode/v1';
    this.model = options.model || 'qwen3.5-plus';
    this.region = options.region || 'cn-beijing';
    
    if (!this.apiKey) {
      throw new Error('阿里云百炼 API Key 未配置，请在 .env 文件中设置 ALIBABA_CLOUD_API_KEY');
    }

    console.log(`✅ 阿里云百炼客户端已初始化`);
    console.log(`   区域：${this.region}`);
    console.log(`   模型：${this.model}`);
    console.log(`   API 端点：${this.baseURL}`);
  }

  async chat(messages, options = {}) {
    const {
      model = this.model,
      temperature = 0.7,
      top_p = 0.8,
      max_tokens = 2048,
      stream = false,
      systemPrompt
    } = options;

    const apiMessages = [];
    
    if (systemPrompt) {
      apiMessages.push({ role: 'system', content: systemPrompt });
    }
    
    apiMessages.push(...messages);

    const payload = {
      model,
      messages: apiMessages,
      temperature,
      top_p,
      max_tokens,
      stream
    };

    console.log(`📤 调用阿里云百炼 API`);
    console.log(`   模型：${model}`);
    console.log(`   消息数：${messages.length}`);

    try {
      const response = await this.makeRequest({
        method: 'POST',
        path: '/chat/completions',
        body: payload
      });

      if (response.success) {
        console.log(`✅ API 调用成功`);
        return {
          success: true,
          content: response.data.choices[0].message.content,
          usage: response.data.usage,
          model: response.data.model,
          raw: response.data
        };
      } else {
        console.error(`❌ API 调用失败：${response.error}`);
        return {
          success: false,
          error: response.error,
          statusCode: response.statusCode
        };
      }
    } catch (error) {
      console.error(`❌ API 调用异常：${error.message}`);
      return {
        success: false,
        error: error.message
      };
    }
  }

  async makeRequest(options) {
    const { method = 'POST', path, body } = options;

    return new Promise((resolve) => {
      try {
        const parsedUrl = new URL(this.baseURL);
        const isHttps = parsedUrl.protocol === 'https:';
        const client = isHttps ? https : http;

        console.log(`🔍 请求详情:`);
        console.log(`   URL: ${this.baseURL}${path}`);
        console.log(`   API Key 前缀：${this.apiKey ? this.apiKey.substring(0, 10) + '...' : 'undefined'}`);

        const requestOptions = {
          hostname: parsedUrl.hostname,
          port: parsedUrl.port || (isHttps ? 443 : 80),
          path: parsedUrl.pathname.replace(/\/$/, '') + path,
          method: method,
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${this.apiKey}`,
            'X-DashScope-SSE': 'disable'
          },
          timeout: 60000
        };

        const req = client.request(requestOptions, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            let parsedData;
            try {
              parsedData = JSON.parse(data);
            } catch {
              parsedData = { raw: data };
            }

            const success = res.statusCode >= 200 && res.statusCode < 300;

            if (!success) {
              console.error(`❌ HTTP ${method} ${path}: ${res.statusCode}`);
              if (parsedData.error) {
                console.error(`   错误信息：${parsedData.error.message || JSON.stringify(parsedData.error)}`);
              }
            }

            resolve({
              success,
              statusCode: res.statusCode,
              data: parsedData,
              headers: res.headers
            });
          });
        });

        req.on('error', (error) => {
          console.error(`❌ HTTP ${method} ${path} 失败：${error.message}`);
          resolve({
            success: false,
            error: error.message
          });
        });

        req.on('timeout', () => {
          req.destroy();
          console.error(`❌ HTTP ${method} ${path} 超时`);
          resolve({
            success: false,
            error: '请求超时'
          });
        });

        if (body) {
          const bodyString = typeof body === 'string' ? body : JSON.stringify(body);
          req.write(bodyString);
        }

        req.end();
      } catch (error) {
        console.error(`❌ 请求异常：${error.message}`);
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  async simpleChat(userMessage, systemPrompt) {
    const messages = [
      { role: 'user', content: userMessage }
    ];

    return this.chat(messages, { systemPrompt });
  }

  getCapabilities() {
    return {
      provider: 'alibaba-bailian',
      region: this.region,
      model: this.model,
      baseURL: this.baseURL,
      supportedModels: [
        'qwen3.5-plus',
        'qwen-plus',
        'qwen-max',
        'qwen-turbo',
        'qwen-long'
      ],
      features: [
        '文本生成',
        '多轮对话',
        '系统提示词',
        '温度控制',
        'top_p 采样',
        '多模态支持'
      ]
    };
  }
}

module.exports = BailianClient;
