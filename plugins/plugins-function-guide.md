# OpenClaw 插件详细功能说明

## 飞书插件 (feishu)

### 消息工具
| 工具名 | 功能 | 示例 |
|--------|------|------|
| feishu_message.send | 发送消息 | 发送文本、Markdown、卡片 |
| feishu_message.broadcast | 广播消息 | 多群同时发送 |
| feishu_message.reply | 回复消息 | 引用回复 |

### 用户工具
| 工具名 | 功能 | 示例 |
|--------|------|------|
| feishu_user.get | 获取用户信息 | 获取姓名、部门 |
| feishu_user.list | 列出用户 | 群成员列表 |

### 文档工具
| 工具名 | 功能 | 示例 |
|--------|------|------|
| feishu_doc.create | 创建文档 | 创建云文档 |
| feishu_doc.read | 读取文档 | 获取文档内容 |
| feishu_doc.write | 写入文档 | 编辑文档 |
| feishu_doc.export | 导出文档 | 导出为 Markdown |

### 云盘工具
| 工具名 | 功能 | 示例 |
|--------|------|------|
| feishu_drive.list | 列出文件 | 查看文件夹内容 |
| feishu_drive.upload | 上传文件 | 上传本地文件 |
| feishu_drive.download | 下载文件 | 下载到本地 |
| feishu_drive.move | 移动文件 | 变更文件位置 |
| feishu_drive.delete | 删除文件 | 删除云端文件 |

### 表格工具
| 工具名 | 功能 | 示例 |
|--------|------|------|
| feishu_bitable.list_fields | 列出字段 | 查看表格结构 |
| feishu_bitable.list_records | 列出记录 | 查询数据 |
| feishu_bitable.create_record | 创建记录 | 添加数据行 |
| feishu_bitable.update_record | 更新记录 | 修改数据 |
| feishu_bitable.delete_record | 删除记录 | 删除数据行 |

### 任务工具
| 工具名 | 功能 | 示例 |
|--------|------|------|
| feishu_task.create | 创建任务 | 添加待办 |
| feishu_task.get | 获取任务 | 查询任务详情 |
| feishu_task.update | 更新任务 | 修改任务状态 |
| feishu_task.delete | 删除任务 | 移除任务 |

---

## 钉钉插件 (dingtalk-connector)

| 工具名 | 功能 | 示例 |
|--------|------|------|
| dingtalk.send_ai_card | 发送 AI 卡片 | 发送富文本卡片 |
| dingtalk.send_message | 发送消息 | 群聊消息 |

---

## Kimi Claw 插件 (kimi-claw)

| 工具名 | 功能 | 示例 |
|--------|------|------|
| kimi.chat | 对话 | 与 Kimi 对话 |
| kimi.upload_file | 上传文件 | 上传文档分析 |
| kimi.get_balance | 查询余额 | 查看 API 额度 |

---

## Kimi Search 插件 (kimi-search)

| 工具名 | 功能 | 示例 |
|--------|------|------|
| kimi_search.web | 网页搜索 | 实时搜索信息 |
| kimi_search.news | 新闻搜索 | 获取最新新闻 |

---

## 使用示例

### 飞书发送消息
```javascript
await feishu_message.send({
  target: "chat:oc_xxx",
  message: "你好，世界！"
});
```

### 创建云文档
```javascript
await feishu_doc.create({
  title: "我的文档",
  content: "# 标题\n\n正文"
});
```

### 上传文件
```javascript
await feishu_drive.upload({
  file_path: "/tmp/report.pdf",
  folder_token: "root"
});
```

### 查询表格
```javascript
await feishu_bitable.list_records({
  app_token: "xxx",
  table_id: "xxx"
});
```

### Kimi 对话
```javascript
await kimi.chat({
  message: "解释一下量子计算",
  model: "kimi-coding/k2p5"
});
```

---

## 配置示例

```json
{
  "plugins": {
    "entries": {
      "feishu": {
        "enabled": true,
        "appId": "cli_xxx",
        "appSecret": "xxx"
      },
      "dingtalk-connector": {
        "enabled": false
      },
      "kimi-claw": {
        "enabled": true,
        "apiKey": "sk-xxx"
      },
      "kimi-search": {
        "enabled": true
      }
    }
  }
}
```
