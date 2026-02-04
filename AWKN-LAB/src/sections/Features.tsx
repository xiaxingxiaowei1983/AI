import { useEffect, useRef, useState } from 'react';
import { Shield, Zap, Brain, RefreshCw } from 'lucide-react';

interface MatrixFeature {
  id: string;
  title: string;
  subtitle: string;
  items: {
    title: string;
    description: string;
    slogan: string;
    button?: string;
  }[];
  icon: React.ReactNode;
  color: string;
}

const matrixFeatures: MatrixFeature[] = [
  {
    id: 'awaken',
    title: 'A - AWAKEN',
    subtitle: '看清未来，不再迷茫。',
    icon: <Shield className="w-8 h-8" />,
    color: '#d4acfe',
    items: [
      {
        title: '⚠️ 年度风险预警',
        description: '人生的风控雷达',
        slogan: '真正的赢，是稳定不踩坑',
        button: '开启风控雷达',
      },
      {
        title: '📅 2026高光时刻日历',
        description: '你的机会雷达',
        slogan: '别让好运气，在你不知道的时候悄悄溜走。',
        button: '生成高光日历',
      },
    ],
  },
  {
    id: 'wired',
    title: 'W - WIRED',
    subtitle: '看清过去真我，找回本能',
    icon: <Zap className="w-8 h-8" />,
    color: '#00e1ff',
    items: [
      {
        title: '👶 少年英雄实验室',
        description: '少年天赋原厂说明书',
        slogan: '解封天赋，接管主场',
        button: '开启天赋探索',
      },
      {
        title: '🎨 你的画，照见灵魂',
        description: '遇见真实的自己',
        slogan: '让每一笔绘画都成为理解心灵的窗口',
        button: '开始绘画探索',
      },
    ],
  },
  {
    id: 'key',
    title: 'K - KEY',
    subtitle: '找到人生之钥，破开局势',
    icon: <Brain className="w-8 h-8" />,
    color: '#ff9a9e',
    items: [
      {
        title: '🧠 大脑作弊器',
        description: '你的认知军火库',
        slogan: '把厚书读薄，把世界看透',
        button: '开启大脑外挂',
      },
      {
        title: '🎲 上帝帮你掷骰子',
        description: '二选一推演沙盘',
        slogan: '模拟一次，胜过空想百次',
        button: '启动决策推演',
      },
      {
        title: '📈 人生第二曲线导航',
        description: '突破瓶颈的战略地图',
        slogan: '找到你的下一片蓝海。',
        button: '开启曲线导航',
      },
    ],
  },
  {
    id: 'now',
    title: 'N - NOW',
    subtitle: '开启新生旅程，就在此刻',
    icon: <RefreshCw className="w-8 h-8" />,
    color: '#9cff9c',
    items: [
      {
        title: '💊 赛博灵签',
        description: '[每日行动指引]',
        slogan: '摇一摇，获取今日天时Buff',
        button: '摇一摇',
      },
      {
        title: '🎲 人生决策红绿灯',
        description: '开启人生外挂',
        slogan: '在不确定的世界寻找确定性',
        button: '校准能量',
      },
    ],
  },
];

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            setVisibleCards((prev) => new Set([...prev, index]));
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px 0px -50px 0px' }
    );

    const cards = sectionRef.current?.querySelectorAll('.matrix-card');
    cards?.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="matrix"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f8f8f8]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-[#d4acfe]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#00e1ff]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 scroll-reveal">
            AWKN LAB 定数实验室
          </h2>
        </div>

        {/* Matrix Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {matrixFeatures.map((feature, index) => (
            <div
              key={feature.id}
              data-index={index}
              className={`matrix-card group relative bg-white rounded-3xl overflow-hidden border border-[#e5e5e5] card-hover perspective-1000 ${
                visibleCards.has(index) ? 'animate-flip-in' : 'opacity-0'
              }`}
              style={{
                animationDelay: `${300 + index * 120}ms`,
              }}
            >
              {/* Card Header */}
              <div 
                className="p-6 border-b border-[#e5e5e5]"
                style={{ backgroundColor: `${feature.color}10` }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div 
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: feature.color,
                      color: 'white',
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-[#1a1a1a]">{feature.title}</h3>
                </div>
                <p className="text-lg text-[#666666]">{feature.subtitle}</p>
              </div>

              {/* Card Content */}
              <div className="p-6 space-y-6">
                {feature.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="space-y-3">
                    <h4 className="text-lg font-semibold text-[#1a1a1a]">{item.title}</h4>
                    <p className="text-[#666666]">{item.description}</p>
                    <p className="text-sm italic text-[#999999]">{item.slogan}</p>
                    {item.button && (
                      <a 
                        href={item.title === '👶 少年英雄实验室' ? 'https://59e24a4bb8854a45a352169e8db31d61.prod.enter.pro' : '#'} 
                        className="btn-primary text-sm py-2 px-4 mt-2 w-full inline-block text-center"
                      >
                        {item.button}
                      </a>
                    )}
                  </div>
                ))}
              </div>

              {/* Hover border glow */}
              <div 
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 2px ${feature.color}40`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
