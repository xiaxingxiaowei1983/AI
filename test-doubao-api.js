const https = require('https');

// 豆包API配置
const apiKey = 'c13b2982-0aab-4c75-9404-0deb12a219ec';
const model = 'doubao-seed-2-0-code-preview-260215';
const url = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';

// 测试消息
const payload = JSON.stringify({
  model: model,
  messages: [
    {
      role: 'user',
      content: '你好，测试一下API连接'
    }
  ]
});

// 请求选项
const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${apiKey}`,
    'Content-Length': Buffer.byteLength(payload)
  }
};

// 发送请求
const req = https.request(url, options, (res) => {
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📡 API响应状态码:', res.statusCode);
    console.log('📡 API响应头:', JSON.stringify(res.headers, null, 2));
    console.log('📡 API响应体:', data);
    
    try {
      const jsonData = JSON.parse(data);
      if (jsonData.error) {
        console.error('❌ API错误:', jsonData.error);
      } else if (jsonData.choices && jsonData.choices[0]) {
        console.log('✅ API测试成功!');
        console.log('🤖 豆包回复:', jsonData.choices[0].message.content);
      }
    } catch (error) {
      console.error('❌ 解析响应失败:', error);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ 请求失败:', error);
});

// 发送请求体
req.write(payload);
req.end();

console.log('🚀 正在测试豆包API连接...');
console.log('🔑 API密钥:', apiKey);
console.log('🧠 模型:', model);
console.log('📡 请求URL:', url);
