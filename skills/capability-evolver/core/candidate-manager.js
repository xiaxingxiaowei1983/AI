/**
 * 能力候选池管理器
 * 负责接收、管理和评估能力候选
 */

const fs = require('fs');
const path = require('path');

class CandidateManager {
  constructor() {
    this.candidatesDir = path.join(__dirname, '..', 'data', 'candidates');
    this.candidates = this.loadCandidates();
  }

  // 加载能力候选
  loadCandidates() {
    const candidates = [];
    
    try {
      const files = fs.readdirSync(this.candidatesDir);
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.candidatesDir, file);
          const candidate = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          candidates.push(candidate);
        }
      });
    } catch (error) {
      console.warn('Error loading candidates:', error.message);
    }
    
    return candidates;
  }

  // 保存能力候选
  saveCandidate(candidate) {
    const filePath = path.join(this.candidatesDir, `${candidate.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(candidate, null, 2));
  }

  // 添加能力候选
  addCandidate(candidateData) {
    const candidate = {
      id: `cap_candidate_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: candidateData.name,
      description: candidateData.description,
      source: candidateData.source || 'execution',
      context: candidateData.context || '',
      timestamp: Date.now(),
      status: 'candidate',
      usageCount: candidateData.usageCount || 1,
      lastUsed: Date.now(),
      potential: this.evaluatePotential(candidateData),
      metadata: candidateData.metadata || {}
    };

    this.candidates.push(candidate);
    this.saveCandidate(candidate);
    
    return candidate;
  }

  // 评估能力候选潜力
  evaluatePotential(candidateData) {
    let potential = 'medium';
    
    // 基于使用次数评估潜力
    if (candidateData.usageCount && candidateData.usageCount >= 5) {
      potential = 'high';
    } else if (candidateData.usageCount && candidateData.usageCount >= 2) {
      potential = 'medium';
    } else {
      potential = 'low';
    }
    
    // 基于上下文评估潜力
    if (candidateData.context && 
        (candidateData.context.includes('文件') || 
         candidateData.context.includes('数据') || 
         candidateData.context.includes('处理'))) {
      potential = 'high';
    }
    
    return potential;
  }

  // 获取能力候选
  getCandidates(filters = {}) {
    let result = [...this.candidates];
    
    // 应用过滤器
    if (filters.status) {
      result = result.filter(c => c.status === filters.status);
    }
    
    if (filters.potential) {
      result = result.filter(c => c.potential === filters.potential);
    }
    
    if (filters.limit) {
      result = result.slice(0, filters.limit);
    }
    
    // 按使用次数排序
    result.sort((a, b) => b.usageCount - a.usageCount);
    
    return result;
  }

  // 获取单个能力候选
  getCandidate(candidateId) {
    return this.candidates.find(c => c.id === candidateId);
  }

  // 更新能力候选状态
  updateCandidateStatus(candidateId, status) {
    const candidate = this.getCandidate(candidateId);
    if (candidate) {
      candidate.status = status;
      candidate.lastUpdated = Date.now();
      this.saveCandidate(candidate);
      return true;
    }
    return false;
  }

  // 增加使用次数
  incrementUsage(candidateId) {
    const candidate = this.getCandidate(candidateId);
    if (candidate) {
      candidate.usageCount++;
      candidate.lastUsed = Date.now();
      this.saveCandidate(candidate);
      return true;
    }
    return false;
  }

  // 删除能力候选
  deleteCandidate(candidateId) {
    const index = this.candidates.findIndex(c => c.id === candidateId);
    if (index > -1) {
      this.candidates.splice(index, 1);
      
      // 删除文件
      const filePath = path.join(this.candidatesDir, `${candidateId}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      return true;
    }
    return false;
  }

  // 清理过期候选
  cleanupExpired(days = 30) {
    const cutoffTime = Date.now() - (days * 24 * 60 * 60 * 1000);
    const expired = this.candidates.filter(c => c.timestamp < cutoffTime);
    
    expired.forEach(candidate => {
      this.deleteCandidate(candidate.id);
    });
    
    return expired.length;
  }

  // 获取候选统计
  getStatistics() {
    const total = this.candidates.length;
    const byStatus = this.candidates.reduce((acc, c) => {
      acc[c.status] = (acc[c.status] || 0) + 1;
      return acc;
    }, {});
    
    const byPotential = this.candidates.reduce((acc, c) => {
      acc[c.potential] = (acc[c.potential] || 0) + 1;
      return acc;
    }, {});
    
    return {
      total,
      byStatus,
      byPotential,
      mostUsed: this.candidates.sort((a, b) => b.usageCount - a.usageCount)[0]
    };
  }
}

// 导出单例实例
const candidateManager = new CandidateManager();

module.exports = candidateManager;
