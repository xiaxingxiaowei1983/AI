import { useState } from 'react';
import { X, Gift, Calendar } from 'lucide-react';
import { performCheckIn } from '../utils/pointsSystem';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckInModal({ isOpen, onClose }: CheckInModalProps) {
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [checkInResult, setCheckInResult] = useState<{ success: boolean; points: number } | null>(null);

  if (!isOpen) return null;

  const handleCheckIn = () => {
    setIsCheckingIn(true);
    const result = performCheckIn();
    setCheckInResult(result);
    setIsCheckingIn(false);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in z-[10000]">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#f5f5f5] flex items-center justify-center hover:bg-[#e5e5e5] transition-colors z-10"
        >
          <X className="w-5 h-5 text-[#666666]" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-[#d4acfe] to-[#b388ff] p-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
            <Calendar className="w-8 h-8 text-[#d4acfe]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">每日签到</h2>
          <p className="text-white/80 text-sm">签到领取每日积分奖励</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* 签到结果 */}
          {checkInResult ? (
            <div className="bg-gradient-to-br from-[#f8f8f8] to-[#f0e6ff] rounded-2xl p-6 text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#d4acfe] to-[#b388ff] rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-2">
                {checkInResult.success ? '签到成功！' : '签到失败'}
              </h3>
              <p className="text-sm text-[#666666] mb-4">
                {checkInResult.success
                  ? `🎉 恭喜！你获得了 ${checkInResult.points} 积分`
                  : '今日已签到，请明天再来'}
              </p>
              {checkInResult.success && (
                <div className="bg-[#fff0f0] rounded-xl p-4">
                  <p className="text-sm text-[#666666]">
                    <span className="font-bold">连续签到奖励：</span>
                    <br />
                    • 连续 7 天：额外 +50 积分
                    <br />
                    • 连续 30 天：额外 +100 积分
                  </p>
                </div>
              )}
              <button
                onClick={onClose}
                className="w-full bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white py-4 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                太棒了
              </button>
            </div>
          ) : (
            /* 签到说明 */
            <div className="text-center space-y-4">
              <div className="bg-[#f8f8f8] rounded-2xl p-6">
                <p className="text-lg font-semibold text-[#1a1a1a] mb-2">每日签到奖励</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Gift className="w-6 h-6 text-[#d4acfe]" />
                    <span className="text-sm text-[#666666]">基础奖励：+100 积分</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gift className="w-6 h-6 text-[#d4acfe]" />
                    <span className="text-sm text-[#666666]">连续 7 天：额外 +50 积分</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Gift className="w-6 h-6 text-[#d4acfe]" />
                    <span className="text-sm text-[#666666]">连续 30 天：额外 +100 积分</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckIn}
                disabled={isCheckingIn}
                className="w-full bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white py-4 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isCheckingIn ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    签到中...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Calendar className="w-5 h-5" />
                    立即签到，领取 100 积分
                  </span>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
