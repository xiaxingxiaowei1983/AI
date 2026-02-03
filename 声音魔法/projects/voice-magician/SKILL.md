---
name: voice-magician
description: 让文字会说话的神奇工具！支持16种语言的文本转语音，轻松生成高质量音频；适用于视频配音、有声读物、语音辅助等场景
dependency:
  python:
    - TTS>=0.22.0  # Python 3.9-3.11
    - edge-tts    # Python 3.12+ 或作为备用引擎
---

# 声音魔法师 文本转语音 (voice-magician)

## 任务目标
- 本 Skill 用于:将文本转换为语音音频文件
- 能力包含:
  - 文本转语音（支持多语言）
  - **双引擎支持**: Python 3.9-3.11 使用 Coqui TTS（高质量），Python 3.12+ 使用 Edge-TTS（轻量级）
  - 多种预训练声音模型选择
  - 高质量WAV音频输出
  - 灵活的参数配置（语速、音调等）
- 触发条件:用户需要"将文本转换为语音"、"生成语音文件"、"文本配音"等

## 前置准备

### ⚠️ Python 版本兼容性（重要）
**核心问题**: TTS 库不支持 Python 3.12 及以上版本

**当前环境检查**:
```bash
python --version
```

**解决方案（按推荐顺序）**:

#### 方案1: 使用 Docker（推荐，跨平台）
```bash
# 拉取 Python 3.10 镜像
docker pull python:3.10-slim

# 运行容器并挂载当前目录
docker run -it -v $(pwd):/workspace python:3.10-slim bash

# 在容器内安装依赖
pip install TTS>=0.22.0
```

#### 方案2: 使用 Conda（推荐，简单快捷）
```bash
# 创建 Python 3.10 虚拟环境
conda create -n tts-env python=3.10

# 激活环境
conda activate tts-env

# 安装 TTS（使用清华镜像）
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0
```

#### 方案3: 使用 Pyenv（推荐，多版本管理）
```bash
# 安装 Python 3.10
pyenv install 3.10.13

# 为当前项目设置 Python 版本
pyenv local 3.10.13

# 安装依赖
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0
```

#### 方案4: 使用系统包管理器（Linux）
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3.10 python3.10-venv
python3.10 -m venv venv
source venv/bin/activate
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0
```

### 系统要求
- **Python 版本**: 3.9, 3.10 或 3.11（强烈推荐 3.10）
- **系统内存**: 至少 4GB（推荐 8GB 以上）
- **磁盘空间**: 至少 5GB（模型文件约 2-3GB）

### 依赖说明
脚本根据 Python 版本自动选择 TTS 引擎:
- **Python 3.9-3.11**: 使用 Coqui TTS（高质量，多模型，离线）
  ```
  TTS>=0.22.0
  ```
- **Python 3.12+**: 使用 Edge-TTS（轻量级，快速，在线）
  ```
  edge-tts
  ```

### 国内加速说明
脚本已内置国内镜像配置:
- 使用清华 PyPI 镜像加速库安装
- 使用 HuggingFace 国内镜像加速模型下载
- 首次运行时脚本会自动检测并安装依赖
- 手动安装命令（如需要）:
  ```bash
  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0
  ```

## 操作步骤

### 标准流程
1. **输入准备**
   - 确认要转换的文本内容
   - 选择目标语言（默认为中文 zh-CN）
   - 选择声音模型（可参考[references/supported-models.md](references/supported-models.md)）
   - 指定输出音频文件路径

2. **执行TTS转换**
   - 调用 `scripts/text_to_speech.py` 执行转换
   - **自动引擎选择**: 脚本会根据 Python 版本自动选择最佳 TTS 引擎
   - 核心参数:
     - `--text`: 要转换的文本内容
     - `--language`: 语言代码（如 en-US, zh-CN 等）
     - `--voice_name`: 音色名称或主题（如 zh-CN-YunyangNeural 或 商务理性、情感叙事等）
     - `--output`: 输出音频文件路径
   - 可选参数:
     - `--speed`: 语速调整（默认1.0）
     - `--model_name`: 模型名称（仅限 Coqui TTS，如 tts_models/multilingual/multi-dataset/xtts_v2）
     - `--force_engine`: 强制使用指定引擎（coqui 或 edge）
   - 音色主题（适用于两种引擎）:
     - 商务理性: 商业报告、成本分析
     - 情感叙事: 故事讲述、情感表达
     - 激励演说: 演讲、激励、宣传
     - 知识讲解: 教学视频、科普讲解
     - 娱乐休闲: 短视频配音、轻松对话

3. **结果验证**
   - 确认音频文件已生成
   - 检查文件大小和格式
   - 如需要，可调整参数重新生成

### 可选分支
- 当 **使用默认模型**时，可省略 `--model_name` 参数
- 当 **使用默认语言**时，可省略 `--language` 参数
- 当 **需要特殊效果**时，可调整 `--speed` 或使用特定说话人

## 资源索引
- 必要脚本:见 [scripts/text_to_speech.py](scripts/text_to_speech.py)(用途与参数:执行文本转语音转换，自动选择TTS引擎)
- 领域参考:
  - 见 [references/supported-models.md](references/supported-models.md)(何时读取:选择声音模型或查看支持的语言时)
  - 见 [references/voice-styles.md](references/voice-styles.md)(何时读取:选择适合主题的音色时)
  - 见 [references/tts-engines.md](references/tts-engines.md)(何时读取:了解双引擎架构和切换时)
  - 见 [references/python-compatibility.md](references/python-compatibility.md)(何时读取:遇到Python版本兼容性问题时)
  - 见 [references/multi-role-scenarios.md](references/multi-role-scenarios.md)(何时读取:进行多人配音、小说群像、播客对话时)

## 注意事项
- ⚠️ **Python 版本兼容性**: 
  - Python 3.9-3.11: 自动使用 Coqui TTS（高质量，支持16+语言，需下载模型）
  - Python 3.12+: 自动使用 Edge-TTS（轻量级，快速，在线服务）
  - 脚本会自动检测并选择合适的引擎
- **引擎自动降级**: 如果 Coqui TTS 安装失败，会自动切换到 Edge-TTS
- 脚本已内置国内镜像配置，自动使用清华镜像和 HuggingFace 镜像加速
- 首次运行会自动下载模型文件（约1-2GB，仅 Coqui TTS），使用国内镜像后速度会明显提升
- 支持的语言和模型列表请参考参考文档
- 长文本可能需要较长处理时间
- 输出文件默认为WAV格式，便于进一步处理
- 如果自动安装失败，请使用手动安装命令安装依赖
- Edge-TTS 需要网络连接（使用 Microsoft Edge 在线服务）
- Coqui TTS 可离线使用（模型下载后）

## 使用示例

### 示例1: 基础中文转语音（自动选择引擎）
```bash
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "这是一个中文语音测试。" \
  --output ./output.wav
```

### 示例2: 使用音色主题（兼容所有Python版本）
```bash
# 商务主题
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "本季度商业成本同比下降了15%，主要得益于供应链优化。" \
  --voice_name 商务理性 \
  --output ./business_report.wav

# 情感叙事
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "在一个宁静的夜晚，小明独自走在回家的路上..." \
  --voice_name 情感叙事 \
  --output ./story.wav
```

### 示例3: 指定具体音色
```bash
# 中文音色
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "这是一个中文语音测试。" \
  --voice_name zh-CN-YunyangNeural \
  --output ./chinese_output.wav

# 英文音色
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "This is an English speech test." \
  --language en-US \
  --voice_name en-US-JennyNeural \
  --output ./english_output.wav
```

### 示例4: 强制使用指定引擎
```bash
# 强制使用 Edge-TTS（Python 3.12+）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试语音" \
  --force_engine edge \
  --output ./edge_output.wav

# 强制使用 Coqui TTS（Python 3.9-3.11）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试语音" \
  --force_engine coqui \
  --output ./coqui_output.wav
```

### 示例5: 使用 Coqui TTS 的 XTTS v2 模型（仅 Python 3.9-3.11）
```bash
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "这是一个中文语音测试。" \
  --language zh-CN \
  --model_name tts_models/multilingual/multi-dataset/xtts_v2 \
  --output ./xtts_output.wav
```

### 示例6: 调整语速
```bash
# 加速（1.5倍）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "快速语音测试" \
  --speed 1.5 \
  --output ./fast.wav

# 减速（0.8倍）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "慢速语音测试" \
  --speed 0.8 \
  --output ./slow.wav
```

### 示例7: 多人配音 - 小说群像
```bash
# 男主角
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "三年了，我终于突破了封印！" \
  --voice_name zh-CN-YunyangNeural \
  --speed 0.95 \
  --output ./novel/01_protagonist.wav

# 女主角
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "张阳，你要小心，长老们已经察觉到了。" \
  --voice_name zh-CN-YunxiNeural \
  --speed 1.0 \
  --output ./novel/02_heroine.wav

# 小孩
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "哥哥，我怕！" \
  --voice_name zh-CN-XiaoxuanNeural \
  --speed 1.1 \
  --output ./novel/03_child.wav
```

### 示例8: 多人配音 - 播客对话
```bash
# 主持人 A（男）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "今天我们聊聊人工智能的发展" \
  --voice_name zh-CN-YunyangNeural \
  --output ./podcast/01_hostA.wav

# 主持人 B（女）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "是啊，AI 真的改变了我们的生活" \
  --voice_name zh-CN-YunxiNeural \
  --output ./podcast/02_hostB.wav
```

**提示**: 更多多人配音场景（小说群像、播客对话、视频剧等）详见 [references/multi-role-scenarios.md](references/multi-role-scenarios.md)
