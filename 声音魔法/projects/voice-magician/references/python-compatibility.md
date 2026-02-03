# Python 版本兼容性指南

## 目录
- [核心问题](#核心问题)
- [TTS 库支持情况](#tts-库支持情况)
- [解决方案](#解决方案)
- [常见问题](#常见问题)

## 核心问题

### 为什么不支持 Python 3.12？
**TTS 库的核心依赖存在兼容性问题**:
- TTS 库依赖的某些第三方库（如 `torchaudio`、`resampy` 等）尚未完全适配 Python 3.12
- NumPy 和 SciPy 等底层库的二进制轮子（wheels）在 Python 3.12 上存在兼容性问题
- 部分音频处理库的 C 扩展需要重新编译以支持 Python 3.12

### TTS 库支持情况

| Python 版本 | TTS 支持状态 | 推荐度 |
|------------|------------|--------|
| 3.8 | ✅ 支持 | ⭐⭐⭐ |
| 3.9 | ✅ 支持 | ⭐⭐⭐⭐ |
| 3.10 | ✅ 支持 | ⭐⭐⭐⭐⭐（最推荐） |
| 3.11 | ✅ 支持 | ⭐⭐⭐⭐ |
| 3.12+ | ❌ 不支持 | ❌ |

**推荐版本**: Python 3.10（稳定性最佳，兼容性最好）

## 解决方案

### 方案1: 使用 Docker（推荐，跨平台）

**适用场景**: 所有平台，特别是 Windows 和 macOS

```bash
# 1. 拉取 Python 3.10 镜像
docker pull python:3.10-slim

# 2. 运行容器并挂载当前目录
docker run -it -v $(pwd):/workspace python:3.10-slim bash

# 3. 在容器内安装 TTS
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0

# 4. 运行语音转换脚本
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试语音" \
  --output ./output.wav
```

**优势**:
- 完全隔离的环境，不影响系统 Python
- 跨平台兼容
- 易于复现和部署

### 方案2: 使用 Conda（推荐，简单快捷）

**适用场景**: 已安装 Anaconda 或 Miniconda 的用户

```bash
# 1. 创建 Python 3.10 虚拟环境
conda create -n tts-env python=3.10 -y

# 2. 激活环境
conda activate tts-env

# 3. 安装 TTS（使用清华镜像）
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0

# 4. 运行语音转换
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试语音" \
  --output ./output.wav

# 5. 使用完毕后退出环境
conda deactivate
```

**优势**:
- 简单快速，无需系统级权限
- Conda 会自动处理依赖关系
- 环境隔离，便于管理

### 方案3: 使用 Pyenv（推荐，多版本管理）

**适用场景**: Linux/macOS，需要管理多个 Python 版本

```bash
# 1. 安装 pyenv（如果未安装）
curl https://pyenv.run | bash

# 2. 配置 shell
echo 'export PYENV_ROOT="$HOME/.pyenv"' >> ~/.bashrc
echo '[[ -d $PYENV_ROOT/bin ]] && export PATH="$PYENV_ROOT/bin:$PATH"' >> ~/.bashrc
echo 'eval "$(pyenv init -)"' >> ~/.bashrc
source ~/.bashrc

# 3. 安装 Python 3.10
pyenv install 3.10.13

# 4. 为当前项目设置 Python 版本
cd /workspace/projects/voice-magician
pyenv local 3.10.13

# 5. 验证版本
python --version  # 应显示 Python 3.10.13

# 6. 安装 TTS
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0

# 7. 运行脚本
python scripts/text_to_speech.py --text "测试" --output output.wav
```

**优势**:
- 支持在多个 Python 版本间切换
- 项目级别的版本控制
- 适合开发者

### 方案4: 使用系统包管理器（Linux）

**适用场景**: Linux 系统，有 sudo 权限

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install python3.10 python3.10-venv python3.10-dev -y

# 创建虚拟环境
python3.10 -m venv tts-venv

# 激活虚拟环境
source tts-venv/bin/activate

# 安装 TTS
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0

# 运行脚本
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试" \
  --output output.wav
```

### 方案5: 使用 venv（Python 自带）

**适用场景**: 已安装 Python 3.10

```bash
# 1. 检查系统是否已安装 Python 3.10
python3.10 --version

# 2. 创建虚拟环境
python3.10 -m venv tts-env

# 3. 激活虚拟环境
# Linux/macOS:
source tts-env/bin/activate

# Windows:
tts-env\Scripts\activate

# 4. 安装 TTS
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0

# 5. 运行脚本
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "测试" \
  --output output.wav

# 6. 使用完毕后退出环境
deactivate
```

## 常见问题

### Q1: 为什么不直接降级系统 Python？
**A**: 不推荐直接降级系统 Python，因为：
- 可能影响系统其他依赖 Python 的程序
- 系统包管理器管理 Python 版本较复杂
- 容易造成系统不稳定

**建议**: 使用虚拟环境或 Docker 隔离

### Q2: 如何检查当前 Python 版本？
```bash
python --version
python3 --version
which python  # 查看 Python 可执行文件路径
```

### Q3: 如果在虚拟环境中安装失败怎么办？
```bash
# 1. 确认虚拟环境已激活
which python  # 应显示虚拟环境路径

# 2. 升级 pip
pip install --upgrade pip

# 3. 清理缓存
pip cache purge

# 4. 重新安装
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0

# 5. 查看详细错误信息
pip install -v TTS>=0.22.0
```

### Q4: Docker 方式如何持久化？
```bash
# 1. 创建 Dockerfile
cat > Dockerfile << 'EOF'
FROM python:3.10-slim
WORKDIR /workspace
RUN pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0
COPY . /workspace/
CMD ["bash"]
EOF

# 2. 构建镜像
docker build -t voice-magician .

# 3. 运行容器
docker run -it -v $(pwd):/workspace voice-magician bash

# 4. 在容器中运行脚本
python scripts/text_to_speech.py --text "测试" --output output.wav
```

### Q5: 能否在 Python 3.12 上使用其他 TTS 库？
**A**: 可以考虑以下替代方案：
- **Edge-TTS**: 基于 Microsoft Edge 浏览器，支持 Python 3.12+
- **gTTS**: Google Text-to-Speech，支持 Python 3.12+
- **pyttsx3**: 离线 TTS，支持 Python 3.12+
- **Azure Cognitive Services**: 微软云服务，支持 Python 3.12+

但注意：这些替代方案的功能和音质可能与 Coqui TTS 存在差异

### Q6: 脚本会自动检测 Python 版本吗？
**A**: 当前版本的脚本会在安装失败时提示版本问题，但不会自动切换。建议用户手动使用上述解决方案。

## 推荐工作流程

### 对于初次使用者
1. 使用 Docker 方式（最简单，无需安装）
2. 在容器内安装依赖并运行脚本

### 对于开发者
1. 使用 Conda 或 Pyenv 管理 Python 版本
2. 为项目创建独立的虚拟环境
3. 在虚拟环境中开发和使用

### 对于生产环境
1. 使用 Docker 部署
2. 确保 CI/CD 环境使用 Python 3.10
3. 使用 requirements.txt 或 poetry 管理依赖

## 版本兼容性检查清单

- [ ] 检查当前 Python 版本（`python --version`）
- [ ] 确认版本为 3.9、3.10 或 3.11
- [ ] 如果是 3.12+，选择并应用一种解决方案
- [ ] 在新环境中安装 TTS 库
- [ ] 运行测试脚本验证功能
- [ ] 记录环境配置以便后续复现

## 技术细节

### TTS 依赖的 Python 版本限制来源

1. **torchaudio**: 音频处理核心库
   - Python 3.12 支持状态：部分支持
   - 问题：某些音频编解码器的二进制轮子缺失

2. **resampy**: 音频重采样库
   - Python 3.12 支持状态：不支持
   - 问题：C 扩展需要重新编译

3. **librosa**: 音频分析库
   - Python 3.12 支持状态：部分支持
   - 问题：依赖 NumPy 的兼容性问题

### 为什么推荐 Python 3.10？

1. **稳定性**: 经过充分测试，bug 较少
2. **性能**: 比 3.9 有明显性能提升
3. **兼容性**: 所有依赖库都提供完整的二进制轮子
4. **社区支持**: Coqui TTS 官方主要测试和推荐版本
