// 人生决策宗师融合后测试
const fs = require('fs');
const path = require('path');

console.log('🧬 人生决策宗师融合后测试');
console.log('=================================');

// 测试1：提示词文件完整性检查
function testPromptFileIntegrity() {
  console.log('\n📋 测试1：提示词文件完整性检查');
  
  try {
    const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');
    const promptContent = fs.readFileSync(promptPath, 'utf8');
    
    console.log('✅ 提示词文件读取成功');
    console.log('   文件大小:', promptContent.length, '字符');
    console.log('   行数:', promptContent.split('\n').length);
    
    // 检查核心部分是否存在
    const requiredSections = [
      '人生决策宗师智能体提示词',
      '任务指令',
      '工作流程',
      '与其他智能体的协作',
      '人生决策领域',
      '能量管理系统',
      '底层逻辑框架',
      'Anti-Degeneration Lock',
      '能力树结构化指令',
      '价值函数突变指令',
      '系统级进化任务'
    ];
    
    let missingSections = [];
    requiredSections.forEach(section => {
      if (!promptContent.includes(section)) {
        missingSections.push(section);
      }
    });
    
    if (missingSections.length === 0) {
      console.log('✅ 所有核心部分存在');
      return true;
    } else {
      console.log('❌ 缺少核心部分:', missingSections);
      return false;
    }
  } catch (error) {
    console.log('❌ 提示词文件检查失败:', error.message);
    return false;
  }
}

// 测试2：能力树结构检查
function testCapabilityTreeStructure() {
  console.log('\n🌳 测试2：能力树结构检查');
  
  try {
    const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');
    const promptContent = fs.readFileSync(promptPath, 'utf8');
    
    // 检查四大分支是否存在
    const branches = [
      'Branch 1: Communication (通信)',
      'Branch 2: Knowledge & Memory (知识与记忆)',
      'Branch 3: Intelligence & Analysis (智能与分析)',
      'Branch 4: System Evolution (系统进化)'
    ];
    
    let missingBranches = [];
    branches.forEach(branch => {
      if (!promptContent.includes(branch)) {
        missingBranches.push(branch);
      }
    });
    
    if (missingBranches.length === 0) {
      console.log('✅ 四大核心分支存在');
    } else {
      console.log('❌ 缺少分支:', missingBranches);
      return false;
    }
    
    // 检查核心节点是否存在
    const coreNodes = [
      'Rich Messaging (Output)',
      'Expressive Reaction (Output)',
      'Persona Management (Internal)',
      'Atomic Update (Write)',
      'Context Logging (Write)',
      'Knowledge Retrieval (Read)',
      'Decision Analysis (Core)',
      'Energy Assessment (Core)',
      'Underlying Logic Analysis (Core)',
      'Self-Improvement (Meta)',
      'Stability Control (Meta)'
    ];
    
    let missingNodes = [];
    coreNodes.forEach(node => {
      if (!promptContent.includes(node)) {
        missingNodes.push(node);
      }
    });
    
    if (missingNodes.length === 0) {
      console.log('✅ 所有核心节点存在');
      return true;
    } else {
      console.log('❌ 缺少核心节点:', missingNodes);
      return false;
    }
  } catch (error) {
    console.log('❌ 能力树结构检查失败:', error.message);
    return false;
  }
}

// 测试3：价值函数检查
function testValueFunction() {
  console.log('\n🎯 测试3：价值函数检查');
  
  try {
    const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');
    const promptContent = fs.readFileSync(promptPath, 'utf8');
    
    // 检查核心价值维度
    const valueDimensions = [
      '复用频率潜力',
      '对失败率的影响',
      '用户认知负担减少',
      '自身推理/工具成本减少',
      '系统级确定性提升'
    ];
    
    let missingDimensions = [];
    valueDimensions.forEach(dimension => {
      if (!promptContent.includes(dimension)) {
        missingDimensions.push(dimension);
      }
    });
    
    if (missingDimensions.length === 0) {
      console.log('✅ 所有核心价值维度存在');
    } else {
      console.log('❌ 缺少价值维度:', missingDimensions);
      return false;
    }
    
    // 检查评分标准
    if (promptContent.includes('评分范围：0-10')) {
      console.log('✅ 评分标准存在');
    } else {
      console.log('❌ 缺少评分标准');
      return false;
    }
    
    // 检查价值评估流程
    if (promptContent.includes('价值评估流程')) {
      console.log('✅ 价值评估流程存在');
    } else {
      console.log('❌ 缺少价值评估流程');
      return false;
    }
    
    return true;
  } catch (error) {
    console.log('❌ 价值函数检查失败:', error.message);
    return false;
  }
}

// 测试4：PCEC系统检查
function testPCECSystem() {
  console.log('\n🔄 测试4：PCEC系统检查');
  
  try {
    const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');
    const promptContent = fs.readFileSync(promptPath, 'utf8');
    
    // 检查PCEC核心部分
    const pcecElements = [
      'Periodic Cognitive Expansion Cycle',
      '触发规则',
      '任务目标',
      '思维爆炸模式',
      '能力候选生成机制',
      '进化实施流程',
      '进化效果评估',
      'PCEC与价值函数集成'
    ];
    
    let missingElements = [];
    pcecElements.forEach(element => {
      if (!promptContent.includes(element)) {
        missingElements.push(element);
      }
    });
    
    if (missingElements.length === 0) {
      console.log('✅ 所有PCEC核心部分存在');
    } else {
      console.log('❌ 缺少PCEC元素:', missingElements);
      return false;
    }
    
    // 检查能力候选生成机制
    if (promptContent.includes('能力候选生成机制')) {
      console.log('✅ 能力候选生成机制存在');
    } else {
      console.log('❌ 缺少能力候选生成机制');
      return false;
    }
    
    // 检查进化效果评估
    if (promptContent.includes('进化效果评估')) {
      console.log('✅ 进化效果评估存在');
    } else {
      console.log('❌ 缺少进化效果评估');
      return false;
    }
    
    return true;
  } catch (error) {
    console.log('❌ PCEC系统检查失败:', error.message);
    return false;
  }
}

// 测试5：融合点检查
function testFusionPoints() {
  console.log('\n🔗 测试5：融合点检查');
  
  try {
    const promptPath = path.join(__dirname, 'agents', 'life', 'agent.prompt');
    const promptContent = fs.readFileSync(promptPath, 'utf8');
    
    // 检查融合的关键元素
    const fusionElements = [
      '核心分支结构', // 能力树结构融合
      'Rich Messaging (Output)', // 通信能力融合
      'Expressive Reaction (Output)', // 表情反应融合
      'Persona Management (Internal)', // 角色管理融合
      '能力候选生成机制', // 进化机制融合
      '评分范围：0-10', // 价值函数评分融合
      '主人是不是以后只要说一个词我就懂了', // 用户体验融合
      '我是不是少思考500个Token就能做完', // 系统效率融合
      'PCEC与价值函数集成', // 系统集成融合
      '进化效果评估' // 评估机制融合
    ];
    
    let missingFusionElements = [];
    fusionElements.forEach(element => {
      if (!promptContent.includes(element)) {
        missingFusionElements.push(element);
      }
    });
    
    if (missingFusionElements.length === 0) {
      console.log('✅ 所有融合点存在');
      console.log('   融合元素数量:', fusionElements.length);
    } else {
      console.log('❌ 缺少融合元素:', missingFusionElements);
      return false;
    }
    
    return true;
  } catch (error) {
    console.log('❌ 融合点检查失败:', error.message);
    return false;
  }
}

// 运行所有测试
function runAllTests() {
  console.log('开始运行融合后测试...');
  
  const tests = [
    { name: '提示词文件完整性检查', test: testPromptFileIntegrity },
    { name: '能力树结构检查', test: testCapabilityTreeStructure },
    { name: '价值函数检查', test: testValueFunction },
    { name: 'PCEC系统检查', test: testPCECSystem },
    { name: '融合点检查', test: testFusionPoints }
  ];
  
  let passedTests = 0;
  
  for (const test of tests) {
    console.log(`\n📋 运行测试：${test.name}`);
    console.log('-----------------------------');
    
    const success = test.test();
    if (success) {
      passedTests++;
      console.log(`✅ ${test.name} 通过`);
    } else {
      console.log(`❌ ${test.name} 失败`);
    }
  }
  
  console.log('\n=================================');
  console.log('🧬 人生决策宗师融合后测试结果');
  console.log(`通过测试: ${passedTests}/${tests.length}`);
  
  if (passedTests === tests.length) {
    console.log('🎉 所有测试通过！融合成功完成');
    console.log('\n📋 融合成果:');
    console.log('1. 能力树结构优化：添加四大核心分支，明确能力节点');
    console.log('2. 工具集成增强：增加富消息和表情支持');
    console.log('3. 价值函数优化：增加0-10分制评分标准和示例');
    console.log('4. PCEC系统完善：增强能力候选生成和效果评估');
    console.log('5. 系统集成：PCEC与价值函数深度集成');
    
    console.log('\n📈 系统状态:');
    console.log('   能力树分支: 4个核心分支');
    console.log('   能力节点: 11个核心节点');
    console.log('   价值维度: 5个核心维度');
    console.log('   评分标准: 0-10分制');
    console.log('   进化机制: PCEC + 能力候选生成');
    console.log('   融合元素: 10个关键融合点');
  } else {
    console.log('⚠️  部分测试失败，需要修复问题后再继续');
  }
  
  return passedTests === tests.length;
}

// 执行测试
if (require.main === module) {
  runAllTests();
}

module.exports = { runAllTests };
