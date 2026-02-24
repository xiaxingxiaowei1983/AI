'use client';

import React, { useState, useEffect } from 'react';

// 任务类型定义
interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: string;
  dueDate: string;
  createdAt: string;
  tags: string[];
}

// 模拟任务数据
const mockTasks: Task[] = [
  {
    id: '1',
    title: '实现记忆库搜索功能',
    description: '为记忆库页面添加搜索和筛选功能，支持按关键词和分类搜索',
    status: 'done',
    priority: 'high',
    assignee: 'DevAgent',
    dueDate: '2024-06-01',
    createdAt: '2024-05-25',
    tags: ['开发', '记忆库']
  },
  {
    id: '2',
    title: '创建团队结构页面',
    description: '设计并实现团队结构页面，展示所有 AI 代理及其职责',
    status: 'done',
    priority: 'high',
    assignee: 'DesignAgent',
    dueDate: '2024-06-02',
    createdAt: '2024-05-26',
    tags: ['设计', '团队']
  },
  {
    id: '3',
    title: '实现数字办公室',
    description: '创建数字办公室页面，展示团队成员的工作状态和任务进度',
    status: 'done',
    priority: 'medium',
    assignee: 'DevAgent',
    dueDate: '2024-06-03',
    createdAt: '2024-05-27',
    tags: ['开发', '办公室']
  },
  {
    id: '4',
    title: '开发内容流水线系统',
    description: '设计并实现内容流水线系统，支持内容的创建、编辑和发布',
    status: 'in_progress',
    priority: 'high',
    assignee: 'WriterAgent',
    dueDate: '2024-06-05',
    createdAt: '2024-05-28',
    tags: ['内容', '流水线']
  },
  {
    id: '5',
    title: '优化日历功能',
    description: '改进日历页面，添加任务排程和 cron jobs 管理功能',
    status: 'todo',
    priority: 'medium',
    assignee: 'DevAgent',
    dueDate: '2024-06-07',
    createdAt: '2024-05-29',
    tags: ['开发', '日历']
  },
  {
    id: '6',
    title: '编写系统文档',
    description: '为整个系统创建详细的文档，包括架构设计和使用指南',
    status: 'todo',
    priority: 'low',
    assignee: 'WriterAgent',
    dueDate: '2024-06-10',
    createdAt: '2024-05-30',
    tags: ['文档', '写作']
  }
];

// 优先级标签组件
const PriorityBadge = ({ priority }: { priority: Task['priority'] }) => {
  const getPriorityStyle = () => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityText = () => {
    switch (priority) {
      case 'urgent':
        return '紧急';
      case 'high':
        return '高';
      case 'medium':
        return '中';
      case 'low':
        return '低';
      default:
        return '未知';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityStyle()}`}>
      {getPriorityText()}
    </span>
  );
};

// 状态标签组件
const StatusBadge = ({ status }: { status: Task['status'] }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'todo':
        return 'bg-gray-100 text-gray-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'review':
        return 'bg-purple-100 text-purple-800';
      case 'done':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'todo':
        return '待办';
      case 'in_progress':
        return '进行中';
      case 'review':
        return '审核中';
      case 'done':
        return '已完成';
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

// 任务卡片组件
const TaskCard = ({ task }: { task: Task }) => {
  return (
    <div className="bg-white rounded-lg border p-4 shadow-sm">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
        <PriorityBadge priority={task.priority} />
      </div>
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{task.description}</p>
      <div className="flex flex-wrap gap-2 mb-3">
        {task.tags.map((tag, index) => (
          <span key={index} className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
            {tag}
          </span>
        ))}
      </div>
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>分配给: {task.assignee}</span>
        <span>截止: {new Date(task.dueDate).toLocaleDateString()}</span>
      </div>
      <div className="mt-3 flex justify-between items-center">
        <StatusBadge status={task.status} />
        <button className="text-sm text-blue-600 hover:text-blue-800">查看详情</button>
      </div>
    </div>
  );
};

// 任务列组件
const TaskColumn = ({ title, tasks, status }: { title: string; tasks: Task[]; status: Task['status'] }) => {
  return (
    <div className="flex-1 min-w-[280px] bg-gray-50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        <span className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>
      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

const TasksPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  // 按状态分组任务
  const todoTasks = tasks.filter(task => task.status === 'todo');
  const inProgressTasks = tasks.filter(task => task.status === 'in_progress');
  const reviewTasks = tasks.filter(task => task.status === 'review');
  const doneTasks = tasks.filter(task => task.status === 'done');

  return (
    <div className="min-h-screen">
      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">任务看板</h1>
          <p className="text-sm text-gray-500">管理和跟踪所有团队任务</p>
        </div>

        {/* 任务统计 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-500">总任务</h3>
              <p className="text-2xl font-bold text-gray-900">{tasks.length}</p>
            </div>
            <div className="border rounded-lg p-4 bg-blue-50">
              <h3 className="text-sm font-medium text-gray-500">进行中</h3>
              <p className="text-2xl font-bold text-blue-900">{inProgressTasks.length}</p>
            </div>
            <div className="border rounded-lg p-4 bg-yellow-50">
              <h3 className="text-sm font-medium text-gray-500">待办</h3>
              <p className="text-2xl font-bold text-yellow-900">{todoTasks.length}</p>
            </div>
            <div className="border rounded-lg p-4 bg-green-50">
              <h3 className="text-sm font-medium text-gray-500">已完成</h3>
              <p className="text-2xl font-bold text-green-900">{doneTasks.length}</p>
            </div>
          </div>
        </div>

        {/* 任务看板 */}
        <div className="flex overflow-x-auto space-x-4 pb-4">
          <TaskColumn title="待办" tasks={todoTasks} status="todo" />
          <TaskColumn title="进行中" tasks={inProgressTasks} status="in_progress" />
          <TaskColumn title="审核中" tasks={reviewTasks} status="review" />
          <TaskColumn title="已完成" tasks={doneTasks} status="done" />
        </div>
      </main>
    </div>
  );
};

export default TasksPage;