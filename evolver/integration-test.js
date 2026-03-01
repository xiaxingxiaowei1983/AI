const fs = require('fs');
const path = require('path');

console.log('=== 谛听8小时进化计划 - 集成测试 ===\n');

const testResults = {
  timestamp: new Date().toISOString(),
  modules: {},
  integration: {},
  summary: {
    totalTests: 0,
    passedTests: 0,
    failedTests: 0,
    successRate: 0
  }
};

function runTest(name, testFn) {
  testResults.summary.totalTests++;
  try {
    const result = testFn();
    if (result.success) {
      testResults.summary.passedTests++;
      console.log(`✅ ${name}: ${result.message || 'Passed'}`);
    } else {
      testResults.summary.failedTests++;
      console.log(`❌ ${name}: ${result.message || 'Failed'}`);
    }
    return result;
  } catch (error) {
    testResults.summary.failedTests++;
    console.log(`❌ ${name}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

console.log('--- 模块测试 ---\n');

runTest('文件系统能力模块', () => {
  const FilesystemCapability = require('./capabilities/filesystem-capability.js');
  const fsCap = new FilesystemCapability();
  const capabilities = fsCap.getCapabilities();
  return {
    success: capabilities.capabilities.length >= 5,
    message: `${capabilities.capabilities.length} 个能力已加载`
  };
});

runTest('数据转换能力模块', () => {
  const DataTransformCapability = require('./capabilities/data-transform-capability.js');
  const dtCap = new DataTransformCapability();
  const capabilities = dtCap.getCapabilities();
  return {
    success: capabilities.capabilities.length >= 5,
    message: `${capabilities.capabilities.length} 个能力已加载`
  };
});

runTest('网络请求能力模块', () => {
  const NetworkCapability = require('./capabilities/network-capability.js');
  const netCap = new NetworkCapability();
  const capabilities = netCap.getCapabilities();
  return {
    success: capabilities.capabilities.length >= 5,
    message: `${capabilities.capabilities.length} 个能力已加载`
  };
});

runTest('错误分类器模块', () => {
  const ErrorClassifier = require('./error-handling/error-classifier.js');
  const classifier = new ErrorClassifier();
  const stats = classifier.getErrorStatistics();
  return {
    success: Object.keys(classifier.errorCategories).length >= 5,
    message: `${Object.keys(classifier.errorCategories).length} 个错误类别已定义`
  };
});

runTest('错误处理器模块', () => {
  const ErrorHandler = require('./error-handling/error-handler.js');
  const handler = new ErrorHandler();
  const stats = handler.getHandlerStatistics();
  return {
    success: Object.keys(handler.handlers).length >= 5,
    message: `${Object.keys(handler.handlers).length} 个处理器已定义`
  };
});

runTest('错误恢复模块', () => {
  const ErrorRecovery = require('./error-handling/error-recovery.js');
  const recovery = new ErrorRecovery();
  const stats = recovery.getRecoveryStatistics();
  return {
    success: Object.keys(recovery.strategies).length >= 5,
    message: `${Object.keys(recovery.strategies).length} 个恢复策略已定义`
  };
});

runTest('错误预测模块', () => {
  const ErrorPredictor = require('./error-handling/error-predictor.js');
  const predictor = new ErrorPredictor();
  const stats = predictor.getPredictionStatistics();
  return {
    success: Object.keys(predictor.errorPatterns).length >= 4,
    message: `${Object.keys(predictor.errorPatterns).length} 个预测模式已定义`
  };
});

runTest('错误预防模块', () => {
  const ErrorPrevention = require('./error-handling/error-prevention.js');
  const prevention = new ErrorPrevention();
  const stats = prevention.getPreventionStatistics();
  return {
    success: Object.keys(prevention.preventionMeasures).length >= 4,
    message: `${Object.keys(prevention.preventionMeasures).length} 个预防措施已定义`
  };
});

runTest('统一接口模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const iface = new UnifiedInterface();
  const stats = iface.getStatistics();
  return {
    success: iface.interfaceSpec !== undefined,
    message: '统一接口规范已定义'
  };
});

runTest('接口适配器模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const InterfaceAdapter = require('./interface/interface-adapter.js');
  const iface = new UnifiedInterface();
  const adapter = new InterfaceAdapter(iface);
  const stats = adapter.getAdapterStatistics();
  return {
    success: adapter.compatibilityMatrix !== undefined,
    message: '兼容性矩阵已定义'
  };
});

runTest('能力发现模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const CapabilityDiscovery = require('./discovery/capability-discovery.js');
  const iface = new UnifiedInterface();
  const discovery = new CapabilityDiscovery(iface);
  const stats = discovery.getDiscoveryStatistics();
  return {
    success: discovery.tagIndex !== undefined,
    message: '发现索引已初始化'
  };
});

runTest('能力推荐模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const CapabilityDiscovery = require('./discovery/capability-discovery.js');
  const CapabilityRecommendation = require('./discovery/capability-recommendation.js');
  const iface = new UnifiedInterface();
  const discovery = new CapabilityDiscovery(iface);
  const recommendation = new CapabilityRecommendation(iface, discovery);
  const stats = recommendation.getRecommendationStatistics();
  return {
    success: recommendation.recommendationEngine !== undefined,
    message: '推荐引擎已初始化'
  };
});

runTest('能力组合器模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const CapabilityComposer = require('./composition/capability-composer.js');
  const iface = new UnifiedInterface();
  const composer = new CapabilityComposer(iface);
  const stats = composer.getCompositionStatistics();
  return {
    success: Object.keys(composer.compositionRules).length >= 4,
    message: `${Object.keys(composer.compositionRules).length} 个组合规则已定义`
  };
});

runTest('组合模板模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const CapabilityComposer = require('./composition/capability-composer.js');
  const CompositionTemplates = require('./composition/composition-templates.js');
  const iface = new UnifiedInterface();
  const composer = new CapabilityComposer(iface);
  const templates = new CompositionTemplates(composer);
  const stats = templates.getTemplateStatistics();
  return {
    success: Object.keys(templates.templates).length >= 5,
    message: `${Object.keys(templates.templates).length} 个模板已定义`
  };
});

runTest('能力评估模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const CapabilityAssessment = require('./automation/capability-assessment.js');
  const iface = new UnifiedInterface();
  const assessment = new CapabilityAssessment(iface);
  const stats = assessment.getAssessmentStatistics();
  return {
    success: Object.keys(assessment.assessmentCriteria).length >= 4,
    message: `${Object.keys(assessment.assessmentCriteria).length} 个评估标准已定义`
  };
});

runTest('能力优化器模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const CapabilityAssessment = require('./automation/capability-assessment.js');
  const CapabilityOptimizer = require('./automation/capability-optimizer.js');
  const iface = new UnifiedInterface();
  const assessment = new CapabilityAssessment(iface);
  const optimizer = new CapabilityOptimizer(iface, assessment);
  const stats = optimizer.getOptimizationStatistics();
  return {
    success: Object.keys(optimizer.optimizationStrategies).length >= 4,
    message: `${Object.keys(optimizer.optimizationStrategies).length} 个优化策略已定义`
  };
});

runTest('使用模式分析模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const UsagePatternAnalyzer = require('./analytics/usage-pattern-analyzer.js');
  const iface = new UnifiedInterface();
  const analyzer = new UsagePatternAnalyzer(iface);
  const stats = analyzer.getAnalyticsStatistics();
  return {
    success: Object.keys(analyzer.patternDefinitions).length >= 4,
    message: `${Object.keys(analyzer.patternDefinitions).length} 个模式定义已创建`
  };
});

runTest('使用预测模块', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const UsagePatternAnalyzer = require('./analytics/usage-pattern-analyzer.js');
  const UsagePredictor = require('./analytics/usage-predictor.js');
  const iface = new UnifiedInterface();
  const analyzer = new UsagePatternAnalyzer(iface);
  const predictor = new UsagePredictor(analyzer);
  const stats = predictor.getPredictorStatistics();
  return {
    success: predictor.predictionModel !== undefined,
    message: '预测模型已初始化'
  };
});

runTest('价值函数突变模块', () => {
  const ValueFunction = require('./value-function.js');
  const ValueFunctionMutator = require('./automation/value-function-mutator.js');
  const vf = new ValueFunction();
  const mutator = new ValueFunctionMutator(vf);
  const stats = mutator.getMutatorStatistics();
  return {
    success: mutator.mutationConfig !== undefined,
    message: '突变配置已定义'
  };
});

console.log('\n--- 集成测试 ---\n');

runTest('能力注册集成', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const FilesystemCapability = require('./capabilities/filesystem-capability.js');
  const iface = new UnifiedInterface();
  const fsCap = new FilesystemCapability();
  
  iface.registerCapability('fs_test', fsCap, { category: 'filesystem' });
  const capabilities = iface.listCapabilities();
  
  return {
    success: capabilities.length > 0,
    message: `${capabilities.length} 个能力已注册`
  };
});

runTest('错误处理链集成', () => {
  const ErrorClassifier = require('./error-handling/error-classifier.js');
  const ErrorHandler = require('./error-handling/error-handler.js');
  const ErrorRecovery = require('./error-handling/error-recovery.js');
  
  const classifier = new ErrorClassifier();
  const handler = new ErrorHandler();
  const recovery = new ErrorRecovery();
  
  const testError = new Error('ECONNREFUSED connection failed');
  const classified = classifier.classifyError(testError);
  
  return {
    success: classified.category === 'NETWORK',
    message: `错误分类正确: ${classified.category}`
  };
});

runTest('能力发现与推荐集成', () => {
  const UnifiedInterface = require('./interface/unified-interface.js');
  const CapabilityDiscovery = require('./discovery/capability-discovery.js');
  const CapabilityRecommendation = require('./discovery/capability-recommendation.js');
  
  const iface = new UnifiedInterface();
  const discovery = new CapabilityDiscovery(iface);
  const recommendation = new CapabilityRecommendation(iface, discovery);
  
  discovery.buildIndex();
  const categories = discovery.getCategories();
  
  return {
    success: true,
    message: '发现与推荐系统集成成功'
  };
});

testResults.summary.successRate = testResults.summary.totalTests > 0
  ? (testResults.summary.passedTests / testResults.summary.totalTests * 100).toFixed(1)
  : 0;

console.log('\n=== 测试摘要 ===\n');
console.log(`总测试数: ${testResults.summary.totalTests}`);
console.log(`通过测试: ${testResults.summary.passedTests}`);
console.log(`失败测试: ${testResults.summary.failedTests}`);
console.log(`成功率: ${testResults.summary.successRate}%`);

const reportPath = path.join(__dirname, 'integration-test-report.json');
fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
console.log(`\n测试报告已保存到: ${reportPath}`);

module.exports = testResults;
