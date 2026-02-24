import { useEffect, useState, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { loadingMessages } from '@/types';
import { Brain } from 'lucide-react';

// 装饰性花朵
const FlowerDecoration = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none opacity-30 ${className}`}
    fill="none"
  >
    <path
      d="M50 15C50 15 62 32 62 50C62 68 50 85 50 85C50 85 38 68 38 50C38 32 50 15 50 15Z"
      fill="url(#loadingPetal1)"
    />
    <path
      d="M15 50C15 50 32 38 50 38C68 38 85 50 85 50C85 50 68 62 50 62C32 62 15 50 15 50Z"
      fill="url(#loadingPetal2)"
    />
    <circle cx="50" cy="50" r="10" fill="url(#loadingCenter)" />
    <defs>
      <linearGradient id="loadingPetal1" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(340 70% 88%)" />
        <stop offset="1" stopColor="hsl(340 50% 78%)" />
      </linearGradient>
      <linearGradient id="loadingPetal2" x1="15" y1="50" x2="85" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(280 60% 90%)" />
        <stop offset="1" stopColor="hsl(280 40% 80%)" />
      </linearGradient>
      <radialGradient id="loadingCenter" cx="50" cy="50" r="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(45 90% 82%)" />
        <stop offset="1" stopColor="hsl(45 70% 72%)" />
      </radialGradient>
    </defs>
  </svg>
);

export default function LoadingPage() {
  const { goToResult, goToRiskResult, setAnalysisResult, userDrawing, analyzeUserDrawing } = useApp();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isWaitingLong, setIsWaitingLong] = useState(false);
  const progressRef = useRef(0);

  useEffect(() => {
    setIsVisible(true);
    
    // 轮播文案
    const messageInterval = setInterval(() => {
      setCurrentMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2000);
    
    // 60秒后显示排队提示
    const waitingTimer = setTimeout(() => {
      setIsWaitingLong(true);
    }, 60000);

    // 进度条动画 - 更加平滑和真实
        const progressInterval = setInterval(() => {
          // 前期进度较慢，后期逐渐加快
          const progressSpeed = progressRef.current < 70 ? Math.random() * 2 : Math.random() * 5;
          progressRef.current += progressSpeed;
          
          if (progressRef.current >= 100) {
            progressRef.current = 100;
            clearInterval(progressInterval);
            
            // 调用真实的分析函数（只调用一次）
            if (userDrawing && !isAnalyzing) {
              console.log('开始分析用户画作...');
              setIsAnalyzing(true);
              analyzeUserDrawing(userDrawing).then(() => {
                console.log('分析完成');
                setIsAnalyzing(false);
              }).catch((error) => {
                console.error('分析失败:', error);
                setIsAnalyzing(false);
                // 即使失败也跳转到结果页面
                goToResult();
              });
            } else if (!userDrawing) {
              console.error('没有用户画作数据，跳转到首页');
              // 没有画作数据时跳转到首页
              window.location.href = '/';
            }
          }
          setProgress(progressRef.current);
        }, 200);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
      clearTimeout(waitingTimer);
    };
  }, [goToResult, goToRiskResult, setAnalysisResult, userDrawing, analyzeUserDrawing, isAnalyzing]);

  return (
    <div className="min-h-screen watercolor-bg relative overflow-hidden flex flex-col items-center justify-center">
      {/* 背景装饰 */}
      <FlowerDecoration className="w-32 h-32 -top-8 -left-8 rotate-12" />
      <FlowerDecoration className="w-24 h-24 top-1/4 right-4 -rotate-12" />
      <FlowerDecoration className="w-20 h-20 bottom-1/4 -left-4 rotate-45" />
      <FlowerDecoration className="w-36 h-36 -bottom-8 right-8 -rotate-12" />
      
      {/* 主内容 */}
      <div 
        className={`relative z-10 flex flex-col items-center px-6 transition-all duration-800 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
      >
        {/* 水晶球/大脑图标 */}
        <div className="relative mb-8">
          <div className="crystal-ball w-32 h-32 sm:w-40 sm:h-40 flex items-center justify-center pulse-glow">
            <Brain className="w-14 h-14 sm:w-18 sm:h-18 text-warm-purple/70" strokeWidth={1} />
          </div>
          
          {/* 环绕的装饰圆环 */}
          <div className="absolute inset-0 w-32 h-32 sm:w-40 sm:h-40 animate-spin-slow">
            <svg viewBox="0 0 100 100" className="w-full h-full opacity-30">
              <circle 
                cx="50" 
                cy="50" 
                r="45" 
                fill="none" 
                stroke="url(#ringGradient)" 
                strokeWidth="0.5"
                strokeDasharray="8 4"
              />
              <defs>
                <linearGradient id="ringGradient" x1="0" y1="0" x2="100" y2="100">
                  <stop stopColor="hsl(340 70% 75%)" />
                  <stop offset="1" stopColor="hsl(280 50% 75%)" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
        
        {/* 加载文案 */}
        <div className="text-center mb-8 h-20">
          <p 
            key={currentMessageIndex}
            className="font-serif text-lg sm:text-xl text-foreground animate-fade-in"
          >
            {loadingMessages[currentMessageIndex]}
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            AI正在深度分析你的画作
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            这可能需要一些时间，请耐心等待...
          </p>
        </div>
        
        {/* 进度条 */}
        <div className="w-64 sm:w-80">
          <div className="progress-bar">
            <div 
              className="progress-bar-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground">
            <span>分析中</span>
            <span>{Math.round(progress)}%</span>
          </div>
        </div>
        
        {/* 装饰丝带 */}
        <div className={`mt-10 ribbon ${isWaitingLong ? 'text-rose-500 font-medium' : ''}`}>
          {isWaitingLong ? '⚠️ 正在排队请等待，不要刷新页面' : '请稍候，美好的事物值得等待'}
        </div>
      </div>
      
      {/* 底部装饰 */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-warm-rose/50 animate-bounce-soft" />
        <div className="w-2 h-2 rounded-full bg-warm-purple/50 animate-bounce-soft delay-150" />
        <div className="w-2 h-2 rounded-full bg-warm-gold/50 animate-bounce-soft delay-300" />
      </div>
    </div>
  );
}
