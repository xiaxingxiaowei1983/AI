#!/usr/bin/env python3
"""
图片生成器 - 使用Coze Workflow API生成知识可视化图片

使用方法：
    python image_generator.py --prompt "<图片描述>" --output-dir <输出目录>

参数说明：
    --prompt: 图片生成提示词（必需）
    --workflow-id: 工作流ID（可选，默认使用绘本生成工作流）
    --output-dir: 输出目录（可选，默认当前目录）
"""

import argparse
import json
import os
import sys
import time
import requests


# 配置常量
SKILL_ID = os.getenv("SKILL_ID", "7597050443159846931")  # 从环境变量获取，或使用默认值
CREDENTIAL_KEY = f"COZE_COZE_WORKFLOW_{SKILL_ID}"
API_URL = "https://api.coze.cn/open_api/v2/chat"
DEFAULT_WORKFLOW_ID = os.getenv("COZE_WORKFLOW_ID", "7580057636931158067")  # 从环境变量获取，或使用默认值
TIMEOUT_SECONDS = int(os.getenv("COZE_TIMEOUT", "120"))  # 从环境变量获取，默认120秒
POLL_INTERVAL = int(os.getenv("COZE_POLL_INTERVAL", "5"))  # 从环境变量获取，默认5秒


def get_bearer_token():
    """从环境变量获取Bearer Token（优先使用扣子默认环境变量，其次使用skill_credentials配置）"""
    # 优先尝试扣子默认的环境变量
    token = os.getenv("COZE_API_TOKEN") or os.getenv("COZE_WORKFLOW_TOKEN")

    # 如果扣子默认环境变量不存在，则使用skill_credentials配置的环境变量
    if not token:
        token = os.getenv(CREDENTIAL_KEY)

    if not token:
        raise ValueError(
            f"缺少环境变量，请确保配置以下之一：\n"
            f"1. 扣子默认环境变量：COZE_API_TOKEN 或 COZE_WORKFLOW_TOKEN\n"
            f"2. skill_credentials配置：{CREDENTIAL_KEY}"
        )
    return token


def submit_task(workflow_id: str, prompt: str, token: str) -> str:
    """提交图片生成任务，返回任务ID"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    payload = {
        "workflow_id": workflow_id,
        "parameters": {
            "story_info": prompt  # 使用story_info作为参数名
        }
    }

    try:
        response = requests.post(API_URL, headers=headers, json=payload, timeout=30)
        response.raise_for_status()
        data = response.json()

        # 解析任务ID（根据实际API响应结构调整）
        task_id = data.get("data", {}).get("id")
        if not task_id:
            raise ValueError(f"未获取到任务ID，API响应: {json.dumps(data, ensure_ascii=False)}")

        return task_id

    except requests.exceptions.RequestException as e:
        raise Exception(f"提交任务失败: {str(e)}")


def get_poll_interval(elapsed: int) -> int:
    """根据已等待时间动态调整轮询间隔
    
    Args:
        elapsed: 已等待的秒数
        
    Returns:
        轮询间隔秒数
    """
    if elapsed < 30:
        return 5  # 前30秒：每5秒轮询
    elif elapsed < 60:
        return 10  # 30-60秒：每10秒轮询
    else:
        return 15  # 60秒后：每15秒轮询


def poll_task_status(task_id: str, token: str) -> dict:
    """轮询任务状态，直到完成或超时（优化版：动态间隔+进度提示）"""
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    start_time = time.time()
    last_prompt_time = 0

    while time.time() - start_time < TIMEOUT_SECONDS:
        try:
            response = requests.get(
                f"{API_URL}/{task_id}",
                headers=headers,
                timeout=30
            )
            response.raise_for_status()
            data = response.json()

            # 检查任务状态（根据实际API响应结构调整）
            task_data = data.get("data", {})
            status = task_data.get("status")

            if status == "success" or status == "completed":
                print("✅ 图片生成完成！")
                return task_data
            elif status == "failed":
                raise Exception(f"任务执行失败: {task_data.get('error', '未知错误')}")
            elif status in ["running", "pending"]:
                elapsed = int(time.time() - start_time)
                
                # 每10秒提示一次进度
                if elapsed - last_prompt_time >= 10:
                    remaining = TIMEOUT_SECONDS - elapsed
                    print(f"⏳ 正在生成图片... 已等待 {elapsed} 秒（最长 {TIMEOUT_SECONDS} 秒，剩余 {remaining} 秒）")
                    last_prompt_time = elapsed
                
                # 动态调整轮询间隔
                interval = get_poll_interval(elapsed)
                time.sleep(interval)
                continue
            else:
                elapsed = int(time.time() - start_time)
                print(f"任务状态: {status}，已等待 {elapsed} 秒...")
                interval = get_poll_interval(elapsed)
                time.sleep(interval)

        except requests.exceptions.RequestException as e:
            elapsed = int(time.time() - start_time)
            print(f"⚠️ 查询任务状态失败: {str(e)}，已等待 {elapsed} 秒，10秒后重试...")
            time.sleep(10)

    raise TimeoutError(f"❌ 任务执行超时（超过{TIMEOUT_SECONDS}秒），请重试或减少生成数量")


def extract_image_urls(task_data: dict) -> list:
    """从任务结果中提取图片URL列表"""
    # 根据实际API响应结构调整解析逻辑
    outputs = task_data.get("outputs", {})

    # 尝试多种可能的字段名
    image_urls = []
    for key in ["image_urls", "images", "image_list", "pictures"]:
        if key in outputs:
            urls = outputs[key]
            if isinstance(urls, list):
                image_urls.extend(urls)
            elif isinstance(urls, str):
                image_urls.append(urls)

    if not image_urls:
        print(f"警告: 未找到图片URL，任务数据: {json.dumps(task_data, ensure_ascii=False)}")

    return image_urls


def download_image(url: str, output_path: str) -> None:
    """下载图片并保存到本地"""
    try:
        response = requests.get(url, timeout=30)
        response.raise_for_status()

        with open(output_path, 'wb') as f:
            f.write(response.content)

        print(f"图片已保存: {output_path}")

    except requests.exceptions.RequestException as e:
        raise Exception(f"下载图片失败 {url}: {str(e)}")


def generate_images(
    prompt: str,
    workflow_id: str = None,
    output_dir: str = "."
) -> list:
    """
    生成知识可视化图片

    Args:
        prompt: 图片生成提示词
        workflow_id: 工作流ID，默认使用绘本生成工作流
        output_dir: 输出目录

    Returns:
        生成的图片文件路径列表
    """
    # 使用默认工作流ID
    if not workflow_id:
        workflow_id = DEFAULT_WORKFLOW_ID

    # 获取认证Token
    token = get_bearer_token()

    # 创建输出目录
    os.makedirs(output_dir, exist_ok=True)

    # 提交任务
    print(f"🚀 提交图片生成任务...")
    print(f"📋 工作流ID: {workflow_id}")
    print(f"💬 提示词: {prompt[:100]}...")  # 只显示前100个字符

    task_id = submit_task(workflow_id, prompt, token)
    print(f"✅ 任务ID: {task_id}")
    print(f"⏱️ 最长等待时间: {TIMEOUT_SECONDS} 秒（约 {TIMEOUT_SECONDS//60} 分钟）")
    print(f"⏳ 等待任务完成...")

    # 轮询任务状态
    task_data = poll_task_status(task_id, token)
    
    # 提取图片URL
    image_urls = extract_image_urls(task_data)
    print(f"📷 获取到 {len(image_urls)} 张图片URL")

    if not image_urls:
        raise Exception("❌ 未获取到任何图片URL，请检查API响应")

    # 下载图片
    image_paths = []
    print(f"⬇️ 开始下载图片...")
    for idx, url in enumerate(image_urls, 1):
        # 确定文件扩展名
        ext = ".png"
        if ".jpg" in url.lower() or ".jpeg" in url.lower():
            ext = ".jpg"

        # 生成文件名
        filename = f"image{idx}{ext}"
        filepath = os.path.join(output_dir, filename)

        # 下载并保存
        download_image(url, filepath)
        image_paths.append(filepath)

    print(f"✅ 所有图片下载完成")
    print(f"📁 保存位置: {output_dir}")

    return image_paths


def main():
    """命令行入口"""
    parser = argparse.ArgumentParser(description='使用Coze Workflow API生成知识可视化图片')
    parser.add_argument('--prompt', '-p', required=True, help='图片生成提示词')
    parser.add_argument('--workflow-id', '-w', help='工作流ID（默认使用绘本生成工作流）')
    parser.add_argument('--output-dir', '-o', default='.', help='输出目录（默认当前目录）')

    args = parser.parse_args()

    try:
        print("=" * 60)
        print("🎨 Coze Workflow 图片生成器")
        print("=" * 60)
        
        image_paths = generate_images(
            prompt=args.prompt,
            workflow_id=args.workflow_id,
            output_dir=args.output_dir
        )

        print("\n" + "=" * 60)
        print("✅ 生成完成")
        print("=" * 60)
        print(f"📷 生成的图片文件:")
        for path in image_paths:
            print(f"   ✓ {path}")
        print("=" * 60)

        return 0

    except TimeoutError as e:
        print(f"\n{'=' * 60}")
        print(f"❌ {str(e)}")
        print(f"💡 建议：")
        print(f"   1. 检查网络连接")
        print(f"   2. 减少生成的图片数量")
        print(f"   3. 尝试简化提示词")
        print(f"{'=' * 60}")
        return 1
        
    except Exception as e:
        print(f"\n{'=' * 60}")
        print(f"❌ 错误: {str(e)}")
        print(f"{'=' * 60}")
        return 1


if __name__ == '__main__':
    sys.exit(main())
