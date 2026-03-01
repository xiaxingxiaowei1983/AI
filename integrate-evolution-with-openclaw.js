const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('=== 谛听进化与OpenClaw定时任务集成 ===\n');

// 配置参数
const learningDir = path.join(__dirname, 'learning');
const openclawGateway = 'http://127.0.0.1:18789';
const openclawToken = '2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da';
const evolutionJobName = '谛听进化报告';
const evolutionJobDescription = '定期生成谛听智能体的进化报告并通过OpenClaw展示';
const evolutionAgentId = 'business'; // 谛听智能体ID

/**
 * 生成时间戳
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * 读取最新的进化报告
 */
function getLatestEvolutionReport() {
  try {
    const files = fs.readdirSync(learningDir);
    const evolutionFiles = files.filter(file => file.startsWith('evolution-') && file.endsWith('.json'));
    
    if (evolutionFiles.length === 0) {
      console.log('未找到进化报告');
      return null;
    }
    
    // 按时间戳排序，获取最新的进化报告
    evolutionFiles.sort((a, b) => {
      const timeA = parseInt(a.replace('evolution-', '').replace('.json', ''));
      const timeB = parseInt(b.replace('evolution-', '').replace('.json', ''));
      return timeB - timeA;
    });
    
    const latestFile = evolutionFiles[0];
    const reportPath = path.join(learningDir, latestFile);
    const report = JSON.parse(fs.readFileSync(reportPath, 'utf8'));
    
    console.log(`找到最新的进化报告: ${latestFile}`);
    return report;
  } catch (error) {
    console.error('读取进化报告失败:', error.message);
    return null;
  }
}

/**
 * 生成进化报告摘要
 */
function generateEvolutionSummary(report) {
  if (!report) {
    return '暂无进化报告';
  }
  
  const summary = [
    `# 谛听智能体进化报告`,
    `生成时间: ${report.timestamp}`,
    `学习资源数量: ${report.learningCount}`,
    `获得洞察: ${report.insights.length} 个`,
    `改进建议: ${report.improvements.length} 项`,
    '',
    `## 获得的洞察:`,
    ...report.insights.map((insight, index) => `${index + 1}. ${insight}`),
    '',
    `## 改进建议:`,
    ...report.improvements.map((improvement, index) => `${index + 1}. ${improvement}`),
    '',
    `## 下一步行动:`,
    ...report.nextSteps.map((step, index) => `${index + 1}. ${step}`)
  ];
  
  return summary.join('\n');
}

/**
 * 调用OpenClaw API
 */
async function callOpenClawApi(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    const http = require('http');
    const url = `${openclawGateway}${endpoint}`;
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openclawToken}`,
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve({ statusCode: res.statusCode, data: jsonData });
        } catch (error) {
          resolve({ statusCode: res.statusCode, data: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

/**
 * 获取所有定时任务
 */
async function getCronJobs() {
  try {
    const response = await callOpenClawApi('/api/cron/jobs');
    if (response.statusCode === 200 && response.data) {
      // 检查返回的数据类型
      if (Array.isArray(response.data)) {
        return response.data;
      } else if (response.data.jobs && Array.isArray(response.data.jobs)) {
        return response.data.jobs;
      } else {
        console.error('获取定时任务失败: 数据格式不正确');
        return [];
      }
    } else {
      console.error('获取定时任务失败:', response.statusCode);
      return [];
    }
  } catch (error) {
    console.error('获取定时任务时出错:', error.message);
    return [];
  }
}

/**
 * 创建或更新定时任务
 */
async function createOrUpdateCronJob() {
  try {
    // 检查是否已存在同名任务
    const jobs = await getCronJobs();
    const existingJob = jobs.find(job => job.name === evolutionJobName);
    
    // 生成进化报告摘要
    const evolutionReport = getLatestEvolutionReport();
    const evolutionSummary = generateEvolutionSummary(evolutionReport);
    
    // 任务配置
    const jobConfig = {
      name: evolutionJobName,
      description: evolutionJobDescription,
      agentId: evolutionAgentId,
      enabled: true,
      schedule: {
        type: 'every',
        every: {
          value: 1,
          unit: 'hours'
        }
      },
      execution: {
        session: 'isolated',
        wakeMode: 'now',
        what: 'agentTurn',
        prompt: `请生成谛听智能体的最新进化报告，包含学习进度、获得的洞察、改进建议和下一步行动。\n\n最近的进化报告：\n${evolutionSummary}`
      },
      delivery: {
        mode: 'announce',
        channel: 'feishu'
      }
    };
    
    let response;
    if (existingJob) {
      // 更新现有任务
      response = await callOpenClawApi(`/api/cron/jobs/${existingJob.id}`, {
        method: 'PUT',
        body: jobConfig
      });
      console.log('更新定时任务成功！');
    } else {
      // 创建新任务
      response = await callOpenClawApi('/api/cron/jobs', {
        method: 'POST',
        body: jobConfig
      });
      console.log('创建定时任务成功！');
    }
    
    if (response.statusCode === 200 || response.statusCode === 201) {
      console.log('定时任务配置完成！');
      console.log(`任务名称: ${evolutionJobName}`);
      console.log(`执行频率: 每1小时`);
      console.log(`智能体: ${evolutionAgentId} (谛听)`);
      console.log(`结果投递: Feishu`);
      return response.data;
    } else {
      console.error('操作定时任务失败:', response.statusCode);
      return null;
    }
  } catch (error) {
    console.error('操作定时任务时出错:', error.message);
    return null;
  }
}

/**
 * 立即执行定时任务
 */
async function runCronJob(jobId) {
  try {
    const response = await callOpenClawApi(`/api/cron/jobs/${jobId}/run`, {
      method: 'POST'
    });
    
    if (response.statusCode === 200) {
      console.log('立即执行定时任务成功！');
      return response.data;
    } else {
      console.error('立即执行定时任务失败:', response.statusCode);
      return null;
    }
  } catch (error) {
    console.error('立即执行定时任务时出错:', error.message);
    return null;
  }
}

/**
 * 主函数
 */
async function main() {
  try {
    console.log('开始集成谛听进化与OpenClaw定时任务...');
    
    // 创建或更新定时任务
    const job = await createOrUpdateCronJob();
    
    if (job) {
      console.log('');
      console.log('集成完成！');
      console.log('');
      console.log('=== 集成信息 ===');
      console.log(`定时任务ID: ${job.id}`);
      console.log(`任务名称: ${job.name}`);
      console.log(`执行频率: 每1小时`);
      console.log(`智能体: ${job.agentId} (谛听)`);
      console.log(`结果投递: Feishu`);
      console.log('');
      console.log('=== 访问地址 ===');
      console.log(`OpenClaw定时任务页面: http://127.0.0.1:18789/cron`);
      console.log('');
      console.log('=== 操作选项 ===');
      console.log('1. 查看定时任务: 访问上述地址查看任务详情');
      console.log('2. 手动执行: 在定时任务页面点击任务，然后点击"Run Now"');
      console.log('3. 编辑任务: 在定时任务页面点击任务，然后点击"Edit"');
      console.log('');
      
      // 询问是否立即执行任务
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      readline.question('是否立即执行进化报告任务？(y/n): ', (answer) => {
        if (answer.toLowerCase() === 'y') {
          runCronJob(job.id);
        }
        readline.close();
      });
    }
  } catch (error) {
    console.error('集成过程中出错:', error.message);
  }
}

// 启动集成
main();