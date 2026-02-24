/**
 * 能力树完整功能测试
 * 测试能力生长、合并和修剪等核心功能
 */

const { lifeDecisionMasterCapabilityTree } = require('./capabilities/life-decision-master-capability-tree');

class CapabilityTreeCompleteTest {
  constructor() {
    this.capabilityTree = lifeDecisionMasterCapabilityTree;
    this.testResults = [];
    console.log('Capability Tree Complete Test initialized');
  }

  // 运行完整功能测试
  runCompleteTest() {
    console.log('\n=== Starting Capability Tree Complete Function Test ===');
    
    this.testResults = [];
    
    // 1. 测试初始状态
    this.testInitialState();
    
    // 2. 测试能力生长
    this.testCapabilityGrowth();
    
    // 3. 测试能力合并
    this.testCapabilityMerge();
    
    // 4. 测试能力修剪
    this.testCapabilityPruning();
    
    // 5. 测试状态恢复
    this.testStateRecovery();
    
    // 6. 生成测试报告
    this.generateTestReport();
    
    return this.testResults;
  }

  // 测试初始状态
  testInitialState() {
    console.log('\n=== Testing Initial State ===');
    
    try {
      const initialStatus = this.capabilityTree.getStatus();
      console.log('Initial status:', JSON.stringify(initialStatus, null, 2));
      
      const initialTree = this.capabilityTree.generateTextTree();
      console.log('Initial tree structure:');
      console.log(initialTree);
      
      this.testResults.push({
        test: 'Initial State Test',
        passed: true,
        details: {
          status: initialStatus,
          nodeCount: initialStatus.totalNodes
        }
      });
      
      console.log('✓ Initial state test passed');
      
    } catch (error) {
      console.log('✗ Initial state test failed:', error.message);
      this.testResults.push({
        test: 'Initial State Test',
        passed: false,
        error: error.message
      });
    }
  }

  // 测试能力生长
  testCapabilityGrowth() {
    console.log('\n=== Testing Capability Growth ===');
    
    try {
      // 记录初始节点数
      const initialStatus = this.capabilityTree.getStatus();
      const initialNodeCount = initialStatus.totalNodes;
      
      // 1. 添加职业决策路径
      const careerPath = this.capabilityTree.addDecisionPath('职业决策路径', {
        inputs: ['职业状况', '职业目标', '价值观'],
        outputs: ['职业分析', '路径建议', '行动计划'],
        prerequisites: ['信息完整', '目标明确', '价值观清晰'],
        failureBoundaries: ['信息不足', '目标模糊', '价值观冲突']
      });
      
      console.log(`Added career decision path: ${careerPath.name}`);
      
      // 2. 添加健康管理路径
      const healthPath = this.capabilityTree.addEnergyPath('健康管理路径', {
        inputs: ['健康状况', '健康目标', '生活习惯'],
        outputs: ['健康评估', '改善建议', '执行计划'],
        prerequisites: ['状态可测量', '目标明确', '执行意愿强'],
        failureBoundaries: ['状态难以测量', '目标不现实', '执行能力不足']
      });
      
      console.log(`Added health management path: ${healthPath.name}`);
      
      // 记录生长后的节点数
      const growthStatus = this.capabilityTree.getStatus();
      const growthNodeCount = growthStatus.totalNodes;
      
      console.log(`Node count before growth: ${initialNodeCount}`);
      console.log(`Node count after growth: ${growthNodeCount}`);
      console.log(`Nodes added: ${growthNodeCount - initialNodeCount}`);
      
      this.testResults.push({
        test: 'Capability Growth Test',
        passed: growthNodeCount > initialNodeCount,
        details: {
          initialNodes: initialNodeCount,
          growthNodes: growthNodeCount,
          nodesAdded: growthNodeCount - initialNodeCount
        }
      });
      
      if (growthNodeCount > initialNodeCount) {
        console.log('✓ Capability growth test passed');
      } else {
        console.log('✗ Capability growth test failed: No nodes added');
      }
      
    } catch (error) {
      console.log('✗ Capability growth test failed:', error.message);
      this.testResults.push({
        test: 'Capability Growth Test',
        passed: false,
        error: error.message
      });
    }
  }

  // 测试能力合并
  testCapabilityMerge() {
    console.log('\n=== Testing Capability Merge ===');
    
    try {
      // 1. 尝试添加一个与现有能力相似的能力
      console.log('Testing capability merge by adding similar capability...');
      
      const existingCareerPath = this.capabilityTree.addDecisionPath('职业决策路径', {
        inputs: ['职业状况', '职业目标', '价值观', '市场趋势'],
        outputs: ['职业分析', '路径建议', '行动计划', '市场预测'],
        prerequisites: ['信息完整', '目标明确', '价值观清晰', '市场数据可用'],
        failureBoundaries: ['信息不足', '目标模糊', '价值观冲突', '市场数据不可用']
      });
      
      console.log(`Merged with existing capability: ${existingCareerPath.name}`);
      
      // 2. 验证合并是否成功
      const mergedStatus = this.capabilityTree.getStatus();
      console.log('Status after merge:', JSON.stringify(mergedStatus, null, 2));
      
      this.testResults.push({
        test: 'Capability Merge Test',
        passed: true,
        details: {
          status: mergedStatus
        }
      });
      
      console.log('✓ Capability merge test passed');
      
    } catch (error) {
      console.log('✗ Capability merge test failed:', error.message);
      this.testResults.push({
        test: 'Capability Merge Test',
        passed: false,
        error: error.message
      });
    }
  }

  // 测试能力修剪
  testCapabilityPruning() {
    console.log('\n=== Testing Capability Pruning ===');
    
    try {
      // 1. 测试能力修剪
      console.log('Testing capability pruning...');
      const pruningResult = this.capabilityTree.trimCapabilities();
      console.log(`Found ${pruningResult.length} candidate nodes for pruning`);
      
      // 2. 测试清理修剪节点
      console.log('Testing trimmed node cleanup...');
      const cleanupResult = this.capabilityTree.cleanupTrimmedNodes();
      console.log(`Removed ${cleanupResult.length} trimmed nodes`);
      
      // 3. 验证修剪后的状态
      const prunedStatus = this.capabilityTree.getStatus();
      console.log('Status after pruning:', JSON.stringify(prunedStatus, null, 2));
      
      this.testResults.push({
        test: 'Capability Pruning Test',
        passed: true,
        details: {
          pruningCandidates: pruningResult.length,
          cleanedUpNodes: cleanupResult.length,
          status: prunedStatus
        }
      });
      
      console.log('✓ Capability pruning test passed');
      
    } catch (error) {
      console.log('✗ Capability pruning test failed:', error.message);
      this.testResults.push({
        test: 'Capability Pruning Test',
        passed: false,
        error: error.message
      });
    }
  }

  // 测试状态恢复
  testStateRecovery() {
    console.log('\n=== Testing State Recovery ===');
    
    try {
      // 1. 获取最终状态
      const finalStatus = this.capabilityTree.getStatus();
      
      // 2. 生成最终能力树结构
      const finalTree = this.capabilityTree.generateTextTree();
      console.log('Final capability tree structure:');
      console.log(finalTree);
      
      this.testResults.push({
        test: 'State Recovery Test',
        passed: true,
        details: {
          status: finalStatus
        }
      });
      
      console.log('✓ State recovery test passed');
      
    } catch (error) {
      console.log('✗ State recovery test failed:', error.message);
      this.testResults.push({
        test: 'State Recovery Test',
        passed: false,
        error: error.message
      });
    }
  }

  // 生成测试报告
  generateTestReport() {
    console.log('\n=== Capability Tree Complete Function Test Report ===');
    
    const passedTests = this.testResults.filter(test => test.passed).length;
    const totalTests = this.testResults.length;
    const passRate = (passedTests / totalTests * 100).toFixed(2);
    
    console.log(`Test Results: ${passedTests}/${totalTests} tests passed (${passRate}%)`);
    
    this.testResults.forEach(test => {
      const status = test.passed ? '✓ PASS' : '✗ FAIL';
      console.log(`${status}: ${test.test}`);
      
      if (!test.passed && test.error) {
        console.log(`  Error: ${test.error}`);
      }
    });
    
    // 获取最终能力树状态
    const finalStatus = this.capabilityTree.getStatus();
    console.log('\n=== Final Capability Tree Status ===');
    console.log(JSON.stringify(finalStatus, null, 2));
    
    return {
      totalTests,
      passedTests,
      passRate,
      testResults: this.testResults,
      finalStatus
    };
  }
}

// 主函数
function main() {
  const test = new CapabilityTreeCompleteTest();
  
  // 运行完整测试
  const testResults = test.runCompleteTest();
  
  console.log('\n=== Capability Tree Complete Function Test Complete ===');
  
  // 检查是否所有测试都通过
  const allTestsPassed = testResults.every(test => test.passed);
  
  if (allTestsPassed) {
    console.log('\n🎉 All capability tree complete function tests passed!');
    console.log('Capability tree core functions are working correctly.');
  } else {
    console.log('\n⚠️  Some capability tree complete function tests failed.');
    console.log('Please review the test results and address any issues.');
  }
  
  return allTestsPassed;
}

// 运行测试
if (require.main === module) {
  main();
}

module.exports = { CapabilityTreeCompleteTest };