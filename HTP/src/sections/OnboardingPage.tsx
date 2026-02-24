import { useEffect, useState, useRef } from 'react';
import { useApp } from '@/contexts/AppContext';
import { Upload, Pencil, Brain, ChevronLeft, Sparkles } from 'lucide-react';

// 装饰性花朵
const FlowerDecoration = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 100 100" 
    className={`absolute pointer-events-none opacity-35 ${className}`}
    fill="none"
  >
    <path
      d="M50 15C50 15 62 32 62 50C62 68 50 85 50 85C50 85 38 68 38 50C38 32 50 15 50 15Z"
      fill="url(#petalGradient)"
    />
    <path
      d="M15 50C15 50 32 38 50 38C68 38 85 50 85 50C85 50 68 62 50 62C32 62 15 50 15 50Z"
      fill="url(#petalGradient2)"
    />
    <circle cx="50" cy="50" r="10" fill="url(#centerGradient)" />
    <defs>
      <linearGradient id="petalGradient" x1="50" y1="15" x2="50" y2="85" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(340 70% 88%)" />
        <stop offset="1" stopColor="hsl(340 50% 78%)" />
      </linearGradient>
      <linearGradient id="petalGradient2" x1="15" y1="50" x2="85" y2="50" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(280 60% 90%)" />
        <stop offset="1" stopColor="hsl(280 40% 80%)" />
      </linearGradient>
      <radialGradient id="centerGradient" cx="50" cy="50" r="10" gradientUnits="userSpaceOnUse">
        <stop stopColor="hsl(45 90% 82%)" />
        <stop offset="1" stopColor="hsl(45 70% 72%)" />
      </radialGradient>
    </defs>
  </svg>
);

export default function OnboardingPage() {
  const { goToLanding, goToCanvas, goToLoading, setUserDrawing } = useApp();
  const [isVisible, setIsVisible] = useState(false);
  const [userInfo, setUserInfo] = useState({
    age: '',
    gender: ''
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, age: e.target.value });
  };

  const handleGenderChange = (gender: string) => {
    setUserInfo({ ...userInfo, gender });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 验证文件类型
      if (!file.type.startsWith('image/')) {
        alert('这似乎不是一张图片哦，请重新选择。');
        return;
      }
      
      // 验证文件大小 (10MB)
      if (file.size > 10 * 1024 * 1024) {
        alert('图片太大了，请选择小于10MB的图片。');
        return;
      }

      // 读取文件并跳转
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageData = event.target?.result as string;
        if (imageData) {
          // 设置用户画作数据
          setUserDrawing({
            imageData,
            method: 'upload',
            timestamp: Date.now(),
            age: userInfo.age,
            gender: userInfo.gender
          });
          // 直接跳转到加载页进行分析
          goToLoading();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGoToCanvas = () => {
    // 设置用户画作数据（初始为空，绘制完成后会更新）
    setUserDrawing({
      imageData: null,
      method: 'draw',
      timestamp: Date.now(),
      age: userInfo.age,
      gender: userInfo.gender
    });
    // 跳转到画板页面
    goToCanvas();
  };

  return (
    <div className="min-h-screen watercolor-bg relative overflow-hidden">
      {/* 背景装饰 */}
      <FlowerDecoration className="w-24 h-24 -top-4 -left-4 rotate-12" />
      <FlowerDecoration className="w-20 h-20 top-1/4 right-2 -rotate-12" />
      <FlowerDecoration className="w-16 h-16 bottom-1/3 -left-2 rotate-45" />
      <FlowerDecoration className="w-28 h-28 -bottom-4 right-4 -rotate-12" />
      
      {/* 返回按钮 */}
      <button
        onClick={goToLanding}
        className="absolute top-4 left-4 z-20 p-2 rounded-full bg-white/60 backdrop-blur-sm hover:bg-white/80 transition-colors"
      >
        <ChevronLeft className="w-5 h-5 text-muted-foreground" />
      </button>
      
      {/* 主内容 */}
      <div className="relative z-10 min-h-screen flex flex-col px-6 py-12">
        {/* 标题区域 */}
        <div 
          className={`text-center mt-8 mb-8 transition-all duration-800 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-gradient mb-4">
            准备好了吗？
          </h2>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto leading-relaxed">
            请闭上眼睛深呼吸，想象一栋房子、一棵树和一个正在做某件事的人。当你准备好时，请将它们画下来。
          </p>
        </div>
        
        {/* 合并后的卡片：说明文字 + 用户信息输入 */}
        <div 
          className={`gold-card p-5 mb-8 mx-auto max-w-sm w-full transition-all duration-800 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex items-start gap-3 mb-4">
            <div className="p-2 rounded-full bg-warm-lavender/50 flex-shrink-0">
              <Brain className="w-5 h-5 text-warm-purple" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                房树人测验是一种经典的心理投射技术，通过你的绘画，可以了解你的内心世界、情感状态和人际关系。
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                年龄
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={userInfo.age}
                onChange={handleAgeChange}
                placeholder="请输入您的年龄"
                className="w-full px-4 py-2 rounded-lg border border-warm-pink/30 bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-warm-pink/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1">
                性别
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => handleGenderChange('男')}
                  className={`flex-1 py-2 rounded-lg transition-all ${userInfo.gender === '男' ? 'bg-warm-blue/30 border-2 border-warm-blue/50' : 'bg-white/50 border border-warm-pink/30 hover:bg-warm-blue/10'}`}
                >
                  男
                </button>
                <button
                  type="button"
                  onClick={() => handleGenderChange('女')}
                  className={`flex-1 py-2 rounded-lg transition-all ${userInfo.gender === '女' ? 'bg-warm-pink/30 border-2 border-warm-pink/50' : 'bg-white/50 border border-warm-pink/30 hover:bg-warm-pink/10'}`}
                >
                  女
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* 选项卡片 */}
        <div className="flex-1 flex flex-col gap-4 max-w-sm mx-auto w-full">
          {/* 上传画作选项 */}
          <button
            onClick={handleUploadClick}
            className={`gold-card p-6 text-left transition-all duration-800 delay-300 hover:scale-[1.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-warm-pink to-warm-lavender flex items-center justify-center flex-shrink-0">
                <Upload className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                  上传画作
                </h3>
                <p className="text-xs text-muted-foreground">
                  拍摄纸上手绘的照片
                </p>
              </div>
              <div className="gradient-btn py-2 px-4 text-sm">
                选择相册图片
              </div>
            </div>
          </button>
          
          {/* 隐藏的文件输入 */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          
          {/* 在线绘制选项 */}
          <button
            onClick={handleGoToCanvas}
            className={`gold-card p-6 text-left transition-all duration-800 delay-400 hover:scale-[1.02] ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-warm-gold to-warm-rose flex items-center justify-center flex-shrink-0">
                <Pencil className="w-7 h-7 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-lg font-medium text-foreground mb-1">
                  在线绘制
                </h3>
                <p className="text-xs text-muted-foreground">
                  此刻，指尖即画笔
                </p>
              </div>
              <div className="gradient-btn py-2 px-4 text-sm">
                进入画板
              </div>
            </div>
          </button>
        </div>
        
        {/* 底部提示 */}
        <div 
          className={`text-center mt-8 transition-all duration-800 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-xs text-muted-foreground/70 flex items-center justify-center gap-2">
            <Sparkles className="w-3 h-3" />
            无需绘画技巧，随心而画即可
            <Sparkles className="w-3 h-3" />
          </p>
        </div>
      </div>
    </div>
  );
}
