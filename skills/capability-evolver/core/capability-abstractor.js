/**
 * 能力抽象器
 * 负责从能力候选中提取能力轮廓，定义输入输出参数
 */

const fs = require('fs');
const path = require('path');
const candidateManager = require('./candidate-manager');

class CapabilityAbstractor {
  constructor() {
    this.abstractedDir = path.join(__dirname, '..', 'data', 'abstracted');
    this.abstractedCapabilities = this.loadAbstractedCapabilities();
  }

  // 加载抽象能力
  loadAbstractedCapabilities() {
    const capabilities = [];
    
    try {
      const files = fs.readdirSync(this.abstractedDir);
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.abstractedDir, file);
          const capability = JSON.parse(fs.readFileSync(filePath, 'utf8'));
          capabilities.push(capability);
        }
      });
    } catch (error) {
      console.warn('Error loading abstracted capabilities:', error.message);
    }
    
    return capabilities;
  }

  // 保存抽象能力
  saveAbstractedCapability(capability) {
    const filePath = path.join(this.abstractedDir, `${capability.id}.json`);
    fs.writeFileSync(filePath, JSON.stringify(capability, null, 2));
  }

  // 抽象能力
  abstractCapability(candidateId) {
    const candidate = candidateManager.getCandidate(candidateId);
    if (!candidate) {
      throw new Error(`Candidate not found: ${candidateId}`);
    }

    // 提取能力轮廓
    const abstractedCapability = this.extractCapabilityShape(candidate);
    
    this.abstractedCapabilities.push(abstractedCapability);
    this.saveAbstractedCapability(abstractedCapability);
    
    // 更新候选状态
    candidateManager.updateCandidateStatus(candidateId, 'abstracted');
    
    return abstractedCapability;
  }

  // 提取能力轮廓
  extractCapabilityShape(candidate) {
    // 基于候选信息提取能力参数
    const inputs = this.extractInputs(candidate);
    const outputs = this.extractOutputs(candidate);
    const prerequisites = this.extractPrerequisites(candidate);
    const failureBoundaries = this.extractFailureBoundaries(candidate);
    const invariants = this.extractInvariants(candidate);
    const variables = this.extractVariables(candidate);
    const level = this.determineLevel(candidate);

    return {
      id: `cap_abstract_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: candidate.name,
      description: candidate.description,
      inputs,
      outputs,
      prerequisites,
      failureBoundaries,
      invariants,
      variables,
      level,
      source: candidate.id,
      timestamp: Date.now(),
      metadata: {
        usageCount: candidate.usageCount,
        potential: candidate.potential,
        context: candidate.context
      }
    };
  }

  // 提取输入参数
  extractInputs(candidate) {
    const inputs = [];
    
    // 基于能力名称和上下文提取输入
    if (candidate.name.includes('文件')) {
      inputs.push('文件路径');
      inputs.push('操作类型');
    }
    
    if (candidate.name.includes('数据')) {
      inputs.push('数据源');
      inputs.push('处理参数');
    }
    
    if (candidate.name.includes('网络')) {
      inputs.push('URL');
      inputs.push('请求参数');
    }
    
    if (candidate.name.includes('缓存')) {
      inputs.push('缓存键');
      inputs.push('缓存值');
    }
    
    // 基于上下文提取输入
    if (candidate.context) {
      if (candidate.context.includes('路径')) {
        inputs.push('路径参数');
      }
      if (candidate.context.includes('参数')) {
        inputs.push('配置参数');
      }
    }
    
    // 默认输入
    if (inputs.length === 0) {
      inputs.push('操作参数');
    }
    
    return inputs;
  }

  // 提取输出参数
  extractOutputs(candidate) {
    const outputs = [];
    
    // 基于能力名称提取输出
    if (candidate.name.includes('文件')) {
      outputs.push('操作结果');
      outputs.push('文件状态');
    }
    
    if (candidate.name.includes('数据')) {
      outputs.push('处理结果');
      outputs.push('处理状态');
    }
    
    if (candidate.name.includes('网络')) {
      outputs.push('响应数据');
      outputs.push('响应状态');
    }
    
    if (candidate.name.includes('缓存')) {
      outputs.push('缓存状态');
      outputs.push('操作结果');
    }
    
    // 默认输出
    if (outputs.length === 0) {
      outputs.push('操作结果');
      outputs.push('操作状态');
    }
    
    return outputs;
  }

  // 提取成功前提
  extractPrerequisites(candidate) {
    const prerequisites = [];
    
    if (candidate.name.includes('文件')) {
      prerequisites.push('文件存在');
      prerequisites.push('权限正确');
    }
    
    if (candidate.name.includes('网络')) {
      prerequisites.push('网络连接正常');
      prerequisites.push('URL有效');
    }
    
    if (candidate.name.includes('数据')) {
      prerequisites.push('数据格式正确');
      prerequisites.push('处理参数有效');
    }
    
    // 默认前提
    if (prerequisites.length === 0) {
      prerequisites.push('参数有效');
      prerequisites.push('环境正常');
    }
    
    return prerequisites;
  }

  // 提取失败边界
  extractFailureBoundaries(candidate) {
    const boundaries = [];
    
    if (candidate.name.includes('文件')) {
      boundaries.push('文件不存在');
      boundaries.push('权限不足');
      boundaries.push('磁盘空间不足');
    }
    
    if (candidate.name.includes('网络')) {
      boundaries.push('网络连接失败');
      boundaries.push('URL无效');
      boundaries.push('请求超时');
    }
    
    if (candidate.name.includes('数据')) {
      boundaries.push('数据格式错误');
      boundaries.push('处理参数无效');
      boundaries.push('处理过程异常');
    }
    
    // 默认边界
    if (boundaries.length === 0) {
      boundaries.push('参数错误');
      boundaries.push('执行异常');
    }
    
    return boundaries;
  }

  // 提取不变量
  extractInvariants(candidate) {
    const invariants = [];
    
    if (candidate.name.includes('文件')) {
      invariants.push('操作类型必须有效');
      invariants.push('文件路径格式正确');
    }
    
    if (candidate.name.includes('网络')) {
      invariants.push('URL格式必须正确');
      invariants.push('请求方法必须支持');
    }
    
    if (candidate.name.includes('数据')) {
      invariants.push('数据必须符合预期格式');
      invariants.push('处理逻辑必须一致');
    }
    
    // 默认不变量
    if (invariants.length === 0) {
      invariants.push('操作必须符合系统规则');
    }
    
    return invariants;
  }

  // 提取可变参数
  extractVariables(candidate) {
    const variables = [];
    
    if (candidate.name.includes('文件')) {
      variables.push('文件路径');
      variables.push('操作参数');
    }
    
    if (candidate.name.includes('网络')) {
      variables.push('URL参数');
      variables.push('请求体');
    }
    
    if (candidate.name.includes('数据')) {
      variables.push('数据源');
      variables.push('处理配置');
    }
    
    // 默认变量
    if (variables.length === 0) {
      variables.push('操作参数');
    }
    
    return variables;
  }

  // 确定能力层级
  determineLevel(candidate) {
    // 基于能力类型确定层级
    if (candidate.name.includes('基础') || 
        candidate.name.includes('操作') || 
        candidate.name.includes('处理')) {
      return 1; // 低层
    }
    
    if (candidate.name.includes('流程') || 
        candidate.name.includes('管理') || 
        candidate.name.includes('协调')) {
      return 2; // 中层
    }
    
    if (candidate.name.includes('策略') || 
        candidate.name.includes('分析') || 
        candidate.name.includes('设计')) {
      return 3; // 高层
    }
    
    // 基于使用次数确定层级
    if (candidate.usageCount >= 10) {
      return 2;
    } else if (candidate.usageCount >= 5) {
      return 1;
    } else {
      return 1;
    }
  }

  // 获取抽象能力
  getAbstractedCapabilities(filters = {}) {
    let result = [...this.abstractedCapabilities];
    
    // 应用过滤器
    if (filters.level) {
      result = result.filter(c => c.level === filters.level);
    }
    
    if (filters.limit) {
      result = result.slice(0, filters.limit);
    }
    
    return result;
  }

  // 获取单个抽象能力
  getAbstractedCapability(abstractId) {
    return this.abstractedCapabilities.find(c => c.id === abstractId);
  }

  // 删除抽象能力
  deleteAbstractedCapability(abstractId) {
    const index = this.abstractedCapabilities.findIndex(c => c.id === abstractId);
    if (index > -1) {
      this.abstractedCapabilities.splice(index, 1);
      
      // 删除文件
      const filePath = path.join(this.abstractedDir, `${abstractId}.json`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      return true;
    }
    return false;
  }
}

// 导出单例实例
const capabilityAbstractor = new CapabilityAbstractor();

module.exports = capabilityAbstractor;
