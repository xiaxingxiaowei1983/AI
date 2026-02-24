'use client';

import { useState, useEffect } from 'react';
import {
  Calendar as BigCalendar,
  Event,
  momentLocalizer
} from 'react-big-calendar';
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
}

const Calendar = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isAddingTask, setIsAddingTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    start: new Date(0),
    end: new Date(0),
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high'
  });

  // 客户端初始化任务和日期，避免服务端渲染时间不匹配
  useEffect(() => {
    // 初始化任务
    const initialTasks: Task[] = [
      {
        id: '1',
        title: 'EvoMap 节点同步',
        start: new Date(new Date().setHours(9, 0, 0)),
        end: new Date(new Date().setHours(10, 0, 0)),
        description: '同步 EvoMap 节点数据',
        priority: 'high',
        status: 'pending'
      },
      {
        id: '2',
        title: '智能体能力评估',
        start: new Date(new Date().setHours(14, 0, 0)),
        end: new Date(new Date().setHours(16, 0, 0)),
        description: '评估智能体性能和能力',
        priority: 'medium',
        status: 'in_progress'
      },
      {
        id: '3',
        title: '系统备份',
        start: new Date(new Date().setDate(new Date().getDate() + 1)),
        end: new Date(new Date().setDate(new Date().getDate() + 1)),
        description: '执行系统自动备份',
        priority: 'low',
        status: 'pending'
      }
    ];
    setTasks(initialTasks);

    // 初始化新任务日期
    setNewTask({
      title: '',
      start: new Date(),
      end: new Date(new Date().setHours(new Date().getHours() + 1)),
      description: '',
      priority: 'medium'
    });
  }, []);

  const handleSelectSlot = ({ start, end }: { start: Date; end: Date }) => {
    setNewTask({
      ...newTask,
      start,
      end
    });
    setIsAddingTask(true);
  };

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
        priority: 'medium'
      });
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

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

  return (
    <div>
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

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">任务列表</h3>
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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.priority === 'high' ? 'bg-red-100 text-red-800' :
                      task.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      task.status === 'completed' ? 'bg-green-100 text-green-800' :
                      task.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {task.status === 'completed' ? '已完成' :
                       task.status === 'in_progress' ? '进行中' : '待处理'}
                    </span>
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
    </div>
  );
};

export default Calendar;