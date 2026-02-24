const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// 加载大宗师个人资料
const masterProfile = JSON.parse(fs.readFileSync('./master-profile.json', 'utf8'));

// 模拟朋友圈发布
app.post('/api/moments/publish', (req, res) => {
  const { content, imageUrl, scheduleTime } = req.body;
  
  console.log('📱 收到朋友圈发布请求:');
  console.log('内容:', content || masterProfile.first_moments_post.content);
  console.log('图片:', imageUrl || masterProfile.avatar);
  console.log('发布时间:', scheduleTime || '立即');
  
  // 生成发布历史
  const history = {
    id: `moment_${Date.now()}`,
    timestamp: new Date().toISOString(),
    content: content || masterProfile.first_moments_post.content,
    imageUrl: imageUrl || masterProfile.avatar,
    status: 'published',
    author: '大宗师'
  };
  
  // 保存发布历史
  const historyPath = './moments-history.json';
  let historyData = [];
  if (fs.existsSync(historyPath)) {
    historyData = JSON.parse(fs.readFileSync(historyPath, 'utf8'));
  }
  historyData.push(history);
  fs.writeFileSync(historyPath, JSON.stringify(historyData, null, 2));
  
  console.log('✅ 朋友圈发布成功！');
  console.log('发布历史已保存到:', historyPath);
  
  res.json({
    message: '朋友圈发布成功',
    post: history
  });
});

// 生成测试内容
app.post('/api/moments/generate', (req, res) => {
  const { topic } = req.body;
  
  console.log('🤖 生成朋友圈内容:', topic || '领导力');
  
  const content = `【${topic || '领导力'}分享】\n\n${masterProfile.first_moments_post.content}`;
  
  res.json({
    content: content,
    imageUrl: masterProfile.avatar
  });
});

// 健康检查
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// 启动服务器
const PORT = 4003;
app.listen(PORT, () => {
  console.log(`🚀 朋友圈测试服务运行在端口 ${PORT}`);
  console.log('📋 可用接口:');
  console.log('- POST /api/moments/generate - 生成朋友圈内容');
  console.log('- POST /api/moments/publish - 发布朋友圈');
  console.log('- GET /health - 健康检查');
  
  // 自动发布测试朋友圈
  console.log('\n🔄 正在自动发布测试朋友圈...');
  
  const testContent = {
    content: masterProfile.first_moments_post.content,
    imageUrl: masterProfile.avatar
  };
  
  setTimeout(() => {
    console.log('✅ 测试朋友圈发布完成！');
    console.log('发布内容:', testContent.content);
    console.log('使用图片:', testContent.imageUrl);
  }, 2000);
});

console.log('📱 朋友圈测试服务启动中...');
console.log('使用大宗师个人资料:', './master-profile.json');
