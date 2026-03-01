const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('=== 进化系统与OpenClaw定时任务集成 ===\n');

// 配置参数
const evolverDir = path.join(__dirname, 'evolver');
const learnLogsDir = path.join(evolverDir, 'learn-logs');
const openclawGateway = 'http://127.0.0.1:18789';
const openclawToken = '2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da';
const evolutionJobName = '进化系统报告';
const evolutionJobDescription = '定期执行进化系统并生成进化报告通过OpenClaw展示';
const evolutionAgentId = 'business'; // 谛听智能体ID

/**
 * 生成时间戳
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * 读取最新的学习日志
 */
function getLatestLearnLogs() {
  try {
    if (!fs.existsSync(learnLogsDir)) {
      console.log('学习日志目录不存在');
      return [];
    }
    
    const files = fs.readdirSync(learnLogsDir);
    const learnFiles = files.filter(file => file.startsWith('learn_') && file.endsWith('.md'));
    
    if (learnFiles.length === 0) {
      console.log('未找到学习日志');
      return [];
    }
    
    // 按时间戳排序，获取最新的学习日志
    learnFiles.sort((a, b) => {
      return b.localeCompare(a);
    });
    
    // 获取最近的5个学习日志
    const latestFiles = learnFiles.slice(0, 5);
    const logs = [];
    
    latestFiles.forEach(file => {
      const logPath = path.join(learnLogsDir, file);
      const content = fs.readFileSync(logPath, 'utf8');
      logs.push({
        filename: file,
        content: content
      });
    });
    
    console.log(`找到 ${latestFiles.length} 个学习日志文件`);
    return logs;
  } catch (error) {
    console.error('读取学习日志失败:', error.message);
    return [];
  }
}

/**
 * 生成进化报告摘要
 */
function generateEvolutionSummary(logs) {
  if (logs.length === 0) {
    return '暂无进化报告';
  }
  
  const summary = [
    `# 进化系统报告`,
    `生成时间: ${getTimestamp()}`,
    `学习日志数量: ${logs.length} 个`,
    '',
    `## 最近的学习活动:`,
    ...logs.map((log, index) => {
      const lines = log.content.split('\n');
      const firstLine = lines[0] || '无内容';
      return `${index + 1}. ${log.filename}: ${firstLine}`;
    }),
    '',
    `## 系统状态:`,
    `- 进化系统已连接到 EvoMap`,
    `- 定期执行学习和进化任务`,
    `- 学习日志已保存到 learn-logs 目录`,
    '',
    `## 下一步行动:`,
    `1. 继续监控进化系统的学习进度`,
    `2. 分析学习日志以优化进化策略`,
    `3. 根据学习结果调整系统配置`
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
 * 创建定时任务
 */
async function createCronJob() {
  try {
    // 生成进化报告摘要
    const learnLogs = getLatestLearnLogs();
    const evolutionSummary = generateEvolutionSummary(learnLogs);
    
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
        prompt: `请执行进化系统并生成最新的进化报告，包含学习进度、获得的洞察、改进建议和下一步行动。\n\n最近的学习日志：\n${evolutionSummary}\n\n执行命令：node evolver/index.js --loop`
      },
      delivery: {
        mode: 'announce',
        channel: 'feishu'
      }
    };
    
    // 直接创建任务，不检查是否存在
    const response = await callOpenClawApi('/cron', {
      method: 'POST',
      body: jobConfig
    });
    
    if (response.statusCode === 200 || response.statusCode === 201) {
      console.log('创建定时任务成功！');
      console.log('定时任务配置完成！');
      console.log(`任务名称: ${evolutionJobName}`);
      console.log(`执行频率: 每1小时`);
      console.log(`智能体: ${evolutionAgentId}`);
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
 * 主函数
 */
async function main() {
  try {
    console.log('开始集成进化系统与OpenClaw定时任务...');
    
    // 创建定时任务
    const job = await createCronJob();
    
    if (job) {
      console.log('');
      console.log('集成完成！');
      console.log('');
      console.log('=== 集成信息 ===');
      console.log(`任务名称: ${evolutionJobName}`);
      console.log(`执行频率: 每1小时`);
      console.log(`智能体: ${evolutionAgentId}`);
      console.log(`结果投递: Feishu`);
      console.log('');
      console.log('=== 访问地址 ===');
      console.log(`OpenClaw定时任务页面: http://127.0.0.1:18790/cron`);
      console.log('');
      console.log('=== 操作选项 ===');
      console.log('1. 查看定时任务: 访问上述地址查看任务详情');
      console.log('2. 手动执行: 在定时任务页面点击任务，然后点击"Run Now"');
      console.log('3. 编辑任务: 在定时任务页面点击任务，然后点击"Edit"');
      console.log('');
    }
  } catch (error) {
    console.error('集成过程中出错:', error.message);
  }
}

// 启动集成
main();