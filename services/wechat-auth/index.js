const { WechatyBuilder } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const QrcodeTerminal = require('qrcode-terminal');
const express = require('express');
const jwt = require('jsonwebtoken');
const redis = require('redis');
require('dotenv').config();

const app = express();
app.use(express.json());

// Redis客户端
let redisClient = null;
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

// 微信机器人实例
let bot = null;
let loginInfo = null;

// 初始化微信机器人
function initWechatBot() {
  if (bot) return bot;

  const puppet = new PuppetPadlocal({
    token: process.env.PADLOCAL_TOKEN
  });

  bot = WechatyBuilder.build({
    name: 'wechat-automation-bot',
    puppet
  });

  bot
    .on('scan', (qrcode, status) => {
      QrcodeTerminal.generate(qrcode, { small: true });
      console.log(`扫码登录: ${status}`);
    })

    .on('login', async (user) => {
      console.log(`登录成功: ${user.name()}`);
      loginInfo = {
        userId: user.id,
        name: user.name(),
        loginTime: new Date().toISOString()
      };

      // 生成JWT令牌
      const token = jwt.sign(
        { userId: user.id, name: user.name() },
        process.env.JWT_SECRET || 'your-secret-key',
        { expiresIn: '7d' }
      );

      // 存储登录信息
      if (redisClient) {
        try {
          await redisClient.set(`wechat:${user.id}`, JSON.stringify(loginInfo), {
            EX: 60 * 60 * 24 * 7 // 7天过期
          });
          console.log('登录信息已存储到Redis');
        } catch (error) {
          console.warn('Redis存储失败，使用内存存储:', error.message);
        }
      } else {
        console.log('使用内存存储登录信息');
      }

      console.log('登录信息已存储');
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
  console.log('微信机器人已启动');
}

// API路由

// 获取登录二维码
app.get('/api/wechat/login', async (req, res) => {
  try {
    await startBot();
    res.json({ message: '微信机器人已启动，请扫描终端中的二维码登录' });
  } catch (error) {
    console.error('启动机器人失败:', error);
    res.status(500).json({ error: '启动机器人失败' });
  }
});

// 获取登录状态
app.get('/api/wechat/status', async (req, res) => {
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

// 登出
app.post('/api/wechat/logout', async (req, res) => {
  try {
    if (bot) {
      await bot.logout();
      res.json({ message: '登出成功' });
    } else {
      res.json({ message: '机器人未启动' });
    }
  } catch (error) {
    console.error('登出失败:', error);
    res.status(500).json({ error: '登出失败' });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 启动服务器
const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`微信授权服务运行在端口 ${PORT}`);
});

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('正在关闭服务...');
  if (bot) {
    await bot.stop();
  }
  await redisClient.quit();
  process.exit(0);
});
