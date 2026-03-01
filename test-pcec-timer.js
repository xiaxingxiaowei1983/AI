const PCECTimer = require('./pcec-timer');
const fs = require('fs');
const path = require('path');

// 存储上次执行时间的文件路径
const LAST_EXECUTION_FILE = path.join(__dirname, '.trae', 'data', 'pcec_last_execution.json');

// 测试类，重写onPCECTrigger方法
class TestPCECTimer extends PCECTimer {
    constructor() {
        super();
        this.executionCount = 0;
    }

    onPCECTrigger() {
        this.executionCount++;
        console.log(`PCEC executed ${this.executionCount} times at ${new Date().toISOString()}`);
    }
}

// 测试函数
async function runTests() {
    console.log('Starting PCEC Timer tests...');

    // 清理测试环境
    if (fs.existsSync(LAST_EXECUTION_FILE)) {
        fs.unlinkSync(LAST_EXECUTION_FILE);
        console.log('Cleaned up previous execution file');
    }

    // 测试1: 基本定时功能
    console.log('\n=== Test 1: Basic Timer Functionality ===');
    const timer1 = new TestPCECTimer();
    
    // 手动触发一次执行
    timer1.executePCEC();
    console.log(`Execution count after manual trigger: ${timer1.executionCount}`);
    
    // 验证执行时间是否被保存
    if (fs.existsSync(LAST_EXECUTION_FILE)) {
        const data = fs.readFileSync(LAST_EXECUTION_FILE, 'utf8');
        const parsed = JSON.parse(data);
        console.log(`Last execution time saved: ${new Date(parsed.lastExecutionTime).toISOString()}`);
    } else {
        console.error('Last execution time not saved!');
    }

    // 测试2: 忙碌状态延迟执行
    console.log('\n=== Test 2: Busy State Handling ===');
    const timer2 = new TestPCECTimer();
    
    // 设置为忙碌状态
    timer2.setBusy(true);
    console.log(`Timer busy state: ${timer2.isBusy}`);
    
    // 尝试执行
    timer2.executePCEC();
    console.log(`Execution count after busy execute: ${timer2.executionCount}`);
    console.log(`Pending execution: ${timer2.pendingExecution}`);
    
    // 设置为空闲状态
    timer2.setBusy(false);
    console.log(`Timer busy state: ${timer2.isBusy}`);
    console.log(`Execution count after becoming idle: ${timer2.executionCount}`);

    // 测试3: 系统重启后恢复
    console.log('\n=== Test 3: System Restart Recovery ===');
    
    // 模拟系统重启，创建一个新的定时器实例
    const timer3 = new TestPCECTimer();
    console.log(`Last execution time loaded: ${timer3.lastExecutionTime ? new Date(timer3.lastExecutionTime).toISOString() : 'None'}`);
    console.log(`Next execution time: ${new Date(timer3.nextExecutionTime).toISOString()}`);

    // 清理测试环境
    if (fs.existsSync(LAST_EXECUTION_FILE)) {
        fs.unlinkSync(LAST_EXECUTION_FILE);
        console.log('\nCleaned up test files');
    }

    console.log('\nAll tests completed!');
}

// 运行测试
runTests().catch(console.error);