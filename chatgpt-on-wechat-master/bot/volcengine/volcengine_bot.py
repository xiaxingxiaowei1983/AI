# encoding:utf-8

import time
import json
import requests

from bot.bot import Bot
from bot.session_manager import SessionManager, Session
from bridge.context import ContextType
from bridge.reply import Reply, ReplyType
from common.log import logger
from config import conf

user_session = dict()


class VolcengineSession(Session):
    def __init__(self, session_id, system_prompt=None, **kwargs):
        super().__init__(session_id, system_prompt)
        self.model = kwargs.get("model", "doubao-seed-2-0-code-preview-260215")

    def discard_exceeding(self, max_tokens=None, cur_tokens=None):
        # 简单的消息长度管理
        if len(self.messages) > 10:
            # 保留系统消息和最近的几条消息
            system_msg = self.messages[0]
            self.messages = [system_msg] + self.messages[-8:]
        return 0

    def calc_tokens(self):
        # 简单的token计算
        total_tokens = 0
        for msg in self.messages:
            total_tokens += len(msg.get("content", "")) // 4  # 粗略估算
        return total_tokens


# 火山引擎对话模型API
class VolcengineBot(Bot):
    def __init__(self):
        super().__init__()
        
        # 从配置中获取火山引擎API配置
        self.api_key = conf().get("volcengine_api_key", "c13b2982-0aab-4c75-9404-0deb12a219ec")
        api_base = conf().get("volcengine_api_base", "https://ark.cn-beijing.volces.com/api/v3")
        self.endpoint = f"{api_base}/chat/completions"
        self.model = conf().get("volcengine_model", "doubao-seed-2-0-code-preview-260215")
        
        proxy = conf().get("proxy")
        self.proxy = proxy
        
        # 初始化会话管理器
        self.sessions = SessionManager(VolcengineSession, model=self.model)
        self.args = {
            "model": self.model,  # 对话模型的名称
            "temperature": conf().get("temperature", 0.7),  # 值在[0,1]之间，越大表示回复越具有不确定性
            "max_tokens": 1000,  # 回复最大的字符数
            "top_p": 1,
            "frequency_penalty": conf().get("frequency_penalty", 0.0),  # [-2,2]之间，该值越大则更倾向于产生不同的内容
            "presence_penalty": conf().get("presence_penalty", 0.0),  # [-2,2]之间，该值越大则更倾向于产生不同的内容
            "request_timeout": conf().get("request_timeout", 60),  # 请求超时时间
            "timeout": conf().get("request_timeout", 60),  # 重试超时时间
        }

    def reply(self, query, context=None):
        # acquire reply content
        if context and context.type:
            if context.type == ContextType.TEXT:
                logger.info("[VOLCENGINE] query={}".format(query))
                session_id = context["session_id"]
                reply = None
                if query == "#清除记忆":
                    self.sessions.clear_session(session_id)
                    reply = Reply(ReplyType.INFO, "记忆已清除")
                elif query == "#清除所有":
                    self.sessions.clear_all_session()
                    reply = Reply(ReplyType.INFO, "所有人记忆已清除")
                else:
                    session = self.sessions.session_query(query, session_id)
                    result = self.reply_text(session)
                    total_tokens, completion_tokens, reply_content = (
                        result["total_tokens"],
                        result["completion_tokens"],
                        result["content"],
                    )
                    logger.debug(
                        "[VOLCENGINE] session_id={}, reply_cont={}, completion_tokens={}".format(session_id, reply_content, completion_tokens)
                    )

                    if total_tokens == 0:
                        reply = Reply(ReplyType.ERROR, reply_content)
                    else:
                        self.sessions.session_reply(reply_content, session_id, total_tokens)
                        reply = Reply(ReplyType.TEXT, reply_content)
                return reply

    def reply_text(self, session, retry_count=0):
        try:
            # 构建请求体
            messages = []
            # 添加历史消息
            for msg in session.messages:
                if isinstance(msg, dict):
                    # 如果msg是字典，直接使用
                    if msg.get("role") == "user":
                        messages.append({"role": "user", "content": msg.get("content", "")})
                    elif msg.get("role") == "assistant":
                        messages.append({"role": "assistant", "content": msg.get("content", "")})
                    elif msg.get("role") == "system":
                        # 保留系统消息
                        messages.append(msg)
            
            # 添加当前查询
            # 从session中获取当前查询
            current_query = session.messages[-1].get("content", "") if session.messages else ""
            messages.append({"role": "user", "content": current_query})
            
            # 构建请求数据
            data = {
                "model": self.model,
                "messages": messages,
                "temperature": self.args["temperature"],
                "max_tokens": self.args["max_tokens"]
            }
            
            # 构建请求头
            headers = {
                "Authorization": f"Bearer {self.api_key}",
                "Content-Type": "application/json"
            }
            
            # 发送请求
            logger.debug("[VOLCENGINE] 发送请求到: {}".format(self.endpoint))
            logger.debug("[VOLCENGINE] 请求数据: {}".format(json.dumps(data, ensure_ascii=False)))
            
            response = requests.post(
                self.endpoint,
                headers=headers,
                json=data,
                timeout=self.args["request_timeout"],
                proxies={"https": self.proxy} if self.proxy else None
            )
            
            logger.debug("[VOLCENGINE] 响应状态码: {}".format(response.status_code))
            logger.debug("[VOLCENGINE] 响应内容: {}".format(response.text))
            
            if response.status_code != 200:
                raise Exception(f"API请求失败: {response.status_code} - {response.text}")
            
            # 解析响应
            response_data = response.json()
            if "choices" not in response_data or len(response_data["choices"]) == 0:
                raise Exception("响应格式错误: 没有choices字段")
            
            res_content = response_data["choices"][0]["message"]["content"].strip()
            
            # 提取使用情况
            usage = response_data.get("usage", {})
            total_tokens = usage.get("total_tokens", 0)
            completion_tokens = usage.get("completion_tokens", 0)
            
            logger.info("[VOLCENGINE] reply={}".format(res_content))
            return {
                "total_tokens": total_tokens,
                "completion_tokens": completion_tokens,
                "content": res_content,
            }
        except Exception as e:
            need_retry = retry_count < 2
            result = {"total_tokens": 0, "completion_tokens": 0, "content": "我现在有点累了，等会再来吧"}
            if isinstance(e, requests.exceptions.Timeout):
                logger.warn("[VOLCENGINE] Timeout: {}".format(e))
                result["content"] = "我没有收到你的消息"
                if need_retry:
                    time.sleep(5)
            elif isinstance(e, requests.exceptions.ConnectionError):
                logger.warn("[VOLCENGINE] ConnectionError: {}".format(e))
                result["content"] = "网络连接失败"
                if need_retry:
                    time.sleep(3)
            else:
                logger.warn("[VOLCENGINE] Exception: {}".format(e))
                need_retry = False

            if need_retry:
                logger.warn("[VOLCENGINE] 第{}次重试".format(retry_count + 1))
                return self.reply_text(session, retry_count + 1)
            else:
                return result
