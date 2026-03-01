# OpenClaw 飞书机器人修复计划

## 问题分析

### 核心问题
- **WebSocket连接失败**：OpenClaw本地服务（18789端口）未正常启动，导致前端面板无法与后端通信
- **模型识别失败**：由于通信中断，模型调用请求无法发送到火山引擎，导致"Unknown model"错误

### 次要问题
- **CSP字体警告**：浏览器安全策略阻止谷歌字体加载，仅影响前端样式，不影响核心功能

## 修复步骤

### 步骤1：检查并重启OpenClaw本地服务（P0 优先级）

1. **查看OpenClaw服务状态**
   ```bash
   openclaw status
   ```

2. **停止所有OpenClaw服务**
   ```bash
   openclaw stop all
   ```

3. **检查18789端口占用情况**
   ```bash
   # Windows (cmd)
   netstat -ano | findstr :18789
   ```

4. **释放占用的端口**
   ```bash
   # Windows
   taskkill /F /PID <进程号>
   ```

5. **重新启动OpenClaw核心服务**
   ```bash
   openclaw start core
   ```

6. **启动飞书机器人**
   ```bash
   openclaw start 飞书机器人
   ```

### 步骤2：补全OpenClaw火山引擎配置（P0 优先级）

1. **编辑飞书机器人配置**
   ```bash
   openclaw config edit 飞书机器人
   ```

2. **配置内容**
   ```yaml
   name: 飞书机器人
   type: feishu
   provider: volcengine
   model: volcengine/doubao-seed-code
   
   # 火山引擎核心配置
   volcengine:
     endpoint: "https://ark.cn-beijing.volces.com/api/v3/chat/completions"
     api_key: "c13b2982-0aab-4c75-9404-0deb12a219ec"
     api_secret: "你的火山引擎API Secret"
     region: "cn-beijing"
   
   # 飞书机器人配置
   feishu:
     app_id: "你的飞书机器人AppID"
     app_secret: "你的飞书机器人AppSecret"
     webhook: ""
   ```

3. **保存配置并重启机器人**
   ```bash
   openclaw restart 飞书机器人
   ```

### 步骤3：处理CSP字体警告（P2 优先级，可选）

1. **编辑OpenClaw配置文件**
   ```bash
   # Windows
   notepad C:\Users\10919\.openclaw\config.yaml
   ```

2. **添加CSP配置**
   ```yaml
   server:
     csp:
       style-src: "'self' 'unsafe-inline' https://fonts.googleapis.com"
       font-src: "'self' https://fonts.gstatic.com"
   ```

3. **重启核心服务**
   ```bash
   openclaw restart core
   ```

### 步骤4：验证修复效果（P1 优先级）

1. **检查服务状态**
   ```bash
   openclaw status
   ```

2. **查看日志**
   ```bash
   openclaw logs --follow 飞书机器人
   ```

3. **测试机器人响应**
   - 在飞书中向机器人发送消息
   - 确认机器人能够正常回复

## 故障排查

### 如果仍有问题，检查以下几点：

1. **火山引擎API密钥**
   - 确认API密钥有效且未过期
   - 确认密钥权限正确

2. **端口占用**
   - 确认18789端口未被防火墙或杀毒软件拦截
   - 尝试使用其他端口（需修改配置）

3. **OpenClaw版本**
   ```bash
   openclaw -v
   ```
   - 确保版本≥0.8.0

4. **飞书权限**
   - 确认机器人已开通必要权限
   - 确认事件订阅配置正确

## 预期结果

- WebSocket连接成功建立
- 飞书机器人能够正常接收和回复消息
- 模型调用成功，不再出现"Unknown model"错误
- 前端面板字体样式加载正常（可选）

## 时间估算

| 步骤 | 预计时间 |
|------|----------|
| 步骤1：重启服务 | 5-10分钟 |
| 步骤2：配置修改 | 10-15分钟 |
| 步骤3：CSP配置（可选） | 5分钟 |
| 步骤4：验证测试 | 5-10分钟 |
| **总计** | **25-40分钟** |