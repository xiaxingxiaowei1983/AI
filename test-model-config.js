const arkAdapter = require('./ark-api-adapter');

async function testModelConfig() {
  console.log('=== 测试模型配置 ===');
  
  try {
    // 测试健康检查
    console.log('1. 测试健康检查...');
    const health = await arkAdapter.healthCheck();
    console.log('健康检查结果:', health);
    
    // 测试使用正确模型ID的API调用
    console.log('\n2. 测试使用 Doubao-Seed-2.0-Code-preview-260215 模型...');
    const testResponse = await arkAdapter.generateText('Doubao-Seed-2.0-Code-preview-260215', [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: '你好，测试模型配置是否正确'
          }
        ]
      }
    ], {
      max_tokens: 100,
      temperature: 0.7
    });
    
    console.log('测试成功!');
    console.log('模型:', testResponse.model);
    console.log('响应:', testResponse.text.substring(0, 100) + '...');
    console.log('使用情况:', testResponse.usage);
    
  } catch (error) {
    console.error('测试失败:', error.message);
    console.error('错误详情:', error);
  }
}

testModelConfig();
