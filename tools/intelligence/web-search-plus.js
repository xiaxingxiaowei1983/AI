/**
 * Web Search Plus 工具
 * 用于信息检索，基于意图自动路由到不同搜索引擎
 * Logic: Auto-route (Serper/Tavily/Exa) based on intent
 * 状态: ENHANCED (增强版) - 8小时进化方案优化
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
        priority: 1,
        strengths: ['general', 'news', 'product', 'trends'],
        responseTime: 0.5 // 平均响应时间（秒）
      },
      tavily: {
        name: 'Tavily',
        type: 'research',
        priority: 2,
        strengths: ['research', 'academic', 'papers', 'detailed'],
        responseTime: 0.8
      },
      exa: {
        name: 'Exa',
        type: 'code',
        priority: 3,
        strengths: ['code', 'programming', 'development', 'technical'],
        responseTime: 0.6
      }
    };
    this.intentKeywords = {
      general: ['what', 'who', 'when', 'where', 'why', 'how', 'latest', 'current', 'today'],
      research: ['research', 'study', 'academic', 'paper', 'journal', 'analysis', 'report'],
      code: ['code', 'program', 'function', 'algorithm', 'syntax', 'debug', 'implement'],
      news: ['news', 'update', 'latest', 'breaking', 'headline'],
      product: ['buy', 'price', 'review', 'best', 'compare', 'product']
    };
    this.cacheExpiry = 24 * 60 * 60 * 1000; // 缓存过期时间（毫秒）
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
    const startTime = Date.now();
    const {
      intent = 'general', // 搜索意图: general, research, code, news, product
      engine = null,      // 强制使用的搜索引擎
      limit = 5,          // 返回结果数量
      cache = true,       // 是否使用缓存
      saveResult = false, // 是否保存结果
      timeout = 30000,    // 搜索超时时间（毫秒）
      prioritizeSpeed = false // 是否优先考虑响应速度
    } = options;

    // 验证参数
    if (!query || typeof query !== 'string') {
      throw new Error('搜索查询必须是字符串');
    }

    // 增强意图识别
    const enhancedIntent = this._enhanceIntentRecognition(query, intent);

    // 生成缓存键
    const cacheKey = this._generateCacheKey(query, { ...options, intent: enhancedIntent });

    // 检查缓存
    if (cache) {
      const cachedResult = this._getCachedResult(cacheKey);
      if (cachedResult) {
        cachedResult.responseTime = Date.now() - startTime;
        cachedResult.metadata.fromCache = true;
        return cachedResult;
      }
    }

    // 确定使用的搜索引擎
    const targetEngine = engine || this._determineEngine(enhancedIntent, query, prioritizeSpeed);

    // 执行搜索
    const searchResult = {
      id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      query,
      intent: enhancedIntent,
      engine: targetEngine,
      timestamp: Date.now(),
      limit,
      results: [],
      metadata: {
        version: '2.0.0', // 增强版
        engineInfo: this.engines[targetEngine],
        originalIntent: intent,
        enhancedIntent: enhancedIntent,
        prioritizeSpeed: prioritizeSpeed
      }
    };

    // 模拟搜索结果（实际项目中应集成真实的搜索引擎API）
    // 添加性能模拟
    const engineResponseTime = this.engines[targetEngine].responseTime * 1000; // 转换为毫秒
    if (engineResponseTime > 0) {
      // 模拟搜索引擎响应延迟
      const endTime = Date.now();
      const elapsed = endTime - startTime;
      if (elapsed < engineResponseTime) {
        // 只在必要时延迟，避免不必要的等待
        const waitTime = Math.min(engineResponseTime - elapsed, 100); // 最大等待100ms
        if (waitTime > 0) {
          const startWait = Date.now();
          while (Date.now() - startWait < waitTime) {
            // 忙等待模拟延迟
          }
        }
      }
    }

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

    // 添加响应时间
    searchResult.responseTime = Date.now() - startTime;

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

  // 增强意图识别
  _enhanceIntentRecognition(query, originalIntent) {
    const normalizedQuery = query.toLowerCase().trim();
    let bestIntent = originalIntent;
    let bestScore = 0;

    // 计算每个意图的匹配分数
    for (const [intent, keywords] of Object.entries(this.intentKeywords)) {
      let score = 0;
      
      // 关键词匹配得分
      for (const keyword of keywords) {
        if (normalizedQuery.includes(keyword)) {
          score += 2; // 关键词匹配得分
        }
      }
      
      // 意图特定词汇匹配
      switch (intent) {
        case 'code':
          if (normalizedQuery.includes('javascript') || 
              normalizedQuery.includes('python') || 
              normalizedQuery.includes('java') ||
              normalizedQuery.includes('c++') ||
              normalizedQuery.includes('html') ||
              normalizedQuery.includes('css')) {
            score += 3;
          }
          break;
        case 'research':
          if (normalizedQuery.includes('study') || 
              normalizedQuery.includes('academic') || 
              normalizedQuery.includes('journal') ||
              normalizedQuery.includes('publication')) {
            score += 3;
          }
          break;
        case 'news':
          if (normalizedQuery.includes('latest') || 
              normalizedQuery.includes('today') || 
              normalizedQuery.includes('breaking') ||
              normalizedQuery.includes('headline')) {
            score += 3;
          }
          break;
        case 'product':
          if (normalizedQuery.includes('price') || 
              normalizedQuery.includes('buy') || 
              normalizedQuery.includes('review') ||
              normalizedQuery.includes('best')) {
            score += 3;
          }
          break;
      }
      
      // 更新最佳意图
      if (score > bestScore) {
        bestScore = score;
        bestIntent = intent;
      }
    }

    return bestIntent;
  }

  // 确定使用的搜索引擎
  _determineEngine(intent, query, prioritizeSpeed = false) {
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
            normalizedQuery.includes('algorithm') ||
            normalizedQuery.includes('javascript') ||
            normalizedQuery.includes('python') ||
            normalizedQuery.includes('java')) {
          return 'exa';
        } else if (normalizedQuery.includes('research') || 
                   normalizedQuery.includes('study') || 
                   normalizedQuery.includes('academic') ||
                   normalizedQuery.includes('paper') ||
                   normalizedQuery.includes('journal')) {
          return 'tavily';
        } else {
          // 如果优先考虑速度，选择响应时间最快的引擎
          if (prioritizeSpeed) {
            return Object.keys(this.engines).reduce((fastest, engine) => 
              this.engines[engine].responseTime < this.engines[fastest].responseTime 
                ? engine 
                : fastest
            );
          }
          return 'serper';
        }
    }
  }

  // 模拟搜索结果
  _simulateSearchResults(query, engine, limit) {
    const results = [];
    const normalizedQuery = query.toLowerCase().trim();
    const engineInfo = this.engines[engine];

    // 基于引擎类型生成更真实的结果
    for (let i = 0; i < limit; i++) {
      let title, url, snippet, score;

      // 根据引擎类型和查询内容生成更真实的结果
      switch (engine) {
        case 'serper':
          title = this._generateSerperTitle(query, i);
          url = `https://serper.dev/results/${i + 1}?q=${encodeURIComponent(query)}`;
          snippet = this._generateSerperSnippet(query, engineInfo, i);
          score = Math.random() * 0.3 + 0.7; // 0.7-1.0的相关性分数，Serper更擅长一般搜索
          break;
        case 'tavily':
          title = this._generateTavilyTitle(query, i);
          url = `https://tavily.com/search?q=${encodeURIComponent(query)}&result=${i + 1}`;
          snippet = this._generateTavilySnippet(query, engineInfo, i);
          score = Math.random() * 0.3 + 0.65; // 0.65-0.95的相关性分数，Tavily更擅长研究搜索
          break;
        case 'exa':
          title = this._generateExaTitle(query, i);
          url = `https://exa.ai/search?q=${encodeURIComponent(query)}&page=${i + 1}`;
          snippet = this._generateExaSnippet(query, engineInfo, i);
          score = Math.random() * 0.3 + 0.75; // 0.75-1.05的相关性分数，Exa更擅长代码搜索
          break;
        default:
          title = `Result ${i + 1} for "${query}"`;
          url = `https://example.com/result${i + 1}?q=${encodeURIComponent(query)}`;
          snippet = `This is a simulated snippet for the search query "${query}" using ${engineInfo.name} engine.`;
          score = Math.random() * 0.5 + 0.5; // 0.5-1.0的相关性分数
      }

      results.push({
        id: `result_${Date.now()}_${i + 1}`,
        title: title,
        url: url,
        snippet: snippet,
        score: score,
        timestamp: Date.now() - (i * 1000),
        engine: engine,
        relevance: score > 0.8 ? 'high' : score > 0.6 ? 'medium' : 'low'
      });
    }

    // 按分数排序
    results.sort((a, b) => b.score - a.score);

    return results;
  }

  // 生成Serper风格的标题
  _generateSerperTitle(query, index) {
    const prefixes = ['', 'Top ', 'Best ', 'Latest ', 'How to ', 'What is ', 'Why ', 'When ', 'Where ', 'Who '];
    const suffixes = ['', ' - Comprehensive Guide', ' - 2024 Update', ' - Expert Analysis', ' - Complete Overview', ' - Detailed Review'];
    
    const prefix = prefixes[Math.min(index, prefixes.length - 1)];
    const suffix = suffixes[Math.min(index, suffixes.length - 1)];
    
    return `${prefix}${query}${suffix}`;
  }

  // 生成Serper风格的摘要
  _generateSerperSnippet(query, engineInfo, index) {
    const snippets = [
      `Comprehensive information about ${query} including latest trends, expert opinions, and practical applications. This result provides detailed insights and actionable advice for anyone interested in ${query.toLowerCase()}.`,
      `Latest updates and developments in ${query.toLowerCase()}. Learn about the newest research, technologies, and approaches that are shaping the future of ${query.toLowerCase()}.`,
      `In-depth analysis of ${query.toLowerCase()} covering key concepts, methodologies, and real-world examples. This resource is ideal for both beginners and experts looking to expand their knowledge.`,
      `Practical guide to ${query.toLowerCase()} with step-by-step instructions, best practices, and troubleshooting tips. Perfect for anyone looking to implement ${query.toLowerCase()} in their projects.`,
      `Expert review of ${query.toLowerCase()} comparing different approaches, tools, and techniques. This comprehensive analysis helps you make informed decisions about ${query.toLowerCase()}.`
    ];
    
    return snippets[Math.min(index, snippets.length - 1)];
  }

  // 生成Tavily风格的标题
  _generateTavilyTitle(query, index) {
    const prefixes = ['Research on ', 'Study of ', 'Academic Analysis of ', 'Journal Review: ', 'Scholarly Perspective on ', 'Scientific Investigation of '];
    const suffixes = ['', ' - Research Paper', ' - Academic Review', ' - Scientific Study', ' - Journal Article', ' - Scholarly Analysis'];
    
    const prefix = prefixes[Math.min(index, prefixes.length - 1)];
    const suffix = suffixes[Math.min(index, suffixes.length - 1)];
    
    return `${prefix}${query}${suffix}`;
  }

  // 生成Tavily风格的摘要
  _generateTavilySnippet(query, engineInfo, index) {
    const snippets = [
      `Scholarly research on ${query.toLowerCase()} from leading academic journals and research institutions. This result synthesizes findings from multiple studies to provide a comprehensive overview of the current state of knowledge.`,
      `Academic analysis of ${query.toLowerCase()} examining theoretical frameworks, methodological approaches, and empirical evidence. This scholarly resource offers deep insights into the complexities of ${query.toLowerCase()}.`,
      `Systematic review of ${query.toLowerCase()} covering historical developments, current trends, and future directions. This comprehensive synthesis of existing research identifies key gaps and promising avenues for future investigation.`,
      `Empirical study of ${query.toLowerCase()} presenting original data, statistical analyses, and novel interpretations. This research contributes valuable new knowledge to the field of ${query.toLowerCase()}.`,
      `Meta-analysis of ${query.toLowerCase()} combining results from multiple studies to provide more robust conclusions and identify patterns across different research contexts.`
    ];
    
    return snippets[Math.min(index, snippets.length - 1)];
  }

  // 生成Exa风格的标题
  _generateExaTitle(query, index) {
    const prefixes = ['', 'Code Example: ', 'Implementation of ', 'Tutorial: ', 'Guide to ', 'Best Practices for ', 'Optimization of '];
    const suffixes = ['', ' - Code Sample', ' - Implementation Guide', ' - Programming Tutorial', ' - Development Best Practices', ' - Optimization Techniques'];
    
    const prefix = prefixes[Math.min(index, prefixes.length - 1)];
    const suffix = suffixes[Math.min(index, suffixes.length - 1)];
    
    return `${prefix}${query}${suffix}`;
  }

  // 生成Exa风格的摘要
  _generateExaSnippet(query, engineInfo, index) {
    const snippets = [
      `Code implementation of ${query.toLowerCase()} with detailed explanations, performance optimizations, and edge case handling. This result provides clean, efficient code that follows best practices and includes comprehensive documentation.`,
      `Step-by-step tutorial for implementing ${query.toLowerCase()} with code examples, test cases, and debugging tips. Perfect for developers looking to integrate ${query.toLowerCase()} into their projects.`,
      `Optimized solution for ${query.toLowerCase()} with performance benchmarks, memory usage analysis, and scalability considerations. This implementation balances readability, efficiency, and maintainability.`,
      `Comprehensive guide to ${query.toLowerCase()} covering different approaches, trade-offs, and implementation strategies. Includes code samples in multiple programming languages and frameworks.`,
      `Best practices for ${query.toLowerCase()} based on industry standards and community consensus. This resource helps developers write cleaner, more efficient code for ${query.toLowerCase()}.`
    ];
    
    return snippets[Math.min(index, snippets.length - 1)];
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
