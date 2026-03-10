const { getPreferences, savePreferences } = require('../../utils/storage')

const values = ['zh-CN', 'en-US', 'ja-JP']

Page({
  data: {
    languages: ['中文', 'English', '日本語'],
    langIndex: 0
  },

  onShow() {
    const prefs = getPreferences()
    const idx = Math.max(0, values.indexOf(prefs.language || 'zh-CN'))
    this.setData({ langIndex: idx })
  },

  onLanguageChange(e) {
    const idx = Number(e.detail.value)
    savePreferences({ language: values[idx] })
    this.setData({ langIndex: idx })
    wx.showToast({ title: '语言已更新', icon: 'none' })
  },

  goAdminLogin() {
    wx.navigateTo({ url: '/pages/admin-login/index' })
  }
})
