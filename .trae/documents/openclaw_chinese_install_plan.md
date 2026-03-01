# OpenClaw中文汉化版安装计划

## 问题概述
- 需要安装OpenClaw中文汉化版 `https://github.com/1186258278/OpenClawChineseTranslation.git`
- 如果安装过程中遇到问题，需要参考部署中文指南自主修复

## 安装计划

### [/] 任务1：检查当前OpenClaw安装状态
- **优先级**：P0
- **依赖**：None
- **描述**：
  - 检查是否已安装OpenClaw原版或汉化版
  - 检查Node.js版本是否符合要求（>= 22）
  - 检查npm环境状态
- **成功标准**：
  - 确认当前OpenClaw安装状态
  - 确认Node.js版本满足要求
  - 了解当前npm配置
- **测试要求**：
  - `programmatic` TR-1.1: 运行 `node -v` 确认版本 >= 22
  - `programmatic` TR-1.2: 运行 `npm list -g openclaw --depth=0` 检查安装状态
  - `programmatic` TR-1.3: 运行 `npm list -g @qingchencloud/openclaw-zh --depth=0` 检查汉化版状态
- **注意**：如果已安装旧版本，需要完全卸载后再安装

### [ ] 任务2：卸载旧版本（如果存在）
- **优先级**：P0
- **依赖**：任务1
- **描述**：
  - 卸载可能存在的OpenClaw原版
  - 卸载可能存在的OpenClaw汉化版
  - 清理npm缓存
- **成功标准**：
  - 确认所有旧版本已卸载
  - npm缓存已清理
  - 系统中不再有OpenClaw相关文件
- **测试要求**：
  - `programmatic` TR-2.1: 运行 `npm uninstall -g openclaw` 卸载原版
  - `programmatic` TR-2.2: 运行 `npm uninstall -g @qingchencloud/openclaw-zh` 卸载汉化版
  - `programmatic` TR-2.3: 运行 `npm cache clean --force` 清理缓存
  - `programmatic` TR-2.4: 验证无OpenClaw相关包残留
- **注意**：确保完全卸载所有版本，避免冲突

### [ ] 任务3：安装OpenClaw中文汉化版
- **优先级**：P0
- **依赖**：任务2
- **描述**：
  - 使用淘宝镜像源安装汉化版
  - 验证安装成功
  - 检查版本信息
- **成功标准**：
  - 汉化版安装成功
  - 版本信息正确显示
  - 命令行工具可正常使用
- **测试要求**：
  - `programmatic` TR-3.1: 运行 `npm install -g @qingchencloud/openclaw-zh@latest --registry=https://registry.npmmirror.com` 安装
  - `programmatic` TR-3.2: 运行 `openclaw --version` 验证版本
  - `human-judgment` TR-3.3: 确认版本显示为汉化版格式（如 2026.2.4-zh.1）
- **注意**：使用淘宝镜像源加速下载，避免安装卡住

### [ ] 任务4：初始化OpenClaw配置
- **优先级**：P0
- **依赖**：任务3
- **描述**：
  - 运行初始化向导
  - 配置网关模式
  - 设置认证token
  - 配置网络绑定
- **成功标准**：
  - 初始化完成无错误
  - 网关模式正确设置
  - 认证token已配置
  - 网络绑定配置正确
- **测试要求**：
  - `programmatic` TR-4.1: 运行 `openclaw onboard` 初始化
  - `programmatic` TR-4.2: 运行 `openclaw config set gateway.mode local` 设置网关模式
  - `programmatic` TR-4.3: 运行 `openclaw config set gateway.auth.token 2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da` 设置token
  - `programmatic` TR-4.4: 运行 `openclaw config set gateway.bind lan` 配置网络绑定
- **注意**：初始化过程中需要正确配置各项参数

### [ ] 任务5：启动OpenClaw网关服务
- **优先级**：P0
- **依赖**：任务4
- **描述**：
  - 启动OpenClaw网关服务
  - 检查服务状态
  - 验证Dashboard可访问
- **成功标准**：
  - 网关服务成功启动
  - Dashboard可以正常访问
  - 服务运行稳定无错误
- **测试要求**：
  - `programmatic` TR-5.1: 运行 `openclaw gateway start` 启动服务
  - `programmatic` TR-5.2: 运行 `openclaw health` 检查服务状态
  - `programmatic` TR-5.3: 运行 `openclaw dashboard` 打开Dashboard
  - `human-judgment` TR-5.4: 确认Dashboard页面可以正常加载
- **注意**：如果服务启动失败，需要参考部署中文指南排查问题

### [ ] 任务6：安装守护进程（可选）
- **优先级**：P1
- **依赖**：任务5
- **描述**：
  - 安装OpenClaw守护进程
  - 配置开机自启
  - 验证守护进程状态
- **成功标准**：
  - 守护进程安装成功
  - 服务设置为开机自启
  - 守护进程运行正常
- **测试要求**：
  - `programmatic` TR-6.1: 运行 `openclaw onboard --install-daemon` 安装守护进程
  - `programmatic` TR-6.2: 检查守护进程状态
  - `human-judgment` TR-6.3: 确认服务已设置为开机自启
- **注意**：守护进程可以确保OpenClaw开机自启，提高稳定性

### [ ] 任务7：验证整体安装状态
- **优先级**：P0
- **依赖**：任务5
- **描述**：
  - 验证OpenClaw各项功能
  - 测试模型配置
  - 检查服务稳定性
  - 确认汉化效果
- **成功标准**：
  - OpenClaw各项功能正常
  - 模型配置正确
  - 服务运行稳定
  - 界面显示为中文
- **测试要求**：
  - `programmatic` TR-7.1: 运行 `openclaw doctor` 检查系统健康状态
  - `programmatic` TR-7.2: 运行 `openclaw models list` 检查模型配置
  - `human-judgment` TR-7.3: 确认Dashboard界面为中文
  - `human-judgment` TR-7.4: 验证CLI命令输出为中文
- **注意**：确保所有功能正常运行，界面显示为中文

## 技术配置

### 必要条件
- **Node.js**：版本 >= 22
- **npm**：最新版本
- **网络**：可访问npm镜像源
- **系统**：Windows 10/11，macOS，Linux

### 推荐配置
- **Node.js**：22.x 或更高版本
- **npm**：10.x 或更高版本
- **内存**：至少4GB
- **存储空间**：至少500MB

### 安装参数
- **汉化版包名**：`@qingchencloud/openclaw-zh`
- **npm镜像源**：`https://registry.npmmirror.com`
- **默认端口**：18789
- **Gateway Token**：`2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da`

## 故障处理

### 常见问题及解决方案
1. **安装卡住**：使用淘宝镜像源
2. **配置错误**：运行 `openclaw doctor` 自动修复
3. **服务启动失败**：检查配置文件和端口占用
4. **Dashboard无法访问**：检查网关状态和token配置
5. **模型无法使用**：检查API密钥和网络连接

### 紧急修复通道
- 如果遇到无法解决的问题，参考部署中文指南中的对应解决方案
- 可以尝试完全卸载后重新安装
- 可以使用Docker方式部署作为备选方案

## 预期结果
- ✅ OpenClaw中文汉化版成功安装
- ✅ 服务正常运行
- ✅ Dashboard可正常访问
- ✅ 界面显示为中文
- ✅ 各项功能正常工作
- ✅ 系统运行稳定