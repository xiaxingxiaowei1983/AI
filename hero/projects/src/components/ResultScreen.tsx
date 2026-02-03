import { useRef, useState } from 'react';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { Button } from './ui/button';
import { getHeroArchetype, getHeroCode } from '@/data/heroes';
import html2canvas from 'html2canvas';
import { QRCodeSVG } from 'qrcode.react';
import { Download, Share2, Loader2 } from 'lucide-react';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

interface TestResult {
  heroType: string;
  heroTitle: string;
  heroDesc: string;
  mbtiType: string;
  scores: {
    R: number;
    I: number;
    A: number;
    S: number;
    E: number;
    C: number;
  };
  advice: string;
}

interface ResultScreenProps {
  result: TestResult;
  onRestart: () => void;
  onExit: () => void;
}

const ResultScreen = ({ result, onRestart, onExit }: ResultScreenProps) => {
  const archetype = getHeroArchetype(result.heroType, result.mbtiType);
  const heroCode = getHeroCode(result.heroType, result.mbtiType);
  const posterRef = useRef<HTMLDivElement>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // 数字默认+2
  const adjustedScores = Object.values(result.scores).map(score => Math.min(10, score + 2));

  const radarData = {
    labels: ['实干 (R)', '研究 (I)', '艺术 (A)', '社交 (S)', '企业 (E)', '常规 (C)'],
    datasets: [
      {
        label: '能力值',
        data: adjustedScores,
        backgroundColor: 'rgba(0, 243, 255, 0.3)',
        borderColor: '#00f3ff',
        borderWidth: 3,
        pointBackgroundColor: '#00f3ff',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#00f3ff',
        fill: true,
      }
    ]
  };

  const radarOptions = {
    scales: {
      r: {
        min: 0,
        max: 10,
        beginAtZero: true,
        angleLines: {
          color: 'rgba(0, 243, 255, 0.2)'
        },
        grid: {
          color: 'rgba(0, 243, 255, 0.2)'
        },
        ticks: {
          display: false,
          stepSize: 2
        },
        pointLabels: {
          color: '#00f3ff',
          font: {
            size: 12,
            family: 'Orbitron',
            weight: 'bold' as const
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false
      }
    },
    maintainAspectRatio: false
  };

  const handleDownloadPoster = async () => {
    if (!posterRef.current) return;
    setIsGenerating(true);
    try {
      const canvas = await html2canvas(posterRef.current, {
        backgroundColor: '#000',
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `Hero_Archive_${archetype.title}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('生成海报失败:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="w-full max-w-2xl fade-in space-y-6 pb-10">
      {/* 海报容器 */}
      <div ref={posterRef} className="bg-black p-6 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 blur-[120px] -z-10"></div>
        
        {/* 头部信息 */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-purple-500/20 text-purple-400 text-[10px] rounded-full orbitron border border-purple-500/30">
                {result.mbtiType}
              </span>
            </div>
            <h1 className="text-4xl font-black text-white mb-2 orbitron tracking-tighter">
              {archetype.title}
            </h1>
            <p className="text-cyan-400/60 text-sm font-medium">
              {archetype.subtitle}
            </p>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-gray-500 orbitron mb-1">SCAN DATE</div>
            <div className="text-xs text-gray-300 orbitron">{new Date().toLocaleDateString()}</div>
          </div>
        </div>

        {/* 核心展示区 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 雷达图 */}
          <div className="bg-white/5 rounded-2xl p-4 border border-white/5 flex flex-col items-center">
            <div className="text-[10px] text-gray-500 orbitron mb-4 self-start">POTENTIAL MATRIX</div>
            <div className="w-full h-56">
              <Radar data={radarData} options={radarOptions} />
            </div>
          </div>

          {/* 原型与代码 */}
          <div className="space-y-4">
            <div className="bg-white/5 rounded-2xl p-5 border border-white/5">
              <div className="text-[10px] text-gray-500 orbitron mb-3">CELEBRITY ARCHETYPE</div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,243,255,0.3)]">
                  👤
                </div>
                <div>
                  <p className="text-lg font-bold text-white leading-tight">{archetype.celebrity}</p>
                  <p className="text-[10px] text-cyan-400/60 uppercase tracking-widest">Legendary Form</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-[10px] text-gray-500 orbitron mb-1">MBTI</div>
                <div className="text-xl font-black text-cyan-400 orbitron">{result.mbtiType}</div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="text-[10px] text-gray-500 orbitron mb-1">CAREER</div>
                <div className="text-xl font-black text-purple-400 orbitron">{heroCode}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 深度解析 */}
        <div className="space-y-4 mb-8">
          <div className="p-4 bg-cyan-500/5 rounded-xl border-l-2 border-cyan-500/50">
            <div className="text-[10px] text-cyan-400 orbitron mb-1">MISSION DESCRIPTION</div>
            <p className="text-xs text-gray-300 leading-relaxed">{archetype.description}</p>
          </div>
          <div className="p-4 bg-purple-500/5 rounded-xl border-l-2 border-purple-500/50">
            <div className="text-[10px] text-purple-400 orbitron mb-1">ULTIMATE ABILITY</div>
            <p className="text-xs text-gray-300 leading-relaxed">{archetype.ability}</p>
          </div>
        </div>

        {/* 底部水印与二维码 */}
        <div className="flex justify-between items-end pt-6 border-t border-white/5">
          <div className="space-y-1">
            <div className="text-lg font-black text-white orbitron tracking-tighter">EARTH ONLINE</div>
            <div className="text-[8px] text-gray-500 tracking-[0.3em] uppercase">Hero Awakening System // Neural Link</div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-[8px] text-gray-500 orbitron">SCAN TO JOIN</div>
              <div className="text-[10px] text-cyan-400 orbitron">HEROAWAKEN.COM</div>
            </div>
            <div className="p-1.5 bg-white rounded-lg">
              <QRCodeSVG value={window.location.origin} size={48} level="H" />
            </div>
          </div>
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Button 
          onClick={onExit}
          variant="outline"
          className="bg-black/40 border-white/10 text-gray-400 hover:text-white"
        >
          返回主页
        </Button>
        <Button 
          onClick={handleDownloadPoster}
          disabled={isGenerating}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold shadow-[0_0_20px_rgba(0,243,255,0.3)]"
        >
          {isGenerating ? (
            <Loader2 className="w-4 h-4 animate-spin mr-2" />
          ) : (
            <Download className="w-4 h-4 mr-2" />
          )}
          保存海报
        </Button>
        <Button 
          onClick={onRestart}
          className="bg-purple-600 hover:bg-purple-500 text-white font-bold"
        >
          重新测试
        </Button>
      </div>

      <div className="text-center">
        <p className="text-[10px] text-gray-500 flex items-center justify-center gap-2">
          <Share2 className="w-3 h-3" /> 长按图片或点击保存海报分享至朋友圈
        </p>
      </div>
    </div>
  );
};

export default ResultScreen;

