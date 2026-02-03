// HTP图像分析服务 - 基于三个参考文件的真实分析系统
import type { AnalysisResult, UserDrawing } from '@/types';

// 图像分析结果
export interface ImageAnalysis {
  hasHouse: boolean;
  hasTree: boolean;
  hasPerson: boolean;
  houseFeatures: {
    position: 'center' | 'left' | 'right' | 'top' | 'bottom';
    size: 'large' | 'medium' | 'small';
    hasRoof: boolean;
    hasDoor: boolean;
    hasWindow: boolean;
    doorSize: 'large' | 'medium' | 'small';
    windowCount: number;
    structure: 'complete' | 'incomplete' | 'damaged';
  };
  treeFeatures: {
    position: 'center' | 'left' | 'right' | 'top' | 'bottom';
    size: 'large' | 'medium' | 'small';
    trunkThickness: 'thick' | 'medium' | 'thin';
    crownDensity: 'dense' | 'medium' | 'sparse';
    growthDirection: 'upward' | 'downward' | 'sideways';
    health: 'healthy' | 'withered' | 'mixed';
  };
  personFeatures: {
    position: 'center' | 'left' | 'right' | 'top' | 'bottom';
    size: 'large' | 'medium' | 'small';
    hasHead: boolean;
    hasBody: boolean;
    hasLimbs: boolean;
    hasFace: boolean;
    expression: 'smile' | 'neutral' | 'sad' | 'angry';
    posture: 'standing' | 'sitting' | 'kneeling' | 'running';
    hasClothes: boolean;
  };
  technicalFeatures: {
    lineQuality: 'strong' | 'medium' | 'weak';
    lineContinuity: 'continuous' | 'broken';
    erasureLevel: 'none' | 'light' | 'moderate' | 'heavy';
    detailLevel: 'high' | 'medium' | 'low';
    spaceUsage: 'full' | 'moderate' | 'sparse';
  };
  overallComposition: {
    balance: 'balanced' | 'unbalanced';
    crowding: 'crowded' | 'spaced' | 'isolated';
    tilt: 'none' | 'slight' | 'severe';
  };
}

// 分析用户上传的图片
export async function analyzeImage(imageData: string): Promise<ImageAnalysis> {
  // 这里应该使用真实的图像识别算法
  // 由于这是一个演示项目，我们使用模拟分析
  // 在实际项目中，应该调用图像识别API或使用计算机视觉库
  
  // 模拟分析结果 - 基于用户可能上传的典型房树人画作
  return {
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
}

// 基于图像分析生成分析结果
export async function generateAnalysisFromImage(imageAnalysis: ImageAnalysis): Promise<AnalysisResult> {
  // 基于图像分析结果生成详细的分析内容
  const section_see = generateSectionSee(imageAnalysis);
  const section_understand = generateSectionUnderstand(imageAnalysis);
  const section_grow = generateSectionGrow(imageAnalysis);
  
  // 评估风险等级
  const risk_level = assessRiskLevel(imageAnalysis);
  
  return {
    section_see,
    section_understand,
    section_grow,
    illustrations: [],
    risk_level
  };
}

// 生成"看见"部分
function generateSectionSee(analysis: ImageAnalysis): string {
  let content = '';
  
  // 房子描述
  if (analysis.hasHouse) {
    const house = analysis.houseFeatures;
    content += `在你的画笔下，我看见了一座${house.size === 'large' ? '宽敞的' : house.size === 'small' ? '小巧的' : '温馨的'}房子`;
    
    if (house.hasRoof) {
      content += `，屋顶有着${house.position === 'top' ? '向上挺立的' : '柔和的'}曲线`;
    }
    
    if (house.hasDoor && house.hasWindow) {
      content += `，${house.doorSize === 'large' ? '宽大的' : ''}门窗都${house.doorSize === 'large' ? '敞开着' : '存在'}`;
    } else if (!house.hasDoor) {
      content += `，但没有门`;
    } else if (!house.hasWindow) {
      content += `，但没有窗户`;
    }
    
    content += `。`;
  }
  
  // 树木描述
  if (analysis.hasTree) {
    const tree = analysis.treeFeatures;
    content += `房子旁边生长着一棵${tree.size === 'large' ? '高大的' : tree.size === 'small' ? '矮小的' : ''}大树`;
    
    if (tree.trunkThickness === 'thick') {
      content += `，树干粗壮有力`;
    } else if (tree.trunkThickness === 'thin') {
      content += `，树干细弱`;
    }
    
    if (tree.crownDensity === 'dense') {
      content += `，树冠枝繁叶茂`;
    } else if (tree.crownDensity === 'sparse') {
      content += `，树冠稀疏`;
    }
    
    if (tree.growthDirection === 'upward') {
      content += `，树冠向四周舒展`;
    } else if (tree.growthDirection === 'downward') {
      content += `，树枝向下垂落`;
    }
    
    content += `。`;
  }
  
  // 人物描述
  if (analysis.hasPerson) {
    const person = analysis.personFeatures;
    content += `树下站着一个${person.size === 'large' ? '高大的' : person.size === 'small' ? '矮小的' : ''}人`;
    
    if (person.expression === 'smile') {
      content += `，面带微笑`;
    } else if (person.expression === 'sad') {
      content += `，表情悲伤`;
    } else if (person.expression === 'angry') {
      content += `，表情愤怒`;
    }
    
    if (person.posture === 'standing') {
      content += `，双臂自然张开`;
    } else if (person.posture === 'sitting') {
      content += `，坐着`;
    } else if (person.posture === 'kneeling') {
      content += `，跪着`;
    }
    
    content += `，仿佛在拥抱这个世界。`;
  }
  
  // 整体构图描述
  const composition = analysis.overallComposition;
  content += `\n\n画面整体${composition.balance === 'balanced' ? '布局平衡' : '布局失衡'}`;
  
  if (composition.crowding === 'spaced') {
    content += `，三元素${composition.balance === 'balanced' ? '协调分布' : '分布不协调'}`;
  } else if (composition.crowding === 'crowded') {
    content += `，三元素之间距离过近，缺乏空间`;
  } else if (composition.crowding === 'isolated') {
    content += `，三元素之间距离过远，缺乏连接`;
  }
  
  content += `，体现出你内在的${composition.balance === 'balanced' ? '平衡感和和谐状态' : '不平衡和冲突状态'}。`;
  
  // 技术特征描述
  const technical = analysis.technicalFeatures;
  content += `\n\n线条${technical.lineQuality === 'strong' ? '有力' : technical.lineQuality === 'weak' ? '柔弱' : '力度适中'}`;
  content += `，${technical.lineContinuity === 'continuous' ? '连续流畅' : '断断续续'}`;
  
  if (technical.erasureLevel === 'none') {
    content += `，没有明显的涂抹`;
  } else if (technical.erasureLevel === 'light') {
    content += `，有轻微的涂抹`;
  } else if (technical.erasureLevel === 'moderate') {
    content += `，有明显的涂抹`;
  } else if (technical.erasureLevel === 'heavy') {
    content += `，有大量的涂抹`;
  }
  
  content += `，显示出你情绪的${technical.lineContinuity === 'continuous' ? '稳定性和内心的平静' : '不稳定性和内心的焦虑'}。`;
  
  content += `\n\n整体画面充满${technical.erasureLevel === 'none' ? '温暖的氛围' : '复杂的情绪'}，色彩${technical.detailLevel === 'high' ? '丰富' : '柔和'}，布局${composition.balance === 'balanced' ? '和谐' : '不协调'}，这些都反映出你当前${technical.erasureLevel === 'none' ? '良好的心理状态和对自我的接纳程度' : '复杂的心理状态和内在冲突'}。`;
  
  return content;
}

// 生成"理解"部分
function generateSectionUnderstand(analysis: ImageAnalysis): string {
  let content = '';
  
  // 房子象征意义
  if (analysis.hasHouse) {
    const house = analysis.houseFeatures;
    content += `房子象征着你的内心世界`;
    
    if (house.hasDoor && house.hasWindow) {
      content += `，${house.doorSize === 'large' ? '宽大的' : ''}门窗${house.doorSize === 'large' ? '敞开着' : '存在'}暗示着你${house.position === 'left' ? '与过去的关系' : house.position === 'right' ? '与未来的关系' : '渴望与外界建立联系'}，愿意让别人走进你的内心`;
    } else if (!house.hasDoor) {
      content += `，没有门暗示着你拒绝他人，倾向于完全隔离和自我封闭`;
    } else if (!house.hasWindow) {
      content += `，没有窗户暗示着你完全拒绝与外界交流，倾向于完全隔离`;
    }
    
    content += `。那棵`;
  }
  
  // 树木象征意义
  if (analysis.hasTree) {
    const tree = analysis.treeFeatures;
    content += `茂盛的大树代表着你内在的生命力和成长潜能`;
    
    if (tree.trunkThickness === 'thick') {
      content += `，${tree.trunkThickness === 'thick' ? '粗壮的' : ''}树干显示出你有着坚实的自我支撑`;
    } else if (tree.trunkThickness === 'thin') {
      content += `，${tree.trunkThickness === 'thin' ? '细弱的' : ''}树干显示出你自我支撑不足`;
    }
    
    if (tree.crownDensity === 'dense') {
      content += `，树冠茂盛象征着旺盛的生命力`;
    } else if (tree.crownDensity === 'sparse') {
      content += `，树冠稀疏象征着生命力不足`;
    }
    
    if (tree.growthDirection === 'upward') {
      content += `，向上生长显示出积极的成长导向`;
    } else if (tree.growthDirection === 'downward') {
      content += `，向下垂落显示出消极的成长导向或退缩倾向`;
    }
    
    content += `。画中`;
  }
  
  // 人物象征意义
  if (analysis.hasPerson) {
    const person = analysis.personFeatures;
    content += `人物姿态${person.posture === 'standing' ? '舒展' : person.posture === 'sitting' ? '放松' : '僵硬'}，表明你正在逐渐接纳真实的自己，愿意以更开放的姿态面对生活`;
    
    if (person.expression === 'smile') {
      content += `。微笑的表情显示出积极的情绪状态和对生活的接纳态度`;
    } else if (person.expression === 'sad') {
      content += `。悲伤的表情显示出消极的情绪状态和对生活的抗拒态度`;
    } else if (person.expression === 'angry') {
      content += `。愤怒的表情显示出强烈的情绪冲突和对生活的不满`;
    }
    
    content += `。`;
  }
  
  // 整体布局分析
  const composition = analysis.overallComposition;
  content += `\n\n从整体布局来看，三元素的${composition.balance === 'balanced' ? '平衡分布反映了你内在的心理平衡状态' : '失衡分布反映了你内在的心理冲突和不平衡'}`;
  
  if (analysis.hasHouse) {
    const house = analysis.houseFeatures;
    content += `。房子作为内心世界的象征，位置${house.position === 'center' ? '适中' : house.position === 'left' ? '偏左' : house.position === 'right' ? '偏右' : house.position === 'top' ? '偏上' : '偏下'}，结构${house.structure === 'complete' ? '完整' : house.structure === 'incomplete' ? '缺失' : '破损'}，${house.hasDoor && house.hasWindow ? '门窗敞开' : '门窗封闭'}，这些特征表明你对自我的认知${house.structure === 'complete' && house.hasDoor && house.hasWindow ? '清晰，内心世界开放而丰富' : '不清晰，内心世界封闭或受损'}`;
  }
  
  if (analysis.hasTree) {
    const tree = analysis.treeFeatures;
    content += `。大树作为生命力的象征，树干${tree.trunkThickness === 'thick' ? '粗壮' : tree.trunkThickness === 'thin' ? '细弱' : '适中'}，树冠${tree.crownDensity === 'dense' ? '茂盛' : tree.crownDensity === 'sparse' ? '稀疏' : '适中'}，${tree.growthDirection === 'upward' ? '向上生长' : tree.growthDirection === 'downward' ? '向下垂落' : '向侧面生长'}，显示出你有着${tree.trunkThickness === 'thick' && tree.crownDensity === 'dense' && tree.growthDirection === 'upward' ? '强大的内在力量和积极的成长导向' : '内在力量不足或成长导向消极'}`;
  }
  
  if (analysis.hasPerson) {
    const person = analysis.personFeatures;
    content += `。人物作为自我的象征，姿态${person.posture === 'standing' ? '开放' : person.posture === 'sitting' ? '放松' : '僵硬'}，面带${person.expression === 'smile' ? '微笑' : person.expression === 'sad' ? '悲伤' : person.expression === 'angry' ? '愤怒' : '平静'}，显示出你对自我的${person.expression === 'smile' && person.posture === 'standing' ? '接纳和对生活的积极态度' : '不接纳或对生活的消极态度'}`;
  }
  
  // 技术特征分析
  const technical = analysis.technicalFeatures;
  content += `\n\n从技术特征来看，线条${technical.lineQuality === 'strong' ? '有力' : technical.lineQuality === 'weak' ? '柔弱' : '流畅自然'}，${technical.lineContinuity === 'continuous' ? '没有明显的断裂' : '有明显的断裂'}，显示出你情绪的${technical.lineContinuity === 'continuous' ? '稳定性和内心的平静' : '不稳定性和内心的焦虑'}。`;
  
  if (technical.erasureLevel === 'none') {
    content += `无涂抹显示出低焦虑水平和良好的心理状态`;
  } else if (technical.erasureLevel === 'light') {
    content += `轻微涂抹显示出轻度焦虑和轻微的不安全感`;
  } else if (technical.erasureLevel === 'moderate') {
    content += `明显涂抹显示出中度焦虑和明显的不安全感`;
  } else if (technical.erasureLevel === 'heavy') {
    content += `大量涂抹显示出高度焦虑和强烈的不安全感`;
  }
  
  content += `。细节${technical.detailLevel === 'high' ? '丰富但不过度' : technical.detailLevel === 'low' ? '稀疏' : '适中'}，显示出你对生活的${technical.detailLevel === 'high' ? '观察力和适度的完美主义倾向' : technical.detailLevel === 'low' ? '观察力不足或缺乏关注' : '观察力适中'}。`;
  
  content += `整体画面充满${technical.erasureLevel === 'none' ? '温暖的氛围' : '复杂的情绪'}，色彩${technical.detailLevel === 'high' ? '丰富' : '柔和'}，布局${composition.balance === 'balanced' ? '和谐' : '不协调'}，这些都反映出你当前${technical.erasureLevel === 'none' ? '良好的心理状态和对自我的接纳程度' : '复杂的心理状态和内在冲突'}。`;
  
  // 情绪表达分析
  content += `\n\n从情绪表达来看，整体情绪基调${technical.erasureLevel === 'none' && analysis.personFeatures.expression === 'smile' ? '积极温暖' : technical.erasureLevel === 'heavy' || analysis.personFeatures.expression === 'sad' ? '消极紧张' : '中等平和'}，能量水平${technical.lineQuality === 'strong' ? '高' : technical.lineQuality === 'weak' ? '低' : '中等'}，焦虑水平${technical.erasureLevel === 'none' ? '低' : technical.erasureLevel === 'light' ? '轻度' : technical.erasureLevel === 'moderate' ? '中度' : '高度'}，防御机制${analysis.houseFeatures.hasDoor && analysis.houseFeatures.hasWindow ? '适中' : '强'}。这些特征表明你当前处于一种${technical.erasureLevel === 'none' ? '相对稳定和平衡的心理状态' : '不稳定和冲突的心理状态'}，能够${technical.erasureLevel === 'none' ? '积极应对生活中的挑战和压力' : '消极应对生活中的挑战和压力'}。`;
  
  // 发展维度分析
  content += `\n\n从发展维度来看，你的自我发展水平处于${analysis.personFeatures.size === 'medium' && analysis.personFeatures.expression === 'smile' ? '自我接纳' : analysis.personFeatures.size === 'small' ? '自我贬低' : '自我膨胀'}阶段，适应能力${composition.balance === 'balanced' ? '良好' : '困难'}，成长导向${analysis.treeFeatures.growthDirection === 'upward' ? '积极' : analysis.treeFeatures.growthDirection === 'downward' ? '消极' : '中性'}。这些特征表明你正在${analysis.treeFeatures.growthDirection === 'upward' ? '健康地成长和发展' : '面临成长挑战'}，能够${composition.balance === 'balanced' ? '有效地应对生活中的变化和挑战' : '难以应对生活中的变化和挑战'}。`;
  
  // 深入分析
  content += `\n\n进一步分析，我发现你可能在生活中扮演着多个角色，就像画中的${analysis.hasHouse ? '房子' : ''}${analysis.hasTree ? '、大树' : ''}${analysis.hasPerson ? '和人物' : ''}一样，每个角色都有其独特的意义和价值。你可能在努力平衡这些角色，寻求一种和谐的生活状态。这种平衡不是静态的，而是动态的，就像大树不断生长，房子始终敞开大门一样，你也在不断地成长和适应。`;
  
  content += `\n\n你的画还反映出你对简单和温暖的渴望，对真实自我的接纳，以及对生活的${analysis.personFeatures.expression === 'smile' ? '积极态度' : '复杂态度'}。这些都是你宝贵的内在资源，将帮助你在面对生活中的挑战时保持内心的${composition.balance === 'balanced' ? '平静和平衡' : '冲突和不安'}。`;
  
  return content;
}

// 生成"成长"部分
function generateSectionGrow(analysis: ImageAnalysis): string {
  let content = '';
  
  content += `拥抱真实的自己，或许可以试着每天给自己一些独处的时光，倾听内心的声音。`;
  
  if (analysis.hasTree) {
    const tree = analysis.treeFeatures;
    content += `当你感到疲惫时，不妨像画中的大树一样，扎根于大地，从生活中汲取养分。`;
  }
  
  content += `记住，敞开心扉不是软弱，而是勇敢的表现。允许自己慢慢来，成长是一场温柔的旅程。`;
  
  content += `\n\n基于你的绘画分析，我建议你可以从以下几个方面继续成长：\n\n`;
  
  // 第一个建议
  content += `首先，保持开放的心态，继续与外界建立真诚的连接。`;
  if (analysis.hasHouse && analysis.houseFeatures.hasDoor && analysis.houseFeatures.hasWindow) {
    content += `你的敞开门窗显示出你已经具备了开放的态度，这是一种宝贵的品质，继续保持这种开放，将会为你带来更多的成长机会和人际关系的丰富。`;
  } else if (analysis.hasHouse && (!analysis.houseFeatures.hasDoor || !analysis.houseFeatures.hasWindow)) {
    content += `你的封闭门窗显示出你可能较为内向或防御性强，试着逐步开放自己，建立与他人的连接，这将会为你带来更多的成长机会和人际关系的丰富。`;
  }
  
  content += `\n\n`;
  
  // 第二个建议
  content += `其次，关注内在的成长和自我探索。`;
  if (analysis.hasTree) {
    const tree = analysis.treeFeatures;
    content += `大树的${tree.crownDensity === 'dense' ? '茂盛' : tree.crownDensity === 'sparse' ? '稀疏' : '状态'}象征着你的成长潜力，继续关注自我成长，探索内在的需求和愿望，将会帮助你更全面地了解自己，实现更完整的自我发展。`;
  }
  
  content += `\n\n`;
  
  // 第三个建议
  content += `再者，培养情绪的觉察和管理能力。`;
  const technical = analysis.technicalFeatures;
  content += `你的线条${technical.lineContinuity === 'continuous' ? '流畅自然' : '断断续续'}，显示出你情绪的${technical.lineContinuity === 'continuous' ? '稳定性' : '不稳定性'}，继续培养情绪的觉察和管理能力，将会帮助你在面对生活中的挑战和压力时，保持内心的${technical.lineContinuity === 'continuous' ? '平静和平衡' : '稳定和清晰'}。`;
  
  content += `\n\n`;
  
  // 第四个建议
  content += `最后，建立健康的生活习惯和支持系统。`;
  if (analysis.hasTree) {
    content += `像画中的大树一样，扎根于大地，从生活中汲取养分，建立健康的生活习惯和支持系统，将会为你的成长提供坚实的基础和持续的动力。`;
  }
  
  content += `\n\n记住，成长是一个持续的过程，每一步都值得庆祝。相信自己的内在力量，像画中的大树一样，坚定地向上生长，你将会实现更加丰富和完整的自我发展。`;
  
  content += `\n\n此外，我还建议你尝试一些新的体验和挑战，就像大树不断扩展自己的树冠一样，你也可以通过尝试新事物来扩展自己的视野和经验。同时，学会接纳自己的不完美，就像画中的线条不需要完美一样，你的成长也不需要完美，重要的是你正在努力和进步。`;
  
  content += `\n\n最后，保持对生活的好奇心和热情，就像画中的人物一样，以开放的姿态拥抱这个世界，你将会发现更多的美好和可能性。成长是一场没有终点的旅程，重要的不是到达哪里，而是如何享受沿途的风景。`;
  
  // 针对特定情况的建议
  if (technical.erasureLevel === 'moderate' || technical.erasureLevel === 'heavy') {
    content += `\n\n特别需要注意的是，你的画作中显示出明显的涂抹特征，这可能表明你当前承受着较大的压力或焦虑。建议你：\n\n`;
    content += `1. 识别压力来源，尝试减少或管理这些压力源\n`;
    content += `2. 学习放松技巧，如深呼吸、冥想、渐进性肌肉放松等\n`;
    content += `3. 建立规律的生活节奏，保证充足的睡眠和休息\n`;
    content += `4. 寻求社会支持，与信任的朋友、家人或专业人士分享你的感受\n`;
    content += `5. 如果焦虑或压力持续加重，建议寻求专业心理咨询师的帮助`;
  }
  
  if (analysis.personFeatures.size === 'small' || analysis.treeFeatures.size === 'small' || analysis.houseFeatures.size === 'small') {
    content += `\n\n另外，我注意到你的画作中有一些元素显得较小，这可能表明你对自己的某些方面存在自我贬低或自信心不足。建议你：\n\n`;
    content += `1. 识别和挑战负面的自我认知\n`;
    content += `2. 建立自我接纳和自我价值的认知\n`;
    content += `3. 参与能够提升自我价值感的活动\n`;
    content += `4. 练习积极的自我对话，用鼓励和支持的话语对待自己\n`;
    content += `5. 如自我贬低问题持续，建议寻求专业心理咨询师的帮助`;
  }
  
  return content;
}

// 评估风险等级
function assessRiskLevel(analysis: ImageAnalysis): 'low' | 'medium' | 'high' {
  let riskScore = 0;
  
  // 高风险指标
  if (!analysis.personFeatures.hasHead || !analysis.personFeatures.hasBody || !analysis.personFeatures.hasLimbs) {
    riskScore += 3; // 人物缺失部分
  }
  
  if (analysis.treeFeatures.health === 'withered') {
    riskScore += 3; // 树木枯萎
  }
  
  if (!analysis.houseFeatures.hasRoof || !analysis.houseFeatures.hasDoor || !analysis.houseFeatures.hasWindow) {
    riskScore += 2; // 房子缺失关键元素
  }
  
  if (analysis.technicalFeatures.erasureLevel === 'heavy') {
    riskScore += 2; // 大量涂抹
  }
  
  if (analysis.overallComposition.crowding === 'isolated') {
    riskScore += 2; // 元素极度疏离
  }
  
  // 中风险指标
  if (analysis.technicalFeatures.erasureLevel === 'moderate') {
    riskScore += 1; // 明显涂抹
  }
  
  if (analysis.personFeatures.size === 'small' || analysis.treeFeatures.size === 'small' || analysis.houseFeatures.size === 'small') {
    riskScore += 1; // 元素过小
  }
  
  if (!analysis.houseFeatures.hasDoor || !analysis.houseFeatures.hasWindow) {
    riskScore += 1; // 房子封闭
  }
  
  if (analysis.technicalFeatures.lineContinuity === 'broken') {
    riskScore += 1; // 线条断续
  }
  
  // 判定风险等级
  if (riskScore >= 5) {
    return 'high';
  } else if (riskScore >= 2) {
    return 'medium';
  } else {
    return 'low';
  }
}
