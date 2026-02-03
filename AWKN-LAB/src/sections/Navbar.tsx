import { useState, useEffect } from 'react';
import { Gift, LogOut, User } from 'lucide-react';
import LoginModal from '../components/LoginModal';
import PointsManager from '../components/PointsManager';
import { getPointsData, formatPoints, clearPointsData } from '../utils/pointsSystem';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginTab, setLoginTab] = useState<'login' | 'register'>('login');
  const [pointsModalOpen, setPointsModalOpen] = useState(false);
  const [pointsData, setPointsData] = useState(() => getPointsData());
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 检查登录状态和积分数据
  useEffect(() => {
    const updateUserData = () => {
      const userEmail = localStorage.getItem('userEmail');
      setIsLoggedIn(!!userEmail);
      setUsername(userEmail || '');
      // 同时更新积分数据
      setPointsData(getPointsData());
    };

    // 立即更新
    updateUserData();
    
    // 监听存储变化
    window.addEventListener('storage', updateUserData);
    return () => window.removeEventListener('storage', updateUserData);
  }, [loginModalOpen, pointsModalOpen, isLoggedIn]);

  // 定期检查积分数据
  useEffect(() => {
    const interval = setInterval(() => {
      if (isLoggedIn) {
        setPointsData(getPointsData());
      }
    }, 1000); // 每秒更新一次

    return () => clearInterval(interval);
  }, [isLoggedIn]);

  // 关闭移动端菜单的函数
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // 登出功能
  const handleLogout = () => {
    clearPointsData();
    localStorage.removeItem('userRole');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setUsername('');
    setPointsData(getPointsData());
    closeMobileMenu();
  };



  // 打开注册弹窗
  const openRegister = () => {
    setLoginTab('register');
    setLoginModalOpen(true);
    closeMobileMenu();
  };

  // 打开积分管理
  const openPointsManager = () => {
    setPointsModalOpen(true);
    closeMobileMenu();
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'glass shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
        style={{
          transitionTimingFunction: 'var(--ease-expo-out)',
        }}
      >
        <div className="max-w-[1200px] mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#hero"
            className="text-xl font-bold gradient-text animate-fade-in-up"
            style={{ animationDelay: '0ms' }}
          >
            🏔️ AWKN LAB | 定数实验室
          </a>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#awaken"
              className="text-[15px] font-medium text-[#1a1a1a] underline-animation hover:text-[#d4acfe] transition-colors duration-250 animate-fade-in-up"
              style={{
                animationDelay: '80ms',
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              A-觉醒
            </a>
            <a
              href="#wired"
              className="text-[15px] font-medium text-[#1a1a1a] underline-animation hover:text-[#d4acfe] transition-colors duration-250 animate-fade-in-up"
              style={{
                animationDelay: '160ms',
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              W-真我
            </a>
            <a
              href="#key"
              className="text-[15px] font-medium text-[#1a1a1a] underline-animation hover:text-[#d4acfe] transition-colors duration-250 animate-fade-in-up"
              style={{
                animationDelay: '240ms',
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              K-关键
            </a>
            <a
              href="#now"
              className="text-[15px] font-medium text-[#1a1a1a] underline-animation hover:text-[#d4acfe] transition-colors duration-250 animate-fade-in-up"
              style={{
                animationDelay: '400ms',
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              N-新生
            </a>
            <a
              href="#works"
              className="text-[15px] font-medium text-[#1a1a1a] underline-animation hover:text-[#d4acfe] transition-colors duration-250 animate-fade-in-up"
              style={{
                animationDelay: '320ms',
                transitionTimingFunction: 'var(--ease-expo-out)',
              }}
            >
              算法内核
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* 用户名显示 */}
            {isLoggedIn && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#d4acfe]/10 to-[#b388ff]/10 rounded-xl px-4 py-2">
                <User className="w-5 h-5 text-[#d4acfe]" />
                <span className="text-sm font-medium text-[#1a1a1a]">
                  {username}
                </span>
              </div>
            )}

            {/* 积分显示 */}
          <button
            onClick={openPointsManager}
            className="flex items-center gap-2 bg-gradient-to-r from-[#d4acfe]/10 to-[#b388ff]/10 rounded-xl px-4 py-2 hover:shadow-md transition-all"
          >
            <Gift className="w-5 h-5 text-[#d4acfe]" />
            <span className="text-sm font-medium text-[#1a1a1a]">
              {formatPoints(isLoggedIn ? pointsData.balance : 0)}
            </span>
          </button>

            {/* 登出按钮 */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-[#f5f5f5] rounded-xl px-4 py-2 hover:bg-[#e5e5e5] transition-all"
              >
                <LogOut className="w-5 h-5 text-[#666666]" />
                <span className="text-sm font-medium text-[#666666]">
                  登出
                </span>
              </button>
            )}

            {/* CTA Button */}
            {!isLoggedIn && (
              <button
                onClick={openRegister}
                className="flex items-center gap-2 bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white rounded-xl px-6 py-2 hover:shadow-lg hover:scale-105 transition-all shadow-md"
              >
                <span>加入实验室</span>
              </button>
            )}

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden p-2" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4 px-6 flex flex-col gap-4 animate-fade-in-down">
            <a
              href="#awaken"
              className="text-[15px] font-medium text-[#1a1a1a] hover:text-[#d4acfe] transition-colors duration-250 py-2"
              onClick={closeMobileMenu}
            >
              A-觉醒
            </a>
            <a
              href="#wired"
              className="text-[15px] font-medium text-[#1a1a1a] hover:text-[#d4acfe] transition-colors duration-250 py-2"
              onClick={closeMobileMenu}
            >
              W-真我
            </a>
            <a
              href="#key"
              className="text-[15px] font-medium text-[#1a1a1a] hover:text-[#d4acfe] transition-colors duration-250 py-2"
              onClick={closeMobileMenu}
            >
              K-关键
            </a>
            <a
              href="#now"
              className="text-[15px] font-medium text-[#1a1a1a] hover:text-[#d4acfe] transition-colors duration-250 py-2"
              onClick={closeMobileMenu}
            >
              N-新生
            </a>
            <a
              href="#works"
              className="text-[15px] font-medium text-[#1a1a1a] hover:text-[#d4acfe] transition-colors duration-250 py-2"
              onClick={closeMobileMenu}
            >
              算法内核
            </a>
            
            {/* 移动端用户名显示 */}
            {isLoggedIn && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-[#d4acfe]/10 to-[#b388ff]/10 rounded-xl px-4 py-2 w-full">
                <User className="w-5 h-5 text-[#d4acfe]" />
                <span className="text-sm font-medium text-[#1a1a1a]">
                  {username}
                </span>
              </div>
            )}
            
            {/* 移动端积分显示 */}
            <button
              onClick={openPointsManager}
              className="flex items-center gap-2 bg-gradient-to-r from-[#d4acfe]/10 to-[#b388ff]/10 rounded-xl px-4 py-2 w-full"
            >
              <Gift className="w-5 h-5 text-[#d4acfe]" />
              <span className="text-sm font-medium text-[#1a1a1a]">
                {formatPoints(isLoggedIn ? pointsData.balance : 0)}
              </span>
            </button>
            
            {/* 移动端登出按钮 */}
            {isLoggedIn && (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-[#f5f5f5] rounded-xl px-4 py-2 w-full"
              >
                <LogOut className="w-5 h-5 text-[#666666]" />
                <span className="text-sm font-medium text-[#666666]">
                  登出
                </span>
              </button>
            )}
            
            {!isLoggedIn && (
              <button
                className="mt-2 bg-gradient-to-r from-[#d4acfe] to-[#b388ff] text-white rounded-xl px-6 py-3 hover:shadow-lg hover:scale-105 transition-all shadow-md"
                onClick={openRegister}
              >
                <span>加入实验室</span>
              </button>
            )}
          </div>
        )}
      </nav>

      {/* Login Modal */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
        defaultTab={loginTab}
      />

      {/* Points Manager Modal */}
      <PointsManager 
        isOpen={pointsModalOpen} 
        onClose={() => setPointsModalOpen(false)}
      />
    </>
  );
};

export default Navbar;