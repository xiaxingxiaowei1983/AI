const PCECCore = require('./pcec-core');
const fs = require('fs');
const path = require('path');

// 存储进化产物和历史的文件路径
const EVOLUTION_PRODUCTS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_evolution_products.json');
const EVOLUTION_HISTORY_FILE = path.join(__dirname, '.trae', 'data', 'pcec_evolution_history.json');
const LAST_EXECUTION_FILE = path.join(__dirname, '.trae', 'data', 'pcec_last_execution.json');

// 测试函数
async function runTests() {
    console.log('Starting PCEC Core tests...');

    // 清理测试环境
    const filesToClean = [EVOLUTION_PRODUCTS_FILE, EVOLUTION_HISTORY_FILE, LAST_EXECUTION_FILE];
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Cleaned up ${path.basename(file)}`);
        }
    });

    // 测试1: 基本进化功能
    console.log('\n=== Test 1: Basic Evolution Functionality ===');
    const pcecCore = new PCECCore();
    
    // 手动触发一次PCEC执行
    pcecCore.onPCECTrigger();
    console.log(`Evolution cycles completed: ${pcecCore.evolutionCycles}`);
    
    // 验证进化产物是否生成
    if (fs.existsSync(EVOLUTION_PRODUCTS_FILE)) {
        const productsData = fs.readFileSync(EVOLUTION_PRODUCTS_FILE, 'utf8');
        const products = JSON.parse(productsData);
        console.log(`Evolution products generated: ${Object.keys(products).length}`);
        console.log(`Capability shapes: ${products.capabilityShapes.length}`);
        console.log(`Default strategies: ${products.defaultStrategies.length}`);
        console.log(`Behavior rules: ${products.behaviorRules.length}`);
    } else {
        console.error('Evolution products not generated!');
    }

    // 测试2: 进化历史记录
    console.log('\n=== Test 2: Evolution History ===');
    if (fs.existsSync(EVOLUTION_HISTORY_FILE)) {
        const historyData = fs.readFileSync(EVOLUTION_HISTORY_FILE, 'utf8');
        const history = JSON.parse(historyData);
        console.log(`Evolution history entries: ${history.length}`);
        if (history.length > 0) {
            console.log(`Last evolution cycle: ${history[history.length - 1].cycle}`);
            console.log(`Last evolution timestamp: ${new Date(history[history.length - 1].timestamp).toISOString()}`);
            console.log(`Last evolution direction: ${history[history.length - 1].direction.type}`);
        }
    } else {
        console.error('Evolution history not recorded!');
    }

    // 测试3: 多次进化执行
    console.log('\n=== Test 3: Multiple Evolution Cycles ===');
    // 执行多次进化
    for (let i = 0; i < 3; i++) {
        console.log(`\nExecuting evolution cycle ${i + 2}...`);
        pcecCore.onPCECTrigger();
    }
    console.log(`Total evolution cycles completed: ${pcecCore.evolutionCycles}`);
    
    // 验证进化产物数量是否增加
    if (fs.existsSync(EVOLUTION_PRODUCTS_FILE)) {
        const productsData = fs.readFileSync(EVOLUTION_PRODUCTS_FILE, 'utf8');
        const products = JSON.parse(productsData);
        console.log(`\nFinal evolution products:`);
        console.log(`Capability shapes: ${products.capabilityShapes.length}`);
        console.log(`Default strategies: ${products.defaultStrategies.length}`);
        console.log(`Behavior rules: ${products.behaviorRules.length}`);
    }

    // 清理测试环境
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
        }
    });

    console.log('\nAll tests completed!');
}

// 运行测试
runTests().catch(console.error);