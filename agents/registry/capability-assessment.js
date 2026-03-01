#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '../..');
const CAPABILITY_FILE = path.resolve(ROOT_DIR, 'agents/registry/agent-capabilities.json');

const DEFAULT_CAPABILITIES = {
  master: {
    name: '大宗师',
    role: 'CEO',
    capabilities: ['strategy', 'decision', 'coordination', 'learning', 'communication'],
    maxLoad: 10,
    currentLoad: 0,
    performance: 100,
    skills: ['leadership', 'strategic-planning', 'team-management']
  },
  coo: {
    name: '大掌柜',
    role: 'COO',
    capabilities: ['operations', 'coordination', 'task-management', 'resource-allocation'],
    maxLoad: 8,
    currentLoad: 0,
    performance: 100,
    skills: ['operations-management', 'task-scheduling', 'resource-optimization']
  },
  cto: {
    name: '天火',
    role: 'CTO',
    capabilities: ['development', 'architecture', 'technical-decision', 'security'],
    maxLoad: 6,
    currentLoad: 0,
    performance: 100,
    skills: ['system-design', 'code-review', 'security-auditing', 'performance-optimization']
  },
  content: {
    name: '绿茶',
    role: '内容总监',
    capabilities: ['content-creation', 'writing', 'design', 'creative'],
    maxLoad: 5,
    currentLoad: 0,
    performance: 100,
    skills: ['copywriting', 'content-strategy', 'creative-writing', 'design-thinking']
  },
  diting: {
    name: '谛听',
    role: '风险哨兵',
    capabilities: ['risk-detection', 'monitoring', 'security', 'alerting'],
    maxLoad: 4,
    currentLoad: 0,
    performance: 100,
    skills: ['risk-assessment', 'security-monitoring', 'threat-detection', 'incident-response']
  },
  bilian: {
    name: '碧莲',
    role: '业务专家',
    capabilities: ['business-analysis', 'customer-service', 'operations', 'planning'],
    maxLoad: 7,
    currentLoad: 0,
    performance: 100,
    skills: ['business-analysis', 'customer-relationship', 'process-optimization', 'data-analysis']
  },
  life: {
    name: '生活智能体',
    role: '生活助手',
    capabilities: ['lifestyle', 'personal-assistant', 'scheduling', 'reminders'],
    maxLoad: 5,
    currentLoad: 0,
    performance: 100,
    skills: ['time-management', 'personal-assistant', 'lifestyle-coaching', 'organization']
  }
};

function loadCapabilities() {
  if (!fs.existsSync(CAPABILITY_FILE)) {
    const dir = path.dirname(CAPABILITY_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(CAPABILITY_FILE, JSON.stringify(DEFAULT_CAPABILITIES, null, 2));
    return DEFAULT_CAPABILITIES;
  }
  return JSON.parse(fs.readFileSync(CAPABILITY_FILE, 'utf8'));
}

function saveCapabilities(capabilities) {
  fs.writeFileSync(CAPABILITY_FILE, JSON.stringify(capabilities, null, 2));
}

function getAgentCapabilities(agentName) {
  const capabilities = loadCapabilities();
  return capabilities[agentName] || null;
}

function getAvailableAgents(taskType) {
  const capabilities = loadCapabilities();
  const results = [];
  
  for (const [name, agent] of Object.entries(capabilities)) {
    const availableCapacity = agent.maxLoad - agent.currentLoad;
    if (availableCapacity > 0 && agent.capabilities.includes(taskType)) {
      results.push({
        ...agent,
        availableCapacity,
        score: (agent.performance / 100) * availableCapacity
      });
    }
  }
  
  results.sort((a, b) => b.score - a.score);
  return results;
}

function assignTask(agentName, taskWeight = 1) {
  const capabilities = loadCapabilities();
  if (!capabilities[agentName]) {
    throw new Error(`Agent ${agentName} not found`);
  }
  
  if (capabilities[agentName].currentLoad + taskWeight > capabilities[agentName].maxLoad) {
    throw new Error(`Agent ${agentName} is at full capacity`);
  }
  
  capabilities[agentName].currentLoad += taskWeight;
  saveCapabilities(capabilities);
  return capabilities[agentName];
}

function completeTask(agentName, taskWeight = 1) {
  const capabilities = loadCapabilities();
  if (!capabilities[agentName]) {
    throw new Error(`Agent ${agentName} not found`);
  }
  
  capabilities[agentName].currentLoad = Math.max(0, capabilities[agentName].currentLoad - taskWeight);
  saveCapabilities(capabilities);
  return capabilities[agentName];
}

function updatePerformance(agentName, performance) {
  const capabilities = loadCapabilities();
  if (!capabilities[agentName]) {
    throw new Error(`Agent ${agentName} not found`);
  }
  
  capabilities[agentName].performance = Math.min(100, Math.max(0, performance));
  saveCapabilities(capabilities);
  return capabilities[agentName];
}

function getAllAgents() {
  return loadCapabilities();
}

function main() {
  const args = process.argv.slice(2);
  const command = args[0];
  
  if (!command || args.includes('--help') || args.includes('-h')) {
    console.log(`
Agent Capability Assessment System

用法: node capability-assessment.js <命令> [选项]

命令:
  list                          列出所有智能体能力
  available <task-type>         查找可执行任务的智能体
  assign <agent-name> [weight]  分配任务
  complete <agent-name> [weight] 完成任务
  update <agent-name> <perf>   更新性能评分
  get <agent-name>             获取智能体详情

示例:
  node capability-assessment.js list
  node capability-assessment.js available development
  node capability-assessment.js assign master 2
  node capability-assessment.js complete master 2
  node capability-assessment.js update cto 95
`);
    process.exit(0);
  }
  
  switch (command) {
    case 'list':
      console.log(JSON.stringify(getAllAgents(), null, 2));
      break;
      
    case 'available':
      const taskType = args[1];
      if (!taskType) {
        console.error('请提供任务类型');
        process.exit(1);
      }
      console.log(JSON.stringify(getAvailableAgents(taskType), null, 2));
      break;
      
    case 'assign':
      const assignAgent = args[1];
      const assignWeight = parseInt(args[2]) || 1;
      if (!assignAgent) {
        console.error('请提供智能体名称');
        process.exit(1);
      }
      console.log(JSON.stringify(assignTask(assignAgent, assignWeight), null, 2));
      break;
      
    case 'complete':
      const completeAgent = args[1];
      const completeWeight = parseInt(args[2]) || 1;
      if (!completeAgent) {
        console.error('请提供智能体名称');
        process.exit(1);
      }
      console.log(JSON.stringify(completeTask(completeAgent, completeWeight), null, 2));
      break;
      
    case 'update':
      const updateAgent = args[1];
      const updatePerf = parseInt(args[2]);
      if (!updateAgent || isNaN(updatePerf)) {
        console.error('请提供智能体名称和性能评分');
        process.exit(1);
      }
      console.log(JSON.stringify(updatePerformance(updateAgent, updatePerf), null, 2));
      break;
      
    case 'get':
      const getAgent = args[1];
      if (!getAgent) {
        console.error('请提供智能体名称');
        process.exit(1);
      }
      console.log(JSON.stringify(getAgentCapabilities(getAgent), null, 2));
      break;
      
    default:
      console.error(`未知命令: ${command}`);
      process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = {
  loadCapabilities,
  getAgentCapabilities,
  getAvailableAgents,
  assignTask,
  completeTask,
  updatePerformance,
  getAllAgents
};
