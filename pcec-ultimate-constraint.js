const fs = require('fs');
const path = require('path');

// 存储行为模式数据的文件路径
const BEHAVIOR_PATTERNS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_behavior_patterns.json');
const CONSTRAINT_HISTORY_FILE = path.join(__dirname, '.trae', 'data', 'pcec_constraint_history.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '.trae', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class PCECUltimateConstraint {
    constructor() {
        this.behaviorPatterns = this.loadBehaviorPatterns();
        this.constraintHistory = this.loadConstraintHistory();
        this.noEvolutionCount = 0;
        this.maxNoEvolutionCycles = 2; // 连续2个周期无进化触发强制推翻
    }

    // 加载行为模式
    loadBehaviorPatterns() {
        try {
            if (fs.existsSync(BEHAVIOR_PATTERNS_FILE)) {
                const data = fs.readFileSync(BEHAVIOR_PATTERNS_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading behavior patterns:', error);
        }
        // 默认行为模式
        return [
            {
                id: 'pattern_1',
                name: 'Step-by-Step Execution',
                description: 'Execute tasks in a linear, step-by-step manner',
                priority: 'high',
                isActive: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 'pattern_2',
                name: 'Tool Usage Optimization',
                description: 'Use tools efficiently and minimize tool calls',
                priority: 'medium',
                isActive: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 'pattern_3',
                name: 'Error Handling Resilience',
                description: 'Handle errors gracefully and continue execution',
                priority: 'high',
                isActive: true,
                createdAt: new Date().toISOString()
            },
            {
                id: 'pattern_4',
                name: 'Context Awareness',
                description: 'Maintain awareness of current context and adapt behavior',
                priority: 'medium',
                isActive: true,
                createdAt: new Date().toISOString()
            }
        ];
    }

    // 保存行为模式
    saveBehaviorPatterns() {
        try {
            fs.writeFileSync(BEHAVIOR_PATTERNS_FILE, JSON.stringify(this.behaviorPatterns, null, 2));
        } catch (error) {
            console.error('Error saving behavior patterns:', error);
        }
    }

    // 加载约束历史
    loadConstraintHistory() {
        try {
            if (fs.existsSync(CONSTRAINT_HISTORY_FILE)) {
                const data = fs.readFileSync(CONSTRAINT_HISTORY_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading constraint history:', error);
        }
        return [];
    }

    // 保存约束历史
    saveConstraintHistory() {
        try {
            fs.writeFileSync(CONSTRAINT_HISTORY_FILE, JSON.stringify(this.constraintHistory, null, 2));
        } catch (error) {
            console.error('Error saving constraint history:', error);
        }
    }

    // 检查终极约束
    checkUltimateConstraint(evolutionResult) {
        console.log('Checking ultimate constraint...');
        
        if (evolutionResult.isSignificant) {
            // 有显著进化，重置计数
            this.noEvolutionCount = 0;
            console.log('Significant evolution detected, resetting no-evolution count');
        } else {
            // 无显著进化，增加计数
            this.noEvolutionCount++;
            console.log(`No significant evolution detected. Count: ${this.noEvolutionCount}/${this.maxNoEvolutionCycles}`);
            
            // 检查是否达到触发条件
            if (this.noEvolutionCount >= this.maxNoEvolutionCycles) {
                console.log('WARNING: Ultimate constraint triggered! Forcing behavior pattern overthrow...');
                this.enforceBehaviorPatternOverthrow();
                this.noEvolutionCount = 0; // 重置计数
            }
        }
    }

    // 强制推翻行为模式
    enforceBehaviorPatternOverthrow() {
        // 选择一个要推翻的行为模式
        const patternToOverthrow = this.selectPatternToOverthrow();
        if (!patternToOverthrow) {
            console.error('No behavior patterns available to overthrow');
            return;
        }
        
        // 记录推翻前的状态
        const overthrowRecord = {
            id: `overthrow_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            patternId: patternToOverthrow.id,
            patternName: patternToOverthrow.name,
            action: 'overthrown',
            reason: 'No significant evolution for consecutive cycles'
        };
        
        // 推翻行为模式
        patternToOverthrow.isActive = false;
        patternToOverthrow.overthrownAt = new Date().toISOString();
        patternToOverthrow.overthrowReason = 'No significant evolution for consecutive cycles';
        
        // 生成替代行为模式
        const replacementPattern = this.generateReplacementPattern(patternToOverthrow);
        if (replacementPattern) {
            this.behaviorPatterns.push(replacementPattern);
            overthrowRecord.replacementPatternId = replacementPattern.id;
        }
        
        // 保存更新
        this.saveBehaviorPatterns();
        this.constraintHistory.push(overthrowRecord);
        this.saveConstraintHistory();
        
        console.log(`Overthrew behavior pattern: ${patternToOverthrow.name}`);
        if (replacementPattern) {
            console.log(`Generated replacement pattern: ${replacementPattern.name}`);
        }
    }

    // 选择要推翻的行为模式
    selectPatternToOverthrow() {
        // 选择优先级较低的活跃行为模式
        const activePatterns = this.behaviorPatterns.filter(p => p.isActive);
        if (activePatterns.length === 0) {
            return null;
        }
        
        // 按优先级排序，选择优先级较低的
        activePatterns.sort((a, b) => {
            const priorityOrder = { 'low': 1, 'medium': 2, 'high': 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
        
        return activePatterns[0];
    }

    // 生成替代行为模式
    generateReplacementPattern(overthrownPattern) {
        const replacementPatterns = {
            'Step-by-Step Execution': {
                name: 'Parallel Execution',
                description: 'Execute independent tasks in parallel when possible',
                priority: 'medium'
            },
            'Tool Usage Optimization': {
                name: 'Adaptive Tool Usage',
                description: 'Adapt tool usage based on task complexity and context',
                priority: 'medium'
            },
            'Error Handling Resilience': {
                name: 'Proactive Error Prevention',
                description: 'Anticipate potential errors and take preventive measures',
                priority: 'high'
            },
            'Context Awareness': {
                name: 'Proactive Context Management',
                description: 'Actively manage and update context information',
                priority: 'medium'
            }
        };
        
        const replacementData = replacementPatterns[overthrownPattern.name];
        if (!replacementData) {
            return null;
        }
        
        return {
            id: `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: replacementData.name,
            description: replacementData.description,
            priority: replacementData.priority,
            isActive: true,
            createdAt: new Date().toISOString(),
            replacedPatternId: overthrownPattern.id
        };
    }

    // 评估行为模式推翻的效果
    evaluateOverthrowEffectiveness(overthrowId) {
        const overthrowRecord = this.constraintHistory.find(record => record.id === overthrowId);
        if (!overthrowRecord) {
            return null;
        }
        
        // 查找替代模式
        const replacementPattern = this.behaviorPatterns.find(p => p.id === overthrowRecord.replacementPatternId);
        if (!replacementPattern) {
            return null;
        }
        
        // 评估替代模式的效果
        const effectiveness = this.calculatePatternEffectiveness(replacementPattern);
        
        // 更新推翻记录
        overthrowRecord.effectiveness = effectiveness;
        overthrowRecord.evaluatedAt = new Date().toISOString();
        
        // 保存更新
        this.saveConstraintHistory();
        
        return {
            overthrowId: overthrowId,
            patternName: replacementPattern.name,
            effectiveness: effectiveness,
            evaluationDate: new Date().toISOString()
        };
    }

    // 计算行为模式的效果
    calculatePatternEffectiveness(pattern) {
        // 基于模式的使用频率和成功率评估效果
        // 这里使用模拟数据，实际应用中应该基于真实数据
        const usageFrequency = Math.random() * 0.8 + 0.2; // 0.2-1.0
        const successRate = Math.random() * 0.3 + 0.7; // 0.7-1.0
        
        return (usageFrequency + successRate) / 2;
    }

    // 恢复被推翻的行为模式
    restoreBehaviorPattern(patternId) {
        const pattern = this.behaviorPatterns.find(p => p.id === patternId);
        if (!pattern || pattern.isActive) {
            return null;
        }
        
        // 记录恢复
        const restoreRecord = {
            id: `restore_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            timestamp: new Date().toISOString(),
            patternId: pattern.id,
            patternName: pattern.name,
            action: 'restored',
            reason: 'Pattern restoration requested'
        };
        
        // 恢复行为模式
        pattern.isActive = true;
        pattern.restoredAt = new Date().toISOString();
        delete pattern.overthrownAt;
        delete pattern.overthrowReason;
        
        // 保存更新
        this.saveBehaviorPatterns();
        this.constraintHistory.push(restoreRecord);
        this.saveConstraintHistory();
        
        console.log(`Restored behavior pattern: ${pattern.name}`);
        return pattern;
    }

    // 获取所有行为模式
    getAllBehaviorPatterns() {
        return this.behaviorPatterns;
    }

    // 获取活跃的行为模式
    getActiveBehaviorPatterns() {
        return this.behaviorPatterns.filter(p => p.isActive);
    }

    // 获取被推翻的行为模式
    getOverthrownBehaviorPatterns() {
        return this.behaviorPatterns.filter(p => !p.isActive);
    }

    // 获取约束历史
    getConstraintHistory() {
        return this.constraintHistory;
    }

    // 分析约束趋势
    analyzeConstraintTrends() {
        const trends = {
            totalOverthrows: 0,
            totalRestorations: 0,
            averageEffectiveness: 0,
            overthrowReasons: {}
        };
        
        let totalEffectiveness = 0;
        let effectiveOverthrows = 0;
        
        this.constraintHistory.forEach(record => {
            if (record.action === 'overthrown') {
                trends.totalOverthrows++;
                
                if (record.reason) {
                    if (!trends.overthrowReasons[record.reason]) {
                        trends.overthrowReasons[record.reason] = 0;
                    }
                    trends.overthrowReasons[record.reason]++;
                }
                
                if (record.effectiveness) {
                    totalEffectiveness += record.effectiveness;
                    effectiveOverthrows++;
                }
            } else if (record.action === 'restored') {
                trends.totalRestorations++;
            }
        });
        
        if (effectiveOverthrows > 0) {
            trends.averageEffectiveness = totalEffectiveness / effectiveOverthrows;
        }
        
        return trends;
    }

    // 添加新的行为模式
    addBehaviorPattern(pattern) {
        const newPattern = {
            id: `pattern_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: pattern.name,
            description: pattern.description,
            priority: pattern.priority || 'medium',
            isActive: true,
            createdAt: new Date().toISOString()
        };
        
        this.behaviorPatterns.push(newPattern);
        this.saveBehaviorPatterns();
        
        return newPattern;
    }

    // 更新行为模式
    updateBehaviorPattern(patternId, updates) {
        const pattern = this.behaviorPatterns.find(p => p.id === patternId);
        if (!pattern) {
            return null;
        }
        
        Object.assign(pattern, updates);
        this.saveBehaviorPatterns();
        
        return pattern;
    }

    // 删除行为模式
    deleteBehaviorPattern(patternId) {
        const index = this.behaviorPatterns.findIndex(p => p.id === patternId);
        if (index === -1) {
            return false;
        }
        
        this.behaviorPatterns.splice(index, 1);
        this.saveBehaviorPatterns();
        
        return true;
    }
}

// 导出模块
module.exports = PCECUltimateConstraint;