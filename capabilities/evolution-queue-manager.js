/**
 * 进化队列管理器
 * 基于价值函数的能力进化队列管理
 */

const { valueFunction } = require('./value-function');
const { getADLInstance } = require('../skills/adl-core');

class EvolutionQueueManager {
  constructor() {
    this.queue = [];
    this.processedCapabilities = new Set();
    this.adlInstance = getADLInstance();
  }

  // 添加能力到进化队列
  addToQueue(capability) {
    if (!capability || !capability.id) {
      return {
        success: false,
        error: '无效的能力对象'
      };
    }

    if (this.processedCapabilities.has(capability.id)) {
      return {
        success: false,
        error: '能力已经在处理队列中'
      };
    }

    // 评估能力价值
    const evaluation = valueFunction.evaluateCapability(capability);

    // 检查是否为低价值能力
    if (evaluation.isLowValue || evaluation.score < 0.3) {
      return {
        success: false,
        error: '低价值能力，不加入进化队列',
        evaluation: evaluation
      };
    }

    // ADL验证
    const adlValidation = this.adlInstance.validateCapability(capability);
    if (!adlValidation.isValid) {
      return {
        success: false,
        error: `ADL验证失败: ${adlValidation.violations.join('; ')}`,
        adlValidation: adlValidation
      };
    }

    // 添加到队列
    const queueItem = {
      id: capability.id,
      capability: capability,
      evaluation: evaluation,
      adlValidation: adlValidation,
      addedAt: Date.now(),
      priority: evaluation.score
    };

    this.queue.push(queueItem);
    this.processedCapabilities.add(capability.id);

    // 重新排序队列
    this._sortQueue();

    return {
      success: true,
      queueItem: queueItem,
      queueLength: this.queue.length
    };
  }

  // 批量添加能力到进化队列
  batchAddToQueue(capabilities) {
    const results = [];

    for (const capability of capabilities) {
      const result = this.addToQueue(capability);
      results.push(result);
    }

    return {
      results: results,
      successCount: results.filter(r => r.success).length,
      failureCount: results.filter(r => !r.success).length
    };
  }

  // 获取进化队列
  getQueue() {
    return this.queue;
  }

  // 获取下一个要进化的能力
  getNextCapability() {
    if (this.queue.length === 0) {
      return null;
    }

    // 按优先级排序（价值评分降序）
    this._sortQueue();

    return this.queue[0];
  }

  // 处理下一个能力
  processNextCapability() {
    const nextItem = this.getNextCapability();
    if (!nextItem) {
      return {
        success: false,
        error: '进化队列为空'
      };
    }

    // 从队列中移除
    this.queue.shift();
    this.processedCapabilities.delete(nextItem.id);

    return {
      success: true,
      capability: nextItem.capability,
      evaluation: nextItem.evaluation,
      remainingQueueLength: this.queue.length
    };
  }

  // 过滤低价值能力
  filterLowValueCapabilities(capabilities) {
    const highValueCapabilities = [];
    const lowValueCapabilities = [];

    for (const capability of capabilities) {
      const evaluation = valueFunction.evaluateCapability(capability);
      
      if (evaluation.isLowValue || evaluation.score < 0.3) {
        lowValueCapabilities.push({
          capability: capability,
          evaluation: evaluation,
          reason: '低价值能力'
        });
      } else {
        highValueCapabilities.push({
          capability: capability,
          evaluation: evaluation
        });
      }
    }

    return {
      highValueCapabilities: highValueCapabilities,
      lowValueCapabilities: lowValueCapabilities,
      highValueCount: highValueCapabilities.length,
      lowValueCount: lowValueCapabilities.length
    };
  }

  // 清空队列
  clearQueue() {
    this.queue = [];
    this.processedCapabilities.clear();
    return {
      success: true,
      message: '进化队列已清空'
    };
  }

  // 获取队列状态
  getStatus() {
    const highValueCount = this.queue.filter(item => item.evaluation.score >= 0.6).length;
    const mediumValueCount = this.queue.filter(item => item.evaluation.score >= 0.3 && item.evaluation.score < 0.6).length;
    const lowValueCount = this.queue.filter(item => item.evaluation.score < 0.3).length;

    return {
      totalItems: this.queue.length,
      highValueCount: highValueCount,
      mediumValueCount: mediumValueCount,
      lowValueCount: lowValueCount,
      averageScore: this.queue.length > 0 ? 
        this.queue.reduce((sum, item) => sum + item.evaluation.score, 0) / this.queue.length : 0,
      oldestItemAge: this.queue.length > 0 ? 
        Date.now() - Math.min(...this.queue.map(item => item.addedAt)) : 0
    };
  }

  // 排序队列
  _sortQueue() {
    this.queue.sort((a, b) => {
      // 首先按优先级（价值评分）排序
      if (b.priority !== a.priority) {
        return b.priority - a.priority;
      }
      // 其次按添加时间排序（先到先处理）
      return a.addedAt - b.addedAt;
    });
  }

  // 生成队列报告
  generateQueueReport() {
    const status = this.getStatus();
    const topCapabilities = this.queue
      .slice(0, 10)
      .map(item => ({
        id: item.id,
        name: item.capability.name,
        score: item.evaluation.score,
        priority: item.priority,
        addedAt: item.addedAt
      }));

    return {
      id: `queue_report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      status: status,
      topCapabilities: topCapabilities,
      queueLength: this.queue.length,
      valueFunctionWeights: valueFunction.getCurrentWeights()
    };
  }

  // 从能力树获取能力并添加到队列
  async populateFromCapabilityTree(capabilityTree) {
    const allNodes = capabilityTree.getAllNodes().filter(node => node.level > 0);
    const results = [];

    for (const node of allNodes) {
      const result = this.addToQueue(node);
      results.push({
        nodeId: node.id,
        nodeName: node.name,
        ...result
      });
    }

    return {
      totalCapabilities: allNodes.length,
      addedToQueue: results.filter(r => r.success).length,
      rejected: results.filter(r => !r.success).length,
      results: results
    };
  }
}

// 导出单例实例
const evolutionQueueManager = new EvolutionQueueManager();

module.exports = {
  EvolutionQueueManager,
  evolutionQueueManager
};