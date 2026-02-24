/**
 * 能力树验证系统测试脚本
 * 用于测试能力树验证系统的各种功能
 */

const { capabilityTree } = require('./capabilities/capability-tree');
const { capabilityValidator } = require('./capabilities/capability-validator');

async function testCapabilityValidator() {
  console.log('🚀 开始测试能力树验证系统');
  console.log('=====================================');

  // 测试1: 验证能力树结构
  console.log('\n📋 测试1: 验证能力树结构');
  const treeValidation = capabilityValidator.validateTree(capabilityTree);
  console.log('验证结果:', treeValidation.valid ? '✅ 通过' : '❌ 失败');
  
  if (treeValidation.errors.length > 0) {
    console.log('错误:', treeValidation.errors);
  }
  
  if (treeValidation.warnings.length > 0) {
    console.log('警告:', treeValidation.warnings);
  }

  // 测试2: 验证能力树质量
  console.log('\n📊 测试2: 验证能力树质量');
  const qualityEvaluation = capabilityValidator.evaluateTreeQuality(capabilityTree);
  console.log('质量分数:', qualityEvaluation.qualityScore);
  console.log('层级平衡:', qualityEvaluation.qualityScores.levelBalance);
  console.log('使用效率:', qualityEvaluation.qualityScores.usageEfficiency);
  console.log('节点完整性:', qualityEvaluation.qualityScores.nodeCompleteness);

  // 测试3: 生成验证报告
  console.log('\n📄 测试3: 生成验证报告');
  const validationReport = capabilityValidator.generateValidationReport(capabilityTree);
  console.log('报告生成时间:', new Date(validationReport.timestamp).toISOString());
  console.log('改进建议:');
  validationReport.recommendations.forEach((recommendation, index) => {
    console.log(`${index + 1}. ${recommendation}`);
  });

  // 测试4: 验证单个节点
  console.log('\n🔍 测试4: 验证单个节点');
  const nodes = capabilityTree.getAllNodes();
  if (nodes.length > 0) {
    const testNode = nodes[1]; // 选择第一个非根节点
    const nodeValidation = capabilityValidator.validateNode(testNode);
    console.log(`验证节点: ${testNode.name} (L${testNode.level})`);
    console.log('验证结果:', nodeValidation.valid ? '✅ 通过' : '❌ 失败');
    
    if (nodeValidation.errors.length > 0) {
      console.log('错误:', nodeValidation.errors);
    }
    
    if (nodeValidation.warnings.length > 0) {
      console.log('警告:', nodeValidation.warnings);
    }
  }

  // 测试5: 测试边界情况
  console.log('\n🧪 测试5: 测试边界情况');
  
  // 测试空节点
  const emptyNodeValidation = capabilityValidator.validateNode(null);
  console.log('空节点验证:', emptyNodeValidation.valid ? '✅ 通过' : '❌ 失败');
  
  // 测试不完整节点
  const incompleteNode = {
    name: '测试节点',
    level: 2
  };
  const incompleteValidation = capabilityValidator.validateNode(incompleteNode);
  console.log('不完整节点验证:', incompleteValidation.valid ? '✅ 通过' : '❌ 失败');
  console.log('不完整节点警告:', incompleteValidation.warnings);

  console.log('\n=====================================');
  console.log('🎯 能力树验证系统测试完成');
}

// 执行测试
testCapabilityValidator().catch(error => {
  console.error('测试失败:', error);
});
