# OpenClaw 问题复盘与解决方案

## 一、问题概述

### 1. 核心问题清单
- **CSP 内容安全策略错误**：浏览器拦截 Google 字体加载
- **Gateway token missing 错误**：认证令牌缺失
- **API provider 注册错误**：火山引擎配置问题
- **端口冲突问题**：18789 和 18790 端口占用
- **浏览器控制界面 Unauthorized 错误**：认证失败
- **飞书 WebSocket 连接问题**：长连接配置
- **网关退出问题**：服务稳定性

### 2. 系统状态概览
- **当前版本**：OpenClaw 中文版 2026.2.24 (51d76eb)
- **Node.js 版本**：v24.13.0
- **网关端口**：18789 (WebSocket)、18791 (浏览器控制界面)
- **飞书通道**：WebSocket 模式已启用
- **AI 模型**：火山引擎豆包 (ep-20260225031321-nvprc)

## 二、问题详细分析

### 1. CSP 内容安全策略错误
**错误信息**：
```
Loading the stylesheet 'https://fonts.googleapis.com/css2...' violates the following Content Security Policy directive
```

**根本原因**：
- OpenClaw 浏览器控制界面的 CSP 策略过于严格，不允许加载外部字体资源
- index.html 中的 Content-Security-Policy meta 标签缺少对 Google 字体的允许

**解决方案**：
- 创建 CSP 代理服务器来修改 CSP 头
- 或修改 index.html 中的 CSP 规则，添加对 Google 字体的允许

### 2. Gateway token missing 错误
**错误信息**：
```
unauthorized: gateway token missing
```

**根本原因**：
- OpenClaw 网关启用了 token 认证机制
- 启动网关时未指定 token 参数
- 配置文件中的 token 未被正确读取



### 3. API provider 注册错误
**错误信息**：
```
No API provider registered for api: undefined
```

**根本原因**：
- 火山引擎 API 配置不完整或错误
- API Key、Endpoint ID、Base URL 配置缺失或不正确
- 默认模型指向错误



### 4. 端口冲突问题
**错误信息**：
```
Port 18789 is already in use
```

**根本原因**：
- 之前的 node.exe 进程未完全终止
- 端口被占用导致新的网关实例无法启动



### 5. 浏览器控制界面 Unauthorized 错误
**错误信息**：
```
http://127.0.0.1:18791/ 显示 Unauthorized
```

**根本原因**：
- OpenClaw 浏览器控制界面启用了 token 认证
- 访问时未提供正确的 token



### 6. 飞书 WebSocket 连接问题
**错误信息**：
- WebSocket 连接失败



### 7. 网关退出问题
**错误信息**：
- 网关服务自动退出
- RPC probe 失败



## 三、最近日志分析

### 最新日志摘要（2026-02-27）

```
00:38:54 info gateway {"subsystem":"gateway"} feishu_doc: Registered feishu_doc, feishu_app_scopes
00:38:54 info gateway {"subsystem":"gateway"} feishu_wiki: Registered feishu_wiki tool
00:38:54 info gateway {"subsystem":"gateway"} feishu_drive: Registered feishu_drive tool
00:38:54 debug gateway {"subsystem":"gateway"} feishu_perm: perm tool disabled in config (default: false)
00:38:54 info gateway {"subsystem":"gateway"} feishu_bitable: Registered bitable tools
00:38:54 info gateway/canvas {"subsystem":"gateway/canvas"} canvas host mounted at http://127.0.0.1:18789/__openclaw__/canvas/ (root C:\Users\10919\.openclaw\canvas)
00:38:55 info gateway/heartbeat {"subsystem":"gateway/heartbeat"} {"intervalMs":3600000} heartbeat: started
00:38:55 info gateway/health-monitor {"subsystem":"gateway/health-monitor"} started (interval: 300s, grace: 60s)
00:38:55 info gateway {"subsystem":"gateway"} agent model: volcano/ep-20260225031321-nvprc
00:38:55 info gateway {"subsystem":"gateway"} listening on ws://127.0.0.1:18789, ws://[::1]:18789 (PID 21408)
00:38:55 info gateway {"subsystem":"gateway"} log file: \tmp\openclaw\openclaw-2026-02-27.log
00:38:55 info [info]: [ 'client ready' ]
00:38:55 info browser/server {"subsystem":"browser/server"} Browser control listening on http://127.0.0.1:18791/ (auth=token)
00:38:55 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} starting feishu[default] (mode: websocket)
00:38:55 debug cron {"module":"cron","storePath":"C:\Users\10919\.openclaw\cron\jobs.json"} {"jobCount":0,"enabledCount":0,"withNextRun":0} cron: armTimer skipped - no jobs with nextRunAtMs
00:38:55 info cron {"module":"cron","storePath":"C:\Users\10919\.openclaw\cron\jobs.json"} {"enabled":true,"jobs":0,"nextWakeAtMs":null} cron: started
00:38:55 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: bot open_id resolved: ou_9fc2fcff851448ad46a6ba60af111567
00:38:55 info [info]: [ 'event-dispatch is ready' ]
00:38:55 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: starting WebSocket connection...
00:38:55 info [info]: [
  '[ws]',
  'receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:\n' +
    '        Developer Console(开发者后台) \n' +
    '          ->\n' +
    '        Events and Callbacks(事件与回调)\n' +
    '          -> \n' +
    '        Mode of event/callback subscription(订阅方式)\n' +
    '          -> \n' +
    '        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)'
]
00:38:55 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: WebSocket client started
00:38:56 info [info]: [ '[ws]', 'ws client ready' ]
00:38:56 info bonjour: advertised gateway fqdn=LAYPC (OpenClaw)._openclaw-gw._tcp.local. host=openclaw.local. port=18789 state=announcing
```

### 日志分析结论

**正常运行的服务**：
- ✅ 飞书相关工具注册成功（feishu_doc、feishu_wiki、feishu_drive、feishu_bitable）
- ✅ Canvas 服务正常挂载
- ✅ 心跳监控服务启动
- ✅ 健康监控服务启动
- ✅ AI 模型配置正确（volcano/ep-20260225031321-nvprc）
- ✅ WebSocket 网关正常监听（18789 端口）
- ✅ 浏览器控制界面正常启动（18791 端口，启用 token 认证）


**潜在问题**：
- ⚠️ 未发现消息处理相关日志，可能是因为未收到飞书消息
- ⚠️ 未看到模型调用和回复发送的日志

## 四、最近20分钟日志分析（2026-02-27）

### 关键事件日志

```
00:54:40 info gateway/ws {"subsystem":"gateway/ws"} webchat connected conn=5c9bfce5-ee63-411d-a20a-db4623cfc477 remote=127.0.0.1 client=openclaw-control-ui webchat vdev
00:54:40 info gateway/ws {"subsystem":"gateway/ws"} ⇄ res ✓ tools.catalog 56ms conn=5c9bfce5…c477 id=f7d079f2…fdc6
00:54:40 info gateway/ws {"subsystem":"gateway/ws"} ⇄ res ✓ node.list 99ms conn=5c9bfce5…c477 id=9bb1b8de…dcd2
00:54:40 info gateway/ws {"subsystem":"gateway/ws"} ⇄ res ✓ device.pair.list 85ms conn=5c9bfce5…c477 id=c22931a3…d58e
00:54:40 info gateway/ws {"subsystem":"gateway/ws"} ⇄ res ✓ chat.history 454ms conn=5c9bfce5…c477 id=a2ba5df0…6558
00:54:50 info gateway/ws {"subsystem":"gateway/ws"} ⇄ res ✓ chat.send 164ms runId=4848e57f-de1f-4126-9dce-b84947fa6157 conn=5c9bfce5…c477 id=6e236c3f…0701
00:54:51 debug diagnostic {"subsystem":"diagnostic"} lane enqueue: lane=session:agent:main:main queueSize=1
00:54:51 debug diagnostic {"subsystem":"diagnostic"} lane dequeue: lane=session:agent:main:main waitMs=99 queueSize=0
00:54:51 debug diagnostic {"subsystem":"diagnostic"} lane enqueue: lane=main queueSize=1
00:54:51 debug diagnostic {"subsystem":"diagnostic"} lane dequeue: lane=main waitMs=2 queueSize=0
00:54:51 debug agent/embedded {"subsystem":"agent/embedded"} embedded run start: runId=4848e57f-de1f-4126-9dce-b84947fa6157 sessionId=85a02297-8323-4cb7-b157-d05cd7830742 provider=volcano model=ep-20260225031321-nvprc thinking=off messageChannel=webchat
00:54:52 debug diagnostic {"subsystem":"diagnostic"} run registered: sessionId=85a02297-8323-4cb7-b157-d05cd7830742 totalActive=1
00:54:52 debug agent/embedded {"subsystem":"agent/embedded"} embedded run prompt start: runId=4848e57f-de1f-4126-9dce-b84947fa6157 sessionId=85a02297-8323-4cb7-b157-d05cd7830742
00:54:52 debug agent/embedded {"subsystem":"agent/embedded"} embedded run agent start: runId=4848e57f-de1f-4126-9dce-b84947fa6157
00:54:52 error [openclaw] Unhandled promise rejection: Error: No API provider registered for api: undefined
    at resolveApiProvider (file:///C:/Users/10919/AppData/Roaming/npm/node_modules/@qingchencloud/openclaw-zh/node_modules/@mariozechner/pi-ai/src/stream.ts:21:9)
    at streamSimple (file:///C:/Users/10919/AppData/Roaming/npm/node_modules/@qingchencloud/openclaw-zh/node_modules/@mariozechner/pi-ai/src/stream.ts:49:19)
    at file:///C:/Users/10919/AppData/Roaming/npm/node_modules/@qingchencloud/openclaw-zh/dist/reply-BRoOpBhJ.js:62535:10
    at file:///C:/Users/10919/AppData/Roaming/npm/node_modules/@qingchencloud/openclaw-zh/dist/reply-BRoOpBhJ.js:62341:49
    at streamAssistantResponse (file:///C:/Users/10919/AppData/Roaming/npm/node_modules/@qingchencloud/openclaw-zh/node_modules/@mariozechner/pi-agent-core/src/agent-loop.ts:233:25)
    at runLoop (file:///C:/Users/10919/AppData/Roaming/npm/node_modules/@qingchencloud/openclaw-zh/node_modules/@mariozechner/pi-agent-core/src/agent-loop.ts:141:20)
    at file:///C:/Users/10919/AppData/Roaming/npm/node_modules/@qingchencloud/openclaw-zh/node_modules/@mariozechner/pi-agent-core/src/agent-loop.ts:51:3

01:01:56 info gateway {"subsystem":"gateway"} feishu_doc: Registered feishu_doc, feishu_app_scopes
01:01:56 info gateway {"subsystem":"gateway"} feishu_wiki: Registered feishu_wiki tool
01:01:56 info gateway {"subsystem":"gateway"} feishu_drive: Registered feishu_drive tool
01:01:56 debug gateway {"subsystem":"gateway"} feishu_perm: perm tool disabled in config (default: false)
01:01:56 info gateway {"subsystem":"gateway"} feishu_bitable: Registered bitable tools
01:01:56 info gateway/canvas {"subsystem":"gateway/canvas"} canvas host mounted at http://127.0.0.1:18789/__openclaw__/canvas/ (root C:\Users\10919\.openclaw\canvas)
01:01:56 info gateway/heartbeat {"subsystem":"gateway/heartbeat"} {"intervalMs":3600000} heartbeat: started
01:01:56 info gateway/health-monitor {"subsystem":"gateway/health-monitor"} started (interval: 300s, grace: 60s)
01:01:56 info gateway {"subsystem":"gateway"} agent model: volcano/ep-20260225031321-nvprc
01:01:56 info gateway {"subsystem":"gateway"} listening on ws://127.0.0.1:18789, ws://[::1]:18789 (PID 7800)
01:01:56 info gateway {"subsystem":"gateway"} log file: \tmp\openclaw\openclaw-2026-02-27.log
01:01:56 info [info]: [ 'client ready' ]
01:01:56 info browser/server {"subsystem":"browser/server"} Browser control listening on http://127.0.0.1:18791/ (auth=token)
01:01:56 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} starting feishu[default] (mode: websocket)
01:01:56 debug cron {"module":"cron","storePath":"C:\Users\10919\.openclaw\cron\jobs.json"} {"jobCount":0,"enabledCount":0,"withNextRun":0} cron: armTimer skipped - no jobs with nextRunAtMs
01:01:56 info cron {"module":"cron","storePath":"C:\Users\10919\.openclaw\cron\jobs.json"} {"enabled":true,"jobs":0,"nextWakeAtMs":null} cron: started
01:01:57 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: bot open_id resolved: ou_9fc2fcff851448ad46a6ba60af111567
01:01:57 info [info]: [ 'event-dispatch is ready' ]
01:01:57 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: starting WebSocket connection...
01:01:57 info [info]: [
  '[ws]',
  'receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:\n' +
    '        Developer Console(开发者后台) \n' +
    '          ->\n' +
    '        Events and Callbacks(事件与回调)\n' +
    '          -> \n' +
    '        Mode of event/callback subscription(订阅方式)\n' +
    '          -> \n' +
    '        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)'
]
01:01:57 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: WebSocket client started
01:01:57 info [info]: [ '[ws]', 'ws client ready' ]
01:01:57 info bonjour: advertised gateway fqdn=LAYPC (OpenClaw)._openclaw-gw._tcp.local. host=openclaw.local. port=18789 state=announcing
01:02:04 info gateway/ws {"subsystem":"gateway/ws"} webchat connected conn=7d497110-d8ec-4cee-931f-c7ed8bd19a3c remote=127.0.0.1 client=openclaw-control-ui webchat vdev
01:02:04 info gateway/ws {"subsystem":"gateway/ws"} ⇄ res ✓ chat.history 56ms conn=7d497110…9a3c id=00894529…f3a3

01:04:58 info gateway {"subsystem":"gateway"} feishu_doc: Registered feishu_doc, feishu_app_scopes
01:04:58 info gateway {"subsystem":"gateway"} feishu_wiki: Registered feishu_wiki tool
01:04:58 info gateway {"subsystem":"gateway"} feishu_drive: Registered feishu_drive tool
01:04:58 debug gateway {"subsystem":"gateway"} feishu_perm: perm tool disabled in config (default: false)
01:04:58 info gateway {"subsystem":"gateway"} feishu_bitable: Registered bitable tools
01:04:58 info gateway/canvas {"subsystem":"gateway/canvas"} canvas host mounted at http://127.0.0.1:18789/__openclaw__/canvas/ (root C:\Users\10919\.openclaw\canvas)
01:04:58 info gateway/heartbeat {"subsystem":"gateway/heartbeat"} {"intervalMs":3600000} heartbeat: started
01:04:58 info gateway/health-monitor {"subsystem":"gateway/health-monitor"} started (interval: 300s, grace: 60s)
01:04:58 info gateway {"subsystem":"gateway"} agent model: volcano/ep-20260225031321-nvprc
01:04:58 info gateway {"subsystem":"gateway"} listening on ws://127.0.0.1:18789, ws://[::1]:18789 (PID 9444)
01:04:58 info gateway {"subsystem":"gateway"} log file: \tmp\openclaw\openclaw-2026-02-27.log
01:04:58 info [info]: [ 'client ready' ]
01:04:58 info browser/server {"subsystem":"browser/server"} Browser control listening on http://127.0.0.1:18791/ (auth=token)
01:04:58 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} starting feishu[default] (mode: websocket)
01:04:58 debug cron {"module":"cron","storePath":"C:\Users\10919\.openclaw\cron\jobs.json"} {"jobCount":0,"enabledCount":0,"withNextRun":0} cron: armTimer skipped - no jobs with nextRunAtMs
01:04:58 info cron {"module":"cron","storePath":"C:\Users\10919\.openclaw\cron\jobs.json"} {"enabled":true,"jobs":0,"nextWakeAtMs":null} cron: started
01:04:58 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: bot open_id resolved: ou_9fc2fcff851448ad46a6ba60af111567
01:04:58 info [info]: [ 'event-dispatch is ready' ]
01:04:58 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: starting WebSocket connection...
01:04:58 info [info]: [
  '[ws]',
  'receive events or callbacks through persistent connection only available in self-build & Feishu app, Configured in:\n' +
    '        Developer Console(开发者后台) \n' +
    '          ->\n' +
    '        Events and Callbacks(事件与回调)\n' +
    '          -> \n' +
    '        Mode of event/callback subscription(订阅方式)\n' +
    '          -> \n' +
    '        Receive events/callbacks through persistent connection(使用 长连接 接收事件/回调)'
]
01:04:58 info gateway/channels/feishu {"subsystem":"gateway/channels/feishu"} feishu[default]: WebSocket client started
01:04:59 info [info]: [ '[ws]', 'ws client ready' ]
01:04:59 info bonjour: advertised gateway fqdn=LAYPC (OpenClaw)._openclaw-gw._tcp.local. host=openclaw.local. port=18789 state=announcing
01:05:09 info gateway/ws {"subsystem":"gateway/ws"} webchat connected conn=159f862b-4b97-40e1-a3fb-32f4ae17284a remote=127.0.0.1 client=openclaw-control-ui webchat vdev
01:05:09 info gateway/ws {"subsystem":"gateway/ws"} ⇄ res ✓ chat.history 74ms conn=159f862b…284a id=980e03e2…ee3d
```

### 事件时间线分析

1. **00:54:40** - 浏览器控制界面连接成功
2. **00:54:50** - 收到聊天消息并开始处理
3. **00:54:52** - 出现 API provider 错误：`No API provider registered for api: undefined`
4. **01:01:56** - 网关重新启动
5. **01:02:04** - 浏览器控制界面再次连接
6. **01:04:58** - 网关再次启动
7. **01:05:09** - 浏览器控制界面连接

### 最新问题分析

**发现的新问题**：
- ❌ **API provider 注册错误**：在处理消息时出现 `No API provider registered for api: undefined` 错误
- ❌ **模型调用失败**：消息处理过程中出现未处理的 promise 拒绝
- ⚠️ **网关服务不稳定**：服务在运行过程中自动重启了多次

**持续存在的问题**：
- ⚠️ **飞书消息处理**：未看到飞书消息处理的相关日志
- ⚠️ **浏览器控制界面认证**：需要使用 token 访问

## 五、当前系统状态




### 3. 网络状态
- **端口监听**：18789、18791、18792 端口均正常监听
- **连接状态**：飞书 WebSocket 连接已建立
- **本地访问**：仅允许本地客户端连接


### 2. 待验证的问题
- ⚠️ 浏览器控制界面 Unauthorized 错误：需要使用 token 访问
- ⚠️ 网关退出问题：需要持续监控服务稳定性
- ⚠️ 消息处理链路：需要验证飞书消息处理是否正常

## 六、技术要点

### 1. OpenClaw 架构理解
- **网关模式**：支持 local 和 gateway 两种模式
- **认证机制**：使用 token 保护浏览器控制界面
- **通道管理**：支持多种消息通道，包括飞书
- **模型管理**：支持多模型接入，通过 provider 配置

### 2. 飞书集成要点
- **连接模式**：推荐使用 WebSocket 长连接模式
- **权限配置**：需要在飞书开发者后台正确配置权限
- **事件订阅**：需要启用相应的事件订阅
- **消息处理**：通过 agent 配置指定处理消息的智能体

### 3. 排查技巧
- **配置验证**：使用 `openclaw config validate` 验证配置
- **端口检查**：使用 `netstat -ano | findstr :187` 检查端口
- **进程管理**：使用 `taskkill /F /IM node.exe` 清理进程
- **日志分析**：使用 `openclaw logs` 查看详细日志
- **服务状态**：使用 `openclaw gateway status` 检查网关状态

## 七、附录

### 1. 重要配置文件路径
- **主配置文件**：`C:\Users\10919\.openclaw\openclaw.json`
- **工作目录配置**：`c:\Users\10919\Desktop\AI\openclaw.json`
- **日志文件**：`\tmp\openclaw\openclaw-2026-02-27.log`

### 2. 关键命令
- **启动网关**：`openclaw gateway start --port 18789`
- **停止网关**：`openclaw gateway stop`
- **重启网关**：`openclaw gateway restart`
- **查看状态**：`openclaw gateway status`
- **查看日志**：`openclaw logs`
- **验证配置**：`openclaw config validate`
- **清理进程**：`taskkill /F /IM node.exe`

### 3. 认证信息
- **认证模式**：token
- **Token 值**：`2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da`
- **访问 URL**：`http://127.0.0.1:18791/?token=2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da`

### 4. 飞书配置
- **App ID**：`cli_a91012cd0ab89bc9`
- **App Secret**：`W2dl8mRwy7ArghhqZSp9heG8i3I2FVP5`
- **模式**：WebSocket


### 5. 火山引擎配置
- **Base URL**：`https://ark.cn-beijing.volces.com/api/v3`
- **API Key**：`c13b2982-XXX`
- **Endpoint ID**：`ep-20260225031321-nvprc`
- **模型名称**：