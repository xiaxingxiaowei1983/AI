const MindExplosion = require('./pcec-mind-explosion');
const fs = require('fs');
const path = require('path');

// 存储思维爆炸记录的文件路径
const MIND_EXPLOSION_FILE = path.join(__dirname, '.trae', 'data', 'pcec_mind_explosions.json');
const EXPLOSION_RESULTS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_explosion_results.json');

// 测试函数
async function runTests() {
    console.log('Starting Mind Explosion tests...');

    // 清理测试环境
    const filesToClean = [MIND_EXPLOSION_FILE, EXPLOSION_RESULTS_FILE];
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Cleaned up ${path.basename(file)}`);
        }
    });

    // 测试1: 触发思维爆炸
    console.log('\n=== Test 1: Trigger Mind Explosion ===');
    const mindExplosion = new MindExplosion();
    
    // 触发多次思维爆炸
    const explosionResults = [];
    for (let i = 0; i < 4; i++) {
        console.log(`\nTriggering explosion ${i + 1}...`);
        const result = mindExplosion.triggerMindExplosion();
        explosionResults.push(result);
        
        console.log(`Explosion type: ${result.explosionType}`);
        console.log(`Evolution directions: ${result.evolutionDirections.length}`);
        
        result.evolutionDirections.forEach(direction => {
            console.log(`  - ${direction.type}: ${direction.description} (Priority: ${direction.priority.toFixed(2)})`);
        });
    }

    // 测试2: 评估思维爆炸结果
    console.log('\n=== Test 2: Evaluate Explosion Results ===');
    explosionResults.forEach((result, index) => {
        const score = mindExplosion.evaluateExplosionResult(result.result);
        console.log(`Explosion ${index + 1} score: ${score.toFixed(2)}`);
    });

    // 测试3: 获取所有思维爆炸记录
    console.log('\n=== Test 3: Get All Mind Explosions ===');
    const allExplosions = mindExplosion.getAllMindExplosions();
    console.log(`Total mind explosions recorded: ${allExplosions.length}`);
    
    allExplosions.forEach((explosion, index) => {
        console.log(`Explosion ${index + 1}: ${explosion.type}`);
    });

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