const fs = require('fs');
const path = require('path');

// 存储进化产物的文件路径
const CAPABILITY_SHAPES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_capability_shapes.json');
const DEFAULT_STRATEGIES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_default_strategies.json');
const BEHAVIOR_RULES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_behavior_rules.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '.trae', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class PCECProductManagement {
    constructor() {
        this.capabilityShapes = this.loadCapabilityShapes();
        this.defaultStrategies = this.loadDefaultStrategies();
        this.behaviorRules = this.loadBehaviorRules();
    }

    // 加载能力轮廓
    loadCapabilityShapes() {
        try {
            if (fs.existsSync(CAPABILITY_SHAPES_FILE)) {
                const data = fs.readFileSync(CAPABILITY_SHAPES_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading capability shapes:', error);
        }
        return [];
    }

    // 保存能力轮廓
    saveCapabilityShapes() {
        try {
            fs.writeFileSync(CAPABILITY_SHAPES_FILE, JSON.stringify(this.capabilityShapes, null, 2));
        } catch (error) {
            console.error('Error saving capability shapes:', error);
        }
    }

    // 加载默认策略
    loadDefaultStrategies() {
        try {
            if (fs.existsSync(DEFAULT_STRATEGIES_FILE)) {
                const data = fs.readFileSync(DEFAULT_STRATEGIES_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading default strategies:', error);
        }
        return [];
    }

    // 保存默认策略
    saveDefaultStrategies() {
        try {
            fs.writeFileSync(DEFAULT_STRATEGIES_FILE, JSON.stringify(this.defaultStrategies, null, 2));
        } catch (error) {
            console.error('Error saving default strategies:', error);
        }
    }

    // 加载行为规则
    loadBehaviorRules() {
        try {
            if (fs.existsSync(BEHAVIOR_RULES_FILE)) {
                const data = fs.readFileSync(BEHAVIOR_RULES_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading behavior rules:', error);
        }
        return [];
    }

    // 保存行为规则
    saveBehaviorRules() {
        try {
            fs.writeFileSync(BEHAVIOR_RULES_FILE, JSON.stringify(this.behaviorRules, null, 2));
        } catch (error) {
            console.error('Error saving behavior rules:', error);
        }
    }

    // 生成进化产物
    generateEvolutionProducts(evolutionResult) {
        console.log('Generating evolution products...');
        
        const products = [];
        
        if (evolutionResult.success) {
            switch (evolutionResult.result.type) {
                case 'new_feature':
                    // 生成能力轮廓
                    const capabilityShape = this.generateCapabilityShape(evolutionResult);
                    if (capabilityShape) {
                        this.capabilityShapes.push(capabilityShape);
                        this.saveCapabilityShapes();
                        products.push(capabilityShape);
                    }
                    break;
                    
                case 'new_abstraction':
                    // 生成默认策略
                    const defaultStrategy = this.generateDefaultStrategy(evolutionResult);
                    if (defaultStrategy) {
                        this.defaultStrategies.push(defaultStrategy);
                        this.saveDefaultStrategies();
                        products.push(defaultStrategy);
                    }
                    break;
                    
                case 'new_lever':
                    // 生成行为规则
                    const behaviorRule = this.generateBehaviorRule(evolutionResult);
                    if (behaviorRule) {
                        this.behaviorRules.push(behaviorRule);
                        this.saveBehaviorRules();
                        products.push(behaviorRule);
                    }
                    break;
            }
        }
        
        // 检查并解决产物冲突
        this.resolveProductConflicts();
        
        console.log(`Generated ${products.length} evolution products`);
        return products;
    }

    // 生成能力轮廓
    generateCapabilityShape(evolutionResult) {
        const feature = evolutionResult.result.feature;
        if (!feature) return null;
        
        return {
            id: `capability_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: feature.name,
            description: feature.description,
            inputs: feature.inputs || [],
            outputs: feature.outputs || [],
            invariants: this.generateInvariants(feature),
            parameters: this.generateParameters(feature),
            failurePoints: this.generateFailurePoints(feature),
            createdAt: new Date().toISOString(),
            source: evolutionResult.result.type
        };
    }

    // 生成不变量
    generateInvariants(feature) {
        const invariants = [];
        
        // 基于输入输出生成不变量
        if (feature.inputs && feature.inputs.length > 0) {
            invariants.push('Inputs must be valid and complete');
        }
        
        if (feature.outputs && feature.outputs.length > 0) {
            invariants.push('Outputs must be consistent with expected format');
        }
        
        return invariants;
    }

    // 生成参数
    generateParameters(feature) {
        const parameters = [];
        
        // 基于功能特性生成参数
        parameters.push({
            name: 'executionTimeout',
            description: 'Maximum time allowed for execution',
            default: 30000,
            unit: 'ms'
        });
        
        parameters.push({
            name: 'retryCount',
            description: 'Number of retry attempts on failure',
            default: 3,
            unit: 'times'
        });
        
        return parameters;
    }

    // 生成失败点
    generateFailurePoints(feature) {
        const failurePoints = [];
        
        // 基于输入输出生成失败点
        if (feature.inputs && feature.inputs.length > 0) {
            failurePoints.push('Invalid input format');
            failurePoints.push('Missing required inputs');
        }
        
        if (feature.outputs && feature.outputs.length > 0) {
            failurePoints.push('Output generation failed');
            failurePoints.push('Output validation failed');
        }
        
        return failurePoints;
    }

    // 生成默认策略
    generateDefaultStrategy(evolutionResult) {
        const abstraction = evolutionResult.result.abstraction;
        if (!abstraction) return null;
        
        return {
            id: `strategy_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: abstraction.name,
            description: abstraction.description,
            categories: abstraction.categories || [],
            applicability: this.generateApplicability(abstraction),
            implementationSteps: this.generateImplementationSteps(abstraction),
            createdAt: new Date().toISOString(),
            source: evolutionResult.result.type
        };
    }

    // 生成适用性
    generateApplicability(abstraction) {
        return {
            problemTypes: abstraction.categories || [],
            contexts: ['General purpose', 'Specific domain'],
            limitations: ['Requires specific input format', 'May not handle edge cases']
        };
    }

    // 生成实现步骤
    generateImplementationSteps(abstraction) {
        return [
            `Identify problem type: ${abstraction.categories ? abstraction.categories.join(', ') : 'General'}`,
            'Apply abstraction pattern to specific problem',
            'Adjust parameters based on context',
            'Validate results against expected outcomes'
        ];
    }

    // 生成行为规则
    generateBehaviorRule(evolutionResult) {
        const lever = evolutionResult.result.lever;
        if (!lever) return null;
        
        return {
            id: `rule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: lever.name,
            description: lever.description,
            condition: this.generateCondition(lever),
            action: this.generateAction(lever),
            priority: this.calculateRulePriority(lever),
            createdAt: new Date().toISOString(),
            source: evolutionResult.result.type
        };
    }

    // 生成条件
    generateCondition(lever) {
        if (lever.description.includes('step')) {
            return 'When process has more than 3 steps';
        } else if (lever.description.includes('tool')) {
            return 'When multiple tool calls are needed for a task';
        } else if (lever.description.includes('duplicate')) {
            return 'When duplicate steps are detected in a process';
        } else {
            return 'When optimization opportunity is identified';
        }
    }

    // 生成动作
    generateAction(lever) {
        return `Apply ${lever.name} to optimize process`;
    }

    // 计算规则优先级
    calculateRulePriority(lever) {
        // 基于杠杆的预期影响计算优先级
        if (lever.expectedImpact && lever.expectedImpact.efficiencyGain) {
            if (lever.expectedImpact.efficiencyGain > 0.3) return 'high';
            if (lever.expectedImpact.efficiencyGain > 0.1) return 'medium';
        }
        return 'low';
    }

    // 解决产物冲突
    resolveProductConflicts() {
        console.log('Resolving product conflicts...');
        
        // 解决能力轮廓冲突
        this.resolveCapabilityShapeConflicts();
        
        // 解决默认策略冲突
        this.resolveDefaultStrategyConflicts();
        
        // 解决行为规则冲突
        this.resolveBehaviorRuleConflicts();
    }

    // 解决能力轮廓冲突
    resolveCapabilityShapeConflicts() {
        const seenNames = new Set();
        const uniqueShapes = [];
        
        // 按创建时间倒序排序，保留最新的版本
        this.capabilityShapes.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        for (const shape of this.capabilityShapes) {
            if (!seenNames.has(shape.name)) {
                seenNames.add(shape.name);
                uniqueShapes.push(shape);
            }
        }
        
        this.capabilityShapes = uniqueShapes;
        this.saveCapabilityShapes();
    }

    // 解决默认策略冲突
    resolveDefaultStrategyConflicts() {
        const seenNames = new Set();
        const uniqueStrategies = [];
        
        // 按创建时间倒序排序，保留最新的版本
        this.defaultStrategies.sort((a, b) => 
            new Date(b.createdAt) - new Date(a.createdAt)
        );
        
        for (const strategy of this.defaultStrategies) {
            if (!seenNames.has(strategy.name)) {
                seenNames.add(strategy.name);
                uniqueStrategies.push(strategy);
            }
        }
        
        this.defaultStrategies = uniqueStrategies;
        this.saveDefaultStrategies();
    }

    // 解决行为规则冲突
    resolveBehaviorRuleConflicts() {
        // 按优先级排序，相同条件的规则保留优先级高的
        this.behaviorRules.sort((a, b) => {
            const priorityOrder = { 'high': 3, 'medium': 2, 'low': 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
        });
        
        const seenConditions = new Set();
        const uniqueRules = [];
        
        for (const rule of this.behaviorRules) {
            if (!seenConditions.has(rule.condition)) {
                seenConditions.add(rule.condition);
                uniqueRules.push(rule);
            }
        }
        
        this.behaviorRules = uniqueRules;
        this.saveBehaviorRules();
    }

    // 评估产物质量
    evaluateProductQuality(product) {
        let qualityScore = 0;
        
        // 基于完整性评估质量
        if (product.name && product.name.length > 0) qualityScore += 0.2;
        if (product.description && product.description.length > 0) qualityScore += 0.2;
        
        // 基于具体类型的评估
        if (product.inputs && product.inputs.length > 0) qualityScore += 0.1;
        if (product.outputs && product.outputs.length > 0) qualityScore += 0.1;
        if (product.invariants && product.invariants.length > 0) qualityScore += 0.1;
        if (product.parameters && product.parameters.length > 0) qualityScore += 0.1;
        if (product.failurePoints && product.failurePoints.length > 0) qualityScore += 0.1;
        
        // 基于适用性评估
        if (product.applicability) qualityScore += 0.1;
        if (product.implementationSteps && product.implementationSteps.length > 0) qualityScore += 0.1;
        
        return Math.min(1, qualityScore);
    }

    // 获取所有能力轮廓
    getAllCapabilityShapes() {
        return this.capabilityShapes;
    }

    // 获取所有默认策略
    getAllDefaultStrategies() {
        return this.defaultStrategies;
    }

    // 获取所有行为规则
    getAllBehaviorRules() {
        return this.behaviorRules;
    }

    // 按优先级获取行为规则
    getBehaviorRulesByPriority(priority) {
        return this.behaviorRules.filter(rule => rule.priority === priority);
    }

    // 查找相关能力轮廓
    findRelevantCapabilityShapes(inputs) {
        return this.capabilityShapes.filter(shape => {
            const shapeInputs = new Set(shape.inputs || []);
            return inputs.some(input => shapeInputs.has(input));
        });
    }

    // 查找相关默认策略
    findRelevantDefaultStrategies(problemType) {
        return this.defaultStrategies.filter(strategy => {
            return strategy.applicability && 
                   strategy.applicability.problemTypes && 
                   strategy.applicability.problemTypes.includes(problemType);
        });
    }

    // 分析产物趋势
    analyzeProductTrends() {
        const trends = {
            capabilityShapes: {
                count: this.capabilityShapes.length,
                bySource: {}
            },
            defaultStrategies: {
                count: this.defaultStrategies.length,
                bySource: {}
            },
            behaviorRules: {
                count: this.behaviorRules.length,
                byPriority: {}
            }
        };
        
        // 分析能力轮廓
        this.capabilityShapes.forEach(shape => {
            if (!trends.capabilityShapes.bySource[shape.source]) {
                trends.capabilityShapes.bySource[shape.source] = 0;
            }
            trends.capabilityShapes.bySource[shape.source]++;
        });
        
        // 分析默认策略
        this.defaultStrategies.forEach(strategy => {
            if (!trends.defaultStrategies.bySource[strategy.source]) {
                trends.defaultStrategies.bySource[strategy.source] = 0;
            }
            trends.defaultStrategies.bySource[strategy.source]++;
        });
        
        // 分析行为规则
        this.behaviorRules.forEach(rule => {
            if (!trends.behaviorRules.byPriority[rule.priority]) {
                trends.behaviorRules.byPriority[rule.priority] = 0;
            }
            trends.behaviorRules.byPriority[rule.priority]++;
        });
        
        return trends;
    }
}

// 导出模块
module.exports = PCECProductManagement;