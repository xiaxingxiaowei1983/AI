// 阿里云百炼 API 调用测试
// 这个文件专门用于测试阿里云百炼 API 的调用功能

const API_KEY = 'sk-5b3ed10963f34b4aa7eca0ecb72ab216';
const APP_ID = 'c68f3c9527644a35ba1d27c099066191';
const API_URL = `https://dashscope.aliyuncs.com/api/v1/apps/${APP_ID}/completion`;

// HTP分析提示词
const HTP_SYSTEM_PROMPT = `你是HTP（House-Tree-Person）房树人心理分析专家。请分析用户上传的房树人绘画作品，进行深度心理画像分析。

## 分析维度

### 1. 视觉特征识别
分析以下元素：
- **房子（House）**：位置、大小、结构完整性、门窗状态、屋顶样式
- **树木（Tree）**：位置、大小、树干粗细、树冠密度、生长方向、健康状况  
- **人物（Person）**：位置、大小、表情、姿态、完整性、穿着
- **技术特征**：线条质量、涂抹程度、细节丰富度、空间利用

## 输出格式要求

请生成以下JSON格式的分析结果：

{
  "section_see": "描述性内容，用温暖、接纳的语言描述画面中的元素",
  "section_understand": "分析性内容，深入分析各元素的象征意义",
  "section_grow": "建议性内容，提供个性化的成长建议",
  "risk_level": "low | medium | high"
}

请根据用户上传的房树人绘画作品，生成完整的心理分析报告。`;

// 网络连接检测
async function checkNetworkConnectivity() {
  try {
    console.log('开始检测网络连接...');
    
    // 在Node.js环境中简化网络检测
    const response = await fetch('https://dashscope.aliyuncs.com', {
      method: 'HEAD',
      timeout: 5000 // 5秒超时
    });
    
    console.log('网络连接检测成功:', response.ok);
    return response.ok;
  } catch (error) {
    console.error('网络连接检测失败:', error);
    return false;
  }
}

// 调用阿里云百炼API
async function testAliyunApi() {
  console.log('=== 阿里云百炼 API 调用测试 ===');
  console.log('API URL:', API_URL);
  console.log('App ID:', APP_ID);
  console.log('API Key:', API_KEY.substring(0, 4) + '...' + API_KEY.substring(API_KEY.length - 4));
  
  try {
    // 跳过网络连接检测，直接进行API调用
    console.log('跳过网络连接检测，直接进行API调用...');
    
    // 构建请求体 - 使用更简单的格式
    const requestBody = {
      input: {
        prompt: `${HTP_SYSTEM_PROMPT}\n\n请分析以下房树人绘画作品，生成完整的心理分析报告。这是一幅包含房子、树木和人物的画作。`
      },
      parameters: {
        max_tokens: 1000,
        temperature: 0.7
      }
    };

    console.log('\n📝 准备发送API请求...');
    console.log('请求参数:', JSON.stringify(requestBody, null, 2));

    const startTime = Date.now();

    // 调用API（在Node.js环境中使用超时设置）
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
        'X-Request-Id': `test-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      },
      body: JSON.stringify(requestBody),
      timeout: 30000 // 30秒超时
    });
    const endTime = Date.now();

    console.log(`\n📡 API响应状态码: ${response.status}`);
    console.log(`⏱️  API调用耗时: ${endTime - startTime}ms`);

    if (!response.ok) {
      console.error('❌ API调用失败');
      try {
        const errorData = await response.json();
        console.error('错误响应:', JSON.stringify(errorData, null, 2));
        
        // 分析错误类型
        if (errorData.error?.code === '401') {
          console.error('🔑 API Key 无效或未授权');
        } else if (errorData.error?.code === '429') {
          console.error('📊 API 调用频率过高，已达到限流上限');
        } else if (errorData.error?.code === '500') {
          console.error('💥 API 服务内部错误');
        } else {
          console.error('❓ 未知错误:', errorData.error?.message);
        }
      } catch (jsonError) {
        console.error('解析错误响应失败:', jsonError);
        const errorText = await response.text();
        console.error('错误响应文本:', errorText);
      }
      return;
    }

    console.log('✅ API调用成功！');
    
    const data = await response.json();
    console.log('\n📦 API响应数据:', JSON.stringify(data, null, 2));
    
    const resultText = data.output?.text || data.Text || '';
    console.log('\n📝 API返回文本:', resultText);
    console.log('\n📏 API返回文本长度:', resultText.length);

    // 尝试解析JSON结果
    try {
      const jsonMatch = resultText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        const jsonStr = jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        console.log('\n🔍 解析后的JSON结果:', JSON.stringify(parsed, null, 2));
        console.log('\n✅ 测试完成，API调用成功！');
      } else {
        console.log('\n⚠️  未能从返回文本中解析出JSON格式的结果');
      }
    } catch (parseError) {
      console.error('\n❌ 解析JSON结果失败:', parseError);
    }

  } catch (error) {
    console.error('\n❌ 测试过程中发生错误:', error);
    console.error('错误详情:', error instanceof Error ? error.stack : error);
    
    // 分析错误类型
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('⏰ API调用被终止（超时或用户取消）');
      } else if (error.message.includes('NetworkError')) {
        console.error('🌐 网络错误，可能是网络连接问题');
      } else if (error.message.includes('401')) {
        console.error('🔑 认证错误，API Key 可能无效');
      } else if (error.message.includes('429')) {
        console.error('📊 限流错误，API 调用频率过高');
      } else if (error.message.includes('ENOTFOUND')) {
        console.error('🌐 DNS解析错误，可能是网络连接问题');
      } else if (error.message.includes('ECONNREFUSED')) {
        console.error('🚪 连接被拒绝，可能是防火墙或网络配置问题');
      }
    }
  }
}

// 运行测试
console.log('🚀 启动阿里云百炼 API 调用测试...');
testAliyunApi().catch(console.error);
