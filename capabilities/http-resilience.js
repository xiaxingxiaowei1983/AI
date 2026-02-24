const https = require('https');
const http = require('http');

class HttpResilience {
  constructor(options = {}) {
    this.defaultOptions = {
      maxRetries: 3,
      baseDelay: 1000,
      maxDelay: 30000,
      timeout: 10000,
      ...options
    };
    
    // 连接池
    this.agents = {
      http: new http.Agent({ keepAlive: true }),
      https: new https.Agent({ keepAlive: true })
    };
  }

  // 指数退避延迟计算
  calculateDelay(attempt) {
    const { baseDelay, maxDelay } = this.defaultOptions;
    const delay = baseDelay * Math.pow(2, attempt) + Math.random() * 1000;
    return Math.min(delay, maxDelay);
  }

  // 检查是否应该重试
  shouldRetry(error, attempt, maxRetries) {
    if (attempt >= maxRetries) return false;
    
    const retryableErrors = [
      'ECONNRESET',
      'ECONNREFUSED',
      'ETIMEDOUT',
      'ENOTFOUND',
      'TimeoutError'
    ];
    
    return retryableErrors.some(errorType => 
      error.message && error.message.includes(errorType)
    ) || 
    (error.statusCode && [429, 500, 502, 503, 504].includes(error.statusCode));
  }

  // 带重试的HTTP请求
  async request(options, callback) {
    const { maxRetries, timeout } = this.defaultOptions;
    let attempt = 0;

    const doRequest = async () => {
      return new Promise((resolve, reject) => {
        const protocol = options.protocol === 'https:' ? https : http;
        const agent = this.agents[options.protocol === 'https:' ? 'https' : 'http'];
        
        const reqOptions = {
          ...options,
          agent,
          timeout
        };

        const req = protocol.request(reqOptions, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              resolve({ statusCode: res.statusCode, data });
            } else {
              const error = new Error(`HTTP error: ${res.statusCode}`);
              error.statusCode = res.statusCode;
              reject(error);
            }
          });
        });

        req.on('error', (error) => {
          reject(error);
        });

        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Request timeout'));
        });

        if (options.body) {
          req.write(options.body);
        }
        req.end();
      });
    };

    while (attempt <= maxRetries) {
      try {
        const result = await doRequest();
        if (callback) {
          callback(null, result);
        }
        return result;
      } catch (error) {
        if (this.shouldRetry(error, attempt, maxRetries)) {
          attempt++;
          const delay = this.calculateDelay(attempt);
          console.log(`Request failed, retrying in ${Math.round(delay/1000)}s... (Attempt ${attempt}/${maxRetries})`);
          await new Promise(resolve => setTimeout(resolve, delay));
        } else {
          if (callback) {
            callback(error);
          }
          throw error;
        }
      }
    }
  }

  // 便捷方法：GET请求
  async get(url, options = {}) {
    const parsedUrl = new URL(url);
    return this.request({
      protocol: parsedUrl.protocol,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    });
  }

  // 便捷方法：POST请求
  async post(url, data, options = {}) {
    const parsedUrl = new URL(url);
    const body = typeof data === 'object' ? JSON.stringify(data) : data;
    return this.request({
      protocol: parsedUrl.protocol,
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
        ...options.headers
      },
      body,
      ...options
    });
  }
}

// 导出单例
module.exports = new HttpResilience();
module.exports.HttpResilience = HttpResilience;
