import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

const Now = () => {
  const [isShaking, setIsShaking] = useState(false);

  const handleShake = () => {
    setIsShaking(true);
    setTimeout(() => {
      setIsShaking(false);
    }, 1000);
  };

  return (
    <section
      id="now"
      className="relative py-24 lg:py-32 bg-gradient-to-br from-[#f8f8f8] via-[#f3e7ff] to-[#f8f8f8]"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-1/3 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-[#d4acfe]/10 to-transparent blur-3xl"
        />
        <div
          className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-gradient-to-br from-[#00e1ff]/10 to-transparent blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-[#1a1a1a] mb-6 scroll-reveal">
            N-NOW 开启新生旅程，就在此刻
          </h2>
        </div>

        {/* Main Card */}
        <div className="max-w-3xl mx-auto scroll-reveal">
          <div className="bg-white rounded-3xl shadow-2xl border border-[#e5e5e5] p-8">
            {/* Card Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-[#1a1a1a]">💊 赛博灵签 · 决策胶囊</h3>
              <span className="text-sm font-medium text-[#999999]">每日行动指引</span>
            </div>

            {/* Divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-[#e5e5e5] to-transparent mb-6" />

            {/* Card Content */}
            <div className="mb-8">
              
            </div>

            {/* CTA Button */}
            <div className="pt-4">
              <button 
                className={`w-full btn-primary text-lg py-5 flex items-center justify-center gap-3 group transition-all duration-300 ${
                  isShaking ? 'animate-shake' : ''
                }`}
                onClick={handleShake}
              >
                <RefreshCw 
                  className={`w-6 h-6 transition-transform duration-300 ${
                    isShaking ? 'animate-spin' : ''
                  }`}
                />
                <span>摇一摇，获取今日天时Buff</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Now;