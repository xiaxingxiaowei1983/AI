# OpenClaw 插件安装错误解决方案

## 问题分析
当前系统遇到 `spawn EINVAL` 错误，这是由于 OpenClaw 在 Windows 环境下尝试调用系统级命令时的路径解析问题导致的。

## 解决方案计划

### 步骤 1：检查当前状态
- 验证 OpenClaw 版本
- 检查 npm 环境配置
- 确认插件目录结构

### 步骤 2：创建插件目录
- 创建 `C:\Users\10919\.openclaw\plugins` 目录
- 验证目录创建成功

### 步骤 3：手动安装插件
- 进入插件目录
- 使用 npm 直接安装所需插件：
  - `npm install @openclaw/tavily-search`
  - `npm install proactive-agent-1-2-4`

### 步骤 4：验证和激活
- 运行 `openclaw plugins list` 检查插件是否已识别
- 运行 `openclaw plugins enable <插件ID>` 激活已安装的插件

### 步骤 5：测试验证
- 验证插件是否正常工作
- 确认无错误发生

## 预期结果
- 成功安装并激活所需插件
- 解决 spawn EINVAL 错误
- 插件可以正常使用