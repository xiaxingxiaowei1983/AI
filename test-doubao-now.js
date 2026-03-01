const axios = require('axios');

async function testDoubaoAPI() {
  console.log('=== 测试豆包API连接 ===');
  console.log('时间:', new Date().toLocaleString());
  
  const apiKey = 'c13b2982-0aab-4c75-9404-0deb12a219ec';
  const endpoint = 'https://ark.cn-beijing.volces.com/api/v3/responses';
  const modelId = 'ep-20260225031720-mp6fh';
  
  try {
    const response = await axios.post(endpoint, {
      model: modelId,
      input: [
        {
          role: 'user',
          content: [
            {
              type: 'input_text',
              text: '你好，测试连接'
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

async function testDoubaoChatCompletions() {
  console.log('\n=== 测试豆包Chat Completions API ===');
  
  const apiKey = 'c13b2982-0aab-4c75-9404-0deb12a219ec';
  const endpoint = 'https://ark.cn-beijing.volces.com/api/v3/chat/completions';
  const modelId = 'doubao-seed-2-0-code-preview-260215';
  
  try {
    const response = await axios.post(endpoint, {
      model: modelId,
      messages: [
        {
          role: 'user',
          content: '你好，测试Chat Completions API'
        }
      ]
    }, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });
    
    console.log('✅ Chat Completions API请求成功');
    console.log('响应状态:', response.status);
    console.log('响应数据:', JSON.stringify(response.data, null, 2));
    return true;
  } catch (error) {
    console.log('❌ Chat Completions API请求失败');
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
  const test1 = await testDoubaoAPI();
  const test2 = await testDoubaoChatCompletions();
  
  console.log('\n=== 测试结果汇总 ===');
  console.log('豆包Responses API测试:', test1 ? '✅ 通过' : '❌ 失败');
  console.log('豆包Chat Completions API测试:', test2 ? '✅ 通过' : '❌ 失败');
  
  if (test1 || test2) {
    console.log('\n🎉 至少一个API测试通过，火山引擎订阅已生效！');
  } else {
    console.log('\n⚠️  所有API测试失败，订阅可能仍未生效或存在其他问题');
  }
})();