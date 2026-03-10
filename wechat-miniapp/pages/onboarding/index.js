const { saveUserProfile, getPoints, setPoints } = require('../../utils/storage')

Page({
  data: {
    genders: ['男', '女'],
    hours: ['未知（默认12:00）', '00:00-01:00', '01:00-03:00', '03:00-05:00', '05:00-07:00', '07:00-09:00', '09:00-11:00', '11:00-13:00', '13:00-15:00', '15:00-17:00', '17:00-19:00', '19:00-21:00', '21:00-23:00', '23:00-24:00'],
    form: {
      name: '',
      genderIndex: 0,
      birthDate: '',
      hourIndex: 0,
      location: '',
      email: ''
    }
  },

  onInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({ [`form.${field}`]: e.detail.value })
  },

  onGenderChange(e) {
    this.setData({ 'form.genderIndex': Number(e.detail.value) })
  },

  onDateChange(e) {
    this.setData({ 'form.birthDate': e.detail.value })
  },

  onHourChange(e) {
    this.setData({ 'form.hourIndex': Number(e.detail.value) })
  },

  submit() {
    const { form } = this.data
    if (!form.birthDate || !form.location || !form.email) {
      wx.showToast({ title: '请补全必填项', icon: 'none' })
      return
    }

    const profile = {
      ...form,
      gender: form.genderIndex === 0 ? 1 : 2,
      confidence: form.hourIndex === 0 ? 0.7 : 0.95,
      createdAt: Date.now()
    }
    saveUserProfile(profile)

    const currentPoints = getPoints()
    if (currentPoints === 0) {
      setPoints(10)
      wx.showToast({ title: '注册成功，赠送10积分', icon: 'none' })
    }

    wx.switchTab({ url: '/pages/daily/index' })
  }
})
