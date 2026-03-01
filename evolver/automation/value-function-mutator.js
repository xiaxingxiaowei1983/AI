const fs = require('fs');
const path = require('path');

const MUTATOR_LOG_FILE = path.join(__dirname, '../value-function-mutator-logs.json');

class ValueFunctionMutator {
  constructor(valueFunction) {
    this.valueFunction = valueFunction;
    this.mutationConfig = this.initMutationConfig();
    this.mutatorLogs = this.loadMutatorLogs();
    this.mutationHistory = [];
    this.rollbackStack = [];
    this.performanceTracker = new Map();
  }

  initMutationConfig() {
    return {
      mutationThresholds: {
        minEffectiveness: 0.6,
        mutationTrigger: 0.7,
        rollbackTrigger: 0.5
      },
      mutationStrategies: {
        weight_adjustment: {
          name: 'Weight Adjustment',
          description: 'Adjust dimension weights based on performance',
          minChange: 0.05,
          maxChange: 0.15,
          frequency: 'adaptive'
        },
        dimension_addition: {
          name: 'Dimension Addition',
          description: 'Add new evaluation dimensions',
          minDimensions: 5,
          maxDimensions: 10,
          frequency: 'rare'
        },
        threshold_adjustment: {
          name: 'Threshold Adjustment',
          description: 'Adjust low-value threshold',
          minChange: 0.05,
          maxChange: 0.1,
          frequency: 'periodic'
        }
      },
      constraints: {
        stabilityFirst: true,
        maxMutationRate: 0.2,
        minStabilityPeriod: 3600000,
        requireValidation: true
      }
    };
  }

  loadMutatorLogs() {
    if (fs.existsSync(MUTATOR_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(MUTATOR_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading mutator logs:', error.message);
        return [];
      }
    }
    return [];
  }

  saveMutatorLogs() {
    fs.writeFileSync(MUTATOR_LOG_FILE, JSON.stringify(this.mutatorLogs, null, 2));
  }

  async evaluateAndMutate(evaluations) {
    console.log('=== Evaluating value function performance ===');

    const mutationId = `mutation_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
      const effectiveness = this.calculateEffectiveness(evaluations);
      const currentStatus = this.valueFunction.getStatus();

      this.performanceTracker.set(Date.now(), {
        effectiveness,
        version: currentStatus.version
      });

      let mutationResult = null;

      if (effectiveness < this.mutationConfig.mutationThresholds.rollbackTrigger) {
        console.log('⚠️  Effectiveness below rollback threshold, initiating rollback');
        mutationResult = await this.performRollback();
      } else if (effectiveness < this.mutationConfig.mutationThresholds.mutationTrigger) {
        console.log('📊 Effectiveness below mutation threshold, considering mutation');
        mutationResult = await this.considerMutation(effectiveness, evaluations);
      } else {
        console.log('✅ Value function performing well, no mutation needed');
      }

      const result = {
        mutationId,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        effectiveness,
        mutationPerformed: mutationResult !== null,
        mutationResult,
        currentStatus: this.valueFunction.getStatus()
      };

      this.mutatorLogs.push(result);
      this.saveMutatorLogs();

      return result;

    } catch (error) {
      console.error('❌ Mutation evaluation failed:', error.message);

      const failedResult = {
        mutationId,
        timestamp: new Date().toISOString(),
        duration: Date.now() - startTime,
        success: false,
        error: error.message
      };

      this.mutatorLogs.push(failedResult);
      this.saveMutatorLogs();

      return failedResult;
    }
  }

  calculateEffectiveness(evaluations) {
    if (!evaluations || evaluations.length === 0) {
      return 0.5;
    }

    const highValueRatio = evaluations.filter(e => !e.isLowValue).length / evaluations.length;
    const avgValue = evaluations.reduce((sum, e) => sum + e.totalValue, 0) / evaluations.length;

    const effectiveness = (highValueRatio * 0.6 + avgValue * 0.4);

    return Math.min(1, Math.max(0, effectiveness));
  }

  async considerMutation(effectiveness, evaluations) {
    console.log('Considering value function mutation');

    const currentState = this.saveCurrentState();
    this.rollbackStack.push({
      state: currentState,
      timestamp: Date.now(),
      effectiveness
    });

    if (this.rollbackStack.length > 5) {
      this.rollbackStack.shift();
    }

    const mutationType = this.selectMutationType(evaluations);

    let mutationResult;
    switch (mutationType) {
      case 'weight_adjustment':
        mutationResult = await this.performWeightAdjustment(evaluations);
        break;
      case 'threshold_adjustment':
        mutationResult = await this.performThresholdAdjustment(evaluations);
        break;
      case 'dimension_addition':
        mutationResult = await this.performDimensionAddition(evaluations);
        break;
      default:
        mutationResult = { performed: false, reason: 'No suitable mutation type' };
    }

    if (mutationResult.performed) {
      this.mutationHistory.push({
        type: mutationType,
        timestamp: new Date().toISOString(),
        previousEffectiveness: effectiveness,
        result: mutationResult
      });
    }

    return mutationResult;
  }

  selectMutationType(evaluations) {
    const strategies = this.mutationConfig.mutationStrategies;

    const dimensionBalance = this.analyzeDimensionBalance(evaluations);

    if (dimensionBalance.imbalance > 0.3) {
      return 'weight_adjustment';
    }

    const lowValueRate = evaluations.filter(e => e.isLowValue).length / evaluations.length;
    if (lowValueRate > 0.3) {
      return 'threshold_adjustment';
    }

    if (Math.random() < 0.1 && this.valueFunction.dimensions.length < strategies.dimension_addition.maxDimensions) {
      return 'dimension_addition';
    }

    return 'weight_adjustment';
  }

  analyzeDimensionBalance(evaluations) {
    const dimensionScores = {};

    for (const evaluation of evaluations) {
      for (const [dimension, score] of Object.entries(evaluation.dimensionScores || {})) {
        if (!dimensionScores[dimension]) {
          dimensionScores[dimension] = [];
        }
        dimensionScores[dimension].push(score);
      }
    }

    const avgScores = {};
    for (const [dimension, scores] of Object.entries(dimensionScores)) {
      avgScores[dimension] = scores.reduce((a, b) => a + b, 0) / scores.length;
    }

    const values = Object.values(avgScores);
    if (values.length === 0) {
      return { imbalance: 0, dimensionScores: avgScores };
    }

    const max = Math.max(...values);
    const min = Math.min(...values);
    const imbalance = max - min;

    return { imbalance, dimensionScores: avgScores };
  }

  async performWeightAdjustment(evaluations) {
    console.log('Performing weight adjustment mutation');

    const currentWeights = { ...this.valueFunction.weights };
    const newWeights = { ...currentWeights };
    const changes = [];

    const dimensionAnalysis = this.analyzeDimensionBalance(evaluations);
    const avgScores = dimensionAnalysis.dimensionScores;

    for (const [dimension, avgScore] of Object.entries(avgScores)) {
      if (newWeights[dimension] !== undefined) {
        const currentWeight = newWeights[dimension];
        let adjustment = 0;

        if (avgScore < 0.5) {
          adjustment = -this.mutationConfig.mutationStrategies.weight_adjustment.minChange;
        } else if (avgScore > 0.7) {
          adjustment = this.mutationConfig.mutationStrategies.weight_adjustment.minChange;
        }

        adjustment *= (Math.random() * 0.5 + 0.75);

        newWeights[dimension] = Math.max(0.1, Math.min(0.4, currentWeight + adjustment));

        if (Math.abs(newWeights[dimension] - currentWeight) > 0.01) {
          changes.push({
            dimension,
            before: currentWeight,
            after: newWeights[dimension],
            reason: avgScore < 0.5 ? 'low_performance' : 'high_performance'
          });
        }
      }
    }

    const totalWeight = Object.values(newWeights).reduce((a, b) => a + b, 0);
    for (const dimension of Object.keys(newWeights)) {
      newWeights[dimension] /= totalWeight;
    }

    if (changes.length > 0) {
      this.valueFunction.weights = newWeights;
      this.valueFunction.version = `${this.valueFunction.version.split('.')[0]}.${parseInt(this.valueFunction.version.split('.')[1] || 0) + 1}.0`;

      console.log(`✅ Weight adjustment performed: ${changes.length} dimensions adjusted`);
      return {
        performed: true,
        type: 'weight_adjustment',
        changes,
        newWeights
      };
    }

    return { performed: false, reason: 'No significant changes needed' };
  }

  async performThresholdAdjustment(evaluations) {
    console.log('Performing threshold adjustment mutation');

    const currentThreshold = this.valueFunction.lowValueThreshold;
    const lowValueRate = evaluations.filter(e => e.isLowValue).length / evaluations.length;

    let newThreshold = currentThreshold;
    let reason = '';

    if (lowValueRate > 0.4) {
      newThreshold = currentThreshold - this.mutationConfig.mutationStrategies.threshold_adjustment.minChange;
      reason = 'too_many_low_value';
    } else if (lowValueRate < 0.1) {
      newThreshold = currentThreshold + this.mutationConfig.mutationStrategies.threshold_adjustment.minChange;
      reason = 'too_few_low_value';
    }

    newThreshold = Math.max(0.2, Math.min(0.5, newThreshold));

    if (Math.abs(newThreshold - currentThreshold) > 0.01) {
      this.valueFunction.lowValueThreshold = newThreshold;

      console.log(`✅ Threshold adjustment performed: ${currentThreshold.toFixed(2)} -> ${newThreshold.toFixed(2)}`);
      return {
        performed: true,
        type: 'threshold_adjustment',
        before: currentThreshold,
        after: newThreshold,
        reason
      };
    }

    return { performed: false, reason: 'No threshold change needed' };
  }

  async performDimensionAddition(evaluations) {
    console.log('Performing dimension addition mutation');

    const currentDimensions = this.valueFunction.dimensions.map(d => d.name);

    const potentialDimensions = [
      { name: 'scalability', description: 'Ability to handle increased load', weight: 0.1 },
      { name: 'maintainability', description: 'Ease of maintenance and updates', weight: 0.1 },
      { name: 'security', description: 'Security considerations', weight: 0.1 },
      { name: 'compatibility', description: 'Compatibility with other systems', weight: 0.1 }
    ];

    const newDimension = potentialDimensions.find(d => !currentDimensions.includes(d.name));

    if (newDimension) {
      this.valueFunction.dimensions.push({
        name: newDimension.name,
        description: newDimension.description,
        weight: newDimension.weight
      });

      const totalWeight = this.valueFunction.dimensions.reduce((sum, d) => sum + d.weight, 0);
      for (const dim of this.valueFunction.dimensions) {
        dim.weight /= totalWeight;
      }

      console.log(`✅ Dimension added: ${newDimension.name}`);
      return {
        performed: true,
        type: 'dimension_addition',
        addedDimension: newDimension
      };
    }

    return { performed: false, reason: 'No new dimensions to add' };
  }

  saveCurrentState() {
    return {
      weights: { ...this.valueFunction.weights },
      dimensions: JSON.parse(JSON.stringify(this.valueFunction.dimensions)),
      lowValueThreshold: this.valueFunction.lowValueThreshold,
      version: this.valueFunction.version
    };
  }

  async performRollback() {
    console.log('Performing rollback');

    if (this.rollbackStack.length === 0) {
      console.log('No rollback state available');
      return { performed: false, reason: 'No rollback state available' };
    }

    const rollbackState = this.rollbackStack[this.rollbackStack.length - 1];

    this.valueFunction.weights = rollbackState.state.weights;
    this.valueFunction.dimensions = rollbackState.state.dimensions;
    this.valueFunction.lowValueThreshold = rollbackState.state.lowValueThreshold;
    this.valueFunction.version = rollbackState.state.version;

    this.rollbackStack.pop();

    console.log(`✅ Rollback performed to version ${rollbackState.state.version}`);
    return {
      performed: true,
      type: 'rollback',
      rolledBackTo: rollbackState.state.version,
      previousEffectiveness: rollbackState.effectiveness
    };
  }

  getMutatorStatistics() {
    return {
      totalMutations: this.mutationHistory.length,
      mutationTypes: this.countMutationTypes(),
      averageEffectiveness: this.calculateAverageEffectiveness(),
      rollbackCount: this.mutationHistory.filter(m => m.type === 'rollback').length,
      currentVersion: this.valueFunction.version,
      rollbackStackSize: this.rollbackStack.length,
      recentMutations: this.mutationHistory.slice(-10)
    };
  }

  countMutationTypes() {
    const counts = {};
    for (const mutation of this.mutationHistory) {
      counts[mutation.type] = (counts[mutation.type] || 0) + 1;
    }
    return counts;
  }

  calculateAverageEffectiveness() {
    const entries = Array.from(this.performanceTracker.values());
    if (entries.length === 0) return 0;
    return entries.reduce((sum, e) => sum + e.effectiveness, 0) / entries.length;
  }

  clearLogs() {
    this.mutatorLogs = [];
    this.mutationHistory = [];
    this.rollbackStack = [];
    this.performanceTracker.clear();
    this.saveMutatorLogs();
    console.log('Mutator logs cleared');
  }
}

module.exports = ValueFunctionMutator;
