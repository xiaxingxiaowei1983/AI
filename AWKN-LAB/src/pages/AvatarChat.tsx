import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, User, Lock, Gift, CreditCard } from 'lucide-react';
import {
  getPointsData,
  deductPoints,
  formatPoints,
} from '../utils/pointsSystem';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const API_KEY = 'sk-480ebebd1cd64331b0ebde8427136c82';
const API_URL = 'https://dashscope.aliyuncs.com/compatible-mode/v1/chat/completions';

export default function AvatarChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '你好，欢迎来到 【定数实验室 | AWKN Lab】。\n\n我是院长 LAY。\n\n"命运如水流动，你当不动如山。"\n在这里，我们提供 东方命理 × 博弈论算法。在不确定的世界寻找确定性\n\n你需要和我聊什么？\n请把你的八字（出生时间）和你的难题一起扔给我，我为你开局。',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pointsData, setPointsData] = useState(() => getPointsData());
  const [showPointsPrompt, setShowPointsPrompt] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setPointsData(getPointsData());
  }, []);

  const callQwenAPI = async (userInput: string) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'qwen-turbo',
          messages: [
            {
              role: 'system',
              content: '你是AWKN LAB定数实验室的院长LAY，一个基于东方命理和人工智能的智能助手。你的任务是根据用户的命盘信息，为他们提供决策建议、运势分析、风险提示等服务。请用专业但亲切的语气回答，结合五行、八字等传统文化元素给出建议。'
            },
            {
              role: 'user',
              content: userInput
            }
          ],
          max_tokens: 1500,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('API错误:', errorData);
        throw new Error(`API请求失败: ${response.status}`);
      }

      const data = await response.json();
      return data.choices?.[0]?.message?.content || '抱歉，我暂时无法回答这个问题。';
    } catch (error) {
      console.error('API调用错误:', error);
      return '抱歉，服务暂时不可用，请稍后重试。';
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    // 检查积分是否足够
    const COST_PER_MESSAGE = 100;
    if (pointsData.balance < COST_PER_MESSAGE) {
      setShowPointsPrompt(true);
      return;
    }

    // 扣除积分
    const success = deductPoints(COST_PER_MESSAGE, '与院长LAY对话');
    if (!success) {
      alert('积分扣除失败，请重试');
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setPointsData(getPointsData());

    // 调用千问API
    const aiResponse = await callQwenAPI(input);
    
    const assistantMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f8f8] via-[#f0e6ff] to-[#e6f3ff]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#e5e5e5]">
        <div className="max-w-[1200px] mx-auto px-6 py-4 flex items-center justify-between">
          <a
            href="/"
            className="flex items-center gap-2 text-[#666666] hover:text-[#1a1a1a] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>返回</span>
          </a>
          <div className="flex-1 text-center">
            <h1 className="text-xl font-bold text-[#1a1a1a]">院长LAY的分身</h1>
            <p className="text-sm text-[#666666]">定数实验室 | AWKN Lab</p>
          </div>
          <div className="flex items-center gap-4">
            {/* 积分显示 */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-[#d4acfe]/10 to-[#b388ff]/10 rounded-xl px-4 py-2">
              <Gift className="w-5 h-5 text-[#d4acfe]" />
              <span className="text-sm font-medium text-[#1a1a1a]">
                积分：<span className="font-bold text-[#d4acfe]">{formatPoints(pointsData.balance)}</span>
              </span>
            </div>
            <button
              onClick={() => window.location.href = '/#works'}
              className="bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white rounded-xl px-4 py-2 text-sm font-medium hover:shadow-lg hover:scale-105 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>积分中心</span>
            </button>
          </div>
        </div>
      </header>

      {/* 积分不足提示 */}
      {showPointsPrompt && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowPointsPrompt(false)} />
          <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-in">
            <div className="bg-gradient-to-br from-[#d4acfe] to-[#b388ff] p-8 text-center">
              <Lock className="w-12 h-12 text-white mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">积分不足</h2>
              <p className="text-white/80 text-sm">与院长LAY对话需要消耗 100 积分</p>
            </div>
            <div className="p-6 space-y-4">
              <div className="bg-[#f8f8f8] rounded-xl p-4 text-center">
                <p className="text-lg font-semibold text-[#1a1a1a] mb-2">当前积分</p>
                <p className="text-3xl font-bold text-[#d4acfe]">{formatPoints(pointsData.balance)}</p>
              </div>
              <div className="bg-[#fff0f0] rounded-xl p-4">
                <p className="text-sm text-[#666666] mb-2">获取积分方式：</p>
                <ul className="space-y-2 text-sm text-[#1a1a1a]">
                  <li className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#d4acfe]" />
                    <span>注册赠送 1000 积分</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#d4acfe]" />
                    <span>每日签到 +100 积分</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-[#d4acfe]" />
                    <span>充值 1元 = 500 积分</span>
                  </li>
                </ul>
              </div>
              <button
                onClick={() => setShowPointsPrompt(false)}
                className="w-full bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white py-4 rounded-xl font-medium hover:shadow-lg hover:scale-[1.02] transition-all"
              >
                我知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Chat Container */}
      <main className="max-w-[900px] mx-auto px-6 py-8">
        <div className="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 overflow-hidden">
          {/* Messages */}
          <div className="h-[calc(100vh-280px)] overflow-y-auto p-6 space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-4 ${
                  message.role === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg overflow-hidden ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-[#d4acfe] to-[#b388ff]'
                      : 'bg-gradient-to-br from-[#1a1a1a] to-[#333333]'
                  }`}
                >
                  {message.role === 'user' ? (
                    <User className="w-6 h-6 text-white" />
                  ) : (
                    <img src="/758.jpg" alt="院长LAY" className="w-full h-full object-cover" />
                  )}
                </div>
                
                {/* Message Bubble */}
                <div
                  className={`max-w-[75%] rounded-3xl px-6 py-4 shadow-sm ${
                    message.role === 'user'
                      ? 'bg-gradient-to-br from-[#d4acfe] to-[#b388ff] text-white rounded-br-xl'
                      : 'bg-white border border-[#e5e5e5] text-[#1a1a1a] rounded-bl-xl'
                  }`}
                >
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <span className={`text-xs mt-3 block ${
                    message.role === 'user' ? 'text-white/60' : 'text-[#999999]'
                  }`}>
                    {message.timestamp.toLocaleTimeString('zh-CN', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {/* Loading State */}
            {isLoading && (
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-[#333333] flex items-center justify-center flex-shrink-0 shadow-lg">
                  <img src="/758.jpg" alt="院长LAY" className="w-6 h-6 rounded-full object-cover" />
                </div>
                <div className="bg-white border border-[#e5e5e5] rounded-3xl rounded-bl-xl px-6 py-4 shadow-sm">
                  <div className="flex gap-2 items-center h-6">
                    <span className="w-2 h-2 bg-[#d4acfe] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#d4acfe] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#d4acfe] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t border-[#e5e5e5] p-5 bg-[#fafafa]/80 backdrop-blur">
            <div className="flex gap-3">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="请输入你的问题（每次对话消耗100积分）"
                className="flex-1 bg-white border border-[#e5e5e5] rounded-2xl px-5 py-3.5 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#d4acfe]/50 focus:border-[#d4acfe] transition-all shadow-sm"
                rows={2}
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white rounded-2xl px-6 py-3 hover:shadow-lg hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none flex items-center gap-2 shadow-md"
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline font-medium">发送</span>
                <span className="text-xs text-white/80">({formatPoints(pointsData.balance)} 积分)</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            '今日运势分析',
            '事业决策建议',
            '感情关系指导',
            '投资理财提示',
          ].map((action) => (
            <button
              key={action}
              onClick={() => setInput(action)}
              className="bg-white/90 backdrop-blur border border-[#e5e5e5] rounded-xl px-4 py-3 text-sm text-[#666666] hover:bg-white hover:border-[#d4acfe] hover:text-[#d4acfe] hover:shadow-md transition-all shadow-sm"
            >
              {action}
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
