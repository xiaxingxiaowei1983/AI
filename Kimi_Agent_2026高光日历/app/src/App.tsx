import { useState, useEffect } from 'react';
import type { UserBazi, HighlightDay } from './lib/bazi-engine';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Readings from './sections/Readings';
import HowItWorks from './sections/HowItWorks';
import Testimonials from './sections/Testimonials';
import Blog from './sections/Blog';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import BirthInputModal from './components/BirthInputModal';
import ResultDashboard from './components/ResultDashboard';
import ParticleBackground from './components/ParticleBackground';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showBirthModal, setShowBirthModal] = useState(false);
  const [userBazi, setUserBazi] = useState<UserBazi | null>(null);
  const [highlightDays, setHighlightDays] = useState<HighlightDay[]>([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleStartClick = () => {
    setShowBirthModal(true);
  };

  const handleBirthSubmit = (bazi: UserBazi, highlights: HighlightDay[]) => {
    setUserBazi(bazi);
    setHighlightDays(highlights);
    setShowBirthModal(false);
    setShowResults(true);
    // 滚动到结果区域
    setTimeout(() => {
      const resultsSection = document.getElementById('results-section');
      if (resultsSection) {
        resultsSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleCloseResults = () => {
    setShowResults(false);
    setUserBazi(null);
    setHighlightDays([]);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative">
      {/* 粒子背景 */}
      <ParticleBackground />
      
      {/* 导航栏 */}
      <Navbar scrolled={scrolled} onStartClick={handleStartClick} />
      
      {/* 主内容 */}
      <main className="relative z-10">
        {/* 主视觉区 */}
        <Hero onStartClick={handleStartClick} />
        
        {/* 关于命理 */}
        <About />
        
        {/* 结果展示区域 */}
        {showResults && userBazi && (
          <div id="results-section">
            <ResultDashboard 
              bazi={userBazi}
              highlightDays={highlightDays}
              onClose={handleCloseResults}
            />
          </div>
        )}
        
        {/* 解读类型 */}
        <Readings />
        
        {/* 工作原理 */}
        <HowItWorks />
        
        {/* 客户评价 */}
        <Testimonials />
        
        {/* 博客 */}
        <Blog />
        
        {/* 行动号召 */}
        <CTA onStartClick={handleStartClick} />
      </main>
      
      {/* 页脚 */}
      <Footer />
      
      {/* 出生信息输入弹窗 */}
      {showBirthModal && (
        <BirthInputModal 
          onClose={() => setShowBirthModal(false)}
          onSubmit={handleBirthSubmit}
        />
      )}
    </div>
  );
}

export default App;
