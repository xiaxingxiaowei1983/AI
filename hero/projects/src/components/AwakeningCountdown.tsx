import { useEffect, useRef } from 'react';

const AwakeningCountdown = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置画布大小
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 粒子类
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      alpha: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 2 + 1;
        this.alpha = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 243, 255, ${this.alpha})`;
        ctx.fill();
      }
    }

    // 创建粒子
    const particles: Particle[] = [];
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle());
    }

    // 倒计时文字
    let countdown = 5;
    let opacity = 1;
    let pulseScale = 1;

    // 动画循环
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 绘制粒子
      particles.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      // 绘制连线
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 243, 255, ${0.1 * (1 - distance / 100)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      // 绘制倒计时数字
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // 脉冲效果
      pulseScale = 1 + Math.sin(Date.now() * 0.003) * 0.15;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.scale(pulseScale, pulseScale);

      // 外发光
      ctx.shadowBlur = 40;
      ctx.shadowColor = 'rgba(0, 243, 255, 0.8)';

      // 倒计时数字
      ctx.font = 'bold 150px "Orbitron", monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = `rgba(0, 243, 255, ${opacity})`;
      ctx.fillText(countdown.toString(), 0, 0);

      ctx.restore();

      requestAnimationFrame(animate);
    };

    // 倒计时逻辑
    const countdownInterval = setInterval(() => {
      countdown--;
      if (countdown < 0) {
        countdown = 5;
      }
    }, 1000);

    // 淡入淡出效果
    const fadeInterval = setInterval(() => {
      opacity = 0.5 + Math.sin(Date.now() * 0.002) * 0.3;
    }, 50);

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      clearInterval(countdownInterval);
      clearInterval(fadeInterval);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
};

export default AwakeningCountdown;
