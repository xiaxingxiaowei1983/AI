# 人生决策宗师 - 指标框架 (Metrics Framework)

## North Star Metric
- **Weekly Review Days（周复盘天数）**
  - 定义：单用户每周完成晚间复盘的天数
  - 原因：复盘是“越用越懂你”的核心数据护城河

## AARRR 指标

### Acquisition（获客）
- 海报分享转化率 = 新注册用户数 / 海报被浏览用户数
- 裂变K因子 = 人均带来的新用户数

### Activation（激活）
- 排盘完成率（目标 > 85%）
- 首日早中晚完整体验率
- 注册赠送10积分触达率（应接近100%）

### Retention（留存）
- 早帖打开率
- 晚盘完成率（核心）
- 7日留存 / 30日留存
- 对话历史回访率（宗师推演入口）

### Revenue（变现）
- 1元破冰转化率
- Basic订阅转化率（9.9/月）
- Premium订阅转化率（年费）
- 宗师沟通按次付费转化率
- ARPU / LTV

### Referral（推荐）
- 金句海报分享率
- 推演报告外分享率
- 被邀请用户7日留存

## 关键事件埋点（MVP）
- `register_success`：注册成功
- `signup_bonus_granted`：赠送10积分成功
- `onboarding_completed`：完成档案创建
- `daily_morning_open`：打开醒神帖
- `daily_noon_open`：打开破局锦囊
- `daily_review_submitted`：提交晚间复盘
- `grandmaster_chat_start`：开始宗师推演对话
- `grandmaster_chat_continue`：继续历史会话
- `admin_login_success`：后台管理员登录成功
- `admin_password_changed`：后台管理员改密成功

## 体验与性能SLO
- 日常接口 P95 < 500ms
- 宗师推演首字返回 < 2s
- 关键写入链路（注册、积分、复盘）成功率 > 99.9%
