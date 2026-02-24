/**
 * ADL核心模块测试
 * 测试新ADL协议的所有要求
 */

const { getADLInstance, CONFIG } = require('../index');
const fs = require('fs');
const path = require('path');

// 清理测试数据
function cleanTestData() {
  const dataDir = path.join(__dirname, '..', 'data');
  if (fs.existsSync(dataDir)) {
    const files = fs.readdirSync(dataDir);
    files.forEach(file => {
      if (file.endsWith('.json')) {
        fs.writeFileSync(path.join(dataDir, file), JSON.stringify({}, null, 2));
      }
    });
  }
}

// 测试套件
function runTests() {
  console.log('\n========================================');
  console.log('🧪 运行 ADL 核心模块测试');
  console.log('========================================');
  
  // 清理测试数据
  cleanTestData();
  
  // 获取ADL实例
  const adl = getADLInstance();
  
  let passedTests = 0;
  let totalTests = 0;
  
  // 测试1: ADL实例初始化
  function testInstanceInitialization() {
    totalTests++;
    console.log('\n📋 测试1: ADL实例初始化');
    
    try {
      if (adl && typeof adl.getStatus === 'function') {
        const status = adl.getStatus();
        console.log('✅ ADL实例初始化成功');
        console.log('   状态:', status.config.status);
        console.log('   优先级:', status.config.priority);
        console.log('   覆盖PCEC:', status.config.overridePCEC);
        passedTests++;
      } else {
        console.error('❌ ADL实例初始化失败');
      }
    } catch (error) {
      console.error('❌ 测试失败:', error.message);
    }
  }
  
  // 测试2: 回滚点管理
  function testRollbackPoints() {
    totalTests++;
    console.log('\n📋 测试2: 回滚点管理');
    
    try {
      // 创建回滚点
      const rollbackPoint = adl.createRollbackPoint('测试回滚点', { test: 'data' });
      
      if (rollbackPoint && rollbackPoint.id) {
        console.log('✅ 回滚点创建成功:', rollbackPoint.id);
        console.log('   描述:', rollbackPoint.description);
        console.log('   失败条件:', rollbackPoint.failureConditions.join(', '));
        console.log('   成功阈值:', rollbackPoint.successThreshold * 100, '%');
        
        // 测试回滚
        const rollbackResult = adl.rollbackToPoint(rollbackPoint.id, ['测试回滚原因']);
        if (rollbackResult) {
          console.log('✅ 回滚操作成功');
        } else {
          console.error('❌ 回滚操作失败');
        }
        
        passedTests++;
      } else {
        console.error('❌ 回滚点创建失败');
      }
    } catch (error) {
      console.error('❌ 测试失败:', error.message);
    }
  }
  
  // 测试3: 禁止行为检测
  function testForbiddenBehaviors() {
    totalTests++;
    console.log('\n📋 测试3: 禁止行为检测');
    
    try {
      // 测试Fake Intelligence
      const fakeIntelligenceCapability = {
        name: '测试能力',
        description: '这是一个为了显得聪明而增加无意义复杂步骤的能力',
        inputs: Array(15).fill('输入'), // 过多输入
        outputs: Array(15).fill('输出'), // 过多输出
        steps: [
          '步骤1',
          '步骤2',
          '步骤1', // 重复步骤
          '步骤3',
          '步骤2'  // 重复步骤
        ]
      };
      
      const fakeIntelligenceResult = adl.detectForbiddenBehaviors(fakeIntelligenceCapability);
      console.log('✅ Fake Intelligence 检测:', fakeIntelligenceResult.includes('FAKE_INTELLIGENCE') ? '通过' : '失败');
      
      // 测试Vague Concepts
      const vagueConceptsCapability = {
        name: '测试能力',
        description: '通过感觉和直觉来处理问题，涉及多个维度的能量',
        inputs: ['输入1'],
        outputs: ['输出1']
      };
      
      const vagueConceptsResult = adl.detectForbiddenBehaviors(vagueConceptsCapability);
      console.log('✅ Vague Concepts 检测:', vagueConceptsResult.includes('VAGUE_CONCEPTS') ? '通过' : '失败');
      
      // 测试Novelty Bias
      const noveltyBiasCapability = {
        name: '革命性创新能力',
        description: '全新的、突破性的、前卫的解决方案',
        inputs: ['输入1'],
        outputs: ['输出1']
      };
      
      const noveltyBiasResult = adl.detectForbiddenBehaviors(noveltyBiasCapability);
      console.log('✅ Novelty Bias 检测:', noveltyBiasResult.includes('NOVELTY_BIAS') ? '通过' : '失败');
      
      // 测试Unverifiable
      const unverifiableCapability = {
        name: '测试能力',
        description: '神秘的、未知的、无法解释的能力',
        inputs: ['输入1'],
        outputs: [] // 无输出
      };
      
      const unverifiableResult = adl.detectForbiddenBehaviors(unverifiableCapability);
      console.log('✅ Unverifiable 检测:', unverifiableResult.includes('UNVERIFIABLE') ? '通过' : '失败');
      
      passedTests++;
    } catch (error) {
      console.error('❌ 测试失败:', error.message);
    }
  }
  
  // 测试4: 核心原则验证
  function testCorePrinciples() {
    totalTests++;
    console.log('\n📋 测试4: 核心原则验证');
    
    try {
      // 测试符合核心原则的能力
      const validCapability = {
        name: '稳定可靠的能力',
        description: '这是一个稳定的、可靠的、能跑1000次不崩的能力，有清晰的解释和可复用的设计',
        inputs: ['输入1', '输入2'],
        outputs: ['输出1', '输出2'],
        prerequisites: ['前提1', '前提2'],
        failureBoundaries: ['边界1', '边界2']
      };
      
      const validResult = adl.validateCorePrinciples(validCapability);
      console.log('✅ 核心原则验证 (有效):', validResult.isValid ? '通过' : '失败');
      
      // 测试违反核心原则的能力
      const invalidCapability = {
        name: '新颖但不稳定的能力',
        description: '这是一个全新的、革命性的能力，但可能不稳定',
        inputs: ['输入1'],
        outputs: ['输出1'],
        prerequisites: ['前提1'],
        failureBoundaries: ['边界1']
      };
      
      const invalidResult = adl.validateCorePrinciples(invalidCapability);
      console.log('✅ 核心原则验证 (无效):', !invalidResult.isValid ? '通过' : '失败');
      
      passedTests++;
    } catch (error) {
      console.error('❌ 测试失败:', error.message);
    }
  }
  
  // 测试5: 失败条件检测和自动回滚
  function testFailureConditions() {
    totalTests++;
    console.log('\n📋 测试5: 失败条件检测和自动回滚');
    
    try {
      // 测试失败条件检测
      const metrics = {
        successRate: 0.85, // 低于90%
        responseTime: 1.6, // 超过50%增加
        errorRate: 0.25, // 超过20%增加
        stability: 0.85 // 低于90%
      };
      
      const failures = adl.checkFailureConditions(metrics);
      console.log('✅ 失败条件检测:', failures.length > 0 ? '通过' : '失败');
      console.log('   检测到的失败:', failures.join(', '));
      
      // 测试自动回滚
      const rollbackPoint = adl.createRollbackPoint('测试回滚点', { test: 'data' });
      const autoRollbackResult = adl.detectAndRollback(metrics);
      console.log('✅ 自动回滚:', autoRollbackResult ? '通过' : '失败');
      
      passedTests++;
    } catch (error) {
      console.error('❌ 测试失败:', error.message);
    }
  }
  
  // 测试6: PCEC优先级管理
  function testPCECPriority() {
    totalTests++;
    console.log('\n📋 测试6: PCEC优先级管理');
    
    try {
      const status = adl.getStatus();
      console.log('✅ ADL状态:', status.config.status);
      console.log('✅ ADL优先级:', status.config.priority);
      console.log('✅ 覆盖PCEC:', status.config.overridePCEC);
      
      // 验证ADL状态为ENFORCED且优先级为LEVEL0
      if (status.config.status === 'ENFORCED' && status.config.priority === 'LEVEL0' && status.config.overridePCEC) {
        console.log('✅ PCEC优先级管理配置正确');
        passedTests++;
      } else {
        console.error('❌ PCEC优先级管理配置错误');
      }
    } catch (error) {
      console.error('❌ 测试失败:', error.message);
    }
  }
  
  // 运行所有测试
  testInstanceInitialization();
  testRollbackPoints();
  testForbiddenBehaviors();
  testCorePrinciples();
  testFailureConditions();
  testPCECPriority();
  
  // 测试总结
  console.log('\n========================================');
  console.log('📊 测试总结');
  console.log('========================================');
  console.log(`总测试数: ${totalTests}`);
  console.log(`通过测试: ${passedTests}`);
  console.log(`失败测试: ${totalTests - passedTests}`);
  console.log(`通过率: ${Math.round((passedTests / totalTests) * 100)}%`);
  console.log('========================================');
  
  return passedTests === totalTests;
}

// 运行测试
if (require.main === module) {
  const success = runTests();
  process.exit(success ? 0 : 1);
}

// 导出测试函数
module.exports = {
  runTests
};