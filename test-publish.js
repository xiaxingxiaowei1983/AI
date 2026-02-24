const axios = require('axios');
const fs = require('fs');

async function testPublish() {
  console.log('🧪 开始测试朋友圈发布流程...');
  
  try {
    // 1. 生成内容
    console.log('\n1️⃣ 生成朋友圈内容...');
    const generateResponse = await axios.post('http://localhost:4003/api/moments/generate', {
      topic: '领导力'
    });
    
    console.log('✅ 内容生成成功:');
    console.log('内容:', generateResponse.data.content);
    console.log('图片:', generateResponse.data.imageUrl);
    
    // 2. 发布朋友圈
    console.log('\n2️⃣ 发布朋友圈...');
    const publishResponse = await axios.post('http://localhost:4003/api/moments/publish', {
      content: generateResponse.data.content,
      imageUrl: generateResponse.data.imageUrl
    });
    
    console.log('✅ 朋友圈发布成功!');
    console.log('发布结果:', publishResponse.data.message);
    console.log('发布时间:', publishResponse.data.post.timestamp);
    
    // 3. 检查发布历史
    console.log('\n3️⃣ 检查发布历史...');
    if (fs.existsSync('./moments-history.json')) {
      const history = JSON.parse(fs.readFileSync('./moments-history.json', 'utf8'));
      console.log('✅ 发布历史已保存，共', history.length, '条记录');
      console.log('最新发布:', history[history.length - 1].id);
    } else {
      console.log('⚠️  发布历史文件未找到');
    }
    
    console.log('\n🎉 测试流程完成！');
    console.log('\n📱 完整发布流程:');
    console.log('1. 生成内容 → 2. 发布朋友圈 → 3. 记录历史');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    if (error.response) {
      console.error('响应:', error.response.data);
    }
  }
}

testPublish();
