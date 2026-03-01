const WebSocket = require('ws');

const openclawUrl = 'ws://127.0.0.1:18789';
const token = '2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da';

console.log('=== 通过 WebSocket 建立 OpenClaw 定时任务 ===');
console.log('连接到 OpenClaw:', openclawUrl);

// 创建 WebSocket 连接
const ws = new WebSocket(openclawUrl, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// 定时任务配置
const jobConfig = {
  name: '进化系统报告',
  description: '定期执行进化系统并生成进化报告',
  agentId: 'business', // 谛听智能体
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
    prompt: '请执行进化系统并生成最新的进化报告，包含学习进度、获得的洞察、改进建议和下一步行动。\n\n执行命令：node evolver/index.js --loop'
  },
  delivery: {
    mode: 'announce',
    channel: 'feishu'
  }
};

ws.on('open', () => {
  console.log('✅ 成功连接到 OpenClaw');
});

ws.on('message', (data) => {
  try {
    const message = JSON.parse(data);
    console.log('收到响应:', JSON.stringify(message, null, 2));
    
    if (message.type === 'event' && message.event === 'connect.challenge') {
      // 处理连接挑战
      console.log('处理连接挑战...');
      const challengeResponse = {
        type: 'connect.challenge',
        payload: {
          nonce: message.payload.nonce,
          ts: message.payload.ts
        }
      };
      ws.send(JSON.stringify(challengeResponse));
      console.log('已发送挑战响应');
    } else if (message.type === 'event' && message.event === 'connect.accepted') {
      // 连接已接受，现在发送创建任务的请求
      console.log('连接已接受，发送创建定时任务请求...');
      const createJobRequest = {
        type: 'cron.job.create',
        payload: jobConfig
      };
      ws.send(JSON.stringify(createJobRequest));
    } else if (message.type === 'cron.job.created' || message.type === 'cron.job.updated') {
      console.log('✅ 定时任务创建成功！');
      console.log('任务名称:', message.payload.name);
      console.log('任务ID:', message.payload.jobId);
      console.log('执行频率:', `每 ${message.payload.schedule.every.value} ${message.payload.schedule.every.unit}`);
      console.log('智能体:', message.payload.agentId);
      console.log('');
      console.log('🎉 进化系统与 OpenClaw 定时任务集成完成！');
      // 关闭连接
      ws.close();
    } else if (message.type === 'error') {
      console.error('❌ 创建定时任务失败:', message.payload.error);
      // 关闭连接
      ws.close();
    }
  } catch (error) {
    console.error('解析响应失败:', error.message);
  }
});

ws.on('error', (error) => {
  console.error('❌ WebSocket 连接错误:', error.message);
});

ws.on('close', () => {
  console.log('WebSocket 连接已关闭');
});