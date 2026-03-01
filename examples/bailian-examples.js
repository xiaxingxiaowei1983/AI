/**
 * 阿里云百炼 API 使用示例
 * 
 * 本文件展示如何在不同场景下使用阿里云百炼 API
 */

const BailianClient = require('./plugins/bailian-client');

// 初始化客户端（从环境变量读取 API Key）
function createClient(model = 'qwen3.5-plus') {
  return new BailianClient({
    model: model,
    region: 'cn-beijing'
  });
}

// 示例 1: 简单问答
async function exampleSimpleQA() {
  console.log('\n=== 示例 1: 简单问答 ===\n');
  
  const client = createClient();
  const result = await client.simpleChat(
    '什么是人工智能？',
    '你是一个知识渊博的 AI 助手，擅长用简单易懂的语言解释复杂概念'
  );
  
  if (result.success) {
    console.log('回答：', result.content);
    console.log('Token 使用：', result.usage);
  } else {
    console.error('错误：', result.error);
  }
}

// 示例 2: 多轮对话
async function exampleMultiTurnChat() {
  console.log('\n=== 示例 2: 多轮对话 ===\n');
  
  const client = createClient();
  
  const messages = [
    { role: 'user', content: '我想学习 Python 编程' },
    { role: 'assistant', content: '很好！Python 是一门非常适合初学者的编程语言。你有什么具体的学习目标吗？' },
    { role: 'user', content: '我想用来做数据分析' }
  ];
  
  const result = await client.chat(messages, {
    systemPrompt: '你是一个专业的 Python 编程导师，擅长指导学生从零基础学习 Python 数据分析'
  });
  
  if (result.success) {
    console.log('导师建议：', result.content);
  }
}

// 示例 3: 代码生成
async function exampleCodeGeneration() {
  console.log('\n=== 示例 3: 代码生成 ===\n');
  
  const client = createClient('qwen3.5-plus');
  
  const result = await client.simpleChat(
    '请用 Python 写一个快速排序算法，包含详细注释',
    '你是一个资深软件工程师，擅长编写高质量、易读的代码'
  );
  
  if (result.success) {
    console.log('生成的代码：\n', result.content);
  }
}

// 示例 4: 文本摘要
async function exampleTextSummarization() {
  console.log('\n=== 示例 4: 文本摘要 ===\n');
  
  const client = createClient('qwen-plus');
  
  const longText = `
    人工智能（Artificial Intelligence，简称 AI）是计算机科学的一个分支，
    它企图了解智能的实质，并生产出一种新的能以人类智能相似的方式做出反应的智能机器。
    该领域的研究包括机器人、语言识别、图像识别、自然语言处理和专家系统等。
    人工智能从诞生以来，理论和技术日益成熟，应用领域也不断扩大，
    可以设想，未来人工智能带来的科技产品，将会是人类智慧的"容器"。
    人工智能可以对人的意识、思维的信息过程的模拟。
    人工智能不是人的智能，但能像人那样思考、也可能超过人的智能。
  `;
  
  const result = await client.simpleChat(
    `请为以下文本写一个简短的摘要（不超过 50 字）：\n\n${longText}`,
    '你是一个专业的编辑，擅长提炼文章要点'
  );
  
  if (result.success) {
    console.log('摘要：', result.content);
  }
}

// 示例 5: 翻译
async function exampleTranslation() {
  console.log('\n=== 示例 5: 翻译 ===\n');
  
  const client = createClient('qwen-plus');
  
  const result = await client.simpleChat(
    '请将以下内容翻译成英文：你好，很高兴认识你。今天天气真好。',
    '你是一个专业的翻译，擅长中英文互译，翻译准确流畅'
  );
  
  if (result.success) {
    console.log('翻译结果：', result.content);
  }
}

// 示例 6: 参数调优
async function exampleParameterTuning() {
  console.log('\n=== 示例 6: 参数调优对比 ===\n');
  
  const client = createClient();
  
  const prompt = '写一首关于春天的短诗';
  
  // 低温度（更稳定）
  console.log('--- 低温度 (0.3) ---');
  const result1 = await client.simpleChat(prompt, '你是一个诗人', {
    temperature: 0.3,
    top_p: 0.8
  });
  if (result1.success) {
    console.log(result1.content);
  }
  
  // 高温度（更有创意）
  console.log('\n--- 高温度 (0.9) ---');
  const result2 = await client.simpleChat(prompt, '你是一个诗人', {
    temperature: 0.9,
    top_p: 0.95
  });
  if (result2.success) {
    console.log(result2.content);
  }
}

// 示例 7: 错误处理
async function exampleErrorHandling() {
  console.log('\n=== 示例 7: 错误处理 ===\n');
  
  const client = new BailianClient({
    apiKey: 'invalid-key',
    model: 'qwen3.5-plus'
  });
  
  const result = await client.simpleChat('你好', '助手');
  
  if (!result.success) {
    console.log('检测到错误：', result.error);
    console.log('HTTP 状态码：', result.statusCode);
    
    // 根据错误类型处理
    if (result.statusCode === 401) {
      console.log('处理方案：检查 API Key 是否正确');
    } else if (result.statusCode === 429) {
      console.log('处理方案：请求频率超限，请稍后重试');
    } else if (result.statusCode >= 500) {
      console.log('处理方案：服务器错误，稍后重试');
    }
  }
}

// 示例 8: 流式输出（模拟）
async function exampleStreaming() {
  console.log('\n=== 示例 8: 流式输出效果 ===\n');
  
  const client = createClient();
  
  const result = await client.simpleChat(
    '请用 100 字左右介绍人工智能',
    '你是一个科技记者，擅长用生动的语言介绍前沿技术'
  );
  
  if (result.success) {
    const content = result.content;
    console.log('流式输出效果：');
    
    // 模拟流式输出
    const chars = content.split('');
    for (let i = 0; i < chars.length; i++) {
      process.stdout.write(chars[i]);
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    console.log('\n');
  }
}

// 主函数 - 运行所有示例
async function runAllExamples() {
  console.log('╔════════════════════════════════════════╗');
  console.log('║   阿里云百炼 API 使用示例              ║');
  console.log('╚════════════════════════════════════════╝');
  
  try {
    await exampleSimpleQA();
    await exampleMultiTurnChat();
    await exampleCodeGeneration();
    await exampleTextSummarization();
    await exampleTranslation();
    await exampleParameterTuning();
    await exampleErrorHandling();
    await exampleStreaming();
    
    console.log('\n✅ 所有示例运行完成\n');
  } catch (error) {
    console.error('\n❌ 运行过程中发生错误：', error.message);
  }
}

// 如果直接运行此文件
if (require.main === module) {
  runAllExamples().catch(console.error);
}

module.exports = {
  createClient,
  exampleSimpleQA,
  exampleMultiTurnChat,
  exampleCodeGeneration,
  exampleTextSummarization,
  exampleTranslation,
  exampleParameterTuning,
  exampleErrorHandling,
  exampleStreaming,
  runAllExamples
};
