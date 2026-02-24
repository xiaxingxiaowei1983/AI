const arkAdapter = require('./ark-simple-adapter');

async function testSimpleAdapter() {
  console.log('=== 测试简化版Ark API适配器 ===\n');

  try {
    // 测试图像描述功能
    console.log('1. 测试图像描述功能...');
    const imageUrl = 'https://ark-project.tos-cn-beijing.volces.com/doc_image/ark_demo_img_1.png';
    const imageResult = await arkAdapter.describeImage(imageUrl, '你看见了什么？');
    
    console.log('✅ 图像描述成功!');
    console.log('模型:', imageResult.model);
    console.log('使用情况:', imageResult.usage);
    console.log('响应:', imageResult.text.substring(0, 500) + '...');
    console.log('');

    // 测试文本生成功能
    console.log('2. 测试文本生成功能...');
    const textResult = await arkAdapter.chat('请简单介绍一下人工智能的发展历程');
    
    console.log('✅ 文本生成成功!');
    console.log('模型:', textResult.model);
    console.log('使用情况:', textResult.usage);
    console.log('响应:', textResult.text.substring(0, 500) + '...');
    console.log('');

    console.log('=== 测试完成 ===');
    console.log('✅ 简化版Ark API适配器工作正常!');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

testSimpleAdapter();
