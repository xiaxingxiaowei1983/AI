const fs = require('fs');
const path = require('path');

// 存储抽象数据的文件路径
const ABSTRACTIONS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_abstractions.json');
const PERSPECTIVES_FILE = path.join(__dirname, '.trae', 'data', 'pcec_perspectives.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '.trae', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class PCECAbstractionGeneration {
    constructor() {
        this.abstractions = this.loadAbstractions();
        this.perspectives = this.loadPerspectives();
    }

    // 加载抽象数据
    loadAbstractions() {
        try {
            if (fs.existsSync(ABSTRACTIONS_FILE)) {
                const data = fs.readFileSync(ABSTRACTIONS_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading abstractions:', error);
        }
        return [];
    }

    // 保存抽象数据
    saveAbstractions() {
        try {
            fs.writeFileSync(ABSTRACTIONS_FILE, JSON.stringify(this.abstractions, null, 2));
        } catch (error) {
            console.error('Error saving abstractions:', error);
        }
    }

    // 加载视角数据
    loadPerspectives() {
        try {
            if (fs.existsSync(PERSPECTIVES_FILE)) {
                const data = fs.readFileSync(PERSPECTIVES_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading perspectives:', error);
        }
        return [];
    }

    // 保存视角数据
    savePerspectives() {
        try {
            fs.writeFileSync(PERSPECTIVES_FILE, JSON.stringify(this.perspectives, null, 2));
        } catch (error) {
            console.error('Error saving perspectives:', error);
        }
    }

    // 生成新抽象
    generateAbstractions(recentProblems) {
        console.log('Generating new abstractions...');
        
        const newAbstractions = [];
        
        // 从最近的问题中生成抽象
        recentProblems.forEach(problem => {
            const abstraction = this.createAbstractionFromProblem(problem);
            if (abstraction) {
                newAbstractions.push(abstraction);
            }
        });
        
        // 合并相似的抽象
        const mergedAbstractions = this.mergeSimilarAbstractions(newAbstractions);
        
        // 保存新抽象
        this.abstractions.push(...mergedAbstractions);
        this.saveAbstractions();
        
        console.log(`Generated ${mergedAbstractions.length} new abstractions`);
        return mergedAbstractions;
    }

    // 从具体问题生成抽象
    createAbstractionFromProblem(problem) {
        // 提取问题的核心要素
        const coreElements = this.extractCoreElements(problem);
        
        // 识别问题模式
        const pattern = this.identifyProblemPattern(coreElements);
        
        // 创建抽象
        const abstraction = {
            id: `abstraction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: this.generateAbstractionName(pattern),
            description: this.generateAbstractionDescription(pattern, coreElements),
            pattern: pattern,
            coreElements: coreElements,
            source: problem.id || 'unknown',
            generality: this.calculateGenerality(coreElements),
            createdAt: new Date().toISOString()
        };
        
        return abstraction;
    }

    // 提取问题的核心要素
    extractCoreElements(problem) {
        // 简单的要素提取逻辑
        // 实际应用中可能需要更复杂的NLP技术
        const elements = {
            inputs: problem.inputs || [],
            outputs: problem.outputs || [],
            constraints: problem.constraints || [],
            goals: problem.goals || [],
            context: problem.context || ''
        };
        
        return elements;
    }

    // 识别问题模式
    identifyProblemPattern(elements) {
        // 基于输入输出和约束识别模式
        let pattern = 'Unknown';
        
        // 简单的模式识别逻辑
        if (elements.inputs.includes('file') && elements.outputs.includes('processed_file')) {
            pattern = 'File Processing';
        } else if (elements.inputs.includes('data') && elements.outputs.includes('analysis')) {
            pattern = 'Data Analysis';
        } else if (elements.inputs.includes('task') && elements.outputs.includes('plan')) {
            pattern = 'Task Planning';
        } else if (elements.inputs.includes('query') && elements.outputs.includes('response')) {
            pattern = 'Query Response';
        }
        
        return pattern;
    }

    // 生成抽象名称
    generateAbstractionName(pattern) {
        return `${pattern} Pattern`;
    }

    // 生成抽象描述
    generateAbstractionDescription(pattern, coreElements) {
        return `Abstract pattern for ${pattern} problems, handling inputs: ${coreElements.inputs.join(', ')} and producing outputs: ${coreElements.outputs.join(', ')}`;
    }

    // 计算抽象的通用性
    calculateGenerality(coreElements) {
        // 基于输入输出的多样性和约束的数量计算通用性
        const inputDiversity = coreElements.inputs.length / 5;
        const outputDiversity = coreElements.outputs.length / 5;
        const constraintFlexibility = 1 - (coreElements.constraints.length / 10);
        
        return Math.min(1, (inputDiversity + outputDiversity + constraintFlexibility) / 3);
    }

    // 合并相似的抽象
    mergeSimilarAbstractions(abstractions) {
        const merged = [];
        const seenPatterns = new Set();
        
        abstractions.forEach(abstraction => {
            if (!seenPatterns.has(abstraction.pattern)) {
                seenPatterns.add(abstraction.pattern);
                merged.push(abstraction);
            } else {
                // 找到相似的抽象并合并
                const existing = merged.find(a => a.pattern === abstraction.pattern);
                if (existing) {
                    existing.generality = Math.max(existing.generality, abstraction.generality);
                    existing.coreElements.inputs = [...new Set([...existing.coreElements.inputs, ...abstraction.coreElements.inputs])];
                    existing.coreElements.outputs = [...new Set([...existing.coreElements.outputs, ...abstraction.coreElements.outputs])];
                }
            }
        });
        
        return merged;
    }

    // 生成新视角
    generatePerspectives(recentBehaviors) {
        console.log('Generating new perspectives...');
        
        const newPerspectives = [];
        
        // 从不同系统结构角度生成视角
        const perspectiveTypes = ['system_designer', 'weak_agent', 'scalability', 'user_centric'];
        
        perspectiveTypes.forEach(type => {
            const perspective = this.createPerspective(type, recentBehaviors);
            if (perspective) {
                newPerspectives.push(perspective);
            }
        });
        
        // 保存新视角
        this.perspectives.push(...newPerspectives);
        this.savePerspectives();
        
        console.log(`Generated ${newPerspectives.length} new perspectives`);
        return newPerspectives;
    }

    // 创建视角
    createPerspective(type, recentBehaviors) {
        let name, description, insights;
        
        switch (type) {
            case 'system_designer':
                name = 'System Designer Perspective';
                description = 'Viewing behaviors from a system design perspective';
                insights = this.generateSystemDesignerInsights(recentBehaviors);
                break;
            case 'weak_agent':
                name = 'Weak Agent Perspective';
                description = 'Viewing behaviors from the perspective of a less capable agent';
                insights = this.generateWeakAgentInsights(recentBehaviors);
                break;
            case 'scalability':
                name = 'Scalability Perspective';
                description = 'Viewing behaviors from a scalability standpoint';
                insights = this.generateScalabilityInsights(recentBehaviors);
                break;
            case 'user_centric':
                name = 'User-Centric Perspective';
                description = 'Viewing behaviors from a user perspective';
                insights = this.generateUserCentricInsights(recentBehaviors);
                break;
            default:
                return null;
        }
        
        return {
            id: `perspective_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            name: name,
            description: description,
            type: type,
            insights: insights,
            createdAt: new Date().toISOString()
        };
    }

    // 生成系统设计者视角的洞察
    generateSystemDesignerInsights(recentBehaviors) {
        return [
            'Identify redundant processes that can be streamlined',
            'Spot architectural bottlenecks in current behavior patterns',
            'Propose modular design improvements',
            'Identify opportunities for better component separation'
        ];
    }

    // 生成能力较弱的Agent视角的洞察
    generateWeakAgentInsights(recentBehaviors) {
        return [
            'Simplify complex tasks into smaller, manageable steps',
            'Identify knowledge gaps that need to be filled',
            'Propose more explicit instructions for complex operations',
            'Develop fallback strategies for failure scenarios'
        ];
    }

    // 生成可扩展性视角的洞察
    generateScalabilityInsights(recentBehaviors) {
        return [
            'Identify operations that will bottleneck at scale',
            'Propose optimizations for high-frequency operations',
            'Design caching strategies for repeated computations',
            'Develop parallel processing approaches for large tasks'
        ];
    }

    // 生成用户中心视角的洞察
    generateUserCentricInsights(recentBehaviors) {
        return [
            'Identify user pain points in current behavior patterns',
            'Propose more intuitive interfaces for complex operations',
            'Develop clearer feedback mechanisms for user actions',
            'Simplify user workflows for common tasks'
        ];
    }

    // 评估抽象的质量
    evaluateAbstractionQuality(abstraction) {
        // 基于通用性、清晰性和实用性评估抽象质量
        const generalityScore = abstraction.generality || 0;
        const clarityScore = this.assessClarity(abstraction);
        const utilityScore = this.assessUtility(abstraction);
        
        return (generalityScore + clarityScore + utilityScore) / 3;
    }

    // 评估抽象的清晰性
    assessClarity(abstraction) {
        // 基于描述的长度和结构评估清晰性
        const descriptionLength = abstraction.description.length;
        const hasPattern = abstraction.pattern && abstraction.pattern !== 'Unknown';
        const hasCoreElements = abstraction.coreElements && 
                              (abstraction.coreElements.inputs.length > 0 || 
                               abstraction.coreElements.outputs.length > 0);
        
        let score = 0.5; // 基础分数
        if (descriptionLength > 50 && descriptionLength < 200) score += 0.2;
        if (hasPattern) score += 0.2;
        if (hasCoreElements) score += 0.1;
        
        return Math.min(1, score);
    }

    // 评估抽象的实用性
    assessUtility(abstraction) {
        // 基于核心要素的完整性评估实用性
        const hasInputs = abstraction.coreElements && abstraction.coreElements.inputs.length > 0;
        const hasOutputs = abstraction.coreElements && abstraction.coreElements.outputs.length > 0;
        const hasContext = abstraction.coreElements && abstraction.coreElements.context.length > 0;
        
        let score = 0;
        if (hasInputs) score += 0.33;
        if (hasOutputs) score += 0.33;
        if (hasContext) score += 0.34;
        
        return score;
    }

    // 获取所有抽象
    getAllAbstractions() {
        return this.abstractions;
    }

    // 获取所有视角
    getAllPerspectives() {
        return this.perspectives;
    }

    // 按类型获取视角
    getPerspectivesByType(type) {
        return this.perspectives.filter(p => p.type === type);
    }

    // 查找与问题相关的抽象
    findRelevantAbstractions(problem) {
        return this.abstractions.filter(abstraction => {
            const problemInputs = new Set(problem.inputs || []);
            const abstractionInputs = new Set(abstraction.coreElements.inputs || []);
            
            // 检查是否有共同的输入
            const hasCommonInputs = [...problemInputs].some(input => abstractionInputs.has(input));
            
            return hasCommonInputs;
        });
    }
}

// 导出模块
module.exports = PCECAbstractionGeneration;