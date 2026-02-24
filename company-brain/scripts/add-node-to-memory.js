// 将大宗师节点添加到公司大脑记忆系统

const MemorySystem = require('../src/memory');

async function addNodeToMemory() {
  console.log('🔧 初始化记忆系统...');
  const memorySystem = new MemorySystem();
  
  try {
    await memorySystem.init();
    console.log('✅ 记忆系统初始化完成');
    
    // 准备节点信息
    const nodeInfo = {
      name: 'EvoMap 节点 - 大宗师',
      type: 'ai_node',
      category: 'evomap',
      content: {
        nodeName: '大宗师',
        nodeStatus: '在线运行中',
        nodeId: 'node_b9f8f981bc1c0bbb',
        reputation: 50,
        initialPoints: 500,
        accountType: 'Free Plan (1/10 节点)',
        evolverStatus: {
          running: true,
          mode: '--loop',
          frequency: '每 4 小时自动执行一次循环',
          assets: true,
          tasks: true
        },
        recommendedAssets: [
          { name: 'AI 代理自省调试框架', gdiScore: 66 },
          { name: '通用 HTTP 重试机制', gdiScore: 66 },
          { name: '飞书消息传递回退链', gdiScore: 64.95 },
          { name: '通用 HTTP 重试', gdiScore: 64.7 },
          { name: '跨会话内存连续性', gdiScore: 64.6 }
        ],
        recommendations: [
          '保持 Evolver 在 --loop 模式下持续运行',
          '考虑发布一些优质资产来赚取更多积分',
          '参与系统推荐的任务和赏金来获取额外奖励',
          '关注系统推荐的低供应 niche 领域，发布相关资产可减少碳税'
        ],
        status: '完全设置就绪，可以开始通过 EvoMap 网络共享和获取 AI 能力'
      },
      keywords: ['evomap', 'node', '大宗师', 'evolver', 'ai', 'agent'],
      priority: 'high',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    console.log('📝 添加节点信息到记忆系统...');
    const result = await memorySystem.addKnowledge(nodeInfo);
    
    console.log('✅ 节点信息添加成功！');
    console.log('📄 节点信息 ID:', result.id);
    console.log('📊 节点名称:', result.content.nodeName);
    console.log('📊 节点状态:', result.content.nodeStatus);
    console.log('📊 节点 ID:', result.content.nodeId);
    console.log('📊 声誉值:', result.content.reputation);
    console.log('📊 初始积分:', result.content.initialPoints);
    console.log('📊 账户类型:', result.content.accountType);
    
    console.log('\n🚀 Evolver 运行状态:');
    console.log('  - 运行模式:', result.content.evolverStatus.mode);
    console.log('  - 执行频率:', result.content.evolverStatus.frequency);
    
    console.log('\n💎 系统推荐的优质资产:');
    result.content.recommendedAssets.forEach((asset, index) => {
      console.log(`  ${index + 1}. ${asset.name} (GDI 评分: ${asset.gdiScore})`);
    });
    
    console.log('\n💡 后续建议:');
    result.content.recommendations.forEach((recommendation, index) => {
      console.log(`  ${index + 1}. ${recommendation}`);
    });
    
    console.log('\n🎉 节点已经完全添加到公司大脑的记忆中！');
    
  } catch (error) {
    console.error('❌ 添加节点信息失败:', error.message);
  } finally {
    console.log('🔚 操作完成');
  }
}

// 执行脚本
addNodeToMemory();
