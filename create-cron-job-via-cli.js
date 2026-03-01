const { execSync } = require('child_process');

console.log('=== 通过 OpenClaw CLI 创建定时任务 ===');

// 定时任务配置
const jobName = '进化系统报告';
const jobDescription = '定期执行进化系统并生成进化报告';
const agentId = 'business'; // 谛听智能体
const schedule = 'every 1 hours';
const prompt = '请执行进化系统并生成最新的进化报告，包含学习进度、获得的洞察、改进建议和下一步行动。\n\n执行命令：node evolver/index.js --loop';

// 构建创建任务的命令
const createJobCommand = `openclaw cron add \
  --name "${jobName}" \
  --description "${jobDescription}" \
  --agent "${agentId}" \
  --every "1h" \
  --message "${prompt.replace(/"/g, '\\"')}" \
  --announce \
  --channel "feishu"`;

console.log('执行命令:', createJobCommand);
console.log('');

try {
  // 执行命令
  const output = execSync(createJobCommand, { encoding: 'utf8' });
  console.log('✅ 定时任务创建成功！');
  console.log('输出:', output);
  
  // 验证任务是否创建成功
  const listJobsCommand = 'openclaw cron list --json';
  const jobsOutput = execSync(listJobsCommand, { encoding: 'utf8' });
  const jobs = JSON.parse(jobsOutput);
  
  const createdJob = jobs.find(job => job.name === jobName);
  if (createdJob) {
    console.log('');
    console.log('🎉 进化系统与 OpenClaw 定时任务集成完成！');
    console.log('');
    console.log('=== 任务详情 ===');
    console.log('任务名称:', createdJob.name);
    console.log('任务ID:', createdJob.id);
    console.log('智能体:', createdJob.agentId);
    console.log('执行频率:', '每1小时');
    console.log('启用状态:', createdJob.enabled);
    console.log('');
    console.log('=== 访问地址 ===');
    console.log('OpenClaw 定时任务页面: http://127.0.0.1:18789/cron');
  } else {
    console.error('❌ 任务创建后未找到，请检查 OpenClaw 配置');
  }
} catch (error) {
  console.error('❌ 创建定时任务失败:', error.message);
  console.error('错误输出:', error.stdout ? error.stdout : '无输出');
  console.error('错误信息:', error.stderr ? error.stderr : '无错误信息');
}