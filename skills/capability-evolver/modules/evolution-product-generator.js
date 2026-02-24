/**
 * 进化产物生成系统
 * 确保每次 PCEC 至少产生一个新能力轮廓、默认策略或行为规则
 * 为 PCEC 系统提供可累积的进化结果
 */

const fs = require('fs');
const path = require('path');

class EvolutionProductGenerator {
  constructor(config = {}) {
    this.config = {
      baseDir: config.baseDir || path.join(__dirname, '..', 'data'),
      productsDir: config.productsDir || path.join(__dirname, '..', 'data', 'evolution-products'),
      logFile: config.logFile || path.join(__dirname, '..', '..', '..', 'logs', 'evolution-product.log'),
      productTypes: ['capability-shape', 'default-strategy', 'behavior-rule'],
      ...config
    };
    
    this.ensureDirectories();
  }
  
  // 确保目录存在
  ensureDirectories() {
    const directories = [
      this.config.baseDir,
      this.config.productsDir,
      path.dirname(this.config.logFile)
    ];
    
    directories.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
        this.log(`Created directory: ${dir}`);
      }
    });
  }
  
  // 日志函数
  log(message) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [Evolution Product] ${message}`;
    console.log(logMessage);
    
    // 写入日志文件
    fs.appendFileSync(this.config.logFile, logMessage + '\n', { flag: 'a' });
  }
  
  // 生成进化产物
  generateProduct(evolutionResult, cycle) {
    this.log(`Generating evolution product for cycle ${cycle}...`);
    
    // 随机选择产物类型
    const productType = this.selectProductType();
    this.log(`Selected product type: ${productType}`);
    
    // 根据类型生成产物
    let product;
    switch (productType) {
      case 'capability-shape':
        product = this.generateCapabilityShape(evolutionResult, cycle);
        break;
      case 'default-strategy':
        product = this.generateDefaultStrategy(evolutionResult, cycle);
        break;
      case 'behavior-rule':
        product = this.generateBehaviorRule(evolutionResult, cycle);
        break;
      default:
        product = this.generateCapabilityShape(evolutionResult, cycle);
    }
    
    // 保存产物
    this.saveProduct(product);
    
    this.log(`Generated evolution product: ${product.type}`);
    return product;
  }
  
  // 选择产物类型
  selectProductType() {
    // 基于优先级加权选择
    const weightedTypes = [];
    this.config.productTypes.forEach(type => {
      // 为不同类型设置不同权重
      let weight = 1;
      if (type === 'capability-shape') {
        weight = 2; // 能力轮廓优先级更高
      }
      for (let i = 0; i < weight; i++) {
        weightedTypes.push(type);
      }
    });
    
    const randomIndex = Math.floor(Math.random() * weightedTypes.length);
    return weightedTypes[randomIndex];
  }
  
  // 生成能力轮廓
  generateCapabilityShape(evolutionResult, cycle) {
    return {
      type: 'capability-shape',
      cycle: cycle,
      id: `capability-shape-${cycle}-${Date.now()}`,
      name: `Capability Shape for ${this.getShortDescription(evolutionResult.message)}`,
      description: `Generated from ${evolutionResult.type} evolution`,
      shape: {
        inputs: this.getInputs(evolutionResult),
        outputs: this.getOutputs(evolutionResult),
        invariants: [
          'anti-degeneration lock validation',
          'mind explosion completion',
          'capability conflict resolution'
        ],
        variables: [
          'evolution type',
          'complexity level',
          'implementation effort'
        ],
        failurePoints: [
          'evolution failure',
          'anti-degeneration lock violation',
          'capability conflict'
        ]
      },
      generated: Date.now(),
      source: evolutionResult,
      status: 'generated'
    };
  }
  
  // 生成默认策略
  generateDefaultStrategy(evolutionResult, cycle) {
    return {
      type: 'default-strategy',
      cycle: cycle,
      id: `default-strategy-${cycle}-${Date.now()}`,
      name: `Default Strategy for ${this.getShortDescription(evolutionResult.message)}`,
      description: `Generated from ${evolutionResult.type} evolution`,
      strategy: {
        trigger: this.getTriggerCondition(evolutionResult),
        action: this.getAction(evolutionResult),
        priority: this.getPriority(evolutionResult),
        conditions: [
          'anti-degeneration lock validation passed',
          'mind explosion completed',
          'system idle'
        ],
        successMetrics: [
          'reduction in steps',
          'reduction in tool calls',
          'increase in success rate'
        ]
      },
      generated: Date.now(),
      source: evolutionResult,
      status: 'generated'
    };
  }
  
  // 生成行为规则
  generateBehaviorRule(evolutionResult, cycle) {
    return {
      type: 'behavior-rule',
      cycle: cycle,
      id: `behavior-rule-${cycle}-${Date.now()}`,
      name: `Behavior Rule for ${this.getShortDescription(evolutionResult.message)}`,
      description: `Generated from ${evolutionResult.type} evolution`,
      rule: {
        condition: this.getCondition(evolutionResult),
        action: this.getRuleAction(evolutionResult),
        rationale: `Based on successful ${evolutionResult.type} evolution`,
        exceptions: [
          'anti-degeneration lock violations',
          'significant context differences',
          'system instability'
        ],
        priority: this.getRulePriority(evolutionResult)
      },
      generated: Date.now(),
      source: evolutionResult,
      status: 'generated'
    };
  }
  
  // 获取输入
  getInputs(evolutionResult) {
    const baseInputs = ['evolution opportunity', 'existing capabilities'];
    
    switch (evolutionResult.type) {
      case 'new-feature':
        return [...baseInputs, 'feature requirements', 'implementation constraints'];
      case 'new-abstract':
        return [...baseInputs, 'problem patterns', 'context information'];
      case 'new-lever':
        return [...baseInputs, 'system structure', 'performance metrics'];
      default:
        return baseInputs;
    }
  }
  
  // 获取输出
  getOutputs(evolutionResult) {
    const baseOutputs = ['new capability', 'evolution result'];
    
    switch (evolutionResult.type) {
      case 'new-feature':
        return [...baseOutputs, 'feature implementation', 'usage examples'];
      case 'new-abstract':
        return [...baseOutputs, 'abstract pattern', 'application guidelines'];
      case 'new-lever':
        return [...baseOutputs, 'structural improvement', 'performance gains'];
      default:
        return baseOutputs;
    }
  }
  
  // 获取触发条件
  getTriggerCondition(evolutionResult) {
    switch (evolutionResult.type) {
      case 'new-feature':
        return 'similar feature requirements';
      case 'new-abstract':
        return 'similar problem patterns';
      case 'new-lever':
        return 'similar system structure issues';
      default:
        return 'similar evolution opportunities';
    }
  }
  
  // 获取行动
  getAction(evolutionResult) {
    switch (evolutionResult.type) {
      case 'new-feature':
        return 'apply the same feature implementation pattern';
      case 'new-abstract':
        return 'apply the same abstract pattern';
      case 'new-lever':
        return 'apply the same structural improvement';
      default:
        return 'apply the same evolution pattern';
    }
  }
  
  // 获取优先级
  getPriority(evolutionResult) {
    switch (evolutionResult.type) {
      case 'new-feature':
        return 'high';
      case 'new-abstract':
        return 'medium';
      case 'new-lever':
        return 'high';
      default:
        return 'medium';
    }
  }
  
  // 获取条件
  getCondition(evolutionResult) {
    switch (evolutionResult.type) {
      case 'new-feature':
        return 'when facing similar feature requirements';
      case 'new-abstract':
        return 'when facing similar problem patterns';
      case 'new-lever':
        return 'when facing similar system structure issues';
      default:
        return 'when facing similar evolution opportunities';
    }
  }
  
  // 获取规则行动
  getRuleAction(evolutionResult) {
    switch (evolutionResult.type) {
      case 'new-feature':
        return 'prioritize feature-based evolution approach';
      case 'new-abstract':
        return 'prioritize pattern-based evolution approach';
      case 'new-lever':
        return 'prioritize structural improvement approach';
      default:
        return 'prioritize this evolution approach';
    }
  }
  
  // 获取规则优先级
  getRulePriority(evolutionResult) {
    switch (evolutionResult.type) {
      case 'new-feature':
        return 'high';
      case 'new-abstract':
        return 'medium';
      case 'new-lever':
        return 'high';
      default:
        return 'medium';
    }
  }
  
  // 获取简短描述
  getShortDescription(message) {
    // 截取前50个字符作为简短描述
    return message.length > 50 ? message.substring(0, 50) + '...' : message;
  }
  
  // 保存产物
  saveProduct(product) {
    const productPath = path.join(this.config.productsDir, `${product.type}-${product.id}.json`);
    
    try {
      fs.writeFileSync(productPath, JSON.stringify(product, null, 2));
      this.log(`Saved evolution product: ${product.id}`);
    } catch (error) {
      this.log(`Error saving product: ${error.message}`);
    }
  }
  
  // 获取所有产物
  getAllProducts(limit = 100) {
    try {
      const files = fs.readdirSync(this.config.productsDir);
      const products = [];
      
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const productPath = path.join(this.config.productsDir, file);
          try {
            const product = JSON.parse(fs.readFileSync(productPath, 'utf8'));
            products.push(product);
          } catch (error) {
            this.log(`Error reading product file ${file}: ${error.message}`);
          }
        }
      });
      
      // 按生成时间排序，返回最新的产物
      products.sort((a, b) => b.generated - a.generated);
      
      return limit > 0 ? products.slice(0, limit) : products;
    } catch (error) {
      this.log(`Error getting products: ${error.message}`);
      return [];
    }
  }
  
  // 获取特定类型的产物
  getProductsByType(type, limit = 50) {
    const allProducts = this.getAllProducts();
    const filteredProducts = allProducts.filter(product => product.type === type);
    return limit > 0 ? filteredProducts.slice(0, limit) : filteredProducts;
  }
  
  // 获取特定周期的产物
  getProductsByCycle(cycle) {
    const allProducts = this.getAllProducts();
    return allProducts.filter(product => product.cycle === cycle);
  }
  
  // 标记产物为已实现
  markProductAsImplemented(productId) {
    try {
      const allProducts = this.getAllProducts();
      const product = allProducts.find(p => p.id === productId);
      
      if (product) {
        product.status = 'implemented';
        product.implementedAt = Date.now();
        
        const productPath = path.join(this.config.productsDir, `${product.type}-${product.id}.json`);
        fs.writeFileSync(productPath, JSON.stringify(product, null, 2));
        
        this.log(`Marked product as implemented: ${productId}`);
        return true;
      }
      
      this.log(`Product not found: ${productId}`);
      return false;
    } catch (error) {
      this.log(`Error marking product as implemented: ${error.message}`);
      return false;
    }
  }
  
  // 分析产物趋势
  analyzeProductTrends() {
    const allProducts = this.getAllProducts();
    
    if (allProducts.length === 0) {
      return {
        totalProducts: 0,
        typeDistribution: {},
        cycleDistribution: {},
        implementationRate: 0
      };
    }
    
    // 分析类型分布
    const typeDistribution = {};
    allProducts.forEach(product => {
      typeDistribution[product.type] = (typeDistribution[product.type] || 0) + 1;
    });
    
    // 分析周期分布
    const cycleDistribution = {};
    allProducts.forEach(product => {
      const cycle = product.cycle;
      cycleDistribution[cycle] = (cycleDistribution[cycle] || 0) + 1;
    });
    
    // 分析实现率
    const implementedCount = allProducts.filter(product => product.status === 'implemented').length;
    const implementationRate = (implementedCount / allProducts.length) * 100;
    
    // 分析生成时间趋势
    const recentProducts = allProducts.slice(0, 20); // 最近20个产物
    const averageTimeBetweenProducts = recentProducts.length > 1 ? 
      (recentProducts[0].generated - recentProducts[recentProducts.length - 1].generated) / (recentProducts.length - 1) : 0;
    
    return {
      totalProducts: allProducts.length,
      typeDistribution,
      cycleDistribution,
      implementationRate: implementationRate.toFixed(2),
      averageTimeBetweenProducts: averageTimeBetweenProducts / 1000 / 60, // 转换为分钟
      mostCommonType: Object.keys(typeDistribution).reduce((a, b) => typeDistribution[a] > typeDistribution[b] ? a : b)
    };
  }
  
  // 清理旧产物
  cleanupOldProducts(daysToKeep = 30) {
    try {
      const cutoffTime = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
      const files = fs.readdirSync(this.config.productsDir);
      
      let deletedCount = 0;
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const productPath = path.join(this.config.productsDir, file);
          try {
            const product = JSON.parse(fs.readFileSync(productPath, 'utf8'));
            if (product.generated < cutoffTime) {
              fs.unlinkSync(productPath);
              deletedCount++;
            }
          } catch (error) {
            this.log(`Error processing product file ${file}: ${error.message}`);
          }
        }
      });
      
      this.log(`Cleaned up ${deletedCount} old evolution products`);
    } catch (error) {
      this.log(`Error cleaning up old products: ${error.message}`);
    }
  }
  
  // 验证产物完整性
  validateProducts() {
    try {
      const allProducts = this.getAllProducts();
      const validationResults = {
        total: allProducts.length,
        valid: 0,
        invalid: 0,
        issues: []
      };
      
      allProducts.forEach(product => {
        const issues = this.validateProduct(product);
        if (issues.length === 0) {
          validationResults.valid++;
        } else {
          validationResults.invalid++;
          validationResults.issues.push({ productId: product.id, issues });
        }
      });
      
      this.log(`Product validation: ${validationResults.valid} valid, ${validationResults.invalid} invalid`);
      return validationResults;
    } catch (error) {
      this.log(`Error validating products: ${error.message}`);
      return { total: 0, valid: 0, invalid: 0, issues: [] };
    }
  }
  
  // 验证单个产物
  validateProduct(product) {
    const issues = [];
    
    // 检查必要字段
    if (!product.id) {
      issues.push('Missing product ID');
    }
    
    if (!product.type) {
      issues.push('Missing product type');
    }
    
    if (!product.generated) {
      issues.push('Missing generated timestamp');
    }
    
    if (!product.source) {
      issues.push('Missing source evolution result');
    }
    
    if (!product.status) {
      issues.push('Missing product status');
    }
    
    // 检查特定类型的字段
    switch (product.type) {
      case 'capability-shape':
        if (!product.shape) {
          issues.push('Missing capability shape');
        } else {
          if (!product.shape.inputs) {
            issues.push('Missing capability shape inputs');
          }
          if (!product.shape.outputs) {
            issues.push('Missing capability shape outputs');
          }
        }
        break;
      
      case 'default-strategy':
        if (!product.strategy) {
          issues.push('Missing strategy');
        } else {
          if (!product.strategy.trigger) {
            issues.push('Missing strategy trigger');
          }
          if (!product.strategy.action) {
            issues.push('Missing strategy action');
          }
        }
        break;
      
      case 'behavior-rule':
        if (!product.rule) {
          issues.push('Missing rule');
        } else {
          if (!product.rule.condition) {
            issues.push('Missing rule condition');
          }
          if (!product.rule.action) {
            issues.push('Missing rule action');
          }
        }
        break;
    }
    
    return issues;
  }
}

// 导出模块
module.exports = EvolutionProductGenerator;

// 导出默认实例
module.exports.default = new EvolutionProductGenerator();