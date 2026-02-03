'use client';

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import WelcomeScreen from '@/components/WelcomeScreen';
import AuthScreen from '@/components/AuthScreen';
import DashboardScreen from '@/components/DashboardScreen';
import AdminScreen from '@/components/AdminScreen';
import QuizScreen from '@/components/QuizScreen';
import LoadingScreen from '@/components/LoadingScreen';
import ResultScreen from '@/components/ResultScreen';
import { ARCHETYPES } from '@/data/questions';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Button } from '@/components/ui/button';

type Screen = 'welcome' | 'auth' | 'dashboard' | 'admin' | 'quiz' | 'loading' | 'result';

interface Scores {
  R: number;
  I: number;
  A: number;
  S: number;
  E: number;
  C: number;
}

interface MBTIScores {
  E: number;
  I: number;
  S: number;
  N: number;
  T: number;
  F: number;
  J: number;
  P: number;
}

interface CAASScore {
  score: number;
  total: number;
}

interface TestResult {
  heroType: string;
  heroTitle: string;
  heroDesc: string;
  mbtiType: string;
  adaptability: string;
  scores: Scores;
  advice: string;
}

interface Question {
  id: string;
  question_text: string;
  question_type: 'scale' | 'binary';
  tag: string | null;
  category: string;
  options: Array<{ t: string; v?: string; tag?: string; score?: number }> | null;
}

interface Profile {
  id: string;
  username: string;
  display_name: string;
  role: 'student' | 'admin';
}

interface Answer {
  type: 'scale' | 'binary';
  tag?: string;
  value?: number;
  option?: { t: string; v?: string; tag?: string; score?: number };
}

const Home = () => {
  const [screen, setScreen] = useState<Screen>('welcome');
  const [user, setUser] = useState<unknown>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [scores, setScores] = useState<Scores>({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
  const [mbtiScores, setMbtiScores] = useState<MBTIScores>({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
  const [result, setResult] = useState<TestResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loadProfile = useCallback(async (userId: string, retryCount = 0): Promise<Profile | null> => {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle();

    if (data) {
      const profileData = data as Profile;
      setProfile(profileData);
      return profileData;
    } else if (retryCount < 3) {
      // 如果没找到 profile，可能是触发器还没执行完，重试几次
      console.log(`未找到档案，正在进行第 ${retryCount + 1} 次重试...`);
      await new Promise(resolve => setTimeout(resolve, 1000));
      return loadProfile(userId, retryCount + 1);
    }
    return null;
  }, []);

  const checkAuth = useCallback(async () => {
    // 优先检查正常用户认证
    const { data: { session } } = await supabase.auth.getSession();

    if (session) {
      console.log('检测到有效会话:', session.user.email);
      setUser(session.user);
      localStorage.setItem('userId', session.user.id);
      // 登录状态下清除游客标记
      localStorage.removeItem('isGuest');
      localStorage.removeItem('guestId');
      return await loadProfile(session.user.id);
    }

    // 如果没有会话，再检查游客模式
    const isGuest = localStorage.getItem('isGuest') === 'true';
    const guestId = localStorage.getItem('guestId');

    if (isGuest && guestId) {
      console.log('检测到游客模式:', guestId);
      const guestProfile = {
        id: guestId,
        username: 'Guest',
        display_name: '待觉醒者',
        role: 'student'
      } as Profile;
      setProfile(guestProfile);
      return guestProfile;
    } else {
      setUser(null);
      setProfile(null);
      return null;
    }
  }, [loadProfile]);

  const loadQuestions = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('开始加载题目...');

      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) {
        console.error('数据库查询错误:', error);
        throw error;
      }

      if (data && data.length > 0) {
        const formattedQuestions = data as Question[];
        setQuestions(formattedQuestions);
        console.log('✓ 题目加载成功:', formattedQuestions.length);
        return formattedQuestions;
      } else {
        console.warn('⚠ 数据库题目为空，使用本地兜底数据');
        // 使用本地兜底数据 - 完整的24题题库
        const fallbackQuestions = [
          // 第一阶段：寻找你的主战场 (1-12题)
          { id: '1', question_text: '相比于看说明书或听课，你更喜欢直接上手试一试，拆开看看里面是什么构造？', question_type: 'scale', tag: 'R', category: '战场定位', options: null },
          { id: '2', question_text: '你是否很难长时间坐着不动，更喜欢体育课、手工课或者在户外跑跳的感觉？', question_type: 'scale', tag: 'R', category: '战场定位', options: null },
          { id: '3', question_text: '遇到一个奇怪的现象（比如天空变色），你是否非要上网查清楚背后的科学原理才肯罢休？', question_type: 'scale', tag: 'I', category: '战场定位', options: null },
          { id: '4', question_text: '你喜欢玩需要深度思考的游戏吗（如复杂的解谜、数独、策略棋类），还是觉得太累脑子？', question_type: 'scale', tag: 'I', category: '战场定位', options: null },
          { id: '5', question_text: '你对"丑"的东西容忍度很低（比如难看的排版/衣服），总想动手把它改得更好看？', question_type: 'scale', tag: 'A', category: '战场定位', options: null },
          { id: '6', question_text: '你的脑子里经常会有各种天马行空的故事画面，并且喜欢画出来或写下来？', question_type: 'scale', tag: 'A', category: '战场定位', options: null },
          { id: '7', question_text: '你是朋友圈里的"树洞"吗？朋友心情不好时，是否总喜欢找你倾诉？', question_type: 'scale', tag: 'S', category: '战场定位', options: null },
          { id: '8', question_text: '教别人做题，或者帮集体做服务（如打扫卫生、搬东西），会让你感到心里暖暖的吗？', question_type: 'scale', tag: 'S', category: '战场定位', options: null },
          { id: '9', question_text: '在小组合作一团糟的时候，你是否倾向于站出来接管局面，指挥大家该干什么？', question_type: 'scale', tag: 'E', category: '战场定位', options: null },
          { id: '10', question_text: '你想买某个东西时，是否很擅长想出一套理由来说服父母？', question_type: 'scale', tag: 'E', category: '战场定位', options: null },
          { id: '11', question_text: '你的房间或书包总是整整齐齐的，每样东西都有自己的位置？', question_type: 'scale', tag: 'C', category: '战场定位', options: null },
          { id: '12', question_text: '你喜欢制定计划、整理笔记、按规则办事，而不是随随便便搞定就行？', question_type: 'scale', tag: 'C', category: '战场定位', options: null },

          // 第二阶段：人格觉醒 (13-20题)
          { id: '13', question_text: '你是更喜欢和朋友聚会、参加活动，还是一个人待在家里看书、打游戏？', question_type: 'binary', tag: null, category: '人格觉醒', options: [
            { t: '和朋友聚会、参加活动', v: 'E' },
            { t: '一个人待在家里看书、打游戏', v: 'I' }
          ]},
          { id: '14', question_text: '你更相信通过五官感受到的细节，还是凭借直觉和想象力来推测未来？', question_type: 'binary', tag: null, category: '人格觉醒', options: [
            { t: '相信通过五官感受到的细节', v: 'S' },
            { t: '凭借直觉和想象力推测未来', v: 'N' }
          ]},
          { id: '15', question_text: '做决定时，你更看重逻辑分析和客观标准，还是个人感受和人情关系？', question_type: 'binary', tag: null, category: '人格觉醒', options: [
            { t: '逻辑分析和客观标准', v: 'T' },
            { t: '个人感受和人情关系', v: 'F' }
          ]},
          { id: '16', question_text: '你喜欢提前把事情安排好、按计划执行，还是喜欢随机应变、保持开放？', question_type: 'binary', tag: null, category: '人格觉醒', options: [
            { t: '提前把事情安排好、按计划执行', v: 'J' },
            { t: '随机应变、保持开放', v: 'P' }
          ]},

          // 第三阶段：潜能激活 (17-20题)
          { id: '17', question_text: '我有自己感兴趣的事情，并且愿意投入时间去做。', question_type: 'scale', tag: 'CAAS', category: '潜能激活', options: null },
          { id: '18', question_text: '遇到困难时，我能够想办法克服，而不是轻易放弃。', question_type: 'scale', tag: 'CAAS', category: '潜能激活', options: null },
          { id: '19', question_text: '我对未来有清晰的目标和规划。', question_type: 'scale', tag: 'CAAS', category: '潜能激活', options: null },
          { id: '20', question_text: '我相信自己的能力，能够应对学习和生活中的挑战。', question_type: 'scale', tag: 'CAAS', category: '潜能激活', options: null },
        ];
        setQuestions(fallbackQuestions);
        console.log('✓ 使用本地兜底数据:', fallbackQuestions.length);
        return fallbackQuestions;
      }
    } catch (err) {
      console.error('题目加载失败:', err);
      toast({
        title: '题目加载失败',
        description: '无法加载题目，已自动切换到本地题库',
        variant: 'destructive'
      });
      // 即使出错也返回兜底数据
      const fallbackQuestions = [
        { id: '1', question_text: '相比于看说明书或听课，你更喜欢直接上手试一试，拆开看看里面是什么构造？', question_type: 'scale', tag: 'R', category: '战场定位', options: null },
        { id: '2', question_text: '你是否很难长时间坐着不动，更喜欢体育课、手工课或者在户外跑跳的感觉？', question_type: 'scale', tag: 'R', category: '战场定位', options: null },
        { id: '3', question_text: '遇到一个奇怪的现象（比如天空变色），你是否非要上网查清楚背后的科学原理才肯罢休？', question_type: 'scale', tag: 'I', category: '战场定位', options: null },
        { id: '4', question_text: '你喜欢玩需要深度思考的游戏吗（如复杂的解谜、数独、策略棋类），还是觉得太累脑子？', question_type: 'scale', tag: 'I', category: '战场定位', options: null },
        { id: '5', question_text: '你对"丑"的东西容忍度很低（比如难看的排版/衣服），总想动手把它改得更好看？', question_type: 'scale', tag: 'A', category: '战场定位', options: null },
        { id: '6', question_text: '你的脑子里经常会有各种天马行空的故事画面，并且喜欢画出来或写下来？', question_type: 'scale', tag: 'A', category: '战场定位', options: null },
        { id: '7', question_text: '你是朋友圈里的"树洞"吗？朋友心情不好时，是否总喜欢找你倾诉？', question_type: 'scale', tag: 'S', category: '战场定位', options: null },
        { id: '8', question_text: '教别人做题，或者帮集体做服务（如打扫卫生、搬东西），会让你感到心里暖暖的吗？', question_type: 'scale', tag: 'S', category: '战场定位', options: null },
        { id: '9', question_text: '在小组合作一团糟的时候，你是否倾向于站出来接管局面，指挥大家该干什么？', question_type: 'scale', tag: 'E', category: '战场定位', options: null },
        { id: '10', question_text: '你想买某个东西时，是否很擅长想出一套理由来说服父母？', question_type: 'scale', tag: 'E', category: '战场定位', options: null },
        { id: '11', question_text: '你的房间或书包总是整整齐齐的，每样东西都有自己的位置？', question_type: 'scale', tag: 'C', category: '战场定位', options: null },
        { id: '12', question_text: '你喜欢制定计划、整理笔记、按规则办事，而不是随随便便搞定就行？', question_type: 'scale', tag: 'C', category: '战场定位', options: null },
        { id: '13', question_text: '你是更喜欢和朋友聚会、参加活动，还是一个人待在家里看书、打游戏？', question_type: 'binary', tag: null, category: '人格觉醒', options: [
          { t: '和朋友聚会、参加活动', v: 'E' },
          { t: '一个人待在家里看书、打游戏', v: 'I' }
        ]},
        { id: '14', question_text: '你更相信通过五官感受到的细节，还是凭借直觉和想象力来推测未来？', question_type: 'binary', tag: null, category: '人格觉醒', options: [
          { t: '相信通过五官感受到的细节', v: 'S' },
          { t: '凭借直觉和想象力推测未来', v: 'N' }
        ]},
        { id: '15', question_text: '做决定时，你更看重逻辑分析和客观标准，还是个人感受和人情关系？', question_type: 'binary', tag: null, category: '人格觉醒', options: [
          { t: '逻辑分析和客观标准', v: 'T' },
          { t: '个人感受和人情关系', v: 'F' }
        ]},
        { id: '16', question_text: '你喜欢提前把事情安排好、按计划执行，还是喜欢随机应变、保持开放？', question_type: 'binary', tag: null, category: '人格觉醒', options: [
          { t: '提前把事情安排好、按计划执行', v: 'J' },
          { t: '随机应变、保持开放', v: 'P' }
        ]},
        { id: '17', question_text: '我有自己感兴趣的事情，并且愿意投入时间去做。', question_type: 'scale', tag: 'CAAS', category: '潜能激活', options: null },
        { id: '18', question_text: '遇到困难时，我能够想办法克服，而不是轻易放弃。', question_type: 'scale', tag: 'CAAS', category: '潜能激活', options: null },
        { id: '19', question_text: '我对未来有清晰的目标和规划。', question_type: 'scale', tag: 'CAAS', category: '潜能激活', options: null },
        { id: '20', question_text: '我相信自己的能力，能够应对学习和生活中的挑战。', question_type: 'scale', tag: 'CAAS', category: '潜能激活', options: null },
      ];
      setQuestions(fallbackQuestions);
      return fallbackQuestions;
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const handleStartFromWelcome = () => {
    setScreen('auth');
  };

  const handleLoginFromWelcome = () => {
    setScreen('auth');
  };

  const handleAuthSuccess = async () => {
    const profileData = await checkAuth();
    if (profileData) {
      if (profileData.role === 'admin') {
        setScreen('admin');
      } else {
        setScreen('dashboard');
      }
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('isGuest');
    localStorage.removeItem('guestId');
    setScreen('welcome');
  };

  const handleStartTest = async () => {
    if (isLoading) return;
    
    const loadedQuestions = await loadQuestions();
    if (loadedQuestions && loadedQuestions.length > 0) {
      setScreen('quiz');
    } else {
      toast({
        title: '题目加载失败',
        description: '无法加载测试题目，请检查网络连接后重试',
        variant: 'destructive'
      });
    }
  };

  const handleAnswer = (answer: Answer) => {
    const newScores = { ...scores };
    const newMbtiScores = { ...mbtiScores };

    if (answer.tag && newScores[answer.tag as keyof Scores] !== undefined) {
      const value = answer.value || 0;
      newScores[answer.tag as keyof Scores] += value;
      setScores(newScores);
    }

    if (answer.option && answer.option.v) {
      const mbtiType = answer.option.v as keyof MBTIScores;
      newMbtiScores[mbtiType] += 1;
      setMbtiScores(newMbtiScores);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 完成测试，计算结果
      calculateResult(newScores, newMbtiScores);
    }
  };

  const calculateResult = async (finalScores: Scores, finalMbtiScores: MBTIScores) => {
    setScreen('loading');
    setIsLoading(true);

    try {
      // 找出得分最高的类型
      let maxScore = 0;
      let heroType = 'A';
      Object.entries(finalScores).forEach(([key, value]) => {
        if (value > maxScore) {
          maxScore = value;
          heroType = key;
        }
      });

      // 计算 MBTI
      const mbtiType = [
        finalMbtiScores.E >= finalMbtiScores.I ? 'E' : 'I',
        finalMbtiScores.S >= finalMbtiScores.N ? 'S' : 'N',
        finalMbtiScores.T >= finalMbtiScores.F ? 'T' : 'F',
        finalMbtiScores.J >= finalMbtiScores.P ? 'J' : 'P'
      ].join('');

      const archetype = ARCHETYPES[heroType as keyof typeof ARCHETYPES];

      const resultData: TestResult = {
        heroType,
        heroTitle: archetype.title,
        heroDesc: archetype.desc,
        mbtiType,
        adaptability: '高适应力',
        scores: finalScores,
        advice: '你的英雄潜能正在觉醒，继续保持探索！'
      };

      setResult(resultData);

      // 保存结果到数据库（仅限登录用户）
      if (profile && profile.id && !profile.id.startsWith('guest_')) {
        try {
          await supabase.from('test_results').insert({
            user_id: profile.id,
            hero_type: heroType,
            mbti_type: mbtiType,
            scores: finalScores,
            created_at: new Date().toISOString()
          });
          console.log('✓ 测试结果保存成功');
        } catch (err) {
          console.error('保存测试结果失败:', err);
          // 静默失败，不影响用户查看结果
        }
      }
    } catch (err) {
      console.error('计算结果失败:', err);
      toast({
        title: '计算结果失败',
        description: '系统暂时无法计算结果，请重试',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleExitTest = () => {
    if (profile?.role === 'admin') {
      setScreen('admin');
    } else {
      setScreen('dashboard');
    }
    resetTest();
  };

  const handleRestartTest = () => {
    resetTest();
    setScreen('quiz');
  };

  const resetTest = () => {
    setCurrentQuestion(0);
    setScores({ R: 0, I: 0, A: 0, S: 0, E: 0, C: 0 });
    setMbtiScores({ E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 });
    setResult(null);
    setQuestions([]);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      {screen !== 'welcome' && (
        <div className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur border-b border-white/10 p-4 flex justify-end items-center">
          <div className="text-xs text-muted-foreground orbitron">
            {profile ? (profile.display_name || profile.username) : (localStorage.getItem('isGuest') === 'true' ? '待觉醒者' : '未觉醒')}
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center p-4 pt-20">
        {screen === 'welcome' && (
          <WelcomeScreen
            onStart={handleStartFromWelcome}
            onLogin={handleLoginFromWelcome}
          />
        )}

        {screen === 'auth' && <AuthScreen onAuthSuccess={handleAuthSuccess} />}

        {screen === 'dashboard' && (
          profile ? (
            <DashboardScreen
              userName={profile.display_name || profile.username}
              onStartTest={handleStartTest}
              onLogout={handleLogout}
            />
          ) : (
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              <p className="text-primary orbitron text-sm animate-pulse">同步神经档案...</p>
            </div>
          )
        )}

        {screen === 'admin' && <AdminScreen onLogout={handleLogout} />}

        {screen === 'quiz' && questions.length > 0 && currentQuestion < questions.length && (
          <QuizScreen
            question={questions[currentQuestion]}
            questionIndex={currentQuestion}
            totalQuestions={questions.length}
            onAnswer={handleAnswer}
            onExit={handleExitTest}
          />
        )}

        {screen === 'quiz' && questions.length === 0 && (
          <div className="text-center text-muted-foreground">
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="mb-4">正在加载题目...</p>
              </div>
            ) : (
              <>
                <p className="mb-4">题目加载失败</p>
                <Button onClick={() => loadQuestions()}>重新加载</Button>
              </>
            )}
          </div>
        )}

        {screen === 'loading' && (
          <LoadingScreen
            scores={scores}
            onComplete={() => {
              setScreen('result');
            }}
          />
        )}

        {screen === 'result' && result && (
          <ResultScreen
            result={result}
            onRestart={handleRestartTest}
            onExit={handleExitTest}
          />
        )}
      </main>

      <Toaster />
    </div>
  );
};

export default Home;
