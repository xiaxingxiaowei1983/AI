# Agent Communication Protocol

## 1. 概述

本协议定义了 AI 代理团队内部的通信标准和规范，确保代理之间能够高效、准确地交换信息和协作。

## 2. 通信模式

### 2.1 消息类型

#### 2.1.1 命令消息 (Command)
- **用途**: 上级代理向下级代理发送任务指令
- **格式**:
  ```json
  {
    "type": "command",
    "id": "unique-message-id",
    "from": "agent-name",
    "to": "agent-name",
    "timestamp": "2024-01-01T00:00:00Z",
    "content": {
      "task": "task-description",
      "priority": "high|medium|low",
      "deadline": "2024-01-02T00:00:00Z",
      "context": { /* 任务相关上下文 */ }
    }
  }
  ```

#### 2.1.2 状态更新消息 (Status Update)
- **用途**: 代理向其他代理更新任务执行状态
- **格式**:
  ```json
  {
    "type": "status_update",
    "id": "unique-message-id",
    "from": "agent-name",
    "to": "agent-name|broadcast",
    "timestamp": "2024-01-01T00:00:00Z",
    "content": {
      "task_id": "task-id",
      "status": "pending|in_progress|completed|failed",
      "progress": 0-100,
      "message": "status-message"
    }
  }
  ```

#### 2.1.3 信息请求消息 (Information Request)
- **用途**: 代理向其他代理请求信息
- **格式**:
  ```json
  {
    "type": "info_request",
    "id": "unique-message-id",
    "from": "agent-name",
    "to": "agent-name",
    "timestamp": "2024-01-01T00:00:00Z",
    "content": {
      "request_type": "request-category",
      "query": "information-query",
      "context": { /* 请求相关上下文 */ }
    }
  }
  ```

#### 2.1.4 信息响应消息 (Information Response)
- **用途**: 代理响应信息请求
- **格式**:
  ```json
  {
    "type": "info_response",
    "id": "unique-message-id",
    "from": "agent-name",
    "to": "agent-name",
    "timestamp": "2024-01-01T00:00:00Z",
    "content": {
      "request_id": "original-request-id",
      "data": { /* 请求的信息 */ },
      "status": "success|failed",
      "message": "response-message"
    }
  }
  ```

#### 2.1.5 协作请求消息 (Collaboration Request)
- **用途**: 代理请求其他代理协作
- **格式**:
  ```json
  {
    "type": "collaboration_request",
    "id": "unique-message-id",
    "from": "agent-name",
    "to": "agent-name",
    "timestamp": "2024-01-01T00:00:00Z",
    "content": {
      "collaboration_type": "collaboration-category",
      "description": "collaboration-description",
      "deadline": "2024-01-02T00:00:00Z",
      "context": { /* 协作相关上下文 */ }
    }
  }
  ```

## 3. 通信渠道

### 3.1 内部消息总线
- **用途**: 代理间的主要通信渠道
- **特性**: 实时、可靠、安全
- **实现**: 基于事件的消息系统

### 3.2 共享知识库
- **用途**: 存储和共享结构化信息
- **特性**: 持久化、可搜索、版本控制
- **实现**: 基于 Convex 数据库

### 3.3 紧急通信
- **用途**: 紧急情况下的直接通信
- **特性**: 优先级高、实时通知
- **实现**: 基于 Telegram Bot

## 4. 通信规则

### 4.1 消息传递规则
- **消息必须包含唯一 ID**，用于追踪和确认
- **消息必须包含时间戳**，用于排序和时效性判断
- **消息必须包含发送者和接收者**，用于权限控制
- **消息内容必须结构化**，遵循预定义格式

### 4.2 消息处理规则
- **消息处理必须及时**，一般情况下应在 5 秒内响应
- **消息处理必须可靠**，确保消息不丢失
- **消息处理必须安全**，确保敏感信息不泄露
- **消息处理必须可追踪**，记录处理过程和结果

### 4.3 冲突解决规则
- **优先级原则**: 高优先级任务优先处理
- **时间戳原则**: 最新消息优先处理
- **权威性原则**: 上级代理的指令优先执行
- **共识原则**: 涉及多个代理的决策需达成共识

## 5. 错误处理

### 5.1 消息错误
- **格式错误**: 拒绝处理并返回错误信息
- **权限错误**: 拒绝处理并返回权限不足信息
- **超时错误**: 超时未响应视为失败

### 5.2 处理错误
- **执行错误**: 记录错误并通知相关代理
- **依赖错误**: 等待依赖任务完成后重试
- **资源错误**: 释放资源并通知资源管理器

## 6. 性能优化

### 6.1 消息优化
- **消息压缩**: 减少消息大小
- **批量处理**: 合并多个小消息
- **消息过滤**: 只处理相关消息

### 6.2 处理优化
- **并行处理**: 同时处理多个消息
- **缓存机制**: 缓存频繁访问的信息
- **负载均衡**: 均衡代理负载

## 7. 安全措施

### 7.1 消息安全
- **消息加密**: 保护消息内容
- **消息签名**: 验证消息来源
- **访问控制**: 限制消息访问权限

### 7.2 系统安全
- **防火墙**: 保护通信系统
- **入侵检测**: 检测异常访问
- **安全审计**: 记录所有通信活动

## 8. 版本控制

### 8.1 协议版本
- **当前版本**: 1.0
- **版本兼容性**: 向下兼容
- **版本升级**: 平滑升级机制

### 8.2 消息版本
- **消息版本标记**: 每个消息包含版本信息
- **版本转换**: 自动处理不同版本消息

## 9. 测试与监控

### 9.1 测试
- **单元测试**: 测试消息处理逻辑
- **集成测试**: 测试代理间协作
- **压力测试**: 测试系统承载能力

### 9.2 监控
- **消息监控**: 监控消息传递状态
- **性能监控**: 监控系统性能指标
- **错误监控**: 监控系统错误率

## 10. 附录

### 10.1 消息格式示例

#### 命令消息示例
```json
{
  "type": "command",
  "id": "cmd-20240101-001",
  "from": "master",
  "to": "production",
  "timestamp": "2024-01-01T10:00:00Z",
  "content": {
    "task": "实现任务看板页面",
    "priority": "high",
    "deadline": "2024-01-02T18:00:00Z",
    "context": {
      "requirements": "包含任务卡片、状态列、优先级标签",
      "reference": "https://example.com/task-board-design"
    }
  }
}
```

#### 状态更新消息示例
```json
{
  "type": "status_update",
  "id": "status-20240101-001",
  "from": "production",
  "to": "master",
  "timestamp": "2024-01-01T12:00:00Z",
  "content": {
    "task_id": "task-20240101-001",
    "status": "in_progress",
    "progress": 50,
    "message": "任务看板页面已完成一半，正在实现状态列功能"
  }
}
```

### 10.2 通信流程图

```
+----------+      Command      +----------+
|  Master  | ----------------> | Production |
+----------+                   +----------+
       ^                          |
       |       Status Update      |
       +--------------------------+
```

### 10.3 术语表

- **Agent**: AI 代理，系统的基本工作单元
- **Message**: 通信消息，代理间交换的信息
- **Protocol**: 通信协议，定义消息格式和交互规则
- **Bus**: 消息总线，消息传递的基础设施
- **Knowledge Base**: 知识库，存储共享信息的系统
