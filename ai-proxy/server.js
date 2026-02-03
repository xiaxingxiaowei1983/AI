/*
🔒 安全实践（依据阿里云文档）：
1. 密钥仅存于 .env，已加入 .gitignore（知识库[2][10]）
2. 生产环境务必：
   - 修改 CORS 为实际域名
   - 启用 HTTPS
   - 添加请求频率限制（如 express-rate-limit）
3. 密钥获取路径：百炼控制台 → API-KEY 管理（知识库[5][10]）
4. 鉴权失败排查：检查密钥格式、空格、有效期（知识库[4]）
*/

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

// 加载环境变量
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// 配置 CORS
const corsOptions = {
  origin: 'http://localhost:3000', // 开发环境允许的前端域名
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static('public'));

// POST /api/ai 路由
app.post('/api/ai', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: '请提供 prompt 参数' });
    }
    
    // 从环境变量读取 API Key
    const apiKey = process.env.DASHSCOPE_API_KEY;
    
    if (!apiKey) {
      console.error('❌ API Key 未设置！请在 .env 文件中配置 DASHSCOPE_API_KEY');
      return res.status(500).json({ error: '服务配置错误' });
    }
    
    // 调用 DashScope REST API（使用用户提供的应用ID）
    const response = await axios.post(
      'https://dashscope.aliyuncs.com/api/v1/apps/e01554734bea40ef9399ea7d99040bd4/completion',
      {
        "input": { "prompt": prompt },
        "parameters": {},
        "debug": {}
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    // 返回成功响应
    res.json({ reply: response.data.output.text });
  } catch (error) {
    console.error('API 调用失败:', error.message);
    // 不泄露密钥/堆栈信息
    res.status(500).json({ error: '调用失败' });
  }
});

// 启动服务器
app.listen(PORT, () => {
  console.log('✅ 代理服务运行中：http://localhost:' + PORT);
  console.log('✅ 密钥状态：', process.env.DASHSCOPE_API_KEY ? '已加载' : '❌ 未设置！');
  console.log('\n📝 使用说明：');
  console.log('1. 复制 .env.example 为 .env 并填入 API Key');
  console.log('2. 前端调用：POST http://localhost:' + PORT + '/api/ai');
  console.log('   请求体：{ "prompt": "你的问题" }');
  console.log('3. 测试页面：http://localhost:' + PORT + '/chat.html');
});