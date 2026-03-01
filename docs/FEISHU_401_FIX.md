# 🔧 飞书机器人 401 错误修复指南

## ✅ 诊断结果

**好消息：API Key 是有效的！**

经过测试验证：
- ✅ `qwen3.5-plus` - 可用
- ✅ `glm-5` - 可用
- ✅ API Key 格式正确
- ✅ 账户状态正常

## 🔍 错误原因

飞书机器人报 "Incorrect API key provided" 错误，但 API Key 实际有效，可能的原因：

1. **配置未同步** - OpenClaw 服务还在使用旧配置
2. **缓存问题** - 配置缓存未刷新
3. **模型引用错误** - 飞书机器人可能引用了不可用的模型

## 🛠️ 解决方案

### 方案 1：重启 OpenClaw 服务（推荐）

```powershell
# 完全重启
openclaw restart

# 或者先停止再启动
openclaw stop
openclaw start
```

### 方案 2：检查并设置默认模型

确保飞书机器人使用的是已验证可用的模型：

```powershell
# 设置默认模型为 qwen3.5-plus（已验证可用）
openclaw config set agents.defaults.model bailian/qwen3.5-plus

# 或者使用 glm-5
openclaw config set agents.defaults.model bailian/glm-5

# 查看当前配置
openclaw config get agents.defaults.model
```

### 方案 3：检查飞书通道配置

查看飞书机器人的模型配置：

```powershell
# 查看所有通道配置
openclaw config get channels
```

如果需要为飞书单独指定模型，可以在配置文件中添加：

```json
{
  "channels": {
    "feishu": {
      "enabled": true,
      "model": "bailian/qwen3.5-plus"
    }
  }
}
```

### 方案 4：清除配置缓存

```powershell
# 清除缓存并重启
openclaw daemon stop
openclaw start
```

### 方案 5：检查日志

查看详细错误日志：

```powershell
# 查看实时日志
openclaw logs

# 或查看最近的错误
openclaw logs --level error
```

## 📋 当前可用模型

根据测试，以下模型已验证可用：

| 模型 ID | 状态 | 说明 |
|---------|------|------|
| qwen3.5-plus | ✅ 可用 | 默认模型，推荐 |
| glm-5 | ✅ 可用 | 智谱 GLM-5 |
| qwen3-max-2026-01-23 | ⚠️ 待验证 | 可能需要权限 |
| qwen3-coder-plus | ⚠️ 待验证 | 编程专用 |
| MiniMax-M2.5 | ⚠️ 待验证 | MiniMax 模型 |
| kimi-k2.5 | ⚠️ 待验证 | Kimi 模型 |

## 🎯 快速修复步骤

**按顺序执行以下步骤：**

1. **设置默认模型**
   ```powershell
   openclaw config set agents.defaults.model bailian/qwen3.5-plus
   ```

2. **重启服务**
   ```powershell
   openclaw restart
   ```

3. **测试飞书机器人**
   - 在飞书中发送消息测试

4. **查看日志（如果还有问题）**
   ```powershell
   openclaw logs --level error
   ```

## 📞 进一步帮助

如果以上步骤都无法解决问题：

1. 查看完整日志输出
2. 检查飞书应用配置（App ID 和 Secret）
3. 确认飞书应用已发布并启用
4. 联系阿里云百炼技术支持

## 🔗 相关文档

- [阿里云百炼错误码](https://help.aliyun.com/zh/model-studio/error-code#apikey-error)
- [OpenClaw 飞书配置](https://openclaw.qt.cool/)
- [阿里云百炼控制台](https://bailian.console.aliyun.com/)

---

**最后更新：** 2026-03-01
**状态：** API Key 已验证有效 ✅
