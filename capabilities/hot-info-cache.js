/**
 * 热点信息缓存系统
 * 用于缓存高频访问的信息，提高查询响应速度
 * 解决1秒内响应所有查询请求的瓶颈问题
 */

class HotInfoCache {
  constructor(options = {}) {
    this.cache = new Map();
    this.options = {
      maxSize: options.maxSize || 1000,
      defaultTtl: options.defaultTtl || 3600000, // 默认1小时
      cleanupInterval: options.cleanupInterval || 600000, // 默认10分钟
      ...options
    };
    this.stats = {
      hits: 0,
      misses: 0,
      sets: 0,
      deletes: 0,
      size: 0
    };
    this.hotItems = new Map(); // 用于跟踪访问频率
    
    // 启动定期清理
    this.startCleanupTimer();
    
    console.log('🔥 热点信息缓存系统初始化完成');
    console.log(`配置: 最大容量=${this.options.maxSize}, 默认TTL=${this.options.defaultTtl}ms`);
  }
  
  /**
   * 设置缓存项
   */
  set(key, value, options = {}) {
    const ttl = options.ttl || this.options.defaultTtl;
    const expiry = Date.now() + ttl;
    
    this.cache.set(key, {
      value,
      expiry,
      createdAt: Date.now(),
      lastAccessed: Date.now()
    });
    
    // 更新访问频率
    this.updateHotItem(key);
    
    // 维护缓存大小
    this.maintainSize();
    
    // 更新统计信息
    this.stats.sets++;
    this.stats.size = this.cache.size;
    
    console.log(`🔄 缓存设置: ${key}`);
    return value;
  }
  
  /**
   * 获取缓存项
   */
  get(key) {
    const item = this.cache.get(key);
    
    if (!item) {
      this.stats.misses++;
      console.log(`❌ 缓存未命中: ${key}`);
      return undefined;
    }
    
    // 检查是否过期
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      this.hotItems.delete(key);
      this.stats.misses++;
      this.stats.size = this.cache.size;
      console.log(`⏰ 缓存过期: ${key}`);
      return undefined;
    }
    
    // 更新最后访问时间
    item.lastAccessed = Date.now();
    this.cache.set(key, item);
    
    // 更新访问频率
    this.updateHotItem(key);
    
    // 更新统计信息
    this.stats.hits++;
    console.log(`✅ 缓存命中: ${key}`);
    return item.value;
  }
  
  /**
   * 删除缓存项
   */
  delete(key) {
    const deleted = this.cache.delete(key);
    this.hotItems.delete(key);
    
    if (deleted) {
      this.stats.deletes++;
      this.stats.size = this.cache.size;
      console.log(`🗑️ 缓存删除: ${key}`);
    }
    
    return deleted;
  }
  
  /**
   * 清除所有缓存
   */
  clear() {
    const size = this.cache.size;
    this.cache.clear();
    this.hotItems.clear();
    this.stats.size = 0;
    console.log(`🧹 缓存清空: ${size} 项`);
  }
  
  /**
   * 检查缓存项是否存在
   */
  has(key) {
    const item = this.cache.get(key);
    if (!item) return false;
    
    // 检查是否过期
    if (Date.now() > item.expiry) {
      this.cache.delete(key);
      this.hotItems.delete(key);
      this.stats.size = this.cache.size;
      return false;
    }
    
    return true;
  }
  
  /**
   * 获取缓存大小
   */
  size() {
    return this.cache.size;
  }
  
  /**
   * 更新热点项目
   */
  updateHotItem(key) {
    const count = this.hotItems.get(key) || 0;
    this.hotItems.set(key, count + 1);
    
    // 限制热点项目数量
    if (this.hotItems.size > this.options.maxSize) {
      this.trimHotItems();
    }
  }
  
  /**
   * 修剪热点项目
   */
  trimHotItems() {
    const items = Array.from(this.hotItems.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, this.options.maxSize);
    
    this.hotItems.clear();
    items.forEach(([key, count]) => {
      this.hotItems.set(key, count);
    });
  }
  
  /**
   * 维护缓存大小
   */
  maintainSize() {
    if (this.cache.size > this.options.maxSize) {
      // 按访问频率和过期时间排序，删除最不常用的项目
      const items = Array.from(this.cache.entries())
        .map(([key, item]) => ({
          key,
          item,
          hotness: this.hotItems.get(key) || 0
        }))
        .sort((a, b) => {
          // 先按热点程度排序，再按最后访问时间排序
          if (b.hotness !== a.hotness) {
            return b.hotness - a.hotness;
          }
          return b.item.lastAccessed - a.item.lastAccessed;
        });
      
      // 删除超出容量的项目
      const toDelete = items.slice(this.options.maxSize);
      toDelete.forEach(({ key }) => {
        this.cache.delete(key);
        this.hotItems.delete(key);
      });
      
      this.stats.size = this.cache.size;
      console.log(`📏 缓存容量维护: 删除了 ${toDelete.length} 项`);
    }
  }
  
  /**
   * 清理过期项
   */
  cleanup() {
    const now = Date.now();
    let deleted = 0;
    
    for (const [key, item] of this.cache.entries()) {
      if (now > item.expiry) {
        this.cache.delete(key);
        this.hotItems.delete(key);
        deleted++;
      }
    }
    
    if (deleted > 0) {
      this.stats.size = this.cache.size;
      console.log(`🧹 缓存清理: 删除了 ${deleted} 个过期项`);
    }
  }
  
  /**
   * 启动清理定时器
   */
  startCleanupTimer() {
    setInterval(() => {
      this.cleanup();
    }, this.options.cleanupInterval);
  }
  
  /**
   * 获取热点项目
   */
  getHotItems(limit = 10) {
    return Array.from(this.hotItems.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([key, count]) => ({
        key,
        accessCount: count,
        value: this.cache.get(key)?.value
      }));
  }
  
  /**
   * 获取统计信息
   */
  getStats() {
    return {
      ...this.stats,
      size: this.cache.size,
      hotItems: this.hotItems.size,
      hitRate: this.calculateHitRate()
    };
  }
  
  /**
   * 计算命中率
   */
  calculateHitRate() {
    const total = this.stats.hits + this.stats.misses;
    return total > 0 ? (this.stats.hits / total * 100).toFixed(2) : 0;
  }
  
  /**
   * 预加载数据
   */
  preload(data) {
    if (Array.isArray(data)) {
      data.forEach(item => {
        if (item.key && item.value) {
          this.set(item.key, item.value, item.options);
        }
      });
    } else if (typeof data === 'object' && data !== null) {
      Object.entries(data).forEach(([key, value]) => {
        this.set(key, value);
      });
    }
    console.log(`🚀 预加载数据完成: ${Array.isArray(data) ? data.length : Object.keys(data).length} 项`);
  }
  
  /**
   * 批量获取
   */
  getBatch(keys) {
    const results = {};
    keys.forEach(key => {
      results[key] = this.get(key);
    });
    return results;
  }
  
  /**
   * 批量设置
   */
  setBatch(data) {
    Object.entries(data).forEach(([key, value]) => {
      this.set(key, value);
    });
    console.log(`📦 批量设置完成: ${Object.keys(data).length} 项`);
  }
  
  /**
   * 与PCEC系统集成
   */
  integrateWithPCEC(pcecSystem) {
    if (!pcecSystem) {
      console.error('PCEC系统未提供');
      return false;
    }
    
    console.log('🔗 将热点信息缓存与PCEC系统集成...');
    
    // 为PCEC系统添加缓存访问方法
    pcecSystem.getHotInfoCache = () => this;
    pcecSystem.cacheHotInfo = (key, value, options) => this.set(key, value, options);
    pcecSystem.getHotInfo = (key) => this.get(key);
    pcecSystem.getCacheStats = () => this.getStats();
    
    console.log('✅ 热点信息缓存与PCEC系统集成成功');
    return true;
  }
  
  /**
   * 与智能体系统集成
   */
  integrateWithAgentSystem(agentSystem) {
    if (!agentSystem) {
      console.error('智能体系统未提供');
      return false;
    }
    
    console.log('🤖 将热点信息缓存与智能体系统集成...');
    
    // 为智能体系统添加缓存访问方法
    agentSystem.getHotInfoCache = () => this;
    agentSystem.cache = (key, value, options) => this.set(key, value, options);
    agentSystem.getCached = (key) => this.get(key);
    agentSystem.getCacheStats = () => this.getStats();
    
    // 覆盖默认的信息获取方法
    if (agentSystem.getInfo) {
      const originalGetInfo = agentSystem.getInfo;
      agentSystem.getInfo = async (key, options = {}) => {
        // 先从缓存获取
        const cachedValue = this.get(key);
        if (cachedValue !== undefined) {
          return cachedValue;
        }
        
        // 缓存未命中，调用原始方法
        const value = await originalGetInfo(key, options);
        
        // 将结果存入缓存
        if (value !== undefined && options.cache !== false) {
          this.set(key, value, { ttl: options.ttl });
        }
        
        return value;
      };
    }
    
    console.log('✅ 热点信息缓存与智能体系统集成成功');
    return true;
  }
}

// 导出单例
const hotInfoCache = new HotInfoCache();

// 预加载一些常见的热点信息
function preloadCommonInfo() {
  const commonInfo = {
    'system:status': 'active',
    'system:version': '1.0.0',
    'system:name': '智能助手',
    'system:uptime': Date.now(),
    'system:capabilities': ['chat', 'task', 'knowledge', 'tools'],
    'config:maxSize': hotInfoCache.options.maxSize,
    'config:defaultTtl': hotInfoCache.options.defaultTtl
  };
  
  hotInfoCache.preload(commonInfo);
}

// 执行预加载
preloadCommonInfo();

// 导出模块
module.exports = {
  HotInfoCache,
  hotInfoCache
};

// 测试
if (require.main === module) {
  console.log('🧪 测试热点信息缓存系统');
  
  // 测试基本功能
  hotInfoCache.set('test:key', 'test:value');
  console.log('获取测试值:', hotInfoCache.get('test:key'));
  
  // 测试缓存命中和未命中
  console.log('获取不存在的键:', hotInfoCache.get('non:existent:key'));
  
  // 测试统计信息
  console.log('统计信息:', hotInfoCache.getStats());
  
  // 测试热点项目
  for (let i = 0; i < 10; i++) {
    hotInfoCache.get('test:key');
  }
  console.log('热点项目:', hotInfoCache.getHotItems(5));
  
  console.log('✅ 测试完成');
}
