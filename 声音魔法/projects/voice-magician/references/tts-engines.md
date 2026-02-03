# TTS 引擎对比与选择指南

## 目录
- [双引擎架构](#双引擎架构)
- [引擎对比](#引擎对比)
- [自动选择机制](#自动选择机制)
- [手动切换引擎](#手动切换引擎)
- [音色兼容性](#音色兼容性)

## 双引擎架构

声音魔法师支持两种 TTS 引擎，自动根据 Python 版本和可用性选择最佳引擎：

### Coqui TTS（Python 3.9-3.11）
- **适用版本**: Python 3.9, 3.10, 3.11
- **特点**: 高质量、多模型、离线
- **首次使用**: 需要下载模型文件（1-3GB）
- **支持语言**: 16+ 种语言
- **模型类型**: XTTS v2, YourTTS, 单语言模型等

### Edge-TTS（Python 3.12+）
- **适用版本**: 所有 Python 版本（3.7+）
- **特点**: 轻量级、快速、在线
- **首次使用**: 无需下载模型
- **支持语言**: Microsoft Edge 支持的所有语言
- **音色来源**: Microsoft Edge 在线 TTS 服务

## 引擎对比

| 特性 | Coqui TTS | Edge-TTS |
|------|-----------|----------|
| **Python 版本要求** | 3.9-3.11（推荐 3.10） | 3.7+（包含 3.12+） |
| **首次使用** | 需下载模型（1-3GB） | 无需下载，即用即走 |
| **网络依赖** | 首次下载后可离线使用 | 需要在线连接 |
| **音质** | 高质量，可调优 | 优秀，固定质量 |
| **速度** | 中等（取决于模型） | 快速 |
| **多语言支持** | 16+ 语言 | Microsoft Edge 支持的所有语言 |
| **音色数量** | 丰富（可克隆） | 丰富（预置） |
| **语音克隆** | ✅ 支持 | ❌ 不支持 |
| **离线使用** | ✅ 支持 | ❌ 不支持 |
| **安装复杂度** | 中等（需处理依赖） | 简单（pip install 即可） |
| **国内访问** | 需配置镜像 | 直接访问 Microsoft 服务 |

## 自动选择机制

脚本会自动检测 Python 版本并选择最佳引擎：

```python
if python_version >= 3.12:
    # Python 3.12+ 使用 Edge-TTS
    使用 Edge-TTS 引擎
elif python_version >= 3.9 and python_version <= 3.11:
    # Python 3.9-3.11 使用 Coqui TTS
    使用 Coqui TTS 引擎
else:
    # Python 3.7-3.8 使用 Edge-TTS
    使用 Edge-TTS 引擎
```

### 自动降级机制

如果 Coqui TTS 安装失败，脚本会自动降级到 Edge-TTS：

```python
try:
    安装并使用 Coqui TTS
except:
    print("Coqui TTS 安装失败，切换到 Edge-TTS...")
    安装并使用 Edge-TTS
```

## 手动切换引擎

使用 `--force_engine` 参数强制指定引擎：

### 强制使用 Coqui TTS
```bash
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试语音" \
  --force_engine coqui \
  --output ./coqui_output.wav
```

**注意**: 仅在 Python 3.9-3.11 环境下有效

### 强制使用 Edge-TTS
```bash
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试语音" \
  --force_engine edge \
  --output ./edge_output.wav
```

**适用**: 所有 Python 版本

## 音色兼容性

### 两种引擎都支持的音色映射

| 主题 | Coqui TTS 音色 | Edge-TTS 音色 |
|------|---------------|---------------|
| 商务理性 | zh-CN-YunyangNeural | zh-CN-YunyangNeural |
| 情感叙事 | zh-CN-YunxiNeural | zh-CN-YunxiNeural |
| 激励演说 | zh-CN-YunyeNeural | zh-CN-YunyeNeural |
| 知识讲解 | zh-CN-XiaoxiaoNeural | zh-CN-XiaoxiaoNeural |
| 娱乐休闲 | zh-CN-XiaoxuanNeural | zh-CN-XiaoxuanNeural |

### 使用主题名称（推荐）

两种引擎都支持使用主题名称，脚本会自动映射到对应的音色：

```bash
# 适用于两种引擎
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "本季度商业成本下降了15%" \
  --voice_name 商务理性 \
  --output ./business.wav
```

### 使用具体音色名

```bash
# 中文音色
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试语音" \
  --voice_name zh-CN-YunyangNeural \
  --output ./test.wav

# 英文音色
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "Test speech" \
  --language en-US \
  --voice_name en-US-JennyNeural \
  --output ./test.wav
```

## Coqui TTS 专属功能

### 1. 多模型选择
```bash
# XTTS v2 模型（多语言，高质量）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试" \
  --model_name tts_models/multilingual/multi-dataset/xtts_v2 \
  --language zh-CN \
  --output ./xtts.wav

# 中文专用模型
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试" \
  --model_name tts_models/zh-CN/baker/tacotron \
  --output ./baker.wav
```

### 2. 语音克隆
需要额外的克隆模型和参考音频。

### 3. 多说话人支持
```bash
# 使用 speaker_idx 参数
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试" \
  --speaker_idx p225 \
  --output ./speaker.wav
```

## Edge-TTS 专属功能

### 1. 语速调整
```bash
# Edge-TTS 使用 rate 参数（如 speed:+10%）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "快速语音" \
  --speed 1.2 \
  --output ./fast.wav
```

### 2. 更丰富的音色选择
Edge-TTS 支持更多音色，完整列表参考：
- 中文: https://learn.microsoft.com/zh-cn/azure/cognitive-services/speech-service/language-support
- 英文: https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support

### 3. 在线服务优势
- 无需下载模型
- 始终使用最新音色
- 跨设备一致性

## 选择建议

### 使用 Coqui TTS 的场景
- 需要**离线使用**（无网络环境）
- 需要**语音克隆**功能
- 需要**自定义模型**
- Python 版本为 3.9-3.11
- 对音质有极高要求
- 需要批量处理大量文本

### 使用 Edge-TTS 的场景
- Python 版本为 3.12+（或无法使用 Coqui TTS）
- 需要**快速生成**（实时应用）
- 磁盘空间有限（无法存储大模型）
- 不需要语音克隆
- 需要跨设备一致性
- 初次使用，不想下载模型

### 推荐配置
- **开发者环境**（Python 3.10）: 使用 Coqui TTS
- **生产环境**（Python 3.12+）: 使用 Edge-TTS
- **混合环境**: 让脚本自动选择

## 性能对比

### 首次使用
| 引擎 | 下载时间 | 准备时间 |
|------|---------|---------|
| Coqui TTS | 10-30 分钟（模型下载） | 首次加载 5-30 秒 |
| Edge-TTS | 0 秒（无需下载） | 即时 |

### 后续使用
| 引擎 | 单句处理 | 长文本处理 |
|------|---------|-----------|
| Coqui TTS | 1-3 秒 | 10-30 秒/分钟 |
| Edge-TTS | 0.5-2 秒 | 5-15 秒/分钟 |

*注: 具体时间取决于硬件性能和网络环境*

## 常见问题

### Q1: 我应该使用哪个引擎？
**A**:
- 如果 Python 版本是 3.9-3.11，推荐 Coqui TTS（质量更高）
- 如果 Python 版本是 3.12+，使用 Edge-TTS（自动选择）
- 如果需要离线使用，使用 Coqui TTS
- 如果需要快速生成，使用 Edge-TTS

### Q2: 两种引擎的音质有差异吗？
**A**: 
- Coqui TTS: 高质量，可调优，适合专业场景
- Edge-TTS: 优秀，质量稳定，适合日常使用
- 对于大多数应用场景，两者的音质差异不明显

### Q3: 可以在 Python 3.12 上使用 Coqui TTS 吗？
**A**: 官方不支持，但可以通过以下方式尝试：
- 使用 Docker 容器运行 Python 3.10
- 使用虚拟环境安装 Python 3.10
- 使用 Conda 创建 Python 3.10 环境

详见 [python-compatibility.md](python-compatibility.md)

### Q4: Edge-TTS 需要付费吗？
**A**: Edge-TTS 使用 Microsoft Edge 在线服务，目前免费。但需要注意：
- 需要网络连接
- 可能有使用频率限制
- 依赖微软服务的可用性

### Q5: 如何获取所有可用的音色？
**A**:

**Edge-TTS 音色列表**:
```bash
# 安装 edge-tts 后运行
import edge_tts
import asyncio

async def get_voices():
    voices = await edge_tts.list_voices()
    for voice in voices:
        print(f"{voice['Name']}: {voice['LocaleName']}")

asyncio.run(get_voices())
```

**Coqui TTS 音色列表**:
- 单语言模型: 查看模型文档
- XTTS v2: 支持语音克隆，可自定义音色
- YourTTS: 支持 9 种语言的预置音色

### Q6: 可以同时使用两种引擎吗？
**A**: 可以。两种引擎可以独立使用：

```bash
# 终端1: 使用 Coqui TTS
python text_to_speech.py --text "测试1" --force_engine coqui --output coqui.wav

# 终端2: 使用 Edge-TTS
python text_to_speech.py --text "测试2" --force_engine edge --output edge.wav
```

### Q7: 如何验证当前使用的引擎？
**A**: 脚本运行时会输出当前使用的引擎：

```bash
$ python text_to_speech.py --text "测试" --output test.wav
当前 Python 版本: 3.12.3

检测到 Python 3.12，自动使用 Edge-TTS 引擎（兼容 Python 3.12+）
============================================================
使用 Edge-TTS 引擎（兼容 Python 3.12+）
============================================================
使用音色: zh-CN-XiaoxiaoNeural
...
```

## 总结

声音魔法师的双引擎架构提供了最大的灵活性：
- **自动选择**: 根据环境自动选择最佳引擎
- **手动切换**: 支持用户强制指定引擎
- **无缝降级**: Coqui TTS 失败自动切换到 Edge-TTS
- **音色兼容**: 两种引擎支持相同的音色主题
- **全版本支持**: Python 3.7+ 全覆盖
