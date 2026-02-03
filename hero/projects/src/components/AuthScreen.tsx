import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Fingerprint, Lock, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen = ({ onAuthSuccess }: AuthScreenProps) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleGuestLogin = () => {
    // 生成游客ID
    const guestId = `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('guestId', guestId);
    localStorage.setItem('isGuest', 'true');
    
    console.log('游客登录:', guestId);
    
    toast({
      title: "游客模式",
      description: "以游客身份进入系统",
    });
    
    // 延迟一下确保localStorage设置完成
    setTimeout(() => {
      onAuthSuccess();
    }, 100);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 处理邮箱格式：如果已经包含@，直接使用，否则添加@heroawaken.com
      const email = username.includes('@') 
        ? username.toLowerCase() 
        : `${username.toLowerCase().replace(/\s+/g, '')}@heroawaken.com`;
      
      console.log('尝试登录:', email);

      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });

      if (error) {
        console.error('登录错误:', error);
        throw error;
      }

      console.log('登录成功:', data);

      toast({
        title: "连接成功",
        description: "正在建立神经连接...",
      });

      onAuthSuccess();
    } catch (error) {
      console.error('登录异常:', error);
      const message = error instanceof Error ? error.message : '登录失败，请检查账号密码';
      toast({
        title: "连接失败",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 验证用户名
    if (username.length < 3) {
      toast({
        title: "用户名太短",
        description: "用户名至少需要3个字符",
        variant: "destructive",
      });
      return;
    }

    // 验证密码长度
    if (password.length < 6) {
      toast({
        title: "密码太短",
        description: "密码至少需要6个字符",
        variant: "destructive",
      });
      return;
    }

    // 验证密码匹配
    if (password !== confirmPassword) {
      toast({
        title: "密码不匹配",
        description: "请确认两次输入的密码一致",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // 构建邮箱地址 - 使用标准域名
      const email = username.includes('@')
        ? username.toLowerCase()
        : `${username.toLowerCase().replace(/\s+/g, '')}@heroawaken.com`;
      
      console.log('尝试注册:', { email, role: isAdminMode ? 'admin' : 'student' });

      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            username: username,
            display_name: displayName || username,
            role: isAdminMode ? 'admin' : 'student'
          },
          emailRedirectTo: window.location.origin
        }
      });

      if (error) {
        console.error('注册错误:', error);
        throw error;
      }

      console.log('注册成功:', data);

      toast({
        title: "注册成功",
        description: isAdminMode ? "正在建立管理员档案..." : "正在建立你的英雄档案...",
      });

      // 自动登录
      setTimeout(() => {
        setUsername(username);
        setIsLogin(true);
        toast({
          title: "请登录",
          description: "请使用刚才注册的账号登录",
        });
      }, 1500);
      
    } catch (error) {
      console.error('注册异常:', error);
      const message = error instanceof Error ? error.message : '创建档案失败';
      toast({
        title: "注册失败",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fillAdmin = () => {
    setUsername('10919669@qq.com');
    setPassword('AWKN780618');
    toast({
      title: "管理员账号",
      description: "已填充管理员登录信息，点击登录即可",
    });
  };

  const toggleRegisterMode = () => {
    setIsLogin(false);
    setIsAdminMode(false);
  };

  const toggleAdminRegister = () => {
    setIsAdminMode(!isAdminMode);
    toast({
      title: isAdminMode ? "切换为学生注册" : "切换为管理员注册",
      description: isAdminMode ? "将创建普通学生账户" : "将创建管理员账户",
    });
  };

  if (isLogin) {
    return (
      <section className="w-full max-w-md fade-in">
        <div className="text-center mb-10">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center gradient-primary glow-pulse">
            <Fingerprint className="w-10 h-10 text-black" />
          </div>
          <h2 className="text-2xl font-bold text-foreground orbitron tracking-widest">
            少年英雄觉醒系统
          </h2>
          <p className="text-xs text-muted-foreground mt-2">SYSTEM v7.2 // READY</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="glass-panel rounded-lg p-3 flex items-center gap-3 focus-within:border-primary transition-colors">
            <User className="w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="ID / 用户名 / 邮箱"
              className="bg-transparent border-none outline-none text-foreground font-mono h-auto p-0"
              required
            />
          </div>

          <div className="glass-panel rounded-lg p-3 flex items-center gap-3 focus-within:border-primary transition-colors">
            <Lock className="w-5 h-5 text-muted-foreground" />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Passcode"
              className="bg-transparent border-none outline-none text-foreground font-mono h-auto p-0"
              required
            />
          </div>

          <div className="flex items-center justify-between text-xs text-muted-foreground mt-2">
            <label className="flex items-center gap-1">
              <input type="checkbox" className="accent-primary" /> 保持连接
            </label>
            <span 
              onClick={fillAdmin}
              className="cursor-pointer hover:text-primary border-b border-transparent hover:border-primary transition"
            >
              管理员登录
            </span>
          </div>

          <Button
            type="submit"
            disabled={loading}
            className="w-full py-6 mt-6 bg-primary text-primary-foreground font-bold orbitron hover:bg-primary/90 transition shadow-[0_0_15px_hsla(var(--neon-blue)/0.4)]"
          >
            {loading ? 'CONNECTING...' : '>>> LINK START'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">没有账号?</p>
          <div className="flex gap-2 justify-center mt-2">
            <button
              onClick={toggleRegisterMode}
              className="text-xs text-secondary font-bold border-b border-transparent hover:border-secondary"
            >
              英雄请注册留名
            </button>
            <span className="text-xs text-muted-foreground">或</span>
            <button
              onClick={handleGuestLogin}
              className="text-xs text-accent font-bold border-b border-transparent hover:border-accent"
            >
              游客登录
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-md fade-in">
      <div className="text-center mb-8">
        <div className="w-16 h-16 border-2 border-secondary rounded-full mx-auto mb-4 flex items-center justify-center">
          <User className="w-8 h-8 text-secondary" />
        </div>
        <h2 className="text-xl font-bold text-foreground orbitron">
          {isAdminMode ? '管理员档案' : '英雄档案'}
        </h2>
        <p className="text-xs text-muted-foreground mt-1">
          {isAdminMode ? '创建管理员账户' : '创建你的英雄档案'}
        </p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        {isAdminMode && (
          <div className="bg-accent/10 border border-accent/30 rounded-lg p-3 text-xs text-accent">
            <strong>管理员注册模式</strong>：将创建具有后台管理权限的账户
          </div>
        )}
        
        <div className="glass-panel rounded-lg p-3">
          <div className="text-[10px] text-secondary mb-1">HERO NAME</div>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="请输入用户名 (至少3个字符)"
            className="bg-transparent border-none outline-none text-foreground h-auto p-0"
            required
            minLength={3}
          />
        </div>

        <div className="glass-panel rounded-lg p-3">
          <div className="text-[10px] text-secondary mb-1">邮箱账户名</div>
          <Input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            placeholder="显示名称 (可选)"
            className="bg-transparent border-none outline-none text-foreground h-auto p-0"
          />
        </div>

        <div className="glass-panel rounded-lg p-3">
          <div className="text-[10px] text-secondary mb-1">安全密码</div>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="设置密码 (至少6个字符)"
            className="bg-transparent border-none outline-none text-foreground h-auto p-0"
            required
            minLength={6}
          />
        </div>

        <div className="glass-panel rounded-lg p-3">
          <div className="text-[10px] text-secondary mb-1">确认密码</div>
          <Input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="确认密码"
            className="bg-transparent border-none outline-none text-foreground h-auto p-0"
            required
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-4 bg-secondary text-secondary-foreground font-bold orbitron hover:bg-secondary/80 transition shadow-[0_0_15px_hsla(var(--neon-purple)/0.4)]"
        >
          {loading ? 'CREATING...' : 'CONFIRM REGISTRATION'}
        </Button>
      </form>

      <div className="mt-6 space-y-3">
        <Button
          onClick={toggleAdminRegister}
          variant="outline"
          className="w-full text-xs border-accent/30 hover:border-accent hover:bg-accent/10"
        >
          {isAdminMode ? '切换为学生注册' : '管理员注册'}
        </Button>
        
        <Button
          onClick={() => setIsLogin(true)}
          variant="ghost"
          className="w-full text-xs text-muted-foreground hover:text-foreground"
        >
          &lt; 返回登录
        </Button>
      </div>
    </section>
  );
};

export default AuthScreen;
