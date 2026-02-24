// 任务跟踪器模块

const fs = require('fs').promises;
const path = require('path');

class TaskTracker {
  constructor(config) {
    this.config = config;
    this.tasksDir = path.join(config.dataDir || './data', 'tasks');
    this.tasks = [];
  }
  
  async init() {
    console.log('🔧 初始化任务跟踪器...');
    
    // 创建任务目录
    try {
      await fs.mkdir(this.tasksDir, { recursive: true });
    } catch (error) {
      console.error('❌ 创建任务目录失败:', error.message);
    }
    
    // 加载现有任务
    await this.loadTasks();
    
    console.log(`✅ 任务跟踪器初始化完成，加载了 ${this.tasks.length} 个任务`);
  }
  
  async loadTasks() {
    try {
      const files = await fs.readdir(this.tasksDir);
      this.tasks = [];
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.tasksDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          const task = JSON.parse(content);
          this.tasks.push(task);
        }
      }
    } catch (error) {
      console.error('❌ 加载任务失败:', error.message);
      this.tasks = [];
    }
  }
  
  async createTask(taskData) {
    try {
      // 生成任务ID
      const id = taskData.id || `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const taskWithId = {
        ...taskData,
        id,
        status: taskData.status || 'created',
        createdAt: taskData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      // 保存任务文件
      const filePath = path.join(this.tasksDir, `${id}.json`);
      await fs.writeFile(filePath, JSON.stringify(taskWithId, null, 2));
      
      // 更新内存中的任务
      this.tasks.push(taskWithId);
      
      console.log(`✅ 任务创建成功: ${id}`);
      return taskWithId;
    } catch (error) {
      console.error('❌ 创建任务失败:', error.message);
      throw error;
    }
  }
  
  async getTask(id) {
    try {
      const task = this.tasks.find(t => t.id === id);
      if (!task) {
        throw new Error(`任务不存在: ${id}`);
      }
      return task;
    } catch (error) {
      console.error('❌ 获取任务失败:', error.message);
      throw error;
    }
  }
  
  async updateTask(id, updates) {
    try {
      const index = this.tasks.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error(`任务不存在: ${id}`);
      }
      
      const taskToUpdate = {
        ...this.tasks[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      
      // 保存更新后的任务
      const filePath = path.join(this.tasksDir, `${id}.json`);
      await fs.writeFile(filePath, JSON.stringify(taskToUpdate, null, 2));
      
      // 更新内存中的任务
      this.tasks[index] = taskToUpdate;
      
      console.log(`✅ 任务更新成功: ${id}`);
      return taskToUpdate;
    } catch (error) {
      console.error('❌ 更新任务失败:', error.message);
      throw error;
    }
  }
  
  async deleteTask(id) {
    try {
      const index = this.tasks.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error(`任务不存在: ${id}`);
      }
      
      // 删除任务文件
      const filePath = path.join(this.tasksDir, `${id}.json`);
      await fs.unlink(filePath);
      
      // 从内存中删除任务
      this.tasks.splice(index, 1);
      
      console.log(`✅ 任务删除成功: ${id}`);
      return true;
    } catch (error) {
      console.error('❌ 删除任务失败:', error.message);
      throw error;
    }
  }
  
  async listTasks(filters = {}) {
    try {
      let filteredTasks = this.tasks;
      
      // 按状态过滤
      if (filters.status) {
        filteredTasks = filteredTasks.filter(task => task.status === filters.status);
      }
      
      // 按智能体过滤
      if (filters.assignedTo) {
        filteredTasks = filteredTasks.filter(task => task.assignedTo === filters.assignedTo);
      }
      
      // 按类型过滤
      if (filters.type) {
        filteredTasks = filteredTasks.filter(task => 
          task.analysis && task.analysis.type === filters.type
        );
      }
      
      // 按优先级过滤
      if (filters.priority) {
        filteredTasks = filteredTasks.filter(task => 
          task.priority === filters.priority || 
          (task.analysis && task.analysis.priority === filters.priority)
        );
      }
      
      // 按时间范围过滤
      if (filters.startDate) {
        const startDate = new Date(filters.startDate);
        filteredTasks = filteredTasks.filter(task => 
          new Date(task.createdAt) >= startDate
        );
      }
      
      if (filters.endDate) {
        const endDate = new Date(filters.endDate);
        filteredTasks = filteredTasks.filter(task => 
          new Date(task.createdAt) <= endDate
        );
      }
      
      // 排序
      if (filters.sortBy) {
        filteredTasks.sort((a, b) => {
          if (filters.sortBy === 'createdAt') {
            return new Date(b.createdAt) - new Date(a.createdAt);
          } else if (filters.sortBy === 'updatedAt') {
            return new Date(b.updatedAt) - new Date(a.updatedAt);
          } else if (filters.sortBy === 'priority') {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            const priorityA = priorityOrder[a.priority || (a.analysis && a.analysis.priority) || 'medium'] || 2;
            const priorityB = priorityOrder[b.priority || (b.analysis && b.analysis.priority) || 'medium'] || 2;
            return priorityB - priorityA;
          }
          return 0;
        });
      }
      
      return filteredTasks;
    } catch (error) {
      console.error('❌ 列出任务失败:', error.message);
      return [];
    }
  }
  
  async clear() {
    try {
      const files = await fs.readdir(this.tasksDir);
      
      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.tasksDir, file);
          await fs.unlink(filePath);
        }
      }
      
      this.tasks = [];
      console.log('✅ 任务跟踪器清空完成');
      return true;
    } catch (error) {
      console.error('❌ 清空任务跟踪器失败:', error.message);
      throw error;
    }
  }
  
  async getStatus() {
    try {
      const totalTasks = this.tasks.length;
      const statusCounts = this.tasks.reduce((acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      }, {});
      
      const pendingTasks = statusCounts.created || 0 + statusCounts.assigned || 0;
      const completedTasks = statusCounts.completed || 0;
      const failedTasks = statusCounts.failed || 0;
      
      // 计算平均任务执行时间
      let totalExecutionTime = 0;
      let executedTasks = 0;
      
      for (const task of this.tasks) {
        if (task.completedAt && task.assignedAt) {
          const executionTime = new Date(task.completedAt) - new Date(task.assignedAt);
          totalExecutionTime += executionTime;
          executedTasks++;
        }
      }
      
      const averageExecutionTime = executedTasks > 0 ? totalExecutionTime / executedTasks : 0;
      
      return {
        totalTasks,
        pendingTasks,
        completedTasks,
        failedTasks,
        statusCounts,
        averageExecutionTime
      };
    } catch (error) {
      console.error('❌ 获取任务跟踪器状态失败:', error.message);
      return {
        totalTasks: 0,
        pendingTasks: 0,
        completedTasks: 0,
        failedTasks: 0,
        statusCounts: {},
        averageExecutionTime: 0
      };
    }
  }
  
  async getTaskStats() {
    try {
      const stats = {
        byStatus: {},
        byType: {},
        byPriority: {},
        byAgent: {}
      };
      
      // 按状态统计
      for (const task of this.tasks) {
        stats.byStatus[task.status] = (stats.byStatus[task.status] || 0) + 1;
        
        // 按类型统计
        if (task.analysis && task.analysis.type) {
          stats.byType[task.analysis.type] = (stats.byType[task.analysis.type] || 0) + 1;
        }
        
        // 按优先级统计
        const priority = task.priority || (task.analysis && task.analysis.priority);
        if (priority) {
          stats.byPriority[priority] = (stats.byPriority[priority] || 0) + 1;
        }
        
        // 按智能体统计
        if (task.assignedTo) {
          stats.byAgent[task.assignedTo] = (stats.byAgent[task.assignedTo] || 0) + 1;
        }
      }
      
      return stats;
    } catch (error) {
      console.error('❌ 获取任务统计失败:', error.message);
      return {
        byStatus: {},
        byType: {},
        byPriority: {},
        byAgent: {}
      };
    }
  }
  
  async getOverdueTasks() {
    try {
      const now = new Date();
      const overdueTasks = this.tasks.filter(task => {
        // 检查任务是否已过期
        if (task.deadline) {
          const deadline = new Date(task.deadline);
          return deadline < now && task.status !== 'completed' && task.status !== 'failed';
        }
        return false;
      });
      
      return overdueTasks;
    } catch (error) {
      console.error('❌ 获取过期任务失败:', error.message);
      return [];
    }
  }
  
  async getTasksByAgent(agentId) {
    try {
      return this.tasks.filter(task => task.assignedTo === agentId);
    } catch (error) {
      console.error('❌ 按智能体获取任务失败:', error.message);
      return [];
    }
  }
  
  async getTasksByType(taskType) {
    try {
      return this.tasks.filter(task => 
        task.analysis && task.analysis.type === taskType
      );
    } catch (error) {
      console.error('❌ 按类型获取任务失败:', error.message);
      return [];
    }
  }
}

module.exports = TaskTracker;
