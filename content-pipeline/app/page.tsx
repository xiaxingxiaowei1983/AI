'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import ProjectForm from '@/components/ui/project-form';
import { CalendarIcon, ImageIcon, VideoIcon, Share2Icon, BrainIcon } from 'lucide-react';

// 内容项目类型
interface ContentItem {
  id: string;
  title: string;
  description: string;
  status: string;
  createdAt: number;
  updatedAt: number;
  createdBy: string;
  dueDate?: number;
  priority: string;
}

const Page: React.FC = () => {
  // 本地状态管理
  const [allItems, setAllItems] = useState<ContentItem[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);

  // 按状态获取内容项目
  const ideas = allItems.filter(item => item.status === 'idea');
  const scripts = allItems.filter(item => item.status === 'script');
  const thumbnails = allItems.filter(item => item.status === 'thumbnail');
  const filming = allItems.filter(item => item.status === 'filming');
  const publish = allItems.filter(item => item.status === 'publish');

  // 状态统计
  const statusCounts = {
    idea: ideas.length,
    script: scripts.length,
    thumbnail: thumbnails.length,
    filming: filming.length,
    publish: publish.length,
  };

  // 状态图标映射
  const statusIcons = {
    idea: BrainIcon,
    script: CalendarIcon,
    thumbnail: ImageIcon,
    filming: VideoIcon,
    publish: Share2Icon,
  };

  // 状态名称映射
  const statusNames = {
    idea: '灵感',
    script: '脚本',
    thumbnail: '缩略图',
    filming: '拍摄',
    publish: '发布',
  };

  if (isLoadingAll) {
    return <div className="flex items-center justify-center min-h-screen">加载中...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CalendarIcon className="h-6 w-6 text-blue-600" />
            <h1 className="text-xl font-semibold text-gray-900">内容流水线</h1>
          </div>
          <ProjectForm onSuccess={(project) => {
            const newItem: ContentItem = {
              id: `item-${Date.now()}`,
              ...project,
              createdAt: Date.now(),
              updatedAt: Date.now(),
              createdBy: 'user',
            };
            setAllItems(prev => [...prev, newItem]);
          }} />
        </div>
      </header>

      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 状态概览卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          {Object.entries(statusCounts).map(([status, count]) => {
            const Icon = statusIcons[status as keyof typeof statusIcons];
            return (
              <Card key={status}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-gray-500">{statusNames[status as keyof typeof statusNames]}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-2">
                    <Icon className="h-5 w-5 text-blue-600" />
                    <span className="text-2xl font-bold text-gray-900">{count}</span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 内容项目标签页 */}
        <Card>
          <CardHeader>
            <CardTitle>内容项目</CardTitle>
            <CardDescription>管理和跟踪所有内容创作项目</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all">
              <TabsList className="grid grid-cols-6 mb-4">
                <TabsTrigger value="all">全部</TabsTrigger>
                <TabsTrigger value="idea">灵感</TabsTrigger>
                <TabsTrigger value="script">脚本</TabsTrigger>
                <TabsTrigger value="thumbnail">缩略图</TabsTrigger>
                <TabsTrigger value="filming">拍摄</TabsTrigger>
                <TabsTrigger value="publish">发布</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                <div className="space-y-4">
                  {allItems?.length ? (
                    allItems.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{statusNames[item.status as keyof typeof statusNames]}</Badge>
                          <Button variant="ghost" size="sm">编辑</Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">暂无内容项目</div>
                  )}
                </div>
              </TabsContent>
              
              {Object.entries(statusCounts).map(([status]) => (
                <TabsContent key={status} value={status}>
                  <div className="space-y-4">
                    {(status === 'idea' ? ideas :
                      status === 'script' ? scripts :
                      status === 'thumbnail' ? thumbnails :
                      status === 'filming' ? filming :
                      publish)?.map((item) => (
                      <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                        <div>
                          <h3 className="font-medium text-gray-900">{item.title}</h3>
                          <p className="text-sm text-gray-500">{item.description}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant="outline">{statusNames[status as keyof typeof statusNames]}</Badge>
                          <Button variant="ghost" size="sm">编辑</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Page;
