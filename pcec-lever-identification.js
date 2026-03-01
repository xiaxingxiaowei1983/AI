const fs = require('fs');
const path = require('path');

// 存储杠杆数据的文件路径
const LEVERS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_levers.json');
const LEVER_FEEDBACK_FILE = path.join(__dirname, '.trae', 'data', 'pcec_lever_feedback.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '.trae', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class PCECLeverIdentification {
    constructor() {
        this.levers = this.loadLevers();
        this.leverFeedback = this.loadLeverFeedback();
    }

    // 加载杠杆数据
    loadLevers() {
        try {
            if (fs.existsSync(LEVERS_FILE)) {
                const data = fs.readFileSync(LEVERS_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading levers:', error);
        }
        return [];
    }

    // 保存杠杆数据
    saveLevers() {
        try {
            fs.writeFileSync(LEVERS_FILE, JSON.stringify(this.levers, null, 2));
        } catch (error) {
            console.error('Error saving levers:', error);
        }
    }

    // 加载杠杆反馈数据
    loadLeverFeedback() {
        try {
            if (fs.existsSync(LEVER_FEEDBACK_FILE)) {
                const data = fs.readFileSync(LEVER_FEEDBACK_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading lever feedback:', error);
        }
        return [];
    }

    // 保存杠杆反馈数据
    saveLeverFeedback() {
        try {
            fs.writeFileSync(LEVER_FEEDBACK_FILE, JSON.stringify(this.leverFeedback, null, 2));
        } catch (error) {
            console.error('Error saving lever feedback:', error);
        }
    }

    // 识别潜在的杠杆点
    identifyLevers(currentProcesses) {
        console.log('Identifying potential levers...');
        
        const potentialLevers = [];
        
        // 分析当前流程，识别可以优化的环节
        currentProcesses.forEach(process => {
            const processLevers = this.analyzeProcessForLevers(process);
            potentialLevers.push(...processLevers);
        });
        
        // 评估杠杆的潜力
        const evaluatedLevers = potentialLevers.map(lever => ({
            ...lever,
            potential: this.evaluateLeverPotential(lever)
        }));
        
        // 按潜力排序
        evaluatedLevers.sort((a, b) => b.potential - a.potential);
        
        // 选择前几个最有潜力的杠杆
        const selectedLevers = evaluatedLevers.slice(0, 3);
        
        // 保存新识别的杠杆
        this.levers.push(...selectedLevers);
        this.saveLevers();
        
        console.log(`Identified ${selectedLevers.length} potential levers`);
        return selectedLevers;
    }

    // 分析流程以识别杠杆点
    analyzeProcessForLevers(process) {
        const levers = [];
        
        // 检查步骤数量
        if (process.steps && process.steps.length > 3) {
            levers.push({
                id: `lever_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: `Streamline ${process.name} Steps`,
                description: `Reduce the number of steps in ${process.name}`,
                type: 'step_reduction',
                target: process.id,
                expectedImpact: {
                    stepsReduced: Math.floor(process.steps.length * 0.3),
                    efficiencyGain: 0.25
                },
                createdAt: new Date().toISOString()
            });
        }
        
        // 检查工具调用次数
        if (process.toolCalls && process.toolCalls.length > 2) {
            levers.push({
                id: `lever_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                name: `Optimize ${process.name} Tool Calls`,
                description: `Reduce tool calls in ${process.name}`,
                type: 'tool_optimization',
                target: process.id,
                expectedImpact: {
                    toolCallsReduced: Math.floor(process.toolCalls.length * 0.4),
                    efficiencyGain: 0.3
                },
                createdAt: new Date().toISOString()
            });
        }
        
        // 检查重复操作
        if (process.steps) {
            const stepNames = process.steps.map(step => step.name);
            const duplicateSteps = this.findDuplicateSteps(stepNames);
            
            if (duplicateSteps.length > 0) {
                levers.push({
                    id: `lever_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                    name: `Eliminate Duplicate Steps in ${process.name}`,
                    description: `Remove duplicate steps in ${process.name}`,
                    type: 'duplicate_elimination',
                    target: process.id,
                    expectedImpact: {
                        stepsReduced: duplicateSteps.length,
                        efficiencyGain: 0.2
                    },
                    createdAt: new Date().toISOString()
                });
            }
        }
        
        return levers;
    }

    // 查找重复步骤
    findDuplicateSteps(stepNames) {
        const stepCount = {};
        const duplicates = [];
        
        stepNames.forEach(name => {
            stepCount[name] = (stepCount[name] || 0) + 1;
        });
        
        for (const [name, count] of Object.entries(stepCount)) {
            if (count > 1) {
                duplicates.push(name);
            }
        }
        
        return duplicates;
    }

    // 评估杠杆的潜力
    evaluateLeverPotential(lever) {
        // 基于预期影响和实施难度评估潜力
        const impactScore = this.calculateImpactScore(lever.expectedImpact);
        const difficultyScore = this.calculateDifficultyScore(lever);
        
        // 潜力 = 影响 / 难度
        return impactScore / (difficultyScore + 1);
    }

    // 计算影响分数
    calculateImpactScore(expectedImpact) {
        let score = 0;
        
        if (expectedImpact.stepsReduced) {
            score += expectedImpact.stepsReduced * 0.3;
        }
        
        if (expectedImpact.toolCallsReduced) {
            score += expectedImpact.toolCallsReduced * 0.4;
        }
        
        if (expectedImpact.efficiencyGain) {
            score += expectedImpact.efficiencyGain * 0.3;
        }
        
        return Math.min(1, score);
    }

    // 计算难度分数
    calculateDifficultyScore(lever) {
        // 基于杠杆类型评估实施难度
        const difficultyMap = {
            'step_reduction': 0.6,
            'tool_optimization': 0.8,
            'duplicate_elimination': 0.4,
            'parallelization': 0.9,
            'caching': 0.5
        };
        
        return difficultyMap[lever.type] || 0.7;
    }

    // 应用杠杆
    applyLever(leverId) {
        console.log(`Applying lever: ${leverId}`);
        
        const lever = this.levers.find(l => l.id === leverId);
        if (!lever) {
            console.error('Lever not found:', leverId);
            return null;
        }
        
        // 标记杠杆为已应用
        lever.status = 'applied';
        lever.appliedAt = new Date().toISOString();
        
        // 模拟杠杆应用效果
        const actualImpact = this.simulateLeverImpact(lever);
        lever.actualImpact = actualImpact;
        
        // 保存更新后的杠杆
        this.saveLevers();
        
        // 收集反馈
        const feedback = this.collectLeverFeedback(lever, actualImpact);
        this.leverFeedback.push(feedback);
        this.saveLeverFeedback();
        
        console.log(`Applied lever with actual impact:`, actualImpact);
        return lever;
    }

    // 模拟杠杆应用效果
    simulateLeverImpact(lever) {
        // 基于预期影响模拟实际效果
        const expected = lever.expectedImpact;
        const actual = {};
        
        if (expected.stepsReduced) {
            actual.stepsReduced = Math.floor(expected.stepsReduced * (0.8 + Math.random() * 0.4));
        }
        
        if (expected.toolCallsReduced) {
            actual.toolCallsReduced = Math.floor(expected.toolCallsReduced * (0.8 + Math.random() * 0.4));
        }
        
        if (expected.efficiencyGain) {
            actual.efficiencyGain = expected.efficiencyGain * (0.8 + Math.random() * 0.4);
        }
        
        return actual;
    }

    // 收集杠杆反馈
    collectLeverFeedback(lever, actualImpact) {
        return {
            id: `feedback_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            leverId: lever.id,
            actualImpact: actualImpact,
            effectiveness: this.calculateLeverEffectiveness(lever.expectedImpact, actualImpact),
            timestamp: new Date().toISOString(),
            notes: `Lever ${lever.name} applied with ${(actualImpact.efficiencyGain * 100).toFixed(1)}% efficiency gain`
        };
    }

    // 计算杠杆有效性
    calculateLeverEffectiveness(expected, actual) {
        let totalExpected = 0;
        let totalActual = 0;
        
        if (expected.stepsReduced && actual.stepsReduced) {
            totalExpected += expected.stepsReduced;
            totalActual += actual.stepsReduced;
        }
        
        if (expected.toolCallsReduced && actual.toolCallsReduced) {
            totalExpected += expected.toolCallsReduced;
            totalActual += actual.toolCallsReduced;
        }
        
        if (expected.efficiencyGain && actual.efficiencyGain) {
            totalExpected += expected.efficiencyGain * 10; // 权重调整
            totalActual += actual.efficiencyGain * 10;
        }
        
        return totalExpected > 0 ? totalActual / totalExpected : 0;
    }

    // 评估杠杆的长期效果
    evaluateLeverLongTerm(leverId) {
        const lever = this.levers.find(l => l.id === leverId);
        if (!lever) {
            return null;
        }
        
        const feedbacks = this.leverFeedback.filter(f => f.leverId === leverId);
        if (feedbacks.length === 0) {
            return null;
        }
        
        // 计算平均有效性
        const avgEffectiveness = feedbacks.reduce((sum, feedback) => sum + feedback.effectiveness, 0) / feedbacks.length;
        
        // 评估长期效果
        const longTermEffect = {
            leverId: leverId,
            averageEffectiveness: avgEffectiveness,
            isSustained: avgEffectiveness > 0.7,
            recommendations: this.generateLeverRecommendations(lever, avgEffectiveness),
            evaluatedAt: new Date().toISOString()
        };
        
        return longTermEffect;
    }

    // 生成杠杆改进建议
    generateLeverRecommendations(lever, effectiveness) {
        const recommendations = [];
        
        if (effectiveness < 0.5) {
            recommendations.push('Reevaluate the lever approach');
            recommendations.push('Consider alternative optimization strategies');
        } else if (effectiveness < 0.8) {
            recommendations.push('Fine-tune the lever implementation');
            recommendations.push('Monitor performance more closely');
        } else {
            recommendations.push('Consider extending this lever to other processes');
            recommendations.push('Document best practices for similar optimizations');
        }
        
        return recommendations;
    }

    // 获取所有杠杆
    getAllLevers() {
        return this.levers;
    }

    // 获取已应用的杠杆
    getAppliedLevers() {
        return this.levers.filter(l => l.status === 'applied');
    }

    // 获取杠杆反馈
    getLeverFeedback(leverId) {
        return this.leverFeedback.filter(f => f.leverId === leverId);
    }

    // 分析杠杆应用趋势
    analyzeLeverTrends() {
        const trends = {
            byType: {},
            overallEffectiveness: 0,
            mostEffectiveType: null,
            leastEffectiveType: null
        };
        
        // 按类型分析
        this.levers.forEach(lever => {
            if (!trends.byType[lever.type]) {
                trends.byType[lever.type] = {
                    count: 0,
                    totalEffectiveness: 0
                };
            }
            
            trends.byType[lever.type].count++;
            
            const feedbacks = this.leverFeedback.filter(f => f.leverId === lever.id);
            if (feedbacks.length > 0) {
                const avgEffectiveness = feedbacks.reduce((sum, f) => sum + f.effectiveness, 0) / feedbacks.length;
                trends.byType[lever.type].totalEffectiveness += avgEffectiveness;
            }
        });
        
        // 计算总体有效性和最/ least 有效的类型
        let totalEffectiveness = 0;
        let totalLevers = 0;
        let mostEffective = { type: null, effectiveness: 0 };
        let leastEffective = { type: null, effectiveness: 1 };
        
        for (const [type, data] of Object.entries(trends.byType)) {
            const avgEffectiveness = data.totalEffectiveness / data.count;
            trends.byType[type].averageEffectiveness = avgEffectiveness;
            
            totalEffectiveness += data.totalEffectiveness;
            totalLevers += data.count;
            
            if (avgEffectiveness > mostEffective.effectiveness) {
                mostEffective = { type, effectiveness: avgEffectiveness };
            }
            
            if (avgEffectiveness < leastEffective.effectiveness) {
                leastEffective = { type, effectiveness: avgEffectiveness };
            }
        }
        
        trends.overallEffectiveness = totalLevers > 0 ? totalEffectiveness / totalLevers : 0;
        trends.mostEffectiveType = mostEffective.type;
        trends.leastEffectiveType = leastEffective.type;
        
        return trends;
    }
}

// 导出模块
module.exports = PCECLeverIdentification;