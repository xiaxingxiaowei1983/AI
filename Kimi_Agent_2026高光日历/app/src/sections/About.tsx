import { useEffect, useRef, useState } from 'react';
import { Sparkles, BookOpen, Compass, Star } from 'lucide-react';

export default function About() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: '[W] 天赋原厂说明书',
      description: '不谈“强弱”只谈“配置”。深度解析出厂设置，找回真实天赋。'
    },
    {
      icon: <Compass className="w-6 h-6" />,
      title: '[K] 二选一推演沙盘',
      description: '基于博弈论算法模拟推演，计算不同路径期望值，拒绝盲目。'
    },
    {
      icon: <Star className="w-6 h-6" />,
      title: '[A] FMEA 风控雷达',
      description: '量化风险严重度(S)与发生率(O)，在危机发生前建立反脆弱防线。'
    }
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* 背景装饰 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a]" />
      
      {/* 对角线装饰 */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, transparent 49.5%, rgba(239, 175, 90, 0.1) 49.5%, rgba(239, 175, 90, 0.1) 50.5%, transparent 50.5%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* 左侧图片 */}
          <div 
            className={`relative transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative">
              {/* 主图 */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="/about-compass.jpg"
                  alt="传统罗盘"
                  className="w-full aspect-[4/5] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* 装饰元素 */}
              <div className="absolute -top-6 -left-6 w-24 h-24 border-2 border-[#efaf5a]/30 rounded-full" />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 border-2 border-[#efaf5a]/20 rounded-full" />
              
              {/* 悬浮卡片 */}
              <div className="absolute -bottom-8 -right-8 bg-[#1a1a1a] border border-[#efaf5a]/30 rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#efaf5a]/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-[#efaf5a]" />
                  </div>
                  <div>
                    <div className="text-2xl font-display text-[#efaf5a]">1000+</div>
                    <div className="text-sm text-white/50">年传承</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧内容 */}
          <div className="space-y-8">
            {/* 标签 */}
            <div 
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#efaf5a]/30 bg-[#efaf5a]/10 transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#efaf5a]" />
              <span className="text-sm text-[#efaf5a] tracking-wider">系统架构</span>
            </div>

            {/* 标题 */}
            <h2 
              className={`font-display text-4xl md:text-5xl text-white transition-all duration-1000 delay-200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              这不是算命<br />
              <span className="text-gradient-gold">是你的「人生战略操作系统」</span>
            </h2>

            {/* 描述 */}
            <p 
              className={`text-lg text-white/70 leading-relaxed transition-all duration-1000 delay-300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              别把人生交给运气。我们将传统时空数据转化为现代工程语言，为你构建上帝视角的决策仪表盘。
            </p>

            {/* 特性列表 */}
            <div 
              className={`space-y-4 transition-all duration-1000 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 rounded-lg bg-[#efaf5a]/20 flex items-center justify-center flex-shrink-0 text-[#efaf5a]">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-display text-lg text-white mb-1">{feature.title}</h4>
                    <p className="text-sm text-white/50">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA按钮 */}
            <div 
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              <a href="#how-it-works" className="btn-secondary inline-flex">
                查看完整架构
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
