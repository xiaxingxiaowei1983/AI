import { useEffect, useState } from 'react';

interface Scores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

const LOADING_STEPS = [
  { text: '正在解析神经元数据...', duration: 1500 },
  { text: '连接地球 Online 服务器...', duration: 1200 },
  { text: '匹配历史名人数据库...', duration: 1800 },
  { text: '生成专属英雄代码...', duration: 1500 },
];

interface LoadingScreenProps {
  onComplete: () => void;
  scores: Scores;
}

const LoadingScreen = ({ onComplete, scores }: LoadingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [radarProgress, setRadarProgress] = useState(0);
  const [codeNumbers, setCodeNumbers] = useState<string[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < LOADING_STEPS.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        setTimeout(onComplete, 500);
      }
    }, LOADING_STEPS[currentStep].duration);

    return () => clearTimeout(timer);
  }, [currentStep, onComplete]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRadarProgress(prev => Math.min(prev + 2, 100));
    }, 30);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCodeNumbers(
        Object.keys(scores).map(() => 
          Math.floor(Math.random() * 100).toString().padStart(2, '0')
        )
      );
    }, 100);
    return () => clearInterval(interval);
  }, [scores]);

  return (
    <div className="w-full max-w-md fade-in space-y-6">
      <div className="glass-panel p-8 rounded-2xl text-center">
        <h2 className="text-2xl font-bold gradient-text mb-6 orbitron">
          HERO AWAKENING
        </h2>

        <div className="mb-8">
          <p className="text-primary font-mono text-sm animate-pulse">
            {LOADING_STEPS[currentStep].text}
          </p>
          <div className="w-full bg-muted rounded-full h-1 mt-3">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-1 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / LOADING_STEPS.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {[0, 1, 2, 3, 4].map((i) => (
              <polygon
                key={i}
                points="100,20 172,62 172,138 100,180 28,138 28,62"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="1"
                style={{
                  transform: `scale(${1 - i * 0.2})`,
                  transformOrigin: 'center'
                }}
              />
            ))}
            <polygon
              points={Object.values(scores).map((val, i) => {
                const angle = (Math.PI * 2 * i) / 6 - Math.PI / 2;
                const radius = (val / 5) * 80 * (radarProgress / 100);
                const x = 100 + Math.cos(angle) * radius;
                const y = 100 + Math.sin(angle) * radius;
                return `${x},${y}`;
              }).join(' ')}
              fill="rgba(0, 200, 255, 0.3)"
              stroke="rgb(0, 200, 255)"
              strokeWidth="2"
              className="transition-all duration-100"
            />
          </svg>
        </div>

        <div className="flex justify-center gap-2 font-mono text-lg">
          {codeNumbers.map((num, i) => (
            <span 
              key={i}
              className="text-primary animate-pulse"
              style={{ filter: 'blur(1px)' }}
            >
              {num}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;