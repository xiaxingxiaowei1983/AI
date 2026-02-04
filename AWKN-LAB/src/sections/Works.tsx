import { useRef } from 'react';

const Works = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative py-24 lg:py-32 bg-[#f8f8f8]"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#d4acfe]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[300px] h-[300px] rounded-full bg-gradient-to-br from-[#00e1ff]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 scroll-reveal">
            算法内核研究成果
          </h2>
          <p className="text-lg text-[#666666] scroll-reveal" style={{ transitionDelay: '100ms' }}>
            探索 AWKN 研究员的精彩成果，获取灵感
          </p>
        </div>

        {/* Algorithm Kernel Table */}
        <div className="bg-white rounded-3xl shadow-lg border border-[#e5e5e5] p-8 mb-12 scroll-reveal">
          {/* First Table */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-[#f3e7ff] rounded-2xl p-4 text-center">
              <div className="text-xl font-bold mb-2">⚠️ 风险预警</div>
              <div className="text-sm text-[#666666] mb-1">年度风控雷达</div>
              <div className="text-sm text-[#666666]">赢在不爆雷</div>
            </div>
            <div className="bg-[#e6f7ff] rounded-2xl p-4 text-center">
              <div className="text-xl font-bold mb-2">🎨 照见灵魂</div>
              <div className="text-sm text-[#666666] mb-1">潜意识投影仪</div>
              <div className="text-sm text-[#666666]">看见真自我</div>
            </div>
            <div className="bg-[#fff0f0] rounded-2xl p-4 text-center">
              <div className="text-xl font-bold mb-2">👶 少年英雄</div>
              <div className="text-sm text-[#666666] mb-1">天赋原厂说明</div>
              <div className="text-sm text-[#666666]">解封天赋</div>
            </div>
            <div className="bg-[#f0f0ff] rounded-2xl p-4 text-center">
              <div className="text-xl font-bold mb-2">🎲 上帝掷骰</div>
              <div className="text-sm text-[#666666] mb-1">二选一推演</div>
              <div className="text-sm text-[#666666]">模拟胜空想</div>
            </div>
          </div>

          {/* Second Table */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#f0fff0] rounded-2xl p-4 text-center">
              <div className="text-xl font-bold mb-2">🧠 大脑作弊</div>
              <div className="text-sm text-[#666666] mb-1">认知军火库</div>
              <div className="text-sm text-[#666666]">把世界看透</div>
            </div>
            <div className="bg-[#fff7e6] rounded-2xl p-4 text-center">
              <div className="text-xl font-bold mb-2">📈 第二曲线</div>
              <div className="text-sm text-[#666666] mb-1">突破瓶颈地图</div>
              <div className="text-sm text-[#666666]">找下一片蓝海</div>
            </div>
            <div className="bg-[#f9f0ff] rounded-2xl p-4 text-center">
              <div className="text-xl font-bold mb-2">💊 决策胶囊</div>
              <div className="text-sm text-[#666666] mb-1">每日能量校准</div>
              <div className="text-sm text-[#666666]">摇出今日Buff</div>
            </div>
            <div className="bg-[#e6f0ff] rounded-2xl p-4 text-center">
              <div className="text-xl font-bold mb-2">♾️ LIFE OS</div>
              <div className="text-sm text-[#666666] mb-1">会员数据表</div>
              <div className="text-sm text-[#666666]">伴随一生SaaS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Works;
