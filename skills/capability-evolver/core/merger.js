/**
 * 能力合并器
 * 负责识别和合并相似能力，提升能力的抽象层次，优化能力的调用成本
 */

const fs = require('fs');
const path = require('path');
const internalizer = require('./internalizer');
const capabilityAbstractor = require('./capability-abstractor');

class Merger {
  constructor() {
    this.mergedCapabilities = [];
    this.mergerHistory = [];
  }

  // 合并能力
  mergeCapabilities(capabilityIds) {
    console.log('Merging capabilities:', capabilityIds);
    
    // 获取要合并的能力
    const capabilities = capabilityIds.map(id => {
      // 尝试从不同来源获取能力
      let cap = internalizer.getInternalizedCapability(id);
      if (!cap) {
        cap = capabilityAbstractor.getAbstractedCapability(id);
      }
      return cap;
    }).filter(cap => cap);

    if (capabilities.length < 2) {
      throw new Error('At least 2 capabilities are required for merging');
    }

    // 分析能力相似度
    const similarity = this.analyzeSimilarity(capabilities);
    if (similarity < 0.5) {
      throw new Error('Capabilities are not similar enough to merge');
    }

    // 创建合并后的能力
    const mergedCapability = this.createMergedCapability(capabilities, similarity);
    
    // 记录合并历史
    this.recordMergerHistory(capabilities, mergedCapability, similarity);
    
    // 标记原能力为已合并
    this.markCapabilitiesMerged(capabilityIds);
    
    return mergedCapability;
  }

  // 分析能力相似度
  analyzeSimilarity(capabilities) {
    let totalSimilarity = 0;
    let comparisonCount = 0;

    // 两两比较能力
    for (let i = 0; i < capabilities.length; i++) {
      for (let j = i + 1; j < capabilities.length; j++) {
        const similarity = this.calculateSimilarity(capabilities[i], capabilities[j]);
        totalSimilarity += similarity;
        comparisonCount++;
      }
    }

    return comparisonCount > 0 ? totalSimilarity / comparisonCount : 0;
  }

  // 计算两个能力的相似度
  calculateSimilarity(cap1, cap2) {
    let similarity = 0;
    let totalWeight = 0;

    // 名称相似度 (权重 0.3)
    const nameSimilarity = this.calculateStringSimilarity(cap1.name, cap2.name);
    similarity += nameSimilarity * 0.3;
    totalWeight += 0.3;

    // 描述相似度 (权重 0.2)
    if (cap1.description && cap2.description) {
      const descSimilarity = this.calculateStringSimilarity(cap1.description, cap2.description);
      similarity += descSimilarity * 0.2;
      totalWeight += 0.2;
    }

    // 输入相似度 (权重 0.2)
    if (cap1.inputs && cap2.inputs) {
      const inputSimilarity = this.calculateArraySimilarity(cap1.inputs, cap2.inputs);
      similarity += inputSimilarity * 0.2;
      totalWeight += 0.2;
    }

    // 输出相似度 (权重 0.2)
    if (cap1.outputs && cap2.outputs) {
      const outputSimilarity = this.calculateArraySimilarity(cap1.outputs, cap2.outputs);
      similarity += outputSimilarity * 0.2;
      totalWeight += 0.2;
    }

    // 层级相似度 (权重 0.1)
    if (cap1.level && cap2.level) {
      const levelSimilarity = cap1.level === cap2.level ? 1 : 0;
      similarity += levelSimilarity * 0.1;
      totalWeight += 0.1;
    }

    return totalWeight > 0 ? similarity / totalWeight : 0;
  }

  // 计算字符串相似度
  calculateStringSimilarity(str1, str2) {
    if (!str1 || !str2) return 0;
    
    const longer = str1.length > str2.length ? str1 : str2;
    const shorter = str1.length > str2.length ? str2 : str1;
    const longerLength = longer.length;
    
    if (longerLength === 0) return 1.0;
    
    return (longerLength - this.levenshteinDistance(longer, shorter)) / parseFloat(longerLength);
  }

  // 计算编辑距离
  levenshteinDistance(str1, str2) {
    const matrix = [];
    
    for (let i = 0; i <= str2.length; i++) {
      matrix[i] = [i];
    }
    
    for (let j = 0; j <= str1.length; j++) {
      matrix[0][j] = j;
    }
    
    for (let i = 1; i <= str2.length; i++) {
      for (let j = 1; j <= str1.length; j++) {
        if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }
    
    return matrix[str2.length][str1.length];
  }

  // 计算数组相似度
  calculateArraySimilarity(arr1, arr2) {
    if (!arr1 || !arr2) return 0;
    
    const intersection = arr1.filter(value => arr2.includes(value));
    const union = [...new Set([...arr1, ...arr2])];
    
    return union.length > 0 ? intersection.length / union.length : 0;
  }

  // 创建合并后的能力
  createMergedCapability(capabilities, similarity) {
    // 提取共同特征
    const commonName = this.extractCommonName(capabilities);
    const commonDescription = this.extractCommonDescription(capabilities);
    const mergedInputs = this.mergeArrays(capabilities.map(c => c.inputs).filter(Boolean));
    const mergedOutputs = this.mergeArrays(capabilities.map(c => c.outputs).filter(Boolean));
    const mergedPrerequisites = this.mergeArrays(capabilities.map(c => c.prerequisites).filter(Boolean));
    const mergedFailureBoundaries = this.mergeArrays(capabilities.map(c => c.failureBoundaries).filter(Boolean));
    const mergedLevel = this.determineMergedLevel(capabilities);

    return {
      id: `cap_merged_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: commonName,
      description: commonDescription,
      inputs: mergedInputs,
      outputs: mergedOutputs,
      prerequisites: mergedPrerequisites,
      failureBoundaries: mergedFailureBoundaries,
      level: mergedLevel,
      sourceIds: capabilities.map(c => c.id),
      similarity,
      timestamp: Date.now(),
      status: 'active',
      usageCount: capabilities.reduce((sum, c) => sum + (c.usageCount || 0), 0)
    };
  }

  // 提取共同名称
  extractCommonName(capabilities) {
    const names = capabilities.map(c => c.name);
    
    // 找出最长公共子串
    let longestCommon = '';
    for (let i = 0; i < names[0].length; i++) {
      for (let j = i + 1; j <= names[0].length; j++) {
        const substring = names[0].substring(i, j);
        if (names.every(name => name.includes(substring)) && substring.length > longestCommon.length) {
          longestCommon = substring;
        }
      }
    }

    return longestCommon || '合并能力';
  }

  // 提取共同描述
  extractCommonDescription(capabilities) {
    const descriptions = capabilities.map(c => c.description).filter(Boolean);
    if (descriptions.length === 0) return '合并后的能力';

    // 找出最常见的描述
    const descriptionCounts = descriptions.reduce((acc, desc) => {
      acc[desc] = (acc[desc] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(descriptionCounts).reduce((a, b) => 
      descriptionCounts[a] > descriptionCounts[b] ? a : b
    );
  }

  // 合并数组
  mergeArrays(arrays) {
    const merged = new Set();
    arrays.forEach(arr => {
      arr.forEach(item => merged.add(item));
    });
    return Array.from(merged);
  }

  // 确定合并后的能力层级
  determineMergedLevel(capabilities) {
    // 取最高层级
    return Math.max(...capabilities.map(c => c.level || 1));
  }

  // 记录合并历史
  recordMergerHistory(sourceCapabilities, mergedCapability, similarity) {
    const historyEntry = {
      id: `merger_${Date.now()}`,
      sourceIds: sourceCapabilities.map(c => c.id),
      mergedId: mergedCapability.id,
      similarity,
      timestamp: Date.now(),
      metadata: {
        sourceCount: sourceCapabilities.length,
        mergedLevel: mergedCapability.level
      }
    };

    this.mergerHistory.push(historyEntry);
    
    // 保存到文件
    this.saveMergerHistory();
  }

  // 保存合并历史
  saveMergerHistory() {
    const historyPath = path.join(__dirname, '..', 'data', 'merger-history.json');
    fs.writeFileSync(historyPath, JSON.stringify({
      history: this.mergerHistory,
      lastUpdated: Date.now()
    }, null, 2));
  }

  // 标记能力为已合并
  markCapabilitiesMerged(capabilityIds) {
    capabilityIds.forEach(id => {
      // 尝试从不同来源标记
      internalizer.updateStatus(id, 'merged');
    });
  }

  // 查找可合并的能力
  findMergeCandidates() {
    const allCapabilities = [
      ...internalizer.getInternalizedCapabilities(),
      ...capabilityAbstractor.getAbstractedCapabilities()
    ];

    const candidates = [];

    // 两两比较寻找可合并的能力
    for (let i = 0; i < allCapabilities.length; i++) {
      for (let j = i + 1; j < allCapabilities.length; j++) {
        const similarity = this.calculateSimilarity(allCapabilities[i], allCapabilities[j]);
        if (similarity >= 0.5) {
          candidates.push({
            capabilities: [allCapabilities[i], allCapabilities[j]],
            similarity,
            ids: [allCapabilities[i].id, allCapabilities[j].id]
          });
        }
      }
    }

    // 按相似度排序
    candidates.sort((a, b) => b.similarity - a.similarity);
    
    return candidates;
  }

  // 获取合并历史
  getMergerHistory() {
    return this.mergerHistory;
  }

  // 获取合并统计
  getMergerStatistics() {
    return {
      totalMergers: this.mergerHistory.length,
      mergedCapabilities: this.mergedCapabilities.length,
      averageSimilarity: this.mergerHistory.length > 0 ?
        this.mergerHistory.reduce((sum, h) => sum + h.similarity, 0) / this.mergerHistory.length : 0
    };
  }
}

// 导出单例实例
const merger = new Merger();

module.exports = merger;
