const fs = require('fs');
const path = require('path');

class MemoryContinuity {
  constructor(options = {}) {
    this.options = {
      memoryDir: path.join(process.cwd(), 'memory'),
      recentEventsFile: path.join(process.cwd(), 'RECENT_EVENTS.md'),
      memoryFile: path.join(process.cwd(), 'MEMORY.md'),
      maxRecentEventsAge: 24 * 60 * 60 * 1000, // 24 hours
      ...options
    };
    
    this.ensureDirectories();
  }

  // 确保目录存在
  ensureDirectories() {
    if (!fs.existsSync(this.options.memoryDir)) {
      fs.mkdirSync(this.options.memoryDir, { recursive: true });
    }
    
    // 创建必要的文件
    this.ensureFile(this.options.recentEventsFile);
    this.ensureFile(this.options.memoryFile);
  }

  // 确保文件存在
  ensureFile(filePath) {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, '', 'utf8');
    }
  }

  // 获取今日内存文件路径
  getTodayMemoryFile() {
    const today = new Date().toISOString().split('T')[0];
    return path.join(this.options.memoryDir, `${today}.md`);
  }

  // 加载所有内存
  async loadMemory() {
    const memory = {
      recentEvents: this.loadRecentEvents(),
      dailyMemory: this.loadDailyMemory(),
      longTermMemory: this.loadLongTermMemory(),
      timestamp: new Date().toISOString()
    };
    
    return memory;
  }

  // 加载最近事件
  loadRecentEvents() {
    try {
      const content = fs.readFileSync(this.options.recentEventsFile, 'utf8');
      const events = content.split('\n\n').filter(event => event.trim());
      
      // 过滤掉超过24小时的事件
      const now = Date.now();
      const recentEvents = events.filter(event => {
        const match = event.match(/^\[([^\]]+)\]/);
        if (match) {
          const eventTime = new Date(match[1]).getTime();
          return (now - eventTime) <= this.options.maxRecentEventsAge;
        }
        return true;
      });
      
      return recentEvents.join('\n\n');
    } catch (error) {
      console.error('Error loading recent events:', error);
      return '';
    }
  }

  // 加载今日内存
  loadDailyMemory() {
    try {
      const todayFile = this.getTodayMemoryFile();
      this.ensureFile(todayFile);
      return fs.readFileSync(todayFile, 'utf8');
    } catch (error) {
      console.error('Error loading daily memory:', error);
      return '';
    }
  }

  // 加载长期内存
  loadLongTermMemory() {
    try {
      return fs.readFileSync(this.options.memoryFile, 'utf8');
    } catch (error) {
      console.error('Error loading long-term memory:', error);
      return '';
    }
  }

  // 保存事件到最近事件
  saveEvent(event) {
    try {
      const timestamp = new Date().toISOString();
      const formattedEvent = `[${timestamp}]\n${event}`;
      
      const currentContent = fs.readFileSync(this.options.recentEventsFile, 'utf8');
      const newContent = `${formattedEvent}\n\n${currentContent}`;
      
      fs.writeFileSync(this.options.recentEventsFile, newContent, 'utf8');
      
      // 清理旧事件
      this.cleanupOldEvents();
    } catch (error) {
      console.error('Error saving event:', error);
    }
  }

  // 清理旧事件
  cleanupOldEvents() {
    try {
      const content = fs.readFileSync(this.options.recentEventsFile, 'utf8');
      const events = content.split('\n\n').filter(event => event.trim());
      
      const now = Date.now();
      const recentEvents = events.filter(event => {
        const match = event.match(/^\[([^\]]+)\]/);
        if (match) {
          const eventTime = new Date(match[1]).getTime();
          return (now - eventTime) <= this.options.maxRecentEventsAge;
        }
        return true;
      });
      
      fs.writeFileSync(this.options.recentEventsFile, recentEvents.join('\n\n'), 'utf8');
    } catch (error) {
      console.error('Error cleaning up old events:', error);
    }
  }

  // 保存到今日内存
  saveToDailyMemory(content) {
    try {
      const todayFile = this.getTodayMemoryFile();
      const timestamp = new Date().toISOString();
      const formattedContent = `[${timestamp}]\n${content}\n\n`;
      
      fs.appendFileSync(todayFile, formattedContent, 'utf8');
    } catch (error) {
      console.error('Error saving to daily memory:', error);
    }
  }

  // 保存到长期内存
  saveToLongTermMemory(content) {
    try {
      const timestamp = new Date().toISOString();
      const formattedContent = `[${timestamp}]\n${content}\n\n`;
      
      fs.appendFileSync(this.options.memoryFile, formattedContent, 'utf8');
    } catch (error) {
      console.error('Error saving to long-term memory:', error);
    }
  }

  // 保存重要事件到所有内存
  saveSignificantEvent(event, isLongTerm = false) {
    this.saveEvent(event);
    this.saveToDailyMemory(event);
    
    if (isLongTerm) {
      this.saveToLongTermMemory(event);
    }
  }

  // 获取内存统计
  getMemoryStats() {
    try {
      const recentEventsSize = fs.statSync(this.options.recentEventsFile).size;
      const longTermMemorySize = fs.statSync(this.options.memoryFile).size;
      
      const todayFile = this.getTodayMemoryFile();
      const dailyMemorySize = fs.existsSync(todayFile) 
        ? fs.statSync(todayFile).size 
        : 0;
      
      const memoryFiles = fs.readdirSync(this.options.memoryDir).filter(file => file.endsWith('.md'));
      
      return {
        recentEventsSize,
        dailyMemorySize,
        longTermMemorySize,
        totalMemoryFiles: memoryFiles.length,
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error getting memory stats:', error);
      return {};
    }
  }

  // 搜索内存
  searchMemory(query, options = {}) {
    const {
      limit = 10,
      sources = ['recent', 'daily', 'longTerm']
    } = options;
    
    const results = [];
    const searchTerm = query.toLowerCase();
    
    // 搜索最近事件
    if (sources.includes('recent')) {
      const recentEvents = this.loadRecentEvents();
      const recentMatches = this.searchContent(recentEvents, searchTerm, 'recent');
      results.push(...recentMatches);
    }
    
    // 搜索今日内存
    if (sources.includes('daily')) {
      const dailyMemory = this.loadDailyMemory();
      const dailyMatches = this.searchContent(dailyMemory, searchTerm, 'daily');
      results.push(...dailyMatches);
    }
    
    // 搜索长期内存
    if (sources.includes('longTerm')) {
      const longTermMemory = this.loadLongTermMemory();
      const longTermMatches = this.searchContent(longTermMemory, searchTerm, 'longTerm');
      results.push(...longTermMatches);
    }
    
    // 按相关性排序并限制结果
    return results
      .sort((a, b) => b.relevance - a.relevance)
      .slice(0, limit);
  }

  // 搜索内容
  searchContent(content, searchTerm, source) {
    const results = [];
    const lines = content.split('\n');
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.toLowerCase().includes(searchTerm)) {
        // 获取上下文
        const start = Math.max(0, i - 2);
        const end = Math.min(lines.length, i + 3);
        const context = lines.slice(start, end).join('\n');
        
        // 计算相关性
        const relevance = (line.toLowerCase().match(new RegExp(searchTerm, 'g')) || []).length;
        
        results.push({
          source,
          line: i + 1,
          content: line,
          context,
          relevance,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    return results;
  }
}

// 导出单例
module.exports = new MemoryContinuity();
module.exports.MemoryContinuity = MemoryContinuity;
