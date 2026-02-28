const fs = require('fs');
const path = require('path');

// 导入PCEC系统模块
const PCECTimer = require('./pcec-timer');
const PCECCore = require('./pcec-core');
const PCECFeatureIdentification = require('./pcec-feature-identification');
const PCECAbstractionGeneration = require('./pcec-abstraction-generation');
const PCECLeverIdentification = require('./pcec-lever-identification');
const PCECMindExplosion = require('./pcec-mind-explosion');
const PCECProductManagement = require('./pcec-product-management');
const PCECReporting = require('./pcec-reporting');
const PCECUltimateConstraint = require('./pcec-ultimate-constraint');
const PCECSystem = require('./pcec-system');

// 测试结果
const testResults = {
    total: 0,
    passed: 0,
    failed: 0,
    tests: []
};

// 测试函数
function runTest(testName, testFunction) {
    testResults.total++;
    console.log(`\nRunning test: ${testName}`);
    
    try {
        testFunction();
        console.log(`✅ Test passed: ${testName}`);
        testResults.passed++;
        testResults.tests.push({ name: testName, status: 'passed' });
    } catch (error) {
        console.error(`❌ Test failed: ${testName}`);
        console.error(error.message);
        testResults.failed++;
        testResults.tests.push({ name: testName, status: 'failed', error: error.message });
    }
}

// 清理测试数据
function cleanupTestData() {
    const dataDir = path.join(__dirname, '.trae', 'data');
    if (fs.existsSync(dataDir)) {
        const files = fs.readdirSync(dataDir);
        files.forEach(file => {
            if (file.startsWith('pcec_')) {
                const filePath = path.join(dataDir, file);
                fs.unlinkSync(filePath);
            }
        });
    }
}

// 运行所有测试
function runAllTests() {
    console.log('🚀 Starting PCEC System Tests...');
    
    // 清理测试数据
    cleanupTestData();
    
    // 测试PCECTimer
    runTest('PCECTimer - Basic functionality', testPCECTimer);
    
    // 测试PCECFeatureIdentification
    runTest('PCECFeatureIdentification - Identify new features', testPCECFeatureIdentification);
    
    // 测试PCECAbstractionGeneration
    runTest('PCECAbstractionGeneration - Generate abstractions', testPCECAbstractionGeneration);
    
    // 测试PCECLeverIdentification
    runTest('PCECLeverIdentification - Identify levers', testPCECLeverIdentification);
    
    // 测试PCECMindExplosion
    runTest('PCECMindExplosion - Perform mind explosion', testPCECMindExplosion);
    
    // 测试PCECProductManagement
    runTest('PCECProductManagement - Generate evolution products', testPCECProductManagement);
    
    // 测试PCECReporting
    runTest('PCECReporting - Generate and send report', testPCECReporting);
    
    // 测试PCECUltimateConstraint
    runTest('PCECUltimateConstraint - Check ultimate constraint', testPCECUltimateConstraint);
    
    // 测试PCECSystem
    runTest('PCECSystem - Integration test', testPCECSystem);
    
    // 输出测试结果
    console.log('\n📊 Test Results:');
    console.log(`Total tests: ${testResults.total}`);
    console.log(`Passed: ${testResults.passed}`);
    console.log(`Failed: ${testResults.failed}`);
    
    if (testResults.failed > 0) {
        console.log('\n❌ Failed tests:');
        testResults.tests.forEach(test => {
            if (test.status === 'failed') {
                console.log(`- ${test.name}: ${test.error}`);
            }
        });
    } else {
        console.log('\n✅ All tests passed!');
    }
}

// 测试PCECTimer
function testPCECTimer() {
    const timer = new PCECTimer();
    
    // 测试初始化
    if (!timer) {
        throw new Error('Failed to initialize PCECTimer');
    }
    
    // 测试计算下一次执行时间
    const nextExecutionTime = timer.calculateNextExecutionTime();
    if (!nextExecutionTime || nextExecutionTime < Date.now()) {
        throw new Error('Failed to calculate next execution time');
    }
    
    // 测试设置忙碌状态
    timer.setBusy(true);
    if (!timer.isBusy) {
        throw new Error('Failed to set busy status');
    }
    
    timer.setBusy(false);
    if (timer.isBusy) {
        throw new Error('Failed to clear busy status');
    }
    
    console.log('PCECTimer tests passed');
}

// 测试PCECFeatureIdentification
function testPCECFeatureIdentification() {
    const featureIdentification = new PCECFeatureIdentification();
    
    // 测试添加能力
    const capability = featureIdentification.addCapability({
        name: 'Test Capability',
        description: 'Test capability for feature identification',
        type: 'test',
        inputs: ['input1'],
        outputs: ['output1']
    });
    
    if (!capability || !capability.id) {
        throw new Error('Failed to add capability');
    }
    
    // 测试识别新功能
    const newFeatures = featureIdentification.identifyNewFeatures();
    if (!Array.isArray(newFeatures)) {
        throw new Error('Failed to identify new features');
    }
    
    console.log('PCECFeatureIdentification tests passed');
}

// 测试PCECAbstractionGeneration
function testPCECAbstractionGeneration() {
    const abstractionGeneration = new PCECAbstractionGeneration();
    
    // 测试生成抽象
    const recentProblems = [{
        id: 'problem_1',
        inputs: ['file', 'data'],
        outputs: ['processed_file', 'analysis'],
        constraints: ['time_limit'],
        goals: ['accuracy', 'speed'],
        context: 'Test context'
    }];
    
    const abstractions = abstractionGeneration.generateAbstractions(recentProblems);
    if (!Array.isArray(abstractions) || abstractions.length === 0) {
        throw new Error('Failed to generate abstractions');
    }
    
    // 测试生成视角
    const recentBehaviors = [{
        id: 'behavior_1',
        action: 'test_action',
        context: 'test_context',
        outcome: 'success'
    }];
    
    const perspectives = abstractionGeneration.generatePerspectives(recentBehaviors);
    if (!Array.isArray(perspectives) || perspectives.length === 0) {
        throw new Error('Failed to generate perspectives');
    }
    
    console.log('PCECAbstractionGeneration tests passed');
}

// 测试PCECLeverIdentification
function testPCECLeverIdentification() {
    const leverIdentification = new PCECLeverIdentification();
    
    // 测试识别杠杆
    const currentProcesses = [{
        id: 'process_1',
        name: 'Test Process',
        steps: [
            { name: 'Step 1' },
            { name: 'Step 2' },
            { name: 'Step 3' },
            { name: 'Step 4' }
        ],
        toolCalls: [
            { name: 'Tool 1' },
            { name: 'Tool 2' },
            { name: 'Tool 3' }
        ]
    }];
    
    const levers = leverIdentification.identifyLevers(currentProcesses);
    if (!Array.isArray(levers) || levers.length === 0) {
        throw new Error('Failed to identify levers');
    }
    
    // 测试应用杠杆
    if (levers.length > 0) {
        const appliedLever = leverIdentification.applyLever(levers[0].id);
        if (!appliedLever || appliedLever.status !== 'applied') {
            throw new Error('Failed to apply lever');
        }
    }
    
    console.log('PCECLeverIdentification tests passed');
}

// 测试PCECMindExplosion
function testPCECMindExplosion() {
    const mindExplosion = new PCECMindExplosion();
    
    // 测试执行思维爆炸
    const explosionResult = mindExplosion.performMindExplosion();
    if (!explosionResult || !explosionResult.id || !explosionResult.insights) {
        throw new Error('Failed to perform mind explosion');
    }
    
    if (!Array.isArray(explosionResult.insights) || explosionResult.insights.length === 0) {
        throw new Error('Failed to generate insights');
    }
    
    // 测试评估思维爆炸
    const evaluation = mindExplosion.evaluateMindExplosion(explosionResult.id);
    if (!evaluation || typeof evaluation.overallScore !== 'number') {
        throw new Error('Failed to evaluate mind explosion');
    }
    
    console.log('PCECMindExplosion tests passed');
}

// 测试PCECProductManagement
function testPCECProductManagement() {
    const productManagement = new PCECProductManagement();
    
    // 测试生成进化产物
    const evolutionResult = {
        success: true,
        result: {
            type: 'new_feature',
            feature: {
                name: 'Test Feature',
                description: 'Test feature for product management',
                inputs: ['input1', 'input2'],
                outputs: ['output1', 'output2']
            }
        }
    };
    
    const products = productManagement.generateEvolutionProducts(evolutionResult);
    if (!Array.isArray(products) || products.length === 0) {
        throw new Error('Failed to generate evolution products');
    }
    
    console.log('PCECProductManagement tests passed');
}

// 测试PCECReporting
function testPCECReporting() {
    const reporting = new PCECReporting();
    
    // 测试生成报告
    const evolutionResult = {
        cycle: 1,
        direction: { type: 'new_feature' },
        result: { feature: { name: 'Test Feature' } },
        isSignificant: true
    };
    
    const mindExplosionResult = {
        question: 'Test question',
        insights: ['Test insight 1', 'Test insight 2']
    };
    
    const products = [{
        id: 'product_1',
        name: 'Test Product',
        inputs: ['input1'],
        outputs: ['output1']
    }];
    
    const report = reporting.generateReport(evolutionResult, mindExplosionResult, products);
    if (!report || !report.id) {
        throw new Error('Failed to generate report');
    }
    
    // 测试发送报告
    const sentReport = reporting.sendReport(report.id);
    if (!sentReport || sentReport.status !== 'sent') {
        throw new Error('Failed to send report');
    }
    
    console.log('PCECReporting tests passed');
}

// 测试PCECUltimateConstraint
function testPCECUltimateConstraint() {
    const ultimateConstraint = new PCECUltimateConstraint();
    
    // 测试检查终极约束（有显著进化）
    const significantEvolution = { isSignificant: true };
    ultimateConstraint.checkUltimateConstraint(significantEvolution);
    if (ultimateConstraint.noEvolutionCount !== 0) {
        throw new Error('Failed to reset no-evolution count for significant evolution');
    }
    
    // 测试检查终极约束（无显著进化）
    const noEvolution = { isSignificant: false };
    ultimateConstraint.checkUltimateConstraint(noEvolution);
    if (ultimateConstraint.noEvolutionCount !== 1) {
        throw new Error('Failed to increment no-evolution count');
    }
    
    console.log('PCECUltimateConstraint tests passed');
}

// 测试PCECSystem
function testPCECSystem() {
    const pcecSystem = new PCECSystem();
    
    // 测试系统初始化
    if (!pcecSystem) {
        throw new Error('Failed to initialize PCECSystem');
    }
    
    // 测试获取系统状态
    const status = pcecSystem.getStatus();
    if (!status || typeof status.cycleCount !== 'number') {
        throw new Error('Failed to get system status');
    }
    
    // 测试设置系统状态
    pcecSystem.setIdle(true);
    if (!pcecSystem.isIdle) {
        throw new Error('Failed to set system idle status');
    }
    
    console.log('PCECSystem tests passed');
}

// 运行测试
if (require.main === module) {
    runAllTests();
}

module.exports = { runAllTests };