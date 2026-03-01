const https = require('https');
const http = require('http');
const { URL } = require('url');

class NetworkCapability {
  constructor() {
    this.capabilities = this.loadCapabilities();
  }

  loadCapabilities() {
    return {
      version: '1.0',
      category: 'network',
      description: 'HTTP network request capabilities',
      capabilities: [
        {
          id: 'net_http_get',
          name: 'HTTP GET Request',
          type: 'network_operation',
          description: 'Perform an HTTP GET request',
          inputs: [
            { name: 'url', type: 'string', description: 'URL to request', required: true },
            { name: 'headers', type: 'object', description: 'Request headers', required: false, default: {} },
            { name: 'timeout', type: 'number', description: 'Request timeout in ms', required: false, default: 30000 },
            { name: 'retryCount', type: 'number', description: 'Number of retries on failure', required: false, default: 3 }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the request succeeded' },
            { name: 'statusCode', type: 'number', description: 'HTTP status code' },
            { name: 'data', type: 'any', description: 'Response data' },
            { name: 'headers', type: 'object', description: 'Response headers' }
          ],
          failurePoints: [
            { type: 'network_error', description: 'Network connectivity issue', impact: 'request_failure' },
            { type: 'timeout', description: 'Request timed out', impact: 'request_failure' },
            { type: 'invalid_url', description: 'Invalid URL format', impact: 'request_failure' }
          ],
          reliability: 0.92,
          适用场景: ['API调用', '数据获取', '健康检查'],
          优势: ['自动重试', '超时控制', '错误处理']
        },
        {
          id: 'net_http_post',
          name: 'HTTP POST Request',
          type: 'network_operation',
          description: 'Perform an HTTP POST request',
          inputs: [
            { name: 'url', type: 'string', description: 'URL to request', required: true },
            { name: 'body', type: 'any', description: 'Request body', required: false },
            { name: 'headers', type: 'object', description: 'Request headers', required: false, default: {} },
            { name: 'timeout', type: 'number', description: 'Request timeout in ms', required: false, default: 30000 },
            { name: 'retryCount', type: 'number', description: 'Number of retries on failure', required: false, default: 3 }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the request succeeded' },
            { name: 'statusCode', type: 'number', description: 'HTTP status code' },
            { name: 'data', type: 'any', description: 'Response data' },
            { name: 'headers', type: 'object', description: 'Response headers' }
          ],
          failurePoints: [
            { type: 'network_error', description: 'Network connectivity issue', impact: 'request_failure' },
            { type: 'invalid_body', description: 'Invalid request body format', impact: 'request_failure' },
            { type: 'server_error', description: 'Server returned error status', impact: 'operation_failure' }
          ],
          reliability: 0.90,
          适用场景: ['数据提交', 'API创建操作', '表单提交'],
          优势: ['JSON支持', '自定义头部', '重试机制']
        },
        {
          id: 'net_http_put',
          name: 'HTTP PUT Request',
          type: 'network_operation',
          description: 'Perform an HTTP PUT request',
          inputs: [
            { name: 'url', type: 'string', description: 'URL to request', required: true },
            { name: 'body', type: 'any', description: 'Request body', required: false },
            { name: 'headers', type: 'object', description: 'Request headers', required: false, default: {} },
            { name: 'timeout', type: 'number', description: 'Request timeout in ms', required: false, default: 30000 }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the request succeeded' },
            { name: 'statusCode', type: 'number', description: 'HTTP status code' },
            { name: 'data', type: 'any', description: 'Response data' }
          ],
          failurePoints: [
            { type: 'network_error', description: 'Network connectivity issue', impact: 'request_failure' },
            { type: 'not_found', description: 'Resource not found', impact: 'operation_failure' },
            { type: 'conflict', description: 'Resource conflict', impact: 'operation_failure' }
          ],
          reliability: 0.88,
          适用场景: ['数据更新', '资源替换', '配置修改'],
          优势: ['完整更新', '幂等操作', '错误处理']
        },
        {
          id: 'net_http_delete',
          name: 'HTTP DELETE Request',
          type: 'network_operation',
          description: 'Perform an HTTP DELETE request',
          inputs: [
            { name: 'url', type: 'string', description: 'URL to request', required: true },
            { name: 'headers', type: 'object', description: 'Request headers', required: false, default: {} },
            { name: 'timeout', type: 'number', description: 'Request timeout in ms', required: false, default: 30000 }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the request succeeded' },
            { name: 'statusCode', type: 'number', description: 'HTTP status code' },
            { name: 'data', type: 'any', description: 'Response data' }
          ],
          failurePoints: [
            { type: 'network_error', description: 'Network connectivity issue', impact: 'request_failure' },
            { type: 'not_found', description: 'Resource not found', impact: 'operation_failure' },
            { type: 'forbidden', description: 'Delete not allowed', impact: 'operation_failure' }
          ],
          reliability: 0.90,
          适用场景: ['资源删除', '数据清理', '取消操作'],
          优势: ['幂等操作', '安全确认', '错误处理']
        },
        {
          id: 'net_retry_request',
          name: 'Retry Request with Strategy',
          type: 'network_operation',
          description: 'Perform HTTP request with advanced retry strategy',
          inputs: [
            { name: 'url', type: 'string', description: 'URL to request', required: true },
            { name: 'method', type: 'string', description: 'HTTP method', required: true },
            { name: 'body', type: 'any', description: 'Request body', required: false },
            { name: 'retryStrategy', type: 'object', description: 'Retry strategy configuration', required: false, default: { maxRetries: 3, backoff: 'exponential', baseDelay: 1000 } }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the request succeeded' },
            { name: 'attempts', type: 'number', description: 'Number of attempts made' },
            { name: 'data', type: 'any', description: 'Response data' }
          ],
          failurePoints: [
            { type: 'max_retries_exceeded', description: 'Maximum retry attempts exceeded', impact: 'request_failure' },
            { type: 'circuit_breaker', description: 'Circuit breaker triggered', impact: 'request_blocked' }
          ],
          reliability: 0.95,
          适用场景: ['不稳定网络', '高可用性要求', '关键API调用'],
          优势: ['指数退避', '熔断保护', '智能重试']
        }
      ],
      usageStats: {
        totalOperations: 0,
        successfulOperations: 0,
        failedOperations: 0,
        lastUsed: null
      }
    };
  }

  async executeCapability(capabilityId, params) {
    console.log(`=== Executing network capability: ${capabilityId} ===`);
    
    const capability = this.capabilities.capabilities.find(c => c.id === capabilityId);
    if (!capability) {
      throw new Error(`Capability not found: ${capabilityId}`);
    }

    let result;
    switch (capabilityId) {
      case 'net_http_get':
        result = await this.httpGet(params);
        break;
      case 'net_http_post':
        result = await this.httpPost(params);
        break;
      case 'net_http_put':
        result = await this.httpPut(params);
        break;
      case 'net_http_delete':
        result = await this.httpDelete(params);
        break;
      case 'net_retry_request':
        result = await this.retryRequest(params);
        break;
      default:
        throw new Error(`Unknown capability: ${capabilityId}`);
    }

    this.updateUsageStats(result.success);
    return result;
  }

  async httpGet(params) {
    const { url, headers = {}, timeout = 30000, retryCount = 3 } = params;
    
    return this.makeRequestWithRetry({
      url,
      method: 'GET',
      headers,
      timeout
    }, retryCount);
  }

  async httpPost(params) {
    const { url, body, headers = {}, timeout = 30000, retryCount = 3 } = params;
    
    return this.makeRequestWithRetry({
      url,
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout
    }, retryCount);
  }

  async httpPut(params) {
    const { url, body, headers = {}, timeout = 30000 } = params;
    
    return this.makeRequest({
      url,
      method: 'PUT',
      body,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      timeout
    });
  }

  async httpDelete(params) {
    const { url, headers = {}, timeout = 30000 } = params;
    
    return this.makeRequest({
      url,
      method: 'DELETE',
      headers,
      timeout
    });
  }

  async retryRequest(params) {
    const { url, method, body, retryStrategy = {} } = params;
    const { maxRetries = 3, backoff = 'exponential', baseDelay = 1000 } = retryStrategy;

    let lastError;
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await this.makeRequest({
          url,
          method,
          body,
          headers: body ? { 'Content-Type': 'application/json' } : {}
        });

        if (result.success) {
          return { ...result, attempts: attempt };
        }

        if (result.statusCode && result.statusCode < 500) {
          return { ...result, attempts: attempt };
        }

        lastError = result.error;
      } catch (error) {
        lastError = error.message;
      }

      if (attempt < maxRetries) {
        const delay = backoff === 'exponential' 
          ? baseDelay * Math.pow(2, attempt - 1)
          : baseDelay * attempt;
        await this.sleep(delay);
      }
    }

    return {
      success: false,
      attempts: maxRetries,
      error: lastError || 'Max retries exceeded'
    };
  }

  async makeRequestWithRetry(options, retryCount) {
    let lastError;
    
    for (let attempt = 1; attempt <= retryCount; attempt++) {
      try {
        const result = await this.makeRequest(options);
        
        if (result.success) {
          return result;
        }

        if (result.statusCode && result.statusCode < 500) {
          return result;
        }

        lastError = result.error;
      } catch (error) {
        lastError = error.message;
      }

      if (attempt < retryCount) {
        await this.sleep(1000 * attempt);
      }
    }

    return {
      success: false,
      error: lastError || 'Request failed after retries'
    };
  }

  async makeRequest(options) {
    const { url, method = 'GET', body, headers = {}, timeout = 30000 } = options;

    return new Promise((resolve) => {
      try {
        const parsedUrl = new URL(url);
        const isHttps = parsedUrl.protocol === 'https:';
        const client = isHttps ? https : http;

        const requestOptions = {
          hostname: parsedUrl.hostname,
          port: parsedUrl.port || (isHttps ? 443 : 80),
          path: parsedUrl.pathname + parsedUrl.search,
          method: method,
          headers: headers,
          timeout: timeout
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
              parsedData = data;
            }

            const success = res.statusCode >= 200 && res.statusCode < 300;

            console.log(`✅ HTTP ${method} ${url}: ${res.statusCode}`);
            resolve({
              success,
              statusCode: res.statusCode,
              data: parsedData,
              headers: res.headers
            });
          });
        });

        req.on('error', (error) => {
          console.error(`❌ HTTP ${method} ${url} failed: ${error.message}`);
          resolve({
            success: false,
            error: error.message
          });
        });

        req.on('timeout', () => {
          req.destroy();
          console.error(`❌ HTTP ${method} ${url} timed out`);
          resolve({
            success: false,
            error: 'Request timed out'
          });
        });

        if (body) {
          const bodyString = typeof body === 'string' ? body : JSON.stringify(body);
          req.write(bodyString);
        }

        req.end();
      } catch (error) {
        console.error(`❌ Invalid request: ${error.message}`);
        resolve({
          success: false,
          error: error.message
        });
      }
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  updateUsageStats(success) {
    this.capabilities.usageStats.totalOperations++;
    if (success) {
      this.capabilities.usageStats.successfulOperations++;
    } else {
      this.capabilities.usageStats.failedOperations++;
    }
    this.capabilities.usageStats.lastUsed = new Date().toISOString();
  }

  getCapabilities() {
    return this.capabilities;
  }

  getCapabilityById(id) {
    return this.capabilities.capabilities.find(c => c.id === id);
  }

  getUsageStats() {
    return this.capabilities.usageStats;
  }
}

module.exports = NetworkCapability;
