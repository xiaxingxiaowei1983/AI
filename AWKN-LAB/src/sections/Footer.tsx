import { useState } from 'react';
import LoginModal from '../components/LoginModal';

const Footer = () => {
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginTab, setLoginTab] = useState<'login' | 'register'>('login');

  const productLinks = [
    { name: 'A-觉醒', href: '#awaken' },
    { name: 'W-真我', href: '#wired' },
    { name: 'K-关键', href: '#key' },
    { name: 'N-新生', href: '#now' },
  ];

  const aboutLinks = [
    { name: '联系我们', href: '#' },
    { name: '隐私政策', href: '#' },
    { name: '使用条款', href: '#' },
    { name: '帮助中心', href: '#' },
  ];

  // 打开注册弹窗
  const openRegister = () => {
    setLoginTab('register');
    setLoginModalOpen(true);
  };

  return (
    <footer className="relative bg-[#1a1a1a] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#d4acfe]/5 to-transparent blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-gradient-to-br from-[#00e1ff]/5 to-transparent blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* JOIN THE LAB Section */}
        <div className="bg-[#2a2a2a] py-16 lg:py-20">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              加入AWKN LAB定数实验室
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto mb-8">
              不要做命运的流浪汉。注册成为 [AWKN 研究员]，建立你的个人战略与风控体系。
            </p>
            <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4">
              <button 
                onClick={openRegister}
                className="btn-primary text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 w-full sm:w-auto"
              >
                立即注册
              </button>
              <a href="/avatar-chat" className="btn-primary text-base sm:text-lg py-3 sm:py-4 px-6 sm:px-8 w-full sm:w-auto inline-flex items-center justify-center">
                我的数字分身
              </a>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-[1200px] mx-auto px-6 py-16 lg:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <a href="#hero" className="inline-block text-3xl font-bold gradient-text mb-4">
                AWKN
              </a>
              <p className="text-white/70 max-w-sm leading-relaxed mb-6">
                定数实验室，让决策更智慧。
                东方命理 × 博弈论算法，为你的人生保驾护航。
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center hover:bg-red-600 transition-colors duration-300"
                >
                  {/* 小红书图标 */}
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M8.5 12.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center hover:bg-green-600 transition-colors duration-300"
                >
                  {/* 微信图标 */}
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
                    <path d="M8.5 12.5c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm5 0c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2z" />
                  </svg>
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 flex items-center justify-center hover:opacity-90 transition-opacity duration-300"
                >
                  {/* 邮件图标 */}
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">产品</h4>
              <ul className="space-y-4">
                {productLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#d4acfe] hover:translate-x-1 transition-all duration-250 inline-block"
                      style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">关于</h4>
              <ul className="space-y-4">
                {aboutLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-white/70 hover:text-[#d4acfe] hover:translate-x-1 transition-all duration-250 inline-block"
                      style={{ transitionTimingFunction: 'var(--ease-expo-out)' }}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Copyright Bar */}
        <div className="border-t border-white/10">
          <div className="max-w-[1200px] mx-auto px-6 py-6">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/50 text-sm">
                © 2026 定数实验室 | 东方命理 × 博弈论算法
              </p>
              <p className="text-white/50 text-sm">
                Made with <span className="text-[#d4acfe]">♥</span> by AWKN Team
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)}
        defaultTab={loginTab}
      />
    </footer>
  );
};

export default Footer;
