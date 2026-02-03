import { useState } from 'react';
import { X, Calendar, User, Sparkles } from 'lucide-react';
import { calculateBazi, calculateHighlightDays } from '../lib/bazi-engine';
import type { BirthInfo, UserBazi, HighlightDay } from '../lib/bazi-engine';

interface BirthInputModalProps {
  onClose: () => void;
  onSubmit: (bazi: UserBazi, highlights: HighlightDay[]) => void;
}

export default function BirthInputModal({ onClose, onSubmit }: BirthInputModalProps) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [birthInfo, setBirthInfo] = useState<BirthInfo>({
    year: 1995,
    month: 1,
    day: 1,
    hour: 12,
    minute: 0,
    isLunar: false,
    gender: 'male'
  });

  const handleSubmit = async () => {
    setLoading(true);
    
    // 模拟计算延迟
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const bazi = calculateBazi(birthInfo);
    const highlights = calculateHighlightDays(bazi);
    
    onSubmit(bazi, highlights);
    setLoading(false);
  };

  const years = Array.from({ length: 60 }, (_, i) => 1970 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* 弹窗内容 */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] rounded-2xl border border-[#efaf5a]/30 shadow-2xl overflow-hidden animate-scale-in">
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors z-10"
        >
          <X className="w-5 h-5 text-white/70" />
        </button>

        {/* 头部 */}
        <div className="p-8 pb-0">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#efaf5a] to-[#f3c039] flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="font-display text-2xl text-white">开启你的2026高光之旅</h3>
              <p className="text-white/50 text-sm">输入出生信息，获取专属高光日历</p>
            </div>
          </div>

          {/* 步骤指示器 */}
          <div className="flex gap-2 mb-8">
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 1 ? 'bg-[#efaf5a]' : 'bg-white/10'}`} />
            <div className={`h-1 flex-1 rounded-full transition-colors ${step >= 2 ? 'bg-[#efaf5a]' : 'bg-white/10'}`} />
          </div>
        </div>

        {/* 表单内容 */}
        <div className="p-8 pt-0">
          {step === 1 && (
            <div className="space-y-6 animate-fade-in">
              {/* 日历类型选择 */}
              <div>
                <label className="block text-sm text-white/70 mb-3">日历类型</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setBirthInfo({ ...birthInfo, isLunar: false })}
                    className={`flex-1 py-4 px-6 rounded-xl border transition-all ${
                      !birthInfo.isLunar 
                        ? 'border-[#efaf5a] bg-[#efaf5a]/10 text-[#efaf5a]' 
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    <Calendar className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">阳历</span>
                  </button>
                  <button
                    onClick={() => setBirthInfo({ ...birthInfo, isLunar: true })}
                    className={`flex-1 py-4 px-6 rounded-xl border transition-all ${
                      birthInfo.isLunar 
                        ? 'border-[#efaf5a] bg-[#efaf5a]/10 text-[#efaf5a]' 
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    <Calendar className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">农历</span>
                  </button>
                </div>
              </div>

              {/* 出生日期 */}
              <div>
                <label className="block text-sm text-white/70 mb-3">出生日期</label>
                <div className="grid grid-cols-3 gap-3">
                  <select
                    value={birthInfo.year}
                    onChange={(e) => setBirthInfo({ ...birthInfo, year: parseInt(e.target.value) })}
                    className="select-mystic"
                  >
                    {years.map(year => (
                      <option key={year} value={year}>{year}年</option>
                    ))}
                  </select>
                  <select
                    value={birthInfo.month}
                    onChange={(e) => setBirthInfo({ ...birthInfo, month: parseInt(e.target.value) })}
                    className="select-mystic"
                  >
                    {months.map(month => (
                      <option key={month} value={month}>{month}月</option>
                    ))}
                  </select>
                  <select
                    value={birthInfo.day}
                    onChange={(e) => setBirthInfo({ ...birthInfo, day: parseInt(e.target.value) })}
                    className="select-mystic"
                  >
                    {days.map(day => (
                      <option key={day} value={day}>{day}日</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 出生时间 */}
              <div>
                <label className="block text-sm text-white/70 mb-3">出生时间</label>
                <div className="flex gap-3">
                  <select
                    value={birthInfo.hour}
                    onChange={(e) => setBirthInfo({ ...birthInfo, hour: parseInt(e.target.value) })}
                    className="select-mystic flex-1"
                  >
                    {hours.map(hour => (
                      <option key={hour} value={hour}>{String(hour).padStart(2, '0')}:00</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* 性别 */}
              <div>
                <label className="block text-sm text-white/70 mb-3">性别</label>
                <div className="flex gap-4">
                  <button
                    onClick={() => setBirthInfo({ ...birthInfo, gender: 'male' })}
                    className={`flex-1 py-4 px-6 rounded-xl border transition-all ${
                      birthInfo.gender === 'male' 
                        ? 'border-[#efaf5a] bg-[#efaf5a]/10 text-[#efaf5a]' 
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">男</span>
                  </button>
                  <button
                    onClick={() => setBirthInfo({ ...birthInfo, gender: 'female' })}
                    className={`flex-1 py-4 px-6 rounded-xl border transition-all ${
                      birthInfo.gender === 'female' 
                        ? 'border-[#efaf5a] bg-[#efaf5a]/10 text-[#efaf5a]' 
                        : 'border-white/10 text-white/50 hover:border-white/30'
                    }`}
                  >
                    <User className="w-6 h-6 mx-auto mb-2" />
                    <span className="text-sm">女</span>
                  </button>
                </div>
              </div>

              {/* 下一步按钮 */}
              <button
                onClick={() => setStep(2)}
                className="btn-primary w-full mt-8"
              >
                下一步
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 animate-fade-in">
              {/* 确认信息 */}
              <div className="bg-white/5 rounded-xl p-6 space-y-4">
                <h4 className="font-display text-lg text-white mb-4">确认信息</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-white/50">日历类型：</span>
                    <span className="text-white">{birthInfo.isLunar ? '农历' : '阳历'}</span>
                  </div>
                  <div>
                    <span className="text-white/50">性别：</span>
                    <span className="text-white">{birthInfo.gender === 'male' ? '男' : '女'}</span>
                  </div>
                  <div>
                    <span className="text-white/50">出生日期：</span>
                    <span className="text-white">{birthInfo.year}年{birthInfo.month}月{birthInfo.day}日</span>
                  </div>
                  <div>
                    <span className="text-white/50">出生时间：</span>
                    <span className="text-white">{String(birthInfo.hour).padStart(2, '0')}:00</span>
                  </div>
                </div>
              </div>

              {/* 说明文字 */}
              <div className="flex items-start gap-3 text-sm text-white/50">
                <Sparkles className="w-5 h-5 text-[#efaf5a] flex-shrink-0 mt-0.5" />
                <p>
                  基于您提供的出生信息，我们将运用传统子平真诠命理算法，
                  为您计算2026年全年高光日期。整个过程大约需要几秒钟。
                </p>
              </div>

              {/* 按钮组 */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => setStep(1)}
                  className="btn-secondary flex-1"
                  disabled={loading}
                >
                  返回修改
                </button>
                <button
                  onClick={handleSubmit}
                  className="btn-primary flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                      计算中...
                    </span>
                  ) : (
                    '开始计算'
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


