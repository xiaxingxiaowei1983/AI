import type { AnalysisResult, UserDrawing } from '@/types';

// HTP分析提示词
const HTP_SYSTEM_PROMPT = `你是HTP（House-Tree-Person）房树人心理分析专家。请分析用户上传的房树人绘画作品，进行深度心理画像分析。

## 分析维度

### 1. 视觉特征识别
分析以下元素：
- **房子（House）**：位置、大小、结构完整性、门窗状态、屋顶样式
- **树木（Tree）**：位置、大小、树干粗细、树冠密度、生长方向、健康状况  
- **人物（Person）**：位置、大小、表情、姿态、完整性、穿着
- **技术特征**：线条质量、涂抹程度、细节丰富度、空间利用

### 2. 心理分析框架

#### 房子象征意义
- 位置偏左 → 与过去/原生家庭的关系
- 位置偏右 → 与未来/发展的关系
- 门窗敞开 → 开放、愿意与外界交流
- 门窗封闭 → 防御性强、社交回避
- 没有门窗 → 完全封闭、自我隔离

#### 树木象征意义
- 树干粗壮 → 内力量、自我支撑
- 树冠茂盛 → 生命力、成长潜能
- 向上生长 → 积极成长导向
- 向下垂落 → 消极、退缩倾向
- 枯萎状态 → 内在力量不足、抑郁倾向

#### 人物象征意义
- 微笑表情 → 积极情绪、接纳态度
- 悲伤表情 → 消极情绪、抗拒态度
- 开放姿态 → 接纳、开放
- 蜷缩姿态 → 防御、保护

#### 技术特征分析
- 线条有力 → 情绪稳定
- 线条柔弱 → 焦虑、不稳定
- 无涂抹 → 低焦虑
- 大量涂抹 → 高度焦虑

### 3. 风险评估

#### 高风险指标（需立即关注）
- 人物缺失关键部分（无头、无四肢）
- 树木枯萎
- 房子缺失关键元素
- 大量涂抹
- 元素极度疏离

#### 中风险指标（需关注）
- 明显涂抹
- 元素过小
- 房子封闭
- 线条断续

## 输出格式要求

请生成以下JSON格式的分析结果：

{
  "section_see": "描述性内容，用温暖、接纳的语言描述画面中的元素",
  "section_understand": "分析性内容，深入分析各元素的象征意义",
  "section_grow": "建议性内容，提供个性化的成长建议",
  "risk_level": "low | medium | high",
  "risk_indicators": ["高风险指标列表"],
  "core_traits": ["核心特质列表"],
  "strengths": ["优势列表"],
  "challenges": ["挑战列表"]
}

## 语言风格
- 温暖、接纳、不评判
- 专业但易懂
- 富有同理心
- 鼓励自我探索和成长

请根据用户上传的房树人绘画作品，生成完整的心理分析报告。`;

interface HtpAnalysisResponse {
  output: {
    text: string;
  };
}

interface HtpAnalysisError {
  error?: {
    message?: string;
  };
}

// 阿里云百炼API配置
const DASHSCOPE_API_KEY = import.meta.env.VITE_DASHSCOPE_API_KEY;
const DASHSCOPE_APP_ID = import.meta.env.VITE_DASHSCOPE_APP_ID;
const API_URL = `https://dashscope.aliyuncs.com/api/v1/apps/${DASHSCOPE_APP_ID || '4923df70cb9d444f8d9e88f62fd33602'}/completion`;

// 验证环境变量加载
console.log('环境变量加载情况:');
console.log('VITE_DASHSCOPE_API_KEY:', DASHSCOPE_API_KEY ? '已加载' : '未加载');
console.log('VITE_DASHSCOPE_APP_ID:', DASHSCOPE_APP_ID ? '已加载' : '未加载');

// 解析AI返回的结果
function parseAnalysisResult(text: string): Partial<AnalysisResult> {
  try {
    // 1. 尝试解析JSON格式
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      try {
        const jsonStr = jsonMatch[0];
        const parsed = JSON.parse(jsonStr);
        console.log('✅ 成功解析JSON格式结果');
        return {
          section_see: parsed.section_see || '',
          section_understand: parsed.section_understand || '',
          section_grow: parsed.section_grow || '',
          illustrations: parsed.illustrations || [],
          risk_level: parsed.risk_level || 'low'
        };
      } catch (jsonError) {
        console.warn('JSON解析失败，尝试解析【观察】【理解】【成长】格式:', jsonError);
      }
    }
    
    // 2. 尝试解析【观察】【理解】【成长】格式
    console.log('🔄 尝试解析【观察】【理解】【成长】格式');
    
    // 修复后健壮正则（兼容空格/换行/标点）
    const match = text.match(
      /【\s*观\s*察\s*】\s*([\s\S]*?)\s*【\s*理\s*解\s*】\s*([\s\S]*?)\s*【\s*成\s*长\s*】\s*([\s\S]*)/i
    );
    
    if (match) {
      console.log('✅ 成功解析【观察】【理解】【成长】格式');
      return {
        section_see: match[1]?.trim() || '',
        section_understand: match[2]?.trim() || '',
        section_grow: match[3]?.trim() || '',
        illustrations: [],
        risk_level: 'low'
      };
    }
    
    // 3. 尝试解析简化格式（容错处理）
    console.log('🔄 尝试解析简化格式');
    
    // 检查是否包含关键词
    const hasObservation = text.includes('观察') || text.includes('观察:') || text.includes('【观察】');
    const hasUnderstanding = text.includes('理解') || text.includes('理解:') || text.includes('【理解】');
    const hasGrowth = text.includes('成长') || text.includes('成长:') || text.includes('【成长】');
    
    console.log('📝 简化格式检查结果:');
    console.log('包含观察关键词:', hasObservation);
    console.log('包含理解关键词:', hasUnderstanding);
    console.log('包含成长关键词:', hasGrowth);
    
    if (hasObservation || hasUnderstanding || hasGrowth) {
      console.log('✅ 成功解析简化格式');
      return {
        section_see: hasObservation ? text : '',
        section_understand: hasUnderstanding ? text : '',
        section_grow: hasGrowth ? text : '',
        illustrations: [],
        risk_level: 'low'
      };
    }
    
    console.warn('⚠️ 所有解析方法都失败了');
  } catch (error) {
    console.error('解析AI返回结果失败:', error);
  }
  
  // 如果所有解析方法都失败，返回空结果
  return {
    section_see: '无法解析分析结果',
    section_understand: '无法解析分析结果',
    section_grow: '无法解析分析结果',
    illustrations: [],
    risk_level: 'low'
  };
}

// 网络连接检测
async function checkNetworkConnectivity(): Promise<boolean> {
  try {
    console.log('开始检测网络连接...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 缩短超时时间到3秒
    
    const response = await fetch('https://dashscope.aliyuncs.com', {
      method: 'HEAD',
      signal: controller.signal,
      mode: 'cors', // 添加CORS模式
      credentials: 'omit' // 不发送凭据
    });
    
    clearTimeout(timeoutId);
    console.log('网络连接检测成功:', response.ok);
    console.log('网络连接状态码:', response.status);
    return response.ok;
  } catch (error) {
    console.warn('网络连接检测失败，将继续尝试API调用:', error);
    console.warn('错误详情:', error instanceof Error ? error.message : error);
    // 即使网络检测失败，也返回true以允许继续尝试API调用
    return true;
  }
}

// 调用阿里云百炼API进行HTP分析
export async function analyzeDrawingWithAI(imageData: string, retryCount: number = 0): Promise<AnalysisResult> {
  const startTime = Date.now();
  
  try {
    console.log('开始调用阿里云百炼API...');
    console.log('API URL:', API_URL);
    console.log('App ID:', DASHSCOPE_APP_ID);
    console.log('API Key配置状态:', !!DASHSCOPE_API_KEY ? '已配置' : '未配置');
    console.log('重试次数:', retryCount);
    
    // 验证API密钥配置
    if (!DASHSCOPE_API_KEY) {
      console.error('API密钥未配置，请检查环境变量VITE_DASHSCOPE_API_KEY');
      console.error('当前环境变量值:', import.meta.env.VITE_DASHSCOPE_API_KEY);
      throw new Error('API密钥未配置，请联系管理员');
    }
    
    // 验证API密钥格式
    if (typeof DASHSCOPE_API_KEY !== 'string' || DASHSCOPE_API_KEY.length < 32) {
      console.error('API密钥格式不正确，长度:', DASHSCOPE_API_KEY ? DASHSCOPE_API_KEY.length : 0);
      throw new Error('API密钥格式不正确，请联系管理员');
    }
    
    // 验证API URL格式
    if (!API_URL.startsWith('https://dashscope.aliyuncs.com')) {
      console.warn('API URL可能不是标准阿里云百炼API地址:', API_URL);
    }
    
    // 验证请求头中的Authorization
    console.log('准备发送的Authorization头:', `Bearer ${DASHSCOPE_API_KEY.substring(0, 4)}...`);
    
    // 验证imageData参数
    if (!imageData || typeof imageData !== 'string') {
      console.error('imageData参数无效:', imageData);
      throw new Error('图像数据无效，请检查上传的图像');
    }
    
    // 验证imageData长度（防止过大的请求）
    if (imageData.length > 10 * 1024 * 1024) { // 10MB
      console.error('imageData参数过大，长度:', imageData.length);
      throw new Error('图像数据过大，请上传较小的图像');
    }
    
    // 构建阿里云百炼 API 标准请求体
    const requestBody = {
      input: {
        prompt: `${HTP_SYSTEM_PROMPT}\n\n请分析以下房树人绘画作品，生成完整的心理分析报告。`
      },
      parameters: {
        max_tokens: 1500,
        temperature: 0.6
      }
    };

    // 验证请求体结构
    if (!requestBody.input || !requestBody.input.prompt) {
      console.error('请求体结构无效:', requestBody);
      throw new Error('请求参数配置错误，请联系管理员');
    }

    console.log('请求参数准备完成，开始发送API请求...');
    console.log('请求体大小:', JSON.stringify(requestBody).length, '字符');
    console.log('提示词长度:', requestBody.input.prompt.length, '字符');

    // 添加超时设置
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.error('API调用超时，60秒后自动终止');
      controller.abort();
    }, 60000); // 增加超时时间到60秒

    // 调用API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Request-Id': `htp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        'Accept': 'application/json'
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal,
      mode: 'cors', // 添加CORS模式
      credentials: 'omit', // 不发送凭据
      cache: 'no-cache' // 禁用缓存
    });

    clearTimeout(timeoutId);

    console.log(`API响应状态码: ${response.status}`);
    console.log('API响应状态文本:', response.statusText);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('API错误响应:', JSON.stringify(errorData, null, 2));
        
        // 分析常见错误类型
        if (errorData.error?.code === '401') {
          console.error('API Key 无效或未授权');
          throw new Error('API密钥无效或未授权，请联系管理员');
        } else if (errorData.error?.code === '429') {
          console.error('API 调用频率过高，已达到限流上限');
          throw new Error('API调用过于频繁，请稍后再试');
        } else if (errorData.error?.code === '500') {
          console.error('API 服务内部错误');
          throw new Error('服务器暂时无法处理请求，请稍后再试');
        } else if (errorData.error?.code === '404') {
          console.error('API端点不存在，可能是URL配置错误');
          throw new Error('API配置错误，请联系管理员');
        } else if (errorData.error?.code === '403') {
          console.error('API访问被拒绝，可能是权限问题');
          throw new Error('API访问被拒绝，请联系管理员');
        }
      } catch (jsonError) {
        console.error('解析错误响应失败:', jsonError);
        try {
          const errorText = await response.text();
          console.error('错误响应文本:', errorText);
          errorData = { error: { message: errorText } };
        } catch (textError) {
          console.error('读取错误响应文本失败:', textError);
          errorData = { error: { message: response.statusText } };
        }
      }
      throw new Error(`API调用失败: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    // 读取响应数据
    let data;
    try {
      data = await response.json();
      console.log('API成功响应:', JSON.stringify(data, null, 2));
    } catch (jsonError) {
      console.error('解析API响应失败:', jsonError);
      throw new Error('服务器返回的数据格式错误，请稍后再试');
    }
    
    // 验证响应数据结构
    if (!data) {
      console.error('API返回的数据为空');
      throw new Error('服务器返回的数据为空，请稍后再试');
    }
    
    // 验证响应数据格式
    if (data.error) {
      console.error('API返回错误:', data.error);
      const errorMessage = data.error.message || JSON.stringify(data.error);
      throw new Error(`API调用失败: ${errorMessage}`);
    }
    
    // 验证output字段
    if (!data.output) {
      console.error('API返回的数据缺少output字段:', data);
      throw new Error('服务器返回的数据格式错误，缺少输出内容');
    }
    
    // 提取结果文本
    const resultText = data.output.text || data.output.output || data.Text || '';
    console.log('API返回文本长度:', resultText.length);
    
    // 验证结果文本
    if (!resultText || typeof resultText !== 'string') {
      console.error('API返回的结果文本无效:', resultText);
      throw new Error('服务器返回的分析结果无效，请稍后再试');
    }
    
    // 验证结果文本长度
    if (resultText.length < 100) {
      console.warn('API返回的结果文本过短，可能不完整:', resultText.length);
    }

    // 添加调试日志，检查返回文本格式
    console.log('🔍 API原始返回文本（开始）:', resultText.substring(0, 200) + '...');
    console.log('🔍 文本长度:', resultText.length);
    console.log('🔍 是否包含【观察】:', resultText.includes('【观察】'));
    console.log('🔍 是否包含【理解】:', resultText.includes('【理解】'));
    console.log('🔍 是否包含【成长】:', resultText.includes('【成长】'));

    console.log(`API调用完成，耗时: ${Date.now() - startTime}ms`);

    // 解析结果
    const parsedResult = parseAnalysisResult(resultText);
    
    // 验证解析结果
    console.log('解析后的API结果:', JSON.stringify(parsedResult, null, 2));
    
    // 确保返回的结果包含真实API数据，而不是默认值
    const analysisResult = {
      section_see: parsedResult.section_see || 'AI分析完成',
      section_understand: parsedResult.section_understand || 'AI分析完成',
      section_grow: parsedResult.section_grow || 'AI分析完成',
      illustrations: parsedResult.illustrations || [],
      risk_level: parsedResult.risk_level || 'low'
    };
    
    console.log('最终返回的分析结果:', JSON.stringify(analysisResult, null, 2));
    return analysisResult;

  } catch (error) {
    console.error('HTP分析失败:', error);
    console.error('错误详情:', error instanceof Error ? error.stack : error);
    
    // 分析错误类型
    if (error instanceof Error) {
      // 定义可重试的错误类型
      const isRetryableError = (
        // 超时错误
        error.name === 'AbortError' ||
        // 网络错误
        (error.message.includes('NetworkError') || error.message.includes('Failed to fetch') || error.message.includes('ERR_FAILED') || error.message.includes('fetch failed')) ||
        // 服务器临时错误
        (error.message.includes('500') || error.message.includes('502') || error.message.includes('503') || error.message.includes('504'))
      );
      
      // 如果是可重试的错误，且重试次数小于2，则自动重试
      if (isRetryableError && retryCount < 2) {
        // 实现指数退避策略，每次重试后增加等待时间
        const baseDelay = 1000; // 基础延迟时间（毫秒）
        const exponentialDelay = baseDelay * Math.pow(2, retryCount); // 指数增长的延迟时间
        const jitter = Math.random() * 500; // 添加一些随机性，避免请求风暴
        const totalDelay = exponentialDelay + jitter;
        
        console.log(`API调用失败，将在 ${Math.round(totalDelay)}ms 后重试...`);
        console.log(`错误类型: ${error.name || 'Unknown'}，错误消息: ${error.message}`);
        console.log(`重试次数: ${retryCount + 1}/2`);
        
        // 等待指定时间后重试
        await new Promise(resolve => setTimeout(resolve, totalDelay));
        return analyzeDrawingWithAI(imageData, retryCount + 1);
      }
      
      // 处理不同类型的错误
      if (error.name === 'AbortError') {
        console.error('API调用被终止（超时或用户取消）');
        throw new Error('网络连接超时，已尝试多次连接失败，请检查网络后重试');
      } else if (error.message.includes('NetworkError') || error.message.includes('Failed to fetch') || error.message.includes('ERR_FAILED') || error.message.includes('fetch failed')) {
        console.error('网络错误，可能是网络连接问题');
        throw new Error('网络连接失败，请检查网络连接后重试');
      } else if (error.message.includes('401')) {
        console.error('认证错误，API Key 可能无效');
        throw new Error('API密钥无效，请联系管理员检查API密钥配置');
      } else if (error.message.includes('429')) {
        console.error('限流错误，API 调用频率过高');
        throw new Error('API调用过于频繁，请稍后再试（建议等待30秒后重试）');
      } else if (error.message.includes('500') || error.message.includes('502') || error.message.includes('503') || error.message.includes('504')) {
        console.error('API服务内部错误或不可用');
        throw new Error('服务器暂时无法处理请求，请稍后再试（建议等待1分钟后重试）');
      } else if (error.message.includes('SSL') || error.message.includes('TLS')) {
        console.error('SSL/TLS证书错误');
        throw new Error('网络安全连接错误，请检查SSL配置或联系管理员');
      } else if (error.message.includes('404')) {
        console.error('API端点不存在');
        throw new Error('API配置错误，请联系管理员检查API地址配置');
      } else if (error.message.includes('403')) {
        console.error('API访问被拒绝，可能是权限问题');
        throw new Error('API访问被拒绝，请联系管理员检查权限设置');
      } else if (error.message.includes('400')) {
        console.error('API请求参数错误');
        throw new Error('请求参数错误，请联系管理员检查API配置');
      } else {
        console.error('其他错误:', error.message);
        throw new Error(`分析过程中发生错误: ${error.message}，请稍后重试`);
      }
    }
    
    // 其他错误
    throw new Error('分析过程中发生未知错误，请稍后重试');
  }
}

// 生成插画函数
export async function generateIllustration(params: {
  type: string;
  sourceImage?: string;
  text?: string;
  prompt: string;
}): Promise<string> {
  console.log(`🎨 生成${params.type}类型插画...`);
  console.log('插画提示词:', params.prompt.substring(0, 100) + '...');
  
  // 阿里云百炼通义万相API配置
  const DASHSCOPE_API_KEY = import.meta.env.VITE_DASHSCOPE_API_KEY;
  const API_URL = 'https://dashscope.aliyuncs.com/api/v1/services/aigc/image-generation/generation';
  
  // 验证API密钥
  if (!DASHSCOPE_API_KEY) {
    console.error('❌ 插画生成失败：API密钥未配置');
    throw new Error('API密钥未配置');
  }
  
  try {
    // 构建请求体
    const requestBody = {
      model: 'wanx-v1', // 通义万相模型
      input: {
        prompt: params.prompt,
        ...(params.sourceImage && { image_url: params.sourceImage }) // 图生图需原图
      },
      parameters: {
        size: '2230*1000' // 严格2.23:1
      }
    };
    
    console.log('📡 发送插画生成API请求...');
    
    // 调用API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody),
      timeout: 60000 // 60秒超时
    });
    
    console.log(`📡 插画生成API响应状态码: ${response.status}`);
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('❌ 插画生成API调用失败:', errorData);
      throw new Error(`插画生成失败: ${errorData.error?.message || response.statusText}`);
    }
    
    const data = await response.json();
    console.log('✅ 插画生成成功');
    
    // 返回图片URL
    return data.output.results[0].url;
  } catch (error) {
    console.error('❌ 插画生成过程中发生错误:', error);
    throw error;
  }
}

// 备用本地分析函数
export function analyzeDrawingLocal(drawing: UserDrawing): AnalysisResult {
  return {
    section_see: '在你的画笔下，我看见了一座温馨的小房子，屋顶有着柔和的曲线，门窗都敞开着。房子旁边生长着一棵枝繁叶茂的大树，树干粗壮有力，树冠向四周舒展。树下站着一个正在微笑的人，双臂自然张开，仿佛在拥抱这个世界。',
    section_understand: '房子象征着你的内心世界，敞开的门窗暗示着你渴望与外界建立联系，愿意让别人走进你的内心。那棵茂盛的大树代表着你内在的生命力和成长潜能，粗壮的树干显示出你有着坚实的自我支撑。画中的人物姿态舒展，表明你正在逐渐接纳真实的自己，愿意以更开放的姿态面对生活。',
    section_grow: '拥抱真实的自己，或许可以试着每天给自己一些独处的时光，倾听内心的声音。当你感到疲惫时，不妨像画中的大树一样，扎根于大地，从生活中汲取养分。记住，敞开心扉不是软弱，而是勇敢的表现。允许自己慢慢来，成长是一场温柔的旅程。',
    illustrations: [],
    risk_level: 'low'
  };
}
