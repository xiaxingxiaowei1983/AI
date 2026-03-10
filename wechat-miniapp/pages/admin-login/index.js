const { getAdminAccount } = require('../../utils/storage')

Page({
  data: {
    email: '',
    password: ''
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({ [field]: e.detail.value })
  },

  login() {
    const admin = getAdminAccount()
    if (this.data.email === admin.email && this.data.password === admin.password) {
      wx.navigateTo({ url: '/pages/admin-panel/index' })
      return
    }
    wx.showToast({ title: '账号或密码错误', icon: 'none' })
  }
})
