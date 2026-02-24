// 调度系统测试脚本

const SchedulerSystem = require('../src/scheduler/index.js');

async function testSchedulerSystem() {
  console.log('🧪 开始测试调度系统...');
  
  try {
    // 创建调度系统实例
    const schedulerSystem = new SchedulerSystem({
      dataDir: './test-data'
    });
    
    // 等待初始化完成
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('✅ 调度系统初始化完成');
    
    // 测试1: 注册智能体
    console.log('\n1. 测试注册智能体...');
    
    // 注册测试智能体
    const agent1 = await schedulerSystem.registerAgent({
      id: 'test-agent-1',
      name: '测试智能体1',
      type: 'business',
      capabilities: ['business_model_analysis', 'market_analysis'],
      description: '测试用智能体1'
    });
    
    const agent2 = await schedulerSystem.registerAgent({
      id: 'test-agent-2',
      name: '测试智能体2',
      type: 'psychological',
      capabilities: ['psychological_test', 'content_creation'],
      description: '测试用智能体2'
    });
    
    console.log('✅ 智能体注册成功:', agent1.name, agent2.name);
    
    // 测试2: 创建任务
    console.log('\n2. 测试创建任务...');
    
    const task1 = await schedulerSystem.createTask({
      title: '市场分析任务',
      description: '分析当前市场趋势和竞争情况',
      priority: 'high',
      content: '需要详细分析市场规模、增长趋势、主要竞争对手和市场机会'
    });
    
    const task2 = await schedulerSystem.createTask({
      title: '心理测试任务',
      description: '开发新的心理测试问卷',
      priority: 'medium',
      content: '设计一套针对职场人士的心理测试问卷'
    });
    
    console.log('✅ 任务创建成功:', task1.id, task2.id);
    
    // 测试3: 获取任务
    console.log('\n3. 测试获取任务...');
    
    const fetchedTask1 = await schedulerSystem.getTask(task1.id);
    const fetchedTask2 = await schedulerSystem.getTask(task2.id);
    
    console.log('✅ 任务获取成功:', fetchedTask1.title, fetchedTask2.title);
    
    // 测试4: 分配任务
    console.log('\n4. 测试分配任务...');
    
    const assignment1 = await schedulerSystem.assignTask(task1.id);
    const assignment2 = await schedulerSystem.assignTask(task2.id);
    
    console.log('✅ 任务分配成功');
    
    // 测试5: 列出任务
    console.log('\n5. 测试列出任务...');
    
    const allTasks = await schedulerSystem.listTasks();
    const assignedTasks = await schedulerSystem.listTasks({ status: 'assigned' });
    
    console.log('✅ 任务列表获取成功:');
    console.log('   - 总任务数:', allTasks.length);
    console.log('   - 已分配任务数:', assignedTasks.length);
    
    // 测试6: 列出智能体
    console.log('\n6. 测试列出智能体...');
    
    const allAgents = await schedulerSystem.listAgents();
    const availableAgents = await schedulerSystem.listAgents({ status: 'active' });
    
    console.log('✅ 智能体列表获取成功:');
    console.log('   - 总智能体数:', allAgents.length);
    console.log('   - 可用智能体数:', availableAgents.length);
    
    // 测试7: 获取系统状态
    console.log('\n7. 测试获取系统状态...');
    
    const systemStatus = await schedulerSystem.getStatus();
    
    console.log('✅ 系统状态获取成功:', systemStatus);
    
    // 测试8: 处理任务完成
    console.log('\n8. 测试处理任务完成...');
    
    // 模拟任务完成
    await schedulerSystem.updateTask(task1.id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      result: '市场分析完成，发现了几个重要的市场机会'
    });
    
    await schedulerSystem.updateTask(task2.id, {
      status: 'completed',
      completedAt: new Date().toISOString(),
      result: '心理测试问卷开发完成，包含20个问题'
    });
    
    console.log('✅ 任务完成处理成功');
    
    // 测试9: 备份系统
    console.log('\n9. 测试备份系统...');
    
    const backupData = await schedulerSystem.backup();
    
    console.log('✅ 系统备份成功:');
    console.log('   - 智能体数量:', backupData.agents.length);
    console.log('   - 任务数量:', backupData.tasks.length);
    
    // 测试10: 清理测试数据
    console.log('\n10. 测试清理测试数据...');
    
    // 删除测试任务
    await schedulerSystem.deleteTask(task1.id);
    await schedulerSystem.deleteTask(task2.id);
    
    // 删除测试智能体
    await schedulerSystem.deleteAgent(agent1.id);
    await schedulerSystem.deleteAgent(agent2.id);
    
    console.log('✅ 测试数据清理成功');
    
    // 测试完成
    console.log('\n🎉 所有测试通过！调度系统功能正常。');
    
  } catch (error) {
    console.error('❌ 测试过程中发生错误:', error.message);
    console.error(error.stack);
  }
}

// 运行测试
testSchedulerSystem();
