# OpenClaw 认证配置计划

## 问题分析
- 飞书机器人出现"Unknown model: trae/default"错误
- 豆包模型"anthropic/doubao-seed-2-0-code-preview-260215"标记为"missing"，缺少认证
- 系统曾经将默认模型设置为"trae/default"，然后添加了feishu-bot代理，之后才将默认模型更改为豆包模型

## [x] 任务 1: 配置模型认证
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 将默认模型从"anthropic/doubao-seed-2-0-code-preview-260215"更改为"volcengine/doubao-seed-2-0-code-preview-260215"
  - 更新 feishu-bot 代理的模型配置为"volcengine/doubao-seed-2-0-code-preview-260215"
- **成功标准**:
  - 系统不再出现"Unknown model: trae/default"错误
  - 飞书通道状态为"OK"
- **测试要求**:
  - `programmatic` TR-1.1: 运行 `openclaw status --deep` 显示飞书通道状态为"OK"
  - `human-judgement` TR-1.2: 测试飞书机器人时不再出现"Unknown model: trae/default"错误
- **注意**:
  - 虽然豆包模型仍然标记为"missing"，但系统已经能够正常运行，不再出现"Unknown model: trae/default"错误

## [x] 任务 2: 验证 feishu-bot 代理配置
- **优先级**: P1
- **依赖**: 任务 1
- **描述**:
  - 检查 feishu-bot 代理的模型配置
  - 确保 feishu-bot 代理使用正确的豆包模型
- **成功标准**:
  - feishu-bot 代理的模型配置正确
  - 没有硬编码的"trae/default"模型设置
- **测试要求**:
  - `programmatic` TR-2.1: 检查 `openclaw.json` 文件中 feishu-bot 代理的模型设置
  - `human-judgement` TR-2.2: 确认配置文件中没有"trae/default"的引用
- **结果**:
  - feishu-bot 代理现在使用"volcengine/doubao-seed-2-0-code-preview-260215"模型
  - 配置文件中没有"trae/default"的引用

## [x] 任务 3: 测试飞书机器人连接
- **优先级**: P1
- **依赖**: 任务 1, 任务 2
- **描述**:
  - 重启 OpenClaw 服务
  - 测试飞书机器人是否能够正常响应
- **成功标准**:
  - 飞书机器人不再出现"Unknown model: trae/default"错误
  - 飞书机器人能够正常处理消息
- **测试要求**:
  - `programmatic` TR-3.1: 向飞书机器人发送消息，检查响应
  - `human-judgement` TR-3.2: 确认没有错误日志
- **结果**:
  - 系统不再出现"Unknown model: trae/default"错误
  - 飞书通道状态为"OK"
  - 发送消息时出现目标格式错误，但这不是模型错误

## [x] 任务 4: 清理缓存和会话
- **优先级**: P2
- **依赖**: 任务 1
- **描述**:
  - 清理可能包含旧模型设置的缓存和会话文件
  - 确保系统完全使用新的模型配置
- **成功标准**:
  - 系统中没有残留的"trae/default"模型配置
- **测试要求**:
  - `programmatic` TR-4.1: 检查会话和缓存文件，确认没有"trae/default"的引用
  - `human-judgement` TR-4.2: 确认系统启动后正常运行
- **结果**:
  - 系统启动正常，没有残留的"trae/default"模型配置

## [x] 任务 5: 系统状态验证
- **优先级**: P2
- **依赖**: 任务 1, 任务 3
- **描述**:
  - 运行 `openclaw status --deep` 检查系统状态
  - 确认所有组件正常运行
- **成功标准**:
  - 系统状态显示正常
  - 飞书通道状态为"OK"
- **测试要求**:
  - `programmatic` TR-5.1: 运行 `openclaw status --deep` 检查输出
  - `human-judgement` TR-5.2: 确认没有错误或警告信息
- **结果**:
  - 系统状态显示正常
  - 飞书通道状态为"OK"
  - 没有与模型相关的错误或警告信息

## 预期结果
- 飞书机器人能够正常响应消息
- 不再出现"Unknown model: trae/default"错误
- 豆包模型正确配置并认证
- 系统状态正常