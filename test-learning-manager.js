const LearningManager = require('./learning-manager');

// 测试学习管理器的完整功能
async function testLearningManager() {
  console.log('====================================');
  console.log('测试学习管理器完整功能');
  console.log('====================================\n');

  const manager = new LearningManager();
  
  // 测试1: 处理陌生任务
  console.log('测试1: 处理陌生任务');
  console.log('------------------------------------');
  
  const testTask = '开发一个智能聊天机器人';
  const processResult = await manager.processNovelTask(testTask);
  
  console.log('任务处理结果:');
  console.log('成功:', processResult.success);
  if (processResult.summary) {
    console.log('任务分析:', processResult.summary.analysis);
    console.log('学习资源数量:', processResult.summary.resources.length);
    console.log('视频学习成功:', processResult.summary.videoLearning.success);
    console.log('Skill创建成功:', processResult.summary.skillCreation.success);
    if (processResult.summary.skillCreation.skillDir) {
      console.log('Skill目录:', processResult.summary.skillCreation.skillDir);
    }
  }
  console.log('');

  // 测试2: 从视频平台学习
  console.log('测试2: 从视频平台学习');
  console.log('------------------------------------');
  
  const videoLearningResult = await manager.learnFromVideoPlatform('人工智能基础', 'youtube');
  console.log('视频学习结果:');
  console.log('成功:', videoLearningResult.success);
  if (videoLearningResult.result) {
    console.log('学习平台:', videoLearningResult.result.platform);
    console.log('学习主题:', videoLearningResult.result.query);
    console.log('学习内容:', videoLearningResult.result.learnedTopics);
  }
  console.log('');

  // 测试3: 下载和安装Skill
  console.log('测试3: 下载和安装Skill');
  console.log('------------------------------------');
  
  const skillUrl = 'https://github.com/example/chatbot-skill';
  const downloadResult = await manager.downloadAndInstallSkill(skillUrl);
  console.log('下载结果:');
  console.log('成功:', downloadResult.success);
  if (downloadResult.skillName) {
    console.log('Skill名称:', downloadResult.skillName);
    console.log('Skill目录:', downloadResult.skillDir);
  }
  console.log('');

  // 测试4: 获取学习历史
  console.log('测试4: 获取学习历史');
  console.log('------------------------------------');
  
  const history = manager.getLearningHistory();
  console.log('学习历史记录数:', history.length);
  if (history.length > 0) {
    console.log('最近的学习记录:', history[history.length - 1]);
  }
  console.log('');

  // 测试5: 获取学习来源
  console.log('测试5: 获取学习来源');
  console.log('------------------------------------');
  
  const sources = manager.getLearningSources();
  console.log('可用的学习来源:');
  for (const key in sources) {
    console.log(`- ${sources[key].name}: ${sources[key].url}`);
  }
  console.log('');

  console.log('====================================');
  console.log('测试完成');
  console.log('====================================');
}

// 运行测试
testLearningManager().catch(console.error);
