'use client';

import React, { useState, useEffect } from 'react';
import { Calendar as BigCalendar, Event, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

interface Task extends Event {
  id: string;
  title: string;
  start: Date;
  end: Date;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'pending' | 'in_progress' | 'completed';
  category: string;
}

const CalendarPage: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    start: new Date(),
    end: new Date(new Date().setHours(new Date().getHours() + 1)),
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: 'work'
  });

  // 初始化任务数据
  useEffect(() => {
    const initialTasks: Task[] = [
      {
        id: '1',
        title: 'EvoMap 节点同步',
        start: new Date(new Date().setHours(9, 0, 0)),
        end: new Date(new Date().setHours(10, 0, 0)),
        description: '同步 EvoMap 节点数据，确保所有智能体状态一致',
        priority: 'high',
        status: 'pending',
        category: '系统维护'
      },
      {
        id: '2',
        title: '智能体能力评估',
        start: new Date(new Date().setHours(14, 0, 0)),
        end: new Date(new Date().setHours(16, 0, 0)),
        description: '评估智能体性能和能力，生成改进报告',
        priority: 'medium',
        status: 'in_progress',
        category: '评估'
      },
      {
        id: '3',
        title: '系统备份',
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 1)),
        description: '执行系统自动备份，确保数据安全',
        priority: 'low',
        status: 'pending',
        category: '系统维护'
      },
      {
        id: '4',
        title: '内容发布排期',
        start: new Date(new Date().setDate(new Date().getDate() + 2)),
        end: new Date(new Date().setDate(new Date().getDate() + 2)),
        description: '安排下周内容发布计划，包括文章和视频',
        priority: 'medium',
        status: 'pending',
        category: '内容'
      },
      {
        id: '5',
        title: '团队周会',
        start: new Date(new Date().setDate(new Date().getDate() + 3)),
        end: new Date(new Date().setDate(new Date().getDate() + 3)),
        description: '召开团队周会，讨论本周进展和下周计划',
        priority: 'medium',
        status: 'pending',
        category: '会议'
      }
    ];
    setTasks(initialTasks);
  }, []);

  // 处理选择时间槽
  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewTask({
      ...newTask,
      start,
      end
    });
    setIsAddingTask(true);
  };

  // 处理添加任务
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTask.title) {
      const task: Task = {
        id: Date.now().toString(),
        ...newTask,
        status: 'pending'
      };
      setTasks([...tasks, task]);
      setIsAddingTask(false);
      setNewTask({
        title: '',
        start: new Date(),
        end: new Date(new Date().setHours(new Date().getHours() + 1)),
        description: '',
        priority: 'medium',
        category: 'work'
      });
    }
  };

  // 处理删除任务
  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  // 处理更新任务状态
  const handleUpdateTaskStatus = (id: string, status: Task['status']) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, status } : task
    ));
  };

  // 获取事件样式
  const getEventStyle = (task: Task) => {
    let backgroundColor = '#0070f3';
    
    switch (task.priority) {
      case 'high':
        backgroundColor = '#ff4d4f';
        break;
      case 'medium':
        backgroundColor = '#faad14';
        break;
      case 'low':
        backgroundColor = '#52c41a';
        break;
    }

    return {
      style: {
        backgroundColor
      }
    };
  };

  // 获取优先级标签样式
  const getPriorityStyle = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 获取状态标签样式
  const getStatusStyle = (status: Task['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // 按类别分组任务
  const tasksByCategory = tasks.reduce((acc, task) => {
    if (!acc[task.category]) {
      acc[task.category] = [];
    }
    acc[task.category].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  return (
    <div className="min-h-screen">
      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">日历</h1>
          <p className="text-sm text-gray-500">排定任务和 cron jobs 的审计面板</p>
        </div>

        {/* 日历视图 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">任务日历</h2>
            <button 
              onClick={() => setIsAddingTask(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              添加任务
            </button>
          </div>
          
          <BigCalendar
            localizer={localizer}
            events={tasks}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 600 }}
            onSelectSlot={handleSelectSlot}
            eventPropGetter={getEventStyle}
            components={{
              eventWrapper: ({ event, children }: any) => (
                <div className="relative">
                  {children}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteTask(event.id);
                    }}
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs hover:bg-red-600"
                    aria-label="删除任务"
                  >
                    ×
                  </button>
                </div>
              )
            }}
          />
        </div>

        {/* 任务分类概览 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* 任务统计 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">任务统计</h2>
            <div className="grid grid-cols-3 gap-4">
              <div className="border rounded-lg p-4 bg-blue-50">
                <h3 className="text-sm font-medium text-gray-500">待处理</h3>
                <p className="text-2xl font-bold text-blue-900">{tasks.filter(t => t.status === 'pending').length}</p>
              </div>
              <div className="border rounded-lg p-4 bg-yellow-50">
                <h3 className="text-sm font-medium text-gray-500">进行中</h3>
                <p className="text-2xl font-bold text-yellow-900">{tasks.filter(t => t.status === 'in_progress').length}</p>
              </div>
              <div className="border rounded-lg p-4 bg-green-50">
                <h3 className="text-sm font-medium text-gray-500">已完成</h3>
                <p className="text-2xl font-bold text-green-900">{tasks.filter(t => t.status === 'completed').length}</p>
              </div>
            </div>
          </div>

          {/* 优先级分布 */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">优先级分布</h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">高优先级</span>
                  <span className="text-sm text-gray-500">{tasks.filter(t => t.priority === 'high').length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-red-500 h-2 rounded-full" 
                    style={{ width: `${(tasks.filter(t => t.priority === 'high').length / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">中优先级</span>
                  <span className="text-sm text-gray-500">{tasks.filter(t => t.priority === 'medium').length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(tasks.filter(t => t.priority === 'medium').length / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">低优先级</span>
                  <span className="text-sm text-gray-500">{tasks.filter(t => t.priority === 'low').length}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-green-500 h-2 rounded-full" 
                    style={{ width: `${(tasks.filter(t => t.priority === 'low').length / tasks.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 任务列表 */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">任务列表</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    任务
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    时间
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    分类
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    优先级
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    状态
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    操作
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {tasks.map((task) => (
                  <tr key={task.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{task.title}</div>
                      <div className="text-sm text-gray-500">{task.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div>{task.start.toLocaleString()}</div>
                      <div>{task.end.toLocaleString()}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {task.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPriorityStyle(task.priority)}`}>
                        {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={task.status}
                        onChange={(e) => handleUpdateTaskStatus(task.id, e.target.value as Task['status'])}
                        className="px-2 py-1 border rounded text-xs"
                      >
                        <option value="pending">待处理</option>
                        <option value="in_progress">进行中</option>
                        <option value="completed">已完成</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <button 
                        onClick={() => handleDeleteTask(task.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        删除
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 添加任务模态框 */}
        {isAddingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full">
              <h3 className="text-lg font-semibold mb-4">添加新任务</h3>
              <form onSubmit={handleAddTask}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    任务标题
                  </label>
                  <input
                    type="text"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    开始时间
                  </label>
                  <input
                    type="datetime-local"
                    value={newTask.start.toISOString().slice(0, 16)}
                    onChange={(e) => setNewTask({ ...newTask, start: new Date(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    结束时间
                  </label>
                  <input
                    type="datetime-local"
                    value={newTask.end.toISOString().slice(0, 16)}
                    onChange={(e) => setNewTask({ ...newTask, end: new Date(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    描述
                  </label>
                  <textarea
                    value={newTask.description}
                    onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    分类
                  </label>
                  <input
                    type="text"
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    优先级
                  </label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="low">低</option>
                    <option value="medium">中</option>
                    <option value="high">高</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingTask(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    保存
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default CalendarPage;