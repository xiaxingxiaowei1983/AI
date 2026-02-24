/**
 * Web Search Plus 工具
 * 用于信息检索，基于意图自动路由到不同搜索引擎
 * Logic: Auto-route (Serper/Tavily/Exa) based on intent
 */

const fs = require('fs');
const path = require('path');

class WebSearchPlus {
  constructor() {
    this.searchDir = path.join(__dirname, '../../search');
    this.cacheDir = path.join(__dirname, '../../cache/search');
    this.engines = {
      serper: {
        name: 'Serper',
        type: 'general',
        priority: 1
      },
      tavily: {
        name: 'Tavily',
        type: 'research',
        priority: 2
      },
      exa: {
        name: 'Exa',
        type: 'code',
        priority: 3
      }
    };
    this._initialize();
  }

  // 初始化目录
  _initialize() {
    if (!fs.existsSync(this.searchDir)) {
      fs.mkdirSync(this.searchDir, { recursive: true });
    }

    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir, { recursive: true });
    }
  }

  // 搜索信息
  search(query, options = {}) {
    const {
      intent = 'general', // 搜索意图: general, research, code, news, product
      engine = null,      // 强制使用的搜索引擎
      limit = 5,          // 返回结果数量
      cache = true,       // 是否使用缓存
      saveResult = false  // 是否保存结果
    } = options;

    // 验证参数
    if (!query || typeof query !== 'string') {
      throw new Error('搜索查询必须是字符串');
    }

    // 生成缓存键
    const cacheKey = this._generateCacheKey(query, options);

    // 检查缓存
    if (cache) {
      const cachedResult = this._getCachedResult(cacheKey);
      if (cachedResult) {
        return cachedResult;
      }
    }

    // 确定使用的搜索引擎
    const targetEngine = engine || this._determineEngine(intent, query);

    // 执行搜索
    const searchResult = {
      id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      query,
      intent,
      engine: targetEngine,
      timestamp: Date.now(),
      limit,
      results: [],
      metadata: {
        version: '1.0.0',
        engineInfo: this.engines[targetEngine]
      }
    };

    // 模拟搜索结果（实际项目中应集成真实的搜索引擎API）
    searchResult.results = this._simulateSearchResults(query, targetEngine, limit);

    // 保存结果
    if (saveResult) {
      const resultPath = path.join(this.searchDir, `${searchResult.id}.json`);
      fs.writeFileSync(resultPath, JSON.stringify(searchResult, null, 2), 'utf8');
      searchResult.resultPath = resultPath;
    }

    // 缓存结果
    if (cache) {
      this._cacheResult(cacheKey, searchResult);
    }

    return searchResult;
  }

  // 批量搜索
  batchSearch(queries, options = {}) {
    if (!Array.isArray(queries)) {
      throw new Error('搜索查询必须是数组');
    }

    const results = {};
    let successCount = 0;

    for (const query of queries) {
      try {
        const result = this.search(query, options);
        results[query] = result;
        successCount++;
      } catch (error) {
        results[query] = {
          error: error.message,
          timestamp: Date.now()
        };
      }
    }

    return {
      success: successCount === queries.length,
      successCount,
      totalCount: queries.length,
      results
    };
  }

  // 搜索并汇总
  searchAndSummarize(query, options = {}) {
    const searchResult = this.search(query, options);

    const summary = {
      query,
      intent: options.intent || 'general',
      engine: searchResult.engine,
      totalResults: searchResult.results.length,
      topResults: searchResult.results.slice(0, 3),
      summary: this._generateSummary(searchResult.results),
      timestamp: Date.now()
    };

    return summary;
  }

  // 确定使用的搜索引擎
  _determineEngine(intent, query) {
    const normalizedQuery = query.toLowerCase().trim();

    // 基于意图的引擎选择
    switch (intent) {
      case 'research':
        return 'tavily';
      case 'code':
        return 'exa';
      case 'news':
        return 'serper';
      case 'product':
        return 'serper';
      default:
        // 基于查询内容的智能选择
        if (normalizedQuery.includes('code') || 
            normalizedQuery.includes('program') || 
            normalizedQuery.includes('function') ||
            normalizedQuery.includes('algorithm')) {
          return 'exa';
        } else if (normalizedQuery.includes('research') || 
                   normalizedQuery.includes('study') || 
                   normalizedQuery.includes('academic') ||
                   normalizedQuery.includes('paper')) {
          return 'tavily';
        } else {
          return 'serper';
        }
    }
  }

  // 模拟搜索结果
  _simulateSearchResults(query, engine, limit) {
    const results = [];

    for (let i = 0; i < limit; i++) {
      results.push({
        id: `result_${i + 1}`,
        title: `Result ${i + 1} for "${query}"`,
        url: `https://example.com/result${i + 1}`,
        snippet: `This is a simulated snippet for the search query "${query}" using ${this.engines[engine].name} engine.`,
        score: Math.random() * 0.5 + 0.5, // 0.5-1.0的相关性分数
        timestamp: Date.now() - (i * 1000)
      });
    }

    // 按分数排序
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  // 生成摘要
  _generateSummary(results) {
    if (results.length === 0) {
      return 'No results found.';
    }

    const snippets = results.map(r => r.snippet).join(' ');
    return snippets.length > 200 
      ? snippets.substring(0, 200) + '...' 
      : snippets;
  }

  // 生成缓存键
  _generateCacheKey(query, options) {
    const { intent, engine } = options;
    return `cache_${query.toLowerCase().trim()}_${intent || 'general'}_${engine || 'auto'}`;
  }

  // 获取缓存结果
  _getCachedResult(cacheKey) {
    const cachePath = path.join(this.cacheDir, `${cacheKey}.json`);
    if (fs.existsSync(cachePath)) {
      try {
        const content = fs.readFileSync(cachePath, 'utf8');
        const result = JSON.parse(content);
        // 检查缓存是否过期（24小时）
        const cacheTime = result.timestamp;
        const now = Date.now();
        const isExpired = (now - cacheTime) > (24 * 60 * 60 * 1000);
        
        if (!isExpired) {
          result.fromCache = true;
          return result;
        }
      } catch (error) {
        console.error('读取缓存失败:', error);
      }
    }
    return null;
  }

  // 缓存结果
  _cacheResult(cacheKey, result) {
    const cachePath = path.join(this.cacheDir, `${cacheKey}.json`);
    try {
      fs.writeFileSync(cachePath, JSON.stringify(result, null, 2), 'utf8');
    } catch (error) {
      console.error('缓存结果失败:', error);
    }
  }

  // 清理旧缓存
  cleanupCache(hours = 24) {
    const cutoffTime = Date.now() - (hours * 60 * 60 * 1000);
    let cleanedCount = 0;

    if (fs.existsSync(this.cacheDir)) {
      const files = fs.readdirSync(this.cacheDir);
      for (const file of files) {
        const filePath = path.join(this.cacheDir, file);
        const stats = fs.statSync(filePath);
        if (stats.mtime.getTime() < cutoffTime) {
          fs.unlinkSync(filePath);
          cleanedCount++;
        }
      }
    }

    return {
      success: true,
      cleanedCount,
      hours
    };
  }

  // 获取搜索状态
  getSearchStatus() {
    let totalSearches = 0;
    let totalCacheSize = 0;

    // 统计搜索结果
    if (fs.existsSync(this.searchDir)) {
      const files = fs.readdirSync(this.searchDir);
      totalSearches = files.length;
    }

    // 统计缓存大小
    if (fs.existsSync(this.cacheDir)) {
      const files = fs.readdirSync(this.cacheDir);
      for (const file of files) {
        const filePath = path.join(this.cacheDir, file);
        const stats = fs.statSync(filePath);
        totalCacheSize += stats.size;
      }
    }

    return {
      version: '1.0.0',
      timestamp: Date.now(),
      totalSearches,
      cacheSize: totalCacheSize,
      cacheSizeFormatted: this._formatSize(totalCacheSize),
      engines: Object.keys(this.engines),
      status: 'Ready'
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
const webSearchPlus = new WebSearchPlus();

module.exports = {
  WebSearchPlus,
  webSearchPlus,
  // 工具接口
  search: (query, options) => {
    return webSearchPlus.search(query, options);
  },
  batchSearch: (queries, options) => {
    return webSearchPlus.batchSearch(queries, options);
  },
  searchAndSummarize: (query, options) => {
    return webSearchPlus.searchAndSummarize(query, options);
  },
  cleanupCache: (hours) => {
    return webSearchPlus.cleanupCache(hours);
  },
  getSearchStatus: () => {
    return webSearchPlus.getSearchStatus();
  }
};

// 示例用法
if (require.main === module) {
  const searcher = webSearchPlus;

  // 测试搜索
  console.log('Testing web search...');

  try {
    // 一般搜索
    console.log('\nGeneral search:');
    const generalResult = searcher.search('人工智能最新发展', {
      intent: 'general',
      limit: 3,
      saveResult: true
    });
    console.log('General search result:', JSON.stringify(generalResult, null, 2));

    // 代码搜索
    console.log('\nCode search:');
    const codeResult = searcher.search('JavaScript async await example', {
      intent: 'code',
      limit: 3
    });
    console.log('Code search result:', JSON.stringify(codeResult, null, 2));

    // 研究搜索
    console.log('\nResearch search:');
    const researchResult = searcher.search('machine learning research papers 2024', {
      intent: 'research',
      limit: 3
    });
    console.log('Research search result:', JSON.stringify(researchResult, null, 2));

    // 批量搜索
    console.log('\nBatch search:');
    const batchResult = searcher.batchSearch(['weather today', 'latest news'], {
      limit: 2
    });
    console.log('Batch search result:', JSON.stringify(batchResult, null, 2));

    // 搜索并汇总
    console.log('\nSearch and summarize:');
    const summaryResult = searcher.searchAndSummarize('artificial intelligence applications');
    console.log('Summary result:', JSON.stringify(summaryResult, null, 2));

    // 获取搜索状态
    console.log('\nSearch status:', JSON.stringify(searcher.getSearchStatus(), null, 2));

  } catch (error) {
    console.error('Error:', error.message);
  }
}
