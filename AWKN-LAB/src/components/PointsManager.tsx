import { useState, useEffect } from 'react';
import { X, Calendar, CreditCard, Gift, TrendingUp, AlertCircle } from 'lucide-react';
import {
  getPointsData,
  canCheckIn,
  performCheckIn,
  createRechargeOrder,
  getOrderStatus,
  addPoints,
  formatPoints,
  getPointsLevel,
  getExpiringPoints,
  checkExpiredPoints,
} from '../utils/pointsSystem';

interface PointsManagerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PointsManager({ isOpen, onClose }: PointsManagerProps) {
  const [pointsData, setPointsData] = useState(() => getPointsData());
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isRecharging, setIsRecharging] = useState(false);
  const [_showRechargeModal, setShowRechargeModal] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [expiringPoints, setExpiringPoints] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('userEmail'));

  // 刷新积分数据
  useEffect(() => {
    // 检查用户登录状态
    setIsLoggedIn(!!localStorage.getItem('userEmail'));
    // 检查过期积分
    checkExpiredPoints();
    // 计算即将过期的积分
    const expiring = getExpiringPoints();
    setExpiringPoints(expiring);
    // 刷新积分数据
    setPointsData(getPointsData());
  }, [isOpen]);

  // 充值选项
  const rechargeOptions = [
    { amount: 1, points: 100, label: '1元' },
    { amount: 5, points: 500, label: '5元' },
    { amount: 10, points: 1000, label: '10元' },
    { amount: 20, points: 2000, label: '20元' },
    { amount: 50, points: 5000, label: '50元' },
  ];

  // 执行打卡
  const handleCheckIn = () => {
    if (!isLoggedIn) {
      alert('请先登录后再签到！');
      return;
    }
    
    if (!canCheckIn()) {
      alert('今日已签到，请明天再来！');
      return;
    }

    setIsCheckingIn(true);
    const result = performCheckIn();
    setIsCheckingIn(false);

    if (result.success) {
      alert(`签到成功！\n\n🎉 获得 ${result.points} 积分\n\n连续签到 ${pointsData.checkInStreak + 1} 天\n\n继续签到可获得更多奖励！`);
      setPointsData(getPointsData());
    }
  };

  // 轮询订单状态
  const pollOrderStatus = (orderNo: string, pointsGranted: number) => {
    let attempts = 0;
    const maxAttempts = 30; // 最多轮询30次
    const interval = 2000; // 每2秒轮询一次

    const poll = setInterval(async () => {
      attempts++;
      if (attempts > maxAttempts) {
        clearInterval(poll);
        setIsRecharging(false);
        setPaymentStatus('timeout');
        alert('支付超时，请重新尝试');
        return;
      }

      const result = await getOrderStatus(orderNo);
      if (result.success && result.status === 1) {
        clearInterval(poll);
        setIsRecharging(false);
        setPaymentStatus('success');
        // 更新积分
        addPoints(pointsGranted, 'recharge', 1, `充值${pointsGranted}积分`);
        setPointsData(getPointsData());
        alert(`充值成功！\n\n💰 充值成功\n✨ 获得 ${formatPoints(pointsGranted)} 积分\n\n有效期：365天`);
      } else if (result.success && result.status === 2) {
        clearInterval(poll);
        setIsRecharging(false);
        setPaymentStatus('failed');
        alert('支付失败，请重新尝试');
      }
    }, interval);
  };

  // 执行充值
  const handleRecharge = async (amount: number) => {
    if (!isLoggedIn) {
      alert('请先登录后再充值！');
      return;
    }
    
    setIsRecharging(true);
    setPaymentStatus('processing');

    try {
      const result = await createRechargeOrder(amount, 'wechat');
      if (result.success) {
        // 模拟用户支付成功
        setTimeout(() => {
          // 这里应该调用支付SDK发起支付
          // 模拟支付成功
          pollOrderStatus(result.orderNo!, result.pointsGranted!);
        }, 1000);
      } else {
        setIsRecharging(false);
        setPaymentStatus('failed');
        alert(`创建订单失败：${result.message || '未知错误'}`);
      }
    } catch (error) {
      setIsRecharging(false);
      setPaymentStatus('failed');
      alert('网络错误，请稍后重试');
    }
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
          <h2 className="text-2xl font-bold text-white mb-2">积分管理中心</h2>
          <p className="text-white/80 text-sm">管理你的积分，享受会员权益</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {isLoggedIn ? (
            <>
              {/* 积分余额卡片 */}
              <div className="bg-gradient-to-br from-[#f8f8f8] to-[#f0e6ff] rounded-2xl p-6 border border-[#e5e5e5]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Gift className="w-8 h-8 text-[#d4acfe]" />
                    <div>
                      <p className="text-sm text-[#666666]">当前积分</p>
                      <p className="text-3xl font-bold text-[#1a1a1a]">{formatPoints(pointsData.balance)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-4 py-2 bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white rounded-xl text-sm font-medium">
                      {getPointsLevel(pointsData.balance)}
                    </span>
                  </div>
                </div>

                {/* 积分详情 */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white/50 rounded-xl p-3">
                    <p className="text-xs text-[#666666]">充值积分</p>
                    <p className="text-lg font-bold text-[#1a1a1a]">{formatPoints(pointsData.rechargePoints || 0)}</p>
                    <p className="text-xs text-[#999999]">有效期：365天</p>
                  </div>
                  <div className="bg-white/50 rounded-xl p-3">
                    <p className="text-xs text-[#666666]">赠送积分</p>
                    <p className="text-lg font-bold text-[#1a1a1a]">{formatPoints(pointsData.giftPoints || 0)}</p>
                    <p className="text-xs text-[#999999]">有效期：7天</p>
                  </div>
                </div>

                {/* 即将过期积分提示 */}
                {expiringPoints > 0 && (
                  <div className="flex items-center gap-2 bg-[#ffefef] border border-[#ffd0d0] rounded-xl p-3 mb-4">
                    <AlertCircle className="w-4 h-4 text-[#ff6b6b] flex-shrink-0" />
                    <p className="text-sm text-[#ff6b6b]">
                      注意：<span className="font-bold">{formatPoints(expiringPoints)}</span> 积分将在7天内过期
                    </p>
                  </div>
                )}

                {/* 连续签到信息 */}
                <div className="flex items-center justify-between text-sm text-[#666666]">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>连续签到：<span className="font-bold text-[#d4acfe]">{pointsData.checkInStreak}</span> 天</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    <span>今日状态：<span className={`font-bold ${canCheckIn() ? 'text-green-500' : 'text-gray-400'}`}>
                      {canCheckIn() ? '未签到' : '已签到'}
                    </span></span>
                  </div>
                </div>
              </div>

              {/* 每日签到 */}
              <div className="bg-[#f8f8f8] rounded-2xl p-6 border border-[#e5e5e5]">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#d4acfe]" />
                  每日签到
                </h3>
                <p className="text-sm text-[#666666] mb-4">
                  每日签到可获得 <span className="font-bold text-[#d4acfe]">100 积分</span>
                  <br />
                  连续签到 7 天额外获得 <span className="font-bold text-[#d4acfe]">50 积分</span>
                  <br />
                  连续签到 30 天额外获得 <span className="font-bold text-[#d4acfe]">100 积分</span>
                </p>
                <button
                  onClick={handleCheckIn}
                  disabled={!canCheckIn() || isCheckingIn}
                  className={`w-full py-4 rounded-xl font-medium transition-all ${
                    !canCheckIn()
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white hover:shadow-lg hover:scale-[1.02]'
                  }`}
                >
                  {isCheckingIn ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      签到中...
                    </span>
                  ) : canCheckIn() ? (
                    <span className="flex items-center justify-center gap-2">
                      <Gift className="w-5 h-5" />
                      立即签到，领取 {formatPoints(100)} 积分
                    </span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Calendar className="w-5 h-5" />
                      今日已签到，明天再来
                    </span>
                  )}
                </button>
              </div>

              {/* 充值 */}
              <div className="bg-[#f8f8f8] rounded-2xl p-6 border border-[#e5e5e5]">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4 flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-[#d4acfe]" />
                  积分充值
                </h3>
                <p className="text-sm text-[#666666] mb-4">
                  充值比例：<span className="font-bold text-[#d4acfe]">1 元 = 100 积分</span>
                  <br />
                  额外奖励：每充值10元赠送100积分
                </p>
                
                {/* 充值状态显示 */}
                {isRecharging && (
                  <div className="bg-gradient-to-r from-[#d4acfe]/10 to-[#b388ff]/10 rounded-xl p-3 mb-4">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-[#d4acfe]/30 border-t-[#d4acfe] rounded-full animate-spin" />
                      <span className="text-sm font-medium text-[#1a1a1a]">
                        {paymentStatus === 'processing' && '正在创建订单...'}
                        {paymentStatus === 'success' && '支付成功！'}
                        {paymentStatus === 'failed' && '支付失败'}
                        {paymentStatus === 'timeout' && '支付超时'}
                      </span>
                    </div>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-3">
                  {rechargeOptions.slice(0, 4).map((option) => (
                    <button
                      key={option.amount}
                      onClick={() => handleRecharge(option.amount)}
                      disabled={isRecharging}
                      className={`bg-white border border-[#e5e5e5] rounded-xl p-4 hover:border-[#d4acfe] hover:shadow-md transition-all group ${isRecharging ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="text-center">
                        <p className="text-2xl font-bold text-[#1a1a1a] group-hover:text-[#d4acfe] transition-colors">
                          ¥{option.amount}
                        </p>
                        <p className="text-xs text-[#666666] mt-1">
                          {formatPoints(option.points)} 积分
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setShowRechargeModal(true)}
                  disabled={isRecharging}
                  className={`w-full mt-4 py-4 rounded-xl font-medium bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white hover:shadow-lg hover:scale-[1.02] transition-all ${isRecharging ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  自定义充值金额
                </button>
              </div>

              {/* 积分使用说明 */}
              <div className="bg-[#f8f8f8] rounded-2xl p-6 border border-[#e5e5e5]">
                <h3 className="text-lg font-semibold text-[#1a1a1a] mb-4">积分使用说明</h3>
                <div className="space-y-3 text-sm text-[#666666]">
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#d4acfe] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1a1a1a]">与院长LAY对话</p>
                      <p className="text-xs">每次对话消耗 100 积分</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#d4acfe] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1a1a1a]">积分有效期</p>
                      <p className="text-xs">• 充值积分：有效期 365 天</p>
                      <p className="text-xs">• 签到积分：有效期 7 天</p>
                      <p className="text-xs">• 活动积分：有效期 7 天</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#d4acfe] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1a1a1a]">积分使用规则</p>
                      <p className="text-xs">系统会优先使用即将过期的积分，确保您的积分得到充分利用</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-2 h-2 rounded-full bg-[#d4acfe] mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-[#1a1a1a]">其他会员权益</p>
                      <p className="text-xs">更多权益功能持续开发中...</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-[#d4acfe] to-[#b388ff] rounded-full flex items-center justify-center">
                  <Gift className="w-12 h-12 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-[#1a1a1a] mb-4">请先登录</h3>
              <p className="text-sm text-[#666666] mb-8">登录后即可查看积分、签到领取奖励和使用积分功能</p>
              <button
                onClick={() => {
                  onClose();
                  // 这里可以触发登录弹窗
                  const loginModal = document.getElementById('login-modal-trigger');
                  if (loginModal) {
                    loginModal.click();
                  }
                }}
                className="w-full py-4 rounded-xl font-medium bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                立即登录
              </button>
            </div>
          )}

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl font-medium bg-[#f5f5f5] text-[#666666] hover:bg-[#e5e5e5] transition-colors"
          >
            关闭
          </button>
        </div>
      </div>
    </div>
  );
}
