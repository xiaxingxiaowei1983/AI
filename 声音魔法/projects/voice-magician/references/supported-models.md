# 声音魔法师 - 支持的模型和语言

## 目录
- [单语言模型](#单语言模型)
- [多语言模型](#多语言模型)
- [支持的语言列表](#支持的语言列表)
- [模型选择建议](#模型选择建议)
- [国内镜像加速](#国内镜像加速)
- [系统要求](#系统要求)

## 概览
声音魔法师提供多种预训练模型，支持不同语言和应用场景。本文档列出常用模型及其特性。

**重要提示**:
- 脚本已配置国内镜像，自动使用清华镜像和 HuggingFace 镜像加速模型下载
- ⚠️ **Python 版本要求**: 必须使用 Python 3.9-3.11，强烈推荐 3.10；**不支持 Python 3.12 及以上版本**
- 如果遇到 Python 版本兼容性问题，请参考 [python-compatibility.md](python-compatibility.md) 中的详细解决方案

## 单语言模型

### 英文模型
- **tts_models/en/ljspeech/vits** - 高质量英文TTS，速度快
- **tts_models/en/vctk/vits** - 支持多说话人英文TTS
- **tts_models/en/sam/tacotron** - 经典Tacotron模型

### 中文模型
- **tts_models/zh-CN/baker/tacotron** - 中文Tacotron模型
- **tts_models/zh-CN/baker/fast_speech** - 中文FastSpeech模型

### 其他语言
- **tts_models/es/mai/tacotron** - 西班牙语
- **tts_models/fr/sam/tacotron** - 法语
- **tts_models/de/thorsten/tacotron** - 德语
- **tts_models/it/sam/tacotron** - 意大利语

## 多语言模型

### XTTS v2 (推荐)
- **模型名称**: `tts_models/multilingual/multi-dataset/xtts_v2`
- **特性**:
  - 支持16种以上语言
  - 语音克隆能力
  - 高质量输出
  - 跨语言语音克隆
- **模型大小**: 约2.9GB
- **首次使用**: 需要下载模型文件（使用国内镜像加速）

### YourTTS
- **模型名称**: `tts_models/multilingual/multi-dataset/your_tts`
- **特性**:
  - 支持9种语言
  - 少样本语音克隆
- **模型大小**: 约1.5GB

## 支持的语言列表

### XTTS v2 支持的语言
| 语言 | 代码 | 示例 |
|------|------|------|
| 英语 | en/en-US | Hello |
| 西班牙语 | es-es | Hola |
| 法语 | fr-fr | Bonjour |
| 德语 | de-de | Guten Tag |
| 意大利语 | it-it | Ciao |
| 葡萄牙语 | pt-br | Olá |
| 波兰语 | pl-pl | Cześć |
| 土耳其语 | tr-tr | Merhaba |
| 俄语 | ru-ru | Привет |
| 荷兰语 | nl-nl | Hallo |
| 捷克语 | cs-cz | Ahoj |
| 阿拉伯语 | ar-ar | مرحبا |
| 中文 | zh-cn | 你好 |
| 日语 | ja-jp | こんにちは |
| 韩语 | ko-kr | 안녕하세요 |
| 匈牙利语 | hu-hu | Szia |

### YourTTS 支持的语言
- 英语 (en)
- 法语 (fr)
- 德语 (de)
- 意大利语 (it)
- 西班牙语 (es)
- 葡萄牙语 (pt-br)
- 波兰语 (pl)
- 土耳其语 (tr)
- 俄语 (ru)

## 模型选择建议

### 场景1: 快速生成英文语音
```
模型: tts_models/en/ljspeech/vits
特点: 模型小(约100MB)，生成速度快
适用: 英文文本，追求速度
```

### 场景2: 多语言支持
```
模型: tts_models/multilingual/multi-dataset/xtts_v2
特点: 支持16+语言，质量高
适用: 需要多语言支持或高质量输出
注意: 首次需要下载约2.9GB模型（国内镜像加速）
```

### 场景3: 中文语音
```
模型: tts_models/zh-CN/baker/tacotron
特点: 针对中文优化
适用: 中文文本转语音
```

### 场景4: 语音克隆
```
模型: tts_models/multilingual/multi-dataset/xtts_v2
特点: 支持跨语言语音克隆
适用: 需要克隆特定声音
```

## 国内镜像加速

脚本已内置国内镜像配置，无需手动设置：

### PyPI 镜像（库安装）
- **镜像源**: 清华大学 PyPI 镜像
- **地址**: https://pypi.tuna.tsinghua.edu.cn/simple
- **用途**: 加速 TTS 库及其依赖的安装

### HuggingFace 镜像（模型下载）
- **镜像源**: HuggingFace 国内镜像
- **地址**: https://hf-mirror.com
- **用途**: 加速模型文件的下载
- **自动启用**: 脚本会自动设置 `HF_ENDPOINT` 环境变量

### 手动安装（如需要）
```bash
# 使用清华镜像安装
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0

# 设置 HuggingFace 镜像环境变量
export HF_ENDPOINT=https://hf-mirror.com
```

## 常见问题

### Q: 如何选择合适的模型？
A:
- 如果只需要英文，使用 `tts_models/en/ljspeech/vits`
- 如果需要多语言或高质量，使用 `xtts_v2`
- 如果只需要中文，使用 `tts_models/zh-CN/baker/tacotron`

### Q: 模型文件下载后保存在哪里？
A: 模型文件会自动下载到用户目录下的 `.local/share/tts/` 文件夹

### Q: 可以同时使用多个模型吗？
A: 可以，但每个模型会占用内存。建议根据需求选择一个主要模型

### Q: 如何更新模型？
A: 删除本地模型文件夹后，下次运行时会自动下载最新版本

### Q: 国内镜像加速效果如何？
A:
- 库安装: 清华镜像速度提升 10-50 倍
- 模型下载: HuggingFace 镜像速度提升 5-20 倍
- 脚本已自动配置，无需手动操作

### Q: Python 版本不兼容怎么办？
A:
- **当前环境**: 检查 Python 版本 `python --version`
- **Python 3.12+**: TTS 暂不支持，需要降级到 3.9-3.11
- **推荐版本**: Python 3.10 或 3.11
- **扩展支持**:
  - 使用 Docker 容器运行兼容的 Python 版本
  - 使用虚拟环境安装较低版本的 Python（如 3.8）
  - 跨平台解决方案：pyenv, conda, venv
- **多版本管理**: 使用 pyenv 或 conda 管理 Python 版本

### Q: 如何在不同 Python 版本间切换？
A:
```bash
# 使用 pyenv（推荐）
pyenv install 3.10.13
pyenv local 3.10.13

# 使用 conda
conda create -n tts-env python=3.10
conda activate tts-env

# 使用系统包管理器（Ubuntu）
sudo apt install python3.10 python3.10-venv
python3.10 -m venv venv

# 使用 Docker（跨平台）
docker run -it python:3.10-slim bash
```

### Q: Python 3.12+ 如何使用 TTS？
A:
```bash
# 方案1: 使用 Docker
docker run -v $(pwd):/workspace python:3.10 bash
# 在容器内安装 TTS
pip install TTS>=0.22.0

# 方案2: 使用虚拟环境
# 安装 Python 3.11
sudo apt install python3.11 python3.11-venv
python3.11 -m venv tts_env
source tts_env/bin/activate
pip install TTS>=0.22.0

# 方案3: 使用 conda
conda create -n tts python=3.11
conda activate tts
pip install TTS>=0.22.0
```

### Q: 下载失败怎么办？
A:
1. 检查网络连接
2. 尝试手动安装: `pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0`
3. 清理缓存后重试: 删除 `~/.local/share/tts/` 文件夹

## 模型性能对比

| 模型 | 速度 | 质量 | 内存占用 | 多语言 | 国内镜像支持 |
|------|------|------|----------|--------|-------------|
| ljspeech/vits | ★★★★★ | ★★★★ | 低 | 否 | ✅ |
| xtts_v2 | ★★★ | ★★★★★ | 高 | 是 | ✅ |
| your_tts | ★★★★ | ★★★★ | 中 | 是 | ✅ |
| baker/tacotron | ★★★ | ★★★ | 中 | 否 | ✅ |

## 系统要求

### Python 版本
- **支持版本**: Python 3.9, 3.10, 3.11
- **不支持版本**: Python 3.12 及以上（TTS 库暂未支持）
- **扩展支持**: 支持通过容器或虚拟环境使用更低版本（如 Python 3.8）
- **检查版本**: `python --version`

### 硬件要求
- **内存**: 至少 4GB（推荐 8GB 以上）
- **磁盘空间**: 至少 5GB 可用空间
  - TTS 库及依赖: 约 1-2GB
  - 模型文件: 约 2-3GB
- **CPU**: 推荐 4 核以上
- **GPU**: 可选，使用 CUDA 可加速推理

### 操作系统
- Linux (Ubuntu 18.04+)
- macOS 10.15+
- Windows 10/11

### 安装检查
```bash
# 检查 Python 版本
python --version

# 检查 pip 版本
pip --version

# 测试安装
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0
```

### 版本兼容性问题
- 如果使用 Python 3.12，需要降级到 Python 3.11 或更低版本
- 推荐使用 Python 3.10 或 3.11（稳定性和兼容性最佳）
- 虚拟环境推荐:
  ```bash
  # Python 3.11
  python3.11 -m venv venv
  source venv/bin/activate
  ```

## 扩展信息

- 完整模型列表: https://github.com/coqui-ai/TTS#models-
- 官方文档: https://tts.readthedocs.io/
- 模型下载: https://huggingface.co/coqui

国内镜像:
- 清华 PyPI 镜像: https://mirrors.tuna.tsinghua.edu.cn/help/pypi/
- HuggingFace 镜像: https://hf-mirror.com
