const { WechatyBuilder } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const express = require('express');
const redis = require('redis');
const { OpenAI } = require('openai');
const { LanguageServiceClient } = require('@google-cloud/language');
require('dotenv').config();

const app = express();
app.use(express.json());

// Redis客户端
let redisClient = null;
let memoryStorage = {};
try {
  redisClient = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379'
  });
  redisClient.connect().catch(err => {
    console.warn('Redis连接失败，将使用内存存储:', err.message);
    redisClient = null;
  });
} catch (error) {
  console.warn('Redis初始化失败，将使用内存存储:', error.message);
  redisClient = null;
}

// OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Google Cloud Language客户端
let languageClient = null;
if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  languageClient = new LanguageServiceClient();
}

// 微信机器人实例
let bot = null;
let loginInfo = null;

// 消息处理延迟（模拟真实用户）
const MIN_REPLY_DELAY = 1000; // 最小延迟1秒
const MAX_REPLY_DELAY = 5000; // 最大延迟5秒

// 初始化微信机器人
function initWechatBot() {
  if (bot) return bot;

  const puppet = new PuppetPadlocal({
    token: process.env.PADLOCAL_TOKEN
  });

  bot = WechatyBuilder.build({
    name: 'wechat-message-bot',
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

      // 存储登录信息
      if (redisClient) {
        try {
          await redisClient.set(`wechat:${user.id}`, JSON.stringify(loginInfo), {
            EX: 60 * 60 * 24 * 7 // 7天过期
          });
          console.log('登录信息已存储到Redis');
        } catch (redisError) {
          console.warn('Redis存储失败，使用内存存储:', redisError.message);
          memoryStorage[`wechat:${user.id}`] = loginInfo;
        }
      } else {
        console.log('使用内存存储登录信息');
        memoryStorage[`wechat:${user.id}`] = loginInfo;
      }
    })

    .on('logout', (user) => {
      console.log(`登出: ${user.name()}`);
      loginInfo = null;
    })

    .on('message', async (message) => {
      try {
        // 忽略自己发送的消息
        if (message.self()) return;

        // 忽略群消息（暂时）
        if (message.room()) return;

        // 获取发送者
        const sender = message.talker();
        const senderName = sender.name();
        const messageText = message.text();

        console.log(`收到消息 from ${senderName}: ${messageText}`);

        // 分析消息
        const analysis = await analyzeMessage(messageText);
        console.log('消息分析结果:', analysis);

        // 生成回复
        const reply = await generateReply(messageText, senderName, analysis);
        console.log(`生成回复: ${reply}`);

        // 模拟真实用户回复延迟
        const delay = Math.floor(Math.random() * (MAX_REPLY_DELAY - MIN_REPLY_DELAY)) + MIN_REPLY_DELAY;
        console.log(`延迟 ${delay}ms 发送回复`);

        setTimeout(async () => {
          try {
            await message.say(reply);
            console.log(`回复已发送给 ${senderName}`);

            // 存储对话历史
            await storeConversation(sender.id, senderName, messageText, reply);
          } catch (error) {
            console.error('发送回复失败:', error);
          }
        }, delay);

      } catch (error) {
        console.error('处理消息失败:', error);
      }
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
  console.log('微信消息机器人已启动');
}

// 分析消息
async function analyzeMessage(text) {
  const analysis = {
    sentiment: 'neutral',
    sentimentScore: 0,
    intent: 'general',
    keywords: []
  };

  // 使用Google Cloud Language API分析情感
  if (languageClient) {
    try {
      const [result] = await languageClient.analyzeSentiment({
        document: {
          content: text,
          type: 'PLAIN_TEXT'
        }
      });

      const sentiment = result.documentSentiment;
      analysis.sentimentScore = sentiment.score;
      
      if (sentiment.score > 0.2) {
        analysis.sentiment = 'positive';
      } else if (sentiment.score < -0.2) {
        analysis.sentiment = 'negative';
      }

      // 提取关键词
      const [entitiesResult] = await languageClient.analyzeEntities({
        document: {
          content: text,
          type: 'PLAIN_TEXT'
        }
      });

      analysis.keywords = entitiesResult.entities
        .filter(entity => entity.salience > 0.1)
        .map(entity => entity.name);

    } catch (error) {
      console.error('情感分析失败:', error);
    }
  }

  // 简单的意图识别
  if (text.includes('你好') || text.includes('Hello') || text.includes('嗨')) {
    analysis.intent = 'greeting';
  } else if (text.includes('谢谢') || text.includes('感谢')) {
    analysis.intent = 'thank';
  } else if (text.includes('再见') || text.includes('拜拜')) {
    analysis.intent = 'farewell';
  } else if (text.includes('？') || text.includes('?')) {
    analysis.intent = 'question';
  }

  return analysis;
}

// 生成回复
async function generateReply(message, senderName, analysis) {
  // 从Redis获取用户风格数据
  let userStyle = null;
  if (redisClient) {
    try {
      userStyle = await redisClient.get(`user:style:${senderName}`);
    } catch (redisError) {
      console.warn('Redis读取失败，使用内存存储:', redisError.message);
    }
  }
  
  if (!userStyle) {
    userStyle = memoryStorage[`user:style:${senderName}`];
    if (!userStyle) {
      // 默认风格
      userStyle = {
        tone: 'friendly',
        formality: 'casual',
        responseLength: 'medium',
        interests: []
      };
    }
  } else {
    userStyle = JSON.parse(userStyle);
  }

  // 构建OpenAI提示
  const prompt = `你是${loginInfo?.name || '用户'}的数字分身，正在与${senderName}聊天。

` +
  `请根据以下信息生成一个自然、符合${loginInfo?.name || '用户'}风格的回复：

` +
  `收到的消息：${message}

` +
  `消息分析：
` +
  `- 情感：${analysis.sentiment} (评分: ${analysis.sentimentScore})
` +
  `- 意图：${analysis.intent}
` +
  `- 关键词：${analysis.keywords.join(', ')}

` +
  `${loginInfo?.name || '用户'}的风格：
` +
  `- 语气：${userStyle.tone}
` +
  `- 正式程度：${userStyle.formality}
` +
  `- 回复长度：${userStyle.responseLength}
` +
  `- 兴趣：${userStyle.interests.join(', ')}

` +
  `请生成一个自然、符合上述风格的回复，不要添加任何额外说明。`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一个自然、友好的聊天助手，能够模拟用户的语言风格。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('生成回复失败:', error);
    // 备用回复
    return getFallbackReply(analysis.intent);
  }
}

// 备用回复
function getFallbackReply(intent) {
  const replies = {
    greeting: ['你好！最近怎么样？', '嗨！有什么事吗？', '你好呀！'],
    thank: ['不客气！', '没事，应该的！', '不用谢～'],
    farewell: ['再见！', '下次聊！', '拜～'],
    question: ['这个问题很有趣，让我想想...', '我觉得...', '根据我的了解...'],
    general: ['嗯嗯，我明白。', '有意思！', '我也是这么想的。']
  };

  const intentReplies = replies[intent] || replies.general;
  return intentReplies[Math.floor(Math.random() * intentReplies.length)];
}

// 存储对话历史
async function storeConversation(senderId, senderName, message, reply) {
  const conversation = {
    timestamp: new Date().toISOString(),
    sender: {
      id: senderId,
      name: senderName
    },
    message,
    reply
  };

  // 存储到Redis或内存
  if (redisClient && loginInfo) {
    try {
      await redisClient.lPush(`conversation:${loginInfo.userId}`, JSON.stringify(conversation));
      // 只保留最近100条对话
      await redisClient.lTrim(`conversation:${loginInfo.userId}`, 0, 99);
      console.log('对话历史已存储到Redis');
    } catch (redisError) {
      console.warn('Redis存储失败，使用内存存储:', redisError.message);
      if (!memoryStorage[`conversation:${loginInfo.userId}`]) {
        memoryStorage[`conversation:${loginInfo.userId}`] = [];
      }
      memoryStorage[`conversation:${loginInfo.userId}`].unshift(conversation);
      // 只保留最近100条对话
      if (memoryStorage[`conversation:${loginInfo.userId}`].length > 100) {
        memoryStorage[`conversation:${loginInfo.userId}`] = memoryStorage[`conversation:${loginInfo.userId}`].slice(0, 100);
      }
    }
  } else if (loginInfo) {
    // 使用内存存储
    if (!memoryStorage[`conversation:${loginInfo.userId}`]) {
      memoryStorage[`conversation:${loginInfo.userId}`] = [];
    }
    memoryStorage[`conversation:${loginInfo.userId}`].unshift(conversation);
    // 只保留最近100条对话
    if (memoryStorage[`conversation:${loginInfo.userId}`].length > 100) {
      memoryStorage[`conversation:${loginInfo.userId}`] = memoryStorage[`conversation:${loginInfo.userId}`].slice(0, 100);
    }
    console.log('对话历史已存储到内存');
  }
}

// API路由

// 启动机器人
app.post('/api/message/start', async (req, res) => {
  try {
    await startBot();
    res.json({ message: '微信消息机器人已启动' });
  } catch (error) {
    console.error('启动机器人失败:', error);
    res.status(500).json({ error: '启动机器人失败' });
  }
});

// 获取登录状态
app.get('/api/message/status', async (req, res) => {
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

// 配置回复风格
app.post('/api/message/style', async (req, res) => {
  try {
    const { senderName, style } = req.body;
    
    if (redisClient) {
      try {
        await redisClient.set(`user:style:${senderName}`, JSON.stringify(style), {
          EX: 60 * 60 * 24 * 30 // 30天过期
        });
        console.log('回复风格已存储到Redis');
      } catch (redisError) {
        console.warn('Redis存储失败，使用内存存储:', redisError.message);
        memoryStorage[`user:style:${senderName}`] = style;
      }
    } else {
      memoryStorage[`user:style:${senderName}`] = style;
      console.log('回复风格已存储到内存');
    }
    
    res.json({ message: '回复风格已配置' });
  } catch (error) {
    console.error('配置风格失败:', error);
    res.status(500).json({ error: '配置风格失败' });
  }
});

// 获取对话历史
app.get('/api/message/history', async (req, res) => {
  try {
    let conversations = [];
    if (redisClient && loginInfo) {
      try {
        const history = await redisClient.lRange(`conversation:${loginInfo.userId}`, 0, 49);
        conversations = history.map(item => JSON.parse(item));
      } catch (redisError) {
        console.warn('Redis读取失败，使用内存存储:', redisError.message);
      }
    }
    
    if (conversations.length === 0 && loginInfo) {
      conversations = memoryStorage[`conversation:${loginInfo.userId}`] || [];
      conversations = conversations.slice(0, 50);
    }
    
    res.json({ conversations });
  } catch (error) {
    console.error('获取对话历史失败:', error);
    res.status(500).json({ error: '获取对话历史失败' });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 启动服务器
const PORT = process.env.PORT || 4002;
app.listen(PORT, () => {
  console.log(`微信消息服务运行在端口 ${PORT}`);
});

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('正在关闭服务...');
  if (bot) {
    await bot.stop();
  }
  if (redisClient) {
    await redisClient.quit();
  }
  process.exit(0);
});
