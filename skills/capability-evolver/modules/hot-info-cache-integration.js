/**
 * 热信息缓存集成模块
 * 从其他智能体获取进化灵感
 * 实现智能体间信息交换和热点信息处理
 */

const fs = require('fs');
const path = require('path');

class HotInfoCacheIntegration {
  constructor(config = {}) {
    this.config = {
      baseDir: config.baseDir || path.join(__dirname, '..', 'data'),
      cacheDir: config.cacheDir || path.join(__dirname, '..', 'data', 'hot-info-cache'),
      exchangeDir: config.exchangeDir || path.join(__dirname, '..', 'data', 'agent-exchange'),
      logFile: config.logFile || path.join(__dirname, '..', '..', '..', 'logs', 'hot-info-cache.log'),
      cacheExpiry: config.cacheExpiry || 24 * 60 * 60 * 1000, // 24小时过期
      cleanupInterval: config.cleanupInterval || 60 * 60 * 1000, // 1小时清理一次
      ...config
    };
    
    this.ensureDirectories();
    this.startCleanupScheduler();
  }
  
  // 确保目录存在
  ensureDirectories() {
    const directories = [
      this.config.baseDir,
      this.config.cacheDir,
      this.config.exchangeDir,
      path.dirname(this.config.logFile)
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`Created directory: ${dir}`);
      }
    });
  }
  
  // 日志函数
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [Hot Info Cache] ${message}`;
    console.log(logMessage);
    
    // 写入日志文件
    fs.appendFileSync(this.config.logFile, logMessage + '\n', { flag: 'a' });
  }
  
  // 启动清理调度器
  startCleanupScheduler() {
    setInterval(() => {
      this.cleanupExpiredCache();
      this.cleanupOldExchangeData();
    }, this.config.cleanupInterval);
    
    this.log(`Cleanup scheduler started: ${this.config.cleanupInterval}ms`);
  }
  
  // 清理过期缓存
  cleanupExpiredCache() {
    try {
      const files = fs.readdirSync(this.config.cacheDir);
      let deletedCount = 0;
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const cachePath = path.join(this.config.cacheDir, file);
          try {
            const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
            if (Date.now() - cacheData.timestamp > this.config.cacheExpiry) {
              fs.unlinkSync(cachePath);
              deletedCount++;
            }
          } catch (error) {
            this.log(`Error processing cache file ${file}: ${error.message}`);
          }
        }
      });
      
      if (deletedCount > 0) {
        this.log(`Cleaned up ${deletedCount} expired cache entries`);
      }
    } catch (error) {
      this.log(`Error cleaning up expired cache: ${error.message}`);
    }
  }
  
  // 清理旧的交换数据
  cleanupOldExchangeData() {
    try {
      const files = fs.readdirSync(this.config.exchangeDir);
      let deletedCount = 0;
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const exchangePath = path.join(this.config.exchangeDir, file);
          try {
            const exchangeData = JSON.parse(fs.readFileSync(exchangePath, 'utf8'));
            // 清理24小时前的数据
            if (Date.now() - exchangeData.timestamp > 24 * 60 * 60 * 1000) {
              fs.unlinkSync(exchangePath);
              deletedCount++;
            }
          } catch (error) {
            this.log(`Error processing exchange file ${file}: ${error.message}`);
          }
        }
      });
      
      if (deletedCount > 0) {
        this.log(`Cleaned up ${deletedCount} old exchange data files`);
      }
    } catch (error) {
      this.log(`Error cleaning up old exchange data: ${error.message}`);
    }
  }
  
  // 发布信息到交换目录
  publishInfo(agentId, info) {
    try {
      const exchangeData = {
        id: `exchange-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        agentId: agentId,
        timestamp: Date.now(),
        info: info,
        type: info.type || 'general',
        priority: info.priority || 'medium'
      };
      
      const exchangePath = path.join(this.config.exchangeDir, `${exchangeData.id}.json`);
      fs.writeFileSync(exchangePath, JSON.stringify(exchangeData, null, 2));
      
      this.log(`Published info from agent ${agentId}: ${info.title || 'untitled'}`);
      return exchangeData.id;
    } catch (error) {
      this.log(`Error publishing info: ${error.message}`);
      return null;
    }
  }
  
  // 订阅其他智能体的信息
  subscribeToInfo(callback, options = {}) {
    try {
      const files = fs.readdirSync(this.config.exchangeDir);
      const newInfo = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const exchangePath = path.join(this.config.exchangeDir, file);
          try {
            const exchangeData = JSON.parse(fs.readFileSync(exchangePath, 'utf8'));
            
            // 检查是否符合过滤条件
            if (options.agentId && exchangeData.agentId !== options.agentId) {
              return;
            }
            
            if (options.type && exchangeData.type !== options.type) {
              return;
            }
            
            if (options.minPriority) {
              const priorityOrder = { low: 1, medium: 2, high: 3 };
              if (priorityOrder[exchangeData.priority] < priorityOrder[options.minPriority]) {
                return;
              }
            }
            
            // 检查是否为新信息（默认1小时内）
            if (Date.now() - exchangeData.timestamp < (options.timeWindow || 60 * 60 * 1000)) {
              newInfo.push(exchangeData);
            }
          } catch (error) {
            this.log(`Error processing exchange file ${file}: ${error.message}`);
          }
        }
      });
      
      if (newInfo.length > 0) {
        this.log(`Found ${newInfo.length} new info items`);
        if (callback) {
          callback(newInfo);
        }
      }
      
      return newInfo;
    } catch (error) {
      this.log(`Error subscribing to info: ${error.message}`);
      return [];
    }
  }
  
  // 识别热点信息
  identifyHotInfo() {
    try {
      const files = fs.readdirSync(this.config.exchangeDir);
      const infoItems = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const exchangePath = path.join(this.config.exchangeDir, file);
          try {
            const exchangeData = JSON.parse(fs.readFileSync(exchangePath, 'utf8'));
            infoItems.push(exchangeData);
          } catch (error) {
            this.log(`Error processing exchange file ${file}: ${error.message}`);
          }
        }
      });
      
      // 按优先级和时间排序
      const sortedInfo = infoItems.sort((a, b) => {
        const priorityOrder = { low: 1, medium: 2, high: 3 };
        const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return b.timestamp - a.timestamp;
      });
      
      // 取前5个热点信息
      const hotInfo = sortedInfo.slice(0, 5);
      this.log(`Identified ${hotInfo.length} hot info items`);
      
      return hotInfo;
    } catch (error) {
      this.log(`Error identifying hot info: ${error.message}`);
      return [];
    }
  }
  
  // 缓存热点信息
  cacheHotInfo(info) {
    try {
      const cacheData = {
        id: `cache-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        timestamp: Date.now(),
        expiry: Date.now() + this.config.cacheExpiry,
        info: info,
        source: info.agentId || 'unknown',
        type: info.type || 'general'
      };
      
      const cachePath = path.join(this.config.cacheDir, `${cacheData.id}.json`);
      fs.writeFileSync(cachePath, JSON.stringify(cacheData, null, 2));
      
      this.log(`Cached hot info: ${info.title || 'untitled'}`);
      return cacheData.id;
    } catch (error) {
      this.log(`Error caching hot info: ${error.message}`);
      return null;
    }
  }
  
  // 获取缓存的热点信息
  getCachedHotInfo(options = {}) {
    try {
      const files = fs.readdirSync(this.config.cacheDir);
      const cachedInfo = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const cachePath = path.join(this.config.cacheDir, file);
          try {
            const cacheData = JSON.parse(fs.readFileSync(cachePath, 'utf8'));
            
            // 检查是否过期
            if (cacheData.expiry < Date.now()) {
              return;
            }
            
            // 检查是否符合过滤条件
            if (options.type && cacheData.type !== options.type) {
              return;
            }
            
            if (options.source && cacheData.source !== options.source) {
              return;
            }
            
            cachedInfo.push(cacheData);
          } catch (error) {
            this.log(`Error processing cache file ${file}: ${error.message}`);
          }
        }
      });
      
      // 按时间排序
      cachedInfo.sort((a, b) => b.timestamp - a.timestamp);
      
      this.log(`Retrieved ${cachedInfo.length} cached hot info items`);
      return cachedInfo;
    } catch (error) {
      this.log(`Error getting cached hot info: ${error.message}`);
      return [];
    }
  }
  
  // 提取进化灵感
  extractEvolutionInspiration() {
    try {
      // 获取热点信息
      const hotInfo = this.identifyHotInfo();
      const cachedInfo = this.getCachedHotInfo();
      
      // 合并信息
      const allInfo = [...hotInfo, ...cachedInfo.map(c => c.info)];
      
      // 提取进化灵感
      const inspirations = [];
      
      allInfo.forEach(info => {
        // 从信息中提取可能的进化机会
        if (info.content) {
          const content = info.content.toLowerCase();
          
          // 检查是否包含进化相关关键词
          const evolutionKeywords = [
            'new feature', '新功能', '能力', 'capability',
            'optimize', '优化', 'improve', '改进',
            'abstract', '抽象', 'pattern', '模式',
            'leverage', '杠杆', 'efficiency', '效率'
          ];
          
          const relevantKeywords = evolutionKeywords.filter(keyword => 
            content.includes(keyword)
          );
          
          if (relevantKeywords.length > 0) {
            inspirations.push({
              id: info.id || `inspiration-${Date.now()}`,
              source: info.agentId || 'unknown',
              title: info.title || 'untitled',
              content: info.content,
              keywords: relevantKeywords,
              timestamp: info.timestamp || Date.now(),
              type: this.classifyInspirationType(info.content)
            });
          }
        }
      });
      
      // 去重
      const uniqueInspirations = this.deduplicateInspirations(inspirations);
      
      // 按相关性排序
      uniqueInspirations.sort((a, b) => b.keywords.length - a.keywords.length);
      
      this.log(`Extracted ${uniqueInspirations.length} evolution inspirations`);
      return uniqueInspirations;
    } catch (error) {
      this.log(`Error extracting evolution inspiration: ${error.message}`);
      return [];
    }
  }
  
  // 分类灵感类型
  classifyInspirationType(content) {
    const contentLower = content.toLowerCase();
    
    if (contentLower.includes('feature') || contentLower.includes('功能')) {
      return 'new-feature';
    }
    
    if (contentLower.includes('abstract') || contentLower.includes('抽象') || contentLower.includes('pattern') || contentLower.includes('模式')) {
      return 'new-abstract';
    }
    
    if (contentLower.includes('leverage') || contentLower.includes('杠杆') || contentLower.includes('efficiency') || contentLower.includes('效率')) {
      return 'new-lever';
    }
    
    return 'general';
  }
  
  // 去重灵感
  deduplicateInspirations(inspirations) {
    const seen = new Set();
    return inspirations.filter(inspiration => {
      const key = inspiration.content.substring(0, 100); // 使用内容前100字符作为去重键
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }
  
  // 集成到 PCEC 进化流程
  integrateWithPCEC() {
    try {
      // 提取进化灵感
      const inspirations = this.extractEvolutionInspiration();
      
      // 为每个灵感创建进化机会
      const evolutionOpportunities = inspirations.map(inspiration => ({
        id: `opportunity-${inspiration.id}`,
        type: inspiration.type,
        category: this.mapTypeToCategory(inspiration.type),
        description: `Inspired by: ${inspiration.title}`,
        source: inspiration.source,
        keywords: inspiration.keywords,
        content: inspiration.content,
        priority: this.calculateOpportunityPriority(inspiration)
      }));
      
      // 按优先级排序
      evolutionOpportunities.sort((a, b) => b.priority - a.priority);
      
      this.log(`Created ${evolutionOpportunities.length} evolution opportunities from inspirations`);
      return evolutionOpportunities;
    } catch (error) {
      this.log(`Error integrating with PCEC: ${error.message}`);
      return [];
    }
  }
  
  // 映射类型到类别
  mapTypeToCategory(type) {
    switch (type) {
      case 'new-feature':
        return 'A';
      case 'new-abstract':
        return 'B';
      case 'new-lever':
        return 'C';
      default:
        return 'A';
    }
  }
  
  // 计算机会优先级
  calculateOpportunityPriority(inspiration) {
    let priority = 1;
    
    // 基于关键词数量
    priority += inspiration.keywords.length * 0.5;
    
    // 基于类型
    const typeScores = {
      'new-feature': 1,
      'new-abstract': 1.5,
      'new-lever': 2
    };
    priority += typeScores[inspiration.type] || 0;
    
    // 基于时间（越新优先级越高）
    const ageHours = (Date.now() - inspiration.timestamp) / (1000 * 60 * 60);
    priority += Math.max(0, 2 - ageHours * 0.1);
    
    return priority;
  }
  
  // 清理指定的缓存项
  cleanupCacheItem(cacheId) {
    try {
      const cachePath = path.join(this.config.cacheDir, `${cacheId}.json`);
      if (fs.existsSync(cachePath)) {
        fs.unlinkSync(cachePath);
        this.log(`Cleaned up cache item: ${cacheId}`);
        return true;
      }
      return false;
    } catch (error) {
      this.log(`Error cleaning up cache item: ${error.message}`);
      return false;
    }
  }
  
  // 清理所有缓存
  cleanupAllCache() {
    try {
      const files = fs.readdirSync(this.config.cacheDir);
      let deletedCount = 0;
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const cachePath = path.join(this.config.cacheDir, file);
          try {
            fs.unlinkSync(cachePath);
            deletedCount++;
          } catch (error) {
            this.log(`Error deleting cache file ${file}: ${error.message}`);
          }
        }
      });
      
      this.log(`Cleaned up all ${deletedCount} cache items`);
      return deletedCount;
    } catch (error) {
      this.log(`Error cleaning up all cache: ${error.message}`);
      return 0;
    }
  }
  
  // 获取系统状态
  getStatus() {
    try {
      const cacheFiles = fs.readdirSync(this.config.cacheDir).filter(f => f.endsWith('.json'));
      const exchangeFiles = fs.readdirSync(this.config.exchangeDir).filter(f => f.endsWith('.json'));
      
      return {
        cacheItems: cacheFiles.length,
        exchangeItems: exchangeFiles.length,
        lastCleanup: Date.now(),
        cacheExpiry: this.config.cacheExpiry,
        directories: {
          cache: this.config.cacheDir,
          exchange: this.config.exchangeDir
        }
      };
    } catch (error) {
      this.log(`Error getting status: ${error.message}`);
      return {
        error: error.message
      };
    }
  }
}

// 导出模块
module.exports = HotInfoCacheIntegration;

// 导出默认实例
module.exports.default = new HotInfoCacheIntegration();
