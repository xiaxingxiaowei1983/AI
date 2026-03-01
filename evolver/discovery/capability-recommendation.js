const fs = require('fs');
const path = require('path');

const RECOMMENDATION_LOG_FILE = path.join(__dirname, '../recommendation-logs.json');

class CapabilityRecommendation {
  constructor(unifiedInterface, discovery) {
    this.unifiedInterface = unifiedInterface;
    this.discovery = discovery;
    this.recommendationEngine = this.initRecommendationEngine();
    this.recommendationHistory = this.loadRecommendationHistory();
    this.userPreferences = this.loadUserPreferences();
  }

  initRecommendationEngine() {
    return {
      contextBased: {
        name: 'Context-Based Recommendation',
        weight: 0.35,
        enabled: true
      },
      historyBased: {
        name: 'History-Based Recommendation',
        weight: 0.30,
        enabled: true
      },
      valueBased: {
        name: 'Value-Based Recommendation',
        weight: 0.25,
        enabled: true
      },
      collaborativeBased: {
        name: 'Collaborative-Based Recommendation',
        weight: 0.10,
        enabled: true
      }
    };
  }

  loadRecommendationHistory() {
    if (fs.existsSync(RECOMMENDATION_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(RECOMMENDATION_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading recommendation history:', error.message);
        return [];
      }
    }
    return [];
  }

  saveRecommendationHistory() {
    fs.writeFileSync(RECOMMENDATION_LOG_FILE, JSON.stringify(this.recommendationHistory, null, 2));
  }

  loadUserPreferences() {
    return {
      preferredCategories: {},
      preferredCapabilities: {},
      avoidedCapabilities: {},
      contextPreferences: {}
    };
  }

  async recommend(context = {}, options = {}) {
    console.log('=== Generating capability recommendations ===');

    const recommendations = [];
    const limit = options.limit || 5;

    const contextBased = await this.getContextBasedRecommendations(context);
    const historyBased = await this.getHistoryBasedRecommendations(context);
    const valueBased = await this.getValueBasedRecommendations(context);
    const collaborativeBased = await this.getCollaborativeBasedRecommendations(context);

    const allRecommendations = [
      ...contextBased.map(r => ({ ...r, source: 'context' })),
      ...historyBased.map(r => ({ ...r, source: 'history' })),
      ...valueBased.map(r => ({ ...r, source: 'value' })),
      ...collaborativeBased.map(r => ({ ...r, source: 'collaborative' }))
    ];

    const aggregated = this.aggregateRecommendations(allRecommendations);

    const sorted = aggregated.sort((a, b) => b.score - a.score);
    const topRecommendations = sorted.slice(0, limit);

    for (const rec of topRecommendations) {
      recommendations.push({
        capability: rec.capability,
        score: rec.score,
        confidence: rec.confidence,
        reasons: rec.reasons,
        sources: rec.sources
      });
    }

    const result = {
      timestamp: new Date().toISOString(),
      context: context,
      recommendations: recommendations
    };

    this.recommendationHistory.push(result);
    this.saveRecommendationHistory();

    console.log(`✅ Generated ${recommendations.length} recommendations`);
    return result;
  }

  async getContextBasedRecommendations(context) {
    if (!this.recommendationEngine.contextBased.enabled) return [];

    const recommendations = [];
    const taskType = context.taskType || '';
    const dataType = context.dataType || '';
    const operation = context.operation || '';

    const mappings = {
      file_operation: ['filesystem', 'fs_create_file', 'fs_modify_file', 'fs_copy_file'],
      data_processing: ['data_transform', 'dt_json_to_csv', 'dt_csv_to_json'],
      api_call: ['network', 'net_http_get', 'net_http_post'],
      error_handling: ['error_handling', 'error_recovery']
    };

    for (const [key, capabilityIds] of Object.entries(mappings)) {
      if (taskType.includes(key) || operation.includes(key)) {
        for (const id of capabilityIds) {
          const capability = this.discovery.getCapabilityDetails(id);
          if (capability) {
            recommendations.push({
              capability,
              score: 0.8,
              confidence: 0.7,
              reasons: [`Context match: ${key}`]
            });
          }
        }
      }
    }

    return recommendations;
  }

  async getHistoryBasedRecommendations(context) {
    if (!this.recommendationEngine.historyBased.enabled) return [];

    const recommendations = [];
    const stats = this.unifiedInterface.getStatistics();
    const byCapability = stats.byCapability || {};

    const sortedCapabilities = Object.entries(byCapability)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);

    for (const [capabilityId, usageCount] of sortedCapabilities) {
      const capability = this.discovery.getCapabilityDetails(capabilityId);
      if (capability) {
        const score = Math.min(1, usageCount / 10);
        recommendations.push({
          capability,
          score,
          confidence: 0.6,
          reasons: [`Frequently used: ${usageCount} times`]
        });
      }
    }

    return recommendations;
  }

  async getValueBasedRecommendations(context) {
    if (!this.recommendationEngine.valueBased.enabled) return [];

    const recommendations = [];

    const valueMetrics = {
      reliability: { weight: 0.3 },
      efficiency: { weight: 0.25 },
      versatility: { weight: 0.25 },
      usability: { weight: 0.2 }
    };

    const capabilities = this.unifiedInterface.listCapabilities();

    for (const cap of capabilities) {
      const capability = this.discovery.getCapabilityDetails(cap.id);
      if (!capability) continue;

      let valueScore = 0;
      const reasons = [];

      if (capability.metadata?.reliability) {
        valueScore += capability.metadata.reliability * valueMetrics.reliability.weight;
        reasons.push(`High reliability: ${(capability.metadata.reliability * 100).toFixed(0)}%`);
      }

      if (capability.metadata?.适用场景?.length > 2) {
        valueScore += 0.7 * valueMetrics.versatility.weight;
        reasons.push('Versatile capability');
      }

      if (capability.metadata?.优势?.length > 2) {
        valueScore += 0.8 * valueMetrics.usability.weight;
        reasons.push('Easy to use');
      }

      if (valueScore > 0.3) {
        recommendations.push({
          capability,
          score: valueScore,
          confidence: 0.65,
          reasons
        });
      }
    }

    return recommendations;
  }

  async getCollaborativeBasedRecommendations(context) {
    if (!this.recommendationEngine.collaborativeBased.enabled) return [];

    const recommendations = [];

    const patterns = [
      {
        trigger: 'fs_create_file',
        recommendations: ['fs_modify_file', 'fs_copy_file'],
        reason: 'Often used after file creation'
      },
      {
        trigger: 'net_http_get',
        recommendations: ['dt_json_to_csv', 'fs_create_file'],
        reason: 'Often used after HTTP GET'
      },
      {
        trigger: 'dt_csv_to_json',
        recommendations: ['net_http_post', 'fs_create_file'],
        reason: 'Often used after data conversion'
      }
    ];

    const recentCalls = this.unifiedInterface.getStatistics().recentCalls || [];
    const lastCapability = recentCalls.length > 0 ? recentCalls[recentCalls.length - 1].capabilityId : null;

    if (lastCapability) {
      for (const pattern of patterns) {
        if (lastCapability.includes(pattern.trigger)) {
          for (const recId of pattern.recommendations) {
            const capability = this.discovery.getCapabilityDetails(recId);
            if (capability) {
              recommendations.push({
                capability,
                score: 0.6,
                confidence: 0.5,
                reasons: [pattern.reason]
              });
            }
          }
        }
      }
    }

    return recommendations;
  }

  aggregateRecommendations(allRecommendations) {
    const aggregated = new Map();

    for (const rec of allRecommendations) {
      const id = rec.capability.id;

      if (!aggregated.has(id)) {
        aggregated.set(id, {
          capability: rec.capability,
          score: 0,
          confidence: 0,
          reasons: [],
          sources: []
        });
      }

      const existing = aggregated.get(id);
      const engineWeight = this.recommendationEngine[`${rec.source}Based`]?.weight || 0.25;

      existing.score += rec.score * engineWeight;
      existing.confidence = Math.max(existing.confidence, rec.confidence);
      existing.reasons.push(...rec.reasons);
      existing.sources.push(rec.source);
    }

    return Array.from(aggregated.values());
  }

  recordFeedback(capabilityId, wasUseful, context = {}) {
    console.log(`Recording recommendation feedback for: ${capabilityId}`);

    if (wasUseful) {
      this.userPreferences.preferredCapabilities[capabilityId] = 
        (this.userPreferences.preferredCapabilities[capabilityId] || 0) + 1;
    } else {
      this.userPreferences.avoidedCapabilities[capabilityId] = 
        (this.userPreferences.avoidedCapabilities[capabilityId] || 0) + 1;
    }

    this.recommendationHistory.push({
      timestamp: new Date().toISOString(),
      action: 'feedback',
      capabilityId,
      wasUseful,
      context
    });
    this.saveRecommendationHistory();
  }

  getRecommendationStatistics() {
    return {
      totalRecommendations: this.recommendationHistory.filter(h => h.recommendations).length,
      totalFeedback: this.recommendationHistory.filter(h => h.action === 'feedback').length,
      engineStatus: this.recommendationEngine,
      recentRecommendations: this.recommendationHistory.slice(-10)
    };
  }

  clearHistory() {
    this.recommendationHistory = [];
    this.saveRecommendationHistory();
    console.log('Recommendation history cleared');
  }
}

module.exports = CapabilityRecommendation;
