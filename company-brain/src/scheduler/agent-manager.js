// 智能体管理器模块

const fs = require('fs').promises;
const path = require('path');

class AgentManager {
  constructor(config) {
    this.config = config;
    this.agentsDir = path.join(config.dataDir || './data', 'agents');
    this.agents = [];
  }
  
  async init() {
    console.log('🔧 初始化智能体管理器...');
    
    // 创建智能体目录
    try {
      await fs.mkdir(this.agentsDir, { recursive: true });
    } catch (error) {
      console.error('❌ 创建智能体目录失败:', error.message);
    }
    
    // 加载现有智能体
    await this.loadAgents();
    
    // 注册默认智能体
    await this.registerDefaultAgents();
    
    console.log(`✅ 智能体管理器初始化完成，加载了 ${this.agents.length} 个智能体`);
  }
  
  async loadAgents() {
    try {
      const files = await fs.readdir(this.agentsDir);
      this.agents = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.agentsDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          const agent = JSON.parse(content);
          this.agents.push(agent);
        }
      }
    } catch (error) {
      console.error('❌ 加载智能体失败:', error.message);
      this.agents = [];
    }
  }
  
  async registerDefaultAgents() {
    // 检查是否已有智能体
    if (this.agents.length > 0) {
      return;
    }
    
    // 注册默认智能体：绿茶
    await this.registerAgent({
      id: 'green-tea',
      name: '绿茶',
      type: 'psychological',
      status: 'active',
      capabilities: [
        'psychological_test',
        'drawing_analysis',
        'content_creation',
        'publishing_management'
      ],
      description: '专注于心理测试、内容创作和发布管理的智能体',
      workload: 0,
      performance: {
        completedTasks: 0,
        successRate: 1.0,
        averageResponseTime: 2.5
      }
    });
    
    // 注册默认智能体：大宗师
    await this.registerAgent({
      id: 'master',
      name: '大宗师',
      type: 'business',
      status: 'active',
      capabilities: [
        'business_model_analysis',
        'market_analysis',
        'financial_analysis',
        'strategic_planning',
        'problem_diagnosis'
      ],
      description: '专注于商业分析、战略规划和问题诊断的智能体',
      workload: 0,
      performance: {
        completedTasks: 0,
        successRate: 1.0,
        averageResponseTime: 3.0
      }
    });
  }
  
  async registerAgent(agentData) {
    try {
      // 生成智能体ID
      const id = agentData.id || `agent-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const agentWithId = {
        ...agentData,
        id,
        status: agentData.status || 'active',
        workload: agentData.workload || 0,
        performance: agentData.performance || {
          completedTasks: 0,
          successRate: 1.0,
          averageResponseTime: 3.0
        },
        createdAt: agentData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 保存智能体文件
      const filePath = path.join(this.agentsDir, `${id}.json`);
      await fs.writeFile(filePath, JSON.stringify(agentWithId, null, 2));
      
      // 更新内存中的智能体
      this.agents.push(agentWithId);
      
      console.log(`✅ 智能体注册成功: ${id}`);
      return agentWithId;
    } catch (error) {
      console.error('❌ 注册智能体失败:', error.message);
      throw error;
    }
  }
  
  async getAgent(id) {
    try {
      const agent = this.agents.find(a => a.id === id);
      if (!agent) {
        throw new Error(`智能体不存在: ${id}`);
      }
      return agent;
    } catch (error) {
      console.error('❌ 获取智能体失败:', error.message);
      throw error;
    }
  }
  
  async updateAgent(id, updatedAgent) {
    try {
      const index = this.agents.findIndex(a => a.id === id);
      if (index === -1) {
        throw new Error(`智能体不存在: ${id}`);
      }
      
      const agentToUpdate = {
        ...this.agents[index],
        ...updatedAgent,
        id,
        updatedAt: new Date().toISOString()
      };
      
      // 保存更新后的智能体
      const filePath = path.join(this.agentsDir, `${id}.json`);
      await fs.writeFile(filePath, JSON.stringify(agentToUpdate, null, 2));
      
      // 更新内存中的智能体
      this.agents[index] = agentToUpdate;
      
      console.log(`✅ 智能体更新成功: ${id}`);
      return agentToUpdate;
    } catch (error) {
      console.error('❌ 更新智能体失败:', error.message);
      throw error;
    }
  }
  
  async deleteAgent(id) {
    try {
      const index = this.agents.findIndex(a => a.id === id);
      if (index === -1) {
        throw new Error(`智能体不存在: ${id}`);
      }
      
      // 删除智能体文件
      const filePath = path.join(this.agentsDir, `${id}.json`);
      await fs.unlink(filePath);
      
      // 从内存中删除智能体
      this.agents.splice(index, 1);
      
      console.log(`✅ 智能体删除成功: ${id}`);
      return true;
    } catch (error) {
      console.error('❌ 删除智能体失败:', error.message);
      throw error;
    }
  }
  
  async listAgents(filters = {}) {
    try {
      let filteredAgents = this.agents;
      
      // 按状态过滤
      if (filters.status) {
        filteredAgents = filteredAgents.filter(agent => agent.status === filters.status);
      }
      
      // 按类型过滤
      if (filters.type) {
        filteredAgents = filteredAgents.filter(agent => agent.type === filters.type);
      }
      
      // 按能力过滤
      if (filters.capability) {
        filteredAgents = filteredAgents.filter(agent => 
          agent.capabilities && agent.capabilities.includes(filters.capability)
        );
      }
      
      return filteredAgents;
    } catch (error) {
      console.error('❌ 列出智能体失败:', error.message);
      return [];
    }
  }
  
  async getAvailableAgents() {
    try {
      return this.agents.filter(agent => agent.status === 'active');
    } catch (error) {
      console.error('❌ 获取可用智能体失败:', error.message);
      return [];
    }
  }
  
  async updateAgentWorkload(id, workloadChange) {
    try {
      const agent = await this.getAgent(id);
      const newWorkload = Math.max(0, agent.workload + workloadChange);
      
      return await this.updateAgent(id, {
        workload: newWorkload
      });
    } catch (error) {
      console.error('❌ 更新智能体工作量失败:', error.message);
      throw error;
    }
  }
  
  async updateAgentPerformance(id, performanceData) {
    try {
      const agent = await this.getAgent(id);
      const currentPerformance = agent.performance || {
        completedTasks: 0,
        successRate: 1.0,
        averageResponseTime: 3.0
      };
      
      const newPerformance = {
        ...currentPerformance,
        ...performanceData,
        updatedAt: new Date().toISOString()
      };
      
      return await this.updateAgent(id, {
        performance: newPerformance
      });
    } catch (error) {
      console.error('❌ 更新智能体性能失败:', error.message);
      throw error;
    }
  }
  
  async setAgentStatus(id, status) {
    try {
      return await this.updateAgent(id, {
        status: status
      });
    } catch (error) {
      console.error('❌ 设置智能体状态失败:', error.message);
      throw error;
    }
  }
  
  async clear() {
    try {
      const files = await fs.readdir(this.agentsDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.agentsDir, file);
          await fs.unlink(filePath);
        }
      }
      
      this.agents = [];
      console.log('✅ 智能体管理器清空完成');
      return true;
    } catch (error) {
      console.error('❌ 清空智能体管理器失败:', error.message);
      throw error;
    }
  }
  
  async getStatus() {
    try {
      const totalAgents = this.agents.length;
      const activeAgents = this.agents.filter(agent => agent.status === 'active').length;
      const inactiveAgents = this.agents.filter(agent => agent.status !== 'active').length;
      
      // 计算平均工作量
      const totalWorkload = this.agents.reduce((sum, agent) => sum + (agent.workload || 0), 0);
      const averageWorkload = totalAgents > 0 ? totalWorkload / totalAgents : 0;
      
      // 计算平均成功率
      const totalSuccessRate = this.agents.reduce((sum, agent) => {
        return sum + (agent.performance?.successRate || 1.0);
      }, 0);
      const averageSuccessRate = totalAgents > 0 ? totalSuccessRate / totalAgents : 0;
      
      return {
        totalAgents,
        activeAgents,
        inactiveAgents,
        averageWorkload,
        averageSuccessRate
      };
    } catch (error) {
      console.error('❌ 获取智能体管理器状态失败:', error.message);
      return {
        totalAgents: 0,
        activeAgents: 0,
        inactiveAgents: 0,
        averageWorkload: 0,
        averageSuccessRate: 0
      };
    }
  }
  
  async getAgentByCapability(capability) {
    try {
      return this.agents.filter(agent => {
        return agent.status === 'active' && 
               agent.capabilities && 
               agent.capabilities.includes(capability);
      });
    } catch (error) {
      console.error('❌ 按能力获取智能体失败:', error.message);
      return [];
    }
  }
}

module.exports = AgentManager;
