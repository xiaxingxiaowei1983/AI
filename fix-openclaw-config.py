#!/usr/bin/env python3
# -*- coding: utf-8 -*-

"""
修复OpenClaw配置文件，移除anthropic/gpt-4模型设置
"""

import json
import os

# OpenClaw配置文件路径
CONFIG_PATH = os.path.expanduser('~/.openclaw/openclaw.json')


def fix_openclaw_config():
    print("=== 修复OpenClaw配置文件 ===")
    
    if not os.path.exists(CONFIG_PATH):
        print(f"错误：配置文件不存在: {CONFIG_PATH}")
        return False
    
    try:
        # 读取配置文件
        with open(CONFIG_PATH, 'r', encoding='utf-8') as f:
            config = json.load(f)
        
        print("1. 读取配置文件成功")
        
        # 检查是否存在agents.defaults.model配置
        if 'agents' in config and 'defaults' in config['agents'] and 'model' in config['agents']['defaults']:
            # 修改主模型
            config['agents']['defaults']['model']['primary'] = 'doubao-seed-2-0-code-preview-260215'
            # 清空fallbacks
            config['agents']['defaults']['model']['fallbacks'] = []
            
            # 修改models配置
            config['agents']['defaults']['models'] = {
                'doubao-seed-2-0-code-preview-260215': {}
            }
            
            print("2. 修改配置成功")
            print(f"   新的主模型: {config['agents']['defaults']['model']['primary']}")
            print(f"   Fallback模型: {config['agents']['defaults']['model']['fallbacks']}")
            print(f"   可用模型: {list(config['agents']['defaults']['models'].keys())}")
        else:
            print("错误：配置文件格式不正确，未找到agents.defaults.model配置")
            return False
        
        # 保存修改后的配置
        with open(CONFIG_PATH, 'w', encoding='utf-8') as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
        
        print("3. 保存配置文件成功")
        print(f"   配置文件路径: {CONFIG_PATH}")
        
        print("\n=== 修复完成 ===")
        print("飞书机器人现在将使用豆包模型: doubao-seed-2-0-code-preview-260215")
        print("不再使用anthropic/gpt-4模型")
        
        return True
        
    except Exception as e:
        print(f"错误：{str(e)}")
        return False


if __name__ == "__main__":
    fix_openclaw_config()
