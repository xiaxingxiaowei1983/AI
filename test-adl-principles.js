// 测试强化后的核心原则验证
const { getADLInstance } = require('./skills/adl-core');

console.log('🧪 测试强化后的核心原则验证');
console.log('=====================================');

// 初始化ADL实例
const adl = getADLInstance();

// 测试用例
const testCases = [
  {
    name: '符合核心原则的能力',
    capability: {
      name: '稳定文件操作',
      description: '处理文件读写、创建、删除等操作，稳定可靠，能跑1000次不崩',
      inputs: ['文件路径', '操作类型', '操作内容'],
      outputs: ['操作结果', '文件状态'],
      prerequisites: ['文件存在', '权限正确', '磁盘空间充足'],
      failureBoundaries: ['文件不存在', '权限不足', '磁盘空间不足', '文件损坏']
    },
    expected: true
  },
  {
    name: '违反核心原则的能力',
    capability: {
      name: '新颖算法',
      description: '使用全新的、革命性的算法，非常新颖',
      inputs: ['数据'],
      outputs: ['分析结果'],
      prerequisites: ['数据可用'],
      failureBoundaries: ['数据不可用']
    },
    expected: false
  },
  {
    name: '包含稳定性描述的能力',
    capability: {
      name: '稳定网络请求',
      description: '处理HTTP请求、API调用等网络操作，稳定可靠，能跑1000次不崩',
      inputs: ['请求URL', '请求方法', '请求参数'],
      outputs: ['响应数据', '响应状态'],
      prerequisites: ['网络连接', '请求权限', 'API可用性'],
      failureBoundaries: ['网络断开', '请求超时', '权限拒绝', 'API错误']
    },
    expected: true
  },
  {
    name: '包含可解释性描述的能力',
    capability: {
      name: '可解释数据分析',
      description: '分析数据并能说清为什么得到这样的结果，稳定可靠，能跑1000次不崩',
      inputs: ['数据'],
      outputs: ['分析结果', '解释'],
      prerequisites: ['数据可用'],
      failureBoundaries: ['数据不可用']
    },
    expected: true
  }
];

// 运行测试用例
testCases.forEach((testCase, index) => {
  console.log(`\n📋 测试用例 ${index + 1}: ${testCase.name}`);
  
  // 验证核心原则
  const validationResult = adl.validateCorePrinciples(testCase.capability);
  
  console.log(`   验证结果: ${validationResult.isValid ? '通过' : '失败'}`);
  console.log(`   原则得分: ${JSON.stringify(validationResult.principles, null, 2)}`);
  if (validationResult.violations.length > 0) {
    console.log(`   违反原因: ${validationResult.violations.join(', ')}`);
  }
  
  // 验证结果
  const passed = validationResult.isValid === testCase.expected;
  console.log(`   测试结果: ${passed ? '✅ 通过' : '❌ 失败'}`);
});

console.log('\n=====================================');
console.log('✅ 核心原则验证测试完成');
