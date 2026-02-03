// 应用状态类型
export type AppState = 
  | 'landing'            // 首页
  | 'onboarding'         // 引导选择页
  | 'canvas'             // 在线画板
  | 'upload'             // 上传图片
  | 'loading'            // 等待分析
  | 'result'             // 正常结果页
  | 'risk-result'        // 高风险结果页
  | 'professional-report'; // 专业报告页

// 绘图工具类型
export type DrawingTool = 'pen' | 'eraser';

// 分析结果类型
export interface AnalysisResult {
  section_see: string;
  section_understand: string;
  section_grow: string;
  illustrations: string[];
  risk_level: 'low' | 'medium' | 'high';
  imageAnalysis?: any; // 图像分析结果（用于生成专业报告）
}

// 用户画作数据
export interface UserDrawing {
  imageData: string | null;
  method: 'upload' | 'draw';
  timestamp: number;
}

// 加载状态文案
export const loadingMessages = [
  '正在轻抚你画中的线条...',
  '正在丈量房子与树的距离...',
  '正在感受画笔留下的情绪...',
  '正在翻阅《心理象征词典》...',
  '正在为你绘制专属的心灵插画...',
];

// 模拟分析结果（用于演示）
export const mockAnalysisResult: AnalysisResult = {
  section_see: '在你的画笔下，我看见了一座温馨的小房子，屋顶有着柔和的曲线，门窗都敞开着。房子旁边生长着一棵枝繁叶茂的大树，树干粗壮有力，树冠向四周舒展。树下站着一个正在微笑的人，双臂自然张开，仿佛在拥抱这个世界。',
  section_understand: '房子象征着你的内心世界，敞开的门窗暗示着你渴望与外界建立联系，愿意让别人走进你的内心。那棵茂盛的大树代表着你内在的生命力和成长潜能，粗壮的树干显示出你有着坚实的自我支撑。画中的人物姿态舒展，表明你正在逐渐接纳真实的自己，愿意以更开放的姿态面对生活。',
  section_grow: '拥抱真实的自己，或许可以试着每天给自己一些独处的时光，倾听内心的声音。当你感到疲惫时，不妨像画中的大树一样，扎根于大地，从生活中汲取养分。记住，敞开心扉不是软弱，而是勇敢的表现。允许自己慢慢来，成长是一场温柔的旅程。',
  illustrations: [
    '/illustrations/illust-1.jpg',
    '/illustrations/illust-2.jpg',
    '/illustrations/illust-3.jpg',
  ],
  risk_level: 'low',
};

// 高风险分析结果
export const mockRiskResult: AnalysisResult = {
  section_see: '在你的画作中，我注意到一些需要关注的元素。画面的整体色调偏暗，线条较为凌乱，房子显得孤立无援，树的枝叶稀疏，人物的姿态呈现出一种蜷缩的状态。',
  section_understand: '这些画面特征可能反映出你当前正经历着一段情绪艰难的时期。孤立的房子暗示着你可能感到孤独或缺乏支持，稀疏的树枝显示出内在能量的低落，而蜷缩的人物姿态则表明你可能在保护自己，或是感到某种程度的无助。',
  section_grow: '请相信，感到困难并不意味着你软弱。此刻，最重要的是寻求专业的支持。心理咨询师能够提供更为专业和深入的陪伴，帮助你度过这段时期。你不必独自面对这一切。',
  illustrations: [],
  risk_level: 'high',
};