/**
 * 能力内生化器
 * 负责将抽象能力转化为系统默认行为，实现不同层次的能力内生化策略
 */

const fs = require('fs');
const path = require('path');
const capabilityAbstractor = require('./capability-abstractor');
const { capabilityTree } = require('../../../capabilities/capability-tree');

class Internalizer {
  constructor() {
    this.internalizedDir = path.join(__dirname, '..', 'data', 'internalized');
    this.internalizedCapabilities = this.loadInternalizedCapabilities();
  }

  // 加载内生化能力
  loadInternalizedCapabilities() {
    const capabilities = [];
    
    try {
      const files = fs.readdirSync(this.internalizedDir);
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.internalizedDir, file);
          const capability = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          capabilities.push(capability);
        }
      });
    } catch (error) {
      console.warn('Error loading internalized capabilities:', error.message);
    }
    
    return capabilities;
  }

  // 保存内生化能力
  saveInternalizedCapability(capability) {
    const filePath = path.join(this.internalizedDir, `${capability.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(capability, null, 2));
  }

  // 内生化能力
  internalizeCapability(abstractId, options = {}) {
    const abstractCapability = capabilityAbstractor.getAbstractedCapability(abstractId);
    if (!abstractCapability) {
      throw new Error(`Abstract capability not found: ${abstractId}`);
    }

    // 选择内生化策略
    const strategy = options.strategy || this.selectStrategy(abstractCapability);
    
    // 执行内生化
    const internalizedCapability = this.executeInternalization(abstractCapability, strategy, options);
    
    this.internalizedCapabilities.push(internalizedCapability);
    this.saveInternalizedCapability(internalizedCapability);
    
    // 将能力添加到能力树
    this.addToCapabilityTree(internalizedCapability, abstractCapability);
    
    return internalizedCapability;
  }

  // 选择内生化策略
  selectStrategy(abstractCapability) {
    // 基于能力层级选择策略
    if (abstractCapability.level === 1) {
      return 'default_behavior'; // 低层能力作为默认行为
    } else if (abstractCapability.level === 2) {
      return 'high_level_operation'; // 中层能力作为高阶操作
    } else {
      return 'priority_solution'; // 高层能力作为优先解法
    }
  }

  // 执行内生化
  executeInternalization(abstractCapability, strategy, options) {
    // 确定内生化类型
    const type = this.determineType(abstractCapability);
    
    // 生成激活条件
    const activationConditions = this.generateActivationConditions(abstractCapability);
    
    return {
      id: `cap_internalized_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: abstractCapability.name,
      description: abstractCapability.description,
      type,
      level: abstractCapability.level,
      abstractId: abstractCapability.id,
      internalizationStrategy: strategy,
      activationConditions,
      usageCount: 0,
      lastUsed: null,
      status: 'active',
      timestamp: Date.now(),
      metadata: {
        strategy,
        inputs: abstractCapability.inputs,
        outputs: abstractCapability.outputs,
        prerequisites: abstractCapability.prerequisites,
        failureBoundaries: abstractCapability.failureBoundaries
      }
    };
  }

  // 确定内生化类型
  determineType(abstractCapability) {
    if (abstractCapability.level === 1) {
      return 'behavioral'; // 行为型内生化
    } else if (abstractCapability.level === 2) {
      return 'operational'; // 操作型内生化
    } else {
      return 'strategic'; // 战略型内生化
    }
  }

  // 生成激活条件
  generateActivationConditions(abstractCapability) {
    const conditions = [];
    
    // 基于能力名称生成激活条件
    if (abstractCapability.name.includes('文件')) {
      conditions.push('文件操作请求');
      conditions.push('文件路径参数');
    }
    
    if (abstractCapability.name.includes('数据')) {
      conditions.push('数据处理请求');
      conditions.push('数据源参数');
    }
    
    if (abstractCapability.name.includes('网络')) {
      conditions.push('网络请求');
      conditions.push('URL参数');
    }
    
    if (abstractCapability.name.includes('缓存')) {
      conditions.push('缓存操作请求');
      conditions.push('缓存键参数');
    }
    
    // 基于输入参数生成激活条件
    abstractCapability.inputs.forEach(input => {
      if (input.includes('路径')) {
        conditions.push(`${input}提供`);
      }
      if (input.includes('参数')) {
        conditions.push(`${input}有效`);
      }
    });
    
    // 默认激活条件
    if (conditions.length === 0) {
      conditions.push('操作请求');
    }
    
    return conditions;
  }

  // 添加到能力树
  addToCapabilityTree(internalizedCapability, abstractCapability) {
    try {
      // 确定能力树中的父节点
      let parentId = null;
      
      // 基于能力层级确定父节点
      if (internalizedCapability.level === 1) {
        // 低层能力添加到基础操作
        const basicOpsNode = capabilityTree.findNodeByName('基础操作');
        if (basicOpsNode) {
          parentId = basicOpsNode.id;
        }
      } else if (internalizedCapability.level === 2) {
        // 中层能力添加到可复用流程
        const processNode = capabilityTree.findNodeByName('可复用流程');
        if (processNode) {
          parentId = processNode.id;
        }
      } else {
        // 高层能力添加到问题分解策略
        const strategyNode = capabilityTree.findNodeByName('问题分解策略');
        if (strategyNode) {
          parentId = strategyNode.id;
        }
      }

      // 添加能力节点
      const node = capabilityTree.addNode(
        internalizedCapability.name,
        internalizedCapability.level,
        parentId,
        {
          inputs: abstractCapability.inputs,
          outputs: abstractCapability.outputs,
          prerequisites: abstractCapability.prerequisites,
          failureBoundaries: abstractCapability.failureBoundaries
        }
      );
      
      console.log(`Added internalized capability to capability tree: ${node.name}`);
      
    } catch (error) {
      console.warn('Error adding to capability tree:', error.message);
    }
  }

  // 获取内生化能力
  getInternalizedCapabilities(filters = {}) {
    let result = [...this.internalizedCapabilities];
    
    // 应用过滤器
    if (filters.type) {
      result = result.filter(c => c.type === filters.type);
    }
    
    if (filters.level) {
      result = result.filter(c => c.level === filters.level);
    }
    
    if (filters.status) {
      result = result.filter(c => c.status === filters.status);
    }
    
    if (filters.limit) {
      result = result.slice(0, filters.limit);
    }
    
    return result;
  }

  // 获取单个内生化能力
  getInternalizedCapability(internalizedId) {
    return this.internalizedCapabilities.find(c => c.id === internalizedId);
  }

  // 标记能力使用
  markUsed(internalizedId) {
    const capability = this.getInternalizedCapability(internalizedId);
    if (capability) {
      capability.usageCount++;
      capability.lastUsed = Date.now();
      this.saveInternalizedCapability(capability);
      
      // 同时标记能力树中的节点使用
      try {
        const node = capabilityTree.findNodeByName(capability.name);
        if (node) {
          capabilityTree.markNodeUsed(node.id);
        }
      } catch (error) {
        console.warn('Error marking node used:', error.message);
      }
      
      return true;
    }
    return false;
  }

  // 更新能力状态
  updateStatus(internalizedId, status) {
    const capability = this.getInternalizedCapability(internalizedId);
    if (capability) {
      capability.status = status;
      capability.lastUpdated = Date.now();
      this.saveInternalizedCapability(capability);
      return true;
    }
    return false;
  }

  // 删除内生化能力
  deleteInternalizedCapability(internalizedId) {
    const index = this.internalizedCapabilities.findIndex(c => c.id === internalizedId);
    if (index > -1) {
      this.internalizedCapabilities.splice(index, 1);
      
      // 删除文件
      const filePath = path.join(this.internalizedDir, `${internalizedId}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      return true;
    }
    return false;
  }

  // 获取内生化统计
  getStatistics() {
    const total = this.internalizedCapabilities.length;
    const byType = this.internalizedCapabilities.reduce((acc, c) => {
      acc[c.type] = (acc[c.type] || 0) + 1;
      return acc;
    }, {});
    
    const byLevel = this.internalizedCapabilities.reduce((acc, c) => {
      acc[c.level] = (acc[c.level] || 0) + 1;
      return acc;
    }, {});
    
    const byStatus = this.internalizedCapabilities.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});
    
    const mostUsed = this.internalizedCapabilities
      .filter(c => c.usageCount > 0)
      .sort((a, b) => b.usageCount - a.usageCount)[0];
    
    return {
      total,
      byType,
      byLevel,
      byStatus,
      mostUsed
    };
  }
}

// 导出单例实例
const internalizer = new Internalizer();

module.exports = internalizer;
