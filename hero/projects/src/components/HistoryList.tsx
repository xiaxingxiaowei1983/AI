import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from './ui/button';
import { Clock, TrendingUp, Eye } from 'lucide-react';
import { Card } from './ui/card';

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

interface HistoryListProps {
  userId?: string;
  guestId?: string;
  isGuest: boolean;
  onViewDetail: (record: TestRecord) => void;
}

const HistoryList = ({ userId, guestId, isGuest, onViewDetail }: HistoryListProps) => {
  const [history, setHistory] = useState<TestRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, guestId, isGuest]);

  const loadHistory = async () => {
    setLoading(true);
    console.log('📚 加载历史记录...', { userId, guestId, isGuest });

    try {
      let query = supabase
        .from('test_results')
        .select('*')
        .order('completed_at', { ascending: false })
        .limit(10);

      if (isGuest && guestId) {
        query = query.eq('guest_id', guestId);
      } else if (userId) {
        query = query.eq('user_id', userId);
      } else {
        console.log('⚠️ 没有有效的用户ID或游客ID');
        setLoading(false);
        return;
      }

      const { data, error } = await query;

      if (error) {
        console.error('❌ 加载历史记录失败:', error);
        return;
      }

      console.log('✅ 历史记录加载成功:', data?.length, '条');
      setHistory(data || []);
    } catch (error) {
      console.error('❌ 加载历史记录异常:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground text-sm">加载历史记录中...</p>
      </div>
    );
  }

  if (history.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4 opacity-50">
          <Clock className="w-16 h-16 mx-auto text-muted-foreground" />
        </div>
        <h3 className="text-lg font-bold mb-2">暂无测试记录</h3>
        <p className="text-muted-foreground text-sm mb-6">
          完成你的第一次测试，开启英雄觉醒之旅
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-primary" />
          测试历史
          <span className="ml-2 text-sm text-muted-foreground">({history.length})</span>
        </h3>
      </div>

      {history.map((record) => (
        <Card key={record.id} className="glass-panel p-4 hover:border-primary/50 transition">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">
                  {formatDate(record.completed_at)}
                </span>
              </div>
              
              <h4 className="font-bold text-lg mb-2 gradient-text">
                {record.hero_title}
              </h4>
              
              <div className="flex gap-2 mb-3">
                <span className="px-2 py-1 bg-primary/10 rounded text-xs border border-primary/30 text-primary">
                  {record.mbti_type}
                </span>
              </div>

              <p className="text-sm text-muted-foreground line-clamp-2">
                {record.advice}
              </p>
            </div>

            <Button
              onClick={() => onViewDetail(record)}
              variant="ghost"
              size="sm"
              className="ml-4"
            >
              <Eye className="w-4 h-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default HistoryList;