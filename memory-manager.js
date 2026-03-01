const fs = require('fs');
const path = require('path');

class MemoryManager {
  constructor() {
    // 记忆存储目录
    this.memoryDir = './memory';
    this.shortTermDir = path.join(this.memoryDir, 'short-term');
    this.mediumTermDir = path.join(this.memoryDir, 'medium-term');
    this.longTermDir = path.join(this.memoryDir, 'long-term');
    
    // 初始化目录结构
    this.initDirectories();
    
    // 记忆配置
    this.config = {
      shortTermLimit: 100, // 短期记忆限制（条）
      mediumTermLimit: 500, // 中期记忆限制（条）
      longTermLimit: 1000, // 长期记忆限制（条）
      shortTermExpiry: 24 * 60 * 60 * 1000, // 短期记忆过期时间（24小时）
      mediumTermExpiry: 7 * 24 * 60 * 60 * 1000, // 中期记忆过期时间（7天）
      longTermExpiry: 30 * 24 * 60 * 60 * 1000, // 长期记忆过期时间（30天）
      memoryThreshold: 0.7, // 记忆重要性阈值
      recallThreshold: 0.5 // 回忆相似度阈值
    };
    
    // 内存中的记忆缓存
    this.memoryCache = {
      shortTerm: [],
      mediumTerm: [],
      longTerm: []
    };
    
    // 加载记忆到缓存
    this.loadMemory();
  }

  // 初始化目录结构
  initDirectories() {
    const directories = [
      this.memoryDir,
      this.shortTermDir,
      this.mediumTermDir,
      this.longTermDir
    ];
    
    for (const dir of directories) {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    }
  }

  // 加载记忆到缓存
  loadMemory() {
    this.memoryCache.shortTerm = this.loadMemoryFromDir(this.shortTermDir);
    this.memoryCache.mediumTerm = this.loadMemoryFromDir(this.mediumTermDir);
    this.memoryCache.longTerm = this.loadMemoryFromDir(this.longTermDir);
    
    console.log(`记忆加载完成: 短期 ${this.memoryCache.shortTerm.length}, 中期 ${this.memoryCache.mediumTerm.length}, 长期 ${this.memoryCache.longTerm.length}`);
  }

  // 从目录加载记忆
  loadMemoryFromDir(dir) {
    const memories = [];
    
    try {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(dir, file);
          try {
            const memory = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            memories.push(memory);
          } catch (error) {
            console.error(`加载记忆文件失败: ${filePath}`, error);
          }
        }
      }
    } catch (error) {
      console.error(`读取记忆目录失败: ${dir}`, error);
    }
    
    // 按时间排序，最新的在前
    return memories.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  }

  // 保存记忆到文件
  saveMemory(memory, directory) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `memory-${timestamp}.json`;
    const filePath = path.join(directory, fileName);
    
    try {
      fs.writeFileSync(filePath, JSON.stringify(memory, null, 2));
      return true;
    } catch (error) {
      console.error(`保存记忆失败: ${filePath}`, error);
      return false;
    }
  }

  // 添加记忆
  addMemory(content, importance = 0.5, context = {}) {
    const memory = {
      id: `mem-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      content: content,
      importance: importance,
      context: context,
      timestamp: new Date().toISOString(),
      accessCount: 1,
      lastAccess: new Date().toISOString()
    };
    
    // 根据重要性决定记忆层级
    if (importance >= this.config.memoryThreshold) {
      // 长期记忆
      this.memoryCache.longTerm.unshift(memory);
      this.saveMemory(memory, this.longTermDir);
      this.trimMemory('longTerm');
    } else if (importance >= this.config.memoryThreshold * 0.7) {
      // 中期记忆
      this.memoryCache.mediumTerm.unshift(memory);
      this.saveMemory(memory, this.mediumTermDir);
      this.trimMemory('mediumTerm');
    } else {
      // 短期记忆
      this.memoryCache.shortTerm.unshift(memory);
      this.saveMemory(memory, this.shortTermDir);
      this.trimMemory('shortTerm');
    }
    
    return memory.id;
  }

  // 修剪记忆，保持在限制范围内
  trimMemory(memoryType) {
    const limit = this.config[`${memoryType}Limit`];
    const cache = this.memoryCache[memoryType];
    const dir = this[`${memoryType}Dir`];
    
    if (cache.length > limit) {
      const toRemove = cache.splice(limit);
      
      // 删除超出限制的记忆文件
      for (const memory of toRemove) {
        const files = fs.readdirSync(dir);
        for (const file of files) {
          if (file.includes(memory.id)) {
            try {
              fs.unlinkSync(path.join(dir, file));
            } catch (error) {
              console.error(`删除记忆文件失败: ${file}`, error);
            }
          }
        }
      }
    }
  }

  // 搜索记忆
  searchMemory(query, limit = 10) {
    const results = [];
    
    // 搜索所有层级的记忆
    const allMemories = [
      ...this.memoryCache.shortTerm,
      ...this.memoryCache.mediumTerm,
      ...this.memoryCache.longTerm
    ];
    
    for (const memory of allMemories) {
      const similarity = this.calculateSimilarity(query, memory.content);
      if (similarity >= this.config.recallThreshold) {
        results.push({
          memory: memory,
          similarity: similarity
        });
      }
    }
    
    // 按相似度排序
    results.sort((a, b) => b.similarity - a.similarity);
    
    // 更新访问计数
    for (const result of results.slice(0, limit)) {
      result.memory.accessCount++;
      result.memory.lastAccess = new Date().toISOString();
    }
    
    return results.slice(0, limit).map(r => r.memory);
  }

  // 计算文本相似度
  calculateSimilarity(text1, text2) {
    const words1 = this.tokenize(text1);
    const words2 = this.tokenize(text2);
    
    const intersection = new Set([...words1].filter(word => words2.has(word)));
    const union = new Set([...words1, ...words2]);
    
    return union.size > 0 ? intersection.size / union.size : 0;
  }

  // 文本分词
  tokenize(text) {
    return new Set(
      text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, ' ')
        .split(' ')
        .filter(word => word.length > 1)
    );
  }

  // 获取记忆
  getMemory(memoryId) {
    const allMemories = [
      ...this.memoryCache.shortTerm,
      ...this.memoryCache.mediumTerm,
      ...this.memoryCache.longTerm
    ];
    
    const memory = allMemories.find(m => m.id === memoryId);
    if (memory) {
      // 更新访问计数
      memory.accessCount++;
      memory.lastAccess = new Date().toISOString();
    }
    
    return memory;
  }

  // 更新记忆
  updateMemory(memoryId, updates) {
    const allMemories = [
      ...this.memoryCache.shortTerm,
      ...this.memoryCache.mediumTerm,
      ...this.memoryCache.longTerm
    ];
    
    const memory = allMemories.find(m => m.id === memoryId);
    if (memory) {
      Object.assign(memory, updates);
      memory.lastAccess = new Date().toISOString();
      
      // 重新保存记忆
      let directory;
      if (memory.importance >= this.config.memoryThreshold) {
        directory = this.longTermDir;
      } else if (memory.importance >= this.config.memoryThreshold * 0.7) {
        directory = this.mediumTermDir;
      } else {
        directory = this.shortTermDir;
      }
      
      this.saveMemory(memory, directory);
      return true;
    }
    
    return false;
  }

  // 删除记忆
  deleteMemory(memoryId) {
    // 从缓存中删除
    for (const type of ['shortTerm', 'mediumTerm', 'longTerm']) {
      const index = this.memoryCache[type].findIndex(m => m.id === memoryId);
      if (index !== -1) {
        this.memoryCache[type].splice(index, 1);
        
        // 从文件系统中删除
        const dir = this[`${type}Dir`];
        const files = fs.readdirSync(dir);
        for (const file of files) {
          if (file.includes(memoryId)) {
            try {
              fs.unlinkSync(path.join(dir, file));
            } catch (error) {
              console.error(`删除记忆文件失败: ${file}`, error);
            }
          }
        }
        
        return true;
      }
    }
    
    return false;
  }

  // 清理过期记忆
  cleanupExpiredMemory() {
    const now = Date.now();
    let deleted = 0;
    
    for (const type of ['shortTerm', 'mediumTerm', 'longTerm']) {
      const expiry = this.config[`${type}Expiry`];
      const cache = this.memoryCache[type];
      const dir = this[`${type}Dir`];
      
      const toDelete = [];
      
      for (const memory of cache) {
        const memoryTime = new Date(memory.timestamp).getTime();
        if (now - memoryTime > expiry) {
          toDelete.push(memory);
        }
      }
      
      // 从缓存中删除
      for (const memory of toDelete) {
        const index = cache.findIndex(m => m.id === memory.id);
        if (index !== -1) {
          cache.splice(index, 1);
          deleted++;
        }
        
        // 从文件系统中删除
        const files = fs.readdirSync(dir);
        for (const file of files) {
          if (file.includes(memory.id)) {
            try {
              fs.unlinkSync(path.join(dir, file));
            } catch (error) {
              console.error(`删除过期记忆文件失败: ${file}`, error);
            }
          }
        }
      }
    }
    
    console.log(`清理过期记忆: 删除了 ${deleted} 条`);
    return deleted;
  }

  // 记忆统计
  getMemoryStats() {
    return {
      shortTerm: {
        count: this.memoryCache.shortTerm.length,
        limit: this.config.shortTermLimit
      },
      mediumTerm: {
        count: this.memoryCache.mediumTerm.length,
        limit: this.config.mediumTermLimit
      },
      longTerm: {
        count: this.memoryCache.longTerm.length,
        limit: this.config.longTermLimit
      },
      total: this.memoryCache.shortTerm.length + this.memoryCache.mediumTerm.length + this.memoryCache.longTerm.length
    };
  }

  // 导出记忆
  exportMemory() {
    const allMemories = {
      shortTerm: this.memoryCache.shortTerm,
      mediumTerm: this.memoryCache.mediumTerm,
      longTerm: this.memoryCache.longTerm,
      exportTime: new Date().toISOString()
    };
    
    const exportPath = path.join(this.memoryDir, `memory-export-${Date.now()}.json`);
    
    try {
      fs.writeFileSync(exportPath, JSON.stringify(allMemories, null, 2));
      return { success: true, path: exportPath };
    } catch (error) {
      console.error('导出记忆失败:', error);
      return { success: false, error: error.message };
    }
  }

  // 导入记忆
  importMemory(importPath) {
    try {
      const imported = JSON.parse(fs.readFileSync(importPath, 'utf8'));
      
      if (imported.shortTerm) {
        for (const memory of imported.shortTerm) {
          this.memoryCache.shortTerm.push(memory);
          this.saveMemory(memory, this.shortTermDir);
        }
      }
      
      if (imported.mediumTerm) {
        for (const memory of imported.mediumTerm) {
          this.memoryCache.mediumTerm.push(memory);
          this.saveMemory(memory, this.mediumTermDir);
        }
      }
      
      if (imported.longTerm) {
        for (const memory of imported.longTerm) {
          this.memoryCache.longTerm.push(memory);
          this.saveMemory(memory, this.longTermDir);
        }
      }
      
      // 修剪记忆
      this.trimMemory('shortTerm');
      this.trimMemory('mediumTerm');
      this.trimMemory('longTerm');
      
      return { success: true, imported: imported };
    } catch (error) {
      console.error('导入记忆失败:', error);
      return { success: false, error: error.message };
    }
  }
}

// 导出模块
module.exports = MemoryManager;

// 如果直接运行
if (require.main === module) {
  const manager = new MemoryManager();
  
  // 测试添加记忆
  console.log('测试添加记忆:');
  console.log('====================================');
  
  const mem1 = manager.addMemory('今天学习了人工智能基础', 0.8);
  const mem2 = manager.addMemory('明天要完成项目报告', 0.6);
  const mem3 = manager.addMemory('喝了一杯咖啡', 0.3);
  
  console.log('添加的记忆ID:', mem1, mem2, mem3);
  console.log('');
  
  // 测试搜索记忆
  console.log('测试搜索记忆:');
  console.log('====================================');
  
  const results = manager.searchMemory('人工智能');
  console.log('搜索结果:', results.map(r => ({ id: r.id, content: r.content, similarity: manager.calculateSimilarity('人工智能', r.content) })));
  console.log('');
  
  // 测试记忆统计
  console.log('测试记忆统计:');
  console.log('====================================');
  
  const stats = manager.getMemoryStats();
  console.log('记忆统计:', stats);
  console.log('');
  
  // 测试清理过期记忆
  console.log('测试清理过期记忆:');
  console.log('====================================');
  
  const deleted = manager.cleanupExpiredMemory();
  console.log('删除的过期记忆数:', deleted);
  console.log('');
  
  console.log('====================================');
  console.log('测试完成');
  console.log('====================================');
}
