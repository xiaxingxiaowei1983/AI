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
    this.cacheDir = path.join(__dirname, '../../memory/cache');
    this._initialize();
    // 初始化缓存
    this.cache = new Map();
    this.cacheSize = 500;
    // 分类模型
    this.categoryModel = this._initializeCategoryModel();
  }

  // 初始化内存和索引目录
  _initialize() {
    if (!fs.existsSync(this.memoryDir)) {
      fs.mkdirSync(this.memoryDir, { recursive: true });
    }

    if (!fs.existsSync(this.indexDir)) {
      fs.mkdirSync(this.indexDir, { recursive: true });
    }

    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }
  
  // 初始化分类模型
  _initializeCategoryModel() {
    return {
      categories: {
        '日常对话': ['你好', '谢谢', '再见', '天气', '时间'],
        '技术讨论': ['代码', '编程', '技术', '系统', '架构'],
        '业务分析': ['市场', '销售', '业务', '客户', '分析'],
        '个人成长': ['学习', '成长', '目标', '计划', '发展'],
        '系统管理': ['配置', '管理', '设置', '优化', '监控'],
        '知识管理': ['记忆', '搜索', '信息', '数据', '存储']
      },
      // 分类规则
      rules: [
        { pattern: /代码|编程|技术|系统|架构/, category: '技术讨论' },
        { pattern: /市场|销售|业务|客户|分析/, category: '业务分析' },
        { pattern: /学习|成长|目标|计划|发展/, category: '个人成长' },
        { pattern: /配置|管理|设置|优化|监控/, category: '系统管理' },
        { pattern: /记忆|搜索|信息|数据|存储/, category: '知识管理' }
      ]
    };
  }

  // 搜索内存中的知识
  search(query, options = {}) {
    const {
      scope = 'all', // 搜索范围: all, recent, specific
      limit = 10,    // 返回结果数量
      threshold = 0.3, // 相关性阈值
      sortBy = 'relevance', // 排序方式: relevance, timestamp, name
      filters = {},   // 过滤条件
      useCache = true, // 是否使用缓存
      autoCategory = true // 是否自动分类
    } = options;

    // 验证参数
    if (!query || typeof query !== 'string') {
      throw new Error('搜索查询必须是字符串');
    }

    const normalizedQuery = query.toLowerCase().trim();
    const cacheKey = JSON.stringify({ query: normalizedQuery, options });

    // 检查缓存
    if (useCache && this.cache.has(cacheKey)) {
      const cachedResult = this.cache.get(cacheKey);
      if (Date.now() - cachedResult.timestamp < 3600000) { // 1小时缓存
        return cachedResult.results;
      }
      this.cache.delete(cacheKey);
    }

    // 尝试从索引搜索
    let results = [];
    try {
      results = this.searchFromIndex(normalizedQuery, options);
      if (results.length > 0) {
        // 从索引搜索成功，补充详细信息
        results = results.map(result => {
          try {
            const content = fs.readFileSync(result.path, 'utf8');
            return {
              ...result,
              summary: this._extractSummary(content, 200),
              snippets: this._extractSnippets(content, normalizedQuery, 3)
            };
          } catch (error) {
            return result;
          }
        });
      } else {
        // 索引搜索失败，回退到常规搜索
        results = this._searchFiles(normalizedQuery, options);
      }
    } catch (error) {
      // 搜索失败，回退到常规搜索
      results = this._searchFiles(normalizedQuery, options);
    }

    // 自动分类
    if (autoCategory) {
      results = results.map(result => {
        try {
          const content = fs.readFileSync(result.path, 'utf8');
          const categories = this._categorizeContent(content);
          return {
            ...result,
            categories
          };
        } catch (error) {
          return result;
        }
      });
    }

    // 排序结果
    this._sortResults(results, sortBy);

    // 限制返回数量
    const limitedResults = results.slice(0, limit);

    // 缓存结果
    if (useCache) {
      this._cacheResult(cacheKey, limitedResults);
    }

    return limitedResults;
  }
  
  // 从文件搜索
  _searchFiles(query, options = {}) {
    const {
      scope = 'all',
      threshold = 0.3,
      filters = {}
    } = options;

    const results = [];

    // 搜索内存目录
    const memoryFiles = this._getMemoryFiles(scope);

    for (const filePath of memoryFiles) {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        const fileStats = fs.statSync(filePath);
        
        // 计算相关性（增强版）
        const relevance = this._calculateRelevanceEnhanced(content, filePath, query);
        
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
              snippets: this._extractSnippets(content, query, 3)
            });
          }
        }
      } catch (error) {
        console.error(`搜索文件失败 ${filePath}:`, error);
      }
    }

    return results;
  }
  
  // 增强版相关性计算
  _calculateRelevanceEnhanced(content, filePath, query) {
    const contentLower = content.toLowerCase();
    const queryWords = query.split(/\s+/).filter(word => word.length > 1);
    const fileName = path.basename(filePath).toLowerCase();
    
    if (queryWords.length === 0) {
      return 0;
    }

    let totalScore = 0;
    let wordScores = [];

    // 计算每个查询词的得分
    for (const word of queryWords) {
      let wordScore = 0;
      
      // 内容匹配得分
      if (contentLower.includes(word)) {
        // 计算词频
        const wordCount = (contentLower.match(new RegExp(word, 'g')) || []).length;
        const contentLength = contentLower.split(/\s+/).length;
        const frequencyScore = Math.min(wordCount / contentLength * 10, 5);
        wordScore += frequencyScore;
      }
      
      // 文件名匹配得分
      if (fileName.includes(word)) {
        wordScore += 3;
      }
      
      // 标题匹配得分
      const firstLine = content.split('\n')[0].toLowerCase();
      if (firstLine.includes(word)) {
        wordScore += 2;
      }
      
      wordScores.push(wordScore);
      totalScore += wordScore;
    }

    // 计算平均得分
    const averageScore = totalScore / queryWords.length;
    
    // 调整：完全匹配给予更高分数
    if (contentLower === query) {
      return 1.0;
    }
    
    // 调整：标题完全匹配给予更高分数
    if (firstLine === query) {
      return Math.min(1.0, averageScore * 1.5);
    }

    // 归一化到 0-1 范围
    return Math.min(1.0, averageScore / 10);
  }
  
  // 缓存结果
  _cacheResult(key, results) {
    if (this.cache.size >= this.cacheSize) {
      // 移除最早的缓存项
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, {
      results,
      timestamp: Date.now()
    });
  }
  
  // 自动分类内容
  _categorizeContent(content) {
    const categories = [];
    const contentLower = content.toLowerCase();
    
    // 应用分类规则
    for (const rule of this.categoryModel.rules) {
      if (rule.pattern.test(contentLower)) {
        categories.push(rule.category);
      }
    }
    
    // 基于关键词分类
    for (const [category, keywords] of Object.entries(this.categoryModel.categories)) {
      if (!categories.includes(category)) {
        for (const keyword of keywords) {
          if (contentLower.includes(keyword.toLowerCase())) {
            categories.push(category);
            break;
          }
        }
      }
    }
    
    // 默认分类
    if (categories.length === 0) {
      categories.push('未分类');
    }
    
    return categories;
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
    
    // 分析搜索结果
    const analysis = this._analyzeSearchResults(results);
    
    const summary = {
      query,
      totalResults: results.length,
      topResults: results.slice(0, 5),
      averageRelevance: results.length > 0 
        ? results.reduce((sum, r) => sum + r.relevance, 0) / results.length 
        : 0,
      timestamp: Date.now(),
      // 新增分析信息
      analysis,
      // 分类统计
      categoryStats: this._getCategoryStats(results),
      // 时间分布
      timeDistribution: this._getTimeDistribution(results),
      // 搜索建议
      suggestions: this._generateSearchSuggestions(query, results)
    };

    return summary;
  }

  // 分析搜索结果
  _analyzeSearchResults(results) {
    if (results.length === 0) {
      return {
        insights: ['无搜索结果'],
        recommendations: ['尝试使用更通用的关键词'],
        patterns: []
      };
    }

    const insights = [];
    const recommendations = [];
    const patterns = [];

    // 分析相关性分布
    const highRelevance = results.filter(r => r.relevance >= 0.7).length;
    const mediumRelevance = results.filter(r => r.relevance >= 0.4 && r.relevance < 0.7).length;
    const lowRelevance = results.filter(r => r.relevance < 0.4).length;

    if (highRelevance > 0) {
      insights.push(`发现 ${highRelevance} 个高相关性结果`);
    }

    if (lowRelevance > highRelevance + mediumRelevance) {
      insights.push('大部分结果相关性较低');
      recommendations.push('尝试使用更具体的关键词');
    }

    // 分析文件类型分布
    const fileTypes = {};
    results.forEach(r => {
      const ext = path.extname(r.path).toLowerCase();
      fileTypes[ext] = (fileTypes[ext] || 0) + 1;
    });

    const topFileType = Object.entries(fileTypes)
      .sort((a, b) => b[1] - a[1])[0];

    if (topFileType) {
      patterns.push(`主要文件类型: ${topFileType[0]} (${topFileType[1]}个)`);
    }

    return {
      insights,
      recommendations,
      patterns
    };
  }

  // 获取分类统计
  _getCategoryStats(results) {
    const categories = {};
    results.forEach(r => {
      if (r.categories) {
        r.categories.forEach(category => {
          categories[category] = (categories[category] || 0) + 1;
        });
      }
    });
    return categories;
  }

  // 获取时间分布
  _getTimeDistribution(results) {
    const distribution = {
      recent: 0, // 最近7天
      medium: 0, // 7-30天
      old: 0 // 30天以上
    };

    const now = Date.now();
    const sevenDaysAgo = now - (7 * 24 * 60 * 60 * 1000);
    const thirtyDaysAgo = now - (30 * 24 * 60 * 60 * 1000);

    results.forEach(r => {
      if (r.timestamp >= sevenDaysAgo) {
        distribution.recent++;
      } else if (r.timestamp >= thirtyDaysAgo) {
        distribution.medium++;
      } else {
        distribution.old++;
      }
    });

    return distribution;
  }

  // 生成搜索建议
  _generateSearchSuggestions(query, results) {
    const suggestions = [];
    
    // 基于结果生成建议
    const keywords = new Set();
    results.forEach(r => {
      if (r.keywords) {
        r.keywords.slice(0, 5).forEach(keyword => {
          keywords.add(keyword);
        });
      }
    });

    // 生成相关搜索建议
    keywords.forEach(keyword => {
      if (keyword !== query.toLowerCase() && !query.toLowerCase().includes(keyword)) {
        suggestions.push(keyword);
      }
    });

    return suggestions.slice(0, 5);
  }

  // 增强版搜索（支持多语言和语义理解）
  enhancedSearch(query, options = {}) {
    // 这里可以实现更高级的搜索功能
    // 例如：多语言支持、语义理解、跨文档搜索等
    
    // 暂时调用基础搜索
    return this.search(query, options);
  }

  // 搜索结果聚类
  clusterSearchResults(query, options = {}) {
    const results = this.search(query, options);
    
    // 简单聚类实现
    const clusters = {};
    
    results.forEach(result => {
      // 基于分类聚类
      if (result.categories && result.categories.length > 0) {
        const mainCategory = result.categories[0];
        if (!clusters[mainCategory]) {
          clusters[mainCategory] = [];
        }
        clusters[mainCategory].push(result);
      } else {
        if (!clusters['未分类']) {
          clusters['未分类'] = [];
        }
        clusters['未分类'].push(result);
      }
    });
    
    return {
      query,
      totalClusters: Object.keys(clusters).length,
      clusters,
      timestamp: Date.now()
    };
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
