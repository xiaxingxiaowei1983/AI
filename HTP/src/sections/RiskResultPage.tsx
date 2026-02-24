import { useEffect, useState } from 'react';
import { useApp } from '@/contexts/AppContext';
import { AlertTriangle, Phone, MapPin, Heart, ChevronLeft, RotateCcw } from 'lucide-react';

// 装饰性元素
const FlowerDecoration = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none opacity-20 ${className}`}
    fill="none"
  >
    <path
      d="M50 15C50 15 62 32 62 50C62 68 50 85 50 85C50 85 38 68 38 50C38 32 50 15 50 15Z"
      fill="url(#riskPetal1)"
    />
    <path
      d="M15 50C15 50 32 38 50 38C68 38 85 50 85 50C85 50 68 62 50 62C32 62 15 50 15 50Z"
      fill="url(#riskPetal2)"
    />
    <circle cx="50" cy="50" r="10" fill="url(#riskCenter)" />
    <defs>
      <linearGradient id="riskPetal1" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(340 50% 85%)" />
        <stop offset="1" stopColor="hsl(340 30% 75%)" />
      </linearGradient>
      <linearGradient id="riskPetal2" x1="15" y1="50" x2="85" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(280 40% 88%)" />
        <stop offset="1" stopColor="hsl(280 25% 78%)" />
      </linearGradient>
      <radialGradient id="riskCenter" cx="50" cy="50" r="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(45 70% 80%)" />
        <stop offset="1" stopColor="hsl(45 50% 70%)" />
      </radialGradient>
    </defs>
  </svg>
);

export default function RiskResultPage() {
  const { goToLanding, reset, analysisResult } = useApp();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleRestart = () => {
    reset();
    goToLanding();
  };

  const handleCallHotline = () => {
    window.location.href = 'tel:400-161-9995';
  };

  // 使用分析结果或默认数据
  const result = analysisResult || {
    clientInsightReport: '在你的画作中，我注意到一些需要关注的元素。画面的整体色调偏暗，线条较为凌乱，房子显得孤立无援，树的枝叶稀疏，人物的姿态呈现出一种蜷缩的状态。\n\n这些画面特征可能反映出你当前正经历着一段情绪艰难的时期。孤立的房子暗示着你可能感到孤独或缺乏支持，稀疏的树枝显示出内在能量的低落，而蜷缩的人物姿态则表明你可能在保护自己，或是感到某种程度的无助。\n\n请相信，感到困难并不意味着你软弱。此刻，最重要的是寻求专业的支持。心理咨询师能够提供更为专业和深入的陪伴，帮助你度过这段时期。你不必独自面对这一切。',
    risk_level: 'high'
  };

  return (
    <div className="min-h-screen watercolor-bg relative overflow-hidden">
      {/* 背景装饰 */}
      <FlowerDecoration className="w-24 h-24 -top-4 -left-4 rotate-12" />
      <FlowerDecoration className="w-16 h-16 top-1/4 right-4 -rotate-12" />
      <FlowerDecoration className="w-20 h-20 bottom-1/3 -left-2 rotate-45" />
      <FlowerDecoration className="w-28 h-28 -bottom-4 right-8 -rotate-12" />
      
      {/* 顶部导航 */}
      <div className="relative z-20 flex items-center justify-between px-4 py-4">
        <button
          onClick={goToLanding}
          className="p-2 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        
        <h2 className="font-serif text-lg font-semibold text-gradient">
          分析报告
        </h2>
        
        <div className="w-9" />
      </div>

      {/* 主内容 */}
      <div className="relative z-10 px-5 pb-28">
        {/* 警示框 */}
        <div 
          className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="rounded-2xl overflow-hidden shadow-card">
            {/* 警示头部 */}
            <div className="bg-gradient-to-r from-rose-500 to-red-500 p-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-white">
                    需要专业支持
                  </h3>
                  <p className="text-xs text-white/80 mt-1">
                    我们在分析中注意到您可能正处于一段情绪艰难的时期
                  </p>
                </div>
              </div>
            </div>
            
            {/* 警示内容 */}
            <div className="bg-white/90 backdrop-blur-sm p-5">
              <p className="text-sm text-muted-foreground leading-relaxed">
                AI 的理解是有限的，此刻您更需要真人的温暖与专业支持。请不要独自承受这些，寻求帮助是勇敢的表现。
              </p>
            </div>
          </div>
        </div>

        {/* 求助通道 */}
        <div 
          className={`mt-6 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h4 className="font-serif text-base font-medium text-foreground mb-4 flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-500" />
            求助通道
          </h4>
          
          <div className="space-y-3">
            {/* 心理援助热线 */}
            <button
              onClick={handleCallHotline}
              className="w-full gold-card p-4 text-left hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-red-500 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">
                    拨打 24h 心理援助热线
                  </h5>
                  <p className="text-sm text-rose-500 font-medium mt-1">
                    400-161-9995
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    全国24小时免费心理咨询热线
                  </p>
                </div>
              </div>
            </button>
            
            {/* 寻找咨询机构 */}
            <a
              href="https://www.cpsbeijing.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full gold-card p-4 hover:scale-[1.02] transition-transform"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h5 className="font-medium text-foreground">
                    寻找附近的心理咨询机构
                  </h5>
                  <p className="text-xs text-muted-foreground mt-1">
                    中国心理学会注册系统
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>

        {/* 保留的分析内容 */}
        <div 
          className={`mt-8 transition-all duration-700 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h4 className="font-serif text-base font-medium text-foreground mb-4">
            AI 观察到的画面特征
          </h4>
          
          <div className="gold-card p-5 space-y-4">
            <div>
              <h5 className="text-sm font-medium text-muted-foreground mb-2">
                专业解读
              </h5>
              <p className="text-sm text-foreground leading-relaxed">
                {result.clientInsightReport}
              </p>
            </div>
          </div>
        </div>

        {/* 温馨提示 */}
        <div 
          className={`mt-6 gold-card p-4 transition-all duration-700 delay-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-start gap-3">
            <Heart className="w-5 h-5 text-rose-500 flex-shrink-0 mt-0.5" />
            <div>
              <h5 className="text-sm font-medium text-foreground mb-1">
                你并不孤单
              </h5>
              <p className="text-xs text-muted-foreground leading-relaxed">
                每个人都会经历困难时期，寻求帮助是勇敢的表现。专业的心理咨询师会倾听你的故事，陪伴你走过这段路。
              </p>
            </div>
          </div>
        </div>

        {/* 底部操作 */}
        <div 
          className={`mt-8 transition-all duration-700 delay-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={handleRestart}
            className="secondary-btn w-full py-4 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            重新测试
          </button>
        </div>

        {/* 免责声明 */}
        <div 
          className={`mt-6 text-center transition-all duration-700 delay-1000 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-xs text-muted-foreground/60 leading-relaxed max-w-xs mx-auto">
            本报告基于心理投射理论与 AI 生成，仅供自我探索参考，不构成专业医疗诊断。如遇严重心理困扰，请立即寻求专业医生帮助。
          </p>
        </div>
      </div>
    </div>
  );
}
