const fs = require('fs');
const path = require('path');

// 存储上次执行时间的文件路径
const LAST_EXECUTION_FILE = path.join(__dirname, '.trae', 'data', 'pcec_last_execution.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '.trae', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class PCECTimer {
    constructor() {
        this.isBusy = false;
        this.pendingExecution = false;
        this.lastExecutionTime = this.loadLastExecutionTime();
        this.nextExecutionTime = this.calculateNextExecutionTime();
        this.timerId = null;
    }

    // 加载上次执行时间
    loadLastExecutionTime() {
        try {
            if (fs.existsSync(LAST_EXECUTION_FILE)) {
                const data = fs.readFileSync(LAST_EXECUTION_FILE, 'utf8');
                const parsed = JSON.parse(data);
                return parsed.lastExecutionTime || 0;
            }
        } catch (error) {
            console.error('Error loading last execution time:', error);
        }
        return 0;
    }

    // 保存上次执行时间
    saveLastExecutionTime(time) {
        try {
            const data = { lastExecutionTime: time };
            fs.writeFileSync(LAST_EXECUTION_FILE, JSON.stringify(data, null, 2));
        } catch (error) {
            console.error('Error saving last execution time:', error);
        }
    }

    // 计算下一次执行时间
    calculateNextExecutionTime() {
        if (this.lastExecutionTime === 0) {
            // 首次执行，从现在开始计算
            return Date.now() + 60 * 60 * 1000; // 1小时后
        }
        // 基于上次执行时间计算
        return this.lastExecutionTime + 60 * 60 * 1000; // 1小时后
    }

    // 开始定时任务
    start() {
        console.log('PCEC Timer started');
        this.scheduleNextExecution();
    }

    // 安排下一次执行
    scheduleNextExecution() {
        const now = Date.now();
        const timeUntilNextExecution = this.nextExecutionTime - now;

        if (timeUntilNextExecution <= 0) {
            // 已经过了执行时间，立即执行
            this.executePCEC();
        } else {
            // 安排到下一次执行时间
            console.log(`Scheduling next PCEC execution in ${Math.round(timeUntilNextExecution / 1000)} seconds`);
            this.timerId = setTimeout(() => {
                this.executePCEC();
            }, timeUntilNextExecution);
        }
    }

    // 执行PCEC任务
    executePCEC() {
        if (this.isBusy) {
            // 系统忙碌，标记为待执行
            console.log('System is busy, scheduling PCEC for later');
            this.pendingExecution = true;
            return;
        }

        console.log('Executing PCEC task');
        
        // 记录执行时间
        const executionTime = Date.now();
        this.lastExecutionTime = executionTime;
        this.saveLastExecutionTime(executionTime);
        
        // 计算下一次执行时间
        this.nextExecutionTime = this.calculateNextExecutionTime();
        
        // 触发PCEC执行
        this.onPCECTrigger();
        
        // 安排下一次执行
        this.scheduleNextExecution();
    }

    // 设置系统忙碌状态
    setBusy(isBusy) {
        this.isBusy = isBusy;
        if (!isBusy && this.pendingExecution) {
            // 系统变为空闲且有待执行任务
            console.log('System is now idle, executing pending PCEC');
            this.pendingExecution = false;
            this.executePCEC();
        }
    }

    // PCEC触发回调（需要在外部实现）
    onPCECTrigger() {
        // 默认实现，子类需要重写
        console.log('PCEC triggered (default implementation)');
    }

    // 停止定时任务
    stop() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            this.timerId = null;
        }
        console.log('PCEC Timer stopped');
    }
}

// 导出模块
module.exports = PCECTimer;