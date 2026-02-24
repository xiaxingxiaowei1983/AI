const arkAdapter = require('./ark-api-adapter');

async function testArkAdapter() {
  console.log('=== 测试火山引擎Ark API适配器 ===\n');

  try {
    // 测试图像描述功能
    console.log('1. 测试图像描述功能...');
    const imageUrl = 'https://ark-project.tos-cn-beijing.volces.com/doc_image/ark_demo_img_1.png';
    const result = await arkAdapter.describeImage(imageUrl, '你看见了什么？');
    
    console.log('✅ 图像描述成功!');
    console.log('模型:', result.model);
    console.log('使用情况:', result.usage);
    console.log('响应:', result.text.substring(0, 500) + '...');
    console.log('');

    // 测试文本生成功能
    console.log('2. 测试文本生成功能...');
    const textResult = await arkAdapter.generateText('doubao-seed-2-0-lite-260215', [
      {
        role: 'user',
        content: [
          {
            type: 'text',
            text: '请简单介绍一下人工智能的发展历程'
          }
        ]
      }
    ]);

    console.log('✅ 文本生成成功!');
    console.log('模型:', textResult.model);
    console.log('使用情况:', textResult.usage);
    console.log('响应:', textResult.text.substring(0, 500) + '...');
    console.log('');

    // 获取API状态
    console.log('3. 获取API状态...');
    const status = await arkAdapter.getStatus();
    console.log('✅ 状态获取成功!');
    console.log('健康状态:', status.health);
    console.log('今日请求数:', status.todayRequests);
    console.log('成功率:', status.successRate.toFixed(2) + '%');
    console.log('平均延迟:', status.averageLatency.toFixed(2) + 'ms');
    console.log('');

    console.log('=== 测试完成 ===');
    console.log('✅ 火山引擎Ark API适配器工作正常!');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

testArkAdapter();
