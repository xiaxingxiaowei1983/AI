const ModelPoolManager = require('./model-pool-manager');

// 测试模型池系统
async function testModelPoolSystem() {
  console.log('====================================');
  console.log('测试模型池系统');
  console.log('====================================\n');

  // 创建模型池管理器
  const manager = new ModelPoolManager('./model-pool-config.json');
  
  // 测试1: 基本模型获取
  console.log('测试1: 基本模型获取');
  console.log('------------------------------------');
  
  const highSpeedModel = manager.getAvailableModel('highSpeed');
  const intelligentModel = manager.getAvailableModel('intelligent');
  const textModel = manager.getAvailableModel('text');
  
  console.log('高速池模型:', highSpeedModel ? highSpeedModel.name : '无可用模型');
  console.log('智能池模型:', intelligentModel ? intelligentModel.name : '无可用模型');
  console.log('文本池模型:', textModel ? textModel.name : '无可用模型');
  console.log('');

  // 测试2: 任务分配
  console.log('测试2: 任务分配');
  console.log('------------------------------------');
  
  const testTasks = [
    'conversation',
    'basic_question',
    'complex_reasoning',
    'creative_writing',
    'text_analysis',
    'document_processing',
    'multi_modal'
  ];
  
  for (const task of testTasks) {
    const pool = manager.getPoolForTask(task);
    console.log(`任务 "${task}" 分配到: ${pool}`);
  }
  console.log('');

  // 测试3: 模型健康检查
  console.log('测试3: 模型健康检查');
  console.log('------------------------------------');
  
  await manager.performHealthCheck();
  console.log('');

  // 测试4: 自动fallback机制
  console.log('测试4: 自动fallback机制');
  console.log('------------------------------------');
  
  // 模拟主模型出错
  const poolName = 'highSpeed';
  const primaryModel = manager.getAvailableModel(poolName);
  
  if (primaryModel) {
    console.log(`当前 ${poolName} 池使用的主模型: ${primaryModel.name}`);
    
    // 模拟token耗尽错误
    const error = new Error('Token exhausted');
    const fallbackModel = manager.handleModelError(poolName, primaryModel.id, error);
    
    if (fallbackModel) {
      console.log(`发生错误后切换到备用模型: ${fallbackModel.name}`);
    } else {
      console.log('没有可用的备用模型');
    }
    
    // 再次获取模型，应该返回备用模型
    const newModel = manager.getAvailableModel(poolName);
    console.log(`切换后获取的模型: ${newModel ? newModel.name : '无可用模型'}`);
  }
  console.log('');

  // 测试5: 模型池状态
  console.log('测试5: 模型池状态');
  console.log('------------------------------------');
  
  const status = manager.getPoolStatus();
  for (const poolName in status) {
    console.log(`\n${poolName} 池状态:`);
    for (const modelId in status[poolName]) {
      const modelStatus = status[poolName][modelId];
      console.log(`  ${modelId}: ${modelStatus.status}, 响应时间: ${modelStatus.responseTime.toFixed(2)}ms`);
    }
  }
  console.log('');

  console.log('====================================');
  console.log('测试完成');
  console.log('====================================');
}

// 运行测试
testModelPoolSystem().catch(console.error);
