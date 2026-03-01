const BailianClient = require('./plugins/bailian-client');

async function testConnection() {
  console.log('=== 测试阿里云百炼 API 连接 ===\n');

  try {
    const client = new BailianClient({
      apiKey: 'sk-sp-8c3eefb330194d8ab000277eb97b103e',
      baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
      model: 'qwen3.5-plus',
      region: 'cn-beijing'
    });

    console.log('\n📋 客户端能力：');
    const capabilities = client.getCapabilities();
    console.log(JSON.stringify(capabilities, null, 2));

    console.log('\n=== 发送测试消息 ===\n');
    
    const result = await client.simpleChat(
      '你好，请简单介绍一下你自己',
      '你是一个有帮助的 AI 助手'
    );

    if (result.success) {
      console.log('\n✅ API 调用成功！');
      console.log('\n回复内容：');
      console.log(result.content);
      console.log('\n使用统计：');
      console.log(JSON.stringify(result.usage, null, 2));
      console.log('\n使用模型：', result.model);
    } else {
      console.log('\n❌ API 调用失败');
      console.log('错误信息：', result.error);
      if (result.statusCode) {
        console.log('HTTP 状态码：', result.statusCode);
      }
    }

  } catch (error) {
    console.error('\n❌ 测试过程中发生异常：');
    console.error(error.message);
    console.error(error.stack);
  }

  console.log('\n=== 测试完成 ===\n');
}

testConnection();
