/**
 * 人生决策宗师能力树实现
 * 基于CapabilityTree类，为人生决策宗师构建完整的能力树结构
 */

const { CapabilityTree } = require('./capability-tree');

class LifeDecisionMasterCapabilityTree {
  constructor() {
    this.tree = new CapabilityTree();
    this._initializeLifeDecisionTree();
  }

  // 初始化人生决策宗师能力树
  _initializeLifeDecisionTree() {
    console.log('Initializing Life Decision Master capability tree...');
    
    // 清理默认节点，创建人生决策专用结构
    this._clearDefaultNodes();
    this._createHighLevelNodes();
    this._createMidLevelNodes();
    this._createLowLevelNodes();
    
    console.log('Life Decision Master capability tree initialized successfully!');
  }

  // 清理默认节点
  _clearDefaultNodes() {
    const root = this.tree.root;
    root.children = [];
  }

  // 创建高层节点（问题分解策略）
  _createHighLevelNodes() {
    // 1. 人生决策策略
    this.lifeDecisionStrategy = this.tree.addNode('人生决策策略', 3, null, {
      description: '人生决策的顶层策略框架',
      inputs: ['决策情境', '个人价值观', '目标约束'],
      outputs: ['决策框架', '优先级排序', '影响评估'],
      prerequisites: ['问题明确', '价值观清晰', '信息完整'],
      failureBoundaries: ['问题模糊', '价值观冲突', '信息不足']
    });

    // 2. 能量管理策略
    this.energyManagementStrategy = this.tree.addNode('能量管理策略', 3, null, {
      description: '能量管理的顶层策略框架',
      inputs: ['能量状态', '生活情境', '个人目标'],
      outputs: ['能量管理框架', '优先级排序', '平衡方案'],
      prerequisites: ['能量状态可评估', '目标明确', '执行意愿强'],
      failureBoundaries: ['状态评估不准确', '目标不现实', '执行能力不足']
    });

    // 3. 底层逻辑分析策略
    this.logicAnalysisStrategy = this.tree.addNode('底层逻辑分析策略', 3, null, {
      description: '底层逻辑分析的顶层策略框架',
      inputs: ['决策案例', '行为模式', '价值观陈述'],
      outputs: ['逻辑框架分析', '价值观映射', '校准建议'],
      prerequisites: ['案例完整', '信息真实', '分析工具可用'],
      failureBoundaries: ['信息不完整', '分析工具限制', '逻辑过于复杂']
    });

    // 4. 系统集成策略
    this.systemIntegrationStrategy = this.tree.addNode('系统集成策略', 3, null, {
      description: '跨领域系统集成的顶层策略框架',
      inputs: ['多领域问题', '复杂情境', '资源约束'],
      outputs: ['跨领域解决方案', '资源分配', '执行路径'],
      prerequisites: ['领域知识完整', '资源可评估', '执行能力明确'],
      failureBoundaries: ['领域知识不足', '资源约束过强', '执行路径模糊']
    });
  }

  // 创建中层节点（可复用流程）
  _createMidLevelNodes() {
    // 决策分析流程
    this.decisionAnalysisProcess = this.tree.addNode('决策分析流程', 2, this.lifeDecisionStrategy.id, {
      description: '人生决策的分析流程',
      inputs: ['决策情境', '相关信息', '约束条件'],
      outputs: ['决策要素分析', '影响因素映射', '风险评估'],
      prerequisites: ['信息完整', '分析方法适用', '时间充足'],
      failureBoundaries: ['信息不足', '方法不适用', '时间限制']
    });

    // 能量评估流程
    this.energyAssessmentProcess = this.tree.addNode('能量评估流程', 2, this.energyManagementStrategy.id, {
      description: '能量状态的评估流程',
      inputs: ['身体状态', '心理状态', '情感状态', '精神状态'],
      outputs: ['能量状态评估', '能量流动分析', '优化机会识别'],
      prerequisites: ['状态可测量', '评估工具适用', '个人配合'],
      failureBoundaries: ['状态难以测量', '工具不适用', '个人不配合']
    });

    // 底层逻辑校准流程
    this.logicCalibrationProcess = this.tree.addNode('底层逻辑校准流程', 2, this.logicAnalysisStrategy.id, {
      description: '底层逻辑的校准流程',
      inputs: ['价值观陈述', '决策案例', '行为模式'],
      outputs: ['逻辑一致性分析', '价值观优先级调整', '决策框架优化'],
      prerequisites: ['信息真实', '分析深度足够', '个人开放度高'],
      failureBoundaries: ['信息不真实', '分析深度不足', '个人封闭']
    });

    // 生活优化流程
    this.lifeOptimizationProcess = this.tree.addNode('生活优化流程', 2, this.systemIntegrationStrategy.id, {
      description: '生活质量优化的流程',
      inputs: ['生活现状', '个人目标', '资源约束'],
      outputs: ['优化方案', '执行计划', '跟踪机制'],
      prerequisites: ['现状清晰', '目标合理', '资源可利用'],
      failureBoundaries: ['现状模糊', '目标不现实', '资源不足']
    });

    // 个人成长规划流程
    this.growthPlanningProcess = this.tree.addNode('个人成长规划流程', 2, this.systemIntegrationStrategy.id, {
      description: '个人成长的规划流程',
      inputs: ['当前能力', '成长目标', '时间资源'],
      outputs: ['成长路径', '学习计划', '技能发展方案'],
      prerequisites: ['目标明确', '资源可规划', '执行意愿强'],
      failureBoundaries: ['目标模糊', '资源不可控', '执行意愿弱']
    });
  }

  // 创建低层节点（基础操作）
  _createLowLevelNodes() {
    // 信息收集操作
    this.informationCollection = this.tree.addNode('信息收集操作', 1, this.decisionAnalysisProcess.id, {
      description: '信息收集的基础操作',
      inputs: ['信息需求', '可用渠道', '时间限制'],
      outputs: ['收集的信息', '信息质量评估', '信息来源记录'],
      prerequisites: ['渠道可用', '时间充足', '方法适用'],
      failureBoundaries: ['渠道不可用', '时间不足', '方法不适用']
    });

    // 数据分析操作
    this.dataAnalysis = this.tree.addNode('数据分析操作', 1, this.decisionAnalysisProcess.id, {
      description: '数据分析的基础操作',
      inputs: ['原始数据', '分析目标', '可用工具'],
      outputs: ['分析结果', '数据洞察', '可视化呈现'],
      prerequisites: ['数据完整', '目标明确', '工具适用'],
      failureBoundaries: ['数据不完整', '目标模糊', '工具限制']
    });

    // 建议生成操作
    this.suggestionGeneration = this.tree.addNode('建议生成操作', 1, this.lifeOptimizationProcess.id, {
      description: '建议生成的基础操作',
      inputs: ['分析结果', '个人情况', '执行约束'],
      outputs: ['具体建议', '执行步骤', '预期效果'],
      prerequisites: ['分析结果可靠', '个人情况了解', '约束明确'],
      failureBoundaries: ['分析结果不可靠', '个人情况不了解', '约束不明确']
    });

    // 反馈处理操作
    this.feedbackProcessing = this.tree.addNode('反馈处理操作', 1, this.growthPlanningProcess.id, {
      description: '反馈处理的基础操作',
      inputs: ['用户反馈', '执行结果', '预期目标'],
      outputs: ['反馈分析', '调整建议', '改进措施'],
      prerequisites: ['反馈真实', '结果可测量', '目标明确'],
      failureBoundaries: ['反馈不真实', '结果不可测量', '目标模糊']
    });

    // 跟踪监测操作
    this.trackingMonitoring = this.tree.addNode('跟踪监测操作', 1, this.growthPlanningProcess.id, {
      description: '跟踪监测的基础操作',
      inputs: ['执行计划', '时间节点', '关键指标'],
      outputs: ['执行状态', '进度报告', '调整建议'],
      prerequisites: ['计划明确', '指标可测量', '监测工具可用'],
      failureBoundaries: ['计划模糊', '指标不可测量', '工具不可用']
    });

    // 能量测量操作
    this.energyMeasurement = this.tree.addNode('能量测量操作', 1, this.energyAssessmentProcess.id, {
      description: '能量测量的基础操作',
      inputs: ['身体数据', '心理状态描述', '情感反馈', '精神状态评估'],
      outputs: ['能量测量结果', '状态分类', '异常识别'],
      prerequisites: ['数据可收集', '测量工具适用', '个人配合'],
      failureBoundaries: ['数据不可收集', '工具不适用', '个人不配合']
    });

    // 价值观分析操作
    this.valuesAnalysis = this.tree.addNode('价值观分析操作', 1, this.logicCalibrationProcess.id, {
      description: '价值观分析的基础操作',
      inputs: ['价值观陈述', '行为记录', '决策案例'],
      outputs: ['价值观映射', '一致性分析', '优先级排序'],
      prerequisites: ['陈述真实', '记录完整', '分析方法适用'],
      failureBoundaries: ['陈述不真实', '记录不完整', '方法不适用']
    });
  }

  // 为特定决策场景添加能力路径
  addDecisionPath(decisionType, details) {
    console.log(`Adding decision path for: ${decisionType}`);
    
    const pathNode = this.tree.addNode(decisionType, 2, this.lifeDecisionStrategy.id, {
      description: `${decisionType}的专用决策路径`,
      inputs: [...details.inputs],
      outputs: [...details.outputs],
      prerequisites: [...details.prerequisites],
      failureBoundaries: [...details.failureBoundaries]
    });

    return pathNode;
  }

  // 为特定能量管理场景添加能力路径
  addEnergyPath(energyType, details) {
    console.log(`Adding energy path for: ${energyType}`);
    
    const pathNode = this.tree.addNode(energyType, 2, this.energyManagementStrategy.id, {
      description: `${energyType}的专用能量管理路径`,
      inputs: [...details.inputs],
      outputs: [...details.outputs],
      prerequisites: [...details.prerequisites],
      failureBoundaries: [...details.failureBoundaries]
    });

    return pathNode;
  }

  // 定位任务路径
  locateTaskPath(taskDescription) {
    return this.tree.locateTaskPath(taskDescription);
  }

  // 标记节点使用
  markNodeUsed(nodeId) {
    return this.tree.markNodeUsed(nodeId);
  }

  // 获取能力树状态
  getStatus() {
    return this.tree.getStatus();
  }

  // 导出能力树
  export() {
    return this.tree.export();
  }

  // 生成文本形式的能力树
  generateTextTree() {
    return this.tree.generateTextTree();
  }

  // 执行能力修剪
  trimCapabilities() {
    return this.tree.trimCapabilities();
  }

  // 清理标记为修剪的节点
  cleanupTrimmedNodes() {
    return this.tree.cleanupTrimmedNodes();
  }
}

// 导出单例实例
const lifeDecisionMasterCapabilityTree = new LifeDecisionMasterCapabilityTree();

module.exports = {
  LifeDecisionMasterCapabilityTree,
  lifeDecisionMasterCapabilityTree
};

// 示例用法
if (require.main === module) {
  const tree = lifeDecisionMasterCapabilityTree;
  
  // 显示能力树结构
  console.log('\nLife Decision Master Capability Tree:');
  console.log(tree.generateTextTree());
  
  // 显示状态
  console.log('\nCapability Tree Status:');
  console.log(JSON.stringify(tree.getStatus(), null, 2));
  
  // 测试路径定位
  console.log('\nTesting task path location:');
  const paths = tree.locateTaskPath('职业决策分析');
  console.log('Found paths:', paths.map(p => p.path));
  
  // 标记使用
  if (paths.length > 0) {
    tree.markNodeUsed(paths[0].node.id);
    console.log('Marked node as used:', paths[0].node.name);
  }
  
  // 显示更新后的状态
  console.log('\nUpdated Status:');
  console.log(JSON.stringify(tree.getStatus(), null, 2));
}