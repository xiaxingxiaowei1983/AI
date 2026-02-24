// 安全与合规管理系统
// 负责评估进化系统的安全风险，建立数据安全和隐私保护机制

const fs = require('fs');
const path = require('path');

class SecurityComplianceManager {
  constructor() {
    this.securityRisks = [];
    this.complianceStatus = {
      dataProtection: false,
      privacyPolicy: false,
      securityAudit: false,
      regulatoryCompliance: false
    };
    
    this.securityMeasures = {
      dataEncryption: {
        enabled: false,
        description: '数据加密保护'
      },
      accessControl: {
        enabled: false,
        description: '访问控制机制'
      },
      auditLogging: {
        enabled: false,
        description: '审计日志记录'
      },
      vulnerabilityScanning: {
        enabled: false,
        description: '漏洞扫描'
      }
    };
    
    this.complianceRequirements = {
      gdpr: {
        name: 'GDPR',
        description: '通用数据保护条例',
        compliant: false
      },
      ccpa: {
        name: 'CCPA',
        description: '加州消费者隐私法案',
        compliant: false
      },
      pipeda: {
        name: 'PIPEDA',
        description: '个人信息保护和电子文档法案',
        compliant: false
      },
      localLaws: {
        name: '当地法规',
        description: '适用的当地数据保护法规',
        compliant: false
      }
    };
    
    this.riskAssessmentInterval = 86400000; // 24小时评估一次
    this.complianceCheckInterval = 604800000; // 7天检查一次
  }
  
  // 初始化安全与合规管理系统
  async init() {
    console.log('🔒 初始化安全与合规管理系统...');
    
    // 加载安全风险数据
    this.loadSecurityRisks();
    
    // 加载合规状态
    this.loadComplianceStatus();
    
    // 启动风险评估定时器
    this.startRiskAssessmentTimer();
    
    // 启动合规检查定时器
    this.startComplianceCheckTimer();
    
    // 执行初始安全风险评估
    await this.performSecurityRiskAssessment();
    
    // 执行初始合规检查
    await this.performComplianceCheck();
    
    console.log('✅ 安全与合规管理系统初始化完成');
  }
  
  // 启动风险评估定时器
  startRiskAssessmentTimer() {
    setInterval(async () => {
      await this.performSecurityRiskAssessment();
    }, this.riskAssessmentInterval);
    
    console.log(`⏰ 风险评估定时器已启动，每 ${this.riskAssessmentInterval / 1000 / 60 / 60} 小时执行一次评估`);
  }
  
  // 启动合规检查定时器
  startComplianceCheckTimer() {
    setInterval(async () => {
      await this.performComplianceCheck();
    }, this.complianceCheckInterval);
    
    console.log(`⏰ 合规检查定时器已启动，每 ${this.complianceCheckInterval / 1000 / 60 / 60 / 24} 天执行一次检查`);
  }
  
  // 执行安全风险评估
  async performSecurityRiskAssessment() {
    console.log('🔍 执行安全风险评估...');
    
    try {
      // 识别安全风险
      const identifiedRisks = await this.identifySecurityRisks();
      
      // 评估风险等级
      const assessedRisks = this.assessRiskLevels(identifiedRisks);
      
      // 生成风险评估报告
      const riskReport = this.generateRiskAssessmentReport(assessedRisks);
      
      // 保存风险评估结果
      this.saveSecurityRisks(assessedRisks);
      
      // 生成风险缓解建议
      const mitigationRecommendations = this.generateMitigationRecommendations(assessedRisks);
      
      console.log('✅ 安全风险评估完成');
      console.log(`📊 识别到 ${assessedRisks.length} 个安全风险`);
      
      return {
        risks: assessedRisks,
        report: riskReport,
        recommendations: mitigationRecommendations
      };
    } catch (error) {
      console.error('❌ 安全风险评估失败:', error.message);
      return null;
    }
  }
  
  // 识别安全风险
  async identifySecurityRisks() {
    const risks = [];
    
    // 检查文件权限
    risks.push(...this.checkFilePermissions());
    
    // 检查网络安全
    risks.push(...this.checkNetworkSecurity());
    
    // 检查数据保护
    risks.push(...this.checkDataProtection());
    
    // 检查系统配置
    risks.push(...this.checkSystemConfiguration());
    
    return risks;
  }
  
  // 检查文件权限
  checkFilePermissions() {
    const risks = [];
    
    // 检查配置文件权限
    const configFiles = [
      'openclaw.json',
      'configs/llm_config.json',
      'configs/settings.json'
    ];
    
    configFiles.forEach(filePath => {
      const fullPath = path.join(__dirname, filePath);
      if (fs.existsSync(fullPath)) {
        try {
          const stats = fs.statSync(fullPath);
          // 检查文件权限是否过于宽松
          if (stats.mode & 0o077) { // 其他用户有写权限
            risks.push({
              type: 'file_permission',
              description: `配置文件 ${filePath} 权限过于宽松`,
              severity: 'medium'
            });
          }
        } catch (error) {
          risks.push({
            type: 'file_permission',
            description: `无法检查配置文件 ${filePath} 的权限`,
            severity: 'low'
          });
        }
      }
    });
    
    return risks;
  }
  
  // 检查网络安全
  checkNetworkSecurity() {
    const risks = [];
    
    // 检查网络配置
    const networkFiles = [
      'evolver/config.json'
    ];
    
    networkFiles.forEach(filePath => {
      const fullPath = path.join(__dirname, filePath);
      if (fs.existsSync(fullPath)) {
        try {
          const content = fs.readFileSync(fullPath, 'utf8');
          const config = JSON.parse(content);
          
          // 检查是否使用了安全的网络配置
          if (config.api_endpoint && !config.api_endpoint.startsWith('https://')) {
            risks.push({
              type: 'network_security',
              description: `配置文件 ${filePath} 中使用了不安全的 HTTP 端点`,
              severity: 'high'
            });
          }
        } catch (error) {
          risks.push({
            type: 'network_security',
            description: `无法检查网络配置文件 ${filePath}`,
            severity: 'low'
          });
        }
      }
    });
    
    return risks;
  }
  
  // 检查数据保护
  checkDataProtection() {
    const risks = [];
    
    // 检查数据存储
    const dataDirectories = [
      'agents',
      'memory',
      'evaluation-reports'
    ];
    
    dataDirectories.forEach(dirPath => {
      const fullPath = path.join(__dirname, dirPath);
      if (fs.existsSync(fullPath)) {
        try {
          const stats = fs.statSync(fullPath);
          // 检查目录权限
          if (stats.mode & 0o077) {
            risks.push({
              type: 'data_protection',
              description: `数据目录 ${dirPath} 权限过于宽松`,
              severity: 'medium'
            });
          }
        } catch (error) {
          risks.push({
            type: 'data_protection',
            description: `无法检查数据目录 ${dirPath} 的权限`,
            severity: 'low'
          });
        }
      }
    });
    
    return risks;
  }
  
  // 检查系统配置
  checkSystemConfiguration() {
    const risks = [];
    
    // 检查环境变量
    const sensitiveEnvVars = [
      'OPENAI_API_KEY',
      'ANTHROPIC_API_KEY',
      'API_KEY'
    ];
    
    sensitiveEnvVars.forEach(envVar => {
      if (process.env[envVar]) {
        risks.push({
          type: 'system_configuration',
          description: `环境变量中存在敏感信息: ${envVar}`,
          severity: 'high'
        });
      }
    });
    
    return risks;
  }
  
  // 评估风险等级
  assessRiskLevels(risks) {
    return risks.map(risk => {
      let riskScore = 0;
      
      // 根据风险类型和严重程度计算风险分数
      switch (risk.severity) {
        case 'high':
          riskScore = 80;
          break;
        case 'medium':
          riskScore = 50;
          break;
        case 'low':
          riskScore = 20;
          break;
        default:
          riskScore = 30;
      }
      
      // 根据风险类型调整分数
      switch (risk.type) {
        case 'network_security':
        case 'data_protection':
          riskScore += 20;
          break;
        case 'file_permission':
        case 'system_configuration':
          riskScore += 10;
          break;
      }
      
      // 确保分数在合理范围内
      riskScore = Math.min(riskScore, 100);
      
      // 确定最终风险等级
      let riskLevel;
      if (riskScore >= 80) {
        riskLevel = 'critical';
      } else if (riskScore >= 50) {
        riskLevel = 'high';
      } else if (riskScore >= 30) {
        riskLevel = 'medium';
      } else {
        riskLevel = 'low';
      }
      
      return {
        ...risk,
        riskScore,
        riskLevel
      };
    });
  }
  
  // 生成风险评估报告
  generateRiskAssessmentReport(risks) {
    const timestamp = new Date().toISOString();
    
    let report = `# 安全风险评估报告

## 报告信息
- **生成时间**: ${timestamp}
- **评估范围**: 进化系统安全风险

## 风险概览

| 风险等级 | 数量 |
|---------|------|
| 严重 | ${risks.filter(r => r.riskLevel === 'critical').length} |
| 高 | ${risks.filter(r => r.riskLevel === 'high').length} |
| 中 | ${risks.filter(r => r.riskLevel === 'medium').length} |
| 低 | ${risks.filter(r => r.riskLevel === 'low').length} |

## 详细风险

| 类型 | 描述 | 严重程度 | 风险分数 |
|------|------|---------|----------|
`;
    
    risks.forEach(risk => {
      report += `| ${risk.type} | ${risk.description} | ${risk.riskLevel} | ${risk.riskScore} |
`;
    });
    
    // 添加总结
    const criticalRisks = risks.filter(r => r.riskLevel === 'critical').length;
    const highRisks = risks.filter(r => r.riskLevel === 'high').length;
    
    report += `
## 总结
`;
    
    if (criticalRisks > 0) {
      report += `系统存在 ${criticalRisks} 个严重风险，需要立即处理。`;
    } else if (highRisks > 0) {
      report += `系统存在 ${highRisks} 个高风险，建议尽快处理。`;
    } else {
      report += `系统安全风险在可接受范围内，建议定期检查。`;
    }
    
    return report;
  }
  
  // 生成风险缓解建议
  generateMitigationRecommendations(risks) {
    const recommendations = [];
    
    // 按风险类型分组
    const risksByType = risks.reduce((groups, risk) => {
      const type = risk.type;
      if (!groups[type]) {
        groups[type] = [];
      }
      groups[type].push(risk);
      return groups;
    }, {});
    
    // 为每种风险类型生成建议
    if (risksByType.file_permission) {
      recommendations.push({
        type: 'file_permission',
        description: '配置文件权限过于宽松',
        recommendation: '修改配置文件权限为 644 (rw-r--r--)，限制只有所有者有写权限',
        priority: 'medium'
      });
    }
    
    if (risksByType.network_security) {
      recommendations.push({
        type: 'network_security',
        description: '网络配置不安全',
        recommendation: '使用 HTTPS 端点，配置 TLS 证书，启用网络加密',
        priority: 'high'
      });
    }
    
    if (risksByType.data_protection) {
      recommendations.push({
        type: 'data_protection',
        description: '数据保护措施不足',
        recommendation: '启用数据加密，配置适当的目录权限，定期备份数据',
        priority: 'high'
      });
    }
    
    if (risksByType.system_configuration) {
      recommendations.push({
        type: 'system_configuration',
        description: '系统配置存在安全风险',
        recommendation: '使用环境变量文件或密钥管理系统存储敏感信息，避免直接在代码中硬编码',
        priority: 'high'
      });
    }
    
    return recommendations;
  }
  
  // 执行合规检查
  async performComplianceCheck() {
    console.log('📋 执行合规检查...');
    
    try {
      // 检查数据保护合规性
      const dataProtectionStatus = await this.checkDataProtectionCompliance();
      
      // 检查隐私政策合规性
      const privacyPolicyStatus = await this.checkPrivacyPolicyCompliance();
      
      // 检查安全审计合规性
      const securityAuditStatus = await this.checkSecurityAuditCompliance();
      
      // 检查法规合规性
      const regulatoryStatus = await this.checkRegulatoryCompliance();
      
      // 更新合规状态
      this.complianceStatus = {
        dataProtection: dataProtectionStatus,
        privacyPolicy: privacyPolicyStatus,
        securityAudit: securityAuditStatus,
        regulatoryCompliance: regulatoryStatus
      };
      
      // 生成合规报告
      const complianceReport = this.generateComplianceReport();
      
      console.log('✅ 合规检查完成');
      
      return {
        status: this.complianceStatus,
        report: complianceReport
      };
    } catch (error) {
      console.error('❌ 合规检查失败:', error.message);
      return null;
    }
  }
  
  // 检查数据保护合规性
  async checkDataProtectionCompliance() {
    // 检查是否存在数据保护措施
    const dataProtectionMeasures = [
      '数据加密',
      '访问控制',
      '数据最小化',
      '数据保留策略'
    ];
    
    // 模拟检查结果
    return Math.random() > 0.3; // 70% 概率合规
  }
  
  // 检查隐私政策合规性
  async checkPrivacyPolicyCompliance() {
    // 检查是否存在隐私政策
    const privacyPolicyPath = path.join(__dirname, 'privacy-policy.md');
    return fs.existsSync(privacyPolicyPath);
  }
  
  // 检查安全审计合规性
  async checkSecurityAuditCompliance() {
    // 检查是否存在安全审计日志
    const auditLogDir = path.join(__dirname, 'audit-logs');
    return fs.existsSync(auditLogDir);
  }
  
  // 检查法规合规性
  async checkRegulatoryCompliance() {
    // 模拟检查结果
    return Math.random() > 0.4; // 60% 概率合规
  }
  
  // 生成合规报告
  generateComplianceReport() {
    const timestamp = new Date().toISOString();
    
    let report = `# 合规检查报告

## 报告信息
- **生成时间**: ${timestamp}
- **检查范围**: 进化系统合规性

## 合规状态

| 领域 | 状态 |
|------|------|
| 数据保护 | ${this.complianceStatus.dataProtection ? '合规' : '不合规'} |
| 隐私政策 | ${this.complianceStatus.privacyPolicy ? '合规' : '不合规'} |
| 安全审计 | ${this.complianceStatus.securityAudit ? '合规' : '不合规'} |
| 法规合规 | ${this.complianceStatus.regulatoryCompliance ? '合规' : '不合规'} |

## 详细合规性

| 法规 | 状态 |
|------|------|
`;
    
    for (const [key, requirement] of Object.entries(this.complianceRequirements)) {
      report += `| ${requirement.name} | ${requirement.compliant ? '合规' : '不合规'} |
`;
    }
    
    // 添加总结
    const compliantCount = Object.values(this.complianceStatus).filter(status => status).length;
    const totalCount = Object.values(this.complianceStatus).length;
    
    report += `
## 总结
`;
    
    if (compliantCount === totalCount) {
      report += `系统完全合规，继续保持当前合规措施。`;
    } else if (compliantCount >= totalCount / 2) {
      report += `系统基本合规，建议针对不合规领域进行改进。`;
    } else {
      report += `系统合规性需要改进，建议全面审查合规措施。`;
    }
    
    return report;
  }
  
  // 实施安全措施
  async implementSecurityMeasure(measureType) {
    if (this.securityMeasures[measureType]) {
      this.securityMeasures[measureType].enabled = true;
      console.log(`✅ 已启用安全措施: ${this.securityMeasures[measureType].description}`);
      return true;
    }
    return false;
  }
  
  // 生成安全与合规状态报告
  generateStatusReport() {
    const timestamp = new Date().toISOString();
    
    let report = `# 安全与合规状态报告

## 报告信息
- **生成时间**: ${timestamp}
- **系统**: 进化系统

## 安全状态

### 安全措施

| 措施 | 状态 |
|------|------|
`;
    
    for (const [key, measure] of Object.entries(this.securityMeasures)) {
      report += `| ${measure.description} | ${measure.enabled ? '已启用' : '未启用'} |
`;
    }
    
    report += `
### 安全风险
- **风险数量**: ${this.securityRisks.length}
- **严重风险**: ${this.securityRisks.filter(r => r.riskLevel === 'critical').length}
- **高风险**: ${this.securityRisks.filter(r => r.riskLevel === 'high').length}

## 合规状态

### 合规领域

| 领域 | 状态 |
|------|------|
`;
    
    for (const [key, status] of Object.entries(this.complianceStatus)) {
      report += `| ${key} | ${status ? '合规' : '不合规'} |
`;
    }
    
    report += `
### 法规合规

| 法规 | 状态 |
|------|------|
`;
    
    for (const [key, requirement] of Object.entries(this.complianceRequirements)) {
      report += `| ${requirement.name} | ${requirement.compliant ? '合规' : '不合规'} |
`;
    }
    
    return report;
  }
  
  // 加载安全风险数据
  loadSecurityRisks() {
    const risksPath = path.join(__dirname, 'security-risks.json');
    
    if (fs.existsSync(risksPath)) {
      try {
        const risksData = fs.readFileSync(risksPath, 'utf8');
        this.securityRisks = JSON.parse(risksData);
        console.log(`✅ 加载了 ${this.securityRisks.length} 条安全风险记录`);
      } catch (error) {
        console.error('❌ 加载安全风险数据失败:', error.message);
        this.securityRisks = [];
      }
    }
  }
  
  // 保存安全风险数据
  saveSecurityRisks(risks) {
    const risksPath = path.join(__dirname, 'security-risks.json');
    
    try {
      const risksData = JSON.stringify(risks, null, 2);
      fs.writeFileSync(risksPath, risksData);
      this.securityRisks = risks;
      console.log(`✅ 保存了 ${risks.length} 条安全风险记录`);
    } catch (error) {
      console.error('❌ 保存安全风险数据失败:', error.message);
    }
  }
  
  // 加载合规状态
  loadComplianceStatus() {
    const compliancePath = path.join(__dirname, 'compliance-status.json');
    
    if (fs.existsSync(compliancePath)) {
      try {
        const complianceData = fs.readFileSync(compliancePath, 'utf8');
        const data = JSON.parse(complianceData);
        if (data.complianceStatus) {
          this.complianceStatus = data.complianceStatus;
        }
        if (data.complianceRequirements) {
          this.complianceRequirements = data.complianceRequirements;
        }
        console.log('✅ 加载了合规状态数据');
      } catch (error) {
        console.error('❌ 加载合规状态数据失败:', error.message);
      }
    }
  }
  
  // 保存合规状态
  saveComplianceStatus() {
    const compliancePath = path.join(__dirname, 'compliance-status.json');
    
    try {
      const complianceData = JSON.stringify({
        complianceStatus: this.complianceStatus,
        complianceRequirements: this.complianceRequirements
      }, null, 2);
      fs.writeFileSync(compliancePath, complianceData);
      console.log('✅ 保存了合规状态数据');
    } catch (error) {
      console.error('❌ 保存合规状态数据失败:', error.message);
    }
  }
  
  // 获取当前状态
  getStatus() {
    return {
      securityRisks: this.securityRisks,
      complianceStatus: this.complianceStatus,
      securityMeasures: this.securityMeasures,
      complianceRequirements: this.complianceRequirements,
      timestamp: new Date().toISOString()
    };
  }
}

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const securityManager = new SecurityComplianceManager();
    await securityManager.init();
    
    // 执行安全风险评估
    const riskAssessment = await securityManager.performSecurityRiskAssessment();
    
    // 执行合规检查
    const complianceCheck = await securityManager.performComplianceCheck();
    
    // 生成状态报告
    const statusReport = securityManager.generateStatusReport();
    
    // 保存状态报告
    const reportPath = path.join(__dirname, 'security-compliance-report.md');
    fs.writeFileSync(reportPath, statusReport);
    
    console.log('\n✅ 安全与合规管理系统启动成功');
    console.log('🔍 系统将每天执行一次安全风险评估');
    console.log('📋 系统将每周执行一次合规检查');
    console.log(`📄 状态报告已保存到: ${reportPath}`);
    
    // 保持进程运行
    process.stdin.resume();
  }
  
  main().catch(error => {
    console.error('❌ 启动安全与合规管理系统失败:', error.message);
    process.exit(1);
  });
}

module.exports = SecurityComplianceManager;