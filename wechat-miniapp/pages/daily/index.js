const { getUserProfile, getPoints, setPoints } = require('../../utils/storage')

function calcModule(hour) {
  if (hour >= 5 && hour < 11) {
    return {
      moduleType: 'MORNING_ALERT',
      moduleTitle: '早：醒神帖',
      moduleText: '今天最需要提防“模糊承诺”的人和事，先确认边界再行动。'
    }
  }
  if (hour >= 11 && hour < 17) {
    return {
      moduleType: 'NOON_STRATEGY',
      moduleTitle: '中：破局锦囊',
      moduleText: '立刻做一个10分钟动作：把当前卡点拆成“可验证的下一步”。'
    }
  }
  return {
    moduleType: 'EVENING_REVIEW',
    moduleTitle: '晚：胜率复盘',
    moduleText: '复盘越完整，明天建议越精准。'
  }
}

Page({
  data: {
    user: null,
    points: 0,
    moduleType: '',
    moduleTitle: '',
    moduleText: '',
    reviewText: '',
    understanding: 20
  },

  onShow() {
    const user = getUserProfile()
    const points = getPoints()
    const hour = new Date().getHours()
    const module = calcModule(hour)

    this.setData({
      user,
      points,
      ...module,
      understanding: Math.min(100, 20 + Math.floor(points / 10) * 5)
    })
  },

  goOnboarding() {
    wx.navigateTo({ url: '/pages/onboarding/index' })
  },

  onReviewInput(e) {
    this.setData({ reviewText: e.detail.value })
  },

  submitReview() {
    if (!this.data.reviewText.trim()) {
      wx.showToast({ title: '请先填写复盘', icon: 'none' })
      return
    }
    const nextPoints = this.data.points + 10
    setPoints(nextPoints)
    this.setData({ points: nextPoints, reviewText: '' })
    wx.showToast({ title: '复盘成功，已奖励10积分', icon: 'none' })
  }
})
