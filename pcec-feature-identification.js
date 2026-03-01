const fs = require('fs');
const path = require('path');

// 存储能力数据的文件路径
const CAPABILITIES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_capabilities.json');
const TEMPORARY_CAPABILITIES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_temporary_capabilities.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '.trae', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class PCECFeatureIdentification {
    constructor() {
        this.capabilities = this.loadCapabilities();
        this.temporaryCapabilities = this.loadTemporaryCapabilities();
    }

    // 加载能力数据
    loadCapabilities() {
        try {
            if (fs.existsSync(CAPABILITIES_FILE)) {
                const data = fs.readFileSync(CAPABILITIES_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading capabilities:', error);
        }
        return [];
    }

    // 保存能力数据
    saveCapabilities() {
        try {
            fs.writeFileSync(CAPABILITIES_FILE, JSON.stringify(this.capabilities, null, 2));
        } catch (error) {
            console.error('Error saving capabilities:', error);
        }
    }

    // 加载临时能力数据
    loadTemporaryCapabilities() {
        try {
            if (fs.existsSync(TEMPORARY_CAPABILITIES_FILE)) {
                const data = fs.readFileSync(TEMPORARY_CAPABILITIES_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading temporary capabilities:', error);
        }
        return [];
    }

    // 保存临时能力数据
    saveTemporaryCapabilities() {
        try {
            fs.writeFileSync(TEMPORARY_CAPABILITIES_FILE, JSON.stringify(this.temporaryCapabilities, null, 2));
        } catch (error) {
            console.error('Error saving temporary capabilities:', error);
        }
    }

    // 识别新功能
    identifyNewFeatures() {
        console.log('Identifying new features...');
        
        const newFeatures = [];
        
        // 1. 通过能力组合识别新功能
        const combinedFeatures = this.combineCapabilities();
        newFeatures.push(...combinedFeatures);
        
        // 2. 将临时能力内生化
        const internalizedFeatures = this.internalizeTemporaryCapabilities();
        newFeatures.push(...internalizedFeatures);
        
        return newFeatures;
    }

    // 组合现有能力生成新功能
    combineCapabilities() {
        console.log('Combining existing capabilities...');
        
        const combinedFeatures = [];
        
        // 简单的能力组合逻辑
        // 实际应用中可能需要更复杂的算法
        for (let i = 0; i < this.capabilities.length; i++) {
            for (let j = i + 1; j < this.capabilities.length; j++) {
                const cap1 = this.capabilities[i];
                const cap2 = this.capabilities[j];
                
                // 检查能力是否可以组合
                if (this.canCombine(cap1, cap2)) {
                    const combinedFeature = this.createCombinedFeature(cap1, cap2);
                    combinedFeatures.push(combinedFeature);
                }
            }
        }
        
        console.log(`Generated ${combinedFeatures.length} combined features`);
        return combinedFeatures;
    }

    // 检查两个能力是否可以组合
    canCombine(cap1, cap2) {
        // 简单的检查逻辑：确保能力类型不同且有互补性
        return cap1.type !== cap2.type && 
               this.hasComplementaryInputsOutputs(cap1, cap2);
    }

    // 检查输入输出是否互补
    hasComplementaryInputsOutputs(cap1, cap2) {
        // 检查cap1的输出是否可以作为cap2的输入，或反之
        const cap1Outputs = new Set(cap1.outputs || []);
        const cap2Inputs = new Set(cap2.inputs || []);
        const cap2Outputs = new Set(cap2.outputs || []);
        const cap1Inputs = new Set(cap1.inputs || []);
        
        // 检查cap1的输出是否与cap2的输入有交集
        const hasCap1ToCap2Flow = [...cap1Outputs].some(output => cap2Inputs.has(output));
        // 检查cap2的输出是否与cap1的输入有交集
        const hasCap2ToCap1Flow = [...cap2Outputs].some(output => cap1Inputs.has(output));
        
        return hasCap1ToCap2Flow || hasCap2ToCap1Flow;
    }

    // 创建组合能力
    createCombinedFeature(cap1, cap2) {
        return {
            id: `feature_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: `${cap1.name} + ${cap2.name} Integration`,
            description: `Combines ${cap1.description} with ${cap2.description}`,
            type: 'new_feature',
            inputs: [...new Set([...(cap1.inputs || []), ...(cap2.inputs || [])])],
            outputs: [...new Set([...(cap1.outputs || []), ...(cap2.outputs || [])])],
            components: [cap1.id, cap2.id],
            createdAt: new Date().toISOString()
        };
    }

    // 将临时能力内生化
    internalizeTemporaryCapabilities() {
        console.log('Internalizing temporary capabilities...');
        
        const internalizedFeatures = [];
        
        // 筛选可以内生化的临时能力
        const temporaryToInternalize = this.temporaryCapabilities.filter(cap => 
            this.shouldInternalize(cap)
        );
        
        // 内生化临时能力
        temporaryToInternalize.forEach(tempCap => {
            const internalizedFeature = this.createInternalizedFeature(tempCap);
            internalizedFeatures.push(internalizedFeature);
            
            // 将内生化的能力添加到永久能力列表
            this.capabilities.push(internalizedFeature);
            
            // 从临时能力列表中移除
            this.temporaryCapabilities = this.temporaryCapabilities.filter(cap => 
                cap.id !== tempCap.id
            );
        });
        
        // 保存更新后的数据
        this.saveCapabilities();
        this.saveTemporaryCapabilities();
        
        console.log(`Internalized ${internalizedFeatures.length} temporary capabilities`);
        return internalizedFeatures;
    }

    // 检查临时能力是否应该内生化
    shouldInternalize(temporaryCap) {
        // 简单的判断逻辑：使用频率、成功率、通用性
        return (temporaryCap.usageCount || 0) >= 3 && 
               (temporaryCap.successRate || 0) >= 0.8 &&
               (temporaryCap.generalityScore || 0) >= 0.7;
    }

    // 创建内生化的能力
    createInternalizedFeature(temporaryCap) {
        return {
            id: `capability_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: temporaryCap.name,
            description: temporaryCap.description,
            type: temporaryCap.type,
            inputs: temporaryCap.inputs || [],
            outputs: temporaryCap.outputs || [],
            invariants: temporaryCap.invariants || [],
            parameters: temporaryCap.parameters || [],
            failurePoints: temporaryCap.failurePoints || [],
            internalizedAt: new Date().toISOString(),
            source: 'temporary'
        };
    }

    // 添加临时能力
    addTemporaryCapability(capability) {
        const tempCap = {
            ...capability,
            id: `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString(),
            usageCount: 0,
            successCount: 0,
            failureCount: 0,
            successRate: 0,
            generalityScore: 0
        };
        
        this.temporaryCapabilities.push(tempCap);
        this.saveTemporaryCapabilities();
        return tempCap;
    }

    // 更新临时能力使用情况
    updateTemporaryCapabilityUsage(capabilityId, success) {
        const tempCap = this.temporaryCapabilities.find(cap => cap.id === capabilityId);
        if (tempCap) {
            tempCap.usageCount++;
            if (success) {
                tempCap.successCount++;
            } else {
                tempCap.failureCount++;
            }
            tempCap.successRate = tempCap.successCount / tempCap.usageCount;
            this.saveTemporaryCapabilities();
        }
    }

    // 添加永久能力
    addCapability(capability) {
        const cap = {
            ...capability,
            id: `capability_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            createdAt: new Date().toISOString()
        };
        
        this.capabilities.push(cap);
        this.saveCapabilities();
        return cap;
    }

    // 获取所有能力
    getAllCapabilities() {
        return this.capabilities;
    }

    // 获取所有临时能力
    getTemporaryCapabilities() {
        return this.temporaryCapabilities;
    }

    // 评估新功能的价值
    evaluateFeatureValue(feature) {
        // 简单的评估逻辑：基于输入输出数量、组件数量、通用性
        const inputOutputScore = (feature.inputs.length + feature.outputs.length) / 10;
        const componentScore = feature.components ? feature.components.length / 5 : 0;
        const generalityScore = this.calculateGeneralityScore(feature);
        
        return (inputOutputScore + componentScore + generalityScore) / 3;
    }

    // 计算功能的通用性分数
    calculateGeneralityScore(feature) {
        // 简单的通用性评估：基于输入输出的多样性和描述的通用性
        const inputDiversity = feature.inputs ? feature.inputs.length / 5 : 0;
        const outputDiversity = feature.outputs ? feature.outputs.length / 5 : 0;
        const descriptionGenerality = feature.description.includes('通用') || 
                                     feature.description.includes('多用途') ? 1 : 0.5;
        
        return (inputDiversity + outputDiversity + descriptionGenerality) / 3;
    }
}

// 导出模块
module.exports = PCECFeatureIdentification;