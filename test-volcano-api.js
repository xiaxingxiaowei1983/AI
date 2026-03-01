const axios = require('axios');

async function testVolcanoAPI() {
  console.log('=== 测试火山引擎API连接 ===');
  console.log('时间:', new Date().toLocaleString());
  
  // 使用文档中提供的正确参数
  const apiKey = '9330bd41-2b7f-4719-b83e-c1e3bedc2769';
  const endpoint = 'https://ark.cn-beijing.volces.com/api/v3/responses';
  const modelId = 'ep-20260108213536-xkxvw';
  
  try {
    const response = await axios.post(endpoint, {
      model: modelId,
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: '你好，测试火山引擎API连接'
            }
          ]
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ API请求成功');
    console.log('响应状态:', response.status);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ API请求失败');
    console.log('错误信息:', error.message);
    if (error.response) {
      console.log('响应状态:', error.response.status);
      console.log('响应数据:', JSON.stringify(error.response.data, null, 2));
    }
    return false;
  }
}

// 运行测试
(async () => {
  const success = await testVolcanoAPI();
  
  if (success) {
    console.log('\n🎉 火山引擎API连接测试成功！');
    console.log('API Key和Endpoint配置正确');
  } else {
    console.log('\n⚠️  火山引擎API连接测试失败');
    console.log('需要检查API Key和Endpoint配置');
  }
})();