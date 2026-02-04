import { useRef } from 'react';
import { Calendar } from 'lucide-react';

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#f8f8f8] via-[#f3e7ff] to-[#f8f8f8]"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div
          className="absolute top-20 left-10 w-64 h-64 rounded-full bg-gradient-to-br from-[#d4acfe]/20 to-transparent blur-3xl animate-float"
          style={{ animationDelay: '0s' }}
        />
        <div
          className="absolute bottom-40 right-20 w-96 h-96 rounded-full bg-gradient-to-br from-[#00e1ff]/10 to-transparent blur-3xl animate-float-slow"
          style={{ animationDelay: '2s' }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-gradient-to-br from-[#d4acfe]/15 to-transparent blur-2xl animate-float"
          style={{ animationDelay: '4s' }}
        />
        
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(#1a1a1a 1px, transparent 1px),
              linear-gradient(90deg, #1a1a1a 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 pt-40 pb-20 min-h-[80vh] flex flex-col justify-start">
        {/* Main Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 animate-fade-in-up">
            命运如水流动，你当不动如山。
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-[#666666] max-w-3xl mx-auto animate-fade-in-up text-center" style={{ animationDelay: '200ms' }}>
            在不确定的世界里，<br className="md:hidden" />
            为你交付一套确定的坐标系。
          </p>
        </div>

        {/* AWKN LAB 定数实验室 Section - 桌面端显示，手机端隐藏 */}
        <div className="hidden md:block mb-16">
          <div className="text-center mb-16 lg:mb-20">
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8 items-start">
            {/* A - AWAKEN Card */}
            <div className="matrix-card group relative bg-white rounded-3xl overflow-hidden border border-[#e5e5e5] card-hover perspective-1000 animate-flip-in">
              <div className="p-4 md:p-6 border-b border-[#e5e5e5]" style={{ backgroundColor: 'rgba(212, 172, 254, 0.063)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgb(212, 172, 254)', color: 'white' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 md:w-8 h-6 md:h-8">
                      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">A - AWAKEN</h3>
                </div>
                <p className="text-sm md:text-base text-[#666666]">看清未来，不再迷茫。</p>
              </div>
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* 手机端只显示第一个功能 */}
                <div className="space-y-2 md:space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-[#1a1a1a]">⚠️ 年度风险预警</h4>
                  <p className="text-xs md:text-sm text-[#666666]">人生的风控雷达</p>
                  <button className="btn-primary text-xs md:text-sm py-2 px-4 mt-2 w-full">开启风控雷达</button>
                </div>
                {/* 桌面端显示完整内容 */}
                <div className="hidden md:block space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-[#1a1a1a]">📅 2026高光时刻日历</h4>
                  <p className="text-xs md:text-sm text-[#666666]">你的机会雷达</p>
                  <button className="btn-primary text-xs md:text-sm py-2 px-4 mt-2 w-full">生成高光日历</button>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'rgba(212, 172, 254, 0.25) 0px 0px 0px 2px inset' }} />
            </div>

            {/* W - WIRED Card */}
            <div className="matrix-card group relative bg-white rounded-3xl overflow-hidden border border-[#e5e5e5] card-hover perspective-1000 animate-flip-in">
              <div className="p-4 md:p-6 border-b border-[#e5e5e5]" style={{ backgroundColor: 'rgba(0, 225, 255, 0.063)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgb(0, 225, 255)', color: 'white' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 md:w-8 h-6 md:h-8">
                      <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">W - WIRED</h3>
                </div>
                <p className="text-sm md:text-base text-[#666666]">看清过去真我，找回本能</p>
              </div>
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* 手机端只显示第一个功能 */}
                <div className="space-y-2 md:space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-[#1a1a1a]">👶 少年英雄觉醒实验室</h4>
                  <p className="text-xs md:text-sm text-[#666666]">少年天赋原厂说明书</p>
                  <a href="https://59e24a4bb8854a45a352169e8db31d61.prod.enter.pro" className="btn-primary text-xs md:text-sm py-2 px-4 mt-2 w-full inline-block text-center">开启天赋探索</a>
                </div>
                {/* 桌面端显示完整内容 */}
                <div className="hidden md:block space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-[#1a1a1a]">🎨 你的画，照见灵魂</h4>
                  <p className="text-xs md:text-sm text-[#666666]">遇见真实的自己</p>
                  <button className="btn-primary text-xs md:text-sm py-2 px-4 mt-2 w-full">开始绘画探索</button>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'rgba(0, 225, 255, 0.25) 0px 0px 0px 2px inset' }} />
            </div>

            {/* K - KEY Card */}
            <div id="key" className="matrix-card group relative bg-white rounded-3xl overflow-hidden border border-[#e5e5e5] card-hover perspective-1000 animate-flip-in">
              <div className="p-4 md:p-6 border-b border-[#e5e5e5]" style={{ backgroundColor: 'rgba(255, 154, 158, 0.063)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgb(255, 154, 158)', color: 'white' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 md:w-8 h-6 md:h-8">
                      <path d="M12 18V5"></path>
                      <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4"></path>
                      <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5"></path>
                      <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77"></path>
                      <path d="M18 18a4 4 0 0 0 2-7.464"></path>
                      <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517"></path>
                      <path d="M6 18a4 4 0 0 1-2-7.464"></path>
                      <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">K - KEY</h3>
                </div>
                <p className="text-sm md:text-base text-[#666666]">找到人生之钥，破开局势</p>
              </div>
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* 手机端只显示第一个功能 */}
                <div className="space-y-2 md:space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-[#1a1a1a]">🧠 大脑作弊器</h4>
                  <p className="text-xs md:text-sm text-[#666666]">你的认知军火库</p>
                  <a href="https://pbn74tqv49.coze.site" className="btn-primary text-xs md:text-sm py-2 px-4 mt-2 w-full inline-block text-center">开启大脑外挂</a>
                </div>
                {/* 桌面端显示完整内容 */}
                <div className="hidden md:block space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-[#1a1a1a]">🎲 上帝帮你掷骰子</h4>
                  <p className="text-xs md:text-sm text-[#666666]">二选一推演沙盘</p>
                  <button className="btn-primary text-xs md:text-sm py-2 px-4 mt-2 w-full">启动决策推演</button>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'rgba(255, 154, 158, 0.25) 0px 0px 0px 2px inset' }} />
            </div>

            {/* N - NOW Card */}
            <div className="matrix-card group relative bg-white rounded-3xl overflow-hidden border border-[#e5e5e5] card-hover perspective-1000 animate-flip-in">
              <div className="p-4 md:p-6 border-b border-[#e5e5e5]" style={{ backgroundColor: 'rgba(156, 255, 156, 0.063)' }}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 md:w-12 h-10 md:h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'rgb(156, 255, 156)', color: 'white' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 md:w-8 h-6 md:h-8">
                      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                      <path d="M8 16H3v5"></path>
                    </svg>
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-[#1a1a1a]">N - NOW</h3>
                </div>
                <p className="text-sm md:text-base text-[#666666]">开启新生旅程，就在此刻</p>
              </div>
              <div className="p-4 md:p-6 space-y-4 md:space-y-6">
                {/* 手机端只显示第一个功能 */}
                <div className="space-y-2 md:space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-[#1a1a1a]">💊 赛博灵签</h4>
                  <p className="text-xs md:text-sm text-[#666666]">[每日行动指引]</p>
                  <button className="btn-primary text-xs md:text-sm py-2 px-4 mt-2 w-full">摇一摇</button>
                </div>
                {/* 桌面端显示完整内容 */}
                <div className="hidden md:block space-y-3">
                  <h4 className="text-sm md:text-base font-semibold text-[#1a1a1a]">🎲 人生决策红绿灯</h4>
                  <p className="text-xs md:text-sm text-[#666666]">开启人生外挂</p>
                  <button className="btn-primary text-xs md:text-sm py-2 px-4 mt-2 w-full">校准能量</button>
                </div>
              </div>
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ boxShadow: 'rgba(156, 255, 156, 0.25) 0px 0px 0px 2px inset' }} />
            </div>
          </div>
        </div>

        {/* A - AWAKEN Section */}
        <div id="awaken" className="mb-16 md:mb-24">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 animate-fade-in-up">
              A - AWAKEN | 看清未来，不再迷茫
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch w-full">
            {/* Left Content - Calendar Card */}
            <div className="animate-fade-in-up flex" style={{ animationDelay: '400ms' }}>
              <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8 relative overflow-hidden w-full flex flex-col">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-8 h-8 text-[#d4acfe]" />
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">2 0 2 6  高 光 时 刻 日 历</h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-8" />

                {/* Card Content */}
                <div className="space-y-8 flex-1">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#1a1a1a]">时间维度的"机会雷达"</p>
                    <p className="text-lg text-[#666666]">别让好运气，在你不知道的时候悄悄溜走。</p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-2 group">
                      <span>开启加速人生</span>
                      <span className="text-[#d4acfe] group-hover:translate-x-1 transition-transform">👉</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Fortune Calendar Image */}
            <div className="animate-fade-in-up flex" style={{ animationDelay: '500ms' }}>
              <div className="relative w-full flex items-center justify-center">
                <div className="relative perspective-1200 preserve-3d w-full h-full flex items-center">
                  <div className="relative animate-float w-full" style={{ animationDelay: '0.5s' }}>
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
                      <img alt="2026 Fortune Calendar" className="w-full h-full object-cover" src="/my-calendar.png" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#d4acfe]/10 to-transparent pointer-events-none"></div>
                    </div>
                    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-[#d4acfe] to-[#b388ff] shadow-lg animate-float flex items-center justify-center" style={{ animationDelay: '1s' }}>
                      <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-16 h-16 rounded-xl bg-gradient-to-br from-[#00e1ff] to-[#00b8d4] shadow-lg animate-float flex items-center justify-center" style={{ animationDelay: '2s' }}>
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                      </svg>
                    </div>
                    <div className="absolute top-1/2 -right-8 w-14 h-14 rounded-lg bg-white shadow-xl animate-float flex items-center justify-center" style={{ animationDelay: '1.5s' }}>
                      <svg className="w-7 h-7 text-[#d4acfe]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* New Row - Annual Risk Warning */}
          <div className="animate-fade-in-up mt-12" style={{ animationDelay: '600ms' }}>
            <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8 relative overflow-hidden w-full">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff6b6b] to-[#ee5a5a] flex items-center justify-center text-white">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-.633-1.964-.633-2.732 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-[#1a1a1a]">⚠️ 年度风险预警</h2>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-8" />

              {/* Risk Warning Content */}
              <div className="space-y-6">
                <div className="space-y-4">
                  <p className="text-lg font-semibold text-[#1a1a1a]">人生的风控雷达</p>
                  <p className="text-lg text-[#666666]">识别2026年潜在风险，提前做好应对准备</p>
                </div>

                {/* Risk Items */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-6 border border-red-100">
                    <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-2">财务风险</h3>
                    <p className="text-sm text-[#666666]">注意投资波动，避免高风险操作</p>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-amber-50 rounded-2xl p-6 border border-yellow-100">
                    <div className="w-10 h-10 rounded-xl bg-yellow-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-2">人际风险</h3>
                    <p className="text-sm text-[#666666]">谨慎处理合作关系，避免冲突</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
                      <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                    <h3 className="font-semibold text-[#1a1a1a] mb-2">健康风险</h3>
                    <p className="text-sm text-[#666666]">注意作息规律，预防亚健康</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-8">
                <button className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-2 group bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  <span>开启风控雷达</span>
                  <span className="text-white group-hover:translate-x-1 transition-transform">👉</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* W - WIRED Section */}
        <div id="wired" className="mb-16 md:mb-24">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 animate-fade-in-up">
              W - WIRED | 看清过去真我，找回本能
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch w-full">
            {/* Left Content - Teen Hero Lab */}
            <div className="animate-fade-in-up flex items-center" style={{ animationDelay: '400ms' }}>
              <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8 relative overflow-hidden w-full">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00e1ff] to-[#00b8d4] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">少年英雄实验室</h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-8" />

                {/* Card Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#1a1a1a]">少年天赋原厂说明书</p>
                    <p className="text-lg text-[#666666]">解封天赋，接管主场</p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <a href="https://59e24a4bb8854a45a352169e8db31d61.prod.enter.pro" className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-2 group inline-block">
                      <span>开启天赋探索</span>
                      <span className="text-[#00e1ff] group-hover:translate-x-1 transition-transform">👉</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Soul Mirror */}
            <div className="animate-fade-in-up flex items-center" style={{ animationDelay: '600ms' }}>
              <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8 relative overflow-hidden w-full">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00e1ff] to-[#00b8d4] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">你的画，照见灵魂</h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-8" />

                {/* Card Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#1a1a1a]">遇见真实的自己</p>
                    <p className="text-lg text-[#666666]">让每一笔绘画都成为理解心灵的窗口</p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-2 group">
                      <span>开始绘画探索</span>
                      <span className="text-[#00e1ff] group-hover:translate-x-1 transition-transform">👉</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* K - KEY Section */}
        <div className="mb-16 md:mb-24">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 animate-fade-in-up">
              K - KEY | 找到人生之钥，破开局势
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch w-full">
            {/* Left Content - Brain Cheat */}
            <div className="animate-fade-in-up flex items-center" style={{ animationDelay: '400ms' }}>
              <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8 relative overflow-hidden w-full">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff9a9e] to-[#ff6b6b] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.626-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.882.493 1.509 1.333 1.509 2.316V18" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">大脑作弊器</h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-8" />

                {/* Card Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#1a1a1a]">你的认知军火库</p>
                    <p className="text-lg text-[#666666]">把厚书读薄，把世界看透</p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <a href="https://pbn74tqv49.coze.site" className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-2 group inline-block">
                      <span>开启大脑外挂</span>
                      <span className="text-[#ff9a9e] group-hover:translate-x-1 transition-transform">👉</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - God's Dice */}
            <div className="animate-fade-in-up flex items-center" style={{ animationDelay: '600ms' }}>
              <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8 relative overflow-hidden w-full">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#ff9a9e] to-[#ff6b6b] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">上帝帮你掷骰子</h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-8" />

                {/* Card Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#1a1a1a]">二选一推演沙盘</p>
                    <p className="text-lg text-[#666666]">模拟一次，胜过空想百次</p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-2 group">
                      <span>启动决策推演</span>
                      <span className="text-[#ff9a9e] group-hover:translate-x-1 transition-transform">👉</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>

        {/* N - NOW Card */}
        <div id="now" className="mb-16 md:mb-24">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 animate-fade-in-up">
              N - NOW | 开启新生旅程，就在此刻
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-stretch w-full">
            {/* Left Content - Cyber Fortune */}
            <div className="animate-fade-in-up flex items-center" style={{ animationDelay: '400ms' }}>
              <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8 relative overflow-hidden w-full">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9cff9c] to-[#7cb342] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H3v5"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">赛博灵签</h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-8" />

                {/* Card Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#1a1a1a]">每日行动指引</p>
                    <p className="text-lg text-[#666666]">摇一摇，获取今日天时Buff</p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-2 group">
                      <span>摇一摇</span>
                      <span className="text-[#9cff9c] group-hover:translate-x-1 transition-transform">👉</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Content - Life Decision */}
            <div className="animate-fade-in-up flex items-center" style={{ animationDelay: '600ms' }}>
              <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8 relative overflow-hidden w-full">
                {/* Card Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#9cff9c] to-[#7cb342] flex items-center justify-center text-white">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 0 1-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18a4 4 0 0 1-2-7.464"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6.003 5.125a4 4 0 0 0-2.526 5.77"></path>
                      </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-[#1a1a1a]">人生决策红绿灯</h2>
                  </div>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-8" />

                {/* Card Content */}
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-lg font-semibold text-[#1a1a1a]">开启人生外挂</p>
                    <p className="text-lg text-[#666666]">在不确定的世界寻找确定性</p>
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <button className="w-full btn-primary text-lg py-5 flex items-center justify-center gap-2 group">
                      <span>校准能量</span>
                      <span className="text-[#9cff9c] group-hover:translate-x-1 transition-transform">👉</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#f8f8f8] to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;
