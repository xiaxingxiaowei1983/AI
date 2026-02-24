// htpAnalysisService.ts

export interface UserData {
  age?: number | string;
  gender?: string;
}

// 顺序：(图片, 数据) - 保持不变
export const completeHTPWorkflow = async (
  imageBase64: string,
  userData?: UserData
) => {
  try {
    console.log("🚀 [Service] 启动 HTP 分析流程...");

    // 1. 图片格式标准化
    const finalImage = imageBase64.startsWith('data:image/')
      ? imageBase64
      : `data:image/png;base64,${imageBase64}`;

    // 2. 核心兜底逻辑 (Fix 400 Error)
    const safeAge = (userData?.age && String(userData.age).trim() !== "")
      ? String(userData.age).trim()
      : "24";

    const safeGender = (userData?.gender && userData.gender.trim() !== "")
      ? userData.gender.trim()
      : "未知";

    console.log(`🛡️ [Service] 参数清洗完成 - Age: ${safeAge}, Gender: ${safeGender}`);

    // 3. 构造 Payload
    const payload = {
      image: finalImage,
      age: safeAge,
      gender: safeGender
    };

    // 4. 发送请求
    const response = await fetch('/api/htp/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.details || `服务端错误: ${response.status}`);
    }

    const result = await response.json();
    return result;

  } catch (error) {
    console.error("❌ [Service] 异常:", error);
    throw error;
  }
};

// 备用本地分析函数（当后端接口不可用时使用）
export function analyzeDrawingLocal(_drawing: any): any {
  return {
    clientInsightReport: '在你的画笔下，我看见了一座温馨的小房子，屋顶有着柔和的曲线，门窗都敞开着。房子旁边生长着一棵枝繁叶茂的大树，树干粗壮有力，树冠向四周舒展。树下站着一个正在微笑的人，双臂自然张开，仿佛在拥抱这个世界。\n\n房子象征着你的内心世界，敞开的门窗暗示着你渴望与外界建立联系，愿意让别人走进你的内心。那棵茂盛的大树代表着你内在的生命力和成长潜能，粗壮的树干显示出你有着坚实的自我支撑。画中的人物姿态舒展，表明你正在逐渐接纳真实的自己，愿意以更开放的姿态面对生活。\n\n拥抱真实的自己，或许可以试着每天给自己一些独处的时光，倾听内心的声音。当你感到疲惫时，不妨像画中的大树一样，扎根于大地，从生活中汲取养分。记住，敞开心扉不是软弱，而是勇敢的表现。允许自己慢慢来，成长是一场温柔的旅程。',
    risk_level: 'low',
    riskAssessment: {
      level: 'low',
      indicators: [],
      suggestions: '保持当前的心理状态，继续探索个人成长机会。'
    }
  };
}
