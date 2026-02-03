import { useEffect, useRef, useState } from 'react';
import { User, Heart, Briefcase, Sparkles, Calendar, ArrowRight } from 'lucide-react';

const readings = [
  {
    icon: <User className="w-8 h-8" />,
    title: '📈 第二曲线导航',
    description: '基于安索夫战略矩阵，扫描潜在蓝海，定位你的第二增长曲线。',
    rotation: -5,
    color: 'from-[#efaf5a]/20 to-transparent'
  },
  {
    icon: <Heart className="w-8 h-8" />,
    title: '🤝 动态博弈模型',
    description: '纳什均衡计算。识别多方底层筹码，寻找利益最大化的合作方案。',
    rotation: 0,
    color: 'from-[#f3c039]/20 to-transparent'
  },
  {
    icon: <Briefcase className="w-8 h-8" />,
    title: '🛡️ 资产风控评估',
    description: '识别宏观周期风险，规避无效投入，优化个人资产配置表。',
    rotation: 5,
    color: 'from-[#9e8a74]/20 to-transparent'
  },
  {
    icon: <Sparkles className="w-8 h-8" />,
    title: '🧠 潜意识投影仪',
    description: '心理学交叉验证。透视性格盲区与潜意识恐惧，完成英雄觉醒。',
    rotation: 0,
    color: 'from-[#efaf5a]/20 to-transparent'
  },
  {
    icon: <Calendar className="w-8 h-8" />,
    title: '⚡ 2026 高光日历',
    description: '时间维度的“机会雷达”。精确标注红利期与陷阱期，踩准节奏。',
    rotation: -3,
    color: 'from-[#f3c039]/20 to-transparent'
  }
];

export default function Readings() {
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

  return (
    <section
      id="readings"
      ref={sectionRef}
      className="py-24 relative overflow-hidden"
    >
      {/* 背景 */}
      <div className="absolute inset-0 bg-[#0a0a0a]" />
      
      {/* 环境光晕 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#efaf5a]/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        {/* 头部 */}
        <div className="text-center mb-16">
          <div 
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#efaf5a]/30 bg-[#efaf5a]/10 mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <Sparkles className="w-4 h-4 text-[#efaf5a]" />
            <span className="text-sm text-[#efaf5a] tracking-wider">决策模型</span>
          </div>
          
          <h2 
            className={`font-display text-4xl md:text-5xl text-white mb-4 transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            全维度的<span className="text-gradient-gold">决策支持模型</span>
          </h2>
          
          <p 
            className={`text-lg text-white/50 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            从微观战术到宏观战略，为每个关键岔路口提供数据支撑
          </p>
        </div>

        {/* 卡片网格 */}
        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6">
          {readings.map((reading, index) => (
            <div
              key={index}
              className={`group relative transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${400 + index * 100}ms`,
                transform: isVisible ? `rotate(${reading.rotation}deg)` : 'rotate(0deg) translateY(48px)'
              }}
            >
              <div 
                className="card-mystic h-full cursor-pointer group-hover:scale-105 group-hover:rotate-0 transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${reading.color})`
                }}
              >
                {/* 图标 */}
                <div className="w-16 h-16 rounded-xl bg-[#efaf5a]/20 flex items-center justify-center text-[#efaf5a] mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  {reading.icon}
                </div>

                {/* 标题 */}
                <h3 className="font-display text-xl text-white mb-3">
                  {reading.title}
                </h3>

                {/* 描述 */}
                <p className="text-sm text-white/50 mb-6 leading-relaxed">
                  {reading.description}
                </p>

                {/* 链接 */}
                <div className="flex items-center gap-2 text-[#efaf5a] text-sm group-hover:gap-4 transition-all">
                  <span>开始推演</span>
                  <ArrowRight className="w-4 h-4" />
                </div>

                {/* 悬停边框 */}
                <div className="absolute inset-0 rounded-xl border border-[#efaf5a]/0 group-hover:border-[#efaf5a]/50 transition-colors pointer-events-none" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
