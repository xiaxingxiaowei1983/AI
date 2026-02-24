import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AppState, UserDrawing, AnalysisResult } from '@/types';
import { analyzeDrawing } from '@/services/skillService';


interface AppContextType {
  // 当前页面状态
  currentState: AppState;
  setCurrentState: (state: AppState) => void;
  
  // 用户画作
  userDrawing: UserDrawing | null;
  setUserDrawing: (drawing: UserDrawing | null) => void;
  
  // 分析结果
  analysisResult: AnalysisResult | null;
  setAnalysisResult: (result: AnalysisResult | null) => void;
  
  // 导航函数
  goToLanding: () => void;
  goToOnboarding: () => void;
  goToCanvas: () => void;
  goToUpload: () => void;
  goToLoading: () => void;
  goToResult: () => void;
  goToRiskResult: () => void;
  
  // 分析函数
  analyzeUserDrawing: (drawing: UserDrawing) => Promise<void>;
  
  // 重置
  reset: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [currentState, setCurrentState] = useState<AppState>('landing');
  const [userDrawing, setUserDrawing] = useState<UserDrawing | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const goToLanding = useCallback(() => setCurrentState('landing'), []);
  const goToOnboarding = useCallback(() => setCurrentState('onboarding'), []);
  const goToCanvas = useCallback(() => setCurrentState('canvas'), []);
  const goToUpload = useCallback(() => setCurrentState('upload'), []);
  const goToLoading = useCallback(() => setCurrentState('loading'), []);
  const goToResult = useCallback(() => setCurrentState('result'), []);
  const goToRiskResult = useCallback(() => setCurrentState('risk-result'), []);

  // 分析画作
  const analyzeUserDrawing = useCallback(async (drawing: UserDrawing) => {
    try {
      // 设置为loading状态
      setCurrentState('loading');
      
      // 清空之前的分析结果，确保不会显示旧数据
      setAnalysisResult(null);
      
      // 生成分析结果
      console.log('开始调用 analyzeDrawing 函数...');
      const result = await analyzeDrawing(drawing);
      console.log('analyzeDrawing 函数调用完成，结果:', result);
      
      // 更新分析结果
      setAnalysisResult(result);
      console.log('分析结果已更新');
      
      // 根据风险等级跳转到结果页面
      if (result.risk_level === 'high') {
        console.log('风险等级为 high，跳转到 risk-result 页面');
        setCurrentState('risk-result');
      } else {
        console.log('风险等级为', result.risk_level, '跳转到 result 页面');
        setCurrentState('result');
      }
    } catch (error) {
      console.error('分析失败:', error);
      console.error('错误详情:', error instanceof Error ? error.stack : error);
      // 分析失败时显示错误信息，而不是旧数据
      setAnalysisResult({
        clientInsightReport: '分析失败，请检查网络连接或稍后重试',
        risk_level: 'low',
        riskAssessment: {
          level: 'low',
          indicators: [],
          suggestions: '请确保网络连接正常，或联系管理员'
        }
      });
      // 跳转到结果页面显示错误信息
      setCurrentState('result');
    }
  }, []);

  const reset = useCallback(() => {
    setCurrentState('landing');
    setUserDrawing(null);
    setAnalysisResult(null);
  }, []);

  return (
    <AppContext.Provider
      value={{
        currentState,
        setCurrentState,
        userDrawing,
        setUserDrawing,
        analysisResult,
        setAnalysisResult,
        goToLanding,
        goToOnboarding,
        goToCanvas,
        goToUpload,
        goToLoading,
        goToResult,
        goToRiskResult,
        analyzeUserDrawing,
        reset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}