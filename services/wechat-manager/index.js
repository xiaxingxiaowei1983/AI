const express = require('express');
const axios = require('axios');
const redis = require('redis');
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

// 服务配置
const services = {
  auth: {
    url: process.env.AUTH_SERVICE_URL || 'http://localhost:4001'
  },
  profile: {
    url: process.env.PROFILE_SERVICE_URL || 'http://localhost:4004'
  },
  moments: {
    url: process.env.MOMENTS_SERVICE_URL || 'http://localhost:4003'
  },
  message: {
    url: process.env.MESSAGE_SERVICE_URL || 'http://localhost:4002'
  }
};

// 确保public目录存在
if (!fs.existsSync('./public')) {
  fs.mkdirSync('./public', { recursive: true });
}

// 启动所有服务
async function startAllServices() {
  console.log('🔄 启动所有微信服务...');
  
  try {
    // 启动认证服务
    console.log('🚀 启动认证服务...');
    await axios.post(`${services.auth.url}/api/wechat/login`);
    
    // 启动形象管理服务
    console.log('🚀 启动形象管理服务...');
    await axios.post(`${services.profile.url}/api/profile/start`);
    
    // 启动朋友圈服务
    console.log('🚀 启动朋友圈服务...');
    await axios.post(`${services.moments.url}/api/moments/start`);
    
    // 启动消息服务
    console.log('🚀 启动消息服务...');
    await axios.post(`${services.message.url}/api/message/start`);
    
    console.log('✅ 所有服务启动成功！');
    return { success: true };
  } catch (error) {
    console.error('❌ 启动服务失败:', error.message);
    return { success: false, error: error.message };
  }
}

// 获取所有服务状态
async function getAllServicesStatus() {
  try {
    const statuses = {
      auth: await axios.get(`${services.auth.url}/api/wechat/status`).then(res => res.data),
      profile: await axios.get(`${services.profile.url}/api/profile/status`).then(res => res.data),
      moments: await axios.get(`${services.moments.url}/api/moments/status`).then(res => res.data),
      message: await axios.get(`${services.message.url}/api/message/status`).then(res => res.data)
    };
    return statuses;
  } catch (error) {
    console.error('❌ 获取服务状态失败:', error.message);
    return { error: error.message };
  }
}

// 自主设计形象
async function designProfile(personality, appearance) {
  try {
    console.log('🎨 开始设计形象...');
    
    // 生成形象
    const response = await axios.post(`${services.profile.url}/api/profile/generate`, {
      personality,
      appearance
    });
    
    console.log('✅ 形象设计完成！');
    return response.data;
  } catch (error) {
    console.error('❌ 形象设计失败:', error.message);
    throw error;
  }
}

// 自主发布朋友圈
async function publishMoment(content, imageUrl, scheduleTime) {
  try {
    console.log('📝 开始发布朋友圈...');
    
    // 发布朋友圈
    const response = await axios.post(`${services.moments.url}/api/moments/publish`, {
      content,
      imageUrl,
      scheduleTime
    });
    
    console.log('✅ 朋友圈发布成功！');
    return response.data;
  } catch (error) {
    console.error('❌ 朋友圈发布失败:', error.message);
    throw error;
  }
}

// 生成朋友圈内容
async function generateMomentContent(topic, generateImage) {
  try {
    console.log('💡 开始生成朋友圈内容...');
    
    // 生成内容
    const response = await axios.post(`${services.moments.url}/api/moments/generate`, {
      topic,
      generateImage
    });
    
    console.log('✅ 朋友圈内容生成成功！');
    return response.data;
  } catch (error) {
    console.error('❌ 朋友圈内容生成失败:', error.message);
    throw error;
  }
}

// API路由

// 启动所有服务
app.post('/api/wechat/start-all', async (req, res) => {
  try {
    const result = await startAllServices();
    res.json(result);
  } catch (error) {
    console.error('启动服务失败:', error);
    res.status(500).json({ error: '启动服务失败' });
  }
});

// 获取所有服务状态
app.get('/api/wechat/status-all', async (req, res) => {
  try {
    const statuses = await getAllServicesStatus();
    res.json(statuses);
  } catch (error) {
    console.error('获取服务状态失败:', error);
    res.status(500).json({ error: '获取服务状态失败' });
  }
});

// 自主设计形象
app.post('/api/wechat/design-profile', async (req, res) => {
  try {
    const { personality, appearance } = req.body;
    const result = await designProfile(personality, appearance);
    res.json(result);
  } catch (error) {
    console.error('形象设计失败:', error);
    res.status(500).json({ error: '形象设计失败' });
  }
});

// 获取形象
app.get('/api/wechat/get-profile', async (req, res) => {
  try {
    const response = await axios.get(`${services.profile.url}/api/profile/get`);
    res.json(response.data);
  } catch (error) {
    console.error('获取形象失败:', error);
    res.status(500).json({ error: '获取形象失败' });
  }
});

// 自主发布朋友圈
app.post('/api/wechat/publish-moment', async (req, res) => {
  try {
    const { content, imageUrl, scheduleTime } = req.body;
    const result = await publishMoment(content, imageUrl, scheduleTime);
    res.json(result);
  } catch (error) {
    console.error('发布朋友圈失败:', error);
    res.status(500).json({ error: '发布朋友圈失败' });
  }
});

// 生成朋友圈内容
app.post('/api/wechat/generate-moment', async (req, res) => {
  try {
    const { topic, generateImage } = req.body;
    const result = await generateMomentContent(topic, generateImage);
    res.json(result);
  } catch (error) {
    console.error('生成朋友圈内容失败:', error);
    res.status(500).json({ error: '生成朋友圈内容失败' });
  }
});

// 获取朋友圈历史
app.get('/api/wechat/moments-history', async (req, res) => {
  try {
    const response = await axios.get(`${services.moments.url}/api/moments/history`);
    res.json(response.data);
  } catch (error) {
    console.error('获取朋友圈历史失败:', error);
    res.status(500).json({ error: '获取朋友圈历史失败' });
  }
});

// 获取对话历史
app.get('/api/wechat/message-history', async (req, res) => {
  try {
    const response = await axios.get(`${services.message.url}/api/message/history`);
    res.json(response.data);
  } catch (error) {
    console.error('获取对话历史失败:', error);
    res.status(500).json({ error: '获取对话历史失败' });
  }
});

// 配置消息回复风格
app.post('/api/wechat/configure-message-style', async (req, res) => {
  try {
    const { senderName, style } = req.body;
    const response = await axios.post(`${services.message.url}/api/message/style`, {
      senderName,
      style
    });
    res.json(response.data);
  } catch (error) {
    console.error('配置消息回复风格失败:', error);
    res.status(500).json({ error: '配置消息回复风格失败' });
  }
});

// 配置朋友圈风格
app.post('/api/wechat/configure-moments-style', async (req, res) => {
  try {
    const { style } = req.body;
    const response = await axios.post(`${services.moments.url}/api/moments/style`, {
      style
    });
    res.json(response.data);
  } catch (error) {
    console.error('配置朋友圈风格失败:', error);
    res.status(500).json({ error: '配置朋友圈风格失败' });
  }
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 主页
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="zh-CN">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>微信管理器</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f5f5f5;
        }
        h1 {
          color: #333;
          text-align: center;
        }
        .card {
          background-color: white;
          border-radius: 8px;
          padding: 20px;
          margin: 20px 0;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        .button:hover {
          background-color: #45a049;
        }
        .status {
          padding: 10px;
          border-radius: 4px;
          margin: 10px 0;
        }
        .status.online {
          background-color: #d4edda;
          color: #155724;
        }
        .status.offline {
          background-color: #f8d7da;
          color: #721c24;
        }
      </style>
    </head>
    <body>
      <h1>微信管理器</h1>
      
      <div class="card">
        <h2>服务控制</h2>
        <button class="button" onclick="startAllServices()">启动所有服务</button>
        <button class="button" onclick="getStatus()">获取服务状态</button>
      </div>
      
      <div class="card">
        <h2>形象管理</h2>
        <button class="button" onclick="designProfile()">设计形象</button>
        <button class="button" onclick="getProfile()">获取形象</button>
      </div>
      
      <div class="card">
        <h2>朋友圈管理</h2>
        <button class="button" onclick="generateMoment()">生成内容</button>
        <button class="button" onclick="publishMoment()">发布朋友圈</button>
        <button class="button" onclick="getMomentsHistory()">历史记录</button>
      </div>
      
      <div class="card">
        <h2>消息管理</h2>
        <button class="button" onclick="getMessageHistory()">对话历史</button>
        <button class="button" onclick="configureMessageStyle()">配置风格</button>
      </div>
      
      <div class="card">
        <h2>服务状态</h2>
        <div id="status-container"></div>
      </div>
      
      <script>
        async function startAllServices() {
          const response = await fetch('/api/wechat/start-all', { method: 'POST' });
          const result = await response.json();
          alert(result.success ? '服务启动成功！' : '服务启动失败：' + result.error);
          getStatus();
        }
        
        async function getStatus() {
          const response = await fetch('/api/wechat/status-all');
          const statuses = await response.json();
          const container = document.getElementById('status-container');
          
          container.innerHTML = '';
          for (const [service, status] of Object.entries(statuses)) {
            const div = document.createElement('div');
            div.className = `status ${status.loggedIn ? 'online' : 'offline'}`;
            div.textContent = `${service}: ${status.loggedIn ? '在线' : '离线'}`;
            container.appendChild(div);
          }
        }
        
        async function designProfile() {
          const personality = {
            tone: 'friendly',
            formality: 'casual',
            humor: 'moderate',
            interests: ['科技', '旅行', '美食', '生活']
          };
          
          const appearance = {
            style: 'modern',
            colors: ['blue', 'white', 'gray'],
            elements: ['简约', '专业', '时尚']
          };
          
          const response = await fetch('/api/wechat/design-profile', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ personality, appearance })
          });
          
          const result = await response.json();
          alert('形象设计' + (result.profile ? '成功！' : '失败：' + result.error));
        }
        
        async function getProfile() {
          const response = await fetch('/api/wechat/get-profile');
          const result = await response.json();
          if (result.profile) {
            alert('形象获取成功！\n昵称：' + result.profile.name + '\n个性签名：' + result.profile.bio);
          } else {
            alert('形象获取失败：' + result.error);
          }
        }
        
        async function generateMoment() {
          const topic = prompt('请输入朋友圈主题：');
          if (!topic) return;
          
          const response = await fetch('/api/wechat/generate-moment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ topic, generateImage: true })
          });
          
          const result = await response.json();
          if (result.content) {
            alert('内容生成成功！\n\n' + result.content);
            if (result.imageUrl) {
              if (confirm('是否发布这条朋友圈？')) {
                publishMoment(result.content, result.imageUrl);
              }
            }
          } else {
            alert('内容生成失败：' + result.error);
          }
        }
        
        async function publishMoment(content, imageUrl) {
          if (!content) {
            content = prompt('请输入朋友圈内容：');
            if (!content) return;
          }
          
          const response = await fetch('/api/wechat/publish-moment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content, imageUrl })
          });
          
          const result = await response.json();
          alert('朋友圈发布' + (result.message ? '成功！' : '失败：' + result.error));
        }
        
        async function getMomentsHistory() {
          const response = await fetch('/api/wechat/moments-history');
          const result = await response.json();
          if (result.moments) {
            const history = result.moments.map(m => m.content.substring(0, 50) + '...').join('\n\n');
            alert('朋友圈历史：\n\n' + history);
          } else {
            alert('获取历史失败：' + result.error);
          }
        }
        
        async function getMessageHistory() {
          const response = await fetch('/api/wechat/message-history');
          const result = await response.json();
          if (result.conversations) {
            const history = result.conversations.slice(0, 5).map(c => 
              c.sender.name + ': ' + c.message.substring(0, 30) + '...\n' + 
              '回复: ' + c.reply.substring(0, 30) + '...'
            ).join('\n\n');
            alert('对话历史：\n\n' + history);
          } else {
            alert('获取历史失败：' + result.error);
          }
        }
        
        function configureMessageStyle() {
          alert('请在API中配置消息回复风格');
        }
        
        // 初始获取状态
        getStatus();
      </script>
    </body>
    </html>
  `);
});

// 启动服务器
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`微信管理器服务运行在端口 ${PORT}`);
  console.log(`访问 http://localhost:${PORT} 查看管理界面`);
});

// 优雅关闭
process.on('SIGINT', async () => {
  console.log('正在关闭服务...');
  await redisClient.quit();
  process.exit(0);
});