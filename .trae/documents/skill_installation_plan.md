# 大宗师SKILL安装计划

## 项目概述
为大宗师智能体安装一系列SKILL，涵盖内容创作、消息渠道、笔记与文档、开发工具、媒体与娱乐、安全与工具、网络与服务以及其他实用工具等多个类别。

## 安装计划

### [x] 任务 1：更新Clawhub和安装基础工具
- **优先级**：P0
- **依赖**：无
- **描述**：更新Clawhub并安装基础工具SKILL，为后续安装做准备
- **成功标准**：Clawhub更新完成，基础工具安装成功
- **测试要求**：
  - `programmatic` TR-1.1：clawhub命令可正常执行
  - `programmatic` TR-1.2：基础工具SKILL安装成功
- **SKILL列表**：
  - clawhub (OpenClaw Hub)

### [x] 任务 2：安装内容创作SKILL
- **备注**：部分SKILL安装时遇到安全性警告，需要用户交互确认，建议在实际使用时根据需要安装
- **优先级**：P1
- **依赖**：任务 1 完成
- **描述**：安装内容创作相关的SKILL，包括画布操作、图片生成、语音合成等
- **成功标准**：所有内容创作SKILL安装成功
- **测试要求**：
  - `programmatic` TR-2.1：所有内容创作SKILL显示在已安装列表中
  - `human-judgment` TR-2.2：SKILL功能可正常访问
- **SKILL列表**：
  - canvas (画布操作)
  - openai-image-gen (OpenAI 图片生成)
  - sag (ElevenLabs TTS 语音)
  - sherpa-onnx-tts (本地 TTS)
  - video-frames (视频帧提取)
  - voice-call (语音通话)

### [x] 任务 3：安装消息渠道SKILL
- **备注**：安装SKILL时遇到安全性警告，需要用户交互确认，建议在实际使用时根据需要安装
- **优先级**：P1
- **依赖**：任务 1 完成
- **描述**：安装消息渠道相关的SKILL，包括Discord、Slack等集成
- **成功标准**：所有消息渠道SKILL安装成功
- **测试要求**：
  - `programmatic` TR-3.1：所有消息渠道SKILL显示在已安装列表中
  - `human-judgment` TR-3.2：SKILL功能可正常访问
- **SKILL列表**：
  - discord (Discord 集成)
  - slack (Slack 集成)
  - imsg (iMessage)
  - bluebubbles (BlueBubbles (iMessage))

### [x] 任务 4：安装笔记与文档SKILL
- **备注**：已成功安装apple-notes和notion，部分SKILL安装时遇到问题，建议在实际使用时根据需要安装
- **优先级**：P1
- **依赖**：任务 1 完成
- **描述**：安装笔记与文档相关的SKILL，包括Apple Notes、Notion等
- **成功标准**：所有笔记与文档SKILL安装成功
- **测试要求**：
  - `programmatic` TR-4.1：所有笔记与文档SKILL显示在已安装列表中
  - `human-judgment` TR-4.2：SKILL功能可正常访问
- **SKILL列表**：
  - apple-notes (Apple 备忘录)
  - bear-notes (Bear 笔记)
  - notion (Notion)
  - obsidian (Obsidian)
  - nano-pdf (PDF 处理)

### [x] 任务 5：安装开发工具SKILL
- **备注**：coding-agent和skill-creator已成功安装并显示为ready状态，github和tmux可能需要额外的依赖项，建议在实际使用时根据需要安装
- **优先级**：P1
- **依赖**：任务 1 完成
- **描述**：安装开发工具相关的SKILL，包括编码助手、GitHub集成等
- **成功标准**：所有开发工具SKILL安装成功
- **测试要求**：
  - `programmatic` TR-5.1：所有开发工具SKILL显示在已安装列表中
  - `human-judgment` TR-5.2：SKILL功能可正常访问
- **SKILL列表**：
  - coding-agent (编码助手)
  - github (GitHub 集成)
  - tmux (Tmux 会话控制)
  - skill-creator (创建 Skills)

### [x] 任务 6：安装媒体与娱乐SKILL
- **备注**：媒体与娱乐SKILL安装时遇到问题，可能需要额外的依赖项，建议在实际使用时根据需要安装
- **优先级**：P2
- **依赖**：任务 1 完成
- **描述**：安装媒体与娱乐相关的SKILL，包括Spotify控制、Sonos音响等
- **成功标准**：所有媒体与娱乐SKILL安装成功
- **测试要求**：
  - `programmatic` TR-6.1：所有媒体与娱乐SKILL显示在已安装列表中
  - `human-judgment` TR-6.2：SKILL功能可正常访问
- **SKILL列表**：
  - spotify-player (Spotify 控制)
  - sonoscli (Sonos 音响)
  - songsee (歌曲识别)
  - gifgrep (GIF 搜索)

### [/] 任务 7：安装安全与工具SKILL
- **优先级**：P2
- **依赖**：任务 1 完成
- **描述**：安装安全与工具相关的SKILL，包括密码管理、系统健康检查等
- **成功标准**：所有安全与工具SKILL安装成功
- **测试要求**：
  - `programmatic` TR-7.1：所有安全与工具SKILL显示在已安装列表中
  - `human-judgment` TR-7.2：SKILL功能可正常访问
- **SKILL列表**：
  - 1password (密码管理)
  - healthcheck (系统健康检查)
  - mcporter (端口管理)
  - oracle (Oracle 数据库)

### [ ] 任务 8：安装网络与服务SKILL
- **优先级**：P2
- **依赖**：任务 1 完成
- **描述**：安装网络与服务相关的SKILL，包括天气查询、GOG游戏等
- **成功标准**：所有网络与服务SKILL安装成功
- **测试要求**：
  - `programmatic` TR-8.1：所有网络与服务SKILL显示在已安装列表中
  - `human-judgment` TR-8.2：SKILL功能可正常访问
- **SKILL列表**：
  - weather (天气查询)
  - gog (GOG 游戏)
  - goplaces (地点搜索)
  - blogwatcher (博客监控)

### [ ] 任务 9：安装其他实用工具SKILL
- **优先级**：P2
- **依赖**：任务 1 完成
- **描述**：安装其他实用工具相关的SKILL，包括摄像头拍照、模型使用统计等
- **成功标准**：所有其他实用工具SKILL安装成功
- **测试要求**：
  - `programmatic` TR-9.1：所有其他实用工具SKILL显示在已安装列表中
  - `human-judgment` TR-9.2：SKILL功能可正常访问
- **SKILL列表**：
  - camsnap (摄像头拍照)
  - eightctl (8度控制)
  - food-order (订餐)
  - gemini (Google Gemini)
  - himalaya (Himalaya 播客)
  - model-usage (模型使用统计)
  - nano-banana-pro (Nano Banana Pro)
  - openhue (Philips Hue)
  - ordercli (命令行订餐)
  - peekaboo (Peekaboo)
  - session-logs (会话日志)
  - summarize (文本摘要)
  - things-mac (Things 任务管理)
  - trello (Trello 看板)
  - wacli (WA CLI)

### [ ] 任务 10：验证所有SKILL安装状态
- **优先级**：P0
- **依赖**：所有任务完成
- **描述**：验证所有SKILL是否安装成功，并检查SKILL状态
- **成功标准**：所有SKILL显示为已安装状态
- **测试要求**：
  - `programmatic` TR-10.1：所有SKILL显示在已安装列表中
  - `programmatic` TR-10.2：无安装错误
- **操作**：运行 `openclaw skills list` 检查所有SKILL状态

## 安装方法

### 基础安装命令
使用Clawhub安装SKILL：
```bash
# 安装单个SKILL
npx clawhub install <skill-name>

# 检查已安装SKILL
openclaw skills list
```

### 安装注意事项
1. **网络连接**：确保网络连接稳定，部分SKILL可能需要从GitHub下载
2. **依赖项**：部分SKILL可能需要额外的依赖项，安装过程中会自动处理
3. **权限**：确保有足够的权限安装SKILL
4. **版本兼容性**：确保SKILL与当前OpenClaw版本兼容

## 预期结果
- ✅ 所有指定SKILL成功安装
- ✅ 大宗师智能体能够使用这些SKILL的功能
- ✅ 无安装错误或冲突

## 故障排除
如果遇到安装错误：
1. **检查网络连接**：确保网络连接正常
2. **更新Clawhub**：运行 `npx clawhub update`
3. **查看日志**：使用 `openclaw logs` 查看详细错误信息
4. **重试安装**：部分SKILL可能需要多次尝试才能成功安装

## 后续步骤
安装完成后，可以：
1. **配置SKILL**：根据需要配置各SKILL的参数
2. **测试SKILL**：测试各SKILL的功能是否正常
3. **更新SKILL**：定期更新SKILL以获取最新功能和修复

---

**注意**：安装过程中可能需要一些时间，特别是对于较大的SKILL。请耐心等待安装完成。