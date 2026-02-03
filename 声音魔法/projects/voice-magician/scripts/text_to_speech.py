#!/usr/bin/env python3
"""
语音魔法师 - 文本转语音脚本
支持多TTS引擎，兼容不同Python版本
- Python 3.9-3.11: 使用 Coqui TTS（高质量，多模型）
- Python 3.12+: 使用 Edge-TTS（轻量级，快速）
支持国内镜像加速下载
"""

import argparse
import sys
import os
import subprocess


def get_python_version():
    """获取 Python 版本信息"""
    return sys.version_info


def setup_chinese_mirror():
    """配置国内镜像加速下载"""
    # 配置 HF_ENDPOINT 环境变量使用国内镜像
    os.environ['HF_ENDPOINT'] = 'https://hf-mirror.com'
    print("已启用 HuggingFace 国内镜像加速")


def install_coqui_tts():
    """使用国内镜像安装 Coqui TTS 库"""
    try:
        import TTS
        print("Coqui TTS 库已安装")
        return True
    except ImportError:
        print("正在安装 Coqui TTS 库（使用清华镜像加速）...")

        # 使用清华 PyPI 镜像安装
        install_cmd = [
            sys.executable,
            "-m",
            "pip",
            "install",
            "-i",
            "https://pypi.tuna.tsinghua.edu.cn/simple",
            "TTS>=0.22.0"
        ]

        try:
            subprocess.run(install_cmd, check=True)
            print("Coqui TTS 库安装成功")
            return True
        except subprocess.CalledProcessError as e:
            print(f"Coqui TTS 库安装失败: {e}")
            return False


def install_edge_tts():
    """安装 Edge-TTS 库"""
    try:
        import edge_tts
        print("Edge-TTS 库已安装")
        return True
    except ImportError:
        print("正在安装 Edge-TTS 库（使用清华镜像加速）...")

        # 使用清华 PyPI 镜像安装
        install_cmd = [
            sys.executable,
            "-m",
            "pip",
            "install",
            "-i",
            "https://pypi.tuna.tsinghua.edu.cn/simple",
            "edge-tts"
        ]

        try:
            subprocess.run(install_cmd, check=True)
            print("Edge-TTS 库安装成功")
            return True
        except subprocess.CalledProcessError as e:
            print(f"Edge-TTS 库安装失败: {e}")
            return False


async def text_to_speech_edge_tts(text, language="zh-CN", voice_name=None, output_path=None, speed=1.0):
    """
    使用 Edge-TTS 将文本转换为语音（兼容 Python 3.12+）

    参数:
        text (str): 要转换的文本内容
        language (str): 语言代码
        voice_name (str): 音色名称
        output_path (str): 输出音频文件路径
        speed (float): 语速调整（Edge-TTS 略有不同，使用 rate 参数）

    返回:
        str: 生成的音频文件路径
    """
    import edge_tts

    print("=" * 60)
    print("使用 Edge-TTS 引擎（兼容 Python 3.12+）")
    print("=" * 60)

    # Edge-TTS 音色映射
    voice_mapping = {
        "zh-CN": {
            "商务理性": "zh-CN-YunyangNeural",
            "情感叙事": "zh-CN-YunxiNeural",
            "激励演说": "zh-CN-YunyeNeural",
            "知识讲解": "zh-CN-XiaoxiaoNeural",
            "娱乐休闲": "zh-CN-XiaoxuanNeural",
            "默认": "zh-CN-XiaoxiaoNeural"
        },
        "en-US": {
            "商务理性": "en-US-GuyNeural",
            "情感叙事": "en-US-AriaNeural",
            "激励演说": "en-US-ChristopherNeural",
            "知识讲解": "en-US-JennyNeural",
            "默认": "en-US-JennyNeural"
        }
    }

    # 确定使用的音色
    selected_voice = None
    if voice_name and voice_name.startswith("zh-CN") or voice_name.startswith("en-US"):
        selected_voice = voice_name
    elif voice_name and language in voice_mapping and voice_name in voice_mapping[language]:
        selected_voice = voice_mapping[language][voice_name]
    else:
        # 使用默认音色
        selected_voice = voice_mapping.get(language, {}).get("默认", "zh-CN-XiaoxiaoNeural")

    print(f"使用音色: {selected_voice}")

    # 语速转换（Edge-TTS 使用 rate 字符串，如 "speed:+10%"）
    rate = f"speed:+{int((speed - 1.0) * 100)}%" if speed != 1.0 else ""

    try:
        # 创建 TTS 对象
        communicate = edge_tts.Communicate(text, selected_voice, rate=rate)

        # 生成语音文件
        await communicate.save(output_path)

        print(f"语音生成成功: {output_path}")

        # 获取文件大小
        file_size = os.path.getsize(output_path)
        print(f"文件大小: {file_size / (1024*1024):.2f} MB")

        print("\n提示: Edge-TTS 支持的音色较丰富，更多选项请参考:")
        print("  - 中文: https://learn.microsoft.com/zh-cn/azure/cognitive-services/speech-service/language-support")
        print("  - 英文: https://learn.microsoft.com/en-us/azure/cognitive-services/speech-service/language-support")

        return output_path

    except Exception as e:
        print(f"错误: 语音生成失败")
        print(f"详细信息: {str(e)}")
        sys.exit(1)


def text_to_speech_coqui_tts(text, language="zh-CN", model_name=None, output_path=None, speed=1.0, speaker_idx=None, voice_name=None):
    """
    使用 Coqui TTS 将文本转换为语音（Python 3.9-3.11）

    参数:
        text (str): 要转换的文本内容
        language (str): 语言代码（如 en, es, zh-CN 等）
        model_name (str): 模型名称，为None时使用默认模型
        output_path (str): 输出音频文件路径
        speed (float): 语速调整，1.0为正常速度
        speaker_idx (str): 说话人索引（多说话人模型使用）
        voice_name (str): 音色名称（如 zh-CN-YunyangNeural）

    返回:
        str: 生成的音频文件路径
    """
    # 确保使用国内镜像
    setup_chinese_mirror()

    # 检查 TTS 库
    if not install_coqui_tts():
        print("\n提示: Coqui TTS 安装失败，尝试切换到 Edge-TTS...")
        if install_edge_tts():
            print("Edge-TTS 安装成功，切换到 Edge-TTS 引擎...")
            import asyncio
            return asyncio.run(text_to_speech_edge_tts(text, language, voice_name, output_path, speed))
        else:
            print("错误: 所有 TTS 引擎安装失败")
            print("\n请手动安装以下任一库:")
            print("  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple edge-tts")
            print("  pip install -i https://pypi.tuna.tsinghua.edu.cn/simple TTS>=0.22.0")
            sys.exit(1)

    print("=" * 60)
    print("使用 Coqui TTS 引擎（高质量，多模型）")
    print("=" * 60)

    try:
        from TTS.api import TTS

        # 初始化TTS
        device = "cuda" if os.environ.get("CUDA_VISIBLE_DEVICES") else "cpu"

        if model_name:
            # 使用指定模型
            print(f"正在加载模型: {model_name}")
            tts = TTS(model_name).to(device)
        else:
            # 使用默认模型（中文）
            print("正在加载默认模型...")
            # 如果指定了音色，尝试使用对应的模型
            if voice_name and voice_name.startswith("zh-CN"):
                tts = TTS(model_name="tts_models/zh-CN/baker/tacotron").to(device)
            elif voice_name and voice_name.startswith("en-US"):
                tts = TTS(model_name="tts_models/en/ljspeech/vits").to(device)
            else:
                tts = TTS(model_name="tts_models/zh-CN/baker/tacotron").to(device)

        # 构建TTS参数
        tts_kwargs = {
            "speed": speed
        }

        # 优先使用 voice_name，其次使用 speaker_idx
        if voice_name and hasattr(tts.synthesizer, 'tts_model'):
            tts_kwargs["speaker_idx"] = voice_name
        elif speaker_idx and hasattr(tts.synthesizer, 'tts_model'):
            tts_kwargs["speaker_idx"] = speaker_idx

        print(f"正在转换文本（语言: {language}）...")
        if voice_name:
            print(f"使用音色: {voice_name}")
        print(f"文本内容: {text[:100]}{'...' if len(text) > 100 else ''}")

        # 生成语音
        if model_name and "multilingual" in model_name:
            # 多语言模型
            tts.tts_to_file(
                text=text,
                file_path=output_path,
                language=language,
                **tts_kwargs
            )
        else:
            # 单语言模型
            tts.tts_to_file(
                text=text,
                file_path=output_path,
                **tts_kwargs
            )

        print(f"语音生成成功: {output_path}")

        # 获取文件大小
        file_size = os.path.getsize(output_path)
        print(f"文件大小: {file_size / (1024*1024):.2f} MB")

        return output_path

    except Exception as e:
        print(f"错误: 语音生成失败")
        print(f"详细信息: {str(e)}")
        sys.exit(1)


def main():
    """命令行入口"""
    parser = argparse.ArgumentParser(
        description="语音魔法师 - 文本转语音工具（支持多Python版本）",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
示例:
  # 基础用法（默认中文，自动选择TTS引擎）
  python text_to_speech.py --text "你好世界" --output ./output.wav

  # 英文转语音
  python text_to_speech.py --text "Hello world" --language en-US --output ./english.wav

  # 选择适合商务主题的音色（兼容不同引擎）
  python text_to_speech.py --text "本季度商业成本下降了15%" \\
      --voice_name 商务理性 \\
      --output ./business.wav

  # 指定具体音色（Edge-TTS/Coqui TTS）
  python text_to_speech.py --text "测试语音" \\
      --voice_name zh-CN-YunyangNeural \\
      --output ./test.wav

  # 调整语速
  python text_to_speech.py --text "快速语音" --speed 1.5 --output ./fast.wav

引擎说明:
  - Python 3.9-3.11: 自动使用 Coqui TTS（高质量，多模型，离线）
  - Python 3.12+: 自动使用 Edge-TTS（轻量级，快速，在线）
  - Coqui TTS 失败时自动降级到 Edge-TTS

国内镜像加速:
  - 使用清华 PyPI 镜像加速库安装
  - Coqui TTS 使用 HuggingFace 国内镜像加速模型下载

音色主题适配:
  - 商务理性: 适合商业报告、成本分析
  - 情感叙事: 适合故事讲述、情感表达
  - 激励演说: 适合演讲、激励、宣传
  - 知识讲解: 适合教学视频、科普讲解
  - 娱乐休闲: 适合短视频配音、轻松对话
  - 详见: references/voice-styles.md
        """
    )

    parser.add_argument(
        "--text",
        type=str,
        required=True,
        help="要转换的文本内容"
    )

    parser.add_argument(
        "--language",
        type=str,
        default="zh-CN",
        help="语言代码（默认: zh-CN）"
    )

    parser.add_argument(
        "--model_name",
        type=str,
        default=None,
        help="模型名称（仅限 Coqui TTS: tts_models/multilingual/multi-dataset/xtts_v2）"
    )

    parser.add_argument(
        "--output",
        type=str,
        required=True,
        help="输出音频文件路径"
    )

    parser.add_argument(
        "--speed",
        type=float,
        default=1.0,
        help="语速调整（默认: 1.0，大于1.0加快，小于1.0减慢）"
    )

    parser.add_argument(
        "--speaker_idx",
        type=str,
        default=None,
        help="说话人索引（仅限 Coqui TTS 多说话人模型使用）"
    )

    parser.add_argument(
        "--voice_name",
        type=str,
        default=None,
        help="音色名称或主题（如: zh-CN-YunyangNeural 或 商务理性、情感叙事等主题）"
    )

    parser.add_argument(
        "--force_engine",
        type=str,
        default=None,
        choices=["coqui", "edge"],
        help="强制使用指定引擎（coqui 或 edge，不指定则自动选择）"
    )

    args = parser.parse_args()

    # 验证输入
    if not args.text or args.text.strip() == "":
        print("错误: 文本内容不能为空")
        sys.exit(1)

    if args.speed <= 0:
        print("错误: 语速必须大于0")
        sys.exit(1)

    # 确保输出目录存在
    output_dir = os.path.dirname(args.output)
    if output_dir and not os.path.exists(output_dir):
        os.makedirs(output_dir, exist_ok=True)

    # 获取 Python 版本
    python_version = get_python_version()
    print(f"当前 Python 版本: {python_version.major}.{python_version.minor}.{python_version.micro}")
    print()

    # 自动选择或强制指定引擎
    use_coqui_tts = False
    use_edge_tts = False

    if args.force_engine == "coqui":
        use_coqui_tts = True
        print("强制使用 Coqui TTS 引擎")
    elif args.force_engine == "edge":
        use_edge_tts = True
        print("强制使用 Edge-TTS 引擎")
    else:
        # 自动选择
        if python_version.major == 3 and python_version.minor >= 12:
            use_edge_tts = True
            print(f"检测到 Python {python_version.major}.{python_version.minor}，自动使用 Edge-TTS 引擎（兼容 Python 3.12+）")
        else:
            use_coqui_tts = True
            print(f"检测到 Python {python_version.major}.{python_version.minor}，自动使用 Coqui TTS 引擎（高质量）")
    print()

    # 执行转换
    if use_edge_tts:
        import asyncio
        asyncio.run(text_to_speech_edge_tts(
            text=args.text,
            language=args.language,
            voice_name=args.voice_name,
            output_path=args.output,
            speed=args.speed
        ))
    elif use_coqui_tts:
        text_to_speech_coqui_tts(
            text=args.text,
            language=args.language,
            model_name=args.model_name,
            output_path=args.output,
            speed=args.speed,
            speaker_idx=args.speaker_idx,
            voice_name=args.voice_name
        )


if __name__ == "__main__":
    main()
