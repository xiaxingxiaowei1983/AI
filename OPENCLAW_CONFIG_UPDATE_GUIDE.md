# OpenClaw配置手动更新指南

## 需要更新的文件
C:\Users\10919\.openclaw\openclaw.json

## 找到agents.list中的main配置，替换为以下内容：

`json
{
  "id": "main",
  "name": "大宗师",
  "description": "AWKN LAB战略中枢，负责微信个人号运营和顶层决策",
  "workspace": "C:/Users/10919/Desktop/AI",
  "model": "bailian/qwen3.5-plus",
  "tools": {
    "enabled": ["fs", "exec", "search", "git"],
    "fs": {
      "workspaceOnly": false,
      "allowPaths": [
        "C:/Users/10919/Desktop/AI",
        "C:/Users/10919/Desktop/AI/agents",
        "C:/Users/10919/Desktop/AI/agents/master",
        "C:/Users/10919/Desktop/AI/agents/coo",
        "C:/Users/10919/Desktop/AI/agents/cto",
        "C:/Users/10919/Desktop/AI/agents/green-tea",
        "C:/Users/10919/Desktop/AI/agents/business",
        "C:/Users/10919/Desktop/AI/agents/life",
        "C:/Users/10919/Desktop/AI/.trae",
        "C:/Users/10919/Desktop/AI/evolver"
      ]
    },
    "exec": {
      "allowedCommands": ["node", "npm", "git", "code", "python", "powershell"]
    }
  },
  "agentConfig": {
    "configPath": "C:/Users/10919/Desktop/AI/agents/master/config.json",
    "promptPath": "C:/Users/10919/Desktop/AI/agents/master/agent.prompt"
  }
}
`

## 更新步骤：
1. 打开 C:\Users\10919\.openclaw\openclaw.json
2. 找到 "id": "main" 的配置块
3. 替换为上面的配置内容
4. 保存文件
5. 重启OpenClaw网关: openclaw gateway restart

## 验证：
运行: openclaw status
确认大宗师(main)显示正常

