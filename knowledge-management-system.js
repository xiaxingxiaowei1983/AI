const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class KnowledgeManagementSystem {
  constructor(options = {}) {
    this.config = {
      storageDir: options.storageDir || path.join(__dirname, 'knowledge-storage'),
      maxKnowledgeItems: options.maxKnowledgeItems || 1000,
      indexInterval: options.indexInterval || 3600000 // 默认1小时
    };
    
    this.state = {
      knowledgeItems: new Map(),
      categories: new Set(),
      lastIndex: null,
      searchIndex: {}
    };
    
    this.initializeStorage();
    this.loadKnowledge();
    this.buildSearchIndex();
  }
  
  initializeStorage() {
    if (!fs.existsSync(this.config.storageDir)) {
      fs.mkdirSync(this.config.storageDir, { recursive: true });
    }
    
    // 创建分类目录
    const categoriesDir = path.join(this.config.storageDir, 'categories');
    if (!fs.existsSync(categoriesDir)) {
      fs.mkdirSync(categoriesDir, { recursive: true });
    }
  }
  
  generateKnowledgeId(content) {
    return 'k_' + crypto.createHash('sha256').update(content).digest('hex').substring(0, 16);
  }
  
  saveKnowledge() {
    const statePath = path.join(this.config.storageDir, 'knowledge.json');
    const serializableState = {
      knowledgeItems: Object.fromEntries(this.state.knowledgeItems),
      categories: Array.from(this.state.categories),
      lastIndex: this.state.lastIndex
    };
    
    fs.writeFileSync(statePath, JSON.stringify(serializableState, null, 2));
  }
  
  loadKnowledge() {
    const statePath = path.join(this.config.storageDir, 'knowledge.json');
    if (fs.existsSync(statePath)) {
      try {
        const data = JSON.parse(fs.readFileSync(statePath, 'utf8'));
        if (data.knowledgeItems) {
          this.state.knowledgeItems = new Map(Object.entries(data.knowledgeItems));
        }
        if (data.categories) {
          this.state.categories = new Set(data.categories);
        }
        if (data.lastIndex) this.state.lastIndex = data.lastIndex;
      } catch (error) {
        console.error('加载知识失败:', error.message);
      }
    }
  }
  
  buildSearchIndex() {
    console.log('🔧 构建搜索索引');
    
    this.state.searchIndex = {};
    
    this.state.knowledgeItems.forEach((item, id) => {
      const content = (item.title + ' ' + item.content + ' ' + item.tags.join(' ')).toLowerCase();
      const words = content.split(/\s+/);
      
      words.forEach(word => {
        if (word.length > 2) {
          if (!this.state.searchIndex[word]) {
            this.state.searchIndex[word] = [];
          }
          if (!this.state.searchIndex[word].includes(id)) {
            this.state.searchIndex[word].push(id);
          }
        }
      });
    });
    
    this.state.lastIndex = new Date().toISOString();
    this.saveKnowledge();
    console.log('✅ 搜索索引构建完成');
  }
  
  addKnowledgeItem(item) {
    const id = this.generateKnowledgeId(item.content);
    const knowledgeItem = {
      id: id,
      title: item.title,
      content: item.content,
      category: item.category || 'general',
      tags: item.tags || [],
      source: item.source || 'unknown',
      confidence: item.confidence || 0.8,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // 添加到知识库
    this.state.knowledgeItems.set(id, knowledgeItem);
    
    // 添加分类
    this.state.categories.add(knowledgeItem.category);
    
    // 限制知识库大小
    if (this.state.knowledgeItems.size > this.config.maxKnowledgeItems) {
      const oldestItems = Array.from(this.state.knowledgeItems.entries())
        .sort((a, b) => new Date(a[1].createdAt) - new Date(b[1].createdAt))
        .slice(0, this.state.knowledgeItems.size - this.config.maxKnowledgeItems);
      
      oldestItems.forEach(([oldId]) => {
        this.state.knowledgeItems.delete(oldId);
      });
    }
    
    // 保存并更新索引
    this.saveKnowledge();
    this.buildSearchIndex();
    
    console.log(`✅ 知识项添加成功: ${id}`);
    return id;
  }
  
  updateKnowledgeItem(id, updates) {
    const item = this.state.knowledgeItems.get(id);
    if (item) {
      const updatedItem = {
        ...item,
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      this.state.knowledgeItems.set(id, updatedItem);
      this.saveKnowledge();
      this.buildSearchIndex();
      
      console.log(`✅ 知识项更新成功: ${id}`);
      return true;
    }
    return false;
  }
  
  deleteKnowledgeItem(id) {
    const deleted = this.state.knowledgeItems.delete(id);
    if (deleted) {
      this.saveKnowledge();
      this.buildSearchIndex();
      console.log(`✅ 知识项删除成功: ${id}`);
      return true;
    }
    return false;
  }
  
  searchKnowledge(query, options = {}) {
    const results = [];
    const queryLower = query.toLowerCase();
    const words = queryLower.split(/\s+/);
    
    // 使用搜索索引进行快速搜索
    const matchingIds = new Set();
    
    words.forEach(word => {
      if (this.state.searchIndex[word]) {
        this.state.searchIndex[word].forEach(id => matchingIds.add(id));
      }
    });
    
    // 对匹配的知识项进行排序和过滤
    matchingIds.forEach(id => {
      const item = this.state.knowledgeItems.get(id);
      if (item) {
        // 计算相关性分数
        let score = 0;
        
        // 标题匹配
        if (item.title.toLowerCase().includes(queryLower)) {
          score += 0.5;
        }
        
        // 内容匹配
        if (item.content.toLowerCase().includes(queryLower)) {
          score += 0.3;
        }
        
        // 标签匹配
        if (item.tags.some(tag => tag.toLowerCase().includes(queryLower))) {
          score += 0.2;
        }
        
        if (score > 0) {
          results.push({ ...item, score });
        }
      }
    });
    
    // 按分数排序
    results.sort((a, b) => b.score - a.score);
    
    // 应用过滤和限制
    const filteredResults = results.filter(item => {
      if (options.category && item.category !== options.category) {
        return false;
      }
      if (options.minConfidence && item.confidence < options.minConfidence) {
        return false;
      }
      return true;
    }).slice(0, options.limit || 10);
    
    return filteredResults;
  }
  
  getKnowledgeById(id) {
    return this.state.knowledgeItems.get(id);
  }
  
  getKnowledgeByCategory(category) {
    const items = [];
    this.state.knowledgeItems.forEach(item => {
      if (item.category === category) {
        items.push(item);
      }
    });
    return items;
  }
  
  getCategories() {
    return Array.from(this.state.categories);
  }
  
  getStats() {
    return {
      totalItems: this.state.knowledgeItems.size,
      categories: this.state.categories.size,
      lastIndex: this.state.lastIndex,
      indexSize: Object.keys(this.state.searchIndex).length
    };
  }
  
  exportKnowledge(format = 'json') {
    const knowledgeArray = Array.from(this.state.knowledgeItems.values());
    
    if (format === 'json') {
      return JSON.stringify(knowledgeArray, null, 2);
    } else if (format === 'markdown') {
      let markdown = '# 知识库导出\n\n';
      markdown += `导出时间: ${new Date().toISOString()}\n`;
      markdown += `知识项数量: ${knowledgeArray.length}\n\n`;
      
      this.state.categories.forEach(category => {
        const categoryItems = knowledgeArray.filter(item => item.category === category);
        if (categoryItems.length > 0) {
          markdown += `## ${category}\n\n`;
          categoryItems.forEach(item => {
            markdown += `### ${item.title}\n`;
            markdown += `**来源**: ${item.source}\n`;
            markdown += `**置信度**: ${item.confidence}\n`;
            markdown += `**标签**: ${item.tags.join(', ')}\n`;
            markdown += `**创建时间**: ${item.createdAt}\n`;
            markdown += `**更新时间**: ${item.updatedAt}\n\n`;
            markdown += `${item.content}\n\n`;
            markdown += '---\n\n';
          });
        }
      });
      
      return markdown;
    }
    
    return null;
  }
  
  importKnowledge(data, format = 'json') {
    let knowledgeItems = [];
    
    if (format === 'json') {
      try {
        knowledgeItems = Array.isArray(data) ? data : JSON.parse(data);
      } catch (error) {
        console.error('导入JSON数据失败:', error.message);
        return false;
      }
    } else if (format === 'markdown') {
      // 简单的Markdown解析
      const lines = data.split('\n');
      let currentItem = null;
      
      lines.forEach(line => {
        line = line.trim();
        
        if (line.startsWith('### ')) {
          if (currentItem) {
            knowledgeItems.push(currentItem);
          }
          currentItem = {
            title: line.substring(4),
            content: '',
            tags: [],
            source: 'imported',
            confidence: 0.8
          };
        } else if (currentItem) {
          if (line.startsWith('**来源**: ')) {
            currentItem.source = line.substring(5).trim();
          } else if (line.startsWith('**置信度**: ')) {
            currentItem.confidence = parseFloat(line.substring(5).trim());
          } else if (line.startsWith('**标签**: ')) {
            currentItem.tags = line.substring(5).trim().split(', ');
          } else if (line !== '---' && !line.startsWith('**创建时间**: ') && !line.startsWith('**更新时间**: ')) {
            currentItem.content += line + '\n';
          }
        }
      });
      
      if (currentItem) {
        knowledgeItems.push(currentItem);
      }
    }
    
    // 导入知识项
    let importedCount = 0;
    knowledgeItems.forEach(item => {
      if (item.title && item.content) {
        this.addKnowledgeItem(item);
        importedCount++;
      }
    });
    
    console.log(`✅ 导入完成，成功导入 ${importedCount} 个知识项`);
    return importedCount;
  }
}

module.exports = KnowledgeManagementSystem;

if (require.main === module) {
  function main() {
    console.log('========================================');
    console.log('🧠 知识管理系统测试');
    console.log('========================================');
    
    const kms = new KnowledgeManagementSystem();
    
    // 测试添加知识项
    console.log('测试添加知识项...');
    const id1 = kms.addKnowledgeItem({
      title: 'EvoMap基础概念',
      content: 'EvoMap是一个去中心化的知识图谱网络，用于存储和共享AI生成的知识资产。',
      category: 'evomap',
      tags: ['evomap', 'knowledge', 'ai'],
      source: 'internal'
    });
    
    const id2 = kms.addKnowledgeItem({
      title: '任务执行流程',
      content: 'EvoMap任务执行包括任务认领、执行、结果发布和任务完成四个步骤。',
      category: 'evomap',
      tags: ['evomap', 'tasks', 'workflow'],
      source: 'internal'
    });
    
    // 测试搜索
    console.log('\n测试搜索...');
    const searchResults = kms.searchKnowledge('EvoMap 任务');
    console.log('搜索结果:', searchResults);
    
    // 测试按分类获取
    console.log('\n测试按分类获取...');
    const evomapItems = kms.getKnowledgeByCategory('evomap');
    console.log('EvoMap分类的知识项:', evomapItems.length);
    
    // 测试获取统计信息
    console.log('\n测试获取统计信息...');
    const stats = kms.getStats();
    console.log('统计信息:', stats);
    
    // 测试导出
    console.log('\n测试导出...');
    const exportJson = kms.exportKnowledge('json');
    console.log('导出JSON长度:', exportJson.length);
    
    console.log('========================================');
    console.log('🎉 测试完成');
    console.log('========================================');
  }
  
  main();
}