# 🔑 阿里云百炼 API Key 获取指南

## 当前状态

❌ **当前 API Key 无效**
- Key: `sk-sp-8c3eefb330194d8ab000277eb97b103e`
- 错误：401 Invalid API Key
- 原因：API Key 未激活、已过期或区域不匹配

## 📋 获取有效 API Key 的步骤

### 步骤 1: 访问阿里云百炼控制台

打开浏览器访问：
```
https://bailian.console.aliyun.com/
```

### 步骤 2: 登录/注册阿里云账号

- 如果没有阿里云账号，需要先注册
- 完成实名认证（需要手机号验证）

### 步骤 3: 开通百炼服务

1. 在控制台首页，点击「开通服务」
2. 阅读并同意服务协议
3. 完成开通流程

> **注意**：首次开通可能需要充值一定金额（通常有免费额度）

### 步骤 4: 创建 API Key

1. 点击左侧菜单「API-KEY 管理」
2. 点击「创建新的 API-KEY」
3. 设置 API Key 名称（如：OpenClaw）
4. 选择区域：**华北 2（北京）**
5. 点击「确定」

### 步骤 5: 复制并保存 API Key

- 创建成功后，立即复制 API Key
- **重要**：API Key 只会显示一次，请妥善保存
- 格式应该是：`sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### 步骤 6: 更新配置文件

打开配置文件：
```
C:\Users\10919\.openclaw\openclaw.json
```

找到第 43 行，将 `apiKey` 替换为新的 Key：

```json
{
  "alibaba-bailian": {
    "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
    "apiKey": "sk-新的 API Key",  // ← 替换这里
    "api": "openai-completions",
    "models": [...]
  }
}
```

### 步骤 7: 验证配置

运行测试脚本：
```powershell
node c:\Users\10919\Desktop\AI\setup-bailian.js
```

如果看到「✅ API 连接成功！」，说明配置完成！

## 💰 费用说明

### 免费额度
- 新用户通常有免费体验额度
- 可以在控制台查看剩余额度

### 计费模式
- 按 Token 计费
- 不同模型价格不同
- 可以在控制台查看价格详情

### 参考价格（以实际为准）
- qwen-turbo: 最便宜
- qwen-plus: 中等
- qwen-max: 较贵
- qwen3.5-plus: 最新型号，价格适中

## 🔍 常见问题

### Q1: API Key 显示无效怎么办？

**A:** 检查以下几点：
1. API Key 是否完整复制（没有多余空格）
2. 区域是否选择正确（华北 2 北京）
3. 账户是否已开通百炼服务
4. 账户余额是否充足

### Q2: 如何查看 API Key 是否有效？

**A:** 运行验证脚本：
```powershell
node c:\Users\10919\Desktop\AI\verify-bailian-key.js
```

### Q3: 免费额度用完了怎么办？

**A:** 
1. 在控制台充值
2. 或者申请新的免费额度（如果有活动）

### Q4: 一个账号可以创建几个 API Key？

**A:** 
- 通常可以创建多个
- 建议为不同用途创建不同的 Key
- 便于管理和统计使用情况

## 🛠️ 配置检查清单

在运行前，请确认：

- [ ] 已访问阿里云百炼控制台
- [ ] 已完成账号注册和实名认证
- [ ] 已开通百炼服务
- [ ] 已创建 API Key（华北 2 北京区域）
- [ ] 已复制 API Key 到配置文件
- [ ] 已运行测试脚本验证

## 📞 技术支持

如果遇到问题：

1. **官方文档**：https://help.aliyun.com/zh/model-studio/
2. **错误码查询**：https://help.aliyun.com/zh/model-studio/error-code/
3. **工单系统**：在控制台提交工单
4. **开发者社区**：https://developer.aliyun.com/

## 🎯 下一步

获取有效 API Key 后：

1. ✅ 更新配置文件
2. ✅ 运行测试验证
3. ✅ 开始使用 OpenClaw 调用阿里云百炼 API
4. ✅ 体验 Qwen3.5-Plus 等强大模型

---

**祝你使用愉快！** 🎉
