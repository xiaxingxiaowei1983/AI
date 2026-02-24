// HTP技能调用服务
import type { AnalysisResult, UserDrawing } from '@/types';
import { completeHTPWorkflow, analyzeDrawingLocal } from './htpAnalysisService';



// 智能体技能调用（使用后端HTP分析服务）
export async function analyzeDrawing(drawing: UserDrawing): Promise<AnalysisResult> {
  const startTime = Date.now();
  
  console.log('开始AI分析流程...');
  console.log('用户画作数据:', {
    method: drawing.method,
    hasImageData: !!drawing.imageData,
    imageDataLength: drawing.imageData ? drawing.imageData.length : 0
  });
  
  let result: AnalysisResult;
  
  // 调用后端HTP分析服务
  console.log('开始调用后端HTP分析服务...');
  try {
    // 使用真实用户数据：生产环境应从UI层传递
    const userInfo = {
      age: drawing.age,
      gender: drawing.gender
    };
    console.log('📌 使用真实用户数据（生产阶段）:', userInfo);
    
    // 调用completeHTPWorkflow函数
    const workflowResult = await completeHTPWorkflow(drawing.imageData || '', userInfo);
    console.log('completeHTPWorkflow函数调用完成，结果:', workflowResult);
    
    // 构建AnalysisResult对象
    result = {
      clientInsightReport: workflowResult.clientInsightReport,
      risk_level: workflowResult.risk_level || 'low',
      riskAssessment: workflowResult.riskAssessment
    };
    
    console.log(`AI分析完成，耗时: ${Date.now() - startTime}ms`);
  } catch (error) {
    console.error('后端HTP分析服务调用失败，使用本地分析作为备用方案:', error);
    // API调用失败时，使用本地分析作为备用方案
    console.log('开始使用本地分析作为备用方案...');
    result = analyzeDrawingLocal(drawing);
    console.log('本地分析完成');
  }
  
  console.log('AI分析流程完成，返回分析结果');
  return result;
}

// 生成插图
export async function generateIllustrations(_content: string, _style: string = 'warm'): Promise<string[]> {
  await new Promise(resolve => setTimeout(resolve, 5000));
  
  const illustrations = [
    `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20watercolor%20painting%20of%20a%20peaceful%20scene%20with%20a%20small%20house%20and%20a%20tree%20healing%20illustration%20style&image_size=landscape_16_9`,
    `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20watercolor%20painting%20of%20personal%20growth%20and%20self%20discovery%20healing%20illustration%20style&image_size=landscape_16_9`,
    `https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=warm%20watercolor%20painting%20of%20a%20person%20embracing%20their%20true%20self%20healing%20illustration%20style&image_size=landscape_16_9`
  ];
  
  return illustrations;
}

// 风险评估函数
export function assessRisk(_drawing: UserDrawing): any {
  return {
    level: 'low',
    indicators: [],
    emergencyAction: ''
  };
}
