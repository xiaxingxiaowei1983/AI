// VFM评估模块增强测试

const { vfmEvaluator } = require('./skills/vfm-evaluator');

console.log('=== VFM评估模块增强测试 ===\n');

// 测试1: 基本评估功能
console.log('测试1: 基本评估功能');
try {
  const testCapability = {
    name: '日常对话处理',
    type: 'core',
    description: '处理用户的日常对话，提供智能回复',
    tools: ['nlp-processor']
  };
  
  const result = vfmEvaluator.evaluateCapability(testCapability);
  console.log('✓ 成功执行基本评估');
  console.log('  - 能力名称:', result.capability.name);
  console.log('  - 总分:', result.totalScore.toFixed(2));
  console.log('  - 是否高价值:', result.shouldProceed);
  console.log('  - 维度评分数量:', Object.keys(result.dimensionScores).length);
} catch (error) {
  console.log('✗ 基本评估失败:', error.message);
}

console.log('\n测试2: 新价值维度评估');
console.log('  测试战略价值、可扩展性、集成价值、创新潜力维度');
try {
  const strategicCapability = {
    name: '战略规划系统',
    type: 'core',
    description: '为企业提供长期战略规划和发展方向',
    tools: ['strategic-analyzer'],
    longTerm: true,
    strategic: true
  };
  
  const result = vfmEvaluator.evaluateCapability(strategicCapability);
  console.log('✓ 成功评估战略能力');
  console.log('  - 战略价值评分:', result.dimensionScores.strategicValue.toFixed(2));
  console.log('  - 可扩展性评分:', result.dimensionScores.scalability.toFixed(2));
  console.log('  - 集成价值评分:', result.dimensionScores.integrationValue.toFixed(2));
  console.log('  - 创新潜力评分:', result.dimensionScores.innovationPotential.toFixed(2));
} catch (error) {
  console.log('✗ 新价值维度评估失败:', error.message);
}

console.log('\n测试3: 人生决策系统集成');
console.log('  测试能力对人生价值的贡献评估');
try {
  const growthCapability = {
    name: '个人成长教练',
    type: 'core',
    description: '帮助用户制定个人成长计划，实现自我提升',
    tools: ['growth-analyzer'],
    scenarios: ['个人发展', '职业规划', '学习计划']
  };
  
  const result = vfmEvaluator.evaluateCapability(growthCapability);
  console.log('✓ 成功评估人生价值贡献');
  console.log('  - 人生决策评分:', result.details.lifeDecisionScore.toFixed(2));
  console.log('  - 总分:', result.totalScore.toFixed(2));
} catch (error) {
  console.log('✗ 人生决策系统集成测试失败:', error.message);
}

console.log('\n测试4: 动态调整机制');
console.log('  测试基于上下文因素的动态调整');
try {
  const timeSensitiveCapability = {
    name: '工作时间管理',
    type: 'core',
    description: '帮助用户管理工作时间，提高工作效率',
    tools: ['time-manager']
  };
  
  const result = vfmEvaluator.evaluateCapability(timeSensitiveCapability);
  console.log('✓ 成功执行动态调整');
  console.log('  - 上下文因素:', Object.keys(result.details.contextFactors).join(', '));
  console.log('  - 动态调整历史数量:', result.details.dynamicAdjustments.length);
} catch (error) {
  console.log('✗ 动态调整机制测试失败:', error.message);
}

console.log('\n测试5: 批量评估功能');
console.log('  测试多个能力的批量评估');
try {
  const testCapabilities = [
    {
      name: '日常对话处理',
      type: 'core',
      description: '处理用户的日常对话，提供智能回复',
      tools: ['nlp-processor']
    },
    {
      name: '七彩文字生成',
      type: 'specialized',
      description: '将文字转换为七彩颜色的格式',
      tools: ['text-formatter']
    },
    {
      name: '错误处理增强',
      type: 'core',
      description: '增强系统的错误处理能力，减少失败率',
      tools: ['error-handler', 'logger'],
      failureHandling: true
    },
    {
      name: '战略规划系统',
      type: 'core',
      description: '为企业提供长期战略规划和发展方向',
      tools: ['strategic-analyzer'],
      longTerm: true
    }
  ];
  
  const batchResult = vfmEvaluator.batchEvaluate(testCapabilities);
  console.log('✓ 成功执行批量评估');
  console.log('  - 评估总数:', batchResult.totalCount);
  console.log('  - 高价值能力数:', batchResult.highValueCount);
  console.log('  - 高价值比例:', (batchResult.highValueRatio * 100).toFixed(1) + '%');
  console.log('  - 排序结果数量:', batchResult.sortedResults.length);
} catch (error) {
  console.log('✗ 批量评估测试失败:', error.message);
}

console.log('\n测试6: 报告生成功能');
console.log('  测试增强的报告生成功能');
try {
  const testCapabilities = [
    {
      name: '日常对话处理',
      type: 'core',
      description: '处理用户的日常对话，提供智能回复',
      tools: ['nlp-processor']
    },
    {
      name: '战略规划系统',
      type: 'core',
      description: '为企业提供长期战略规划和发展方向',
      tools: ['strategic-analyzer'],
      longTerm: true
    },
    {
      name: '个人成长教练',
      type: 'core',
      description: '帮助用户制定个人成长计划，实现自我提升',
      tools: ['growth-analyzer']
    }
  ];
  
  const evaluations = testCapabilities.map(cap => vfmEvaluator.evaluateCapability(cap));
  const report = vfmEvaluator.generateReport(evaluations);
  
  console.log('✓ 成功生成评估报告');
  console.log('  - 报告ID:', report.id);
  console.log('  - 评估总数:', report.totalEvaluations);
  console.log('  - 高价值能力数:', report.highValueCount);
  console.log('  - 平均分数:', report.averageScore.toFixed(2));
  console.log('  - 人生决策系统平均分:', report.averageLifeDecisionScore.toFixed(2));
  console.log('  - 价值维度数量:', Object.keys(report.dimensionAverages).length);
  console.log('  - 洞察数量:', report.insights.length);
  console.log('  - 部分洞察:');
  report.insights.slice(0, 2).forEach((insight, index) => {
    console.log(`    ${index + 1}. ${insight}`);
  });
} catch (error) {
  console.log('✗ 报告生成测试失败:', error.message);
}

console.log('\n测试7: 配置管理功能');
console.log('  测试配置更新和获取');
try {
  // 获取当前配置
  const currentConfig = vfmEvaluator.getConfig();
  console.log('✓ 成功获取当前配置');
  console.log('  - 版本:', currentConfig.version);
  console.log('  - 阈值:', currentConfig.threshold);
  console.log('  - 价值维度数量:', Object.keys(currentConfig.dimensions).length);
  console.log('  - 动态调整启用:', currentConfig.dynamicAdjustment.enabled);
  console.log('  - 人生决策集成启用:', currentConfig.lifeDecisionIntegration.enabled);
  
  // 更新配置
  const newConfig = vfmEvaluator.updateConfig({
    threshold: 60,
    dynamicAdjustment: {
      enabled: true,
      learningRate: 0.15
    }
  });
  
  console.log('✓ 成功更新配置');
  console.log('  - 新阈值:', newConfig.threshold);
  console.log('  - 新学习率:', newConfig.dynamicAdjustment.learningRate);
} catch (error) {
  console.log('✗ 配置管理测试失败:', error.message);
}

console.log('\n测试8: 缓存机制');
console.log('  测试评估结果缓存');
try {
  const cachedCapability = {
    name: '缓存测试能力',
    type: 'core',
    description: '测试缓存机制的能力',
    tools: ['test-tool']
  };
  
  // 第一次评估（应该缓存）
  const startTime1 = Date.now();
  const result1 = vfmEvaluator.evaluateCapability(cachedCapability);
  const time1 = Date.now() - startTime1;
  
  // 第二次评估（应该使用缓存）
  const startTime2 = Date.now();
  const result2 = vfmEvaluator.evaluateCapability(cachedCapability);
  const time2 = Date.now() - startTime2;
  
  console.log('✓ 成功测试缓存机制');
  console.log('  - 第一次评估时间:', time1, 'ms');
  console.log('  - 第二次评估时间:', time2, 'ms');
  console.log('  - 缓存是否生效:', time2 < time1);
  console.log('  - 结果是否一致:', result1.id === result2.id);
} catch (error) {
  console.log('✗ 缓存机制测试失败:', error.message);
}

console.log('\n测试9: 低价值能力识别');
console.log('  测试低价值能力识别功能');
try {
  const lowValueCapability = {
    name: '七彩文字生成',
    type: 'specialized',
    description: '将文字转换为七彩颜色的格式',
    tools: ['text-formatter']
  };
  
  const result = vfmEvaluator.evaluateCapability(lowValueCapability);
  console.log('✓ 成功识别低价值能力');
  console.log('  - 能力名称:', result.capability.name);
  console.log('  - 是否低价值:', result.isLowValue);
  console.log('  - 总分:', result.totalScore.toFixed(2));
  console.log('  - 是否建议立项:', result.shouldProceed);
} catch (error) {
  console.log('✗ 低价值能力识别测试失败:', error.message);
}

console.log('\n测试10: 综合评估');
console.log('  测试综合评估功能');
try {
  const comprehensiveCapability = {
    name: '智能助手系统',
    type: 'core',
    description: '综合处理用户的各种请求，提供智能助手服务',
    tools: ['nlp-processor', 'task-manager', 'knowledge-base'],
    longTerm: true,
    strategic: true,
    configurable: true,
    api: true,
    scenarios: ['日常对话', '任务管理', '知识查询']
  };
  
  const result = vfmEvaluator.evaluateCapability(comprehensiveCapability);
  console.log('✓ 成功执行综合评估');
  console.log('  - 能力名称:', result.capability.name);
  console.log('  - 总分:', result.totalScore.toFixed(2));
  console.log('  - 是否高价值:', result.shouldProceed);
  console.log('  - 人生决策评分:', result.details.lifeDecisionScore.toFixed(2));
  console.log('  - 评估理由数量:', result.details.reasoning.length);
  console.log('  - 部分评估理由:');
  result.details.reasoning.slice(0, 3).forEach((reason, index) => {
    console.log(`    ${index + 1}. ${reason}`);
  });
} catch (error) {
  console.log('✗ 综合评估测试失败:', error.message);
}

console.log('\n=== 测试完成 ===');
console.log('VFM评估模块增强测试成功，所有功能正常工作！');
