# encoding:utf-8

import sys
import os

# 添加当前目录到系统路径
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from bot.bot_factory import create_bot
from common import const
from bridge.context import Context, ContextType


def test_volcengine_bot():
    print("=== 测试火山引擎Bot ===")
    
    try:
        # 创建火山引擎Bot实例
        print("1. 创建火山引擎Bot实例...")
        bot = create_bot(const.VOLCENGINE)
        print("✓ Bot实例创建成功")
        
        # 测试简单回复
        print("\n2. 测试简单回复...")
        context = Context(ContextType.TEXT, "你好，测试连接")
        context["session_id"] = "test_session"
        
        reply = bot.reply("你好，测试连接", context)
        print(f"✓ 回复成功")
        print(f"回复内容: {reply.content}")
        print(f"回复类型: {reply.type}")
        
        # 测试会话管理
        print("\n3. 测试会话管理...")
        context2 = Context(ContextType.TEXT, "你刚才说了什么")
        context2["session_id"] = "test_session"
        
        reply2 = bot.reply("你刚才说了什么", context2)
        print(f"✓ 会话回复成功")
        print(f"回复内容: {reply2.content}")
        
        print("\n=== 测试完成 ===")
        print("火山引擎Bot测试通过！")
        
    except Exception as e:
        print(f"\n✗ 测试失败: {e}")
        import traceback
        traceback.print_exc()


if __name__ == "__main__":
    test_volcengine_bot()
