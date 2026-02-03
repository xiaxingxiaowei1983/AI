'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Download, RotateCcw, BookOpen, Lightbulb, Layers, Target, Wrench, Star } from 'lucide-react';

interface ScriptViewProps {
  script: {
    title: string;
    name: string;      // 名
    dao: string;       // 道
    fa: string;        // 法
    shu: string;       // 术
    qi: string;        // 器
    li: string;        // 例
  };
  onReset: () => void;
}

export function ScriptView({ script, onReset }: ScriptViewProps) {
  const handleCopy = async () => {
    const text = Object.entries(script)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n\n');
    
    await navigator.clipboard.writeText(text);
    alert('已复制到剪贴板');
  };

  const handleDownload = () => {
    const text = Object.entries(script)
      .map(([key, value]) => `${key}: ${value}`)
      .join('\n\n');
    
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${script.title || '认知脚本'}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* 操作栏 */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">📜 核心脚本</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="w-4 h-4 mr-2" />
            复制
          </Button>
          <Button variant="outline" size="sm" onClick={handleDownload}>
            <Download className="w-4 h-4 mr-2" />
            下载
          </Button>
          <Button variant="outline" size="sm" onClick={onReset}>
            <RotateCcw className="w-4 h-4 mr-2" />
            重新投喂
          </Button>
        </div>
      </div>

      {/* 脚本内容 */}
      <div className="space-y-4">
        {/* 名 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-purple-500" />
            <h3 className="text-xl font-bold text-purple-700 dark:text-purple-400">名 · 核心概念</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{script.name}</p>
          </div>
        </Card>

        {/* 道 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="text-xl font-bold text-amber-700 dark:text-amber-400">道 · 底层逻辑</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{script.dao}</p>
          </div>
        </Card>

        {/* 法 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Layers className="w-5 h-5 text-blue-500" />
            <h3 className="text-xl font-bold text-blue-700 dark:text-blue-400">法 · 执行框架</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{script.fa}</p>
          </div>
        </Card>

        {/* 术 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-5 h-5 text-green-500" />
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400">术 · 具体方法</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{script.shu}</p>
          </div>
        </Card>

        {/* 器 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="w-5 h-5 text-slate-500" />
            <h3 className="text-xl font-bold text-slate-700 dark:text-slate-400">器 · 工具资源</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{script.qi}</p>
          </div>
        </Card>

        {/* 例 */}
        <Card className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-rose-500" />
            <h3 className="text-xl font-bold text-rose-700 dark:text-rose-400">例 · 实战案例</h3>
          </div>
          <div className="prose dark:prose-invert max-w-none">
            <p className="text-base leading-relaxed whitespace-pre-wrap">{script.li}</p>
          </div>
        </Card>
      </div>

      {/* 页脚提示 */}
      <div className="text-center text-sm text-muted-foreground">
        <p>✨ 已将 60 分钟阅读压缩至 5 分钟行动指令</p>
      </div>
    </div>
  );
}
