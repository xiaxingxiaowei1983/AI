const fs = require('fs');
const path = require('path');

const MERGED_CAPABILITIES_FILE = path.join(__dirname, 'merged-capabilities.json');

class CapabilityMerging {
  constructor() {
    this.mergedCapabilities = this.loadMergedCapabilities();
  }

  loadMergedCapabilities() {
    if (fs.existsSync(MERGED_CAPABILITIES_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(MERGED_CAPABILITIES_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading merged capabilities:', error.message);
        return [];
      }
    }
    return [];
  }

  saveMergedCapabilities() {
    fs.writeFileSync(MERGED_CAPABILITIES_FILE, JSON.stringify(this.mergedCapabilities, null, 2));
    console.log('Merged capabilities saved to', MERGED_CAPABILITIES_FILE);
  }

  findSimilarCapabilities(capabilities, targetCapability, threshold = 0.7) {
    const similarCapabilities = [];

    capabilities.forEach(capability => {
      if (capability.id === targetCapability.id) return;
      
      const similarity = this.calculateCapabilitySimilarity(capability, targetCapability);
      if (similarity >= threshold) {
        similarCapabilities.push({
          capability: capability,
          similarity: similarity
        });
      }
    });

    return similarCapabilities.sort((a, b) => b.similarity - a.similarity);
  }

  calculateCapabilitySimilarity(cap1, cap2) {
    let totalScore = 0;
    let totalWeights = 0;

    // 类型相似度 (权重: 0.3)
    if (cap1.type === cap2.type) {
      totalScore += 0.3;
    }
    totalWeights += 0.3;

    // 输入相似度 (权重: 0.2)
    const inputSimilarity = this.calculateInputSimilarity(
      cap1.abstraction?.inputs || [],
      cap2.abstraction?.inputs || []
    );
    totalScore += inputSimilarity * 0.2;
    totalWeights += 0.2;

    // 输出相似度 (权重: 0.2)
    const outputSimilarity = this.calculateOutputSimilarity(
      cap1.abstraction?.outputs || [],
      cap2.abstraction?.outputs || []
    );
    totalScore += outputSimilarity * 0.2;
    totalWeights += 0.2;

    // 不变量相似度 (权重: 0.15)
    const invariantSimilarity = this.calculateInvariantSimilarity(
      cap1.abstraction?.invariants || [],
      cap2.abstraction?.invariants || []
    );
    totalScore += invariantSimilarity * 0.15;
    totalWeights += 0.15;

    // 失败点相似度 (权重: 0.15)
    const failurePointSimilarity = this.calculateFailurePointSimilarity(
      cap1.abstraction?.failurePoints || [],
      cap2.abstraction?.failurePoints || []
    );
    totalScore += failurePointSimilarity * 0.15;
    totalWeights += 0.15;

    return totalWeights > 0 ? totalScore / totalWeights : 0;
  }

  calculateInputSimilarity(inputs1, inputs2) {
    if (inputs1.length === 0 && inputs2.length === 0) return 1.0;
    if (inputs1.length === 0 || inputs2.length === 0) return 0.0;

    let matchCount = 0;
    const totalInputs = Math.max(inputs1.length, inputs2.length);

    inputs1.forEach(input1 => {
      const matchingInput = inputs2.find(input2 => 
        input1.name === input2.name && 
        input1.type === input2.type
      );
      if (matchingInput) {
        matchCount++;
      }
    });

    return matchCount / totalInputs;
  }

  calculateOutputSimilarity(outputs1, outputs2) {
    if (outputs1.length === 0 && outputs2.length === 0) return 1.0;
    if (outputs1.length === 0 || outputs2.length === 0) return 0.0;

    let matchCount = 0;
    const totalOutputs = Math.max(outputs1.length, outputs2.length);

    outputs1.forEach(output1 => {
      const matchingOutput = outputs2.find(output2 => 
        output1.name === output2.name && 
        output1.type === output2.type
      );
      if (matchingOutput) {
        matchCount++;
      }
    });

    return matchCount / totalOutputs;
  }

  calculateInvariantSimilarity(invariants1, invariants2) {
    if (invariants1.length === 0 && invariants2.length === 0) return 1.0;
    if (invariants1.length === 0 || invariants2.length === 0) return 0.0;

    let matchCount = 0;
    const totalInvariants = Math.max(invariants1.length, invariants2.length);

    invariants1.forEach(inv1 => {
      const matchingInv = invariants2.find(inv2 => 
        inv1.type === inv2.type && 
        inv1.value === inv2.value
      );
      if (matchingInv) {
        matchCount++;
      }
    });

    return matchCount / totalInvariants;
  }

  calculateFailurePointSimilarity(failurePoints1, failurePoints2) {
    if (failurePoints1.length === 0 && failurePoints2.length === 0) return 1.0;
    if (failurePoints1.length === 0 || failurePoints2.length === 0) return 0.0;

    let matchCount = 0;
    const totalFailurePoints = Math.max(failurePoints1.length, failurePoints2.length);

    failurePoints1.forEach(fp1 => {
      const matchingFp = failurePoints2.find(fp2 => 
        fp1.type === fp2.type && 
        fp1.impact === fp2.impact
      );
      if (matchingFp) {
        matchCount++;
      }
    });

    return matchCount / totalFailurePoints;
  }

  mergeCapabilities(capabilities) {
    if (capabilities.length < 2) {
      return null;
    }

    const mergedCapability = {
      id: `merged_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: this.generateMergedCapabilityName(capabilities),
      type: 'merged',
      sourceCapabilities: capabilities.map(cap => cap.id),
      abstraction: this.mergeAbstractions(capabilities),
      confidence: this.calculateMergedConfidence(capabilities),
      created: new Date().toISOString(),
      metadata: {
        mergeCount: capabilities.length,
        originalTypes: [...new Set(capabilities.map(cap => cap.type))]
      }
    };

    this.addMergedCapability(mergedCapability);
    return mergedCapability;
  }

  generateMergedCapabilityName(capabilities) {
    const names = capabilities.map(cap => cap.name);
    const commonPrefix = this.findCommonPrefix(names);
    
    if (commonPrefix) {
      return `${commonPrefix} (Merged)`;
    } else {
      return `Merged Capability (${capabilities.length} sources)`;
    }
  }

  findCommonPrefix(strings) {
    if (strings.length === 0) return '';
    if (strings.length === 1) return strings[0];

    let prefix = strings[0];
    for (let i = 1; i < strings.length; i++) {
      while (strings[i].indexOf(prefix) !== 0) {
        prefix = prefix.substring(0, prefix.length - 1);
        if (prefix === '') return '';
      }
    }
    return prefix;
  }

  mergeAbstractions(capabilities) {
    const abstractions = capabilities.map(cap => cap.abstraction);

    return {
      inputs: this.mergeInputs(abstractions.map(a => a?.inputs || [])),
      outputs: this.mergeOutputs(abstractions.map(a => a?.outputs || [])),
      invariants: this.mergeInvariants(abstractions.map(a => a?.invariants || [])),
      variables: this.mergeVariables(abstractions.map(a => a?.variables || [])),
      failurePoints: this.mergeFailurePoints(abstractions.map(a => a?.failurePoints || []))
    };
  }

  mergeInputs(inputLists) {
    const mergedInputs = [];
    const inputMap = new Map();

    inputLists.forEach(inputs => {
      inputs.forEach(input => {
        const key = input.name;
        if (!inputMap.has(key)) {
          inputMap.set(key, {
            ...input,
            sources: 1
          });
        } else {
          const existingInput = inputMap.get(key);
          existingInput.sources++;
          // 合并类型信息，使用最常见的类型
          if (input.type && existingInput.type !== input.type) {
            // 简单处理：如果类型不同，使用更通用的类型
            existingInput.type = this.getMoreGeneralType(existingInput.type, input.type);
          }
        }
      });
    });

    inputMap.forEach(input => {
      delete input.sources;
      mergedInputs.push(input);
    });

    return mergedInputs;
  }

  mergeOutputs(outputLists) {
    const mergedOutputs = [];
    const outputMap = new Map();

    outputLists.forEach(outputs => {
      outputs.forEach(output => {
        const key = output.name;
        if (!outputMap.has(key)) {
          outputMap.set(key, {
            ...output,
            sources: 1
          });
        } else {
          const existingOutput = outputMap.get(key);
          existingOutput.sources++;
          if (output.type && existingOutput.type !== output.type) {
            existingOutput.type = this.getMoreGeneralType(existingOutput.type, output.type);
          }
        }
      });
    });

    outputMap.forEach(output => {
      delete output.sources;
      mergedOutputs.push(output);
    });

    return mergedOutputs;
  }

  mergeInvariants(invariantLists) {
    const mergedInvariants = [];
    const invariantMap = new Map();

    invariantLists.forEach(invariants => {
      invariants.forEach(invariant => {
        const key = `${invariant.type}:${invariant.value}`;
        if (!invariantMap.has(key)) {
          invariantMap.set(key, {
            ...invariant,
            sources: 1
          });
        } else {
          const existingInvariant = invariantMap.get(key);
          existingInvariant.sources++;
        }
      });
    });

    // 只保留在多个源中出现的不变量
    invariantMap.forEach(invariant => {
      if (invariant.sources >= 2) {
        delete invariant.sources;
        mergedInvariants.push(invariant);
      }
    });

    return mergedInvariants;
  }

  mergeVariables(variableLists) {
    const mergedVariables = [];
    const variableMap = new Map();

    variableLists.forEach(variables => {
      variables.forEach(variable => {
        const key = variable.name;
        if (!variableMap.has(key)) {
          variableMap.set(key, {
            ...variable,
            sources: 1,
            examples: [...(variable.examples || [])]
          });
        } else {
          const existingVariable = variableMap.get(key);
          existingVariable.sources++;
          // 合并示例
          const newExamples = (variable.examples || []).filter(
            example => !existingVariable.examples.includes(example)
          );
          existingVariable.examples.push(...newExamples);
        }
      });
    });

    variableMap.forEach(variable => {
      delete variable.sources;
      mergedVariables.push(variable);
    });

    return mergedVariables;
  }

  mergeFailurePoints(failurePointLists) {
    const mergedFailurePoints = [];
    const failurePointMap = new Map();

    failurePointLists.forEach(failurePoints => {
      failurePoints.forEach(fp => {
        const key = `${fp.type}:${fp.impact}`;
        if (!failurePointMap.has(key)) {
          failurePointMap.set(key, {
            ...fp,
            sources: 1
          });
        } else {
          const existingFp = failurePointMap.get(key);
          existingFp.sources++;
        }
      });
    });

    failurePointMap.forEach(fp => {
      delete fp.sources;
      mergedFailurePoints.push(fp);
    });

    return mergedFailurePoints;
  }

  getMoreGeneralType(type1, type2) {
    const typeHierarchy = {
      'string': 1,
      'number': 1,
      'boolean': 1,
      'array': 2,
      'object': 3
    };

    const level1 = typeHierarchy[type1] || 0;
    const level2 = typeHierarchy[type2] || 0;

    return level1 > level2 ? type1 : type2;
  }

  calculateMergedConfidence(capabilities) {
    const totalConfidence = capabilities.reduce((sum, cap) => sum + (cap.confidence || 0), 0);
    return Math.min(1.0, totalConfidence / capabilities.length);
  }

  addMergedCapability(capability) {
    this.mergedCapabilities.push(capability);
    this.saveMergedCapabilities();
  }

  getMergedCapabilities() {
    return this.mergedCapabilities;
  }

  getMergedCapabilityById(id) {
    return this.mergedCapabilities.find(capability => capability.id === id);
  }

  upgradeCapability(capability, improvements) {
    const upgradedCapability = {
      ...capability,
      id: `upgraded_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      name: `${capability.name} (Upgraded)`,
      abstraction: {
        ...capability.abstraction,
        ...improvements
      },
      confidence: Math.min(1.0, (capability.confidence || 0) + 0.1),
      upgradedAt: new Date().toISOString(),
      metadata: {
        ...capability.metadata,
        upgradeCount: (capability.metadata?.upgradeCount || 0) + 1,
        improvements: Object.keys(improvements)
      }
    };

    this.addMergedCapability(upgradedCapability);
    return upgradedCapability;
  }

  analyzeCapabilitySimilarity(capabilities) {
    const similarityMatrix = [];

    capabilities.forEach((cap1, index1) => {
      const row = [];
      capabilities.forEach((cap2, index2) => {
        if (index1 === index2) {
          row.push(1.0);
        } else {
          const similarity = this.calculateCapabilitySimilarity(cap1, cap2);
          row.push(similarity);
        }
      });
      similarityMatrix.push(row);
    });

    return {
      matrix: similarityMatrix,
      capabilities: capabilities.map(cap => cap.id)
    };
  }

  findMergeOpportunities(capabilities, threshold = 0.7) {
    const opportunities = [];
    const processed = new Set();

    capabilities.forEach(capability => {
      if (processed.has(capability.id)) return;

      const similarCapabilities = this.findSimilarCapabilities(
        capabilities,
        capability,
        threshold
      );

      if (similarCapabilities.length > 0) {
        const mergeGroup = [capability, ...similarCapabilities.map(sc => sc.capability)];
        opportunities.push({
          capabilities: mergeGroup,
          averageSimilarity: similarCapabilities.reduce((sum, sc) => sum + sc.similarity, 0) / similarCapabilities.length,
          potentialBenefit: this.calculateMergeBenefit(mergeGroup)
        });

        // 标记为已处理
        mergeGroup.forEach(cap => processed.add(cap.id));
      }
    });

    return opportunities.sort((a, b) => b.potentialBenefit - a.potentialBenefit);
  }

  calculateMergeBenefit(capabilities) {
    // 计算合并的潜在收益
    const totalInputs = capabilities.reduce((sum, cap) => sum + (cap.abstraction?.inputs?.length || 0), 0);
    const totalOutputs = capabilities.reduce((sum, cap) => sum + (cap.abstraction?.outputs?.length || 0), 0);
    const uniqueInputs = new Set(capabilities.flatMap(cap => (cap.abstraction?.inputs || []).map(input => input.name))).size;
    const uniqueOutputs = new Set(capabilities.flatMap(cap => (cap.abstraction?.outputs || []).map(output => output.name))).size;

    // 收益 = (总输入 + 总输出) - (唯一输入 + 唯一输出)
    // 表示通过合并减少的冗余
    return (totalInputs + totalOutputs) - (uniqueInputs + uniqueOutputs);
  }

  performMerges(capabilities, threshold = 0.7) {
    const opportunities = this.findMergeOpportunities(capabilities, threshold);
    const mergedCapabilities = [];

    opportunities.forEach(opportunity => {
      const mergedCapability = this.mergeCapabilities(opportunity.capabilities);
      if (mergedCapability) {
        mergedCapabilities.push(mergedCapability);
      }
    });

    return mergedCapabilities;
  }
}

module.exports = CapabilityMerging;