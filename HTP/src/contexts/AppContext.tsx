import React, { createContext, useContext, useState, useCallback } from 'react';
import type { AppState, UserDrawing, AnalysisResult } from '@/types';
import { analyzeDrawing, type Reports, generateReports } from '@/services/skillService';
import { analyzeImage, type ImageAnalysis } from '@/services/imageAnalysisService';

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
  
  // 专业报告数据
  professionalReport: Reports | null;
  setProfessionalReport: (report: Reports | null) => void;
  
  // 导航函数
  goToLanding: () => void;
  goToOnboarding: () => void;
  goToCanvas: () => void;
  goToUpload: () => void;
  goToLoading: () => void;
  goToResult: () => void;
  goToRiskResult: () => void;
  goToProfessionalReport: () => void;
  
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
  const [professionalReport, setProfessionalReport] = useState<Reports | null>(null);

  const goToLanding = useCallback(() => setCurrentState('landing'), []);
  const goToOnboarding = useCallback(() => setCurrentState('onboarding'), []);
  const goToCanvas = useCallback(() => setCurrentState('canvas'), []);
  const goToUpload = useCallback(() => setCurrentState('upload'), []);
  const goToLoading = useCallback(() => setCurrentState('loading'), []);
  const goToResult = useCallback(() => setCurrentState('result'), []);
  const goToRiskResult = useCallback(() => setCurrentState('risk-result'), []);
  const goToProfessionalReport = useCallback(() => setCurrentState('professional-report'), []);

  // 分析画作
  const analyzeUserDrawing = useCallback(async (drawing: UserDrawing) => {
    try {
      // 设置为loading状态
      setCurrentState('loading');
      
      // 生成分析结果（包含 imageAnalysis）
      const result = await analyzeDrawing(drawing);
      setAnalysisResult(result);
      
      // 先根据风险等级跳转到结果页面（不等待专业报告生成）
      if (result.risk_level === 'high') {
        setCurrentState('risk-result');
      } else {
        setCurrentState('result');
      }
      
      // 后台异步生成专业报告
      if (result.imageAnalysis) {
        // 延迟一点时间再生成，让用户先看到结果页面
        setTimeout(() => {
          const reports = generateReports(result.imageAnalysis);
          setProfessionalReport(reports);
        }, 1000);
      }
    } catch (error) {
      console.error('分析失败:', error);
      // 分析失败时显示默认结果
      setCurrentState('result');
    }
  }, []);

  const reset = useCallback(() => {
    setCurrentState('landing');
    setUserDrawing(null);
    setAnalysisResult(null);
    setProfessionalReport(null);
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
        professionalReport,
        setProfessionalReport,
        goToLanding,
        goToOnboarding,
        goToCanvas,
        goToUpload,
        goToLoading,
        goToResult,
        goToRiskResult,
        goToProfessionalReport,
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