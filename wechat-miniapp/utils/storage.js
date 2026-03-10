const USER_KEY = 'lc_user_profile'
const POINTS_KEY = 'lc_points'
const CHATS_KEY = 'lc_grandmaster_chats'
const PREFS_KEY = 'lc_preferences'
const ADMIN_KEY = 'lc_admin_account'

function getUserProfile() {
  return wx.getStorageSync(USER_KEY) || null
}

function saveUserProfile(profile) {
  wx.setStorageSync(USER_KEY, profile)
}

function getPoints() {
  return Number(wx.getStorageSync(POINTS_KEY) || 0)
}

function setPoints(value) {
  wx.setStorageSync(POINTS_KEY, Number(value) || 0)
}

function getChats() {
  return wx.getStorageSync(CHATS_KEY) || []
}

function saveChats(chats) {
  wx.setStorageSync(CHATS_KEY, chats)
}

function getPreferences() {
  return wx.getStorageSync(PREFS_KEY) || { language: 'zh-CN' }
}

function savePreferences(prefs) {
  wx.setStorageSync(PREFS_KEY, prefs)
}

function getAdminAccount() {
  const defaultAccount = {
    email: '10919669@qq.com',
    password: 'Admin@123456'
  }
  return wx.getStorageSync(ADMIN_KEY) || defaultAccount
}

function saveAdminAccount(account) {
  wx.setStorageSync(ADMIN_KEY, account)
}

module.exports = {
  getUserProfile,
  saveUserProfile,
  getPoints,
  setPoints,
  getChats,
  saveChats,
  getPreferences,
  savePreferences,
  getAdminAccount,
  saveAdminAccount
}
