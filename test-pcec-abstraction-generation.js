const AbstractionGeneration = require('./pcec-abstraction-generation');
const fs = require('fs');
const path = require('path');

// 存储抽象和视角的文件路径
const ABSTRACTIONS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_abstractions.json');
const PERSPECTIVES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_perspectives.json');
const PROBLEM_CATEGORIES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_problem_categories.json');

// 测试函数
async function runTests() {
    console.log('Starting Abstraction Generation tests...');

    // 清理测试环境
    const filesToClean = [ABSTRACTIONS_FILE, PERSPECTIVES_FILE, PROBLEM_CATEGORIES_FILE];
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Cleaned up ${path.basename(file)}`);
        }
    });

    // 测试1: 从具体问题生成抽象
    console.log('\n=== Test 1: Generate Abstractions from Concrete Problems ===');
    const abstractionGen = new AbstractionGeneration();
    
    // 添加一些最近处理的问题
    const recentProblems = [
        {
            name: 'File Read Error',
            type: 'file_operation',
            features: ['file_path', 'error_handling', 'retry_logic']
        },
        {
            name: 'File Write Error',
            type: 'file_operation',
            features: ['file_path', 'content', 'error_handling', 'retry_logic']
        },
        {
            name: 'Command Execution Failure',
            type: 'command_execution',
            features: ['command', 'options', 'error_handling', 'output_processing']
        },
        {
            name: 'Command Timeout',
            type: 'command_execution',
            features: ['command', 'timeout', 'error_handling', 'output_processing']
        }
    ];
    
    recentProblems.forEach(problem => {
        abstractionGen.addRecentProblem(problem);
    });
    
    // 生成抽象
    const abstractions = abstractionGen.generateNewAbstractions();
    console.log(`Generated ${abstractions.length} abstractions`);
    
    abstractions.forEach(abstraction => {
        console.log(`- ${abstraction.name}: ${abstraction.description}`);
        console.log(`  Common features: ${abstraction.commonFeatures.join(', ')}`);
        console.log(`  Examples: ${abstraction.examples.join(', ')}`);
    });

    // 测试2: 生成新视角
    console.log('\n=== Test 2: Generate New Perspectives ===');
    const perspectives = abstractionGen.generateNewPerspectives();
    console.log(`Generated ${perspectives.length} perspectives`);
    
    perspectives.forEach(perspective => {
        console.log(`- ${perspective.name}: ${perspective.description}`);
        console.log(`  Approach: ${perspective.approach}`);
        console.log(`  Benefits: ${perspective.benefits.join(', ')}`);
    });

    // 测试3: 生成更高级的抽象
    console.log('\n=== Test 3: Generate Higher-Level Abstractions ===');
    // 添加更多问题以生成更多抽象
    const moreProblems = [
        {
            name: 'File Search Error',
            type: 'file_operation',
            features: ['pattern', 'path', 'error_handling', 'result_processing']
        },
        {
            name: 'File Delete Error',
            type: 'file_operation',
            features: ['file_path', 'error_handling', 'permission_check']
        }
    ];
    
    moreProblems.forEach(problem => {
        abstractionGen.addRecentProblem(problem);
    });
    
    // 生成更多抽象
    const moreAbstractions = abstractionGen.generateNewAbstractions();
    console.log(`Generated ${moreAbstractions.length} more abstractions`);
    
    moreAbstractions.forEach(abstraction => {
        console.log(`- ${abstraction.name}: ${abstraction.description}`);
    });

    // 测试4: 获取所有抽象和视角
    console.log('\n=== Test 4: Get All Abstractions and Perspectives ===');
    const allAbstractions = abstractionGen.getAllAbstractions();
    const allPerspectives = abstractionGen.getAllPerspectives();
    
    console.log(`Total abstractions: ${allAbstractions.length}`);
    console.log(`Total perspectives: ${allPerspectives.length}`);

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