const fs = require('fs');
const path = require('path');

// 存储思维爆炸结果的文件路径
const MIND_EXPLOSION_FILE = path.join(__dirname, '.trae', 'data', 'pcec_mind_explosion.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '.trae', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class PCECMindExplosion {
    constructor() {
        this.mindExplosions = this.loadMindExplosions();
    }

    // 加载思维爆炸结果
    loadMindExplosions() {
        try {
            if (fs.existsSync(MIND_EXPLOSION_FILE)) {
                const data = fs.readFileSync(MIND_EXPLOSION_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading mind explosions:', error);
        }
        return [];
    }

    // 保存思维爆炸结果
    saveMindExplosions() {
        try {
            fs.writeFileSync(MIND_EXPLOSION_FILE, JSON.stringify(this.mindExplosions, null, 2));
        } catch (error) {
            console.error('Error saving mind explosions:', error);
        }
    }

    // 执行思维爆炸
    performMindExplosion() {
        console.log('Performing mind explosion...');
        
        // 选择一个思维爆炸问题
        const question = this.selectMindExplosionQuestion();
        console.log(`Selected question: ${question}`);
        
        // 生成思维爆炸结果
        const explosionResult = this.generateMindExplosion(question);
        
        // 保存结果
        this.mindExplosions.push(explosionResult);
        this.saveMindExplosions();
        
        console.log(`Generated ${explosionResult.insights.length} insights from mind explosion`);
        return explosionResult;
    }

    // 选择思维爆炸问题
    selectMindExplosionQuestion() {
        const questions = [
            'If I completely overthrow current default practices, what happens?',
            'If I were a system designer instead of an executor, what would I delete?',
            'If I needed to make a 10x weaker agent succeed, what would I add?',
            'If this capability were called 1000 times, would the current design necessarily collapse?'
        ];
        
        // 随机选择一个问题
        return questions[Math.floor(Math.random() * questions.length)];
    }

    // 生成思维爆炸结果
    generateMindExplosion(question) {
        let insights = [];
        
        // 根据问题类型生成不同的洞察
        if (question.includes('overthrow current default practices')) {
            insights = this.generateOverthrowInsights();
        } else if (question.includes('system designer instead of an executor')) {
            insights = this.generateSystemDesignerInsights();
        } else if (question.includes('10x weaker agent')) {
            insights = this.generateWeakAgentInsights();
        } else if (question.includes('called 1000 times')) {
            insights = this.generateScalabilityInsights();
        }
        
        return {
            id: `explosion_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            question: question,
            insights: insights,
            createdAt: new Date().toISOString(),
            potentialImpact: this.calculatePotentialImpact(insights)
        };
    }

    // 生成推翻默认做法的洞察
    generateOverthrowInsights() {
        return [
            'Eliminating rigid step-by-step processes could enable more flexible, context-aware execution',
            'Removing predefined tool usage patterns could allow for more creative problem-solving approaches',
            'Abandoning fixed response formats could lead to more natural and adaptive interactions',
            'Challenging the assumption of linear task execution could enable parallel processing of sub-tasks',
            'Overthrowing the current error handling approach could lead to more resilient and adaptive systems'
        ];
    }

    // 生成系统设计者视角的洞察
    generateSystemDesignerInsights() {
        return [
            'Removing redundant validation steps that add complexity without significant value',
            'Eliminating overly rigid constraints that limit adaptability in different contexts',
            'Deleting outdated compatibility layers that no longer serve a purpose',
            'Removing unnecessary abstraction layers that complicate the system',
            'Eliminating unused features that bloat the codebase and increase maintenance cost'
        ];
    }

    // 生成能力较弱的Agent视角的洞察
    generateWeakAgentInsights() {
        return [
            'Adding more explicit step-by-step instructions for complex tasks',
            'Implementing more robust error handling and recovery mechanisms',
            'Creating simpler interfaces with clearer inputs and outputs',
            'Adding more detailed documentation and examples for common use cases',
            'Implementing progressive complexity, starting with basic functionality and adding advanced features as capability improves'
        ];
    }

    // 生成可扩展性视角的洞察
    generateScalabilityInsights() {
        return [
            'Implementing caching mechanisms for frequently accessed data to reduce redundant operations',
            'Designing more efficient data structures to handle increased load',
            'Implementing parallel processing for computationally intensive tasks',
            'Creating a more modular architecture to allow for horizontal scaling',
            'Optimizing resource usage to handle increased concurrency without degradation'
        ];
    }

    // 计算思维爆炸的潜在影响
    calculatePotentialImpact(insights) {
        // 基于洞察的数量和质量评估潜在影响
        let impactScore = 0;
        
        // 每个洞察贡献一定的基础分数
        impactScore += insights.length * 0.1;
        
        // 评估洞察的质量（基于长度和具体性）
        insights.forEach(insight => {
            if (insight.length > 50) impactScore += 0.05;
            if (insight.includes('implementing') || insight.includes('creating')) impactScore += 0.1;
            if (insight.includes('optimizing') || insight.includes('improving')) impactScore += 0.08;
        });
        
        return Math.min(1, impactScore);
    }

    // 评估思维爆炸结果
    evaluateMindExplosion(explosionId) {
        const explosion = this.mindExplosions.find(e => e.id === explosionId);
        if (!explosion) {
            throw new Error(`Mind explosion with id ${explosionId} not found`);
        }
        
        // 评估洞察的实用性和创新性
        const utilityScore = this.evaluateInsightUtility(explosion.insights);
        const innovationScore = this.evaluateInsightInnovation(explosion.insights);
        
        return {
            explosionId: explosionId,
            utilityScore: utilityScore,
            innovationScore: innovationScore,
            overallScore: (utilityScore + innovationScore) / 2,
            evaluatedAt: new Date().toISOString()
        };
    }

    // 评估洞察的实用性
    evaluateInsightUtility(insights) {
        let utilityScore = 0;
        
        insights.forEach(insight => {
            if (insight.includes('implementing')) utilityScore += 0.2;
            if (insight.includes('creating')) utilityScore += 0.15;
            if (insight.includes('optimizing')) utilityScore += 0.18;
            if (insight.includes('improving')) utilityScore += 0.15;
            if (insight.includes('reducing')) utilityScore += 0.12;
        });
        
        return Math.min(1, utilityScore);
    }

    // 评估洞察的创新性
    evaluateInsightInnovation(insights) {
        let innovationScore = 0;
        
        insights.forEach(insight => {
            if (insight.includes('overthrow')) innovationScore += 0.25;
            if (insight.includes('reimagining')) innovationScore += 0.2;
            if (insight.includes('radical')) innovationScore += 0.22;
            if (insight.includes('transform')) innovationScore += 0.18;
            if (insight.includes('disrupt')) innovationScore += 0.2;
        });
        
        return Math.min(1, innovationScore);
    }

    // 应用思维爆炸洞察
    applyMindExplosionInsights(explosionId) {
        const explosion = this.mindExplosions.find(e => e.id === explosionId);
        if (!explosion) {
            return null;
        }
        
        console.log(`Applying insights from mind explosion: ${explosion.question}`);
        
        // 生成应用计划
        const applicationPlan = this.generateApplicationPlan(explosion.insights);
        
        // 标记为已应用
        explosion.status = 'applied';
        explosion.appliedAt = new Date().toISOString();
        explosion.applicationPlan = applicationPlan;
        
        this.saveMindExplosions();
        
        return applicationPlan;
    }

    // 生成洞察应用计划
    generateApplicationPlan(insights) {
        const plan = {
            steps: [],
            timeline: 'Short-term',
            expectedOutcomes: []
        };
        
        // 为每个洞察创建应用步骤
        insights.forEach((insight, index) => {
            plan.steps.push({
                id: `step_${index + 1}`,
                description: `Implement: ${insight.substring(0, 50)}...`,
                priority: index < 2 ? 'high' : 'medium',
                estimatedEffort: index < 2 ? 'medium' : 'low'
            });
        });
        
        // 生成预期结果
        plan.expectedOutcomes = [
            'Improved system performance',
            'Increased adaptability to different contexts',
            'Enhanced user experience',
            'Reduced operational complexity'
        ];
        
        return plan;
    }

    // 获取所有思维爆炸结果
    getAllMindExplosions() {
        return this.mindExplosions;
    }

    // 获取未应用的思维爆炸结果
    getUnappliedMindExplosions() {
        return this.mindExplosions.filter(e => !e.status || e.status !== 'applied');
    }

    // 分析思维爆炸趋势
    analyzeMindExplosionTrends() {
        const trends = {
            byQuestionType: {},
            averageImpact: 0,
            mostCommonInsightThemes: []
        };
        
        // 按问题类型分析
        this.mindExplosions.forEach(explosion => {
            let questionType;
            if (explosion.question.includes('overthrow')) {
                questionType = 'overthrow';
            } else if (explosion.question.includes('system designer')) {
                questionType = 'system_designer';
            } else if (explosion.question.includes('weaker agent')) {
                questionType = 'weak_agent';
            } else if (explosion.question.includes('1000 times')) {
                questionType = 'scalability';
            }
            
            if (!trends.byQuestionType[questionType]) {
                trends.byQuestionType[questionType] = {
                    count: 0,
                    totalImpact: 0
                };
            }
            
            trends.byQuestionType[questionType].count++;
            trends.byQuestionType[questionType].totalImpact += explosion.potentialImpact || 0;
        });
        
        // 计算平均影响
        let totalImpact = 0;
        let totalExplosions = 0;
        
        for (const [type, data] of Object.entries(trends.byQuestionType)) {
            const avgImpact = data.totalImpact / data.count;
            trends.byQuestionType[type].averageImpact = avgImpact;
            totalImpact += data.totalImpact;
            totalExplosions += data.count;
        }
        
        trends.averageImpact = totalExplosions > 0 ? totalImpact / totalExplosions : 0;
        
        // 分析最常见的洞察主题
        trends.mostCommonInsightThemes = this.identifyCommonThemes();
        
        return trends;
    }

    // 识别常见的洞察主题
    identifyCommonThemes() {
        const themeCount = {};
        
        // 关键词主题映射
        const themeKeywords = {
            'optimization': ['optimize', 'efficiency', 'performance'],
            'simplicity': ['simple', 'simplify', 'reduce complexity'],
            'robustness': ['robust', 'resilient', 'error handling'],
            'scalability': ['scale', 'scalable', 'concurrency'],
            'modularity': ['modular', 'component', 'decouple']
        };
        
        // 分析每个洞察
        this.mindExplosions.forEach(explosion => {
            explosion.insights.forEach(insight => {
                for (const [theme, keywords] of Object.entries(themeKeywords)) {
                    if (keywords.some(keyword => insight.toLowerCase().includes(keyword))) {
                        themeCount[theme] = (themeCount[theme] || 0) + 1;
                    }
                }
            });
        });
        
        // 按频率排序并返回前3个主题
        return Object.entries(themeCount)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([theme, count]) => ({ theme, count }));
    }
}

// 导出模块
module.exports = PCECMindExplosion;