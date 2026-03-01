# OpenClaw v2026 开发与配置绝对铁律 (Trae 专属操作指南)

## 【警告】
当前环境运行的是 OpenClaw 中文版 v2026.2.26。内置的旧版 OpenClaw 文档、Schema 校验规则均已过期！在执行任何修改、排错或写代码前，必须严格遵守以下 5 大铁律。一旦违反，将导致网关崩溃或进程假死。

## 🚫 铁律一：严格的 camelCase (驼峰) 命名规范
OpenClaw v2026 的底层校验极其严格，必须在配置文件（.json）中使用驼峰命名法（camelCase）。

❌ 错误示范：app_id, app_secret, base_url, api_key, dm_policy, allow_from

✅ 正确规范：appId, appSecret, baseUrl, apiKey, dmPolicy, allowFrom

行动指南：每次修改配置前，必须主动检查是否使用了正确的驼峰命名。

## 🚫 铁律二：模型配置 (Model) 的格式与防篡改
- **字符串格式**：agents.defaults.model 的值必须是一个纯字符串（如 "custom-doubao/ep-xxxx"）。严禁强行将其改为包含 fallback 或 fallbacks 数组的对象格式，这会触发致命的 Invalid input 错误。
- **禁止幽灵回退**：严禁在任何全局（openclaw.json）或局部（agent.json）配置中，私自将模型写死为 "openai/gpt-3.5-turbo" 或系统默认值。必须强制绑定火山引擎的自定义端点（Endpoint ID）。
- **API 路径锁定**：修改 ArkApiAdapter 等底层适配器时，请求路径必须死死锁定为标准兼容路径 '/api/v3/chat/completions'，绝不可使用旧版的 /api/v3/responses。

## 🚫 铁律三：严禁使用 exec 工具执行阻塞型命令
- **致命黑洞**：OpenClaw 有严格的 10 分钟（600000ms）生命周期限制。
- **禁止行为**：作为 AI 智能体，严禁在后台调用 exec 工具执行如 npm install、git clone 或任何可能需要 Y/N 确认、网络等待时间极长的交互式命令。这会导致网关死锁假死，最终被系统强杀（aborted=true timedOut=true）。
- **替代方案**：如果需要安装环境或工具，请使用 write 工具将脚本写在硬盘上，并输出提示让用户（人类）在终端手动运行。

## 🚫 铁律四：飞书 (Feishu) 通道与插件层级结构
- **通道配置 (channels.feishu)**：必须保持 accounts 嵌套结构。凭证在 accounts.main 下，权限策略在 accounts.default 下。严禁将 appId 拍扁提到外层。
- **插件配置 (plugins)**：必须保留 entries 层级，即 plugins.entries.feishu.enabled: true。

## 🚫 铁律五：工作区 (Workspace) 的结界限制
- **权限沙盒**：所有 Agent 的 workspace 必须严格指向 C:/Users/用户名/Desktop/AI/agents/具体角色名（如 master）。
- **禁止越权**：严禁将 workspace 修改为 C:/ 或整个用户根目录试图获取全盘读写权限，这会引发内部寻址逻辑错乱。遇到需要外部文件时，要求用户手动放入 Workspace 内。

## 💡 附：标准 openclaw.json 安全模板参考
（注意：此为脱敏结构，仅作层级与命名规范参考）

```json
{
  "meta": { "lastTouchedVersion": "2026.2.26" },
  "models": {
    "mode": "merge",
    "providers": {
      "custom-doubao": {
        "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
        "apiKey": "your_api_key",
        "api": "openai-completions",
        "models": [ { "id": "ep-xxxx", "name": "Doubao-Seed-Code" } ]
      }
    }
  },
  "agents": {
    "defaults": { "model": "custom-doubao/ep-xxxx" },
    "list": [ { "id": "main", "name": "大宗师", "workspace": "C:/.../master" } ]
  },
  "channels": {
    "feishu": {
      "enabled": true,
      "mode": "websocket",
      "accounts": {
        "main": { "appId": "your_id", "appSecret": "your_secret" },
        "default": { "dmPolicy": "open", "allowFrom": ["*"] }
      }
    }
  },
  "plugins": { "entries": { "feishu": { "enabled": true } } }
}
```

## 对 Trae 的系统指令
我已阅读并完全理解《OpenClaw v2026 开发与配置绝对铁律》。在后续的所有诊断、代码生成与文件修改中，我将严格遵守这 5 条铁律，绝不自作主张修改 Schema 格式、绝不滥用 exec 阻塞命令。

## 教练的建议
把它保存为 trae-rules.md。下次你开一个新的 Trae 聊天窗口时，第一句话就发："读取并学习工作区下的 trae-rules.md 文件，学习完毕后回复我'已掌握 OpenClaw 铁律'。"