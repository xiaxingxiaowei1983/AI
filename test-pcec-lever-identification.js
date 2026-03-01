const LeverIdentification = require('./pcec-lever-identification');
const fs = require('fs');
const path = require('path');

// 存储杠杆和结构性改动的文件路径
const LEVERS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_levers.json');
const STRUCTURAL_CHANGES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_structural_changes.json');
const LEVER_FEEDBACK_FILE = path.join(__dirname, '.trae', 'data', 'pcec_lever_feedback.json');

// 测试函数
async function runTests() {
    console.log('Starting Lever Identification tests...');

    // 清理测试环境
    const filesToClean = [LEVERS_FILE, STRUCTURAL_CHANGES_FILE, LEVER_FEEDBACK_FILE];
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Cleaned up ${path.basename(file)}`);
        }
    });

    // 测试1: 识别新杠杆
    console.log('\n=== Test 1: Identify New Levers ===');
    const leverId = new LeverIdentification();
    
    // 添加一些最近的操作
    const recentOperations = [
        {
            name: 'Read File 1',
            type: 'file_read',
            executionTime: 500
        },
        {
            name: 'Read File 2',
            type: 'file_read',
            executionTime: 600
        },
        {
            name: 'Read File 3',
            type: 'file_read',
            executionTime: 450
        },
        {
            name: 'Read File 4',
            type: 'file_read',
            executionTime: 550
        },
        {
            name: 'Read File 5',
            type: 'file_read',
            executionTime: 520
        },
        {
            name: 'Write File 1',
            type: 'file_write',
            executionTime: 800
        },
        {
            name: 'Write File 2',
            type: 'file_write',
            executionTime: 850
        },
        {
            name: 'Execute Command 1',
            type: 'command_execution',
            executionTime: 1200 // 瓶颈操作
        },
        {
            name: 'Execute Command 2',
            type: 'command_execution',
            executionTime: 1300 // 瓶颈操作
        }
    ];
    
    recentOperations.forEach(operation => {
        leverId.addRecentOperation(operation);
    });
    
    // 识别新杠杆
    const newLevers = leverId.identifyNewLevers();
    console.log(`Identified ${newLevers.length} new levers`);
    
    newLevers.forEach(lever => {
        console.log(`- ${lever.name}: ${lever.description}`);
        console.log(`  Type: ${lever.type}`);
        console.log(`  Target Operation: ${lever.targetOperation}`);
        console.log(`  Expected Benefits: ${lever.expectedBenefits.join(', ')}`);
        console.log(`  Estimated Impact: ${lever.estimatedImpact.toFixed(2)}`);
        console.log(`  Actual Impact: ${lever.actualImpact.toFixed(2)}`);
        console.log(`  Cost-Benefit Ratio: ${lever.costBenefitRatio.toFixed(2)}`);
    });

    // 测试2: 应用杠杆
    console.log('\n=== Test 2: Apply Levers ===');
    if (newLevers.length > 0) {
        const leverToApply = newLevers[0];
        console.log(`Applying lever: ${leverToApply.name}`);
        
        const applicationResult = leverId.applyLever(leverToApply.id);
        console.log(`Application result: ${applicationResult.success ? 'SUCCESS' : 'FAILED'}`);
        console.log(`Impact: ${applicationResult.impact.toFixed(2)}`);
        
        // 获取杠杆反馈
        const feedback = leverId.getLeverFeedback(leverToApply.id);
        console.log(`Feedback received: ${feedback.length} entries`);
    }

    // 测试3: 获取所有杠杆和结构性改动
    console.log('\n=== Test 3: Get All Levers and Structural Changes ===');
    const allLevers = leverId.getAllLevers();
    const allStructuralChanges = leverId.getAllStructuralChanges();
    
    console.log(`Total levers: ${allLevers.length}`);
    console.log(`Total structural changes: ${allStructuralChanges.length}`);

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