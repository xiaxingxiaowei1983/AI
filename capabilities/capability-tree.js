/**
 * 能力树（Capability Tree）核心实现
 * 用于管理智能体的能力体系，支持能力的生长、修剪和质量评估
 * 状态: ACTIVE (已激活) 优先级: LEVEL1 (核心系统)
 */

class CapabilityNode {
  constructor(name, level, parent = null, details = {}) {
    this.id = `cap_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    this.name = name;           // 能力名称（做什么）
    this.level = level;         // 层级：1=低层（基础操作），2=中层（可复用流程），3=高层（问题分解）
    this.parent = parent;       // 父节点
    this.children = [];         // 子节点
    this.inputs = details.inputs || [];           // 输入条件
    this.outputs = details.outputs || [];          // 输出结果
    this.prerequisites = details.prerequisites || [];    // 成功前提
    this.failureBoundaries = details.failureBoundaries || []; // 失败边界
    this.usageCount = details.usageCount || 0;        // 使用次数
    this.lastUsed = details.lastUsed || null;       // 最后使用时间
    this.status = details.status || 'ACTIVE';     // 状态：ACTIVE, CANDIDATE_TRIM, DISABLED
    this.createdAt = Date.now();
    this.updatedAt = Date.now();
    // 新增字段
    this.type = details.type || 'general';         // 能力类型
    this.valueScore = details.valueScore || 0;     // 价值评分
    this.keywords = details.keywords || [];        // 关键词
    this.description = details.description || '';  // 详细描述
  }

  // 更新节点信息
  update(details) {
    Object.assign(this, details);
    this.updatedAt = Date.now();
  }

  // 标记节点使用
  markUsed() {
    this.usageCount++;
    this.lastUsed = Date.now();
    this.updatedAt = Date.now();
  }

  // 添加子节点
  addChild(child) {
    this.children.push(child);
    child.parent = this;
    this.updatedAt = Date.now();
  }

  // 移除子节点
  removeChild(childId) {
    const index = this.children.findIndex(child => child.id === childId);
    if (index > -1) {
      this.children.splice(index, 1);
      this.updatedAt = Date.now();
      return true;
    }
    return false;
  }

  // 检查是否为叶节点
  isLeaf() {
    return this.children.length === 0;
  }

  // 检查是否为根节点
  isRoot() {
    return this.parent === null;
  }

  // 获取节点路径
  getPath() {
    const path = [];
    let current = this;
    while (current) {
      path.unshift(current.name);
      current = current.parent;
    }
    return path;
  }

  // 序列化节点
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      level: this.level,
      parentId: this.parent?.id || null,
      children: this.children.map(child => child.toJSON()),
      inputs: this.inputs,
      outputs: this.outputs,
      prerequisites: this.prerequisites,
      failureBoundaries: this.failureBoundaries,
      usageCount: this.usageCount,
      lastUsed: this.lastUsed,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      type: this.type,
      valueScore: this.valueScore,
      keywords: this.keywords,
      description: this.description
    };
  }

  // 从JSON反序列化
  static fromJSON(data, parent = null) {
    const node = new CapabilityNode(data.name, data.level, parent, {
      inputs: data.inputs,
      outputs: data.outputs,
      prerequisites: data.prerequisites,
      failureBoundaries: data.failureBoundaries,
      usageCount: data.usageCount,
      lastUsed: data.lastUsed,
      status: data.status,
      type: data.type,
      valueScore: data.valueScore,
      keywords: data.keywords,
      description: data.description
    });
    node.id = data.id;
    node.createdAt = data.createdAt;
    node.updatedAt = data.updatedAt;
    
    if (data.children && data.children.length > 0) {
      for (const childData of data.children) {
        const childNode = CapabilityNode.fromJSON(childData, node);
        node.children.push(childNode);
      }
    }
    
    return node;
  }
}

class CapabilityTree {
  constructor() {
    this.root = new CapabilityNode('能力树根部', 0);
    this.nodeMap = new Map(); // 快速查找节点
    this.nodeMap.set(this.root.id, this.root);
    this.evaluationHistory = []; // 评估历史
    this.statistics = {
      totalNodes: 1,
      activeNodes: 1,
      nodesByLevel: { 0: 1, 1: 0, 2: 0, 3: 0 },
      nodesByType: {},
      usageStats: {}
    };
    this._initializeDefaultNodes();
    this._updateStatistics();
  }

  // 初始化默认节点
  _initializeDefaultNodes() {
    // 低层节点（基础操作）
    const fileOps = this.addNode('文件操作', 1, this.root.id, {
      inputs: ['文件路径', '操作类型', '操作参数'],
      outputs: ['操作结果', '错误信息'],
      prerequisites: ['文件存在', '权限足够'],
      failureBoundaries: ['文件不存在', '权限不足', '磁盘空间不足'],
      type: 'basic',
      keywords: ['文件', '读写', '创建', '删除'],
      description: '处理文件读写、创建、删除等操作'
    });

    const networkOps = this.addNode('网络请求', 1, this.root.id, {
      inputs: ['URL', '请求方法', '请求参数'],
      outputs: ['响应数据', '状态码', '错误信息'],
      prerequisites: ['网络连接正常', 'URL有效'],
      failureBoundaries: ['网络连接失败', '请求超时', '服务器错误'],
      type: 'basic',
      keywords: ['HTTP', 'API', '网络', '请求'],
      description: '处理HTTP请求、API调用等网络操作'
    });

    const dataOps = this.addNode('数据处理', 1, this.root.id, {
      inputs: ['原始数据', '处理类型', '处理参数'],
      outputs: ['处理后数据', '处理结果'],
      prerequisites: ['数据格式正确', '处理参数有效'],
      failureBoundaries: ['数据格式错误', '处理参数无效', '处理超时'],
      type: 'basic',
      keywords: ['数据', '转换', '分析', '计算'],
      description: '处理数据转换、分析、计算等操作'
    });

    const cacheOps = this.addNode('缓存管理', 1, this.root.id, {
      inputs: ['缓存键', '缓存值', '缓存配置'],
      outputs: ['缓存结果', '缓存状态'],
      prerequisites: ['缓存系统可用', '缓存配置有效'],
      failureBoundaries: ['缓存系统不可用', '缓存容量不足', '缓存过期'],
      type: 'basic',
      keywords: ['缓存', '热点信息', '性能', '响应速度'],
      description: '管理热点信息缓存、提升响应速度'
    });

    // 中层节点（可复用流程）
    const pcecProcess = this.addNode('PCEC进化流程', 2, this.root.id, {
      inputs: ['进化周期', '进化目标', '进化参数'],
      outputs: ['进化结果', '进化报告', '能力更新'],
      prerequisites: ['系统空闲', '进化参数有效'],
      failureBoundaries: ['系统繁忙', '进化参数无效', '进化失败'],
      type: 'process',
      keywords: ['PCEC', '进化', '周期', '认知扩展'],
      description: '管理周期性认知扩展循环'
    });

    const hotInfoMgmt = this.addNode('热点信息管理', 2, this.root.id, {
      inputs: ['信息源', '更新频率', '过滤条件'],
      outputs: ['热点信息', '更新状态', '缓存结果'],
      prerequisites: ['信息源可用', '更新频率合理'],
      failureBoundaries: ['信息源不可用', '更新频率过高', '过滤条件无效'],
      type: 'process',
      keywords: ['热点信息', '缓存', '更新', '管理'],
      description: '管理系统热点信息的收集和更新'
    });

    const reportGen = this.addNode('报告生成', 2, this.root.id, {
      inputs: ['报告类型', '报告参数', '数据来源'],
      outputs: ['报告内容', '报告格式', '生成状态'],
      prerequisites: ['数据来源可用', '报告参数有效'],
      failureBoundaries: ['数据来源不可用', '报告参数无效', '生成失败'],
      type: 'process',
      keywords: ['报告', '生成', '格式', '数据'],
      description: '生成系统状态报告、进化报告等'
    });

    // 高层节点（问题分解）
    const businessAnalysis = this.addNode('商业分析', 3, this.root.id, {
      inputs: ['业务数据', '分析维度', '分析目标'],
      outputs: ['分析结果', '洞察建议', '决策支持'],
      prerequisites: ['业务数据完整', '分析维度合理'],
      failureBoundaries: ['业务数据不完整', '分析维度不合理', '分析失败'],
      type: 'strategy',
      keywords: ['商业', '分析', '洞察', '决策'],
      description: '分析业务数据、生成洞察建议'
    });

    const techDesign = this.addNode('技术架构设计', 3, this.root.id, {
      inputs: ['系统需求', '技术约束', '设计目标'],
      outputs: ['架构方案', '技术选型', '实施计划'],
      prerequisites: ['系统需求明确', '技术约束清晰'],
      failureBoundaries: ['系统需求不明确', '技术约束不清晰', '设计失败'],
      type: 'strategy',
      keywords: ['技术', '架构', '设计', '选型'],
      description: '设计系统架构、技术选型'
    });

    const resourceOpt = this.addNode('资源优化', 3, this.root.id, {
      inputs: ['资源类型', '使用情况', '优化目标'],
      outputs: ['优化方案', '预期效果', '实施步骤'],
      prerequisites: ['资源使用数据完整', '优化目标明确'],
      failureBoundaries: ['资源使用数据不完整', '优化目标不明确', '优化失败'],
      type: 'strategy',
      keywords: ['资源', '优化', '效率', '分配'],
      description: '优化系统资源分配、提升效率'
    });
  }

  // 添加节点
  addNode(name, level, parentId, details = {}) {
    const parent = this.nodeMap.get(parentId);
    if (!parent) {
      throw new Error(`父节点不存在: ${parentId}`);
    }

    if (level <= parent.level) {
      throw new Error(`子节点层级必须大于父节点层级`);
    }

    const node = new CapabilityNode(name, level, parent, details);
    parent.addChild(node);
    this.nodeMap.set(node.id, node);
    this._updateStatistics();
    return node;
  }

  // 删除节点
  removeNode(nodeId) {
    const node = this.nodeMap.get(nodeId);
    if (!node) {
      throw new Error(`节点不存在: ${nodeId}`);
    }

    if (node.isRoot()) {
      throw new Error('不能删除根节点');
    }

    // 递归删除子节点
    const nodesToRemove = this._getAllDescendants(node);
    nodesToRemove.push(node);

    for (const n of nodesToRemove) {
      this.nodeMap.delete(n.id);
      if (n.parent) {
        n.parent.removeChild(n.id);
      }
    }

    this._updateStatistics();
    return true;
  }

  // 获取所有后代节点
  _getAllDescendants(node) {
    const descendants = [];
    const stack = [...node.children];

    while (stack.length > 0) {
      const current = stack.pop();
      descendants.push(current);
      stack.push(...current.children);
    }

    return descendants;
  }

  // 更新节点
  updateNode(nodeId, details) {
    const node = this.nodeMap.get(nodeId);
    if (!node) {
      throw new Error(`节点不存在: ${nodeId}`);
    }

    node.update(details);
    this._updateStatistics();
    return node;
  }

  // 标记节点使用
  markNodeUsed(nodeId) {
    const node = this.nodeMap.get(nodeId);
    if (!node) {
      throw new Error(`节点不存在: ${nodeId}`);
    }

    node.markUsed();
    this._updateStatistics();
    return node;
  }

  // 定位任务路径
  locateTaskPath(taskDescription) {
    const paths = [];
    const visited = new Set();
    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();
      if (visited.has(current.id)) continue;
      visited.add(current.id);

      // 检查当前节点是否与任务相关
      if (this._isNodeRelevant(current, taskDescription)) {
        const path = current.getPath();
        paths.push({
          path: path,
          node: current,
          relevance: this._calculateRelevance(current, taskDescription),
          usageCount: current.usageCount,
          lastUsed: current.lastUsed
        });
      }

      // 继续搜索子节点
      queue.push(...current.children);
    }

    // 按相关性和使用频率排序
    paths.sort((a, b) => {
      if (a.relevance !== b.relevance) {
        return b.relevance - a.relevance;
      }
      return b.usageCount - a.usageCount;
    });

    return paths;
  }

  // 检查节点是否与任务相关
  _isNodeRelevant(node, taskDescription) {
    const lowerTask = taskDescription.toLowerCase();
    const lowerName = node.name.toLowerCase();
    const lowerDesc = (node.description || '').toLowerCase();

    // 检查名称和描述
    if (lowerName.includes(lowerTask) || lowerDesc.includes(lowerTask)) {
      return true;
    }

    // 检查关键词
    for (const keyword of node.keywords) {
      if (lowerTask.includes(keyword.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  // 计算相关性分数
  _calculateRelevance(node, taskDescription) {
    let score = 0;
    const lowerTask = taskDescription.toLowerCase();

    // 名称匹配
    if (node.name.toLowerCase().includes(lowerTask)) {
      score += 5;
    }

    // 描述匹配
    if ((node.description || '').toLowerCase().includes(lowerTask)) {
      score += 3;
    }

    // 关键词匹配
    for (const keyword of node.keywords) {
      if (lowerTask.includes(keyword.toLowerCase())) {
        score += 2;
      }
    }

    // 使用频率加分
    score += Math.min(node.usageCount, 5);

    return score;
  }

  // 能力修剪
  trimCapabilities(daysThreshold = 30, usageThreshold = 5) {
    const candidates = [];
    const now = Date.now();
    const thresholdTime = now - (daysThreshold * 24 * 60 * 60 * 1000);

    for (const node of this.nodeMap.values()) {
      if (node.isRoot()) continue;

      // 检查是否长期未使用且使用次数较少
      if (node.lastUsed < thresholdTime && node.usageCount < usageThreshold) {
        candidates.push({
          node,
          daysUnused: Math.floor((now - node.lastUsed) / (24 * 60 * 60 * 1000)),
          usageCount: node.usageCount,
          valueScore: node.valueScore
        });

        // 标记为候选修剪
        node.status = 'CANDIDATE_TRIM';
      }
    }

    // 按价值评分和使用次数排序（优先保留高价值、高使用的节点）
    candidates.sort((a, b) => {
      if (a.valueScore !== b.valueScore) {
        return b.valueScore - a.valueScore;
      }
      return b.usageCount - a.usageCount;
    });

    this._updateStatistics();
    return candidates;
  }

  // 清理标记为修剪的节点
  cleanupTrimmedNodes() {
    const removedNodes = [];
    const nodesToRemove = [];

    for (const node of this.nodeMap.values()) {
      if (node.status === 'CANDIDATE_TRIM' && !node.isRoot()) {
        nodesToRemove.push(node);
      }
    }

    for (const node of nodesToRemove) {
      this.removeNode(node.id);
      removedNodes.push({
        id: node.id,
        name: node.name,
        level: node.level,
        usageCount: node.usageCount,
        lastUsed: node.lastUsed
      });
    }

    this._updateStatistics();
    return removedNodes;
  }

  // 评估能力树质量
  evaluateTreeQuality() {
    const now = Date.now();
    const evaluation = {
      timestamp: now,
      totalNodes: this.statistics.totalNodes,
      activeNodes: this.statistics.activeNodes,
      nodesByLevel: this.statistics.nodesByLevel,
      balanceScore: this._calculateBalanceScore(),
      usageEfficiency: this._calculateUsageEfficiency(),
      nodeCompleteness: this._calculateNodeCompleteness(),
      healthScore: 0,
      recommendations: []
    };

    // 计算健康评分
    evaluation.healthScore = (
      evaluation.balanceScore * 0.3 +
      evaluation.usageEfficiency * 0.4 +
      evaluation.nodeCompleteness * 0.3
    );

    // 生成建议
    if (evaluation.balanceScore < 0.6) {
      evaluation.recommendations.push('能力树层级分布不平衡，建议调整各层级节点数量');
    }

    if (evaluation.usageEfficiency < 0.5) {
      evaluation.recommendations.push('能力使用效率低，建议优化高频能力，修剪低频能力');
    }

    if (evaluation.nodeCompleteness < 0.7) {
      evaluation.recommendations.push('部分能力节点信息不完整，建议补充输入、输出、前提条件和失败边界');
    }

    if (evaluation.healthScore < 0.6) {
      evaluation.recommendations.push('能力树健康度低，建议进行全面优化');
    }

    // 记录评估历史
    this.evaluationHistory.push(evaluation);
    if (this.evaluationHistory.length > 100) {
      this.evaluationHistory = this.evaluationHistory.slice(-100);
    }

    return evaluation;
  }

  // 计算层级平衡分数
  _calculateBalanceScore() {
    const totalNonRoot = this.statistics.totalNodes - 1;
    if (totalNonRoot === 0) return 1;

    const level1 = this.statistics.nodesByLevel[1] || 0;
    const level2 = this.statistics.nodesByLevel[2] || 0;
    const level3 = this.statistics.nodesByLevel[3] || 0;

    // 理想分布：低层 50%，中层 30%，高层 20%
    const ideal1 = totalNonRoot * 0.5;
    const ideal2 = totalNonRoot * 0.3;
    const ideal3 = totalNonRoot * 0.2;

    const diff1 = Math.abs(level1 - ideal1) / ideal1 || 0;
    const diff2 = Math.abs(level2 - ideal2) / ideal2 || 0;
    const diff3 = Math.abs(level3 - ideal3) / ideal3 || 0;

    const balance = 1 - (diff1 + diff2 + diff3) / 3;
    return Math.max(0, Math.min(1, balance));
  }

  // 计算使用效率
  _calculateUsageEfficiency() {
    let totalUsage = 0;
    let activeNodes = 0;

    for (const node of this.nodeMap.values()) {
      if (!node.isRoot() && node.usageCount > 0) {
        totalUsage += node.usageCount;
        activeNodes++;
      }
    }

    if (activeNodes === 0) return 0;

    const avgUsage = totalUsage / activeNodes;
    const efficiency = Math.min(avgUsage / 10, 1); // 假设平均使用10次为满分
    return efficiency;
  }

  // 计算节点完整性
  _calculateNodeCompleteness() {
    let completeNodes = 0;
    let totalNodes = 0;

    for (const node of this.nodeMap.values()) {
      if (node.isRoot()) continue;

      totalNodes++;
      const isComplete = (
        node.inputs.length > 0 &&
        node.outputs.length > 0 &&
        node.prerequisites.length > 0 &&
        node.failureBoundaries.length > 0 &&
        node.description.length > 0
      );

      if (isComplete) {
        completeNodes++;
      }
    }

    return totalNodes > 0 ? completeNodes / totalNodes : 1;
  }

  // 更新统计信息
  _updateStatistics() {
    const stats = {
      totalNodes: 0,
      activeNodes: 0,
      nodesByLevel: { 0: 0, 1: 0, 2: 0, 3: 0 },
      nodesByType: {},
      usageStats: {}
    };

    let totalUsage = 0;
    let maxUsage = 0;

    for (const node of this.nodeMap.values()) {
      stats.totalNodes++;
      if (node.status === 'ACTIVE') {
        stats.activeNodes++;
      }

      stats.nodesByLevel[node.level] = (stats.nodesByLevel[node.level] || 0) + 1;
      stats.nodesByType[node.type] = (stats.nodesByType[node.type] || 0) + 1;

      totalUsage += node.usageCount;
      maxUsage = Math.max(maxUsage, node.usageCount);
    }

    stats.usageStats = {
      totalUsage,
      averageUsage: stats.totalNodes > 0 ? totalUsage / stats.totalNodes : 0,
      maxUsage,
      activeUsageNodes: Array.from(this.nodeMap.values()).filter(n => n.usageCount > 0).length
    };

    this.statistics = stats;
  }

  // 获取节点
  getNode(nodeId) {
    return this.nodeMap.get(nodeId);
  }

  // 获取所有节点
  getAllNodes() {
    return Array.from(this.nodeMap.values());
  }

  // 获取能力树状态
  getStatus() {
    return {
      timestamp: Date.now(),
      statistics: this.statistics,
      evaluation: this.evaluateTreeQuality(),
      lastEvaluation: this.evaluationHistory.length > 0 ? this.evaluationHistory[this.evaluationHistory.length - 1] : null
    };
  }

  // 导出能力树
  exportTree() {
    return {
      version: '1.0.0',
      timestamp: Date.now(),
      root: this.root.toJSON(),
      statistics: this.statistics,
      evaluationHistory: this.evaluationHistory.slice(-10) // 只导出最近10次评估
    };
  }

  // 导入能力树
  importTree(data) {
    if (!data || !data.root) {
      throw new Error('无效的能力树数据');
    }

    // 清空现有数据
    this.root = CapabilityNode.fromJSON(data.root);
    this.nodeMap.clear();
    this._buildNodeMap(this.root);
    this.evaluationHistory = data.evaluationHistory || [];
    this.statistics = data.statistics || this.statistics;

    this._updateStatistics();
    return this;
  }

  // 构建节点映射
  _buildNodeMap(node) {
    this.nodeMap.set(node.id, node);
    for (const child of node.children) {
      this._buildNodeMap(child);
    }
  }

  // 可视化能力树
  visualizeTree() {
    const visualization = {
      nodes: [],
      links: []
    };

    const stack = [this.root];
    while (stack.length > 0) {
      const node = stack.pop();
      
      visualization.nodes.push({
        id: node.id,
        name: node.name,
        level: node.level,
        type: node.type,
        status: node.status,
        usageCount: node.usageCount,
        valueScore: node.valueScore,
        childrenCount: node.children.length
      });

      for (const child of node.children) {
        visualization.links.push({
          source: node.id,
          target: child.id,
          relationship: 'parent-child'
        });
        stack.push(child);
      }
    }

    return visualization;
  }

  // 分析能力使用情况
  analyzeUsagePatterns() {
    const now = Date.now();
    const usagePatterns = {
      timestamp: now,
      totalUsage: this.statistics.usageStats.totalUsage,
      averageUsage: this.statistics.usageStats.averageUsage,
      topUsedNodes: [],
      unusedNodes: [],
      recentlyUsedNodes: [],
      usageByLevel: {},
      usageByType: {}
    };

    // 按使用次数排序
    const sortedNodes = Array.from(this.nodeMap.values())
      .filter(n => !n.isRoot())
      .sort((a, b) => b.usageCount - a.usageCount);

    // 最常用节点
    usagePatterns.topUsedNodes = sortedNodes.slice(0, 10).map(n => ({
      id: n.id,
      name: n.name,
      level: n.level,
      usageCount: n.usageCount,
      lastUsed: n.lastUsed
    }));

    // 未使用节点
    usagePatterns.unusedNodes = sortedNodes.filter(n => n.usageCount === 0).map(n => ({
      id: n.id,
      name: n.name,
      level: n.level,
      createdAt: n.createdAt
    }));

    // 最近使用节点
    const recentThreshold = now - (7 * 24 * 60 * 60 * 1000); // 最近7天
    usagePatterns.recentlyUsedNodes = sortedNodes
      .filter(n => n.lastUsed && n.lastUsed > recentThreshold)
      .slice(0, 10)
      .map(n => ({
        id: n.id,
        name: n.name,
        level: n.level,
        usageCount: n.usageCount,
        lastUsed: n.lastUsed
      }));

    // 按层级统计使用情况
    for (const node of this.nodeMap.values()) {
      if (node.isRoot()) continue;
      usagePatterns.usageByLevel[node.level] = (usagePatterns.usageByLevel[node.level] || 0) + node.usageCount;
      usagePatterns.usageByType[node.type] = (usagePatterns.usageByType[node.type] || 0) + node.usageCount;
    }

    return usagePatterns;
  }
}

// 导出单例实例
const capabilityTree = new CapabilityTree();

module.exports = {
  CapabilityNode,
  CapabilityTree,
  capabilityTree,
  // 工具接口
  addNode: (name, level, parentId, details) => {
    return capabilityTree.addNode(name, level, parentId, details);
  },
  removeNode: (nodeId) => {
    return capabilityTree.removeNode(nodeId);
  },
  updateNode: (nodeId, details) => {
    return capabilityTree.updateNode(nodeId, details);
  },
  markNodeUsed: (nodeId) => {
    return capabilityTree.markNodeUsed(nodeId);
  },
  locateTaskPath: (taskDescription) => {
    return capabilityTree.locateTaskPath(taskDescription);
  },
  trimCapabilities: (daysThreshold, usageThreshold) => {
    return capabilityTree.trimCapabilities(daysThreshold, usageThreshold);
  },
  cleanupTrimmedNodes: () => {
    return capabilityTree.cleanupTrimmedNodes();
  },
  evaluateTreeQuality: () => {
    return capabilityTree.evaluateTreeQuality();
  },
  getStatus: () => {
    return capabilityTree.getStatus();
  },
  exportTree: () => {
    return capabilityTree.exportTree();
  },
  importTree: (data) => {
    return capabilityTree.importTree(data);
  },
  visualizeTree: () => {
    return capabilityTree.visualizeTree();
  },
  analyzeUsagePatterns: () => {
    return capabilityTree.analyzeUsagePatterns();
  },
  getAllNodes: () => {
    return capabilityTree.getAllNodes();
  },
  getNode: (nodeId) => {
    return capabilityTree.getNode(nodeId);
  }
};

// 示例用法
if (require.main === module) {
  const tree = capabilityTree;

  console.log('=== 能力树初始化完成 ===');
  console.log('初始状态:', JSON.stringify(tree.getStatus(), null, 2));

  // 测试添加节点
  console.log('\n=== 测试添加节点 ===');
  const newNode = tree.addNode('新能力', 2, tree.root.id, {
    inputs: ['输入1', '输入2'],
    outputs: ['输出1', '输出2'],
    prerequisites: ['前提1', '前提2'],
    failureBoundaries: ['失败1', '失败2'],
    type: 'general',
    keywords: ['新能力', '测试'],
    description: '测试新能力'
  });
  console.log('添加的新节点:', JSON.stringify(newNode, null, 2));

  // 测试定位任务路径
  console.log('\n=== 测试定位任务路径 ===');
  const paths = tree.locateTaskPath('文件操作');
  console.log('任务路径:', JSON.stringify(paths, null, 2));

  // 测试标记节点使用
  if (paths.length > 0) {
    console.log('\n=== 测试标记节点使用 ===');
    tree.markNodeUsed(paths[0].node.id);
    console.log('标记使用后的节点:', JSON.stringify(tree.getNode(paths[0].node.id), null, 2));
  }

  // 测试能力修剪
  console.log('\n=== 测试能力修剪 ===');
  const trimCandidates = tree.trimCapabilities(1, 1); // 1天未使用，使用次数<1
  console.log('候选修剪节点:', JSON.stringify(trimCandidates, null, 2));

  // 测试清理修剪节点
  console.log('\n=== 测试清理修剪节点 ===');
  const removedNodes = tree.cleanupTrimmedNodes();
  console.log('已移除节点:', JSON.stringify(removedNodes, null, 2));

  // 测试评估能力树质量
  console.log('\n=== 测试评估能力树质量 ===');
  const quality = tree.evaluateTreeQuality();
  console.log('能力树质量评估:', JSON.stringify(quality, null, 2));

  // 测试导出能力树
  console.log('\n=== 测试导出能力树 ===');
  const exported = tree.exportTree();
  console.log('导出的能力树:', JSON.stringify(exported, null, 2));

  console.log('\n=== 能力树测试完成 ===');
}
