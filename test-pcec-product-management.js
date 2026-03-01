const ProductManagement = require('./pcec-product-management');
const fs = require('fs');
const path = require('path');

// 存储进化产物的文件路径
const CAPABILITY_SHAPES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_capability_shapes.json');
const DEFAULT_STRATEGIES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_default_strategies.json');
const BEHAVIOR_RULES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_behavior_rules.json');
const PRODUCT_HISTORY_FILE = path.join(__dirname, '.trae', 'data', 'pcec_product_history.json');

// 测试函数
async function runTests() {
    console.log('Starting Product Management tests...');

    // 清理测试环境
    const filesToClean = [CAPABILITY_SHAPES_FILE, DEFAULT_STRATEGIES_FILE, BEHAVIOR_RULES_FILE, PRODUCT_HISTORY_FILE];
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Cleaned up ${path.basename(file)}`);
        }
    });

    // 测试1: 生成进化产物
    console.log('\n=== Test 1: Generate Evolution Products ===');
    const productManager = new ProductManagement();
    
    // 生成能力轮廓
    const capabilityShape = productManager.generateCapabilityShape(
        'Enhanced File Operations',
        'Combined file read, write, and search operations',
        ['file_path', 'operation_type', 'content', 'pattern'],
        ['result', 'status'],
        ['file_path must be valid', 'operation_type must be one of read, write, search'],
        ['encoding', 'timeout'],
        ['file not found', 'permission denied', 'network error']
    );
    console.log(`Generated capability shape: ${capabilityShape.name}`);
    
    // 生成默认策略
    const defaultStrategy = productManager.generateDefaultStrategy(
        'File Operation Patterns',
        'Abstract patterns for common file operations',
        ['read', 'write', 'search', 'modify']
    );
    console.log(`Generated default strategy: ${defaultStrategy.name}`);
    
    // 生成行为规则
    const behaviorRule = productManager.generateBehaviorRule(
        'Batch File Operations',
        'Process multiple files in a single operation',
        'When processing multiple files',
        'Use batch operations'
    );
    console.log(`Generated behavior rule: ${behaviorRule.name}`);

    // 测试2: 更新进化产物
    console.log('\n=== Test 2: Update Evolution Products ===');
    
    // 更新能力轮廓
    const updatedShape = productManager.updateCapabilityShape(capabilityShape.id, {
        description: 'Enhanced file operations with batch processing support',
        inputs: ['file_paths', 'operation_type', 'content', 'pattern'],
        outputs: ['results', 'status']
    });
    console.log(`Updated capability shape: ${updatedShape.name} (Version: ${updatedShape.version})`);
    
    // 更新默认策略
    const updatedStrategy = productManager.updateDefaultStrategy(defaultStrategy.id, {
        categories: ['read', 'write', 'search', 'modify', 'batch']
    });
    console.log(`Updated default strategy: ${updatedStrategy.name} (Version: ${updatedStrategy.version})`);
    
    // 更新行为规则
    const updatedRule = productManager.updateBehaviorRule(behaviorRule.id, {
        action: 'Use batch operations with parallel processing'
    });
    console.log(`Updated behavior rule: ${updatedRule.name} (Version: ${updatedRule.version})`);

    // 测试3: 检查一致性
    console.log('\n=== Test 3: Check Consistency ===');
    const consistencyIssues = productManager.checkConsistency();
    if (consistencyIssues.length === 0) {
        console.log('No consistency issues found');
    } else {
        console.log(`Found ${consistencyIssues.length} consistency issues:`);
        consistencyIssues.forEach(issue => console.log(`- ${issue}`));
    }

    // 测试4: 解决冲突
    console.log('\n=== Test 4: Resolve Conflicts ===');
    
    // 创建冲突
    productManager.generateCapabilityShape(
        'Enhanced File Operations', // 与之前的名称相同
        'Another description',
        ['file_path'],
        ['result']
    );
    
    const conflicts = productManager.resolveConflicts();
    console.log(`Resolved ${conflicts.length} conflicts:`);
    conflicts.forEach(conflict => console.log(`- ${conflict.type}: ${conflict.resolved}`));

    // 测试5: 获取所有进化产物
    console.log('\n=== Test 5: Get All Evolution Products ===');
    const allProducts = productManager.getAllProducts();
    console.log(`Capability shapes: ${allProducts.capabilityShapes.length}`);
    console.log(`Default strategies: ${allProducts.defaultStrategies.length}`);
    console.log(`Behavior rules: ${allProducts.behaviorRules.length}`);

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