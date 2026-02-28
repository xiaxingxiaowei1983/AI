/**
 * 能力树测试套件 (Capability Tree Test Suite)
 * 用于测试能力树的核心功能、集成和性能
 */

const { capabilityTree } = require('./capabilities/capability-tree');
const { capabilityValidator } = require('./capabilities/capability-validator');
const { capabilityTreeManager } = require('./tools/capability-tree-manager');
const agentManager = require('./agents/agent_manager');
const { executePCECCycle } = require('./pcec-cycle');

class CapabilityTreeTestSuite {
  constructor() {
    this.testResults = [];
    this.totalTests = 0;
    this.passedTests = 0;
  }

  // 记录测试结果
  recordTestResult(testName, passed, message = '') {
    this.totalTests++;
    if (passed) {
      this.passedTests++;
    }

    const result = {
      testName,
      passed,
      message,
      timestamp: new Date().toISOString()
    };

    this.testResults.push(result);
    console.log(`${passed ? '✅' : '❌'} ${testName}: ${passed ? 'PASSED' : 'FAILED'}${message ? ' - ' + message : ''}`);
  }

  // 测试能力树核心功能
  async testCoreFunctionality() {
    console.log('\n=====================================');
    console.log('🧪 测试能力树核心功能');
    console.log('=====================================');

    // 测试1: 验证能力树初始化
    try {
      const status = capabilityTree.getStatus();
      this.recordTestResult('能力树初始化验证', status.statistics.totalNodes > 0, `总节点数: ${status.statistics.totalNodes}`);
    } catch (error) {
      this.recordTestResult('能力树初始化验证', false, error.message);
    }

    // 测试2: 测试添加能力节点
    try {
      const rootNode = capabilityTree.getAllNodes()[0];
      const newNode = capabilityTree.addNode('测试能力', 2, rootNode.id, {
        inputs: ['测试输入'],
        outputs: ['测试输出'],
        prerequisites: ['测试前提'],
        failureBoundaries: ['测试失败边界']
      });
      this.recordTestResult('添加能力节点测试', !!newNode, `节点ID: ${newNode.id}`);
    } catch (error) {
      this.recordTestResult('添加能力节点测试', false, error.message);
    }

    // 测试3: 测试定位任务路径
    try {
      const paths = capabilityTree.locateTaskPath('文件操作');
      this.recordTestResult('定位任务路径测试', paths.length > 0, `找到 ${paths.length} 个路径`);
    } catch (error) {
      this.recordTestResult('定位任务路径测试', false, error.message);
    }

    // 测试4: 测试标记节点使用
    try {
      const nodes = capabilityTree.getAllNodes();
      if (nodes.length > 0) {
        capabilityTree.markNodeUsed(nodes[1].id);
        this.recordTestResult('标记节点使用测试', true, `节点 ${nodes[1].name} 标记使用成功`);
      } else {
        this.recordTestResult('标记节点使用测试', false, '没有可用节点');
      }
    } catch (error) {
      this.recordTestResult('标记节点使用测试', false, error.message);
    }

    // 测试5: 测试能力修剪
    try {
      const candidates = capabilityTree.trimCapabilities();
      this.recordTestResult('能力修剪测试', true, `找到 ${candidates.length} 个候选修剪节点`);
    } catch (error) {
      this.recordTestResult('能力修剪测试', false, error.message);
    }

    // 测试6: 测试导出能力树
    try {
      const exportedTree = capabilityTree.export();
      this.recordTestResult('导出能力树测试', !!exportedTree, '能力树导出成功');
    } catch (error) {
      this.recordTestResult('导出能力树测试', false, error.message);
    }

    // 测试7: 测试生成可视化
    try {
      const visualization = capabilityTree.generateVisualization();
      this.recordTestResult('生成可视化测试', !!visualization, `节点数: ${visualization.nodes.length}, 连接数: ${visualization.links.length}`);
    } catch (error) {
      this.recordTestResult('生成可视化测试', false, error.message);
    }

    // 测试8: 测试生成文本树
    try {
      const textTree = capabilityTree.generateTextTree();
      this.recordTestResult('生成文本树测试', typeof textTree === 'string', '文本树生成成功');
    } catch (error) {
      this.recordTestResult('生成文本树测试', false, error.message);
    }
  }

  // 测试能力树验证系统
  async testValidator() {
    console.log('\n=====================================');
    console.log('🧪 测试能力树验证系统');
    console.log('=====================================');

    // 测试1: 验证能力树结构
    try {
      const validationResult = capabilityValidator.validateTree(capabilityTree);
      this.recordTestResult('能力树结构验证', validationResult.valid, `错误: ${validationResult.errors.length}, 警告: ${validationResult.warnings.length}`);
    } catch (error) {
      this.recordTestResult('能力树结构验证', false, error.message);
    }

    // 测试2: 验证能力树质量
    try {
      const qualityEvaluation = capabilityValidator.evaluateTreeQuality(capabilityTree);
      this.recordTestResult('能力树质量评估', qualityEvaluation.qualityScore >= 0, `质量分数: ${qualityEvaluation.qualityScore}`);
    } catch (error) {
      this.recordTestResult('能力树质量评估', false, error.message);
    }

    // 测试3: 生成验证报告
    try {
      const validationReport = capabilityValidator.generateValidationReport(capabilityTree);
      this.recordTestResult('生成验证报告', !!validationReport, `建议数: ${validationReport.recommendations.length}`);
    } catch (error) {
      this.recordTestResult('生成验证报告', false, error.message);
    }
  }

  // 测试能力树管理工具
  async testManager() {
    console.log('\n=====================================');
    console.log('🧪 测试能力树管理工具');
    console.log('=====================================');

    // 测试1: 列出能力节点
    try {
      const nodes = capabilityTreeManager.listNodes();
      this.recordTestResult('列出能力节点测试', nodes.length > 0, `节点数: ${nodes.length}`);
    } catch (error) {
      this.recordTestResult('列出能力节点测试', false, error.message);
    }

    // 测试2: 获取能力树状态
    try {
      const status = capabilityTreeManager.getStatus();
      this.recordTestResult('获取能力树状态测试', !!status, `总节点数: ${status.totalNodes}`);
    } catch (error) {
      this.recordTestResult('获取能力树状态测试', false, error.message);
    }

    // 测试3: 可视化能力树
    try {
      const visualization = capabilityTreeManager.visualizeTree();
      this.recordTestResult('可视化能力树测试', !!visualization, '能力树可视化成功');
    } catch (error) {
      this.recordTestResult('可视化能力树测试', false, error.message);
    }

    // 测试4: 导出能力树
    try {
      const exportPath = capabilityTreeManager.exportTree('json');
      this.recordTestResult('导出能力树测试', !!exportPath, `导出路径: ${exportPath}`);
    } catch (error) {
      this.recordTestResult('导出能力树测试', false, error.message);
    }

    // 测试5: 分析能力树
    try {
      const analysis = capabilityTreeManager.analyzeTree();
      this.recordTestResult('分析能力树测试', !!analysis, '能力树分析成功');
    } catch (error) {
      this.recordTestResult('分析能力树测试', false, error.message);
    }
  }

  // 测试智能体系统集成
  async testAgentIntegration() {
    console.log('\n=====================================');
    console.log('🧪 测试智能体系统集成');
    console.log('=====================================');

    // 测试1: 初始化智能体系统
    try {
      await agentManager.initialize();
      this.recordTestResult('智能体系统初始化测试', true, '智能体系统初始化成功');
    } catch (error) {
      this.recordTestResult('智能体系统初始化测试', false, error.message);
    }

    // 测试2: 获取系统状态（包含能力树状态）
    try {
      const status = agentManager.getSystemStatus();
      this.recordTestResult('获取系统状态测试', !!status.capabilityTreeStatus, '系统状态包含能力树状态');
    } catch (error) {
      this.recordTestResult('获取系统状态测试', false, error.message);
    }
  }

  // 测试PCEC系统集成
  async testPCECIntegration() {
    console.log('\n=====================================');
    console.log('🧪 测试PCEC系统集成');
    console.log('=====================================');

    // 测试1: 执行PCEC周期
    try {
      const result = await executePCECCycle();
      this.recordTestResult('执行PCEC周期测试', !!result, 'PCEC周期执行成功');
    } catch (error) {
      this.recordTestResult('执行PCEC周期测试', false, error.message);
    }
  }

  // 运行所有测试
  async runAllTests() {
    console.log('🚀 开始能力树测试套件');
    console.log('=====================================');

    // 运行核心功能测试
    await this.testCoreFunctionality();

    // 运行验证系统测试
    await this.testValidator();

    // 运行管理工具测试
    await this.testManager();

    // 运行智能体系统集成测试
    await this.testAgentIntegration();

    // 运行PCEC系统集成测试
    await this.testPCECIntegration();

    // 输出测试结果
    this.printTestResults();
  }

  // 输出测试结果
  printTestResults() {
    console.log('\n=====================================');
    console.log('📋 测试结果汇总');
    console.log('=====================================');
    console.log(`总测试数: ${this.totalTests}`);
    console.log(`通过测试: ${this.passedTests}`);
    console.log(`失败测试: ${this.totalTests - this.passedTests}`);
    console.log(`通过率: ${((this.passedTests / this.totalTests) * 100).toFixed(2)}%`);

    // 输出失败的测试
    const failedTests = this.testResults.filter(result => !result.passed);
    if (failedTests.length > 0) {
      console.log('\n❌ 失败的测试:');
      failedTests.forEach(test => {
        console.log(`- ${test.testName}: ${test.message}`);
      });
    }

    console.log('\n=====================================');
    console.log('🎯 能力树测试套件完成');
    console.log('=====================================');
  }
}

// 执行测试
if (require.main === module) {
  const testSuite = new CapabilityTreeTestSuite();
  testSuite.runAllTests().catch(error => {
    console.error('测试套件执行失败:', error);
  });
}

module.exports = {
  CapabilityTreeTestSuite
};
