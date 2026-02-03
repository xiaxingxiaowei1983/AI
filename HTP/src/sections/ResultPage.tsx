import { useEffect, useState, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Eye, Lightbulb, Sprout, Share2, RotateCcw, Sparkles, ChevronLeft, Cloud, Sun } from 'lucide-react';
import { generateIllustrations } from '@/services/skillService';

// 装饰性云朵
const CloudDecoration = ({ className }: { className?: string }) => (
  <div className={`absolute pointer-events-none ${className}`}>
    <Cloud className="w-full h-full text-sky-200 opacity-50" />
  </div>
);

// 章节卡片组件
interface SectionCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  content: string;
  gradient: string;
  delay: number;
  isVisible: boolean;
  index: number;
}

function SectionCard({ icon, title, subtitle, content, gradient, delay, isVisible, index }: SectionCardProps) {
  const [showContent, setShowContent] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);

  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => setShowContent(true), delay + 300);
      return () => clearTimeout(timer);
    }
  }, [isVisible, delay]);

  useEffect(() => {
    if (isVisible && content) {
      // 生成插图
      const generateImage = async () => {
        try {
          setIsGeneratingImage(true);
          // 根据章节内容生成对应的插图
          const illustrations = await generateIllustrations(content, 'warm');
          if (illustrations && illustrations[index]) {
            setImageUrl(illustrations[index]);
          }
        } catch (error) {
          console.error('图片生成失败:', error);
        } finally {
          setIsGeneratingImage(false);
        }
      };

      // 延迟生成图片，等待内容显示后再开始
      const timer = setTimeout(generateImage, delay + 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, content, delay, index]);

  return (
    <div 
      className={`bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-md transition-all duration-700 border border-amber-100 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {/* 章节头部 */}
      <div className={`p-6 ${gradient} rounded-t-xl`}>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
            {icon}
          </div>
          <div>
            <h3 className="font-serif text-xl font-semibold text-white">
              {title}
            </h3>
            <p className="text-sm text-white/80">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
      
      {/* 章节内容 */}
      <div className="p-6">
        {/* 引言区域 - 模仿参考文件风格 */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-lg p-4 mb-6 border-l-4 border-amber-300">
          <p className="text-sm text-gray-600 italic">
            这幅画本身是一个"看见"的过程。当你拿起画笔，画出房子、树木、人物时，你已经在潜意识层面看见了那些被压抑的渴望和需求。
          </p>
        </div>
        
        {/* AI插图 */}
        <div className="w-full aspect-[2.35/1] rounded-xl overflow-hidden mb-6 shadow-md">
          {isGeneratingImage ? (
            <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center">
              <Sun className="w-10 h-10 text-amber-400 mx-auto mb-3 animate-pulse" />
              <span className="text-sm text-gray-600">AI 画师正在挥毫...</span>
            </div>
          ) : imageUrl ? (
            <div className="w-full h-full overflow-hidden rounded-xl">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover transition-opacity duration-500"
              />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-amber-50 to-orange-50 flex flex-col items-center justify-center">
              <Sparkles className="w-10 h-10 text-amber-300 mx-auto mb-3" />
              <span className="text-sm text-gray-500">准备生成插图...</span>
            </div>
          )}
        </div>
        
        {/* 文字内容（打字机效果） */}
        <div className="text-gray-700 leading-relaxed space-y-4">
          {showContent ? (
            <TypewriterText text={content} />
          ) : (
            <div className="text-center py-4">
              <span className="text-gray-400">正在生成...</span>
            </div>
          )}
        </div>
        
        {/* 引用块 - 模仿参考文件风格 */}
        {index === 1 && (
          <div className="mt-6 bg-gradient-to-br from-blue-50 to-pink-50 rounded-lg p-5 border border-blue-100">
            <p className="text-sm text-gray-600 italic leading-relaxed">
              "在职业责任和家庭照料之间努力维持平衡，在坚强外表下藏着脆弱的内在小孩，在追求成就的同时渴望简单和温暖。"
            </p>
          </div>
        )}
        
        {/* 左右对照布局 - 模仿参考文件风格 */}
        {index === 2 && (
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-pink-50 to-red-50 rounded-lg p-4 border border-pink-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">左侧：过去·传统·情感</h4>
              <p className="text-xs text-gray-600">
                房子（家庭）被放在左侧，暗示着你将家庭视为情感的根基和过去的延续。这是你的情感港湾，承载着温暖和爱的渴望。
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">右侧：未来·理性·发展</h4>
              <p className="text-xs text-gray-600">
                树木（成长/事业）被放在右侧，暗示着你将职业/成长视为面向未来的理性选择。这是你追求成就和自我实现的领域。
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// 打字机文字组件
function TypewriterText({ text }: { text: string }) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, text]);

  return <div className="leading-relaxed">{displayText}</div>;
}

export default function ResultPage() {
  const { goToLanding, reset, analysisResult, goToProfessionalReport, professionalReport } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // 检查专业报告是否正在生成
  useEffect(() => {
    if (!professionalReport) {
      setIsGeneratingReport(true);
    } else {
      setIsGeneratingReport(false);
    }
  }, [professionalReport]);

  const handleShare = () => {
    setShowShareToast(true);
    setTimeout(() => setShowShareToast(false), 2000);
  };

  const handleRestart = () => {
    reset();
    goToLanding();
  };

  // 使用分析结果或默认数据
  const result = analysisResult || {
    section_see: '在你的画笔下，我看见了一座温馨的小房子...',
    section_understand: '房子象征着你的内心世界...',
    section_grow: '拥抱真实的自己...',
    illustrations: [],
    risk_level: 'low',
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white relative overflow-hidden">
      {/* 背景装饰 - 模仿参考文件风格 */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-40 h-20">
          <CloudDecoration className="w-full h-full" />
        </div>
        <div className="absolute top-60 right-10 w-32 h-16">
          <CloudDecoration className="w-full h-full" />
        </div>
        <div className="absolute bottom-40 left-1/4 w-48 h-24">
          <CloudDecoration className="w-full h-full" />
        </div>
        <div className="absolute bottom-20 right-1/3 w-36 h-18">
          <CloudDecoration className="w-full h-full" />
        </div>
      </div>
      
      {/* 顶部导航 */}
      <div className="relative z-20 flex items-center justify-between px-4 py-6">
        <button
          onClick={goToLanding}
          className="p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-sm"
        >
          <ChevronLeft className="w-6 h-6 text-gray-600" />
        </button>
        
        <h2 className="font-serif text-2xl font-semibold text-gray-800">
          房树人心理分析
        </h2>
        
        <button
          onClick={goToProfessionalReport}
          className="p-3 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-all shadow-sm relative"
          title="查看专业心理分析报告"
        >
          <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          {isGeneratingReport && (
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-pulse" title="专业报告生成中..." />
          )}
        </button>
      </div>

      {/* 报告内容 */}
      <div ref={reportRef} className="relative z-10 px-5 pb-32 max-w-3xl mx-auto">
        {/* 封面区域 - 模仿参考文件风格 */}
        <div className="text-center mb-12 pt-4">
          <h1 className="font-serif text-3xl font-semibold text-gray-800 mb-4">
            看见你的内在真相
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            拥抱被压抑的真实自我
          </p>
          
          {/* 装饰线 */}
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto my-8 rounded-full" />
        </div>

        {/* 第一章：看见 */}
        <SectionCard
          icon={<Eye className="w-6 h-6 text-white" />}
          title="看见 · 画面中的你"
          subtitle="在你的画笔下，我看见了这样的细节..."
          content={result.section_see}
          gradient="bg-gradient-to-r from-orange-400 to-pink-500"
          delay={200}
          isVisible={isVisible}
          index={0}
        />

        {/* 第二章：理解 */}
        <div className="mt-8">
          <SectionCard
            icon={<Lightbulb className="w-6 h-6 text-white" />}
            title="理解 · 潜意识的低语"
            subtitle="这些细节并非偶然，它们或许在诉说着..."
            content={result.section_understand}
            gradient="bg-gradient-to-r from-blue-400 to-purple-500"
            delay={600}
            isVisible={isVisible}
            index={1}
          />
        </div>

        {/* 第三章：成长 */}
        <div className="mt-8">
          <SectionCard
            icon={<Sprout className="w-6 h-6 text-white" />}
            title="成长 · 给未来的信"
            subtitle="拥抱真实的自己，或许可以试着..."
            content={result.section_grow}
            gradient="bg-gradient-to-r from-green-400 to-teal-500"
            delay={1000}
            isVisible={isVisible}
            index={2}
          />
        </div>

        {/* 结语 - 模仿参考文件风格 */}
        <div className="mt-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl p-8 text-center border-2 border-amber-200">
          <p className="text-xl text-gray-700 mb-4">
            你已经做得很好了。<br />
            现在，试着对自己好一点。
          </p>
          <p className="text-sm text-gray-600 italic">
            —— 在多样性中找到统一，带着不完美前行
          </p>
        </div>

        {/* 装饰线 */}
        <div className="w-32 h-1 bg-gradient-to-r from-amber-400 to-orange-400 mx-auto my-12 rounded-full" />

        {/* 底部操作区 */}
        <div 
          className={`mt-8 flex flex-col gap-4 transition-all duration-700 delay-1400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            onClick={handleShare}
            className="w-full py-4 bg-gradient-to-r from-orange-400 to-pink-500 text-white rounded-lg font-medium flex items-center justify-center gap-3 hover:shadow-lg transition-all"
          >
            <Share2 className="w-5 h-5" />
            生成分享卡片
          </button>
          
          <button
            onClick={handleRestart}
            className="w-full py-4 bg-white border border-gray-200 text-gray-700 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
          >
            <RotateCcw className="w-5 h-5" />
            重新测试
          </button>
        </div>

        {/* 免责声明 */}
        <div 
          className={`mt-12 text-center transition-all duration-700 delay-1600 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <p className="text-xs text-gray-500 leading-relaxed max-w-md mx-auto">
            本报告基于心理投射理论与 AI 生成，仅供自我探索与娱乐，不构成专业医疗诊断。如遇严重心理困扰，请寻求专业医生帮助。
          </p>
        </div>

        {/* 底部装饰 */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 italic">
            每一个裂痕，都是光照进来的地方
          </p>
        </div>
      </div>

      {/* 分享提示 Toast */}
      {showShareToast && (
        <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white px-6 py-3 rounded-lg flex items-center gap-2 shadow-lg animate-fade-in-up">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-sm text-gray-700">分享功能开发中...</span>
          </div>
        </div>
      )}
    </div>
  );
}