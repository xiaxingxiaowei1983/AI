/**
 * 人生决策宗师能力树集成模块
 * 用于将能力树与人生决策宗师代理集成，实现基于能力树的思考和决策
 */

const { lifeDecisionMasterCapabilityTree } = require('../../capabilities/life-decision-master-capability-tree');

class LifeDecisionCapabilityTreeIntegration {
  constructor() {
    this.capabilityTree = lifeDecisionMasterCapabilityTree;
    console.log('Life Decision Master capability tree integration initialized');
  }

  // 使用能力树进行任务分析
  analyzeTaskWithCapabilityTree(taskDescription) {
    console.log(`Analyzing task: ${taskDescription}`);
    
    // 在能力树中定位任务路径
    const potentialPaths = this.capabilityTree.locateTaskPath(taskDescription);
    
    if (potentialPaths.length > 0) {
      console.log(`Found ${potentialPaths.length} potential capability paths`);
      
      // 按相关性排序，选择最佳路径
      potentialPaths.sort((a, b) => b.relevance - a.relevance);
      const bestPath = potentialPaths[0];
      
      console.log(`Best path found: ${bestPath.path} (Relevance: ${bestPath.relevance})`);
      
      // 标记节点使用
      this.capabilityTree.markNodeUsed(bestPath.node.id);
      
      return {
        success: true,
        path: bestPath.path,
        node: bestPath.node,
        relevance: bestPath.relevance,
        allPaths: potentialPaths
      };
    } else {
      console.log('No existing capability paths found, need to grow new capability');
      return {
        success: false,
        message: 'No existing capability paths found'
      };
    }
  }

  // 基于能力树生成决策响应
  generateDecisionResponse(taskDescription, userContext) {
    console.log(`Generating decision response for: ${taskDescription}`);
    
    // 分析任务并定位能力路径
    const analysis = this.analyzeTaskWithCapabilityTree(taskDescription);
    
    if (analysis.success) {
      // 基于找到的能力路径生成响应
      return this._generateResponseFromPath(analysis.node, taskDescription, userContext);
    } else {
      // 处理新任务，可能需要生长新能力
      return this._handleNewTask(taskDescription, userContext);
    }
  }

  // 从能力路径生成响应
  _generateResponseFromPath(capabilityNode, taskDescription, userContext) {
    console.log(`Generating response from capability: ${capabilityNode.name}`);
    
    // 根据能力节点类型生成不同的响应
    switch (capabilityNode.name) {
      case '人生决策策略':
        return this._generateLifeDecisionResponse(taskDescription, userContext);
      
      case '能量管理策略':
        return this._generateEnergyManagementResponse(taskDescription, userContext);
      
      case '底层逻辑分析策略':
        return this._generateLogicAnalysisResponse(taskDescription, userContext);
      
      case '系统集成策略':
        return this._generateSystemIntegrationResponse(taskDescription, userContext);
      
      case '通信策略':
        return this._generateCommunicationResponse(taskDescription, userContext);
      
      case '决策分析流程':
        return this._generateDecisionAnalysisResponse(taskDescription, userContext);
      
      case '能量评估流程':
        return this._generateEnergyAssessmentResponse(taskDescription, userContext);
      
      case '底层逻辑校准流程':
        return this._generateLogicCalibrationResponse(taskDescription, userContext);
      
      case '生活优化流程':
        return this._generateLifeOptimizationResponse(taskDescription, userContext);
      
      case '个人成长规划流程':
        return this._generateGrowthPlanningResponse(taskDescription, userContext);
      
      case '富消息流程':
        return this._generateRichMessagingResponse(taskDescription, userContext);
      
      case '表情反应流程':
        return this._generateExpressiveReactionResponse(taskDescription, userContext);
      
      default:
        return this._generateGenericResponse(taskDescription, userContext);
    }
  }

  // 生成人生决策响应
  _generateLifeDecisionResponse(taskDescription, userContext) {
    return {
      type: 'life_decision',
      content: `基于人生决策策略，我将帮助你分析这个决策情境。首先需要了解你的价值观和目标约束，然后进行系统分析，为你提供清晰的决策框架和优先级排序。`,
      nextSteps: [
        '请分享更多关于你当前的决策情境',
        '描述你的核心价值观和长期目标',
        '说明你面临的主要约束和限制'
      ]
    };
  }

  // 生成能量管理响应
  _generateEnergyManagementResponse(taskDescription, userContext) {
    return {
      type: 'energy_management',
      content: `基于能量管理策略，我将帮助你评估当前的能量状态，并提供平衡方案。能量管理是人生决策的基础，只有在高能量状态下，才能做出更明智的决策。`,
      nextSteps: [
        '请评估你当前的身体能量状态',
        '描述你的心理和情感状态',
        '分享你的近期生活情境和压力源'
      ]
    };
  }

  // 生成底层逻辑分析响应
  _generateLogicAnalysisResponse(taskDescription, userContext) {
    return {
      type: 'logic_analysis',
      content: `基于底层逻辑分析策略，我将帮助你分析决策的底层逻辑和价值观。理解你的决策框架是做出一致、有效的人生决策的关键。`,
      nextSteps: [
        '请分享一个你近期的决策案例',
        '描述你的价值观和信念体系',
        '说明你通常如何做出重要决策'
      ]
    };
  }

  // 生成系统集成响应
  _generateSystemIntegrationResponse(taskDescription, userContext) {
    return {
      type: 'system_integration',
      content: `基于系统集成策略，我将帮助你整合多个领域的考虑因素，制定综合性的解决方案。人生决策往往涉及多个维度，需要系统思考。`,
      nextSteps: [
        '请描述这个决策涉及的多个领域',
        '说明你的资源约束和限制',
        '分享你的长期和短期目标'
      ]
    };
  }

  // 生成决策分析响应
  _generateDecisionAnalysisResponse(taskDescription, userContext) {
    return {
      type: 'decision_analysis',
      content: `基于决策分析流程，我将帮助你系统分析这个决策情境，识别关键因素和潜在风险。结构化的分析可以帮助你做出更全面的决策。`,
      nextSteps: [
        '请详细描述决策情境',
        '分享相关的信息和数据',
        '说明你面临的主要约束条件'
      ]
    };
  }

  // 生成能量评估响应
  _generateEnergyAssessmentResponse(taskDescription, userContext) {
    return {
      type: 'energy_assessment',
      content: `基于能量评估流程，我将帮助你全面评估当前的能量状态，包括身体、心理、情感和精神层面。能量状态直接影响决策质量和执行能力。`,
      nextSteps: [
        '请评估你当前的身体能量水平（1-10）',
        '描述你的心理和情感状态',
        '分享你的精神动力和意义感'
      ]
    };
  }

  // 生成底层逻辑校准响应
  _generateLogicCalibrationResponse(taskDescription, userContext) {
    return {
      type: 'logic_calibration',
      content: `基于底层逻辑校准流程，我将帮助你分析决策的一致性和价值观对齐度。校准你的决策框架可以提高决策的有效性和满意度。`,
      nextSteps: [
        '请分享你的核心价值观排序',
        '描述一个你认为成功的决策案例',
        '说明一个你可能后悔的决策案例'
      ]
    };
  }

  // 生成生活优化响应
  _generateLifeOptimizationResponse(taskDescription, userContext) {
    return {
      type: 'life_optimization',
      content: `基于生活优化流程，我将帮助你评估当前生活状态，制定具体的优化方案。平衡的生活状态是持续做出良好决策的基础。`,
      nextSteps: [
        '请描述你当前的生活现状',
        '分享你的个人和职业目标',
        '说明你面临的主要生活挑战'
      ]
    };
  }

  // 生成个人成长规划响应
  _generateGrowthPlanningResponse(taskDescription, userContext) {
    return {
      type: 'growth_planning',
      content: `基于个人成长规划流程，我将帮助你制定系统的成长路径和学习计划。持续学习和成长是适应变化、做出有效决策的关键。`,
      nextSteps: [
        '请评估你当前的核心能力',
        '描述你的长期成长目标',
        '说明你可用的时间和资源'
      ]
    };
  }

  // 生成通用响应
  _generateGenericResponse(taskDescription, userContext) {
    return {
      type: 'generic',
      content: `我将帮助你分析这个问题，并提供基于系统思考的建议。让我们从了解更多细节开始，以便提供更有针对性的支持。`,
      nextSteps: [
        '请提供更多关于你当前情境的细节',
        '描述你希望达成的具体目标',
        '说明你面临的主要挑战'
      ]
    };
  }

  // 生成通信策略响应
  _generateCommunicationResponse(taskDescription, userContext) {
    return {
      type: 'communication',
      content: `基于通信策略，我将通过富消息和表情反应与你进行更有效的互动。良好的沟通是决策过程的重要组成部分，我会确保信息传递清晰、情感表达适当。`,
      nextSteps: [
        '请描述你希望的沟通方式',
        '分享你当前的情绪状态',
        '说明你对信息呈现的偏好'
      ]
    };
  }

  // 生成富消息响应
  _generateRichMessagingResponse(taskDescription, userContext) {
    return {
      type: 'rich_messaging',
      content: `基于富消息流程，我将为你生成结构化的消息卡片，使信息呈现更加清晰、美观。富消息格式可以帮助你更好地理解复杂信息和决策框架。`,
      nextSteps: [
        '请提供你希望包含在消息中的核心内容',
        '说明是否需要添加标题和特定颜色',
        '确认消息的目标受众'
      ]
    };
  }

  // 生成表情反应响应
  _generateExpressiveReactionResponse(taskDescription, userContext) {
    return {
      type: 'expressive_reaction',
      content: `基于表情反应流程，我将根据你的情绪状态和交互情境生成适当的表情反应。情感表达可以增强我们的互动体验，使沟通更加自然和人性化。`,
      nextSteps: [
        '请描述你当前的情绪状态',
        '分享你希望通过表情传达的意图',
        '说明你对表情类型的偏好'
      ]
    };
  }

  // 处理新任务，生长新能力
  _handleNewTask(taskDescription, userContext) {
    console.log(`Handling new task: ${taskDescription}`);
    
    // 分析任务类型，确定需要生长的能力类型
    const taskType = this._analyzeTaskType(taskDescription);
    
    console.log(`Task type identified: ${taskType}`);
    
    // 基于任务类型生成响应
    switch (taskType) {
      case 'career':
        return this._handleCareerTask(taskDescription, userContext);
      
      case 'health':
        return this._handleHealthTask(taskDescription, userContext);
      
      case 'relationship':
        return this._handleRelationshipTask(taskDescription, userContext);
      
      case 'finance':
        return this._handleFinanceTask(taskDescription, userContext);
      
      case 'personal_growth':
        return this._handlePersonalGrowthTask(taskDescription, userContext);
      
      default:
        return this._handleGenericNewTask(taskDescription, userContext);
    }
  }

  // 分析任务类型
  _analyzeTaskType(taskDescription) {
    const lowerTask = taskDescription.toLowerCase();
    
    if (lowerTask.includes('职业') || lowerTask.includes('工作') || lowerTask.includes('career') || lowerTask.includes('job')) {
      return 'career';
    } else if (lowerTask.includes('健康') || lowerTask.includes('身体') || lowerTask.includes('health') || lowerTask.includes('fitness')) {
      return 'health';
    } else if (lowerTask.includes('关系') || lowerTask.includes('家庭') || lowerTask.includes('relationship') || lowerTask.includes('family')) {
      return 'relationship';
    } else if (lowerTask.includes('财务') || lowerTask.includes('金钱') || lowerTask.includes('finance') || lowerTask.includes('money')) {
      return 'finance';
    } else if (lowerTask.includes('成长') || lowerTask.includes('学习') || lowerTask.includes('growth') || lowerTask.includes('learn')) {
      return 'personal_growth';
    } else {
      return 'generic';
    }
  }

  // 处理职业相关任务
  _handleCareerTask(taskDescription, userContext) {
    console.log('Handling career-related task');
    return {
      type: 'career_decision',
      content: `这是一个职业相关的决策任务。我将帮助你分析职业发展路径，评估不同选项的利弊，并提供基于你的价值观和目标的建议。`,
      nextSteps: [
        '请描述你当前的职业状况',
        '分享你的职业目标和价值观',
        '说明你面临的具体职业决策'
      ]
    };
  }

  // 处理健康相关任务
  _handleHealthTask(taskDescription, userContext) {
    console.log('Handling health-related task');
    return {
      type: 'health_decision',
      content: `这是一个健康相关的决策任务。健康是人生的基础，我将帮助你评估当前的健康状态，并提供平衡身体、心理和情感健康的建议。`,
      nextSteps: [
        '请描述你当前的健康状况',
        '分享你的健康目标和挑战',
        '说明你希望在健康方面做出的改变'
      ]
    };
  }

  // 处理关系相关任务
  _handleRelationshipTask(taskDescription, userContext) {
    console.log('Handling relationship-related task');
    return {
      type: 'relationship_decision',
      content: `这是一个关系相关的决策任务。健康的关系是人生幸福的重要组成部分，我将帮助你分析关系动态，提供改善和维护关系的建议。`,
      nextSteps: [
        '请描述你当前的关系状况',
        '分享你在关系中面临的挑战',
        '说明你希望在关系方面达成的目标'
      ]
    };
  }

  // 处理财务相关任务
  _handleFinanceTask(taskDescription, userContext) {
    console.log('Handling finance-related task');
    return {
      type: 'finance_decision',
      content: `这是一个财务相关的决策任务。财务健康是人生稳定的基础，我将帮助你分析财务状况，提供预算、投资和财务规划的建议。`,
      nextSteps: [
        '请描述你当前的财务状况',
        '分享你的财务目标和价值观',
        '说明你面临的具体财务决策'
      ]
    };
  }

  // 处理个人成长相关任务
  _handlePersonalGrowthTask(taskDescription, userContext) {
    console.log('Handling personal growth-related task');
    return {
      type: 'growth_decision',
      content: `这是一个个人成长相关的决策任务。持续学习和成长是人生的重要动力，我将帮助你制定个性化的成长计划，支持你的长期发展。`,
      nextSteps: [
        '请描述你当前的技能和知识水平',
        '分享你的学习目标和兴趣',
        '说明你希望在个人成长方面达成的成就'
      ]
    };
  }

  // 处理通用新任务
  _handleGenericNewTask(taskDescription, userContext) {
    console.log('Handling generic new task');
    return {
      type: 'generic_new_task',
      content: `这是一个新的任务类型。我将基于系统思考的方法，帮助你分析问题的各个维度，并提供全面的解决方案。`,
      nextSteps: [
        '请提供更多关于这个任务的背景信息',
        '描述你希望达成的具体目标',
        '说明你面临的主要挑战和限制'
      ]
    };
  }

  // 获取能力树状态
  getCapabilityTreeStatus() {
    return this.capabilityTree.getStatus();
  }

  // 生成能力树可视化
  generateCapabilityTreeVisualization() {
    return this.capabilityTree.generateTextTree();
  }

  // 执行能力修剪
  trimCapabilities() {
    console.log('Executing capability tree trimming');
    const candidates = this.capabilityTree.trimCapabilities();
    console.log(`Found ${candidates.length} candidate nodes for trimming`);
    return candidates;
  }

  // 清理标记为修剪的节点
  cleanupTrimmedNodes() {
    console.log('Cleaning up trimmed capability nodes');
    const removed = this.capabilityTree.cleanupTrimmedNodes();
    console.log(`Removed ${removed.length} capability nodes`);
    return removed;
  }
}

// 导出单例实例
const lifeDecisionCapabilityTreeIntegration = new LifeDecisionCapabilityTreeIntegration();

module.exports = {
  LifeDecisionCapabilityTreeIntegration,
  lifeDecisionCapabilityTreeIntegration
};

// 示例用法
if (require.main === module) {
  const integration = lifeDecisionCapabilityTreeIntegration;
  
  // 测试任务分析
  console.log('\nTesting task analysis with capability tree:');
  
  const testTasks = [
    '我应该换工作吗？',
    '如何改善我的健康状况？',
    '如何处理家庭关系冲突？',
    '如何规划我的财务未来？',
    '如何实现个人成长目标？'
  ];
  
  testTasks.forEach(task => {
    console.log(`\n=== Testing task: ${task} ===`);
    const result = integration.analyzeTaskWithCapabilityTree(task);
    console.log('Analysis result:', JSON.stringify(result, null, 2));
    
    const response = integration.generateDecisionResponse(task, {});
    console.log('Generated response:', JSON.stringify(response, null, 2));
  });
  
  // 获取能力树状态
  console.log('\n=== Capability Tree Status ===');
  const status = integration.getCapabilityTreeStatus();
  console.log('Status:', JSON.stringify(status, null, 2));
  
  // 生成能力树可视化
  console.log('\n=== Capability Tree Visualization ===');
  const visualization = integration.generateCapabilityTreeVisualization();
  console.log(visualization);
}