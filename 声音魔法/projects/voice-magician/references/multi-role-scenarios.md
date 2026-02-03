# 多人配音场景指南

## 目录
- [场景一：小说群像配音](#场景一小说群像配音)
- [场景二：播客对话配音](#场景二播客对话配音)
- [场景三：视频剧配音](#场景三视频剧配音)
- [场景四：有声书分角色朗读](#场景四有声书分角色朗读)
- [场景五：客服对话模拟](#场景五客服对话模拟)
- [多人配音工作流程](#多人配音工作流程)
- [音频合并工具](#音频合并工具)

## 场景一：小说群像配音

### 角色设定表

| 角色类型 | 推荐音色（中文） | 推荐音色（英文） | 特点说明 |
|---------|----------------|----------------|---------|
| **男主角** | zh-CN-YunyangNeural（男声云端） | en-US-GuyNeural | 稳重、有磁性、充满力量 |
| **女主角** | zh-CN-YunxiNeural（女声云希） | en-US-AriaNeural | 温柔、细腻、富有感情 |
| **男二号** | zh-CN-YunyeNeural（男声云野） | en-US-ChristopherNeural | 活泼、阳光、有冲劲 |
| **女二号** | zh-CN-XiaoxiaoNeural（女声晓晓） | en-US-JennyNeural | 清晰、专业、知性 |
| **小孩** | zh-CN-XiaoxuanNeural（女声晓萱） | en-US-MichelleNeural | 活泼、可爱、童真 |
| **老人（男）** | zh-CN-YunjianNeural（男声云健） | en-US-TonyNeural | 沉稳、慈祥、有智慧 |
| **老人（女）** | zh-CN-XiaowanNeural（女声晓婉） | en-US-SoniaNeural | 慈祥、温和、亲切 |
| **反派/反派配角** | zh-CN-XiaoyuNeural（男声晓宇） | en-US-EricNeural | 低沉、略带邪恶感 |

### 实战示例：玄幻小说片段

#### 剧本片段
```
【场景】天雷宗大殿，风雨欲来

张阳（男主角）：三年了，我终于突破了封印！
林月（女主角）：张阳，你要小心，长老们已经察觉到了。
小飞（小孩）：哥哥，我怕！
张阳：别怕，有我在，谁也不能伤害你。
黑风长老（反派）：哼，黄口小儿，也敢如此狂妄！
林月：黑风长老，请你自重！
```

#### 执行命令

```bash
# 1. 男主角张阳
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "三年了，我终于突破了封印！" \
  --voice_name zh-CN-YunyangNeural \
  --speed 0.95 \
  --output ./novel/01_zhangyang_1.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "别怕，有我在，谁也不能伤害你。" \
  --voice_name zh-CN-YunyangNeural \
  --speed 0.9 \
  --output ./novel/02_zhangyang_2.wav

# 2. 女主角林月
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "张阳，你要小心，长老们已经察觉到了。" \
  --voice_name zh-CN-YunxiNeural \
  --speed 1.0 \
  --output ./novel/03_linyue_1.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "黑风长老，请你自重！" \
  --voice_name zh-CN-YunxiNeural \
  --speed 1.1 \
  --output ./novel/04_linyue_2.wav

# 3. 小孩小飞
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "哥哥，我怕！" \
  --voice_name zh-CN-XiaoxuanNeural \
  --speed 1.1 \
  --output ./novel/05_xiaofei.wav

# 4. 反派黑风长老
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "哼，黄口小儿，也敢如此狂妄！" \
  --voice_name zh-CN-XiaoyuNeural \
  --speed 0.85 \
  --output ./novel/06_heifeng.wav
```

#### 批量脚本（推荐）

```bash
#!/bin/bash
# novel_dubbing.sh - 小说群像配音批量脚本

# 角色语音生成函数
gen_voice() {
    local role=$1
    local voice=$2
    local text=$3
    local speed=$4
    local output=$5
    
    python /workspace/projects/voice-magician/scripts/text_to_speech.py \
        --text "$text" \
        --voice_name "$voice" \
        --speed "$speed" \
        --output "$output"
    
    echo "✓ 已生成: $role - $output"
}

# 创建输出目录
mkdir -p ./novel

# 生成所有角色语音
gen_voice "张阳" "zh-CN-YunyangNeural" "三年了，我终于突破了封印！" "0.95" "./novel/01_zhangyang_1.wav"
gen_voice "林月" "zh-CN-YunxiNeural" "张阳，你要小心，长老们已经察觉到了。" "1.0" "./novel/02_linyue_1.wav"
gen_voice "小飞" "zh-CN-XiaoxuanNeural" "哥哥，我怕！" "1.1" "./novel/03_xiaofei.wav"
gen_voice "张阳" "zh-CN-YunyangNeural" "别怕，有我在，谁也不能伤害你。" "0.9" "./novel/04_zhangyang_2.wav"
gen_voice "黑风长老" "zh-CN-XiaoyuNeural" "哼，黄口小儿，也敢如此狂妄！" "0.85" "./novel/05_heifeng.wav"
gen_voice "林月" "zh-CN-YunxiNeural" "黑风长老，请你自重！" "1.1" "./novel/06_linyue_2.wav"

echo "✓ 所有语音生成完成！"
echo "✓ 音频文件保存在: ./novel/"
```

### 角色音色调整技巧

| 角色 | 语速 | 调音理由 |
|------|------|---------|
| 主角（英勇） | 0.9-0.95 | 稳重有力，不急不躁 |
| 主角（急切） | 1.1-1.2 | 紧张感，节奏加快 |
| 女主角（温柔） | 1.0 | 自然、亲切 |
| 女主角（愤怒） | 1.1-1.15 | 语调提升，情绪激昂 |
| 小孩 | 1.1-1.2 | 活泼、天真 |
| 老人 | 0.85-0.9 | 缓慢、稳重、有智慧 |
| 反派 | 0.85 | 低沉、压抑、邪恶感 |

## 场景二：播客对话配音

### 播客类型一：双人对话

#### 剧本：科技话题讨论

```
【主持人 A】：今天我们聊聊人工智能的发展
【主持人 B】：是啊，AI 真的改变了我们的生活
【主持人 A】：比如说，我们现在用的语音助手
【主持人 B】：对，而且它越来越智能了
【主持人 A】：未来的 AI 会是什么样呢？
【主持人 B】：我觉得会越来越像人
```

#### 执行命令

```bash
# 创建输出目录
mkdir -p ./podcast/dual

# 主持人 A（男声）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "今天我们聊聊人工智能的发展" \
  --voice_name zh-CN-YunyangNeural \
  --speed 1.0 \
  --output ./podcast/dual/01_hostA.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "比如说，我们现在用的语音助手" \
  --voice_name zh-CN-YunyangNeural \
  --speed 1.0 \
  --output ./podcast/dual/03_hostA.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "未来的 AI 会是什么样呢？" \
  --voice_name zh-CN-YunyangNeural \
  --speed 0.95 \
  --output ./podcast/dual/05_hostA.wav

# 主持人 B（女声）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "是啊，AI 真的改变了我们的生活" \
  --voice_name zh-CN-YunxiNeural \
  --speed 1.0 \
  --output ./podcast/dual/02_hostB.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "对，而且它越来越智能了" \
  --voice_name zh-CN-YunxiNeural \
  --speed 1.0 \
  --output ./podcast/dual/04_hostB.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "我觉得会越来越像人" \
  --voice_name zh-CN-YunxiNeural \
  --speed 1.0 \
  --output ./podcast/dual/06_hostB.wav
```

### 播客类型二：三人圆桌讨论

#### 角色设定
- **主持人**（男）：引导话题、总结
- **嘉宾 A**（女）：专业分析、观点独特
- **嘉宾 B**（男）：补充说明、提问互动

#### 剧本：创业话题讨论

```
【主持人】：欢迎大家收听今天的创业故事分享
【嘉宾 A】：很高兴能来到这个节目
【嘉宾 B】：我也是，期待今天的讨论
【主持人】：今天我们聊聊创业初期遇到的困难
【嘉宾 A】：我觉得最大的困难是资金问题
【嘉宾 B】：确实，而且还要应对市场竞争
【主持人】：那两位是如何克服的呢？
【嘉宾 A】：我们通过参加创业大赛获得了启动资金
【嘉宾 B】：我们则专注于产品差异化，找到了细分市场
【主持人】：非常感谢两位的分享
【嘉宾 A】：谢谢邀请
【嘉宾 B】：有机会下次再聊
```

#### 执行命令

```bash
mkdir -p ./podcast/trio

# 主持人（男声）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "欢迎大家收听今天的创业故事分享" \
  --voice_name zh-CN-YunyangNeural \
  --output ./podcast/trio/01_host.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "今天我们聊聊创业初期遇到的困难" \
  --voice_name zh-CN-YunyangNeural \
  --output ./podcast/trio/04_host.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "那两位是如何克服的呢？" \
  --voice_name zh-CN-YunyangNeural \
  --output ./podcast/trio/07_host.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "非常感谢两位的分享" \
  --voice_name zh-CN-YunyangNeural \
  --output ./podcast/trio/10_host.wav

# 嘉宾 A（女声）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "很高兴能来到这个节目" \
  --voice_name zh-CN-XiaoxiaoNeural \
  --output ./podcast/trio/02_guestA.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "我觉得最大的困难是资金问题" \
  --voice_name zh-CN-XiaoxiaoNeural \
  --output ./podcast/trio/05_guestA.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "我们通过参加创业大赛获得了启动资金" \
  --voice_name zh-CN-XiaoxiaoNeural \
  --output ./podcast/trio/08_guestA.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "谢谢邀请" \
  --voice_name zh-CN-XiaoxiaoNeural \
  --output ./podcast/trio/11_guestA.wav

# 嘉宾 B（男声）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "我也是，期待今天的讨论" \
  --voice_name zh-CN-YunyeNeural \
  --output ./podcast/trio/03_guestB.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "确实，而且还要应对市场竞争" \
  --voice_name zh-CN-YunyeNeural \
  --output ./podcast/trio/06_guestB.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "我们则专注于产品差异化，找到了细分市场" \
  --voice_name zh-CN-YunyeNeural \
  --output ./podcast/trio/09_guestB.wav

python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "有机会下次再聊" \
  --voice_name zh-CN-YunyeNeural \
  --output ./podcast/trio/12_guestB.wav
```

### 播客对话节奏控制

| 对话类型 | 语速 | 间隔 | 场景说明 |
|---------|------|------|---------|
| 正常讨论 | 1.0 | 0.5-1.0秒 | 标准对话节奏 |
| 热烈讨论 | 1.1-1.2 | 0.3-0.5秒 | 兴奋、激烈的话题 |
| 深度访谈 | 0.9 | 1.0-1.5秒 | 沉思、深度话题 |
| 轻松闲聊 | 1.0-1.05 | 0.5秒 | 轻松、随意 |
| 问答环节 | 0.95-1.0 | 1.0秒 | 主持人提问、嘉宾回答 |

## 场景三：视频剧配音

### 角色类型推荐

| 角色类型 | 推荐音色 | 适用场景 |
|---------|---------|---------|
| **霸道总裁** | zh-CN-YunyangNeural | 商战剧、都市剧 |
| **高冷男二** | zh-CN-XiaoyuNeural | 青春剧、校园剧 |
| **元气女主** | zh-CN-XiaoxuanNeural | 青春剧、喜剧 |
| **知性女主** | zh-CN-XiaoxiaoNeural | 职场剧、都市剧 |
| **慈祥奶奶** | zh-CN-XiaowanNeural | 家庭剧、年代剧 |
| **威严爷爷** | zh-CN-YunjianNeural | 家庭剧、历史剧 |

### 剧本示例：职场剧

```bash
# 创建目录
mkdir -p ./drama/workplace

# 总裁（男）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "小王，这个方案还有改进的空间" \
  --voice_name zh-CN-YunyangNeural \
  --speed 0.9 \
  --output ./drama/workplace/01_ceo.wav

# 女主角（知性）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "好的，总裁，我会重新修改" \
  --voice_name zh-CN-XiaoxiaoNeural \
  --speed 1.0 \
  --output ./drama/workplace/02_female.wav

# 男二（高冷）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "其实我觉得她的方案已经很完善了" \
  --voice_name zh-CN-XiaoyuNeural \
  --speed 0.95 \
  --output ./drama/workplace/03_male2.wav

# 总裁（男）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "好吧，再给她一次机会" \
  --voice_name zh-CN-YunyangNeural \
  --speed 0.85 \
  --output ./drama/workplace/04_ceo.wav
```

## 场景四：有声书分角色朗读

### 朗读者角色表

| 角色 | 推荐音色 | 特点 | 适用章节 |
|------|---------|------|---------|
| **旁白** | zh-CN-XiaoxiaoNeural | 清晰、中性、不抢戏 | 所有章节 |
| **主角** | zh-CN-YunyangNeural | 情绪饱满、代入感强 | 主角对话 |
| **配角** | zh-CN-YunxiNeural | 区分度高、不混淆 | 配角对话 |
| **老人/小孩** | 按角色选择 | 符合角色特征 | 特定角色对话 |

### 批量生成脚本

```bash
#!/bin/bash
# audiobook.sh - 有声书分角色朗读脚本

# 旁白（统一音色）
gen_narrator() {
    local text=$1
    local filename=$2
    
    python /workspace/projects/voice-magician/scripts/text_to_speech.py \
        --text "$text" \
        --voice_name zh-CN-XiaoxiaoNeural \
        --speed 0.95 \
        --output "./audiobook/$filename"
}

# 角色对话（根据角色选择音色）
gen_dialogue() {
    local role=$1
    local voice=$2
    local text=$3
    local filename=$4
    local speed=$5
    
    python /workspace/projects/voice-magician/scripts/text_to_speech.py \
        --text "$text" \
        --voice_name "$voice" \
        --speed "$speed" \
        --output "./audiobook/$filename"
    
    echo "✓ $role: $filename"
}

mkdir -p ./audiobook

# 第一章
gen_narrator "第一章：初遇" "01_chapter1_narrator.wav"
gen_dialogue "主角" "zh-CN-YunyangNeural" "你好，请问这里是什么地方？" "02_protagonist.wav" "1.0"
gen_dialogue "路人" "zh-CN-YunyeNeural" "这里是天都城，你是外地来的吧？" "03_passerby.wav" "1.0"
gen_narrator "主角看了看周围，确实是一个陌生的地方。" "04_narrator.wav"

echo "✓ 第一章配音完成！"
```

## 场景五：客服对话模拟

### 角色设定

| 角色 | 推荐音色 | 语速 | 特点 |
|------|---------|------|------|
| **客服 A** | zh-CN-XiaoxiaoNeural | 1.0 | 专业、清晰、耐心 |
| **客服 B** | zh-CN-YunxiNeural | 1.0 | 温柔、亲切、友好 |
| **客户（男）** | zh-CN-YunyangNeural | 1.0-1.1 | 急切、疑问 |
| **客户（女）** | zh-CN-XiaoxuanNeural | 1.0-1.1 | 感谢、满意 |

### 客服对话示例

```bash
mkdir -p ./service

# 客户（男）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "你好，我购买的商品还没收到，能帮我查一下吗？" \
  --voice_name zh-CN-YunyangNeural \
  --speed 1.1 \
  --output ./service/01_customer.wav

# 客服 A（女）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "好的，先生，请提供您的订单号，我马上帮您查询。" \
  --voice_name zh-CN-XiaoxiaoNeural \
  --speed 1.0 \
  --output ./service/02_serviceA.wav

# 客户（男）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "订单号是 20240120001" \
  --voice_name zh-CN-YunyangNeural \
  --speed 1.0 \
  --output ./service/03_customer.wav

# 客服 A（女）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "感谢您的等待，您的订单已经发货，预计明天送达。" \
  --voice_name zh-CN-XiaoxiaoNeural \
  --speed 0.95 \
  --output ./service/04_serviceA.wav

# 客户（男）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "太好了，谢谢你！" \
  --voice_name zh-CN-YunyangNeural \
  --speed 1.05 \
  --output ./service/05_customer.wav

# 客服 A（女）
python /workspace/projects/voice-magician/scripts/text_to_speech.py \
  --text "不客气，祝您生活愉快！" \
  --voice_name zh-CN-XiaoxiaoNeural \
  --speed 1.0 \
  --output ./service/06_serviceA.wav
```

## 多人配音工作流程

### 标准流程

```
1. 角色设定
   ├─ 确定角色数量和类型
   ├─ 为每个角色选择合适的音色
   └─ 记录角色-音色映射表

2. 剧本准备
   ├─ 按角色分割对话
   ├─ 为每段对话添加语速标注
   └─ 生成批次文件列表

3. 语音生成
   ├─ 使用批量脚本生成所有语音
   ├─ 按角色分类存储音频文件
   └─ 验证语音质量

4. 后期处理
   ├─ 音频合并（按剧本顺序）
   ├─ 添加背景音乐（可选）
   └─ 音量平衡和降噪

5. 最终输出
   ├─ 导出为完整音频文件
   └─ 按章节/场景分割（可选）
```

### 批量生成模板

```bash
#!/bin/bash
# multi_role_dubbing.sh - 多角色配音通用模板

# 配置区域
PROJECT_NAME="my_drama"
OUTPUT_DIR="./$PROJECT_NAME"

# 角色音色映射（可修改）
declare -A VOICE_MAP=(
    ["主角"]="zh-CN-YunyangNeural"
    ["女主"]="zh-CN-YunxiNeural"
    ["配角A"]="zh-CN-YunyeNeural"
    ["配角B"]="zh-CN-XiaoxiaoNeural"
    ["老人"]="zh-CN-YunjianNeural"
    ["小孩"]="zh-CN-XiaoxuanNeural"
)

# 创建输出目录
mkdir -p "$OUTPUT_DIR"

# 语音生成函数
gen_voice() {
    local role=$1
    local text=$2
    local speed=${3:-1.0}
    local output=$4
    
    local voice=${VOICE_MAP[$role]}
    
    python /workspace/projects/voice-magician/scripts/text_to_speech.py \
        --text "$text" \
        --voice_name "$voice" \
        --speed "$speed" \
        --output "$output"
    
    echo "✓ $role: $output"
}

# 使用示例（根据实际剧本修改）
gen_voice "主角" "你好，我是男主角" "1.0" "$OUTPUT_DIR/01_protagonist.wav"
gen_voice "女主" "你好，我是女主角" "1.0" "$OUTPUT_DIR/02_heroine.wav"

echo "✓ 配音完成！文件保存在: $OUTPUT_DIR"
```

## 音频合并工具

### 方法一：使用 ffmpeg（推荐）

```bash
# 安装 ffmpeg（如果未安装）
# Ubuntu/Debian: sudo apt install ffmpeg
# macOS: brew install ffmpeg
# Windows: 下载 ffmpeg from https://ffmpeg.org/

# 创建合并脚本
cat > merge_audio.sh << 'EOF'
#!/bin/bash

# 按顺序合并音频文件
ffmpeg -f concat -safe 0 -i filelist.txt -c copy output.wav

# filelist.txt 格式：
# file '01_audio.wav'
# file '02_audio.wav'
# file '03_audio.wav'
# ...
EOF

chmod +x merge_audio.sh
```

### 方法二：使用 Python 脚本

```python
# merge_audio.py
import os
import wave

def merge_wav_files(input_files, output_file):
    """合并多个 WAV 文件"""
    # 读取第一个文件获取参数
    with wave.open(input_files[0], 'rb') as wav_file:
        params = wav_file.getparams()
        frames = wav_file.readframes(wav_file.getnframes())
    
    # 读取其余文件
    for filename in input_files[1:]:
        with wave.open(filename, 'rb') as wav_file:
            frames += wav_file.readframes(wav_file.getnframes())
    
    # 写入合并后的文件
    with wave.open(output_file, 'wb') as wav_file:
        wav_file.setparams(params)
        wav_file.writeframes(frames)
    
    print(f"✓ 合并完成: {output_file}")

# 使用示例
input_files = [
    "./novel/01_zhangyang_1.wav",
    "./novel/02_linyue_1.wav",
    "./novel/03_xiaofei.wav",
    "./novel/04_zhangyang_2.wav",
    "./novel/05_heifeng.wav",
    "./novel/06_linyue_2.wav"
]

merge_wav_files(input_files, "./novel/complete_scene.wav")
```

### 方法三：使用 pydub（需安装）

```bash
# 安装 pydub
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pydub
```

```python
# merge_with_pydub.py
from pydub import AudioSegment

def merge_with_pydub(input_files, output_file):
    """使用 pydub 合并音频"""
    combined = AudioSegment.empty()
    
    for filename in input_files:
        audio = AudioSegment.from_wav(filename)
        combined += audio
    
    # 添加间隔（可选）
    # silence = AudioSegment.silent(duration=500)  # 500ms 间隔
    # combined += silence
    
    combined.export(output_file, format="wav")
    print(f"✓ 合并完成: {output_file}")

# 使用示例
input_files = sorted([f for f in os.listdir("./novel") if f.endswith(".wav")])
full_paths = [os.path.join("./novel", f) for f in input_files]
merge_with_pydub(full_paths, "./novel/merged_audio.wav")
```

## 最佳实践

### 1. 角色音色一致性
- 同一角色在整部作品中使用相同音色
- 记录角色-音色映射表，避免混淆

### 2. 语速控制
- 根据角色性格和情绪调整语速
- 保持同一角色的语速相对稳定

### 3. 文件命名规范
```
格式: [序号]_[角色名]_[场景描述].wav
示例: 01_张阳_突破封印.wav
示例: 02_林月_警告.wav
```

### 4. 批量处理
- 使用脚本批量生成，提高效率
- 保存配置文件，便于重复使用

### 5. 质量检查
- 逐段听检查语音质量
- 注意音色切换的连贯性
- 调整不合适的参数

### 6. 项目管理
```
项目目录结构：
├── script/          # 剧本文件
├── config/          # 角色配置
├── audio/           # 生成音频
│   ├── chapter1/    # 第一章
│   ├── chapter2/    # 第二章
│   └── merged/      # 合并后音频
└── batch/           # 批量脚本
```

## 常见问题

### Q1: 如何让同一角色的音色有变化？
**A**: 可以通过调整语速和语调来实现：
- 正常: speed=1.0
- 激动: speed=1.1-1.2
- 低沉: speed=0.85-0.9
- 温柔: speed=0.95-1.0

### Q2: 如何添加背景音乐？
**A**: 使用 ffmpeg 或 pydub:
```bash
# 使用 ffmpeg
ffmpeg -i voice.wav -i bgm.wav -filter_complex "[0:a][1:a]amix=inputs=2:duration=first:dropout_transition=2" output.wav
```

### Q3: 如何调整音量平衡？
**A**: 使用 pydub:
```python
# 调整音量 +6dB
louder_audio = audio + 6

# 降低音量 -3dB
quieter_audio = audio - 3
```

### Q4: 如何批量生成大量语音？
**A**: 使用批量脚本，分批处理:
```bash
# 分批处理，每批10个文件
for i in {1..10}; do
    batch_script_batch$i.sh
    sleep 1  # 间隔1秒，避免过载
done
```

### Q5: 如何处理超长文本？
**A**: 分段处理:
```bash
# 将长文本分成多个片段（每段200字左右）
# 然后批量生成
# 最后合并
```

## 总结

多人配音是声音魔法师的强大功能之一，通过合理的角色设定和批量处理，可以高效完成：
- 小说群像配音（主角、配角、老人、小孩等）
- 播客对话配音（双人、三人讨论）
- 视频剧配音（各种角色类型）
- 有声书分角色朗读
- 客服对话模拟

关键是：
1. 合理的角色音色选择
2. 一致的参数控制
3. 高效的批量处理
4. 规范的文件管理
