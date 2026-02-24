const fs = require('fs');
const path = require('path');

// 模拟OpenClaw加载配置
function loadOpenClawConfig() {
  const configPath = path.join(__dirname, 'openclaw.json');
  if (fs.existsSync(configPath)) {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
  }
  throw new Error('OpenClaw配置文件不存在');
}

// 测试Ark API配置
async function testOpenClawArkConfig() {
  console.log('=== 测试OpenClaw Ark API配置 ===\n');

  try {
    // 加载OpenClaw配置
    const config = loadOpenClawConfig();
    console.log('✅ OpenClaw配置加载成功!');
    
    // 检查Ark API配置
    if (config.models && config.models.ark) {
      const arkConfig = config.models.ark;
      console.log('Ark API配置:');
      console.log('  启用状态:', arkConfig.enabled);
      console.log('  适配器:', arkConfig.adapter);
      console.log('  模型:', arkConfig.model);
      console.log('  API Key:', arkConfig.apiKey.substring(0, 10) + '...');
      console.log('');

      // 尝试加载Ark API适配器
      console.log('2. 测试加载Ark API适配器...');
      const arkAdapter = require('./ark-simple-adapter');
      console.log('✅ Ark API适配器加载成功!');
      console.log('');

      // 测试API调用
      console.log('3. 测试Ark API调用...');
      const testMessage = '你好，这是一个测试消息，验证OpenClaw能否正常使用Ark API';
      const result = await arkAdapter.chat(testMessage);
      
      console.log('✅ Ark API调用成功!');
      console.log('  模型:', result.model);
      console.log('  使用情况:', result.usage);
      console.log('  响应:', result.text.substring(0, 300) + '...');
      console.log('');

      // 测试图像描述
      console.log('4. 测试图像描述功能...');
      const imageUrl = 'https://ark-project.tos-cn-beijing.volces.com/doc_image/ark_demo_img_1.png';
      const imageResult = await arkAdapter.describeImage(imageUrl);
      
      console.log('✅ 图像描述功能成功!');
      console.log('  模型:', imageResult.model);
      console.log('  使用情况:', imageResult.usage);
      console.log('  响应:', imageResult.text.substring(0, 300) + '...');
      console.log('');

      console.log('=== 测试完成 ===');
      console.log('✅ OpenClaw Ark API配置测试通过!');
      console.log('OpenClaw现在可以通过 http://localhost:18789 访问网关，并使用火山引擎Ark API。');

    } else {
      console.error('❌ Ark API配置不存在');
    }

  } catch (error) {
    console.error('❌ 测试失败:', error.message);
    console.error('详细错误:', error);
  }
}

testOpenClawArkConfig();
