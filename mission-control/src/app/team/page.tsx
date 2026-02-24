'use client';

import React from 'react';

// 模拟团队数据 - 六个核心AI助手
const teamData = {
  leader: {
    name: '大宗师 (Grand Master)',
    role: '战略中枢与陈婷数字镜像 (Governor)',
    responsibilities: [
      '微信个人号运营',
      '顶层决策制定',
      '商业模型分析',
      '自主进化协调'
    ],
    currentTask: '优化四大运转层级执行逻辑',
    status: 'working'
  },
  assistants: [
    {
      name: '枢纽 (Hub)',
      role: '运营大管家与协议网关 (COO)',
      responsibilities: [
        '流程控制',
        '任务拆解',
        '协议管理',
        '资源协调'
      ],
      currentTask: '建立任务分发与监控系统',
      status: 'working'
    },
    {
      name: '营造 (Production)',
      role: '生产引擎与技术骨干 (CTO)',
      responsibilities: [
        '代码编写',
        '技术实现',
        '系统架构',
        '性能优化'
      ],
      currentTask: '开发记忆库与Convex数据库集成',
      status: 'working'
    },
    {
      name: '绿茶 (Green Tea)',
      role: '公域捕手与爆款制造机 (CGO)',
      responsibilities: [
        '小红书运营',
        '视频号运营',
        '公众号运营',
        '内容爆款制造'
      ],
      currentTask: '构建内容分发与数据分析系统',
      status: 'working'
    },
    {
      name: '巡查 (Inspector)',
      role: '商业哨兵与合规检查官 (CCO)',
      responsibilities: [
        '市场监控',
        '合规审计',
        '风险评估',
        '商业情报分析'
      ],
      currentTask: '建立市场监控与预警机制',
      status: 'working'
    },
    {
      name: '宗师 (Master)',
      role: '人生决策与底层逻辑引擎 (CLO)',
      responsibilities: [
        '个人能量复盘',
        '决策校准',
        '思维模型构建',
        '价值体系维护'
      ],
      currentTask: '优化人生决策算法与执行系统',
      status: 'working'
    }
  ]
};

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

// 团队成员卡片组件
const TeamMemberCard = ({ member }: { member: any }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
          <p className="text-sm text-gray-500">{member.role}</p>
        </div>
        <StatusBadge status={member.status} />
      </div>
      
      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Current Task:</h4>
        <p className="text-sm text-gray-600">{member.currentTask}</p>
      </div>
      
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Responsibilities:</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          {member.responsibilities.map((responsibility: string, index: number) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              {responsibility}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// 角色部分组件
const RoleSection = ({ title, members }: { title: string; members: any[] }) => {
  return (
    <div className="mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      <div className="space-y-4">
        {members.map((member, index) => (
          <TeamMemberCard key={index} member={member} />
        ))}
      </div>
    </div>
  );
};

const TeamPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* 主内容区 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">团队结构</h1>
          <p className="text-sm text-gray-500">管理和协调所有AI助手</p>
        </div>
        {/* 战略中枢 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">战略中枢</h2>
          <TeamMemberCard member={teamData.leader} />
        </div>

        {/* 核心助手团队 */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">核心助手团队</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamData.assistants.map((assistant, index) => (
              <TeamMemberCard key={index} member={assistant} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default TeamPage;