import { LogOut, ArrowRight, History, Eye } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import HistoryList from './HistoryList';
import ResultScreen from './ResultScreen';

interface DashboardScreenProps {
  userName: string;
  onStartTest: () => void;
  onLogout: () => void;
}

interface TestRecord {
  id: string;
  hero_title: string;
  hero_type: string;
  mbti_type: string;
  adaptability: string;
  scores: Record<string, number>;
  advice: string;
  completed_at: string;
}

const DashboardScreen = ({ userName, onStartTest, onLogout }: DashboardScreenProps) => {
  const [view, setView] = useState<'main' | 'history' | 'detail'>('main');
  const [selectedRecord, setSelectedRecord] = useState<TestRecord | null>(null);
  
  const isGuest = localStorage.getItem('isGuest') === 'true';
  const guestId = localStorage.getItem('guestId');
  
  // 获取用户ID
  const getUserId = () => {
    if (isGuest) return null;
    // 从localStorage或其他地方获取user ID
    const storedUserId = localStorage.getItem('userId');
    return storedUserId;
  };
  
  const userId = getUserId();

  const handleViewDetail = (record: TestRecord) => {
    setSelectedRecord(record);
    setView('detail');
  };

  const handleBackToHistory = () => {
    setView('history');
    setSelectedRecord(null);
  };

  const handleBackToMain = () => {
    setView('main');
    setSelectedRecord(null);
  };

  const handleRestartFromDetail = () => {
    setView('main');
    setSelectedRecord(null);
    onStartTest();
  };

  if (view === 'detail' && selectedRecord) {
    return (
      <section className="w-full max-w-md fade-in">
        <ResultScreen
          result={{
            heroType: selectedRecord.hero_type,
            heroTitle: selectedRecord.hero_title,
            heroDesc: '', 
            mbtiType: selectedRecord.mbti_type,
            scores: selectedRecord.scores as { R: number; I: number; A: number; S: number; E: number; C: number },
            advice: selectedRecord.advice,
          }}
          onRestart={handleRestartFromDetail}
          onExit={handleBackToHistory}
        />
        <Button
          onClick={handleBackToHistory}
          variant="outline"
          className="w-full mt-4"
        >
          返回历史记录
        </Button>
      </section>
    );
  }

  if (view === 'history') {
    return (
      <section className="w-full max-w-md fade-in">
        <div className="glass-panel rounded-2xl p-6">
          <HistoryList
            userId={userId || undefined}
            guestId={guestId || undefined}
            isGuest={isGuest}
            onViewDetail={handleViewDetail}
          />
          <Button
            onClick={handleBackToMain}
            variant="outline"
            className="w-full mt-6"
          >
            返回主页
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-md fade-in space-y-4">
      {isGuest && (
        <div className="glass-panel p-4 rounded-xl border-destructive/30 bg-destructive/5">
          <p className="text-xs text-destructive font-bold flex items-center">
            <span className="mr-2">⚠️</span>
            访客身份警告：你的英雄档案面临丢失风险
          </p>
        </div>
      )}
      
      <div className="glass-panel p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-foreground text-lg font-bold">
            Welcome, <span className="text-primary">{isGuest ? '待觉醒者' : userName}</span>
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <p className="text-xs text-muted-foreground font-mono">
              系统状态: <span className="text-green-500 font-bold">在线 (Online)</span>
            </p>
          </div>
        </div>
        <Button
          onClick={onLogout}
          variant="ghost"
          size="icon"
          className="hover:bg-destructive/20 hover:text-destructive"
        >
          <LogOut className="w-5 h-5" />
        </Button>
      </div>

      <div 
        onClick={onStartTest}
        className="glass-panel p-6 rounded-2xl relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute right-0 top-0 w-32 h-32 bg-primary blur-[60px] opacity-20 group-hover:opacity-40 transition"></div>
        <div className="relative z-10">
          <div className="flex justify-between items-center mb-3">
            <span className="text-primary font-bold orbitron text-sm">HERO AWAKENING</span>
            {isGuest && (
              <span className="text-xs text-accent px-2 py-1 bg-accent/10 rounded">[ 免登录通道 ]</span>
            )}
          </div>
          <h3 className="text-xl font-bold text-foreground mb-1">启动英雄认证任务</h3>
          <p className="text-xs text-muted-foreground mb-4">
            MBTI 潜能扫描 × 职业定位匹配（预计耗时 2min）
          </p>
          <div className="inline-flex items-center text-xs font-bold text-foreground bg-white/10 px-3 py-2 rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition">
            接入系统 <ArrowRight className="w-4 h-4 ml-1" />
          </div>
        </div>
      </div>

      <div 
        onClick={() => setView('history')}
        className="glass-panel p-5 rounded-2xl cursor-pointer hover:border-primary/50 transition group"
      >
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-muted-foreground mb-1 flex items-center">
              <History className="w-4 h-4 mr-2" />
              作战记录
            </h3>
            <p className="text-xs text-muted-foreground">查看已生成的英雄数据</p>
          </div>
          <Eye className="w-5 h-5 text-muted-foreground group-hover:text-primary transition" />
        </div>
      </div>
    </section>
  );
};

export default DashboardScreen;
