const fs = require('fs');
const path = require('path');

// 存储报告数据的文件路径
const REPORTS_FILE = path.join(__dirname, '.trae', 'data', 'pcec_reports.json');
const REPORT_HISTORY_FILE = path.join(__dirname, '.trae', 'data', 'pcec_report_history.json');

// 确保数据目录存在
const dataDir = path.join(__dirname, '.trae', 'data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

class PCECReporting {
    constructor() {
        this.reports = this.loadReports();
        this.reportHistory = this.loadReportHistory();
        this.reportRecipient = '陈婷（剑锋传奇）'; // 唯一报告对象
    }

    // 加载报告数据
    loadReports() {
        try {
            if (fs.existsSync(REPORTS_FILE)) {
                const data = fs.readFileSync(REPORTS_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading reports:', error);
        }
        return [];
    }

    // 保存报告数据
    saveReports() {
        try {
            fs.writeFileSync(REPORTS_FILE, JSON.stringify(this.reports, null, 2));
        } catch (error) {
            console.error('Error saving reports:', error);
        }
    }

    // 加载报告历史
    loadReportHistory() {
        try {
            if (fs.existsSync(REPORT_HISTORY_FILE)) {
                const data = fs.readFileSync(REPORT_HISTORY_FILE, 'utf8');
                return JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading report history:', error);
        }
        return [];
    }

    // 保存报告历史
    saveReportHistory() {
        try {
            fs.writeFileSync(REPORT_HISTORY_FILE, JSON.stringify(this.reportHistory, null, 2));
        } catch (error) {
            console.error('Error saving report history:', error);
        }
    }

    // 生成进化报告
    generateReport(evolutionResult, mindExplosionResult, products) {
        console.log('Generating evolution report...');
        
        const report = {
            id: `report_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            cycle: evolutionResult.cycle,
            timestamp: new Date().toISOString(),
            evolution: {
                direction: evolutionResult.direction,
                result: evolutionResult.result,
                isSignificant: evolutionResult.isSignificant
            },
            mindExplosion: mindExplosionResult,
            products: products.map(p => ({
                id: p.id,
                name: p.name,
                type: this.getProductType(p),
                quality: this.evaluateProductQuality(p)
            })),
            summary: this.generateReportSummary(evolutionResult, mindExplosionResult, products),
            nextSteps: this.generateNextSteps(evolutionResult, products),
            recipient: this.reportRecipient,
            status: 'generated'
        };
        
        // 保存报告
        this.reports.push(report);
        this.saveReports();
        
        return report;
    }

    // 获取产物类型
    getProductType(product) {
        if (product.inputs && product.outputs) {
            return 'capability_shape';
        } else if (product.applicability && product.implementationSteps) {
            return 'default_strategy';
        } else if (product.condition && product.action) {
            return 'behavior_rule';
        }
        return 'unknown';
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
        if (product.applicability) qualityScore += 0.1;
        if (product.implementationSteps && product.implementationSteps.length > 0) qualityScore += 0.1;
        
        return Math.min(1, qualityScore);
    }

    // 生成报告摘要
    generateReportSummary(evolutionResult, mindExplosionResult, products) {
        let summary = `PCEC Cycle #${evolutionResult.cycle} completed with `;
        
        if (evolutionResult.isSignificant) {
            summary += 'significant evolution. ';
        } else {
            summary += 'moderate evolution. ';
        }
        
        summary += `Evolution direction: ${evolutionResult.direction.type}. `;
        
        if (mindExplosionResult) {
            summary += `Mind explosion generated ${mindExplosionResult.insights.length} insights. `;
        }
        
        if (products.length > 0) {
            summary += `Generated ${products.length} evolution products.`;
        }
        
        return summary;
    }

    // 生成下一步建议
    generateNextSteps(evolutionResult, products) {
        const nextSteps = [];
        
        if (evolutionResult.isSignificant) {
            nextSteps.push('Implement the new capability in production');
            nextSteps.push('Monitor performance and gather feedback');
        }
        
        if (products.length > 0) {
            nextSteps.push('Integrate new products into existing workflows');
            nextSteps.push('Document new capabilities for future reference');
        }
        
        nextSteps.push('Continue monitoring for new evolution opportunities');
        
        return nextSteps;
    }

    // 发送报告
    sendReport(reportId) {
        console.log('Sending evolution report...');
        
        const report = this.reports.find(r => r.id === reportId);
        if (!report) {
            console.error('Report not found:', reportId);
            return null;
        }
        
        // 模拟发送报告（仅向陈婷）
        console.log(`Report sent to ${this.reportRecipient}`);
        
        // 更新报告状态
        report.status = 'sent';
        report.sentAt = new Date().toISOString();
        
        // 记录到报告历史
        this.reportHistory.push({
            reportId: report.id,
            cycle: report.cycle,
            sentAt: report.sentAt,
            recipient: report.recipient,
            summary: report.summary
        });
        
        // 保存更新
        this.saveReports();
        this.saveReportHistory();
        
        return report;
    }

    // 生成详细报告
    generateDetailedReport(reportId) {
        const report = this.reports.find(r => r.id === reportId);
        if (!report) {
            return null;
        }
        
        const detailedReport = {
            ...report,
            detailedEvolution: this.generateDetailedEvolution(report.evolution),
            detailedProducts: this.generateDetailedProducts(report.products),
            mindExplosionDetails: this.generateMindExplosionDetails(report.mindExplosion),
            generatedAt: new Date().toISOString()
        };
        
        return detailedReport;
    }

    // 生成详细的进化信息
    generateDetailedEvolution(evolution) {
        return {
            direction: evolution.direction,
            result: evolution.result,
            significance: evolution.isSignificant ? 'High' : 'Medium',
            potentialImpact: this.calculatePotentialImpact(evolution)
        };
    }

    // 生成详细的产物信息
    generateDetailedProducts(products) {
        return products.map(product => ({
            ...product,
            qualityLevel: this.getQualityLevel(product.quality)
        }));
    }

    // 生成详细的思维爆炸信息
    generateMindExplosionDetails(mindExplosion) {
        if (!mindExplosion) return null;
        
        return {
            question: mindExplosion.question,
            insights: mindExplosion.insights,
            impact: mindExplosion.potentialImpact,
            impactLevel: this.getImpactLevel(mindExplosion.potentialImpact)
        };
    }

    // 计算潜在影响
    calculatePotentialImpact(evolution) {
        let impactScore = 0;
        
        if (evolution.isSignificant) impactScore += 0.5;
        
        const result = evolution.result;
        if (result.feature) impactScore += 0.3;
        if (result.abstraction) impactScore += 0.2;
        if (result.lever) impactScore += 0.2;
        
        return Math.min(1, impactScore);
    }

    // 获取质量等级
    getQualityLevel(quality) {
        if (quality >= 0.8) return 'High';
        if (quality >= 0.6) return 'Medium';
        return 'Low';
    }

    // 获取影响等级
    getImpactLevel(impact) {
        if (impact >= 0.7) return 'High';
        if (impact >= 0.4) return 'Medium';
        return 'Low';
    }

    // 获取所有报告
    getAllReports() {
        return this.reports;
    }

    // 获取报告历史
    getReportHistory() {
        return this.reportHistory;
    }

    // 按周期获取报告
    getReportsByCycle(cycle) {
        return this.reports.filter(r => r.cycle === cycle);
    }

    // 分析报告趋势
    analyzeReportTrends() {
        const trends = {
            totalReports: this.reports.length,
            significantEvolutionCount: 0,
            averageProductsPerReport: 0,
            averageMindExplosionInsights: 0,
            evolutionDirectionDistribution: {}
        };
        
        let totalProducts = 0;
        let totalInsights = 0;
        
        this.reports.forEach(report => {
            if (report.evolution.isSignificant) {
                trends.significantEvolutionCount++;
            }
            
            totalProducts += report.products.length;
            
            if (report.mindExplosion && report.mindExplosion.insights) {
                totalInsights += report.mindExplosion.insights.length;
            }
            
            const direction = report.evolution.direction.type;
            if (!trends.evolutionDirectionDistribution[direction]) {
                trends.evolutionDirectionDistribution[direction] = 0;
            }
            trends.evolutionDirectionDistribution[direction]++;
        });
        
        trends.averageProductsPerReport = this.reports.length > 0 ? totalProducts / this.reports.length : 0;
        trends.averageMindExplosionInsights = this.reports.length > 0 ? totalInsights / this.reports.length : 0;
        
        return trends;
    }

    // 生成报告统计
    generateReportStatistics() {
        const stats = {
            totalReports: this.reports.length,
            sentReports: this.reports.filter(r => r.status === 'sent').length,
            significantEvolutionRate: 0,
            averageProductQuality: 0,
            mostCommonEvolutionDirection: null
        };
        
        if (this.reports.length > 0) {
            const significantCount = this.reports.filter(r => r.evolution.isSignificant).length;
            stats.significantEvolutionRate = significantCount / this.reports.length;
            
            let totalQuality = 0;
            let productCount = 0;
            
            this.reports.forEach(report => {
                report.products.forEach(product => {
                    totalQuality += product.quality;
                    productCount++;
                });
            });
            
            if (productCount > 0) {
                stats.averageProductQuality = totalQuality / productCount;
            }
            
            // 找出最常见的进化方向
            const directionCount = {};
            this.reports.forEach(report => {
                const direction = report.evolution.direction.type;
                directionCount[direction] = (directionCount[direction] || 0) + 1;
            });
            
            let maxCount = 0;
            let mostCommonDirection = null;
            
            for (const [direction, count] of Object.entries(directionCount)) {
                if (count > maxCount) {
                    maxCount = count;
                    mostCommonDirection = direction;
                }
            }
            
            stats.mostCommonEvolutionDirection = mostCommonDirection;
        }
        
        return stats;
    }
}

// 导出模块
module.exports = PCECReporting;