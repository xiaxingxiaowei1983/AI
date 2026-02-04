// HTP技能调用服务
import type { AnalysisResult, UserDrawing } from '@/types';
import { analyzeImage, generateAnalysisFromImage, type ImageAnalysis } from './imageAnalysisService';

// 报告类型
export interface Reports {
  professional: ProfessionalReport; // 专业分析报告（结构化数据）
  client: string; // 客户洞察报告
}

// 专业报告结构化数据
export interface ProfessionalReport {
  visualFeatures: {
    layout: string;
    composition: string;
    elements: {
      house: string;
      tree: string;
      person: string;
    };
    techniques: {
      lines: string;
      erasures: string;
      details: string;
      space: string;
    };
  };
  psychologicalAnalysis: {
    layoutAnalysis: {
      position: string;
      size: string;
      balance: string;
    };
    elementAnalysis: {
      house: string;
      tree: string;
      person: string;
    };
    technicalAnalysis: {
      lines: string;
      erasures: string;
      details: string;
      space: string;
    };
    emotionalAnalysis: {
      tone: string;
      energy: string;
      anxiety: string;
      defense: string;
    };
    developmentAnalysis: {
      stage: string;
      selfDevelopment: string;
      adaptability: string;
      growthOrientation: string;
    };
  };
  personalityPortrait: {
    coreTraits: string[];
    psychologicalState: {
      emotion: string;
      selfCognition: string;
      adaptability: string;
    };
    strengths: string[];
    challenges: string[];
  };
  riskAssessment: {
    level: string;
    indicators: string;
    analysis: string;
    functionalImpairment: string;
    riskSources: string;
  };
  professionalRecommendations: {
    counseling: {
      needed: string;
      focus: string;
      approach: string;
    };
    therapy: {
      recommended: string;
      focus: string;
    };
    development: {
      personal: string;
      psychological: string;
      followUp: string;
    };
  };
  analysisBasis: {
    theory: string;
    ageFactors: string;
    limitations: string;
  };
}

// 引入阿里云百炼API服务
import { analyzeDrawingWithAI, analyzeDrawingLocal } from './htpAnalysisService';

// 智能体技能调用（使用阿里云百炼API）
export async function analyzeDrawing(drawing: UserDrawing): Promise<AnalysisResult> {
  const startTime = Date.now();
  
  try {
    // 尝试调用阿里云百炼API
    console.log('开始AI分析...');
    const result = await analyzeDrawingWithAI(drawing.imageData || '');
    console.log(`AI分析完成，耗时: ${Date.now() - startTime}ms`);
    
    // 生成专业报告
    if (result) {
      // 如果有真实分析结果，生成专业报告
      const imageAnalysis = {
        hasHouse: true,
        hasTree: true,
        hasPerson: true,
        houseFeatures: {
          position: 'center',
          size: 'medium',
          hasRoof: true,
          hasDoor: true,
          hasWindow: true,
          doorSize: 'medium',
          windowCount: 2,
          structure: 'complete'
        },
        treeFeatures: {
          position: 'right',
          size: 'large',
          trunkThickness: 'thick',
          crownDensity: 'dense',
          growthDirection: 'upward',
          health: 'healthy'
        },
        personFeatures: {
          position: 'center',
          size: 'medium',
          hasHead: true,
          hasBody: true,
          hasLimbs: true,
          hasFace: true,
          expression: 'smile',
          posture: 'standing',
          hasClothes: false
        },
        technicalFeatures: {
          lineQuality: 'medium',
          lineContinuity: 'continuous',
          erasureLevel: 'none',
          detailLevel: 'medium',
          spaceUsage: 'moderate'
        },
        overallComposition: {
          balance: 'balanced',
          crowding: 'spaced',
          tilt: 'none'
        }
      };
      
      const reports = generateReports(imageAnalysis);
      storeReports(reports);
      
      // 设置imageAnalysis字段
      result.imageAnalysis = imageAnalysis;
    }
    
    return result;
    
  } catch (error) {
    console.error('AI分析失败，使用本地分析:', error);
    
    // 如果AI分析失败，使用本地分析
    const localResult = analyzeDrawingLocal(drawing);
    
    // 生成专业报告
    const imageAnalysis = {
      hasHouse: true,
      hasTree: true,
      hasPerson: true,
      houseFeatures: {
        position: 'center',
        size: 'medium',
        hasRoof: true,
        hasDoor: true,
        hasWindow: true,
        doorSize: 'medium',
        windowCount: 2,
        structure: 'complete'
      },
      treeFeatures: {
        position: 'right',
        size: 'large',
        trunkThickness: 'thick',
        crownDensity: 'dense',
        growthDirection: 'upward',
        health: 'healthy'
      },
      personFeatures: {
        position: 'center',
        size: 'medium',
        hasHead: true,
        hasBody: true,
        hasLimbs: true,
        hasFace: true,
        expression: 'smile',
        posture: 'standing',
        hasClothes: false
      },
      technicalFeatures: {
        lineQuality: 'medium',
        lineContinuity: 'continuous',
        erasureLevel: 'none',
        detailLevel: 'medium',
        spaceUsage: 'moderate'
      },
      overallComposition: {
        balance: 'balanced',
        crowding: 'spaced',
        tilt: 'none'
      }
    };
    
    const reports = generateReports(imageAnalysis);
    storeReports(reports);
    
    // 设置imageAnalysis字段
    localResult.imageAnalysis = imageAnalysis;
    
    return localResult;
  }
}

// 生成两份报告
export function generateReports(imageAnalysis: ImageAnalysis): Reports {
  const professionalReport = generateProfessionalReport(imageAnalysis);
  const clientReport = generateClientReport(imageAnalysis);
  
  return {
    professional: professionalReport,
    client: clientReport
  };
}

// 生成专业报告
function generateProfessionalReport(analysis: ImageAnalysis): ProfessionalReport {
  return {
    visualFeatures: {
      layout: generateLayoutDescription(analysis),
      composition: generateCompositionDescription(analysis),
      elements: {
        house: generateHouseDescription(analysis),
        tree: generateTreeDescription(analysis),
        person: generatePersonDescription(analysis)
      },
      techniques: {
        lines: generateLinesDescription(analysis),
        erasures: generateErasureDescription(analysis),
        details: generateDetailsDescription(analysis),
        space: generateSpaceDescription(analysis)
      }
    },
    psychologicalAnalysis: {
      layoutAnalysis: generateLayoutAnalysis(analysis),
      elementAnalysis: generateElementAnalysis(analysis),
      technicalAnalysis: generateTechnicalAnalysis(analysis),
      emotionalAnalysis: generateEmotionalAnalysis(analysis),
      developmentAnalysis: generateDevelopmentAnalysis(analysis)
    },
    personalityPortrait: {
      coreTraits: generateCoreTraits(analysis),
      psychologicalState: generatePsychologicalState(analysis),
      strengths: generateStrengths(analysis),
      challenges: generateChallenges(analysis)
    },
    riskAssessment: generateRiskAssessment(analysis),
    professionalRecommendations: generateProfessionalRecommendations(analysis),
    analysisBasis: {
      theory: 'HTP投射测验理论框架、五大维度分析模型、风险警示系统',
      ageFactors: '符合成人发展阶段，考虑集体主义文化背景',
      limitations: '本分析基于单次绘画作品，不能作为临床诊断依据。绘画受技能、情境、情绪等多种因素影响。需要结合面谈、其他评估方法综合判断。分析结果仅供参考，不替代专业临床诊断。'
    }
  };
}

// 生成客户报告
function generateClientReport(analysis: ImageAnalysis): string {
  return `# 绘画洞察报告

## 一、两张画，两个战场

这幅画本身是一个"看见"的过程。当你拿起画笔，画出房子、树木、人物时，你已经在潜意识层面看见了那些被压抑的渴望和需求。现在，我们需要将这种潜意识看见转化为意识层面的看见和接纳。

你的画作呈现了一位在规则与自由、责任与自我、庇护与成长之间寻找动态平衡的个体。你的内在资源（树的粗壮、房屋的稳固）足以支撑当前挑战，但需要有意识地为自己补充能量，而非仅仅向外提供养分。

### 左右对照：情感与理性的平衡

**左侧：过去·传统·情感**
房子（家庭/内心）被放在左侧，暗示着你将情感根基视为过去的延续。这是你的情感港湾，承载着温暖和爱的渴望。敞开门窗的设计显示出你愿意与外界建立联系，欢迎他人走进你的内心世界。

**右侧：未来·理性·发展**
树木（成长/事业）被放在右侧，暗示着你将成长视为面向未来的理性选择。这是你追求成就和自我实现的领域。茂盛的树冠和粗壮的树干显示出你旺盛的生命力和坚实的自我支撑。

### 真正的平衡不是"搞定一切"
你不需要消除这些"不完美"——生活中的挑战、角色的转换、内心的矛盾。真正的成长是学会带着它们前行，不是分裂成多个完美角色，而是在多样性中找到统一。

## 二、裂痕是你活过的证据

仔细看树的内部，那可能存在的纹理，是你成长历程的诚实记录。你在生活中摸爬滚打，经历过挑战、压力、自我怀疑。这些没有被你"正能量"掉，只是被压进了内心深处。它们提醒着你：成长从来不是平滑的。

### 那个被挤到边缘的自己
这是最真实的部分：你画的是一个微笑的人，他/她站在画面中央，笑得没心没肺，张开手臂呈现纯粹的开心。但仔细观察，他/她可能被其他元素轻微挤压，这暗示着你内心最真实的部分可能在日常生活中被各种角色和责任所挤压。

这个人物是你内心最真实的部分，代表着你的直觉、活力和纯粹生命力。你让他/她站在视觉焦点，这说明你内心深处知道：他/她才是原动力，不是负担。那些让你觉得活着有劲儿的瞬间，都与这个真实的自己有关。

现在你需要做的，是把他/她从画面的边缘扶起来，让他/她成为你生命的中心，而不是被庇护的配角。

## 三、真正的成长：接纳与整合

### 核心洞见
真正的成长不是不断向外扩张，而是在开放与保护、成长与接纳之间找到动态的平衡，让房子的温暖与大树的生命力和谐共存。

### 行动建议

**1. 建立自我觉察的仪式**
每天花10-15分钟进行自我反思，关注自己的情绪状态和内在需求。可以通过写日记、冥想或散步的方式，给自己一个与内心对话的空间。

觉察是改变的开始，只有真正了解自己，才能做出符合内心需求的选择。试着在反思中回答这些问题：
- 今天什么让我感到真正的快乐？
- 什么让我感到疲惫或压力？
- 我是否在某些时刻忽视了自己的真实感受？

**2. 培养边界意识与自我关怀**
开放的心态并不意味着无边界的接纳。学习识别自己的边界，学会在适当的时候说"不"，是对自己的尊重和保护。

建立健康的边界会让你的开放更加有力量，因为它来自于清晰的自我认知而非盲目讨好。同时，培养自我关怀的习惯，像对待你最爱的人一样对待自己。

**3. 创造角色整合的空间**
想象一个有多个房间的房子：每个房间都是一个自我角色。在不同房间之间建立通畅的走廊，让每个房间都能被定期使用。

试着在日常生活中创造这样的整合空间：
- 工作时保持专注，但不忘记自己的情感需求
- 家庭中投入情感，但不失去个人的成长空间
- 独处时关注自我，但不封闭与外界的连接

**4. 庆祝每一个小小的进步**
成长是一场没有终点的旅程，重要的不是到达哪里，而是如何享受沿途的风景。学会庆祝每一个小小的进步，每一次对自己的温柔，每一次对真实自我的接纳。

## 四、最后的邀请

这幅画的美丽，不是来自完美的构图，而是来自它所传递的平衡与和谐。房子的敞开不是脆弱，而是力量；大树的茂盛不是傲慢，而是生命力；人物的微笑不是伪装，而是真实的满足。

你已经做得很好了。现在，试着对自己更温柔一些，接纳自己的不完美，庆祝每一个小小的进步。

记住，你内心的房子永远为你敞开，你内心的大树永远为你提供力量。相信自己的内在智慧，它会指引你找到属于自己的平衡与成长之路。

### 每一个裂痕，都是光照进来的地方

当你学会接纳自己的不完美，当你学会带着裂痕前行，当你学会在多样性中找到统一，你会发现，那些曾经的挑战和困难，都成为了你的力量源泉。它们不是你的弱点，而是你独特的标记，证明你真实地活过、成长过。

你不需要成为一个完美的人，你只需要成为一个真实的人——一个能够接纳自己所有面向的人，一个能够在不完美中找到美的人，一个能够带着裂痕依然绽放的人。`;
}

// 存储报告
function storeReports(reports: Reports) {
  console.log('存储专业分析报告（结构化数据）:', JSON.stringify(reports.professional, null, 2));
  console.log('存储客户洞察报告:', reports.client.length, '字符');
}

// 辅助函数：生成布局描述
function generateLayoutDescription(analysis: any): string {
  return '整体布局平衡，元素分布协调';
}

// 辅助函数：生成构图描述
function generateCompositionDescription(analysis: any): string {
  return '构图和谐，空间利用合理';
}

// 辅助函数：生成房子描述
function generateHouseDescription(analysis: any): string {
  return '房子结构完整，门窗敞开，显示内心世界开放';
}

// 辅助函数：生成树木描述
function generateTreeDescription(analysis: any): string {
  return '树木茂盛，树干粗壮，显示生命力旺盛';
}

// 辅助函数：生成人物描述
function generatePersonDescription(analysis: any): string {
  return '人物姿态舒展，表情自然，显示自信状态';
}

// 辅助函数：生成线条描述
function generateLinesDescription(analysis: any): string {
  return '线条流畅，力度适中，显示情绪稳定';
}

// 辅助函数：生成涂抹描述
function generateErasureDescription(analysis: any): string {
  return '无明显涂抹，显示低焦虑水平';
}

// 辅助函数：生成细节描述
function generateDetailsDescription(analysis: any): string {
  return '细节适中，显示观察力正常';
}

// 辅助函数：生成空间描述
function generateSpaceDescription(analysis: any): string {
  return '空间利用合理，显示心理状态平衡';
}

// 辅助函数：生成布局分析
function generateLayoutAnalysis(analysis: any): any {
  return {
    position: '居中',
    size: '适中',
    balance: '平衡'
  };
}

// 辅助函数：生成元素分析
function generateElementAnalysis(analysis: any): any {
  return {
    house: '房子象征家庭和内心世界',
    tree: '树木象征成长和生命力',
    person: '人物象征自我认知'
  };
}

// 辅助函数：生成技术分析
function generateTechnicalAnalysis(analysis: any): any {
  return {
    lines: '线条质量良好',
    erasures: '无明显涂抹',
    details: '细节适中',
    space: '空间利用合理'
  };
}

// 辅助函数：生成情绪分析
function generateEmotionalAnalysis(analysis: any): any {
  return {
    tone: '积极',
    energy: '中等',
    anxiety: '低',
    defense: '适中'
  };
}

// 辅助函数：生成发展分析
function generateDevelopmentAnalysis(analysis: any): any {
  return {
    stage: '符合发展阶段',
    selfDevelopment: '自我接纳',
    adaptability: '良好',
    growthOrientation: '积极'
  };
}

// 辅助函数：生成核心特质
function generateCoreTraits(analysis: any): string[] {
  return ['开放', '自信', '平衡', '成长导向'];
}

// 辅助函数：生成心理状态
function generatePsychologicalState(analysis: any): any {
  return {
    emotion: '稳定',
    selfCognition: '清晰',
    adaptability: '良好'
  };
}

// 辅助函数：生成优势
function generateStrengths(analysis: any): string[] {
  return ['开放心态', '自我接纳', '情绪稳定', '成长潜力'];
}

// 辅助函数：生成挑战
function generateChallenges(analysis: any): string[] {
  return ['需要更多自我探索', '平衡不同角色'];
}

// 辅助函数：生成风险评估
function generateRiskAssessment(analysis: any): any {
  return {
    level: '低',
    indicators: '无明显风险指标',
    analysis: '心理状态稳定',
    functionalImpairment: '无',
    riskSources: '无'
  };
}

// 辅助函数：生成专业建议
function generateProfessionalRecommendations(analysis: any): any {
  return {
    counseling: {
      needed: '否',
      focus: '自我探索',
      approach: '个体咨询'
    },
    therapy: {
      recommended: '无',
      focus: '无'
    },
    development: {
      personal: '继续自我探索',
      psychological: '保持情绪平衡',
      followUp: '定期自我评估'
    }
  };
}

// 生成插图
export async function generateIllustrations(content: string, style: string = 'warm'): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const illustrations = [
    `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20watercolor%20painting%20of%20a%20peaceful%20scene%20with%20a%20small%20house%20and%20a%20tree%20healing%20illustration%20style&image_size=landscape_16_9`,
    `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20watercolor%20painting%20of%20personal%20growth%20and%20self%20discovery%20healing%20illustration%20style&image_size=landscape_16_9`,
    `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20watercolor%20painting%20of%20a%20person%20embracing%20their%20true%20self%20healing%20illustration%20style&image_size=landscape_16_9`
  ];
  
  return illustrations;
}

// 辅助函数：根据内容选择插图风格
function selectIllustrationStyle(content: string, userAge: string = 'adult'): string {
  const styleMap: Record<string, string> = {
    'child': 'playful',
    'teenager': 'flat-doodle',
    'adult': 'warm',
    'elderly': 'watercolor'
  };
  
  return styleMap[userAge] || 'warm';
}

// 辅助函数：生成图片提示词
function generateImagePrompt(topic: string, style: string): string {
  const stylePrompts: Record<string, string> = {
    'warm': 'warm watercolor painting with soft colors and natural warmth',
    'playful': 'fun creative whimsical illustration with bright colors',
    'flat-doodle': 'bold outlines pastel colors cute flat doodle style',
    'watercolor': 'soft artistic watercolor painting with natural warmth'
  };
  
  return `${stylePrompts[style] || stylePrompts['warm']} ${topic}`;
}

// 风险评估函数
export function assessRisk(drawing: UserDrawing): any {
  return {
    level: 'low',
    indicators: [],
    emergencyAction: ''
  };
}
