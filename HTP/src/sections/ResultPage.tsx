import { useState, useEffect, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { useApp } from '@/contexts/AppContext';

// --- 1. 打字机组件 (保持逻辑不变，增加样式防御) ---
const MarkdownTypewriter = ({ content, speed = 10, onComplete }: { content: string; speed?: number; onComplete?: () => void }) => {
  const [displayedContent, setDisplayedContent] = useState('');

  useEffect(() => {
    if (!content) return;
    let index = 0;
    const timer = setInterval(() => {
      setDisplayedContent((prev) => content.slice(0, prev.length + 1));
      index++;
      if (index >= content.length) {
        clearInterval(timer);
        if (onComplete) onComplete();
      }
    }, speed);
    return () => clearInterval(timer);
  }, [content, speed, onComplete]);

  return (
    <div className="markdown-body text-left leading-relaxed text-gray-800 text-base md:text-lg">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({node, ...props}) => <h1 className="hero-title" {...props} />,
          h2: ({node, ...props}) => <h2 className="section-title" {...props} />,
          h3: ({node, ...props}) => <h3 className="subsection-title" {...props} />,
          p: ({node, ...props}) => <p className="fade-in" {...props} />,
          blockquote: ({node, ...props}) => <div className="quote-block"><blockquote className="quote-text" {...props} /></div>,
          strong: ({node, ...props}) => <span className="font-bold text-pink-600 bg-pink-50 px-1 rounded" {...props} />
        }}
      >
        {displayedContent}
      </ReactMarkdown>
    </div>
  );
};

// --- 2. 主页面组件 ---
const ResultPage = () => {
  const { analysisResult, goToLanding } = useApp();

  // 🛡️ 核心修复：从AppContext获取数据
  const rawData = analysisResult;

  // 🔍 调试日志：看看现在抓到了没
  console.log("🎁 从AppContext获取的分析结果:", rawData);

  // 智能提取文本内容
  const textToShow = useMemo(() => {
    if (!rawData) return '';
    // 如果是对象，优先取 clientInsightReport
    if (typeof rawData === 'object') {
      return rawData.clientInsightReport || JSON.stringify(rawData);
    }
    return String(rawData);
  }, [rawData]);

  return (
    <div className="min-h-screen bg-[#faf9f7] p-6 flex justify-center">
      <div className="max-w-3xl w-full">
        {/* 封面区域 */}
        <div className="hero text-center py-10 mb-10">
          <h1 className="hero-title">房树人心理分析</h1>
          <p className="hero-subtitle">看见你的内在真相，拥抱被压抑的真实自我</p>
          <div className="hero-image-container mx-auto mt-8 mb-6">
            <div className="cloud-decoration cloud-1"></div>
            <div className="cloud-decoration cloud-2"></div>
            <img 
              src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=peaceful%20house%20tree%20person%20drawing%20psychological%20analysis%20soft%20colors%20watercolor%20style&image_size=landscape_16_9" 
              alt="房树人心理分析" 
              className="hero-image"
            />
          </div>
        </div>

        <div className="decoration-line mx-auto"></div>

        {/* 引言 */}
        <div className="intro mb-12">
          <p className="intro-text">这幅画本身是一个"看见"的过程。当你拿起画笔，画出房子、树木、人物时，你已经在潜意识层面看见了那些被压抑的渴望和需求。现在，我们需要将这种潜意识看见转化为意识层面的看见和接纳。</p>
        </div>

        {/* 内容显示区 */}
        <div className="bg-white rounded-xl p-6 md:p-10 min-h-[400px] shadow-lg border border-gray-100 mb-12">
          {textToShow ? (
            <MarkdownTypewriter
              content={textToShow}
              speed={10}
              onComplete={() => console.log("渲染完毕")}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <p className="mb-4">暂无分析数据</p>
              {/* 如果数据丢失，提供返回按钮 */}
              <button
                onClick={goToLanding}
                className="text-sm text-indigo-500 underline hover:text-indigo-700"
              >
                返回首页重新上传
              </button>
            </div>
          )}
        </div>

        {/* 结语 */}
        <div className="conclusion mb-12">
          <p className="conclusion-text">你已经做得很好了。<br />现在，试着对自己好一点。</p>
          <p className="conclusion-signature">—— 在多样性中找到统一，带着不完美前行</p>
        </div>

        <div className="decoration-line mx-auto mb-8"></div>

        {/* 底部装饰 */}
        <div className="text-center mb-10">
          <div className="text-sm text-gray-500 italic">
            每一个裂痕，都是光照进来的地方
          </div>
        </div>

        {/* 底部按钮 */}
        <div className="mt-8 text-center mb-10">
          <button
            onClick={goToLanding}
            className="px-8 py-3 bg-indigo-600 text-white rounded-full font-medium hover:bg-indigo-700 transition shadow-lg"
          >
            再次分析
          </button>
        </div>

      </div>
    </div>
  );
};

export default ResultPage;
