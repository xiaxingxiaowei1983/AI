#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
检查所有智能体的启动状态
"""

import os
import json

# 智能体列表
agents = [
    {"cn_name": "大宗师", "en_name": "Master", "path": "master"},
    {"cn_name": "大掌柜", "en_name": "COO", "path": "coo"},
    {"cn_name": "赛博天工", "en_name": "CTO", "path": "cto"},
    {"cn_name": "绿茶", "en_name": "Green Tea", "path": "green-tea"},
    {"cn_name": "谛听", "en_name": "CCO", "path": "business"},
    {"cn_name": "人生决策宗师", "en_name": "CLO", "path": "life"},
    {"cn_name": "Content", "en_name": "Content", "path": "content"}
]

print("=====================================")
print("AWKN LAB | 定数实验室 - 智能体启动检查")
print("=====================================")

# 检查每个智能体
for agent in agents:
    print(f"\n检查 {agent['cn_name']} ({agent['en_name']}) 智能体...")
    
    # 检查配置文件是否存在
    config_path = f"c:\\Users\\10919\\Desktop\\AI\\agents\\{agent['path']}\\config.json"
    if os.path.exists(config_path):
        print(f"✅ 配置文件存在: {config_path}")
        
        # 读取配置文件
        try:
            with open(config_path, 'r', encoding='utf-8') as f:
                config = json.load(f)
            print("✅ 配置文件格式正确")
            
            # 检查公司背景信息
            if "company_context" in config:
                print("✅ 公司背景信息已添加")
            else:
                print("❌ 缺少公司背景信息")
            
            # 检查启动方案
            if "startup" in config and config.get("startup", {}).get("enabled", False):
                print("✅ 启动方案已配置")
                print("   状态: 就绪")
            else:
                print("❌ 缺少启动方案或未启用")
            
        except Exception as e:
            print(f"❌ 配置文件读取错误: {str(e)}")
    else:
        print(f"❌ 配置文件不存在: {config_path}")

print("\n=====================================")
print("智能体启动检查完成")
print("=====================================")
