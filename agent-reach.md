# Agent-Reach 技能说明

## 是什么？

Agent-Reach 是一个让 AI Agent 能够读取外部平台内容的工具/协议。

## 两种类型

### 1. OpenClaw 插件版
- **包名：** openclaw-agent-reach
- **功能：** 连接 Nostr 去中心化网络
- **安装：** `npm install -g openclaw-agent-reach`
- **用途：** AI Agent 之间的通信

### 2. MCP 工具版（董小狐用的）
- 能读取：Twitter/X、YouTube、GitHub、B站、小红书
- 类似 MCP (Model Context Protocol) 的外部工具

## 主要功能

| 平台 | 功能 |
|------|------|
| Twitter/X | 读取帖子、搜索 |
| YouTube | 获取视频信息、字幕 |
| GitHub | 读取代码、Issue、PR |
| B站 | 获取视频信息、弹幕 |
| 小红书 | 读取笔记、搜索 |

## 安装使用

```bash
# OpenClaw 安装
npm install -g openclaw-agent-reach

# 或者用 MCP 版
# 需要配置相应的 API
```

## 相关包

- @anthropic-ai/claude-agent-sdk - Claude Code SDK
- nostr-tools - Nostr 协议工具

---
*信息来源：npm 官方库*
