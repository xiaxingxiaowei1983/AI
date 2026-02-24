/**
 * Context Logging 工具
 * 用于记录智能体与用户的交互上下文，支持不同人格的日志管理
 */

const fs = require('fs');
const path = require('path');

class ContextLogger {
  constructor() {
    this.logDir = path.join(__dirname, '../../logs');
    this.archiveDir = path.join(__dirname, '../../logs/archive');
    this.personaMap = {
      'zhy': 'Catgirl',
      'fmw': 'Big Brother',
      'Imx': 'Mesugaki'
    };
    this._initialize();
    // 初始化缓存
    this.cache = new Map();
    this.cacheSize = 1000;
    // 初始化统计信息
    this.stats = {
      logCount: 0,
      lastCleanup: Date.now()
    };
  }

  // 初始化日志目录
  _initialize() {
    if (!fs.existsSync(this.logDir)) {
      fs.mkdirSync(this.logDir, { recursive: true });
    }

    if (!fs.existsSync(this.archiveDir)) {
      fs.mkdirSync(this.archiveDir, { recursive: true });
    }

    // 为每个人格创建日志目录
    for (const personaKey in this.personaMap) {
      const personaDir = path.join(this.logDir, personaKey);
      if (!fs.existsSync(personaDir)) {
        fs.mkdirSync(personaDir, { recursive: true });
      }
    }
  }

  // 获取今天的日志文件路径
  _getLogFilePath(personaKey) {
    const today = new Date();
    const dateStr = today.toISOString().split('T')[0];
    return path.join(this.logDir, personaKey, `${dateStr}.json`);
  }

  // 读取现有日志
  _readLogs(personaKey) {
    const logFilePath = this._getLogFilePath(personaKey);
    try {
      if (fs.existsSync(logFilePath)) {
        const data = fs.readFileSync(logFilePath, 'utf8');
        return JSON.parse(data);
      }
    } catch (error) {
      console.error('读取日志文件失败:', error);
    }
    return [];
  }

  // 写入日志
  _writeLogs(personaKey, logs) {
    const logFilePath = this._getLogFilePath(personaKey);
    try {
      fs.writeFileSync(logFilePath, JSON.stringify(logs, null, 2), 'utf8');
      return true;
    } catch (error) {
      console.error('写入日志文件失败:', error);
      return false;
    }
  }

  // 记录交互
  logInteraction(personaKey, interaction) {
    // 验证参数
    if (!personaKey || !this.personaMap[personaKey]) {
      throw new Error('无效的人格标识符');
    }

    if (!interaction || typeof interaction !== 'object') {
      throw new Error('交互数据必须是对象');
    }

    // 构建日志条目
    const logEntry = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      persona: this.personaMap[personaKey],
      personaKey,
      ...interaction,
      metadata: {
        timestamp: new Date().toISOString(),
        version: '2.0.0',
        // 自动分类
        category: this._categorizeInteraction(interaction),
        // 情绪分析（简单实现）
        sentiment: this._analyzeSentiment(interaction)
      }
    };

    // 缓存日志条目
    this._cacheLog(logEntry);

    // 读取现有日志
    const existingLogs = this._readLogs(personaKey);

    // 添加新日志
    existingLogs.push(logEntry);

    // 限制日志文件大小（保留最近1000条）
    const maxLogs = 1000;
    const logsToKeep = existingLogs.slice(-maxLogs);

    // 检查是否需要归档
    if (existingLogs.length > maxLogs) {
      this._archiveOldLogs(personaKey, existingLogs.slice(0, existingLogs.length - maxLogs));
    }

    // 写入日志
    const success = this._writeLogs(personaKey, logsToKeep);

    // 更新统计信息
    this.stats.logCount++;

    // 定期清理
    this._checkCleanup();

    return {
      success,
      logId: logEntry.id,
      timestamp: logEntry.timestamp,
      persona: logEntry.persona,
      category: logEntry.metadata.category,
      sentiment: logEntry.metadata.sentiment
    };
  }
  
  // 缓存日志
  _cacheLog(logEntry) {
    const cacheKey = logEntry.id;
    if (this.cache.size >= this.cacheSize) {
      // 移除最早的缓存项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(cacheKey, logEntry);
  }
  
  // 自动分类交互
  _categorizeInteraction(interaction) {
    const categories = [
      { name: '日常对话', keywords: ['你好', '谢谢', '再见', '天气', '时间'] },
      { name: '技术讨论', keywords: ['代码', '编程', '技术', '系统', '架构'] },
      { name: '业务分析', keywords: ['市场', '销售', '业务', '客户', '分析'] },
      { name: '个人成长', keywords: ['学习', '成长', '目标', '计划', '发展'] },
      { name: '系统管理', keywords: ['配置', '管理', '设置', '优化', '监控'] },
      { name: '知识管理', keywords: ['记忆', '搜索', '信息', '数据', '存储'] }
    ];

    const text = JSON.stringify(interaction).toLowerCase();
    
    for (const category of categories) {
      for (const keyword of category.keywords) {
        if (text.includes(keyword.toLowerCase())) {
          return category.name;
        }
      }
    }

    return '未分类';
  }
  
  // 简单情绪分析
  _analyzeSentiment(interaction) {
    const positiveKeywords = ['好', '棒', '优秀', '谢谢', '喜欢', '开心', '高兴'];
    const negativeKeywords = ['不好', '差', '失败', '错误', '讨厌', '难过', '生气'];

    const text = JSON.stringify(interaction).toLowerCase();
    let positiveCount = 0;
    let negativeCount = 0;

    for (const keyword of positiveKeywords) {
      if (text.includes(keyword)) positiveCount++;
    }

    for (const keyword of negativeKeywords) {
      if (text.includes(keyword)) negativeCount++;
    }

    if (positiveCount > negativeCount) return 'positive';
    if (negativeCount > positiveCount) return 'negative';
    return 'neutral';
  }
  
  // 归档旧日志
  _archiveOldLogs(personaKey, oldLogs) {
    try {
      const archivePath = path.join(this.archiveDir, personaKey);
      if (!fs.existsSync(archivePath)) {
        fs.mkdirSync(archivePath, { recursive: true });
      }

      const archiveFile = path.join(archivePath, `archive_${Date.now()}.json`);
      fs.writeFileSync(archiveFile, JSON.stringify(oldLogs, null, 2), 'utf8');
      
      console.log(`已归档 ${oldLogs.length} 条旧日志到 ${archiveFile}`);
    } catch (error) {
      console.error('归档旧日志失败:', error);
    }
  }
  
  // 检查清理
  _checkCleanup() {
    const now = Date.now();
    const cleanupInterval = 24 * 60 * 60 * 1000; // 24小时

    if (now - this.stats.lastCleanup > cleanupInterval) {
      this.cleanupOldLogs();
      this.stats.lastCleanup = now;
    }
  }

  // 批量记录交互
  logBatchInteractions(personaKey, interactions) {
    if (!Array.isArray(interactions)) {
      throw new Error('交互数据必须是数组');
    }

    const results = [];
    for (const interaction of interactions) {
      try {
        const result = this.logInteraction(personaKey, interaction);
        results.push(result);
      } catch (error) {
        results.push({ success: false, error: error.message });
      }
    }

    return {
      success: results.every(r => r.success),
      results
    };
  }

  // 读取指定时间范围的日志
  readLogs(personaKey, startTime = null, endTime = null) {
    if (!personaKey || !this.personaMap[personaKey]) {
      throw new Error('无效的人格标识符');
    }

    const logs = this._readLogs(personaKey);

    // 过滤时间范围
    if (startTime || endTime) {
      return logs.filter(log => {
        const logTime = log.timestamp;
        const afterStart = !startTime || logTime >= startTime;
        const beforeEnd = !endTime || logTime <= endTime;
        return afterStart && beforeEnd;
      });
    }

    return logs;
  }

  // 搜索日志
  searchLogs(personaKey, searchTerm, limit = 50) {
    if (!personaKey || !this.personaMap[personaKey]) {
      throw new Error('无效的人格标识符');
    }

    if (!searchTerm || typeof searchTerm !== 'string') {
      throw new Error('搜索词必须是字符串');
    }

    const logs = this._readLogs(personaKey);
    const searchLower = searchTerm.toLowerCase();

    // 搜索包含关键词的日志
    const results = logs.filter(log => {
      const logStr = JSON.stringify(log).toLowerCase();
      return logStr.includes(searchLower);
    });

    // 按时间倒序排列并限制数量
    return results
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  }

  // 获取日志统计信息
  getLogStats(personaKey) {
    if (!personaKey || !this.personaMap[personaKey]) {
      throw new Error('无效的人格标识符');
    }

    const logs = this._readLogs(personaKey);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTimestamp = today.getTime();

    // 统计今日日志
    const todayLogs = logs.filter(log => log.timestamp >= todayTimestamp);

    // 统计总日志数
    const totalLogs = logs.length;

    // 统计最近7天的日志
    const sevenDaysAgo = todayTimestamp - (7 * 24 * 60 * 60 * 1000);
    const sevenDaysLogs = logs.filter(log => log.timestamp >= sevenDaysAgo);

    return {
      persona: this.personaMap[personaKey],
      totalLogs,
      todayLogs: todayLogs.length,
      sevenDaysLogs: sevenDaysLogs.length,
      oldestLog: logs.length > 0 ? logs[0].timestamp : null,
      newestLog: logs.length > 0 ? logs[logs.length - 1].timestamp : null
    };
  }

  // 清理旧日志（保留最近30天）
  cleanupOldLogs(personaKey = null) {
    const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
    const personaKeys = personaKey ? [personaKey] : Object.keys(this.personaMap);

    let cleanedCount = 0;

    for (const key of personaKeys) {
      const logs = this._readLogs(key);
      const recentLogs = logs.filter(log => log.timestamp >= thirtyDaysAgo);

      if (recentLogs.length < logs.length) {
        this._writeLogs(key, recentLogs);
        cleanedCount += logs.length - recentLogs.length;
      }
    }

    return {
      success: true,
      cleanedCount
    };
  }

  // 导出日志
  exportLogs(personaKey, format = 'json') {
    if (!personaKey || !this.personaMap[personaKey]) {
      throw new Error('无效的人格标识符');
    }

    const logs = this._readLogs(personaKey);

    if (format === 'json') {
      return JSON.stringify(logs, null, 2);
    } else if (format === 'csv') {
      // 简单的CSV导出
      if (logs.length === 0) return '';

      const headers = Object.keys(logs[0]);
      const csvHeaders = headers.join(',');
      const csvRows = logs.map(log => {
        return headers.map(header => {
          const value = log[header];
          if (typeof value === 'object') {
            return `"${JSON.stringify(value).replace(/"/g, '""')}"`;
          }
          return `"${String(value).replace(/"/g, '""')}"`;
        }).join(',');
      });

      return [csvHeaders, ...csvRows].join('\n');
    }

    throw new Error('不支持的导出格式');
  }

  // 删除指定日志
  deleteLogs(personaKey, logIds) {
    if (!personaKey || !this.personaMap[personaKey]) {
      throw new Error('无效的人格标识符');
    }

    if (!Array.isArray(logIds)) {
      throw new Error('日志ID必须是数组');
    }

    const logs = this._readLogs(personaKey);
    const logIdSet = new Set(logIds);
    const remainingLogs = logs.filter(log => !logIdSet.has(log.id));

    const deletedCount = logs.length - remainingLogs.length;
    this._writeLogs(personaKey, remainingLogs);

    return {
      success: true,
      deletedCount
    };
  }

  // 检查日志存储状态
  getStorageStatus() {
    const status = {};
    let totalSize = 0;

    for (const personaKey in this.personaMap) {
      const personaDir = path.join(this.logDir, personaKey);
      if (fs.existsSync(personaDir)) {
        const files = fs.readdirSync(personaDir);
        let personaSize = 0;

        for (const file of files) {
          const filePath = path.join(personaDir, file);
          const stats = fs.statSync(filePath);
          personaSize += stats.size;
        }

        status[personaKey] = {
          files: files.length,
          size: personaSize,
          sizeFormatted: this._formatSize(personaSize)
        };

        totalSize += personaSize;
      }
    }

    return {
      totalSize,
      totalSizeFormatted: this._formatSize(totalSize),
      personas: status
    };
  }

  // 格式化文件大小
  _formatSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }
}

// 导出单例实例
const contextLogger = new ContextLogger();

module.exports = {
  ContextLogger,
  contextLogger,
  // 工具接口
  logInteraction: (persona, interaction) => {
    return contextLogger.logInteraction(persona, interaction);
  },
  logBatchInteractions: (persona, interactions) => {
    return contextLogger.logBatchInteractions(persona, interactions);
  },
  readLogs: (persona, startTime, endTime) => {
    return contextLogger.readLogs(persona, startTime, endTime);
  },
  searchLogs: (persona, searchTerm, limit) => {
    return contextLogger.searchLogs(persona, searchTerm, limit);
  },
  getLogStats: (persona) => {
    return contextLogger.getLogStats(persona);
  },
  cleanupOldLogs: (persona) => {
    return contextLogger.cleanupOldLogs(persona);
  },
  exportLogs: (persona, format) => {
    return contextLogger.exportLogs(persona, format);
  },
  deleteLogs: (persona, logIds) => {
    return contextLogger.deleteLogs(persona, logIds);
  },
  getStorageStatus: () => {
    return contextLogger.getStorageStatus();
  }
};

// 示例用法
if (require.main === module) {
  const logger = contextLogger;

  // 记录交互
  const result = logger.logInteraction('zhy', {
    userInput: '你好，今天天气怎么样？',
    agentResponse: '今天天气晴朗，适合出去走走哦！',
    intent: 'weather_inquiry',
    sentiment: 'positive'
  });

  console.log('Log result:', result);

  // 读取日志
  const logs = logger.readLogs('zhy');
  console.log('Recent logs:', logs.length);

  // 获取统计信息
  const stats = logger.getLogStats('zhy');
  console.log('Log stats:', stats);

  // 获取存储状态
  const storage = logger.getStorageStatus();
  console.log('Storage status:', storage);
}
