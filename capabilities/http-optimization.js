const fs = require('fs');
const path = require('path');

class HttpOptimization {
  constructor(options = {}) {
    this.options = {
      cacheDir: path.join(process.cwd(), 'http-cache'),
      enableCaching: true,
      cacheTTL: 3600000, // 1 hour
      enableCompression: true,
      enableMarkdownAccept: true,
      ...options
    };
    
    this.cache = new Map();
    this.requestStats = {
      total: 0,
      cached: 0,
      markdownAccepted: 0,
      compressed: 0
    };
    
    this.ensureDirectories();
  }

  // 确保目录存在
  ensureDirectories() {
    if (!fs.existsSync(this.options.cacheDir)) {
      fs.mkdirSync(this.options.cacheDir, { recursive: true });
    }
  }

  // 优化HTTP请求选项
  optimizeRequestOptions(options) {
    const optimizedOptions = { ...options };
    
    // 添加Accept: text/markdown头以减少token消耗
    if (this.options.enableMarkdownAccept) {
      optimizedOptions.headers = {
        'Accept': 'text/markdown, application/json, text/plain, */*',
        ...optimizedOptions.headers
      };
      this.requestStats.markdownAccepted++;
    }
    
    // 添加压缩支持
    if (this.options.enableCompression) {
      optimizedOptions.headers = {
        'Accept-Encoding': 'gzip, deflate, br',
        ...optimizedOptions.headers
      };
      this.requestStats.compressed++;
    }
    
    // 添加用户代理
    optimizedOptions.headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      ...optimizedOptions.headers
    };
    
    return optimizedOptions;
  }

  // 生成缓存键
  generateCacheKey(options) {
    const url = options.url || `${options.protocol}//${options.hostname}${options.path}`;
    const method = options.method || 'GET';
    const body = options.body ? JSON.stringify(options.body) : '';
    const headers = JSON.stringify(options.headers || {});
    
    return `${method}:${url}:${body}:${headers}`;
  }

  // 检查缓存
  checkCache(options) {
    if (!this.options.enableCaching) {
      return null;
    }
    
    const cacheKey = this.generateCacheKey(options);
    const cachedItem = this.cache.get(cacheKey);
    
    if (cachedItem) {
      const now = Date.now();
      if (now - cachedItem.timestamp < this.options.cacheTTL) {
        this.requestStats.cached++;
        return cachedItem.data;
      } else {
        // 缓存过期，删除
        this.cache.delete(cacheKey);
      }
    }
    
    return null;
  }

  // 设置缓存
  setCache(options, data) {
    if (!this.options.enableCaching) {
      return;
    }
    
    const cacheKey = this.generateCacheKey(options);
    this.cache.set(cacheKey, {
      data,
      timestamp: Date.now()
    });
    
    // 限制缓存大小
    if (this.cache.size > 1000) {
      // 删除最旧的缓存项
      const oldestKey = this.cache.keys().next().value;
      this.cache.delete(oldestKey);
    }
  }

  // 清理过期缓存
  cleanupCache() {
    if (!this.options.enableCaching) {
      return;
    }
    
    const now = Date.now();
    let deleted = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now - item.timestamp >= this.options.cacheTTL) {
        this.cache.delete(key);
        deleted++;
      }
    }
    
    console.log(`[HTTP Optimization] Cleaned up ${deleted} expired cache items`);
    return deleted;
  }

  // 优化响应处理
  optimizeResponse(response, options = {}) {
    // 处理markdown响应
    if (response.headers && response.headers['content-type'] && 
        response.headers['content-type'].includes('text/markdown')) {
      return {
        ...response,
        isMarkdown: true,
        processed: true
      };
    }
    
    // 处理JSON响应
    if (response.headers && response.headers['content-type'] && 
        response.headers['content-type'].includes('application/json')) {
      try {
        const parsedData = JSON.parse(response.data);
        return {
          ...response,
          parsedData,
          processed: true
        };
      } catch (error) {
        // JSON解析失败，保持原始数据
      }
    }
    
    return response;
  }

  // 批量优化请求
  batchOptimizeRequests(requests) {
    return requests.map(request => ({
      ...request,
      options: this.optimizeRequestOptions(request.options)
    }));
  }

  // 获取请求统计
  getRequestStats() {
    return {
      ...this.requestStats,
      cacheSize: this.cache.size,
      timestamp: new Date().toISOString()
    };
  }

  // 重置统计
  resetStats() {
    this.requestStats = {
      total: 0,
      cached: 0,
      markdownAccepted: 0,
      compressed: 0
    };
    return { reset: true };
  }

  // 清除所有缓存
  clearCache() {
    const size = this.cache.size;
    this.cache.clear();
    return { cleared: true, cacheSize: size };
  }

  // 导出缓存
  exportCache() {
    const exportData = {
      cache: Object.fromEntries(
        Array.from(this.cache.entries()).map(([key, value]) => [key, value])
      ),
      stats: this.getRequestStats(),
      options: this.options,
      timestamp: new Date().toISOString()
    };
    
    const exportFile = path.join(this.options.cacheDir, `cache_export_${Date.now()}.json`);
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2), 'utf8');
    
    return { exported: true, file: exportFile };
  }

  // 导入缓存
  importCache(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const importData = JSON.parse(content);
      
      if (importData.cache) {
        for (const [key, value] of Object.entries(importData.cache)) {
          this.cache.set(key, value);
        }
      }
      
      if (importData.options) {
        this.options = { ...this.options, ...importData.options };
      }
      
      console.log(`[HTTP Optimization] Cache imported from: ${filePath}`);
      return { imported: true };
    } catch (error) {
      console.error('[HTTP Optimization] Error importing cache:', error);
      return { imported: false, error: error.message };
    }
  }

  // 优化URL
  optimizeUrl(url) {
    // 移除不必要的参数
    try {
      const parsedUrl = new URL(url);
      
      // 移除常见的跟踪参数
      const trackingParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
      trackingParams.forEach(param => {
        parsedUrl.searchParams.delete(param);
      });
      
      return parsedUrl.toString();
    } catch (error) {
      // URL解析失败，返回原始URL
      return url;
    }
  }

  // 生成请求摘要
  generateRequestSummary(options) {
    const url = options.url || `${options.protocol}//${options.hostname}${options.path}`;
    const method = options.method || 'GET';
    const headers = options.headers || {};
    const hasBody = !!options.body;
    
    return {
      method,
      url: this.optimizeUrl(url),
      hasBody,
      hasMarkdownAccept: headers['Accept'] && headers['Accept'].includes('text/markdown'),
      hasCompression: headers['Accept-Encoding'] && headers['Accept-Encoding'].includes('gzip'),
      timestamp: new Date().toISOString()
    };
  }

  // 健康检查
  healthCheck() {
    return {
      status: 'healthy',
      cacheEnabled: this.options.enableCaching,
      markdownAcceptEnabled: this.options.enableMarkdownAccept,
      compressionEnabled: this.options.enableCompression,
      cacheSize: this.cache.size,
      stats: this.getRequestStats(),
      timestamp: new Date().toISOString()
    };
  }
}

// 导出单例
module.exports = new HttpOptimization();
module.exports.HttpOptimization = HttpOptimization;