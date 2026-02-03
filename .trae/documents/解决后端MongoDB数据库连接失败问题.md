# 解决后端MongoDB数据库连接失败问题

## 问题分析

从错误信息 `MongooseServerSelectionError: connect ECONNREFUSED ::1:27017, connect ECONNREFUSED 127.0.0.1:27017` 可以看出，后端无法连接到本地MongoDB服务器。

## 解决方案

### 方案1：本地安装并启动MongoDB（推荐）

1. **下载并安装MongoDB Community Edition**
   - 访问MongoDB官网下载适合Windows的安装包
   - 按照安装向导完成安装
   - 确保选择"Install MongoDB as a Service"

2. **启动MongoDB服务**
   - 打开命令提示符（管理员权限）
   - 运行：`net start MongoDB`
   - 验证服务状态：`sc query MongoDB`

3. **测试连接**
   - 打开MongoDB Compass（安装时可选）
   - 连接到 `mongodb://localhost:27017`
   - 创建 `awkn` 数据库

4. **重启后端服务**
   - 在 `awkn-platform/backend` 目录运行：`npm run dev`

### 方案2：使用MongoDB Atlas云服务

1. **创建MongoDB Atlas账号**
   - 访问 [MongoDB Atlas](https://www.mongodb.com/atlas)
   - 注册免费账号

2. **创建免费集群**
   - 选择M0免费集群
   - 选择合适的区域
   - 完成集群创建

3. **获取连接字符串**
   - 在集群页面点击"Connect"
   - 选择"Connect your application"
   - 复制连接字符串

4. **配置环境变量**
   - 在 `awkn-platform/backend` 创建 `.env` 文件
   - 添加：`MONGODB_URI=your_connection_string`
   - 替换连接字符串中的密码和数据库名

5. **重启后端服务**
   - 在 `awkn-platform/backend` 目录运行：`npm run dev`

### 方案3：使用Docker容器运行MongoDB

1. **安装Docker Desktop**
   - 访问Docker官网下载并安装
   - 启动Docker Desktop

2. **运行MongoDB容器**
   - 打开命令提示符
   - 运行：
     ```
     docker run -d --name mongodb -p 27017:27017 -e MONGO_INITDB_DATABASE=awkn mongo
     ```

3. **验证容器运行状态**
   - 运行：`docker ps`
   - 确认mongodb容器正在运行

4. **重启后端服务**
   - 在 `awkn-platform/backend` 目录运行：`npm run dev`

## 验证步骤

1. **检查后端日志**
   - 确认看到 "MongoDB连接成功" 消息

2. **测试API接口**
   - 访问 `http://localhost:4000/health`
   - 确认返回正常状态

3. **测试充值功能**
   - 前端发起充值请求
   - 后端应该能正常创建订单和处理回调

## 注意事项

- 确保MongoDB服务持续运行
- 生产环境建议使用MongoDB Atlas或专用服务器
- 定期备份数据库数据
- 配置适当的安全设置（用户名、密码、IP白名单）

选择上述方案之一实施后，后端应该能够正常连接到MongoDB数据库，不再需要使用模拟模式。