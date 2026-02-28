# OpenClaw 问题修复计划

## 问题概述
- **API配置问题**：OpenClaw无法正确连接火山引擎/豆包API
- **Gateway Token Missing**：`disconnected (1008): unauthorized: gateway token missing`
- **CSP错误**：阻止加载Google Fonts，影响UI显示

## 修复计划

### [x] 任务1：修复Gateway Token配置
- **优先级**：P0
- **依赖**：None
- **描述**：
  - 检查并更新OpenClaw配置文件中的gateway token
  - 确保dashboard URL可以正确访问并验证token
- **成功标准**：
  - Gateway服务可以正常启动
  - 不再出现token missing错误
  - Dashboard可以正常访问
- **测试要求**：
  - `programmatic` TR-1.1: Gateway服务启动无错误
  - `programmatic` TR-1.2: Dashboard页面可以打开
  - `human-judgment` TR-1.3: 无token missing错误信息
- **注意**：需要确保token格式正确且与配置文件匹配

### [x] 任务2：修复火山引擎/豆包API配置
- **优先级**：P0
- **依赖**：任务1
- **描述**：
  - 更新OpenClaw配置文件，正确配置火山引擎API
  - 使用正确的API Key、Endpoint ID和Base URL
  - 确保provider名称和模型配置正确
- **成功标准**：
  - OpenClaw可以成功连接豆包API
  - API测试请求返回正常响应
  - 不再出现模型配置错误
- **测试要求**：
  - `programmatic` TR-2.1: 豆包API测试请求返回200状态
  - `programmatic` TR-2.2: OpenClaw模型配置正确加载
  - `human-judgment` TR-2.3: API连接状态显示正常
- **注意**：使用文档中提供的正确API参数

### [x] 任务3：修复Content Security Policy (CSP)错误
- **优先级**：P1
- **依赖**：任务1
- **描述**：
  - 更新CSP配置，允许加载Google Fonts
  - 确保UI可以正确显示所有字体和样式
- **成功标准**：
  - 不再出现CSP错误
  - Google Fonts可以正常加载
  - UI显示正常，无样式缺失
- **测试要求**：
  - `programmatic` TR-3.1: 无CSP错误信息
  - `human-judgment` TR-3.2: 字体和样式显示正常
- **注意**：需要在CSP配置中添加Google Fonts的域名

### [x] 任务4：验证整体系统状态
- **优先级**：P1
- **依赖**：任务1, 任务2, 任务3
- **描述**：
  - 启动完整的OpenClaw系统
  - 测试所有核心功能
  - 验证API连接、Gateway服务和UI显示
- **成功标准**：
  - 整个系统可以正常运行
  - 所有错误都已解决
  - 核心功能测试通过
- **测试要求**：
  - `programmatic` TR-4.1: 所有服务启动正常
  - `programmatic` TR-4.2: API测试请求成功
  - `human-judgment` TR-4.3: 系统运行稳定无错误
- **注意**：需要进行全面的端到端测试

## 技术参数

### 火山引擎/豆包API配置
- **方舟API Key**: `9330bd41-2b7f-4719-b83e-c1e3bedc2769`
- **Endpoint ID**: `ep-20260108213536-xkxvw`
- **Base URL**: `https://ark.cn-beijing.volces.com/api/v3`
- **模型**: Doubao-Seed-1.8

### Gateway配置
- **Token**: `2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da`
- **Port**: 18789
- **Dashboard URL**: `http://127.0.0.1:18789/`

## 修复步骤

1. **任务1**：修复Gateway Token
   - 检查`openclaw.json`中的gateway配置
   - 确保token正确设置
   - 重启Gateway服务

2. **任务2**：修复API配置
   - 更新`openclaw.json`中的模型配置
   - 确保使用正确的API参数
   - 测试API连接

3. **任务3**：修复CSP错误
   - 更新CSP配置，允许Google Fonts
   - 测试UI显示

4. **任务4**：验证系统状态
   - 启动完整系统
   - 测试所有功能
   - 确认所有错误已解决

## 预期结果
- ✅ Gateway服务正常运行
- ✅ 豆包API连接成功
- ✅ UI显示正常，无CSP错误
- ✅ 系统稳定运行，无错误信息