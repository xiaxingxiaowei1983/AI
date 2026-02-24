class EvolutionScheduler {
  constructor(config, evolutionSystem) {
    this.config = config;
    this.evolutionSystem = evolutionSystem;
    this.timers = [];
    this.isRunning = false;
  }

  start() {
    this.isRunning = true;
    this.log('info', '进化调度系统启动');
    
    // 启动定期检查
    this.startPeriodicChecks();
    
    // 启动空闲检测
    this.startIdleChecks();
  }

  stop() {
    this.isRunning = false;
    this.clearTimers();
    this.log('info', '进化调度系统停止');
  }

  startPeriodicChecks() {
    // 每10分钟检查一次系统状态
    const periodicTimer = setInterval(async () => {
      if (!this.isRunning) return;
      
      try {
        await this.checkSystemStatus();
      } catch (error) {
        this.log('error', `定期检查失败: ${error.message}`);
      }
    }, 10 * 60 * 1000);
    
    this.timers.push(periodicTimer);
  }

  startIdleChecks() {
    // 每30秒检查一次空闲状态
    const idleTimer = setInterval(async () => {
      if (!this.isRunning) return;
      
      try {
        await this.checkIdleStatus();
      } catch (error) {
        this.log('error', `空闲检查失败: ${error.message}`);
      }
    }, 30 * 1000);
    
    this.timers.push(idleTimer);
  }

  async checkSystemStatus() {
    this.log('info', '执行系统状态检查');
    
    // 检查进化系统状态
    if (this.evolutionSystem.state.isRunning) {
      const uptime = Date.now() - this.evolutionSystem.state.lastActivity;
      this.log('info', `系统运行中，上次活动: ${Math.floor(uptime / 1000)}秒前`);
    }
    
    // 检查任务状态
    if (this.evolutionSystem.state.currentTask) {
      this.log('info', `当前处理任务: ${this.evolutionSystem.state.currentTask.title}`);
    }
  }

  async checkIdleStatus() {
    // 检查是否空闲
    if (this.evolutionSystem.isIdle()) {
      this.log('info', '检测到系统空闲，准备触发进化');
      
      // 触发进化
      if (this.evolutionSystem.state.isRunning) {
        await this.evolutionSystem.triggerEvolution();
      }
    }
  }

  scheduleTask(task, delay = 0) {
    if (!this.isRunning) return null;
    
    const timer = setTimeout(async () => {
      try {
        await this.evolutionSystem.processTask(task);
      } catch (error) {
        this.log('error', `调度任务执行失败: ${error.message}`);
      }
    }, delay);
    
    this.timers.push(timer);
    return timer;
  }

  clearTimers() {
    this.timers.forEach(timer => clearTimeout(timer));
    this.timers = [];
  }

  log(level, message) {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${level.toUpperCase()}] [EvolutionScheduler] ${message}`);
  }
}

module.exports = EvolutionScheduler;