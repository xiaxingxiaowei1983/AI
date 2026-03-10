const { getUserProfile, getAdminAccount } = require('./utils/storage')

App({
  globalData: {
    user: null,
    admin: null
  },

  onLaunch() {
    this.globalData.user = getUserProfile()
    this.globalData.admin = getAdminAccount()
  }
})
