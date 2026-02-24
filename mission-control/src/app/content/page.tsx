'use client';

import React, { useState, useEffect } from 'react';

// 内容类型定义
interface Content {
  id: string;
  title: string;
  type: 'article' | 'social' | 'video' | 'podcast';
  status: 'draft' | 'review' | 'scheduled' | 'published';
  author: string;
  createdAt: string;
  scheduledAt?: string;
  publishedAt?: string;
  platform: string[];
  tags: string[];
  thumbnail?: string;
}

// 模拟内容数据
const mockContent: Content[] = [
  {
    id: '1',
    title: '如何构建高效的 AI 代理系统',
    type: 'article',
    status: 'published',
    author: 'WriterAgent',
    createdAt: '2024-05-20',
    publishedAt: '2024-05-25',
    platform: ['博客', '知乎'],
    tags: ['AI', '代理系统', '技术'],
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=AI%20agent%20system%20technology%20article%20thumbnail%2C%20professional%20style%2C%20blue%20theme&image_size=landscape_16_9'
  },
  {
    id: '2',
    title: 'AI 驱动的个人生产力提升指南',
    type: 'social',
    status: 'scheduled',
    author: 'WriterAgent',
    createdAt: '2024-05-22',
    scheduledAt: '2024-06-10',
    platform: ['微信朋友圈', '微博'],
    tags: ['生产力', 'AI 工具', '个人发展']
  },
  {
    id: '3',
    title: 'Next.js 14 新特性深度解析',
    type: 'video',
    status: 'review',
    author: 'DevAgent',
    createdAt: '2024-05-25',
    platform: ['YouTube', 'B 站'],
    tags: ['前端', 'Next.js', '技术教程'],
    thumbnail: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=Next.js%2014%20tutorial%20video%20thumbnail%2C%20coding%20screen%2C%20modern%20design&image_size=landscape_16_9'
  },
  {
    id: '4',
    title: '创业家如何利用 AI 优化业务流程',
    type: 'podcast',
    status: 'draft',
    author: 'WriterAgent',
    createdAt: '2024-05-28',
    platform: ['喜马拉雅', 'Spotify'],
    tags: ['创业', 'AI', '业务优化']
  },
  {
    id: '5',
    title: '记忆库系统的设计与实现',
    type: 'article',
    status: 'draft',
    author: 'DevAgent',
    createdAt: '2024-05-30',
    platform: ['博客', '掘金'],
    tags: ['数据库', '记忆系统', '前端']
  }
];

// 内容类型标签组件
const ContentTypeBadge = ({ type }: { type: Content['type'] }) => {
  const getTypeStyle = () => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-800';
      case 'social':
        return 'bg-purple-100 text-purple-800';
      case 'video':
        return 'bg-red-100 text-red-800';
      case 'podcast':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeText = () => {
    switch (type) {
      case 'article':
        return '文章';
      case 'social':
        return '社交';
      case 'video':
        return '视频';
      case 'podcast':
        return '播客';
      default:
        return '未知';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTypeStyle()}`}>
      {getTypeText()}
    </span>
  );
};

// 状态标签组件
const StatusBadge = ({ status }: { status: Content['status'] }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'review':
        return 'bg-yellow-100 text-yellow-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'published':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'draft':
        return '草稿';
      case 'review':
        return '审核中';
      case 'scheduled':
        return '已排期';
      case 'published':
        return '已发布';
      default:
        return '未知';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle()}`}>
      {getStatusText()}
    </span>
  );
};

// 内容卡片组件
const ContentCard = ({ content }: { content: Content }) => {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      {content.thumbnail && (
        <div className="mb-4 rounded-lg overflow-hidden">
          <img src={content.thumbnail} alt={content.title} className="w-full h-40 object-cover" />
        </div>
      )}
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 truncate">{content.title}</h3>
        <ContentTypeBadge type={content.type} />
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {content.platform.map((platform, index) => (
          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {platform}
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-3">
        {content.tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-50 text-blue-800">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
        <span>作者: {content.author}</span>
        <span>创建: {new Date(content.createdAt).toLocaleDateString()}</span>
      </div>
      {content.scheduledAt && (
        <div className="mb-3 text-xs text-gray-500">
          排期: {new Date(content.scheduledAt).toLocaleString()}
        </div>
      )}
      {content.publishedAt && (
        <div className="mb-3 text-xs text-gray-500">
          发布: {new Date(content.publishedAt).toLocaleString()}
        </div>
      )}
      <div className="flex justify-between items-center">
        <StatusBadge status={content.status} />
        <button className="text-sm text-blue-600 hover:text-blue-800">管理</button>
      </div>
    </div>
  );
};

// 内容列组件
const ContentColumn = ({ title, contents, status }: { title: string; contents: Content[]; status: Content['status'] }) => {
  return (
    <div className="flex-1 min-w-[280px] bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {contents.length}
        </span>
      </div>
      <div className="space-y-3">
        {contents.map(content => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
};

const ContentPage: React.FC = () => {
  const [contents, setContents] = useState<Content[]>(mockContent);

  // 按状态分组内容
  const draftContents = contents.filter(content => content.status === 'draft');
  const reviewContents = contents.filter(content => content.status === 'review');
  const scheduledContents = contents.filter(content => content.status === 'scheduled');
  const publishedContents = contents.filter(content => content.status === 'published');

  return (
    <div className="min-h-screen">
      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">内容流水线</h1>
          <p className="text-sm text-gray-500">管理和发布所有内容</p>
        </div>

        {/* 内容统计 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4 bg-gray-50">
              <h3 className="text-sm font-medium text-gray-500">草稿</h3>
              <p className="text-2xl font-bold text-gray-900">{draftContents.length}</p>
            </div>
            <div className="border rounded-lg p-4 bg-yellow-50">
              <h3 className="text-sm font-medium text-gray-500">审核中</h3>
              <p className="text-2xl font-bold text-yellow-900">{reviewContents.length}</p>
            </div>
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="text-sm font-medium text-gray-500">已排期</h3>
              <p className="text-2xl font-bold text-blue-900">{scheduledContents.length}</p>
            </div>
            <div className="border rounded-lg p-4 bg-green-50">
              <h3 className="text-sm font-medium text-gray-500">已发布</h3>
              <p className="text-2xl font-bold text-green-900">{publishedContents.length}</p>
            </div>
          </div>
        </div>

        {/* 内容流水线 */}
        <div className="flex overflow-x-auto space-x-4 pb-4">
          <ContentColumn title="草稿" contents={draftContents} status="draft" />
          <ContentColumn title="审核中" contents={reviewContents} status="review" />
          <ContentColumn title="已排期" contents={scheduledContents} status="scheduled" />
          <ContentColumn title="已发布" contents={publishedContents} status="published" />
        </div>
      </main>
    </div>
  );
};

export default ContentPage;