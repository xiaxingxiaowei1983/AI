const FeatureIdentification = require('./pcec-feature-identification');
const fs = require('fs');
const path = require('path');

// 存储能力和功能的文件路径
const CAPABILITIES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_capabilities.json');
const TEMPORARY_CAPABILITIES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_temporary_capabilities.json');
const NEW_FEATURES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_new_features.json');

// 测试函数
async function runTests() {
    console.log('Starting Feature Identification tests...');

    // 清理测试环境
    const filesToClean = [CAPABILITIES_FILE, TEMPORARY_CAPABILITIES_FILE, NEW_FEATURES_FILE];
    filesToClean.forEach(file => {
        if (fs.existsSync(file)) {
            fs.unlinkSync(file);
            console.log(`Cleaned up ${path.basename(file)}`);
        }
    });

    // 测试1: 基于现有能力组合识别新功能
    console.log('\n=== Test 1: Identify New Features from Capability Combinations ===');
    const featureId = new FeatureIdentification();
    
    const newFeatures = featureId.identifyNewFeatures();
    console.log(`Identified ${newFeatures.length} new features`);
    
    newFeatures.forEach(feature => {
        console.log(`- ${feature.name}: ${feature.description}`);
    });

    // 测试2: 测试新功能
    console.log('\n=== Test 2: Test New Features ===');
    const testedFeatures = featureId.testNewFeatures(newFeatures);
    console.log(`Tested ${testedFeatures.length} features`);
    
    testedFeatures.forEach(feature => {
        console.log(`- ${feature.name}: ${feature.testStatus} (Reliability: ${feature.actualReliability.toFixed(2)})`);
    });

    // 测试3: 临时能力内生化
    console.log('\n=== Test 3: Internalize Temporary Capabilities ===');
    
    // 添加临时能力
    const tempCapability1 = {
        id: 'temp_capability_1',
        name: 'Temporary File Processor',
        description: 'Process file content with custom logic',
        inputs: ['file_path', 'processor_function'],
        outputs: ['processed_content'],
        reliability: 0.8
    };
    
    // 添加多次使用的临时能力
    for (let i = 0; i < 4; i++) {
        featureId.addTemporaryCapability(tempCapability1);
    }
    
    // 再次识别新功能
    const featuresAfterInternalization = featureId.identifyNewFeatures();
    console.log(`Identified ${featuresAfterInternalization.length} new features after internalization`);
    
    featuresAfterInternalization.forEach(feature => {
        console.log(`- ${feature.name}: ${feature.description}`);
    });

    // 测试4: 获取通过测试的新功能
    console.log('\n=== Test 4: Get Passed Features ===');
    const passedFeatures = featureId.getPassedFeatures();
    console.log(`Found ${passedFeatures.length} passed features`);
    
    passedFeatures.forEach(feature => {
        console.log(`- ${feature.name}: ${feature.testStatus} (Reliability: ${feature.actualReliability.toFixed(2)})`);
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