# 微信登录与朋友圈发布完整指南

本指南详细介绍如何设置微信登录系统并发布朋友圈内容，为大宗师创建完整的微信自动化管理流程。

## 📋 系统架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  微信认证服务   │     │  朋友圈服务     │     │  形象管理服务   │
│  (wechat-auth)  │     │ (wechat-moments)│     │ (wechat-profile)│
│  端口: 4001     │     │  端口: 4003     │     │  端口: 4004     │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                       ┌─────────────────┐
                       │  微信管理器     │
                       │ (wechat-manager)│
                       │  端口: 4000     │
                       └─────────────────┘
```

## 🚀 快速开始

### 1. 安装依赖

在每个服务目录中运行：

```bash
# 微信认证服务
cd services/wechat-auth
npm install

# 朋友圈服务
cd services/wechat-moments
npm install

# 形象管理服务
cd services/wechat-profile
npm install

# 微信管理器
cd services/wechat-manager
npm install
```

### 2. 配置环境变量

在每个服务目录中创建 `.env` 文件：

```env
# .env 文件配置
PADLOCAL_TOKEN=your_padlocal_token
OPENAI_API_KEY=your_openai_api_key
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret
PORT=4001  # 根据服务不同设置不同端口
```

**PadLocal Token 获取**：
1. 访问 [PadLocal官网](https://padlocal.com/)
2. 注册账号并申请令牌
3. 将令牌填入 `.env` 文件

### 3. 启动服务

#### 方法 A: 逐个启动

```bash
# 启动认证服务
cd services/wechat-auth
npm start

# 启动朋友圈服务
cd services/wechat-moments
npm start

# 启动形象管理服务
cd services/wechat-profile
npm start

# 启动微信管理器
cd services/wechat-manager
npm start
```

#### 方法 B: 使用启动脚本

```bash
# 使用 PowerShell 脚本
cd services/wechat-manager
./start-all.ps1
```

## 🔐 微信登录流程

### 1. 启动认证服务

服务启动后，会在终端显示二维码：

```
微信授权服务运行在端口 4001
扫码登录: Waiting
████████████████████████████████████████
████████████████████████████████████████
████ ▄▄▄▄▄ █▀▄▄▀▀▀▀▄▀▄█▄▄▄▀▀▀▀▄▀▄▀▀▄▄████
████ █   █ █▀▄▀▄▀▄▀▀▀▄▀▄▀▄▄▄▀▀▄▀▄▀▄▀▄▄████
████ █▄▄▄█ █▀▄▀▀▀▀▄▀▄█▄▄▄▀▀▀▀▄▀▄▀▀▄▄▄████
████▄▄▄▄▄▄▄█▄▄▄█▄▄▄▄▄█▄▄▄█▄▄▄▄▄█▄▄▄▄▄████
████████████████████████████████████████
████████████████████████████████████████
```

### 2. 扫码登录

1. 使用手机微信扫描终端中显示的二维码
2. 在手机上点击「登录」确认
3. 服务会显示登录成功信息：
   ```
   登录成功: 用户名
   登录信息已存储
   ```

### 3. 验证登录状态

通过 API 检查登录状态：

```bash
GET http://localhost:4001/api/wechat/status
```

响应：
```json
{
  "loggedIn": true,
  "user": {
    "userId": "wxid_xxxxxxxxxxxxxx",
    "name": "用户名",
    "loginTime": "2026-02-23T14:37:44.629Z"
  }
}
```

## 📱 朋友圈发布流程

### 1. 生成内容

通过朋友圈服务生成内容：

```bash
POST http://localhost:4003/api/moments/generate
Content-Type: application/json

{
  "topic": "领导力",
  "generateImage": true
}
```

响应：
```json
{
  "content": "【领导力分享】\n\n作为领导者，我们不仅要看到眼前的挑战，更要预见未来的机遇...",
  "imageUrl": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?..."
}
```

### 2. 发布朋友圈

使用生成的内容发布：

```bash
POST http://localhost:4003/api/moments/publish
Content-Type: application/json

{
  "content": "【领导力分享】\n\n作为领导者...",
  "imageUrl": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?..."
}
```

响应：
```json
{
  "message": "朋友圈发布成功",
  "post": {
    "id": "moment_1771857464629",
    "timestamp": "2026-02-23T14:37:44.629Z",
    "content": "【领导力分享】\n\n作为领导者...",
    "imageUrl": "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?...",
    "status": "published",
    "author": "大宗师"
  }
}
```

### 3. 查看发布历史

```bash
GET http://localhost:4003/api/moments/history
```

## 🎨 形象管理

### 1. 生成个人形象

```bash
POST http://localhost:4004/api/profile/generate
Content-Type: application/json

{
  "personality": {
    "tone": "professional",
    "formality": "moderate",
    "humor": "subtle",
    "interests": ["领导力", "创新", "科技", "战略"]
  },
  "appearance": {
    "style": "modern",
    "colors": ["navy", "gray", "white"],
    "elements": ["专业", "简约", "自信"]
  }
}
```

### 2. 获取个人形象

```bash
GET http://localhost:4004/api/profile/get
```

## 🎯 大宗师专属配置

### 1. 使用大宗师个人资料

将 `master-profile.json` 中的配置应用到各个服务：

```bash
# 复制大宗师个人资料到各服务
cp master-profile.json services/wechat-profile/
cp master-profile.json services/wechat-moments/
```

### 2. 配置朋友圈风格

```bash
POST http://localhost:4003/api/moments/style
Content-Type: application/json

{
  "style": {
    "tone": "professional",
    "formality": "moderate",
    "contentLength": "medium",
    "interests": ["领导力", "创新", "科技", "战略"]
  }
}
```

## 📊 服务状态检查

### 健康检查

```bash
# 微信认证服务
GET http://localhost:4001/health

# 朋友圈服务
GET http://localhost:4003/health

# 形象管理服务
GET http://localhost:4004/health

# 微信管理器
GET http://localhost:4000/health
```

### 服务日志

查看各个服务的运行日志：

```bash
# 微信认证服务日志
cd services/wechat-auth
npm start

# 朋友圈服务日志
cd services/wechat-moments
npm start

# 形象管理服务日志
cd services/wechat-profile
npm start

# 微信管理器日志
cd services/wechat-manager
npm start
```

## ⚠️ 注意事项

1. **PadLocal 令牌**：需要有效的 PadLocal 令牌才能使用微信功能
2. **微信账号安全**：使用自动化工具可能存在账号被限制的风险
3. **API 费用**：使用 OpenAI API 会产生费用，特别是生成图片
4. **发布频率**：建议控制发布频率，避免被微信判定为异常行为
5. **网络连接**：确保网络连接稳定，特别是在扫码登录时

## 🔧 故障排除

### 1. 依赖安装失败

```bash
# 清理缓存并重新安装
npm cache clean --force
npm install

# 或使用 yarn
npm install -g yarn
yarn install
```

### 2. 服务启动失败

```bash
# 检查端口是否被占用
netstat -ano | findstr :4001

# 检查环境变量配置
cat .env

# 查看详细错误日志
npm start --verbose
```

### 3. 微信登录失败

```bash
# 检查 PadLocal 令牌
echo $PADLOCAL_TOKEN

# 检查网络连接
ping padlocal.com

# 重新启动服务
npm restart
```

## 📞 支持

如果遇到问题，请检查：
- [PadLocal 文档](https://padlocal.com/docs/)
- [Wechaty 文档](https://wechaty.js.org/docs/)
- [OpenAI API 文档](https://platform.openai.com/docs/)

## 🚀 自动化脚本

### 一键启动所有服务

```bash
# 使用 PowerShell 脚本
cd services/wechat-manager
./start-all.ps1

# 或手动启动
cd services/wechat-auth && npm start
cd services/wechat-moments && npm start
cd services/wechat-profile && npm start
cd services/wechat-manager && npm start
```

### 测试发布脚本

```bash
# 运行测试发布
node test-publish.js

# 查看发布历史
cat moments-history.json
```

## 🎉 完成

恭喜！您已经成功设置了完整的微信登录和朋友圈发布系统。现在您可以：

1. **自主登录微信**：通过扫码方式登录微信账号
2. **生成个人形象**：为大宗师创建专业的微信形象
3. **发布朋友圈**：自动生成内容并发布到朋友圈
4. **管理发布历史**：查看和管理所有发布记录

系统已完全配置为使用 4000 系列端口，避免与现有服务冲突，为大宗师提供独立的微信管理能力。
