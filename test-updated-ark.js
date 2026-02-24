const arkAdapter = require('./ark-simple-adapter');

async function testUpdatedArkAdapter() {
  console.log('=== 测试更新后的Ark API适配器 ===\n');

  try {
    // 测试图像描述功能（使用用户提供的URL）
    console.log('1. 测试图像描述功能...');
    const imageUrl = 'https://ark-project.tos-cn-beijing.ivolces.com/images/view.jpeg';
    const result = await arkAdapter.describeImage(imageUrl, '图片主要讲了什么?');
    
    console.log('✅ 图像描述成功!');
    console.log('  模型:', result.model);
    console.log('  使用情况:', result.usage);
    console.log('  响应:', result.text.substring(0, 500) + '...');
    console.log('');

    // 测试文本生成功能
    console.log('2. 测试文本生成功能...');
    const textResult = await arkAdapter.chat('请解释什么是JavaScript的闭包');
    
    console.log('✅ 文本生成成功!');
    console.log('  模型:', textResult.model);
    console.log('  使用情况:', textResult.usage);
    console.log('  响应:', textResult.text.substring(0, 500) + '...');
    console.log('');

    // 测试代码生成功能（因为使用的是code模型）
    console.log('3. 测试代码生成功能...');
    const codeResult = await arkAdapter.chat('请生成一个简单的Node.js HTTP服务器代码');
    
    console.log('✅ 代码生成成功!');
    console.log('  模型:', codeResult.model);
    console.log('  使用情况:', codeResult.usage);
    console.log('  响应:', codeResult.text.substring(0, 500) + '...');
    console.log('');

    console.log('=== 测试完成 ===');
    console.log('✅ 更新后的Ark API适配器工作正常!');
    console.log('  模型已更新为:', arkAdapter.model);
    console.log('  API端点已更新为:', '/api/v3/chat/completions');

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

testUpdatedArkAdapter();
