const { getChats, saveChats } = require('../../utils/storage')

function buildReply(question) {
  return `【宗师建议】先明确你的底线与最坏情境，再执行一个可逆的小实验。\n你的问题：${question}`
}

Page({
  data: {
    messages: [],
    input: ''
  },

  onShow() {
    this.setData({ messages: getChats() })
  },

  onInput(e) {
    this.setData({ input: e.detail.value })
  },

  send() {
    const question = this.data.input.trim()
    if (!question) {
      wx.showToast({ title: '请输入内容', icon: 'none' })
      return
    }

    const current = this.data.messages.slice()
    current.push({ role: 'user', content: question, ts: Date.now() })
    current.push({ role: 'assistant', content: buildReply(question), ts: Date.now() + 1 })

    saveChats(current)
    this.setData({ messages: current, input: '' })
  },

  clearHistory() {
    saveChats([])
    this.setData({ messages: [] })
  }
})
