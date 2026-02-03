'use client';

import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Brain, Zap, FileText } from 'lucide-react';

export function ProcessingView() {
  return (
    <Card className="p-8">
      <div className="space-y-8">
        {/* 标题 */}
        <div className="text-center">
          <Brain className="w-16 h-16 mx-auto text-blue-500 mb-4" />
          <h2 className="text-2xl font-bold mb-2">正在深度解析...</h2>
          <p className="text-muted-foreground">
            底层逻辑推演中，预计需要 30-60 秒
          </p>
        </div>

        {/* 进度条 */}
        <div className="space-y-4">
          <Progress value={65} className="h-2" />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>已完成 65%</span>
            <span>预计剩余时间: 20秒</span>
          </div>
        </div>

        {/* 处理步骤 */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <FileText className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium">内容解析完成</p>
              <p className="text-sm text-muted-foreground">已提取 12,450 字内容</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5 animate-pulse">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium">正在执行名道法术器例递归推理</p>
              <p className="text-sm text-muted-foreground">分析底层逻辑与行动框架...</p>
            </div>
          </div>

          <div className="flex items-start gap-3 opacity-50">
            <div className="w-6 h-6 rounded-full bg-slate-300 dark:bg-slate-700 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="font-medium">生成实战脚本</p>
              <p className="text-sm text-muted-foreground">等待中...</p>
            </div>
          </div>
        </div>

        {/* 提示信息 */}
        <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900 rounded-lg p-4">
          <p className="text-sm text-blue-700 dark:text-blue-300">
            💡 提示：AI 正在进行深度思考，请耐心等待。我们会在生成完成后立即展示结果。
          </p>
        </div>
      </div>
    </Card>
  );
}
