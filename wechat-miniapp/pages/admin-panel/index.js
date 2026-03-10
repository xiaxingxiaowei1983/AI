const { getAdminAccount, saveAdminAccount } = require('../../utils/storage')

Page({
  data: {
    admin: { email: '' },
    oldPassword: '',
    newPassword: ''
  },

  onShow() {
    this.setData({ admin: getAdminAccount() })
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({ [field]: e.detail.value })
  },

  changePassword() {
    const admin = getAdminAccount()
    if (this.data.oldPassword !== admin.password) {
      wx.showToast({ title: '旧密码错误', icon: 'none' })
      return
    }
    if ((this.data.newPassword || '').length < 8) {
      wx.showToast({ title: '新密码至少8位', icon: 'none' })
      return
    }

    const next = { ...admin, password: this.data.newPassword }
    saveAdminAccount(next)
    this.setData({ admin: next, oldPassword: '', newPassword: '' })
    wx.showToast({ title: '密码修改成功', icon: 'none' })
  }
})
