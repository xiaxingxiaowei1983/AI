import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Home, TreePine, User, Sparkles } from 'lucide-react';

// 装饰性花朵组件
const FlowerDecoration = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none opacity-40 ${className}`}
    fill="none"
  >
    <path
      d="M50 20C50 20 60 35 60 50C60 65 50 80 50 80C50 80 40 65 40 50C40 35 50 20 50 20Z"
      fill="url(#petal1)"
    />
    <path
      d="M20 50C20 50 35 40 50 40C65 40 80 50 80 50C80 50 65 60 50 60C35 60 20 50 20 50Z"
      fill="url(#petal2)"
    />
    <circle cx="50" cy="50" r="8" fill="url(#center)" />
    <defs>
      <linearGradient id="petal1" x1="50" y1="20" x2="50" y2="80" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(340 70% 85%)" />
        <stop offset="1" stopColor="hsl(340 50% 75%)" />
      </linearGradient>
      <linearGradient id="petal2" x1="20" y1="50" x2="80" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(280 60% 88%)" />
        <stop offset="1" stopColor="hsl(280 40% 78%)" />
      </linearGradient>
      <radialGradient id="center" cx="50" cy="50" r="8" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(45 90% 80%)" />
        <stop offset="1" stopColor="hsl(45 70% 70%)" />
      </radialGradient>
    </defs>
  </svg>
);

// 云朵装饰
const CloudDecoration = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 60"
    className={`absolute pointer-events-none opacity-30 ${className}`}
    fill="none"
  >
    <ellipse cx="30" cy="35" rx="25" ry="18" fill="hsl(0 0% 100% / 0.8)" />
    <ellipse cx="60" cy="30" rx="30" ry="22" fill="hsl(0 0% 100% / 0.8)" />
    <ellipse cx="90" cy="35" rx="25" ry="18" fill="hsl(0 0% 100% / 0.8)" />
  </svg>
);

export default function LandingPage() {
  const { goToOnboarding } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen watercolor-bg relative overflow-hidden">
      {/* 背景装饰 */}
      <FlowerDecoration className="w-24 h-24 -top-4 -left-4 rotate-12" />
      <FlowerDecoration className="w-20 h-20 top-20 right-4 -rotate-12" />
      <FlowerDecoration className="w-16 h-16 bottom-40 -left-2 rotate-45" />
      <FlowerDecoration className="w-28 h-28 -bottom-4 right-8 -rotate-12" />
      <CloudDecoration className="w-32 h-16 top-32 left-1/4" />
      <CloudDecoration className="w-40 h-20 bottom-1/3 right-1/4" />
      
      {/* 星星点缀 */}
      <div className="absolute top-1/4 left-1/3 w-1 h-1 rounded-full bg-warm-gold animate-pulse-soft" />
      <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 rounded-full bg-warm-rose animate-pulse-soft delay-300" />
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 rounded-full bg-warm-lavender animate-pulse-soft delay-500" />
      
      {/* 主内容区 */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        {/* 顶部间距 */}
        <div className="flex-1" />
        
        {/* 主标题区域 */}
        <div 
          className={`text-center transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* 装饰性小图标 */}
          <div className="flex justify-center gap-3 mb-6">
            <Sparkles className="w-5 h-5 text-warm-gold animate-float" />
          </div>
          
          {/* 主标题 */}
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-gradient leading-tight mb-4">
            你的画，照见你的灵魂
          </h1>
          
          {/* 副标题 */}
          <p className="text-sm sm:text-base text-muted-foreground max-w-md mx-auto leading-relaxed px-4">
            潜意识不懂撒谎，让 AI 陪你读懂内心深处的房、树、人
          </p>
        </div>
        
        {/* 房树人图标 */}
        <div 
          className={`flex items-center justify-center gap-6 sm:gap-10 my-10 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* 房子 */}
          <div className="gold-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center float">
            <Home className="w-7 h-7 sm:w-9 sm:h-9 text-warm-rose" strokeWidth={1.5} />
          </div>
          
          {/* 树 */}
          <div className="gold-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center float" style={{ animationDelay: '0.5s' }}>
            <TreePine className="w-7 h-7 sm:w-9 sm:h-9 text-emerald-500" strokeWidth={1.5} />
          </div>
          
          {/* 人 */}
          <div className="gold-card w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center float" style={{ animationDelay: '1s' }}>
            <User className="w-7 h-7 sm:w-9 sm:h-9 text-warm-purple" strokeWidth={1.5} />
          </div>
        </div>
        
        {/* CTA 按钮 */}
        <div 
          className={`transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button 
            onClick={goToOnboarding}
            className="gradient-btn text-base sm:text-lg px-10 sm:px-14 py-4 sm:py-5 flex items-center gap-3"
          >
            <Sparkles className="w-5 h-5" />
            开始心灵探索
            <Sparkles className="w-5 h-5" />
          </button>
        </div>
        
        {/* 底部间距 */}
        <div className="flex-1" />
        
        {/* 底部统计 */}
        <div 
          className={`transition-all duration-1000 delay-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="ribbon">
            累计已有 <span className="font-semibold text-warm-rose">12,304</span> 人听见了自己的心声
          </div>
        </div>
        
        {/* 底部装饰 */}
        <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground/60">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-warm-pink/50" />
          <span>基于房树人(HTP)心理投射理论</span>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-warm-pink/50" />
        </div>
      </div>
    </div>
  );
}
