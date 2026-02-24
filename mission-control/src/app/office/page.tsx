'use client';

import React, { useState, useEffect } from 'react';

// 模拟核心AI助手数据
const teamMembers = [
  {
    id: 1,
    name: '大宗师 (Grand Master)',
    role: '战略中枢与陈婷数字镜像 (Governor)',
    status: 'working',
    currentTask: '优化四大运转层级执行逻辑',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20strategic%20master%20avatar%2C%20blue%20theme%2C%20authoritative%2C%20digital%20style&image_size=square',
    position: { row: 0, col: 0 }
  },
  {
    id: 2,
    name: '枢纽 (Hub)',
    role: '运营大管家与协议网关 (COO)',
    status: 'working',
    currentTask: '建立任务分发与监控系统',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20operations%20manager%20avatar%2C%20organized%2C%20reliable%2C%20business%20style&image_size=square',
    position: { row: 0, col: 1 }
  },
  {
    id: 3,
    name: '营造 (Production)',
    role: '生产引擎与技术骨干 (CTO)',
    status: 'working',
    currentTask: '开发记忆库与Convex数据库集成',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=skilled%20technology%20expert%20avatar%2C%20geek%20style%2C%20glasses%2C%20tech%20savvy&image_size=square',
    position: { row: 0, col: 2 }
  },
  {
    id: 4,
    name: '绿茶 (Green Tea)',
    role: '公域捕手与爆款制造机 (CGO)',
    status: 'working',
    currentTask: '构建内容分发与数据分析系统',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=creative%20content%20creator%20avatar%2C%20trendy%2C%20vibrant%2C%20social%20media%20style&image_size=square',
    position: { row: 1, col: 0 }
  },
  {
    id: 5,
    name: '巡查 (Inspector)',
    role: '商业哨兵与合规检查官 (CCO)',
    status: 'working',
    currentTask: '建立市场监控与预警机制',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=professional%20business%20inspector%20avatar%2C%20analytical%2C%20sharp%20eyes%2C%20formal%20style&image_size=square',
    position: { row: 1, col: 1 }
  },
  {
    id: 6,
    name: '宗师 (Master)',
    role: '人生决策与底层逻辑引擎 (CLO)',
    status: 'working',
    currentTask: '优化人生决策算法与执行系统',
    avatar: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=wise%20life%20coach%20avatar%2C%20philosophical%2C%20calm%2C%20mentor%20style&image_size=square',
    position: { row: 1, col: 2 }
  }
];

// 状态标签组件
const StatusBadge = ({ status }: { status: string }) => {
  const getStatusStyle = () => {
    switch (status) {
      case 'working':
        return 'bg-green-100 text-green-800';
      case 'idle':
        return 'bg-gray-100 text-gray-800';
      case 'stuck':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'working':
        return 'Working';
      case 'idle':
        return 'Idle';
      case 'stuck':
        return 'Stuck';
      default:
        return 'Unknown';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusStyle()}`}>
      {getStatusText()}
    </span>
  );
};

// 工作站组件
const Workstation = ({ member }: { member: any }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative border rounded-lg p-4 transition-all duration-300 ${member.status === 'working' ? 'border-green-300 bg-green-50' : 'border-gray-200 bg-gray-50'}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 工作站布局 */}
      <div className="flex flex-col items-center">
        {/* 电脑 */}
        <div className="w-full mb-4">
          <div className="bg-gray-800 rounded-t-lg p-2">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="bg-gray-100 rounded-b-lg p-4 min-h-[120px] flex items-center justify-center">
            <p className="text-sm text-gray-600 text-center">{member.currentTask}</p>
          </div>
        </div>

        {/* 员工信息 */}
        <div className="text-center">
          <div className="relative mb-2">
            <img 
              src={member.avatar} 
              alt={member.name} 
              className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            {member.status === 'working' && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
            )}
            {member.status === 'idle' && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-gray-400 rounded-full border-2 border-white"></div>
            )}
            {member.status === 'stuck' && (
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-red-500 rounded-full border-2 border-white"></div>
            )}
          </div>
          <h3 className="font-medium text-gray-900">{member.name}</h3>
          <p className="text-xs text-gray-500">{member.role}</p>
        </div>
      </div>

      {/* 悬停信息 */}
      {isHovered && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-white bg-opacity-90 rounded-lg flex items-center justify-center p-4 shadow-md">
          <div className="text-center">
            <h3 className="font-semibold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{member.role}</p>
            <StatusBadge status={member.status} />
            <p className="mt-2 text-sm text-gray-600">{member.currentTask}</p>
          </div>
        </div>
      )}
    </div>
  );
};

const OfficePage: React.FC = () => {
  const [members, setMembers] = useState(teamMembers);

  // 模拟状态更新
  useEffect(() => {
    const interval = setInterval(() => {
      setMembers(prevMembers => 
        prevMembers.map(member => {
          // 随机更新状态，模拟真实工作场景
          const statuses = ['working', 'idle'];
          if (Math.random() > 0.95) { // 5% 概率更新状态
            return {
              ...member,
              status: statuses[Math.floor(Math.random() * statuses.length)]
            };
          }
          return member;
        })
      );
    }, 30000); // 每30秒更新一次

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">数字办公室</h1>
          <p className="text-sm text-gray-500">实时查看团队成员工作状态</p>
        </div>
        {/* 办公室布局 */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map(member => (
              <Workstation key={member.id} member={member} />
            ))}
          </div>
        </div>

        {/* 状态概览 */}
        <div className="mt-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">团队状态概览</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-green-800">工作中</h3>
              <p className="text-2xl font-bold text-green-900">{members.filter(m => m.status === 'working').length}</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-800">空闲</h3>
              <p className="text-2xl font-bold text-gray-900">{members.filter(m => m.status === 'idle').length}</p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-sm font-medium text-red-800">卡住</h3>
              <p className="text-2xl font-bold text-red-900">{members.filter(m => m.status === 'stuck').length}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OfficePage;