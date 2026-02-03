import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { LogOut, Plus, Pencil, Trash2, Shield } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';

interface AdminScreenProps {
  onLogout: () => void;
}

interface Question {
  id: string;
  question_text: string;
  question_type: 'scale' | 'binary';
  tag: string | null;
  category: string;
  options: Array<{ t: string; v?: string; tag?: string; score?: number }> | null;
  order_index: number;
}

interface Stats {
  total: number;
  recent: number;
  distribution: Record<string, number>;
}

const AdminScreen = ({ onLogout }: AdminScreenProps) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, recent: 0, distribution: {} });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const loadQuestions = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('is_active', true)
        .order('order_index');

      if (error) throw error;
      setQuestions(data || []);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load questions';
      toast({
        title: "加载失败",
        description: message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  const loadStats = useCallback(async () => {
    try {
      // 总测试数
      const { count: totalTests } = await supabase
        .from('test_results')
        .select('*', { count: 'exact', head: true });

      // 本周新增
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      const { count: weeklyTests } = await supabase
        .from('test_results')
        .select('*', { count: 'exact', head: true })
        .gte('completed_at', weekStart.toISOString());

      // 英雄类型分布
      const { data: testResults } = await supabase
        .from('test_results')
        .select('hero_type');

      const distribution: Record<string, number> = {};
      testResults?.forEach(item => {
        distribution[item.hero_type] = (distribution[item.hero_type] || 0) + 1;
      });

      setStats({
        total: totalTests || 0,
        recent: weeklyTests || 0,
        distribution
      });

      console.log('✅ 统计加载成功:', { totalTests, weeklyTests, distribution });
    } catch (error) {
      console.error('Stats error:', error);
    }
  }, []);

  useEffect(() => {
    loadQuestions();
    loadStats();
  }, [loadQuestions, loadStats]);

  const addMockQuestion = async () => {
    try {
      const newQuestion = {
        question_text: "新增的测试题目 (示例)...",
        question_type: 'scale',
        tag: 'C',
        category: '新增分类',
        order_index: questions.length + 1,
        is_active: true
      };

      const { error } = await supabase
        .from('questions')
        .insert([newQuestion]);

      if (error) throw error;

      toast({
        title: "添加成功",
        description: "新题目已添加到题库",
      });

      loadQuestions();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to add question';
      toast({
        title: "添加失败",
        description: message,
        variant: "destructive",
      });
    }
  };

  const deleteQuestion = async (id: string) => {
    if (!confirm('确定删除该题目吗?')) return;

    try {
      const { error } = await supabase
        .from('questions')
        .update({ is_active: false })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "删除成功",
        description: "题目已从题库中移除",
      });

      loadQuestions();
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete question';
      toast({
        title: "删除失败",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <section className="w-full max-w-4xl mx-auto fade-in pb-10">
      <div className="glass-panel p-6 rounded-2xl mb-6">
        <div className="flex justify-between items-center">
          <h2 className="text-accent font-bold orbitron text-lg flex items-center gap-2">
            <Shield className="w-6 h-6" /> ADMIN CONSOLE
          </h2>
          <Button
            onClick={onLogout}
            variant="ghost"
            size="sm"
            className="hover:bg-destructive/20 hover:text-destructive"
          >
            <LogOut className="w-4 h-4 mr-1" /> 退出
          </Button>
        </div>
      </div>

      <Tabs defaultValue="data" className="w-full">
        <TabsList className="grid w-full grid-cols-2 glass-panel">
          <TabsTrigger value="data">数据概览</TabsTrigger>
          <TabsTrigger value="questions">题目管理</TabsTrigger>
        </TabsList>

        <TabsContent value="data" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="glass-panel p-6 rounded-xl">
              <div className="text-sm text-muted-foreground mb-2">完成人数</div>
              <div className="text-3xl font-bold text-foreground">{stats.total}</div>
            </div>
            <div className="glass-panel p-6 rounded-xl">
              <div className="text-sm text-muted-foreground mb-2">本周新增</div>
              <div className="text-3xl font-bold text-primary">{stats.recent}</div>
            </div>
            <div className="glass-panel p-6 rounded-xl">
              <div className="text-sm text-muted-foreground mb-2">题库数量</div>
              <div className="text-3xl font-bold text-accent">{questions.length}</div>
            </div>
          </div>

          <div className="glass-panel p-6 rounded-xl">
            <h3 className="text-sm font-bold text-muted-foreground mb-4">英雄类型分布</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(stats.distribution).map(([type, count]) => (
                <div key={type} className="bg-white/5 p-4 rounded-lg">
                  <div className="text-xs text-muted-foreground">{type}</div>
                  <div className="text-2xl font-bold text-primary">{count as number}</div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="questions" className="space-y-4 mt-6">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">
              当前题库: <span className="text-foreground font-bold">{questions.length}</span> 题
            </span>
            <Button
              onClick={addMockQuestion}
              size="sm"
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Plus className="w-4 h-4 mr-1" /> 新增题目
            </Button>
          </div>

          {loading ? (
            <div className="text-center py-10 text-muted-foreground">加载中...</div>
          ) : (
            <div className="space-y-3">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="glass-panel p-4 rounded-lg flex justify-between items-center"
                >
                  <div className="flex-1 mr-4">
                    <div className="text-[10px] text-secondary font-bold mb-1">
                      [{q.category}] {q.question_type === 'scale' ? '量表题' : '二选题'}
                    </div>
                    <div className="text-sm text-foreground">{q.question_text}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-primary/20 hover:text-primary"
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => deleteQuestion(q.id)}
                      className="hover:bg-destructive/20 hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default AdminScreen;
