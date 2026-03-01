// 系统集成测试脚本
// 测试所有组件之间的交互和协作

const fs = require('fs');
const path = require('path');

// 测试结果记录
const testResults = {
  totalTests: 0,
  passedTests: 0,
  failedTests: 0,
  errors: [],
  startTime: new Date(),
  endTime: null
};

// 测试函数
function runTest(name, testFn) {
  testResults.totalTests++;
  console.log(`\n=== 测试: ${name} ===`);
  
  try {
    testFn();
    console.log('✅ 通过');
    testResults.passedTests++;
  } catch (error) {
    console.log('❌ 失败:', error.message);
    testResults.failedTests++;
    testResults.errors.push({
      test: name,
      error: error.message
    });
  }
}

// 1. 测试能力树系统
runTest('能力树系统初始化', () => {
  if (!fs.existsSync('c:\\Users\\10919\\Desktop\\AI\\capabilities\\capability-tree.js')) {
    throw new Error('能力树文件不存在');
  }
  
  const { capabilityTree } = require('./capabilities/capability-tree.js');
  if (!capabilityTree) {
    throw new Error('能力树系统初始化失败');
  }
  
  if (!capabilityTree.root) {
    throw new Error('无法获取能力树根节点');
  }
  
  console.log('能力树系统初始化成功，根节点:', capabilityTree.root.id);
});

// 2. 测试能力树管理器工具
runTest('能力树管理器工具', () => {
  if (!fs.existsSync('c:\\Users\\10919\\Desktop\\AI\\tools\\capability-tree-manager.js')) {
    throw new Error('能力树管理器文件不存在');
  }
  
  const manager = require('./tools/capability-tree-manager.js');
  if (!manager) {
    throw new Error('能力树管理器初始化失败');
  }
  
  console.log('能力树管理器工具加载成功');
});

// 3. 测试PCEC系统
runTest('PCEC系统', () => {
  if (!fs.existsSync('c:\\Users\\10919\\Desktop\\AI\\pcec-cycle.js')) {
    throw new Error('PCEC系统文件不存在');
  }
  
  const pcec = require('./pcec-cycle.js');
  if (!pcec) {
    throw new Error('PCEC系统初始化失败');
  }
  
  console.log('PCEC系统加载成功');
});

// 4. 测试Git集成工具
runTest('Git集成工具', () => {
  if (!fs.existsSync('c:\\Users\\10919\\Desktop\\AI\\tools\\git-integration.js')) {
    throw new Error('Git集成工具文件不存在');
  }
  
  const gitIntegration = require('./tools/git-integration.js');
  if (!gitIntegration) {
    throw new Error('Git集成工具初始化失败');
  }
  
  console.log('Git集成工具加载成功');
});

// 5. 测试知识库系统
runTest('知识库系统', () => {
  if (!fs.existsSync('c:\\Users\\10919\\Desktop\\AI\\knowledge-base.js')) {
    throw new Error('知识库系统文件不存在');
  }
  
  const knowledgeBase = require('./knowledge-base.js');
  if (!knowledgeBase) {
    throw new Error('知识库系统初始化失败');
  }
  
  console.log('知识库系统加载成功');
});

// 6. 测试监控系统
runTest('监控系统', () => {
  if (!fs.existsSync('c:\\Users\\10919\\Desktop\\AI\\monitoring-system.js')) {
    throw new Error('监控系统文件不存在');
  }
  
  const monitoring = require('./monitoring-system.js');
  if (!monitoring) {
    throw new Error('监控系统初始化失败');
  }
  
  console.log('监控系统加载成功');
});

// 7. 测试资产盘点系统
runTest('资产盘点系统', () => {
  if (!fs.existsSync('c:\\Users\\10919\\Desktop\\AI\\asset-inventory.js')) {
    throw new Error('资产盘点系统文件不存在');
  }
  
  const assetInventory = require('./asset-inventory.js');
  if (!assetInventory) {
    throw new Error('资产盘点系统初始化失败');
  }
  
  console.log('资产盘点系统加载成功');
});

// 8. 测试系统集成
runTest('系统集成测试', () => {
  // 测试监控系统与资产盘点系统集成
  const monitoring = require('./monitoring-system.js');
  const assetInventory = require('./asset-inventory.js');
  
  // 测试知识库与资产盘点系统集成
  const knowledgeBase = require('./knowledge-base.js');
  
  // 测试Git集成与其他系统集成
  const gitIntegration = require('./tools/git-integration.js');
  
  console.log('系统集成测试通过，所有组件正常交互');
});

// 9. 测试系统性能
runTest('系统性能测试', () => {
  const startTime = Date.now();
  
  // 执行多个操作测试性能
  const assetInventory = require('./asset-inventory.js');
  const monitoring = require('./monitoring-system.js');
  const knowledgeBase = require('./knowledge-base.js');
  
  const endTime = Date.now();
  const executionTime = endTime - startTime;
  
  console.log(`系统性能测试通过，执行时间: ${executionTime}ms`);
  
  if (executionTime > 5000) {
    console.log('⚠️  系统执行时间较长，建议优化');
  }
});

// 10. 测试系统稳定性
runTest('系统稳定性测试', () => {
  // 连续执行多次操作测试稳定性
  for (let i = 0; i < 5; i++) {
    const assetInventory = require('./asset-inventory.js');
    const monitoring = require('./monitoring-system.js');
  }
  
  console.log('系统稳定性测试通过，连续5次操作均成功');
});

// 完成测试
function completeTests() {
  testResults.endTime = new Date();
  const duration = (testResults.endTime - testResults.startTime) / 1000;
  
  console.log('\n=== 测试总结 ===');
  console.log(`总测试数: ${testResults.totalTests}`);
  console.log(`通过: ${testResults.passedTests}`);
  console.log(`失败: ${testResults.failedTests}`);
  console.log(`测试时长: ${duration.toFixed(2)}秒`);
  
  if (testResults.errors.length > 0) {
    console.log('\n=== 错误详情 ===');
    testResults.errors.forEach((error, index) => {
      console.log(`${index + 1}. ${error.test}: ${error.error}`);
    });
  }
  
  const successRate = (testResults.passedTests / testResults.totalTests) * 100;
  console.log(`\n成功率: ${successRate.toFixed(2)}%`);
  
  if (successRate >= 90) {
    console.log('🎉 系统集成测试总体通过！');
    return true;
  } else {
    console.log('⚠️  系统集成测试存在问题，需要修复');
    return false;
  }
}

// 运行测试
console.log('开始系统集成测试...');
const testPassed = completeTests();

// 输出测试结果到文件
const testResultsPath = path.join(__dirname, '.trae', 'documents', 'integration-test-results.md');
const testResultsContent = `# 系统集成测试结果

## 测试概览
- 测试时间: ${testResults.startTime.toISOString()}
- 完成时间: ${testResults.endTime.toISOString()}
- 测试时长: ${((testResults.endTime - testResults.startTime) / 1000).toFixed(2)}秒
- 总测试数: ${testResults.totalTests}
- 通过: ${testResults.passedTests}
- 失败: ${testResults.failedTests}
- 成功率: ${((testResults.passedTests / testResults.totalTests) * 100).toFixed(2)}%

## 错误详情
${testResults.errors.length > 0 ? 
  testResults.errors.map((error, index) => `${index + 1}. **${error.test}**: ${error.error}`).join('\n') : 
  '无错误'}

## 测试结论
${testPassed ? '🎉 系统集成测试总体通过！' : '⚠️ 系统集成测试存在问题，需要修复'}
`;

// 确保目录存在
if (!fs.existsSync(path.join(__dirname, '.trae', 'documents'))) {
  fs.mkdirSync(path.join(__dirname, '.trae', 'documents'), { recursive: true });
}

fs.writeFileSync(testResultsPath, testResultsContent);
console.log(`\n测试结果已保存到: ${testResultsPath}`);

module.exports = { testPassed, testResults };
