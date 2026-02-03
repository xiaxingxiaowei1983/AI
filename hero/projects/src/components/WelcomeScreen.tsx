import { useEffect, useRef } from 'react';
import { Button } from './ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
  onLogin: () => void;
}

const WelcomeScreen = ({ onStart, onLogin }: WelcomeScreenProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let width: number, height: number;
    const particles: Particle[] = [];
    const mouse = { x: 0, y: 0 };
    const particleCount = 150;

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      mouse.x = width / 2;
      mouse.y = height / 2;
    }
    resize();
    window.addEventListener('resize', resize);

    const colors: string[] = [];
    for (let i = 0; i < particleCount; i++) {
      const hue = 180 + Math.random() * 60;
      colors.push(`hsl(${hue}, 100%, 50%)`);
    }

    class Particle {
      i: number;
      x!: number;
      y!: number;
      vx!: number;
      vy!: number;
      size!: number;
      speed!: number;
      color!: string;
      prevX!: number;
      prevY!: number;

      constructor(i: number) {
        this.i = i;
        this.reset();
      }

      reset() {
        const angle = Math.random() * Math.PI * 2;
        const dist = Math.max(width, height) * 0.6 + Math.random() * 150;
        this.x = Math.cos(angle) * dist + width / 2;
        this.y = Math.sin(angle) * dist + height / 2;
        this.vx = 0;
        this.vy = 0;
        this.size = 1.5 + Math.random() * 1.5;
        this.speed = 2 + Math.random() * 2;
        this.color = colors[this.i];
        this.prevX = this.x;
        this.prevY = this.y;
      }

      update() {
        this.prevX = this.x;
        this.prevY = this.y;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 5) {
          const force = 80 / (dist + 40);
          this.vx += (dx / dist) * force * this.speed;
          this.vy += (dy / dist) * force * this.speed;

          const angle = Math.atan2(dy, dx) + Math.PI / 2;
          this.vx += Math.cos(angle) * force;
          this.vy += Math.sin(angle) * force;
        }

        this.vx *= 0.95;
        this.vy *= 0.95;

        this.x += this.vx;
        this.y += this.vy;

        if (dist < 10) {
          this.reset();
        }

        const d = Math.sqrt((this.x - width / 2) ** 2 + (this.y - height / 2) ** 2);
        if (d > Math.max(width, height) * 0.7) this.reset();
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.moveTo(this.prevX, this.prevY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.size;
        ctx.lineCap = 'round';
        ctx.globalAlpha = 0.7;
        ctx.stroke();
        ctx.globalAlpha = 1;

        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle(i));
    }

    let animationFrameId: number;
    function animate() {
      if (!ctx) return;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, width, height);

      particles.forEach(p => {
        p.update();
        p.draw();
      });

      const g = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 25);
      g.addColorStop(0, 'rgba(0, 243, 255, 0.4)');
      g.addColorStop(1, 'rgba(0, 243, 255, 0)');
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(mouse.x, mouse.y, 25, 0, Math.PI * 2);
      ctx.fill();

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden bg-black">
      <canvas ref={canvasRef} className="fixed inset-0 z-0 pointer-events-none" />

      <div className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur border-b border-white/10 h-12 flex items-center px-6">
        <div className="text-[#00f3ff] font-bold orbitron text-xs">SYSTEM v8.0 // READY</div>
      </div>

      <div className="relative z-20 pt-12 flex justify-center items-center min-h-full">
        <div className="w-[90vw] max-w-[500px] min-h-[550px] md:aspect-square bg-transparent rounded-[20px] m-4 relative overflow-hidden">
          <section className="w-full h-full flex flex-col items-center justify-center p-8 bg-black/70 rounded-[20px] relative z-20 border border-white/5">
            <div className="w-20 h-20 md:w-24 md:h-24 mb-6 md:mb-8 flex items-center justify-center bg-black/80 rounded-full border border-white/10">
              <span className="material-symbols-outlined text-5xl md:text-6xl text-white animate-pulse">fingerprint</span>
            </div>
            
            <h1 className="text-xl md:text-2xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 mb-3 md:mb-4">
              少年英雄觉醒系统
            </h1>
            <p className="text-[9px] md:text-[10px] text-gray-500 tracking-[0.2em] md:tracking-[0.3em] mb-10 md:mb-16 uppercase">
              启动神经链路，开启 360° 潜能扫描
            </p>
            
            <Button 
              onClick={onStart}
              className="w-full py-7 bg-[#00f3ff] text-black font-black orbitron rounded-xl shadow-[0_0_20px_#00f3ff] hover:shadow-[0_0_30px_#00f3ff] hover:bg-[#00f3ff]/90 transition-all duration-300 mb-4 text-base"
            >
              解封天赋，接管主场
            </Button>
            
            <Button 
              onClick={onLogin}
              variant="outline"
              className="w-full py-7 bg-black border-2 border-[#00f3ff] text-[#00f3ff] font-black orbitron rounded-xl hover:shadow-[0_0_20px_#00f3ff] hover:bg-cyan-400/10 transition-all duration-300 text-base"
            >
              英雄回归登录
            </Button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

