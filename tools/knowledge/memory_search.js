/**
 * Memory Search 工具
 * 用于搜索和检索存储在系统中的知识，支持多维度搜索和相关性排序
 */

const fs = require('fs');
const path = require('path');

class MemorySearch {
  constructor() {
    this.memoryDir = path.join(__dirname, '../../memory');
    this.indexDir = path.join(__dirname, '../../memory/indexes');
    this._initialize();
  }

  // 初始化内存和索引目录
  _initialize() {
    if (!fs.existsSync(this.memoryDir)) {
      fs.mkdirSync(this.memoryDir, { recursive: true });
    }

    if (!fs.existsSync(this.indexDir)) {
      fs.mkdirSync(this.indexDir, { recursive: true });
    }
  }

  // 搜索内存中的知识
  search(query, options = {}) {
    const {
      scope = 'all', // 搜索范围: all, recent, specific
      limit = 10,    // 返回结果数量
      threshold = 0.3, // 相关性阈值
      sortBy = 'relevance', // 排序方式: relevance, timestamp, name
      filters = {}   // 过滤条件
    } = options;

    // 验证参数
    if (!query || typeof query !== 'string') {
      throw new Error('搜索查询必须是字符串');
    }

    const normalizedQuery = query.toLowerCase().trim();
    const results = [];

    // 搜索内存目录
    const memoryFiles = this._getMemoryFiles(scope);

    for (const filePath of memoryFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileStats = fs.statSync(filePath);
        
        // 计算相关性
        const relevance = this._calculateRelevance(content, normalizedQuery);
        
        // 检查相关性阈值
        if (relevance >= threshold) {
          // 应用过滤条件
          if (this._applyFilters(filePath, content, filters)) {
            results.push({
              id: path.basename(filePath, path.extname(filePath)),
              path: filePath,
              fileName: path.basename(filePath),
              relevance,
              timestamp: fileStats.mtime.getTime(),
              size: fileStats.size,
              // 提取摘要
              summary: this._extractSummary(content, 200),
              // 提取匹配的片段
              snippets: this._extractSnippets(content, normalizedQuery, 3)
            });
          }
        }
      } catch (error) {
        console.error(`搜索文件失败 ${filePath}:`, error);
      }
    }

    // 排序结果
    this._sortResults(results, sortBy);

    // 限制返回数量
    return results.slice(0, limit);
  }

  // 获取内存文件列表
  _getMemoryFiles(scope) {
    const files = [];
    const now = Date.now();
    const oneWeekAgo = now - (7 * 24 * 60 * 60 * 1000);

    function traverse(dir) {
      if (!fs.existsSync(dir)) return;

      const items = fs.readdirSync(dir);
      for (const item of items) {
        const itemPath = path.join(dir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
          traverse(itemPath);
        } else if (stats.isFile()) {
          // 根据范围过滤
          if (scope === 'recent') {
            if (stats.mtime.getTime() >= oneWeekAgo) {
              files.push(itemPath);
            }
          } else if (scope === 'all') {
            files.push(itemPath);
          }
          // specific 范围需要额外的路径指定
        }
      }
    }

    traverse(this.memoryDir);
    return files;
  }

  // 计算相关性
  _calculateRelevance(content, query) {
    const contentLower = content.toLowerCase();
    const queryWords = query.split(/\s+/).filter(word => word.length > 1);
    
    if (queryWords.length === 0) {
      return 0;
    }

    let matchingWords = 0;
    for (const word of queryWords) {
      if (contentLower.includes(word)) {
        matchingWords++;
      }
    }

    // 计算相关性分数
    const relevance = matchingWords / queryWords.length;
    
    // 调整：完全匹配给予更高分数
    if (contentLower === query) {
      return 1.0;
    }
    
    // 调整：标题匹配给予更高分数
    const firstLine = content.split('\n')[0].toLowerCase();
    if (firstLine.includes(query)) {
      return Math.min(1.0, relevance * 1.2);
    }

    return relevance;
  }

  // 应用过滤条件
  _applyFilters(filePath, content, filters) {
    // 文件名过滤
    if (filters.fileName) {
      const fileName = path.basename(filePath).toLowerCase();
      if (!fileName.includes(filters.fileName.toLowerCase())) {
        return false;
      }
    }

    // 内容类型过滤
    if (filters.contentType) {
      const ext = path.extname(filePath).toLowerCase();
      if (!ext.includes(filters.contentType.toLowerCase())) {
        return false;
      }
    }

    // 时间范围过滤
    if (filters.timeRange) {
      const { start, end } = filters.timeRange;
      const stats = fs.statSync(filePath);
      const mtime = stats.mtime.getTime();
      
      if (start && mtime < start) return false;
      if (end && mtime > end) return false;
    }

    // 大小范围过滤
    if (filters.sizeRange) {
      const { min, max } = filters.sizeRange;
      const stats = fs.statSync(filePath);
      const size = stats.size;
      
      if (min && size < min) return false;
      if (max && size > max) return false;
    }

    return true;
  }

  // 提取摘要
  _extractSummary(content, maxLength = 200) {
    const plainContent = content.replace(/[\s\n\r]+/g, ' ').trim();
    return plainContent.length > maxLength 
      ? plainContent.substring(0, maxLength) + '...' 
      : plainContent;
  }

  // 提取匹配的片段
  _extractSnippets(content, query, maxSnippets = 3) {
    const lines = content.split('\n');
    const snippets = [];
    const queryWords = query.split(/\s+/).filter(word => word.length > 1);

    for (const line of lines) {
      if (snippets.length >= maxSnippets) break;
      
      const lineLower = line.toLowerCase();
      const hasMatch = queryWords.some(word => lineLower.includes(word));
      
      if (hasMatch) {
        snippets.push({
          content: line.trim(),
          highlighted: this._highlightMatches(line, queryWords)
        });
      }
    }

    return snippets;
  }

  // 高亮匹配的部分
  _highlightMatches(text, queryWords) {
    let highlighted = text;
    for (const word of queryWords) {
      const regex = new RegExp(`(${word})`, 'gi');
      highlighted = highlighted.replace(regex, '<mark>$1</mark>');
    }
    return highlighted;
  }

  // 排序结果
  _sortResults(results, sortBy) {
    results.sort((a, b) => {
      switch (sortBy) {
        case 'relevance':
          return b.relevance - a.relevance;
        case 'timestamp':
          return b.timestamp - a.timestamp;
        case 'name':
          return a.fileName.localeCompare(b.fileName);
        default:
          return b.relevance - a.relevance;
      }
    });
  }

  // 批量搜索
  batchSearch(queries, options = {}) {
    const results = {};

    for (const query of queries) {
      results[query] = this.search(query, options);
    }

    return results;
  }

  // 搜索并汇总
  searchAndSummarize(query, options = {}) {
    const results = this.search(query, options);
    
    const summary = {
      query,
      totalResults: results.length,
      topResults: results.slice(0, 5),
      averageRelevance: results.length > 0 
        ? results.reduce((sum, r) => sum + r.relevance, 0) / results.length 
        : 0,
      timestamp: Date.now()
    };

    return summary;
  }

  // 创建搜索索引（可选）
  createIndex() {
    const index = {
      version: '1.0.0',
      timestamp: Date.now(),
      files: []
    };

    const memoryFiles = this._getMemoryFiles('all');
    
    for (const filePath of memoryFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileStats = fs.statSync(filePath);
        
        // 提取关键词
        const keywords = this._extractKeywords(content, 20);
        
        index.files.push({
          id: path.basename(filePath, path.extname(filePath)),
          path: filePath,
          fileName: path.basename(filePath),
          timestamp: fileStats.mtime.getTime(),
          size: fileStats.size,
          keywords
        });
      } catch (error) {
        console.error(`创建索引失败 ${filePath}:`, error);
      }
    }

    // 保存索引
    const indexPath = path.join(this.indexDir, 'search-index.json');
    fs.writeFileSync(indexPath, JSON.stringify(index, null, 2), 'utf8');

    return {
      success: true,
      indexedFiles: index.files.length,
      timestamp: index.timestamp
    };
  }

  // 提取关键词
  _extractKeywords(content, maxKeywords = 20) {
    const words = content.toLowerCase()
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5\s]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length > 2);

    // 统计词频
    const wordFreq = {};
    for (const word of words) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }

    // 排序并返回前N个
    return Object.entries(wordFreq)
      .sort((a, b) => b[1] - a[1])
      .slice(0, maxKeywords)
      .map(([word]) => word);
  }

  // 从索引中搜索（更快）
  searchFromIndex(query, options = {}) {
    const indexPath = path.join(this.indexDir, 'search-index.json');
    
    if (!fs.existsSync(indexPath)) {
      // 如果索引不存在，创建索引
      this.createIndex();
    }

    try {
      const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
      const normalizedQuery = query.toLowerCase().trim();
      const results = [];

      for (const file of index.files) {
        // 计算相关性
        const relevance = this._calculateRelevanceFromIndex(file, normalizedQuery);
        
        if (relevance >= (options.threshold || 0.3)) {
          results.push({
            ...file,
            relevance
          });
        }
      }

      // 排序和限制
      this._sortResults(results, options.sortBy || 'relevance');
      return results.slice(0, options.limit || 10);
    } catch (error) {
      console.error('从索引搜索失败:', error);
      // 回退到常规搜索
      return this.search(query, options);
    }
  }

  // 从索引计算相关性
  _calculateRelevanceFromIndex(file, query) {
    const queryWords = query.split(/\s+/).filter(word => word.length > 1);
    if (queryWords.length === 0) return 0;

    let matchingWords = 0;
    const allKeywords = file.keywords.join(' ').toLowerCase();
    
    for (const word of queryWords) {
      if (allKeywords.includes(word) || 
          file.fileName.toLowerCase().includes(word)) {
        matchingWords++;
      }
    }

    return matchingWords / queryWords.length;
  }

  // 获取搜索状态
  getSearchStatus() {
    const memoryFiles = this._getMemoryFiles('all');
    const indexPath = path.join(this.indexDir, 'search-index.json');
    const indexExists = fs.existsSync(indexPath);

    let indexInfo = null;
    if (indexExists) {
      try {
        const index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
        indexInfo = {
          version: index.version,
          timestamp: index.timestamp,
          indexedFiles: index.files.length
        };
      } catch (error) {
        indexInfo = { error: '索引文件损坏' };
      }
    }

    return {
      totalFiles: memoryFiles.length,
      indexExists,
      indexInfo,
      lastUpdated: Date.now()
    };
  }
}

// 导出单例实例
const memorySearch = new MemorySearch();

module.exports = {
  MemorySearch,
  memorySearch,
  // 工具接口
  search: (query, options) => {
    return memorySearch.search(query, options);
  },
  batchSearch: (queries, options) => {
    return memorySearch.batchSearch(queries, options);
  },
  searchAndSummarize: (query, options) => {
    return memorySearch.searchAndSummarize(query, options);
  },
  createIndex: () => {
    return memorySearch.createIndex();
  },
  searchFromIndex: (query, options) => {
    return memorySearch.searchFromIndex(query, options);
  },
  getSearchStatus: () => {
    return memorySearch.getSearchStatus();
  }
};

// 示例用法
if (require.main === module) {
  const searcher = memorySearch;

  // 创建索引
  console.log('Creating index...');
  const indexResult = searcher.createIndex();
  console.log('Index created:', indexResult);

  // 搜索示例
  console.log('\nSearching for "天气"...');
  const results = searcher.search('天气', {
    limit: 5,
    threshold: 0.2
  });

  console.log('Search results:', results.length);
  results.forEach((result, index) => {
    console.log(`\nResult ${index + 1}:`);
    console.log(`File: ${result.fileName}`);
    console.log(`Relevance: ${result.relevance.toFixed(2)}`);
    console.log(`Summary: ${result.summary}`);
  });

  // 从索引搜索
  console.log('\nSearching from index...');
  const indexResults = searcher.searchFromIndex('天气');
  console.log('Index search results:', indexResults.length);

  // 获取搜索状态
  console.log('\nSearch status:', searcher.getSearchStatus());
}
