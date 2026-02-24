/**
 * 知识库系统
 * 用于存储、检索和管理从认知数据中提取的知识
 */

const fs = require('fs');
const path = require('path');
const fsExtra = require('fs-extra');

// 知识库存储路径
const KNOWLEDGE_BASE_DIR = path.join(__dirname, '.trae', 'knowledge-base');
// 分析结果路径
const ANALYSIS_RESULTS_PATH = path.join(__dirname, '.trae', 'analysis', 'cognitive_data_analysis.json');

// 确保知识库目录存在
fsExtra.ensureDirSync(KNOWLEDGE_BASE_DIR);

class KnowledgeBase {
  constructor() {
    this.knowledgeItems = [];
    this.index = {};
    this.initialized = false;
  }

  /**
   * 初始化知识库
   */
  async initialize() {
    if (this.initialized) {
      console.log('知识库已经初始化');
      return;
    }

    console.log('开始初始化知识库...');

    // 加载分析结果
    await this.loadAnalysisResults();

    // 构建索引
    this.buildIndex();

    // 保存知识库
    this.saveKnowledgeBase();

    this.initialized = true;
    console.log('知识库初始化成功');
    console.log(`知识库包含 ${this.knowledgeItems.length} 个知识条目`);
    console.log(`索引包含 ${Object.keys(this.index).length} 个关键词`);
  }

  /**
   * 加载分析结果
   */
  async loadAnalysisResults() {
    if (!fs.existsSync(ANALYSIS_RESULTS_PATH)) {
      console.error('错误: 分析结果文件不存在，请先运行 analyze-cognitive-data.js');
      return;
    }

    console.log(`加载分析结果: ${ANALYSIS_RESULTS_PATH}`);
    const analysisResults = JSON.parse(fs.readFileSync(ANALYSIS_RESULTS_PATH, 'utf8'));

    // 从分析结果创建知识条目
    this.knowledgeItems = [];

    // 添加文档知识
    analysisResults.documents.forEach(doc => {
      const documentKnowledge = {
        id: `doc_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'document',
        title: doc.filename,
        category: doc.category,
        content: doc.summary,
        concepts: doc.keyConcepts || [],
        source: 'cognitive_data',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.knowledgeItems.push(documentKnowledge);

      // 为每个关键概念创建知识条目
      if (doc.keyConcepts) {
        doc.keyConcepts.forEach(concept => {
          const conceptKnowledge = {
            id: `concept_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            type: 'concept',
            title: concept,
            category: doc.category,
            content: `来自文档 ${doc.filename} 的关键概念: ${concept}`,
            relatedDocuments: [doc.filename],
            source: 'cognitive_data',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          this.knowledgeItems.push(conceptKnowledge);
        });
      }
    });

    // 添加分类知识
    const categories = Object.keys(analysisResults.filesByCategory);
    categories.forEach(category => {
      const categoryKnowledge = {
        id: `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        type: 'category',
        title: category,
        category: '系统',
        content: `知识分类: ${category}，包含 ${analysisResults.filesByCategory[category]} 个文档`,
        documentCount: analysisResults.filesByCategory[category],
        source: 'cognitive_data',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      this.knowledgeItems.push(categoryKnowledge);
    });

    console.log(`从分析结果创建了 ${this.knowledgeItems.length} 个知识条目`);
  }

  /**
   * 构建索引
   */
  buildIndex() {
    console.log('开始构建知识库索引...');
    this.index = {};

    // 为每个知识条目构建索引
    this.knowledgeItems.forEach(item => {
      // 索引标题
      this.indexTerm(item.title, item.id);

      // 索引分类
      this.indexTerm(item.category, item.id);

      // 索引概念
      if (item.concepts && Array.isArray(item.concepts)) {
        item.concepts.forEach(concept => {
          this.indexTerm(concept, item.id);
        });
      }

      // 索引内容中的关键词
      const keywords = this.extractKeywords(item.content);
      keywords.forEach(keyword => {
        this.indexTerm(keyword, item.id);
      });
    });

    console.log(`索引构建完成，包含 ${Object.keys(this.index).length} 个关键词`);
  }

  /**
   * 索引单个术语
   */
  indexTerm(term, itemId) {
    if (!term) return;

    const normalizedTerm = term.toLowerCase().trim();
    if (normalizedTerm.length < 2) return; // 忽略太短的术语

    if (!this.index[normalizedTerm]) {
      this.index[normalizedTerm] = [];
    }

    if (!this.index[normalizedTerm].includes(itemId)) {
      this.index[normalizedTerm].push(itemId);
    }
  }

  /**
   * 从文本中提取关键词
   */
  extractKeywords(text) {
    if (!text) return [];

    // 简单的关键词提取
    const words = text.toLowerCase()
      .replace(/[^a-zA-Z0-9\u4e00-\u9fa5]/g, ' ')
      .split(/\s+/)
      .filter(word => word.length >= 2);

    // 去重
    return [...new Set(words)];
  }

  /**
   * 保存知识库
   */
  saveKnowledgeBase() {
    // 保存知识条目
    const knowledgePath = path.join(KNOWLEDGE_BASE_DIR, 'knowledge-items.json');
    fs.writeFileSync(knowledgePath, JSON.stringify(this.knowledgeItems, null, 2));

    // 保存索引
    const indexPath = path.join(KNOWLEDGE_BASE_DIR, 'index.json');
    fs.writeFileSync(indexPath, JSON.stringify(this.index, null, 2));

    console.log(`知识库已保存到: ${KNOWLEDGE_BASE_DIR}`);
  }

  /**
   * 加载知识库
   */
  loadKnowledgeBase() {
    const knowledgePath = path.join(KNOWLEDGE_BASE_DIR, 'knowledge-items.json');
    const indexPath = path.join(KNOWLEDGE_BASE_DIR, 'index.json');

    if (fs.existsSync(knowledgePath)) {
      this.knowledgeItems = JSON.parse(fs.readFileSync(knowledgePath, 'utf8'));
    }

    if (fs.existsSync(indexPath)) {
      this.index = JSON.parse(fs.readFileSync(indexPath, 'utf8'));
    }

    this.initialized = true;
    console.log(`从磁盘加载知识库，包含 ${this.knowledgeItems.length} 个知识条目`);
  }

  /**
   * 搜索知识
   */
  search(query, options = {}) {
    if (!this.initialized) {
      console.error('知识库未初始化，请先调用 initialize()');
      return [];
    }

    const {
      limit = 10,
      types = [],
      categories = []
    } = options;

    console.log(`搜索知识库: ${query}`);

    // 标准化查询
    const normalizedQuery = query.toLowerCase().trim();
    const queryTerms = this.extractKeywords(normalizedQuery);

    if (queryTerms.length === 0) {
      return [];
    }

    // 搜索索引
    const matchingItemIds = new Set();
    queryTerms.forEach(term => {
      if (this.index[term]) {
        this.index[term].forEach(itemId => {
          matchingItemIds.add(itemId);
        });
      }
    });

    // 获取匹配的知识条目
    let results = Array.from(matchingItemIds).map(itemId => {
      return this.knowledgeItems.find(item => item.id === itemId);
    }).filter(item => item !== undefined);

    // 过滤类型
    if (types && types.length > 0) {
      results = results.filter(item => types.includes(item.type));
    }

    // 过滤分类
    if (categories && categories.length > 0) {
      results = results.filter(item => categories.includes(item.category));
    }

    // 排序（简单的相关度排序）
    results.sort((a, b) => {
      const scoreA = this.calculateRelevanceScore(a, queryTerms);
      const scoreB = this.calculateRelevanceScore(b, queryTerms);
      return scoreB - scoreA;
    });

    // 限制结果数量
    results = results.slice(0, limit);

    console.log(`搜索完成，找到 ${results.length} 个匹配结果`);
    return results;
  }

  /**
   * 计算相关度分数
   */
  calculateRelevanceScore(item, queryTerms) {
    let score = 0;

    // 标题匹配
    if (item.title.toLowerCase().includes(queryTerms[0])) {
      score += 10;
    }

    // 分类匹配
    if (item.category.toLowerCase().includes(queryTerms[0])) {
      score += 5;
    }

    // 概念匹配
    if (item.concepts && Array.isArray(item.concepts)) {
      item.concepts.forEach(concept => {
        if (concept.toLowerCase().includes(queryTerms[0])) {
          score += 8;
        }
      });
    }

    // 内容匹配
    if (item.content.toLowerCase().includes(queryTerms[0])) {
      score += 3;
    }

    // 多术语匹配
    queryTerms.forEach(term => {
      if (item.title.toLowerCase().includes(term) || 
          item.content.toLowerCase().includes(term)) {
        score += 2;
      }
    });

    return score;
  }

  /**
   * 添加知识条目
   */
  addKnowledgeItem(item) {
    if (!this.initialized) {
      console.error('知识库未初始化，请先调用 initialize()');
      return null;
    }

    // 生成ID
    const id = `${item.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // 创建知识条目
    const knowledgeItem = {
      id,
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // 添加到知识库
    this.knowledgeItems.push(knowledgeItem);

    // 更新索引
    this.indexTerm(knowledgeItem.title, id);
    this.indexTerm(knowledgeItem.category, id);
    
    if (knowledgeItem.concepts && Array.isArray(knowledgeItem.concepts)) {
      knowledgeItem.concepts.forEach(concept => {
        this.indexTerm(concept, id);
      });
    }

    // 保存知识库
    this.saveKnowledgeBase();

    console.log(`添加知识条目: ${knowledgeItem.title}`);
    return knowledgeItem;
  }

  /**
   * 更新知识条目
   */
  updateKnowledgeItem(id, updates) {
    if (!this.initialized) {
      console.error('知识库未初始化，请先调用 initialize()');
      return null;
    }

    const itemIndex = this.knowledgeItems.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      console.error(`知识条目不存在: ${id}`);
      return null;
    }

    // 更新知识条目
    this.knowledgeItems[itemIndex] = {
      ...this.knowledgeItems[itemIndex],
      ...updates,
      updatedAt: new Date().toISOString()
    };

    // 重建索引
    this.buildIndex();

    // 保存知识库
    this.saveKnowledgeBase();

    console.log(`更新知识条目: ${this.knowledgeItems[itemIndex].title}`);
    return this.knowledgeItems[itemIndex];
  }

  /**
   * 删除知识条目
   */
  deleteKnowledgeItem(id) {
    if (!this.initialized) {
      console.error('知识库未初始化，请先调用 initialize()');
      return false;
    }

    const itemIndex = this.knowledgeItems.findIndex(item => item.id === id);
    if (itemIndex === -1) {
      console.error(`知识条目不存在: ${id}`);
      return false;
    }

    const itemTitle = this.knowledgeItems[itemIndex].title;

    // 删除知识条目
    this.knowledgeItems.splice(itemIndex, 1);

    // 重建索引
    this.buildIndex();

    // 保存知识库
    this.saveKnowledgeBase();

    console.log(`删除知识条目: ${itemTitle}`);
    return true;
  }

  /**
   * 获取知识条目
   */
  getKnowledgeItem(id) {
    if (!this.initialized) {
      console.error('知识库未初始化，请先调用 initialize()');
      return null;
    }

    return this.knowledgeItems.find(item => item.id === id);
  }

  /**
   * 获取所有知识条目
   */
  getAllKnowledgeItems(options = {}) {
    if (!this.initialized) {
      console.error('知识库未初始化，请先调用 initialize()');
      return [];
    }

    const {
      limit = 100,
      offset = 0,
      types = [],
      categories = []
    } = options;

    let results = [...this.knowledgeItems];

    // 过滤类型
    if (types && types.length > 0) {
      results = results.filter(item => types.includes(item.type));
    }

    // 过滤分类
    if (categories && categories.length > 0) {
      results = results.filter(item => categories.includes(item.category));
    }

    // 分页
    results = results.slice(offset, offset + limit);

    return results;
  }

  /**
   * 获取知识库统计信息
   */
  getStatistics() {
    if (!this.initialized) {
      console.error('知识库未初始化，请先调用 initialize()');
      return {};
    }

    const statistics = {
      totalItems: this.knowledgeItems.length,
      itemsByType: {},
      itemsByCategory: {},
      indexSize: Object.keys(this.index).length
    };

    // 按类型统计
    this.knowledgeItems.forEach(item => {
      statistics.itemsByType[item.type] = (statistics.itemsByType[item.type] || 0) + 1;
    });

    // 按分类统计
    this.knowledgeItems.forEach(item => {
      statistics.itemsByCategory[item.category] = (statistics.itemsByCategory[item.category] || 0) + 1;
    });

    return statistics;
  }

  /**
   * 导出知识库
   */
  exportKnowledgeBase(format = 'json') {
    if (!this.initialized) {
      console.error('知识库未初始化，请先调用 initialize()');
      return null;
    }

    const exportPath = path.join(KNOWLEDGE_BASE_DIR, `export_${Date.now()}.${format}`);

    if (format === 'json') {
      const exportData = {
        knowledgeItems: this.knowledgeItems,
        index: this.index,
        statistics: this.getStatistics(),
        exportDate: new Date().toISOString()
      };

      fs.writeFileSync(exportPath, JSON.stringify(exportData, null, 2));
    }

    console.log(`知识库已导出到: ${exportPath}`);
    return exportPath;
  }

  /**
   * 与AI代理系统集成
   */
  integrateWithAgentSystem(agentManager) {
    if (!agentManager) {
      console.error('AgentManager 未提供');
      return false;
    }

    console.log('将知识库与AI代理系统集成...');

    // 为代理系统添加知识库访问方法
    agentManager.getKnowledgeBase = () => this;
    agentManager.searchKnowledge = (query, options) => this.search(query, options);
    agentManager.getKnowledgeStatistics = () => this.getStatistics();

    console.log('知识库与AI代理系统集成成功');
    return true;
  }
}

// 导出单例
const knowledgeBase = new KnowledgeBase();

// 执行初始化
if (require.main === module) {
  knowledgeBase.initialize()
    .then(() => {
      console.log('知识库初始化完成');
      
      // 测试搜索功能
      console.log('\n测试搜索功能:');
      const results = knowledgeBase.search('波特五力');
      console.log(`搜索 "波特五力" 找到 ${results.length} 个结果`);
      results.forEach((result, index) => {
        console.log(`${index + 1}. ${result.title} (${result.type})`);
      });

      // 输出统计信息
      console.log('\n知识库统计信息:');
      const stats = knowledgeBase.getStatistics();
      console.log(JSON.stringify(stats, null, 2));
    })
    .catch(error => {
      console.error('知识库初始化失败:', error);
    });
}

module.exports = knowledgeBase;
