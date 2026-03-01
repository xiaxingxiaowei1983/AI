const EvoMapTaskClaimer = require('./task-claimer');

// 创建模拟任务数据
const mockTask = {
  id: 'task_001',
  title: '上门经济在春节期间的兴起，对传统家政服务行业的冲击',
  description: '分析上门经济在春节期间的兴起原因，以及对传统家政服务行业的具体冲击，提出行业应对策略。',
  status: 'open',
  category: 'economics',
  created_at: '2026-02-24T10:00:00Z',
  updated_at: '2026-02-24T10:00:00Z',
  reward: 500,
  difficulty: 'medium',
  tags: ['上门经济', '家政服务', '春节', '行业分析', '经济冲击']
};

console.log('🎯 模拟上门经济任务:');
console.log(`   标题: ${mockTask.title}`);
console.log(`   描述: ${mockTask.description}`);
console.log(`   状态: ${mockTask.status}`);
console.log(`   类别: ${mockTask.category}`);
console.log(`   奖励: ${mockTask.reward}积分`);
console.log(`   难度: ${mockTask.difficulty}`);
console.log(`   标签: ${mockTask.tags.join(', ')}`);
console.log('');

// 创建任务认领器实例
const claimer = new EvoMapTaskClaimer();

// 直接执行模拟任务
async function executeMockTask() {
  try {
    console.log('🚀 开始执行模拟任务...');
    console.log('');
    
    // 1. 模拟认领任务
    console.log('1. 🎯 认领任务...');
    console.log(`   ✅ 成功认领任务: ${mockTask.title}`);
    console.log('');
    
    // 2. 执行任务
    console.log('2. 📊 分析问题...');
    const analysis = claimer.analyzeTask(mockTask);
    console.log(`   ✅ 完成问题分析`);
    console.log('');
    
    // 3. 生成解决方案
    console.log('3. 💡 生成解决方案...');
    const solution = claimer.generateSolution(mockTask, analysis);
    console.log(`   ✅ 完成解决方案生成`);
    console.log('');
    
    // 4. 创建资产三件套
    console.log('4. 📤 发布资产三件套...');
    const assets = claimer.createAssets(mockTask, analysis, solution);
    
    // 创建任务目录
    const taskDir = `tasks/task_001_${mockTask.title.replace(/\s+/g, '_')}`;
    if (!fs.existsSync(taskDir)) {
      fs.mkdirSync(taskDir, { recursive: true });
    }
    
    // 保存任务信息
    fs.writeFileSync(`${taskDir}/task.json`, JSON.stringify(mockTask, null, 2));
    fs.writeFileSync(`${taskDir}/analysis.md`, analysis);
    fs.writeFileSync(`${taskDir}/solution.md`, solution);
    
    // 保存资产
    const assetsDir = `${taskDir}/assets`;
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir, { recursive: true });
    }
    
    Object.entries(assets).forEach(([key, asset]) => {
      fs.writeFileSync(`${assetsDir}/${key}.json`, JSON.stringify(asset, null, 2));
      console.log(`   ✅ 保存资产: ${asset.name}`);
    });
    console.log('');
    
    // 5. 创建技能文件
    console.log('5. 🛠️ 创建技能文件...');
    claimer.createSkillFile(mockTask, solution);
    console.log('');
    
    // 6. 更新能力树
    console.log('6. 🌳 更新能力树...');
    claimer.updateCapabilityTree(mockTask, solution);
    console.log('');
    
    // 7. 打印执行结果
    console.log('📋 任务执行结果:');
    console.log('');
    console.log('✅ 已完成:');
    console.log('   - 认领任务');
    console.log('   - 分析问题');
    console.log('   - 生成解决方案');
    console.log('   - 发布资产三件套');
    console.log('   - 创建技能文件');
    console.log('   - 更新能力树');
    console.log('');
    
    console.log('📁 生成文件:');
    console.log(`   - ${taskDir}/task.json`);
    console.log(`   - ${taskDir}/analysis.md`);
    console.log(`   - ${taskDir}/solution.md`);
    console.log(`   - ${taskDir}/assets/gene.json`);
    console.log(`   - ${taskDir}/assets/capsule.json`);
    console.log(`   - ${taskDir}/assets/evolutionEvent.json`);
    console.log('   - skills/上门经济分析/SKILL.md');
    console.log('   - capabilities/capability-tree.json');
    console.log('');
    
    console.log('🎉 模拟任务执行完成！');
    
  } catch (error) {
    console.error(`❌ 执行模拟任务时出错: ${error.message}`);
  } finally {
    // 停止服务
    claimer.stop();
  }
}

// 导入 fs 模块
const fs = require('fs');

// 执行模拟任务
executeMockTask();
