const { WechatyBuilder } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const express = require('express');
const redis = require('redis');
const { OpenAI } = require('openai');
const schedule = require('node-schedule');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

// Redis客户端
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

redisClient.connect().catch(console.error);

// OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 微信机器人实例
let bot = null;
let loginInfo = null;

// 任务调度器
const jobScheduler = schedule.scheduleJob;
const jobs = new Map();

// 确保public目录存在
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

// 初始化微信机器人
function initWechatBot() {
  if (bot) return bot;

  const puppet = new PuppetPadlocal({
    token: process.env.PADLOCAL_TOKEN
  });

  bot = WechatyBuilder.build({
    name: 'wechat-moments-bot',
    puppet
  });

  bot
    .on('login', async (user) => {
      console.log(`登录成功: ${user.name()}`);
      loginInfo = {
        userId: user.id,
        name: user.name(),
        loginTime: new Date().toISOString()
      };

      // 存储登录信息到Redis
      await redisClient.set(`wechat:${user.id}`, JSON.stringify(loginInfo), {
        EX: 60 * 60 * 24 * 7 // 7天过期
      });

      // 恢复未完成的发布任务
      await restoreScheduledJobs();
    })

    .on('logout', (user) => {
      console.log(`登出: ${user.name()}`);
      loginInfo = null;
    })

    .on('error', (error) => {
      console.error('微信机器人错误:', error);
    });

  return bot;
}

// 启动微信机器人
async function startBot() {
  const bot = initWechatBot();
  await bot.start();
  console.log('微信朋友圈机器人已启动');
}

// 恢复未完成的发布任务
async function restoreScheduledJobs() {
  try {
    const jobsData = await redisClient.lRange('scheduled:moments', 0, -1);
    for (const jobData of jobsData) {
      const job = JSON.parse(jobData);
      scheduleJob(job);
    }
    console.log(`已恢复 ${jobsData.length} 个发布任务`);
  } catch (error) {
    console.error('恢复任务失败:', error);
  }
}

// 调度发布任务
function scheduleJob(jobData) {
  const { id, scheduleTime, content, imageUrl } = jobData;
  const date = new Date(scheduleTime);

  const job = jobScheduler(date, async function() {
    try {
      await publishMoment(content, imageUrl);
      console.log(`朋友圈发布成功: ${content}`);
      
      // 从Redis中移除已完成的任务
      await redisClient.lRem('scheduled:moments', 0, JSON.stringify(jobData));
      jobs.delete(id);
    } catch (error) {
      console.error('朋友圈发布失败:', error);
    }
  });

  jobs.set(id, { job, data: jobData });
  console.log(`已调度朋友圈发布任务: ${id}，时间: ${scheduleTime}`);
}

// 发布朋友圈
async function publishMoment(content, imageUrl) {
  if (!bot || !loginInfo) {
    throw new Error('机器人未登录');
  }

  try {
    let fileBox = null;

    // 如果有图片URL，下载并处理
    if (imageUrl) {
      const imagePath = await downloadImage(imageUrl);
      if (imagePath) {
        // 处理图片
        const processedImagePath = await processImage(imagePath);
        fileBox = bot.FileBox.fromFile(processedImagePath);
      }
    }

    // 发布朋友圈
    if (fileBox) {
      await bot.moment({ text: content, media: fileBox });
    } else {
      await bot.moment({ text: content });
    }

    // 记录发布历史
    await recordPublishHistory(content, imageUrl);

  } catch (error) {
    console.error('发布朋友圈失败:', error);
    throw error;
  }
}

// 下载图片
async function downloadImage(url) {
  try {
    const response = await axios.get(url, { responseType: 'arraybuffer' });
    const fileName = `image_${Date.now()}.jpg`;
    const filePath = path.join(__dirname, 'public', fileName);
    
    fs.writeFileSync(filePath, response.data);
    return filePath;
  } catch (error) {
    console.error('下载图片失败:', error);
    return null;
  }
}

// 处理图片
async function processImage(imagePath) {
  try {
    const outputPath = imagePath.replace('.jpg', '_processed.jpg');
    
    // 调整图片尺寸和质量
    await sharp(imagePath)
      .resize(1080, 1080, { fit: 'cover' })
      .jpeg({ quality: 85 })
      .toFile(outputPath);
    
    return outputPath;
  } catch (error) {
    console.error('处理图片失败:', error);
    return imagePath; // 失败时返回原图
  }
}

// 记录发布历史
async function recordPublishHistory(content, imageUrl) {
  const history = {
    id: `moment_${Date.now()}`,
    timestamp: new Date().toISOString(),
    content,
    imageUrl,
    status: 'published'
  };

  await redisClient.lPush('moments:history', JSON.stringify(history));
  await redisClient.lTrim('moments:history', 0, 99); // 只保留最近100条
}

// 生成朋友圈内容
async function generateMomentContent(topic, style) {
  // 从Redis获取用户风格数据
  let userStyle = await redisClient.get('user:style:moments');
  if (!userStyle) {
    // 默认风格
    userStyle = JSON.stringify({
      tone: 'friendly',
      formality: 'casual',
      contentLength: 'medium',
      interests: ['科技', '旅行', '美食', '生活']
    });
  }
  userStyle = JSON.parse(userStyle);

  // 构建OpenAI提示
  const prompt = `你是${loginInfo?.name || '用户'}，正在生成一条朋友圈内容。

` +
  `请根据以下信息生成一条自然、有趣、符合${loginInfo?.name || '用户'}风格的朋友圈内容：

` +
  `主题：${topic || '日常生活'}

` +
  `${loginInfo?.name || '用户'}的风格：
` +
  `- 语气：${userStyle.tone}
` +
  `- 正式程度：${userStyle.formality}
` +
  `- 内容长度：${userStyle.contentLength}
` +
  `- 兴趣：${userStyle.interests.join(', ')}

` +
  `请生成一条自然、符合上述风格的朋友圈内容，不要添加任何额外说明。`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一个擅长生成朋友圈内容的助手，能够创建自然、有趣、符合用户风格的内容。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 200
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('生成朋友圈内容失败:', error);
    throw error;
  }
}

// 生成图片
async function generateImage(prompt) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024'
    });

    return response.data[0].url;
  } catch (error) {
    console.error('生成图片失败:', error);
    throw error;
  }
}

// API路由

// 启动机器人
app.post('/api/moments/start', async (req, res) => {
  try {
    await startBot();
    res.json({ message: '微信朋友圈机器人已启动' });
  } catch (error) {
    console.error('启动机器人失败:', error);
    res.status(500).json({ error: '启动机器人失败' });
  }
});

// 获取登录状态
app.get('/api/moments/status', async (req, res) => {
  if (loginInfo) {
    res.json({ 
      loggedIn: true, 
      user: loginInfo 
    });
  } else {
    res.json({ 
      loggedIn: false, 
      message: '未登录' 
    });
  }
});

// 生成朋友圈内容
app.post('/api/moments/generate', async (req, res) => {
  try {
    const { topic, generateImage: needImage } = req.body;
    
    // 生成文本内容
    const content = await generateMomentContent(topic);
    
    let imageUrl = null;
    if (needImage) {
      // 生成图片
      const imagePrompt = `${topic || '日常生活'}，${loginInfo?.name || '用户'}的朋友圈配图，高清，美观`;
      imageUrl = await generateImage(imagePrompt);
    }
    
    res.json({ content, imageUrl });
  } catch (error) {
    console.error('生成内容失败:', error);
    res.status(500).json({ error: '生成内容失败' });
  }
});

// 发布朋友圈
app.post('/api/moments/publish', async (req, res) => {
  try {
    const { content, imageUrl, scheduleTime } = req.body;
    
    if (scheduleTime) {
      // 调度发布
      const jobData = {
        id: `job_${Date.now()}`,
        scheduleTime,
        content,
        imageUrl
      };
      
      // 存储到Redis
      await redisClient.lPush('scheduled:moments', JSON.stringify(jobData));
      
      // 调度任务
      scheduleJob(jobData);
      
      res.json({ message: '朋友圈发布任务已调度', jobId: jobData.id });
    } else {
      // 立即发布
      await publishMoment(content, imageUrl);
      res.json({ message: '朋友圈发布成功' });
    }
  } catch (error) {
    console.error('发布朋友圈失败:', error);
    res.status(500).json({ error: '发布朋友圈失败' });
  }
});

// 配置发布风格
app.post('/api/moments/style', async (req, res) => {
  try {
    const { style } = req.body;
    await redisClient.set('user:style:moments', JSON.stringify(style), {
      EX: 60 * 60 * 24 * 30 // 30天过期
    });
    res.json({ message: '发布风格已配置' });
  } catch (error) {
    console.error('配置风格失败:', error);
    res.status(500).json({ error: '配置风格失败' });
  }
});

// 获取发布历史
app.get('/api/moments/history', async (req, res) => {
  try {
    const history = await redisClient.lRange('moments:history', 0, 49);
    const moments = history.map(item => JSON.parse(item));
    res.json({ moments });
  } catch (error) {
    console.error('获取发布历史失败:', error);
    res.status(500).json({ error: '获取发布历史失败' });
  }
});

// 获取调度任务
app.get('/api/moments/scheduled', async (req, res) => {
  try {
    const jobsData = await redisClient.lRange('scheduled:moments', 0, 49);
    const scheduledJobs = jobsData.map(item => JSON.parse(item));
    res.json({ jobs: scheduledJobs });
  } catch (error) {
    console.error('获取调度任务失败:', error);
    res.status(500).json({ error: '获取调度任务失败' });
  }
});

// 取消调度任务
app.post('/api/moments/cancel', async (req, res) => {
  try {
    const { jobId } = req.body;
    
    // 取消调度
    const job = jobs.get(jobId);
    if (job) {
      job.job.cancel();
      jobs.delete(jobId);
    }
    
    // 从Redis中移除
    const jobsData = await redisClient.lRange('scheduled:moments', 0, -1);
    for (const jobData of jobsData) {
      const job = JSON.parse(jobData);
      if (job.id === jobId) {
        await redisClient.lRem('scheduled:moments', 0, jobData);
        break;
      }
    }
    
    res.json({ message: '发布任务已取消' });
  } catch (error) {
    console.error('取消任务失败:', error);
    res.status(500).json({ error: '取消任务失败' });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 启动服务器
const PORT = process.env.PORT || 4003;
app.listen(PORT, () => {
  console.log(`微信朋友圈服务运行在端口 ${PORT}`);
});

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('正在关闭服务...');
  if (bot) {
    await bot.stop();
  }
  
  // 取消所有任务
  for (const [jobId, job] of jobs) {
    job.job.cancel();
  }
  
  await redisClient.quit();
  process.exit(0);
});
