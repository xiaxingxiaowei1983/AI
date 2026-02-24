const { WechatyBuilder } = require('wechaty');
const { PuppetPadlocal } = require('wechaty-puppet-padlocal');
const express = require('express');
const redis = require('redis');
const { OpenAI } = require('openai');
const axios = require('axios');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(express.static('public'));

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

// OpenAI客户端
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// 微信机器人实例
let bot = null;
let loginInfo = null;

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
    name: 'wechat-profile-bot',
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

      // 加载用户形象设置
      await loadUserProfile();
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
  console.log('微信形象管理机器人已启动');
}

// 内存存储
let memoryStorage = {};

// 加载用户形象设置
async function loadUserProfile() {
  try {
    if (redisClient) {
      const profile = await redisClient.get(`user:profile:${loginInfo.userId}`);
      if (profile) {
        console.log('已加载用户形象设置');
      } else {
        console.log('未找到用户形象设置，使用默认设置');
        // 设置默认形象
        const defaultProfile = {
          name: loginInfo.name,
          avatar: null,
          bio: '这个家伙很懒，什么都没留下',
          personality: {
            tone: 'friendly',
            formality: 'casual',
            humor: 'moderate',
            interests: ['科技', '旅行', '美食', '生活']
          },
          appearance: {
            style: 'modern',
            colors: ['blue', 'white', 'gray'],
            elements: ['简约', '专业', '时尚']
          }
        };
        try {
          await redisClient.set(`user:profile:${loginInfo.userId}`, JSON.stringify(defaultProfile), {
            EX: 60 * 60 * 24 * 30 // 30天过期
          });
        } catch (redisError) {
          console.warn('Redis存储失败，使用内存存储:', redisError.message);
          memoryStorage[`user:profile:${loginInfo.userId}`] = defaultProfile;
        }
      }
    } else {
      console.log('Redis不可用，使用内存存储默认形象设置');
      const defaultProfile = {
        name: loginInfo.name,
        avatar: null,
        bio: '这个家伙很懒，什么都没留下',
        personality: {
          tone: 'friendly',
          formality: 'casual',
          humor: 'moderate',
          interests: ['科技', '旅行', '美食', '生活']
        },
        appearance: {
          style: 'modern',
          colors: ['blue', 'white', 'gray'],
          elements: ['简约', '专业', '时尚']
        }
      };
      memoryStorage[`user:profile:${loginInfo.userId}`] = defaultProfile;
    }
  } catch (error) {
    console.error('加载用户形象设置失败:', error);
  }
}

// 生成形象描述
async function generateProfileDescription(personality, appearance) {
  const prompt = `请为${loginInfo?.name || '用户'}生成一个详细的个人形象描述，用于创建微信头像和个人简介。

个人性格：
- 语气：${personality.tone || 'friendly'}
- 正式程度：${personality.formality || 'casual'}
- 幽默程度：${personality.humor || 'moderate'}
- 兴趣爱好：${personality.interests?.join('、') || '科技、旅行、美食、生活'}

形象风格：
- 整体风格：${appearance.style || 'modern'}
- 主色调：${appearance.colors?.join('、') || 'blue、white、gray'}
- 设计元素：${appearance.elements?.join('、') || '简约、专业、时尚'}

请生成一个详细的描述，适合用于AI图像生成，要求具体、生动、符合用户的性格和风格。`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一个专业的形象设计师，擅长为用户创建个性化的形象描述。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('生成形象描述失败:', error);
    throw error;
  }
}

// 生成头像
async function generateAvatar(description) {
  try {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: `${description}，微信头像，高清，专业，适合作为个人形象，${loginInfo?.name || '用户'}的个人头像`,
      n: 1,
      size: '1024x1024',
      quality: 'hd'
    });

    return response.data[0].url;
  } catch (error) {
    console.error('生成头像失败:', error);
    throw error;
  }
}

// 下载和处理头像
async function downloadAndProcessAvatar(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const avatarPath = path.join(__dirname, 'public', `avatar_${Date.now()}.png`);
    
    fs.writeFileSync(avatarPath, response.data);
    
    // 处理头像（圆形裁剪）
    const processedAvatarPath = path.join(__dirname, 'public', `avatar_processed_${Date.now()}.png`);
    
    await sharp(avatarPath)
      .resize(512, 512)
      .composite([{
        input: Buffer.from(`<svg width="512" height="512"><circle cx="256" cy="256" r="256" fill="white"/></svg>`),
        blend: 'dest-in'
      }])
      .toFile(processedAvatarPath);
    
    return processedAvatarPath;
  } catch (error) {
    console.error('下载和处理头像失败:', error);
    throw error;
  }
}

// 生成个人简介
async function generateBio(personality) {
  const prompt = `请为${loginInfo?.name || '用户'}生成一个简洁、有个性的微信个人简介（个性签名），符合以下性格特点：

- 语气：${personality.tone || 'friendly'}
- 正式程度：${personality.formality || 'casual'}
- 幽默程度：${personality.humor || 'moderate'}
- 兴趣爱好：${personality.interests?.join('、') || '科技、旅行、美食、生活'}

简介长度控制在1-2句，简洁有力，富有个性。`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一个专业的文案撰写师，擅长创作简洁有力的个人简介。' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.7,
      max_tokens: 100
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('生成个人简介失败:', error);
    throw error;
  }
}

// 更新用户形象
async function updateUserProfile(profileData) {
  try {
    // 获取现有形象
    let currentProfile = null;
    if (redisClient) {
      try {
        const profile = await redisClient.get(`user:profile:${loginInfo.userId}`);
        if (profile) {
          currentProfile = JSON.parse(profile);
        }
      } catch (redisError) {
        console.warn('Redis读取失败，使用内存存储:', redisError.message);
      }
    }
    
    if (!currentProfile) {
      currentProfile = memoryStorage[`user:profile:${loginInfo.userId}`] || {
        name: loginInfo.name,
        avatar: null,
        bio: '这个家伙很懒，什么都没留下',
        personality: {
          tone: 'friendly',
          formality: 'casual',
          humor: 'moderate',
          interests: ['科技', '旅行', '美食', '生活']
        },
        appearance: {
          style: 'modern',
          colors: ['blue', 'white', 'gray'],
          elements: ['简约', '专业', '时尚']
        }
      };
    }

    // 更新形象数据
    const updatedProfile = {
      ...currentProfile,
      ...profileData
    };

    // 存储更新后的形象
    if (redisClient) {
      try {
        await redisClient.set(`user:profile:${loginInfo.userId}`, JSON.stringify(updatedProfile), {
          EX: 60 * 60 * 24 * 30 // 30天过期
        });
        console.log('用户形象已更新到Redis');
      } catch (redisError) {
        console.warn('Redis存储失败，使用内存存储:', redisError.message);
        memoryStorage[`user:profile:${loginInfo.userId}`] = updatedProfile;
      }
    } else {
      memoryStorage[`user:profile:${loginInfo.userId}`] = updatedProfile;
      console.log('用户形象已更新到内存存储');
    }

    return updatedProfile;
  } catch (error) {
    console.error('更新用户形象失败:', error);
    throw error;
  }
}

// API路由

// 启动机器人
app.post('/api/profile/start', async (req, res) => {
  try {
    await startBot();
    res.json({ message: '微信形象管理机器人已启动' });
  } catch (error) {
    console.error('启动机器人失败:', error);
    res.status(500).json({ error: '启动机器人失败' });
  }
});

// 获取登录状态
app.get('/api/profile/status', async (req, res) => {
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

// 获取用户形象
app.get('/api/profile/get', async (req, res) => {
  try {
    let profile = null;
    if (loginInfo && redisClient) {
      try {
        const profileData = await redisClient.get(`user:profile:${loginInfo.userId}`);
        if (profileData) {
          profile = JSON.parse(profileData);
        }
      } catch (redisError) {
        console.warn('Redis读取失败，使用内存存储:', redisError.message);
      }
    }
    
    if (!profile && loginInfo) {
      profile = memoryStorage[`user:profile:${loginInfo.userId}`];
    }
    
    if (profile) {
      res.json({ profile });
    } else {
      res.json({ 
        profile: {
          name: loginInfo?.name || '用户',
          avatar: null,
          bio: '这个家伙很懒，什么都没留下',
          personality: {
            tone: 'friendly',
            formality: 'casual',
            humor: 'moderate',
            interests: ['科技', '旅行', '美食', '生活']
          },
          appearance: {
            style: 'modern',
            colors: ['blue', 'white', 'gray'],
            elements: ['简约', '专业', '时尚']
          }
        }
      });
    }
  } catch (error) {
    console.error('获取用户形象失败:', error);
    res.status(500).json({ error: '获取用户形象失败' });
  }
});

// 生成形象
app.post('/api/profile/generate', async (req, res) => {
  try {
    const { personality, appearance } = req.body;
    
    // 生成形象描述
    const description = await generateProfileDescription(personality, appearance);
    console.log('生成的形象描述:', description);
    
    // 生成头像
    const avatarUrl = await generateAvatar(description);
    console.log('生成的头像URL:', avatarUrl);
    
    // 下载和处理头像
    const avatarPath = await downloadAndProcessAvatar(avatarUrl);
    console.log('处理后的头像路径:', avatarPath);
    
    // 生成个人简介
    const bio = await generateBio(personality);
    console.log('生成的个人简介:', bio);
    
    // 构建完整形象
    const profile = {
      name: loginInfo?.name || '用户',
      avatar: avatarUrl,
      bio,
      personality,
      appearance,
      description
    };
    
    // 存储形象
    await updateUserProfile(profile);
    
    res.json({ 
      profile,
      localAvatarPath: avatarPath
    });
  } catch (error) {
    console.error('生成形象失败:', error);
    res.status(500).json({ error: '生成形象失败' });
  }
});

// 更新形象
app.post('/api/profile/update', async (req, res) => {
  try {
    const { profile } = req.body;
    const updatedProfile = await updateUserProfile(profile);
    res.json({ profile: updatedProfile });
  } catch (error) {
    console.error('更新形象失败:', error);
    res.status(500).json({ error: '更新形象失败' });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 启动服务器
const PORT = process.env.PORT || 4004;
app.listen(PORT, () => {
  console.log(`微信形象管理服务运行在端口 ${PORT}`);
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