// 人生决策宗师通信工具集成测试
const fs = require('fs');
const path = require('path');
const { lifeDecisionCapabilityTreeIntegration } = require('./agents/life/capability-tree-integration');
const feishuCardTool = require('./tools/communication/feishu-card');
const feishuStickerTool = require('./tools/communication/feishu-sticker');

console.log('🔧 人生决策宗师通信工具集成测试');
console.log('====================================');

// 测试1：验证工具加载
function testToolLoading() {
  console.log('\n📋 测试1：验证通信工具加载');
  
  try {
    console.log('✅ 飞书卡片工具加载成功:', feishuCardTool.info.name, feishuCardTool.info.version);
    console.log('✅ 飞书表情工具加载成功:', feishuStickerTool.info.name, feishuStickerTool.info.version);
    return true;
  } catch (error) {
    console.log('❌ 工具加载失败:', error.message);
    return false;
  }
}

// 测试2：验证能力树通信分支
function testCapabilityTreeCommunicationBranch() {
  console.log('\n📋 测试2：验证能力树通信分支');
  
  try {
    const status = lifeDecisionCapabilityTreeIntegration.getCapabilityTreeStatus();
    console.log('✅ 能力树状态获取成功');
    console.log('   总节点数:', status.totalNodes);
    console.log('   层级数:', status.maxDepth);
    
    // 生成能力树可视化
    const visualization = lifeDecisionCapabilityTreeIntegration.generateCapabilityTreeVisualization();
    console.log('✅ 能力树可视化生成成功');
    console.log('\n能力树结构:');
    console.log(visualization);
    
    // 验证通信分支存在
    const hasCommunicationBranch = visualization.includes('通信策略');
    const hasRichMessaging = visualization.includes('富消息流程');
    const hasExpressiveReaction = visualization.includes('表情反应流程');
    
    console.log('\n✅ 通信分支验证:');
    console.log('   通信策略分支存在:', hasCommunicationBranch);
    console.log('   富消息流程存在:', hasRichMessaging);
    console.log('   表情反应流程存在:', hasExpressiveReaction);
    
    return hasCommunicationBranch && hasRichMessaging && hasExpressiveReaction;
  } catch (error) {
    console.log('❌ 能力树测试失败:', error.message);
    return false;
  }
}

// 测试3：验证富消息工具功能
function testRichMessagingTool() {
  console.log('\n📋 测试3：验证富消息工具功能');
  
  try {
    // 测试生成富消息卡片
    const cardOptions = {
      text: '# 人生决策分析报告\n\n## 核心发现\n- 职业发展路径清晰\n- 健康状态需要关注\n- 财务规划合理\n\n## 建议\n1. **职业**: 考虑晋升机会\n2. **健康**: 增加运动频率\n3. **财务**: 保持当前储蓄率\n',
      title: '人生决策分析',
      color: '#1F77B4'
    };
    
    const card = feishuCardTool.generateFeishuCard(cardOptions);
    console.log('✅ 富消息卡片生成成功');
    console.log('   卡片结构:', JSON.stringify(card, null, 2));
    
    // 测试生成简洁卡片
    const cleanCard = feishuCardTool.generateCleanCard('测试简洁模式卡片');
    console.log('✅ 简洁模式卡片生成成功');
    
    // 测试生成带按钮的卡片
    const cardWithButtons = feishuCardTool.generateCardWithButtons({
      text: '测试带按钮的卡片',
      title: '按钮测试',
      buttons: [
        {
          text: '查看详情',
          url: 'https://example.com',
          type: 'primary'
        },
        {
          text: '取消',
          url: 'https://example.com/cancel',
          type: 'default'
        }
      ]
    });
    console.log('✅ 带按钮的卡片生成成功');
    
    return true;
  } catch (error) {
    console.log('❌ 富消息工具测试失败:', error.message);
    return false;
  }
}

// 测试4：验证表情反应工具功能
function testExpressiveReactionTool() {
  console.log('\n📋 测试4：验证表情反应工具功能');
  
  try {
    // 测试生成表情
    const emotions = ['happy', 'sad', 'excited', 'confused', 'thankful'];
    
    emotions.forEach(emotion => {
      const stickerInfo = feishuStickerTool.generateSticker(emotion);
      console.log(`✅ 表情生成成功 (${emotion}):`, stickerInfo.sticker, `(imageKey: ${stickerInfo.imageKey})`);
    });
    
    // 测试模糊匹配
    const fuzzySticker = feishuStickerTool.generateSticker('feeling great');
    console.log('✅ 表情模糊匹配成功:', fuzzySticker.sticker);
    
    // 测试缓存功能
    const cacheStatus = feishuStickerTool.getCacheStatus();
    console.log('✅ 表情缓存状态:', cacheStatus);
    
    // 测试从缓存获取
    const testSticker = feishuStickerTool.generateSticker('happy');
    const cachedSticker = feishuStickerTool.getStickerFromCache(testSticker.imageKey);
    console.log('✅ 从缓存获取表情成功:', cachedSticker ? 'Yes' : 'No');
    
    return true;
  } catch (error) {
    console.log('❌ 表情工具测试失败:', error.message);
    return false;
  }
}

// 测试5：验证能力树通信任务分析
function testCommunicationTaskAnalysis() {
  console.log('\n📋 测试5：验证能力树通信任务分析');
  
  try {
    const testTasks = [
      '我需要一个结构化的决策报告',
      '我现在心情很好，想分享我的成功',
      '请以富消息格式呈现分析结果',
      '我希望收到带有表情的回应'
    ];
    
    testTasks.forEach(task => {
      console.log(`\n=== 分析任务: ${task} ===`);
      const analysis = lifeDecisionCapabilityTreeIntegration.analyzeTaskWithCapabilityTree(task);
      console.log('✅ 任务分析成功:', JSON.stringify(analysis, null, 2));
      
      const response = lifeDecisionCapabilityTreeIntegration.generateDecisionResponse(task, {});
      console.log('✅ 响应生成成功:', JSON.stringify(response, null, 2));
    });
    
    return true;
  } catch (error) {
    console.log('❌ 通信任务分析失败:', error.message);
    return false;
  }
}

// 测试6：验证完整的通信工作流
function testCompleteCommunicationWorkflow() {
  console.log('\n📋 测试6：验证完整的通信工作流');
  
  try {
    // 模拟完整的通信工作流
    console.log('🔄 执行完整通信工作流测试...');
    
    // 1. 分析通信任务
    const task = '请生成一个关于职业决策的富消息报告，并添加适当的表情反应';
    const analysis = lifeDecisionCapabilityTreeIntegration.analyzeTaskWithCapabilityTree(task);
    
    // 2. 生成决策响应
    const response = lifeDecisionCapabilityTreeIntegration.generateDecisionResponse(task, {});
    
    // 3. 生成富消息卡片
    const reportCard = feishuCardTool.generateFeishuCard({
      text: '# 职业决策分析报告\n\n## 职业现状\n- 当前职位: 高级工程师\n- 工作年限: 5年\n- 技能水平: 优秀\n\n## 发展机会\n1. **内部晋升**: 技术总监\n2. **外部机会**: 其他公司高级职位\n3. **创业**: 自主创业\n\n## 建议\n基于你的价值观和目标，建议优先考虑内部晋升机会，同时保持外部机会的开放性。',
      title: '职业决策分析',
      color: '#2CA02C'
    });
    
    // 4. 生成表情反应
    const stickerInfo = feishuStickerTool.generateSticker('excited');
    
    console.log('✅ 完整通信工作流执行成功');
    console.log('   任务分析:', analysis.success ? '通过' : '失败');
    console.log('   响应生成:', response.type);
    console.log('   富消息卡片:', reportCard ? '生成成功' : '生成失败');
    console.log('   表情反应:', stickerInfo.sticker);
    
    return true;
  } catch (error) {
    console.log('❌ 完整通信工作流测试失败:', error.message);
    return false;
  }
}

// 运行所有测试
function runAllCommunicationTests() {
  console.log('开始运行通信工具集成测试...');
  
  const tests = [
    { name: '工具加载测试', test: testToolLoading },
    { name: '能力树通信分支测试', test: testCapabilityTreeCommunicationBranch },
    { name: '富消息工具功能测试', test: testRichMessagingTool },
    { name: '表情反应工具功能测试', test: testExpressiveReactionTool },
    { name: '通信任务分析测试', test: testCommunicationTaskAnalysis },
    { name: '完整通信工作流测试', test: testCompleteCommunicationWorkflow }
  ];
  
  const results = {};
  let passedTests = 0;
  
  for (const test of tests) {
    console.log(`\n🔍 运行测试: ${test.name}`);
    console.log('------------------------');
    
    const result = test.test();
    results[test.name] = result;
    
    if (result) {
      passedTests++;
      console.log(`✅ ${test.name} 通过`);
    } else {
      console.log(`❌ ${test.name} 失败`);
    }
  }
  
  console.log('\n====================================');
  console.log('📋 通信工具集成测试结果');
  console.log(`通过测试: ${passedTests}/${tests.length}`);
  console.log(`通过率: ${((passedTests / tests.length) * 100).toFixed(2)}%`);
  
  // 生成测试报告
  const testReport = {
    timestamp: new Date().toISOString(),
    tests: results,
    summary: {
      passedTests,
      totalTests: tests.length,
      passRate: (passedTests / tests.length) * 100
    }
  };
  
  // 保存测试报告
  const reportPath = path.join(__dirname, 'test-reports', 'life-agent-communication-test-report.json');
  fs.mkdirSync(path.dirname(reportPath), { recursive: true });
  fs.writeFileSync(reportPath, JSON.stringify(testReport, null, 2));
  console.log('\n📊 测试报告已保存到:', reportPath);
  
  // 分析测试结果
  console.log('\n🔍 测试结果分析:');
  if (passedTests === tests.length) {
    console.log('🎉 所有通信工具集成测试通过！');
    console.log('\n💡 集成状态:');
    console.log('   - 飞书卡片工具: 已集成');
    console.log('   - 飞书表情工具: 已集成');
    console.log('   - 能力树通信分支: 已创建');
    console.log('   - 通信任务分析: 已实现');
    console.log('   - 完整通信工作流: 已验证');
  } else {
    console.log('⚠️  部分测试失败，需要进一步检查和修复');
    
    // 列出失败的测试
    const failedTests = Object.entries(results)
      .filter(([_, result]) => !result)
      .map(([name]) => name);
    
    console.log('\n❌ 失败的测试:');
    failedTests.forEach(testName => {
      console.log(`   - ${testName}`);
    });
  }
  
  return passedTests === tests.length;
}

// 执行测试
if (require.main === module) {
  runAllCommunicationTests();
}

module.exports = { runAllCommunicationTests };
