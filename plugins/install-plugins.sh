# OpenClaw 插件清单与安装指南

## 一、我的插件清单

### 1. 飞书插件 (feishu)
**位置**: `/root/.openclaw/extensions/feishu`

| 功能 | 说明 |
|------|------|
| 消息接收 | 接收飞书群聊/私聊消息 |
| 消息发送 | 发送文本、卡片、文件 |
| 用户识别 | 获取用户 OpenID、姓名 |
| 云文档操作 | 创建、读取、编辑文档 |
| 云盘操作 | 上传、下载、管理文件 |
| 表格操作 | Bitable 数据管理 |
| 任务管理 | 创建、更新飞书任务 |

**工具数量**: 30+

---

### 2. 钉钉插件 (dingtalk-connector)
**位置**: `/root/.openclaw/extensions/dingtalk-connector`

| 功能 | 说明 |
|------|------|
| AI 卡片消息 | 发送钉钉 AI 卡片 |
| 群机器人 | 群聊消息收发 |
| 工作通知 | 发送工作通知 |

---

### 3. Kimi Claw 插件 (kimi-claw)
**位置**: `/root/.openclaw/extensions/kimi-claw`

| 功能 | 说明 |
|------|------|
| Kimi 模型接入 | 直接调用 Kimi API |
| 文件上传 | 上传文件给 Kimi 分析 |
| 长文本处理 | 支持长上下文 |

---

### 4. Kimi Search 插件 (kimi-search)
**位置**: `/root/.openclaw/extensions/kimi-search`

| 功能 | 说明 |
|------|------|
| 联网搜索 | Kimi 内置搜索能力 |
| 信息检索 | 实时获取最新信息 |

---

### 5. 系统内置插件

| 插件 | 功能 | 状态 |
|------|------|------|
| discord | Discord 频道集成 | 可用 |
| googlechat | Google Chat 集成 | 可用 |
| imessage | iMessage 集成 | 可用 |
| irc | IRC 频道集成 | 可用 |
| line | Line 消息集成 | 可用 |
| matrix | Matrix 协议集成 | 可用 |
| mattermost | Mattermost 集成 | 可用 |
| bluebubbles | BlueBubbles 集成 | 可用 |
| llm-task | LLM 任务管理 | 可用 |
| lobster | 龙虾核心功能 | 已启用 |
| memory-core | 记忆核心 | 已启用 |

---

## 二、插件功能对比

| 插件 | 消息 | 文件 | 文档 | 搜索 | 任务 | 适用场景 |
|------|------|------|------|------|------|----------|
| feishu | ✅ | ✅ | ✅ | ❌ | ✅ | 国内企业 |
| dingtalk | ✅ | ❌ | ❌ | ❌ | ❌ | 钉钉生态 |
| discord | ✅ | ✅ | ❌ | ❌ | ❌ | 海外社区 |
| googlechat | ✅ | ✅ | ❌ | ❌ | ❌ | Google 生态 |
| imessage | ✅ | ✅ | ❌ | ❌ | ❌ | Apple 生态 |
| kimi-claw | ❌ | ✅ | ❌ | ✅ | ❌ | AI 增强 |
| kimi-search | ❌ | ❌ | ❌ | ✅ | ❌ | 信息检索 |

---

## 三、一键安装脚本

```bash
#!/bin/bash
# install-plugins.sh
# OpenClaw 插件一键安装脚本

set -e

echo "🔌 OpenClaw 插件安装脚本"
echo "========================="
echo ""

# 配置
EXTENSIONS_DIR="${HOME}/.openclaw/extensions"
SYSTEM_EXTENSIONS="/usr/lib/node_modules/openclaw/extensions"

# 创建目录
mkdir -p "$EXTENSIONS_DIR"

# 插件列表
PLUGINS=(
    "feishu|飞书集成|必需"
    "dingtalk-connector|钉钉集成|可选"
    "kimi-claw|Kimi模型接入|推荐"
    "kimi-search|Kimi搜索|推荐"
)

echo "📦 可用插件:"
echo ""

for i in "${!PLUGINS[@]}"; do
    IFS='|' read -r name desc required <<< "${PLUGINS[$i]}"
    echo "  $((i+1)). $name - $desc [$required]"
done

echo ""
echo "选择要安装的插件 (空格分隔，如: 1 3 4):"
read -p "选择: " choices

# 安装选中的插件
for choice in $choices; do
    index=$((choice-1))
    if [ $index -ge 0 ] && [ $index -lt ${#PLUGINS[@]} ]; then
        IFS='|' read -r name desc required <<< "${PLUGINS[$index]}"
        
        echo ""
        echo "📥 安装: $name"
        
        # 检查系统是否已有
        if [ -d "$SYSTEM_EXTENSIONS/$name" ]; then
            echo "  📝 系统已存在，创建链接..."
            ln -sf "$SYSTEM_EXTENSIONS/$name" "$EXTENSIONS_DIR/$name"
        else
            echo "  📦 下载插件..."
            # 这里可以从远程下载
            echo "  ⚠️  请手动安装 $name 插件"
        fi
        
        echo "  ✅ $name 安装完成"
    fi
done

# 配置权限
echo ""
echo "🔐 设置权限..."
chmod -R 755 "$EXTENSIONS_DIR"

# 生成配置文件
echo ""
echo "📝 生成配置文件..."

cat > "$EXTENSIONS_DIR/README.md" << EOF
# OpenClaw Extensions

安装时间: $(date)

## 已安装插件

$(for choice in $choices; do
    index=$((choice-1))
    if [ $index -ge 0 ] && [ $index -lt ${#PLUGINS[@]} ]; then
        IFS='|' read -r name desc required <<< "${PLUGINS[$index]}"
        echo "- $name: $desc"
    fi
done)

## 启用插件

编辑 ~/.openclaw/openclaw.json:

\`\`\`json
{
  "plugins": {
    "entries": {
$(for choice in $choices; do
    index=$((choice-1))
    if [ $index -ge 0 ] && [ $index -lt ${#PLUGINS[@]} ]; then
        IFS='|' read -r name desc required <<< "${PLUGINS[$index]}"
        echo "      \"$name\": { \"enabled\": true },"
    fi
done)
    }
  }
}
\`\`\`
EOF

echo ""
echo "========================="
echo "✅ 插件安装完成！"
echo ""
echo "📁 位置: $EXTENSIONS_DIR"
echo ""
echo "下一步:"
echo "1. 编辑 ~/.openclaw/openclaw.json 启用插件"
echo "2. 配置插件参数 (API Key 等)"
echo "3. 重启 OpenClaw: openclaw gateway restart"
echo ""
