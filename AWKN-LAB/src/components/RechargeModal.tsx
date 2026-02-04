import { useState, useEffect } from 'react';
import { X, CreditCard, Gift, TrendingUp } from 'lucide-react';
import { getPointsData, formatPoints } from '../utils/pointsSystem';

interface RechargeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function RechargeModal({ isOpen, onClose }: RechargeModalProps) {
  const [pointsData, setPointsData] = useState(() => getPointsData());
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  // 刷新积分数据
  useEffect(() => {
    setPointsData(getPointsData());
  }, [isOpen]);

  // 充值选项
  const rechargeOptions = [
    { amount: 1, points: 500, label: '1元', bonus: '0' },
    { amount: 5, points: 2500, label: '5元', bonus: '+100' },
    { amount: 10, points: 5000, label: '10元', bonus: '+500' },
    { amount: 20, points: 10000, label: '20元', bonus: '+1000' },
    { amount: 50, points: 25000, label: '50元', bonus: '+3000' },
    { amount: 100, points: 50000, label: '100元', bonus: '+10000' },
  ];

  // 执行充值
  const handleRecharge = (amount: number, points: number, bonus: string) => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      alert(`充值成功！\n\n💰 充值 ${amount} 元\n✨ 获得 ${formatPoints(points)} 积分\n${bonus ? `🎁 额外奖励：${bonus} 积分` : ''}\n\n积分已到账，可以使用各项服务！`);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden animate-scale-in z-[10000]">
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
            <CreditCard className="w-8 h-8 text-[#d4acfe]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">积分充值</h2>
          <p className="text-white/80 text-sm">充值积分，享受更多会员权益</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* 当前积分 */}
          <div className="bg-gradient-to-br from-[#f8f8f8] to-[#f0e6ff] rounded-2xl p-6 border border-[#e5e5e5]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Gift className="w-6 h-6 text-[#d4acfe]" />
                <div>
                  <p className="text-sm text-[#666666]">当前积分</p>
                  <p className="text-3xl font-bold text-[#1a1a1a]">{formatPoints(pointsData.balance)}</p>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white rounded-xl text-sm font-medium">
                  {formatPoints(pointsData.balance)}
                </span>
              </div>
            </div>
          </div>

          {/* 充值选项 */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">选择充值金额</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {rechargeOptions.map((option) => (
                <button
                  key={option.amount}
                  onClick={() => setSelectedAmount(option.amount)}
                  className={`relative bg-white border-2 rounded-2xl p-6 transition-all ${
                    selectedAmount === option.amount
                      ? 'border-[#d4acfe] shadow-lg'
                      : 'border-[#e5e5e5] hover:border-[#d4acfe] hover:shadow-md'
                  }`}
                >
                  <div className="text-center">
                    <p className="text-3xl font-bold text-[#1a1a1a] mb-2">
                      ¥{option.amount}
                    </p>
                    <p className="text-sm text-[#666666] mb-1">
                      {formatPoints(option.points)} 积分
                    </p>
                    {option.bonus && (
                      <div className="bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white text-xs px-2 py-1 rounded-full inline-block">
                        +{option.bonus}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* 充值说明 */}
            <div className="bg-[#f8f8f8] rounded-2xl p-6 border border-[#e5e5e5]">
              <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">充值说明</h3>
              <div className="space-y-3 text-sm text-[#666666]">
                <div className="flex items-start gap-3">
                  <TrendingUp className="w-5 h-5 text-[#d4acfe] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">1 元 = 500 积分</p>
                    <p className="text-xs text-[#999999]">基础充值比例</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-[#d4acfe] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">充值优惠</p>
                    <p className="text-xs text-[#999999]">10元以上额外赠送积分</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gift className="w-5 h-5 text-[#d4acfe] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium">积分用途</p>
                    <p className="text-xs text-[#999999]">与院长LAY对话、其他会员权益</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 确认按钮 */}
          <div className="space-y-3">
            {selectedAmount ? (
              <button
                onClick={() => {
                  const option = rechargeOptions.find(o => o.amount === selectedAmount);
                  if (option) {
                    handleRecharge(option.amount, option.points, option.bonus || '');
                  }
                }}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white py-4 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isProcessing ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    充值中...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Gift className="w-5 h-5" />
                    立即充值 {formatPoints(selectedAmount * 500)} 积分
                  </span>
                )}
              </button>
            ) : (
              <button
                onClick={() => setSelectedAmount(null)}
                className="w-full bg-[#f5f5f5] text-[#666666] py-4 rounded-xl font-medium hover:bg-[#e5e5e5] transition-colors"
              >
                取消
              </button>
            )}
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full py-4 rounded-xl font-medium bg-[#f5f5f5] text-[#666666] hover:bg-[#e5e5e5] transition-colors"
        >
          关闭
        </button>
      </div>
    </div>
  );
}
