// 积分系统工具函数

export interface PointsData {
  balance: number;
  rechargePoints: number;
  giftPoints: number;
  lastCheckInDate: string | null;
  checkInStreak: number;
  lastLoginDate: string | null;
  history: PointsHistory[];
}

export interface PointsHistory {
  id: string;
  type: 'register' | 'checkin' | 'recharge' | 'consume' | 'login';
  sourceType: number; // 1=充值 2=签到 3=活动
  amount: number;
  description: string;
  timestamp: string;
  expireTime: string;
  status: 'valid' | 'expired' | 'used';
}

const ADMIN_EMAIL = '10919669@qq.com';
const ADMIN_DEFAULT_POINTS = 10000;
const DAILY_LOGIN_REWARD = 1000;
const API_BASE_URL = 'http://localhost:4000/api';

// 获取用户特定的积分键名
function getPointsKey(): string {
  const userEmail = localStorage.getItem('userEmail');
  return userEmail ? `awkn_points_${userEmail}` : 'awkn_points_guest';
}

// 获取积分数据
export function getPointsData(): PointsData {
  const key = getPointsKey();
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return {
    balance: 0,
    rechargePoints: 0,
    giftPoints: 0,
    lastCheckInDate: null,
    checkInStreak: 0,
    lastLoginDate: null,
    history: [],
  };
}

// 保存积分数据
export function savePointsData(data: PointsData): void {
  const key = getPointsKey();
  localStorage.setItem(key, JSON.stringify(data));
}

// 清除用户积分数据
export function clearPointsData(): void {
  const key = getPointsKey();
  localStorage.removeItem(key);
}

// 检查是否为管理员
export function isAdmin(email: string): boolean {
  return email === ADMIN_EMAIL;
}

// 计算过期时间
function calculateExpireTime(sourceType: number): Date {
  const now = new Date();
  if (sourceType === 1) {
    // 充值积分：365天
    now.setFullYear(now.getFullYear() + 1);
  } else {
    // 其他积分：7天
    now.setDate(now.getDate() + 7);
  }
  return now;
}

// 添加积分
export function addPoints(amount: number, type: PointsHistory['type'], sourceType: number, description: string): void {
  const data = getPointsData();
  data.balance += amount;
  
  // 更新对应类型的积分
  if (sourceType === 1) {
    data.rechargePoints += amount;
  } else {
    data.giftPoints += amount;
  }
  
  const expireTime = calculateExpireTime(sourceType);
  
  data.history.unshift({
    id: Date.now().toString(),
    type,
    sourceType,
    amount,
    description,
    timestamp: new Date().toISOString(),
    expireTime: expireTime.toISOString(),
    status: 'valid',
  });
  
  savePointsData(data);
}

// 扣除积分
export function deductPoints(amount: number, description: string): boolean {
  const data = getPointsData();
  if (data.balance < amount) {
    return false;
  }
  
  // 按优先级消耗积分：先消耗即将过期的非充值积分
  let remainingAmount = amount;
  const now = new Date();
  
  // 过滤有效积分并排序
  const validPoints = data.history.filter(item => 
    item.status === 'valid' && new Date(item.expireTime) > now
  );
  
  // 排序：先按来源类型（非充值优先），再按过期时间（早的优先）
  validPoints.sort((a, b) => {
    if (a.sourceType !== b.sourceType) {
      return a.sourceType === 1 ? 1 : -1;
    }
    return new Date(a.expireTime).getTime() - new Date(b.expireTime).getTime();
  });
  
  // 消耗积分
  for (const point of validPoints) {
    if (remainingAmount <= 0) break;
    
    const consumeAmount = Math.min(point.amount, remainingAmount);
    point.amount -= consumeAmount;
    remainingAmount -= consumeAmount;
    
    // 更新对应类型的积分
    if (point.sourceType === 1) {
      data.rechargePoints -= consumeAmount;
    } else {
      data.giftPoints -= consumeAmount;
    }
    
    if (point.amount === 0) {
      point.status = 'used';
    }
  }
  
  data.balance -= amount;
  
  // 添加消耗记录
  data.history.unshift({
    id: Date.now().toString(),
    type: 'consume',
    sourceType: 0,
    amount: -amount,
    description,
    timestamp: new Date().toISOString(),
    expireTime: new Date().toISOString(),
    status: 'used',
  });
  
  savePointsData(data);
  return true;
}

// 检查是否可以打卡
export function canCheckIn(): boolean {
  const data = getPointsData();
  const today = new Date().toDateString();
  return data.lastCheckInDate !== today;
}

// 执行打卡
export function performCheckIn(): { success: boolean; points: number } {
  if (!canCheckIn()) {
    return { success: false, points: 0 };
  }
  
  const data = getPointsData();
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
  
  // 计算连续打卡
  if (data.lastCheckInDate === yesterday) {
    data.checkInStreak += 1;
  } else {
    data.checkInStreak = 1;
  }
  
  // 基础积分 + 连续打卡奖励
  let pointsEarned = 100;
  if (data.checkInStreak >= 7) {
    pointsEarned = 150; // 连续7天额外奖励
  } else if (data.checkInStreak >= 30) {
    pointsEarned = 200; // 连续30天额外奖励
  }
  
  addPoints(pointsEarned, 'checkin', 2, `每日签到（连续${data.checkInStreak}天）`);
  
  const updatedData = getPointsData();
  updatedData.lastCheckInDate = today;
  savePointsData(updatedData);
  
  return { success: true, points: pointsEarned };
}

// 创建充值订单
export async function createRechargeOrder(amount: number, payChannel: 'wechat' | 'alipay'): Promise<{
  success: boolean;
  orderNo?: string;
  pointsGranted?: number;
  payParams?: any;
  message?: string;
}> {
  try {
    // 模拟充值订单创建（本地环境）
    // 实际部署时，这里会调用真实的后端API
    const orderNo = `ORD${Date.now()}`;
    const pointsGranted = amount * 500; // 1元 = 500积分
    
    // 直接添加积分（模拟支付成功）
    addPoints(pointsGranted, 'recharge', 1, `充值${amount}元`);
    
    return {
      success: true,
      orderNo: orderNo,
      pointsGranted: pointsGranted,
      payParams: {
        code_url: 'https://example.com/pay',
        qr_code: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      },
    };
  } catch (error) {
    console.error('创建充值订单失败:', error);
    return {
      success: false,
      message: '服务暂时不可用，请稍后重试',
    };
  }
}

// 查询订单状态
export async function getOrderStatus(orderNo: string): Promise<{
  success: boolean;
  status?: number;
  statusText?: string;
  message?: string;
}> {
  try {
    // 模拟订单状态查询（本地环境）
    // 实际部署时，这里会调用真实的后端API
    return {
      success: true,
      status: 1,
      statusText: '支付成功',
    };
  } catch (error) {
    console.error('查询订单状态失败:', error);
    return {
      success: false,
      message: '服务暂时不可用，请稍后重试',
    };
  }
}

// 检查今日是否已登录并领取奖励
export function checkDailyLoginReward(): { success: boolean; points: number } {
  const data = getPointsData();
  const today = new Date().toDateString();
  
  // 如果今日已登录，返回失败
  if (data.lastLoginDate === today) {
    return { success: false, points: 0 };
  }
  
  // 今日首次登录，发放奖励
  addPoints(DAILY_LOGIN_REWARD, 'login', 3, '每日登录奖励');
  
  const updatedData = getPointsData();
  updatedData.lastLoginDate = today;
  savePointsData(updatedData);
  
  return { success: true, points: DAILY_LOGIN_REWARD };
}

// 初始化管理员积分（如果是管理员）
export function initializeAdminPoints(): void {
  const userEmail = localStorage.getItem('userEmail');
  
  // 如果是管理员，确保积分为10000
  if (userEmail === ADMIN_EMAIL) {
    const data = getPointsData();
    if (data.balance < ADMIN_DEFAULT_POINTS) {
      const amount = ADMIN_DEFAULT_POINTS - data.balance;
      addPoints(amount, 'register', 3, '管理员初始积分');
    }
  }
}

// 检查并更新过期积分
export function checkExpiredPoints(): void {
  const data = getPointsData();
  const now = new Date();
  let hasChanges = false;
  
  data.history.forEach(item => {
    if (item.status === 'valid' && new Date(item.expireTime) <= now) {
      item.status = 'expired';
      data.balance -= item.amount;
      if (item.sourceType === 1) {
        data.rechargePoints -= item.amount;
      } else {
        data.giftPoints -= item.amount;
      }
      hasChanges = true;
    }
  });
  
  if (hasChanges) {
    savePointsData(data);
  }
}

// 格式化积分显示
export function formatPoints(points: number): string {
  if (points >= 10000) {
    return `${(points / 10000).toFixed(1)}万`;
  }
  return points.toString();
}

// 获取积分等级
export function getPointsLevel(points: number): string {
  if (points >= 10000) return '钻石会员';
  if (points >= 5000) return '黄金会员';
  if (points >= 2000) return '白银会员';
  if (points >= 1000) return '青铜会员';
  return '普通会员';
}

// 获取即将过期的积分
export function getExpiringPoints(days: number = 7): number {
  const data = getPointsData();
  const now = new Date();
  const futureDate = new Date();
  futureDate.setDate(futureDate.getDate() + days);
  
  return data.history.reduce((total, item) => {
    if (item.status === 'valid' && 
        new Date(item.expireTime) > now && 
        new Date(item.expireTime) <= futureDate) {
      return total + item.amount;
    }
    return total;
  }, 0);
}
