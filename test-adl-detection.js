// 测试增强后的禁止行为检测机制
const { getADLInstance } = require('./skills/adl-core');

console.log('🧪 测试增强后的禁止行为检测机制');
console.log('=====================================');

// 初始化ADL实例
const adl = getADLInstance();

// 测试用例
const testCases = [
  {
    name: '正常能力',
    capability: {
      name: '文件操作',
      description: '处理文件读写、创建、删除等操作',
      inputs: ['文件路径', '操作类型', '操作内容'],
      outputs: ['操作结果', '文件状态'],
      prerequisites: ['文件存在', '权限正确', '磁盘空间充足'],
      failureBoundaries: ['文件不存在', '权限不足', '磁盘空间不足', '文件损坏']
    },
    expected: []
  },
  {
    name: '包含Fake Intelligence的能力',
    capability: {
      name: '智能分析',
      description: '使用复杂的算法进行分析，显得聪明',
      inputs: ['输入1', '输入2', '输入3', '输入4', '输入5', '输入6', '输入7', '输入8', '输入9', '输入10', '输入11'],
      outputs: ['输出1', '输出2', '输出3', '输出4', '输出5', '输出6', '输出7', '输出8', '输出9', '输出10', '输出11'],
      prerequisites: ['数据可用'],
      failureBoundaries: ['数据不可用']
    },
    expected: ['FAKE_INTELLIGENCE']
  },
  {
    name: '包含Vague Concepts的能力',
    capability: {
      name: '直觉分析',
      description: '基于感觉和直觉进行维度分析',
      inputs: ['数据'],
      outputs: ['分析结果'],
      prerequisites: ['数据可用'],
      failureBoundaries: ['数据不可用']
    },
    expected: ['VAGUE_CONCEPTS']
  },
  {
    name: '包含Novelty Bias的能力',
    capability: {
      name: '新颖算法',
      description: '使用全新的、革命性的算法',
      inputs: ['数据'],
      outputs: ['分析结果'],
      prerequisites: ['数据可用'],
      failureBoundaries: ['数据不可用']
    },
    expected: ['NOVELTY_BIAS']
  }
];

// 运行测试用例
testCases.forEach((testCase, index) => {
  console.log(`\n📋 测试用例 ${index + 1}: ${testCase.name}`);
  
  // 检测禁止行为
  const forbiddenBehaviors = adl.detectForbiddenBehaviors(testCase.capability);
  
  console.log(`   检测到的禁止行为: ${forbiddenBehaviors.length > 0 ? forbiddenBehaviors.join(', ') : '无'}`);
  console.log(`   预期的禁止行为: ${testCase.expected.length > 0 ? testCase.expected.join(', ') : '无'}`);
  
  // 验证结果
  const passed = forbiddenBehaviors.length === testCase.expected.length && 
    testCase.expected.every(behavior => forbiddenBehaviors.includes(behavior));
  
  console.log(`   测试结果: ${passed ? '✅ 通过' : '❌ 失败'}`);
});

console.log('\n=====================================');
console.log('✅ 禁止行为检测机制测试完成');
