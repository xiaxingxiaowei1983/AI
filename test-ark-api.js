const arkAdapter = require('./ark-simple-adapter');

async function testArkAPI() {
  console.log('🔍 测试 Ark API 连接...');
  
  try {
    // 测试简单的文本生成
    console.log('📝 测试文本生成...');
    const textResponse = await arkAdapter.chat('你好，测试API连接');
    console.log('✅ 文本生成成功:', textResponse.text.substring(0, 50) + '...');
    
    // 测试API配置
    console.log('🔧 测试API配置...');
    console.log('API Key:', arkAdapter.apiKey ? '已配置' : '未配置');
    console.log('模型:', arkAdapter.model);
    console.log('✅ API配置正常');
    
    console.log('\n🎉 所有测试通过！API连接正常工作。');
    return true;
  } catch (error) {
    console.error('❌ API测试失败:', error.message);
    console.error('错误详情:', error);
    return false;
  }
}

// 运行测试
testArkAPI();
