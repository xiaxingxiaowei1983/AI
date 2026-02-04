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
const DASHSCOPE_API_KEY = import.meta.env.VITE_DASHSCOPE_API_KEY || 'sk-5b3ed10963f34b4aa7eca0ecb72ab216';
const DASHSCOPE_APP_ID = import.meta.env.VITE_DASHSCOPE_APP_ID || 'c68f3c9527644a35ba1d27c099066191';
const API_URL = `https://dashscope.aliyuncs.com/api/v1/apps/${DASHSCOPE_APP_ID}/completion`;

// 解析AI返回的结果
function parseAnalysisResult(text: string): Partial<AnalysisResult> {
  try {
    // 尝试解析JSON
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const jsonStr = jsonMatch[0];
      const parsed = JSON.parse(jsonStr);
      return {
        section_see: parsed.section_see || '',
        section_understand: parsed.section_understand || '',
        section_grow: parsed.section_grow || '',
        risk_level: parsed.risk_level || 'low'
      };
    }
  } catch (error) {
    console.error('解析AI返回结果失败:', error);
  }
  
  // 如果JSON解析失败，返回空结果
  return {
    section_see: '无法解析分析结果',
    section_understand: '无法解析分析结果',
    section_grow: '无法解析分析结果',
    risk_level: 'low'
  };
}

// 网络连接检测
async function checkNetworkConnectivity(): Promise<boolean> {
  try {
    console.log('开始检测网络连接...');
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5秒超时
    
    const response = await fetch('https://dashscope.aliyuncs.com', {
      method: 'HEAD',
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    console.log('网络连接检测成功:', response.ok);
    return response.ok;
  } catch (error) {
    console.error('网络连接检测失败:', error);
    return false;
  }
}

// 调用阿里云百炼API进行HTP分析
export async function analyzeDrawingWithAI(imageData: string): Promise<AnalysisResult> {
  const startTime = Date.now();
  
  try {
    console.log('开始调用阿里云百炼API...');
    console.log('API URL:', API_URL);
    console.log('App ID:', DASHSCOPE_APP_ID);
    
    // 检测网络连接
    const isConnected = await checkNetworkConnectivity();
    if (!isConnected) {
      console.warn('网络连接检测失败，可能无法正常调用API');
    }
    
    // 构建阿里云百炼 API 标准请求体
    const requestBody = {
      input: {
        prompt: `${HTP_SYSTEM_PROMPT}\n\n请分析以下房树人绘画作品，生成完整的心理分析报告。图片数据：${imageData.substring(0, 100)}...`
      },
      parameters: {
        max_tokens: 2000,
        temperature: 0.7
      }
    };

    console.log('请求参数准备完成，开始发送API请求...');

    // 添加超时设置
    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      console.error('API调用超时，30秒后自动终止');
      controller.abort();
    }, 30000); // 30秒超时

    // 调用API
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${DASHSCOPE_API_KEY}`,
        'Content-Type': 'application/json',
        'X-Request-Id': `htp-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
      },
      body: JSON.stringify(requestBody),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log(`API响应状态码: ${response.status}`);
    
    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
        console.error('API错误响应:', errorData);
        
        // 分析常见错误类型
        if (errorData.error?.code === '401') {
          console.error('API Key 无效或未授权');
        } else if (errorData.error?.code === '429') {
          console.error('API 调用频率过高，已达到限流上限');
        } else if (errorData.error?.code === '500') {
          console.error('API 服务内部错误');
        }
      } catch (jsonError) {
        console.error('解析错误响应失败:', jsonError);
        errorData = { error: { message: await response.text() } };
      }
      throw new Error(`API调用失败: ${errorData.error?.message || errorData.message || response.statusText}`);
    }

    const data = await response.json();
    console.log('API成功响应:', data);
    
    const resultText = data.output?.text || data.Text || '';
    console.log('API返回文本长度:', resultText.length);

    console.log(`API调用完成，耗时: ${Date.now() - startTime}ms`);

    // 解析结果
    const parsedResult = parseAnalysisResult(resultText);

    return {
      section_see: parsedResult.section_see || 'AI分析完成',
      section_understand: parsedResult.section_understand || 'AI分析完成',
      section_grow: parsedResult.section_grow || 'AI分析完成',
      illustrations: [],
      risk_level: parsedResult.risk_level || 'low'
    };

  } catch (error) {
    console.error('HTP分析失败:', error);
    console.error('错误详情:', error instanceof Error ? error.stack : error);
    
    // 分析错误类型
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        console.error('API调用被终止（超时或用户取消）');
      } else if (error.message.includes('NetworkError')) {
        console.error('网络错误，可能是网络连接问题');
      } else if (error.message.includes('401')) {
        console.error('认证错误，API Key 可能无效');
      } else if (error.message.includes('429')) {
        console.error('限流错误，API 调用频率过高');
      }
    }
    
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
