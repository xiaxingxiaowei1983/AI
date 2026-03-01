const fs = require('fs');
const path = require('path');

const ANALYTICS_LOG_FILE = path.join(__dirname, '../analytics-logs.json');

class UsagePatternAnalyzer {
  constructor(unifiedInterface) {
    this.unifiedInterface = unifiedInterface;
    this.patternDefinitions = this.definePatterns();
    this.analyticsLogs = this.loadAnalyticsLogs();
    this.detectedPatterns = new Map();
    this.anomalyThresholds = this.defineAnomalyThresholds();
  }

  definePatterns() {
    return {
      sequential_usage: {
        name: 'Sequential Usage Pattern',
        description: 'Capabilities used in sequence',
        detection: 'order_analysis',
        minOccurrences: 3,
        timeWindow: 3600000
      },
      time_based_usage: {
        name: 'Time-Based Usage Pattern',
        description: 'Usage at specific times',
        detection: 'time_analysis',
        minOccurrences: 5,
        timeWindow: 86400000
      },
      frequency_burst: {
        name: 'Frequency Burst Pattern',
        description: 'Sudden increase in usage',
        detection: 'frequency_analysis',
        threshold: 3,
        timeWindow: 300000
      },
      capability_clustering: {
        name: 'Capability Clustering Pattern',
        description: 'Related capabilities used together',
        detection: 'clustering_analysis',
        minClusterSize: 2,
        timeWindow: 600000
      },
      error_pattern: {
        name: 'Error Pattern',
        description: 'Recurring error sequences',
        detection: 'error_analysis',
        minOccurrences: 2,
        timeWindow: 1800000
      }
    };
  }

  defineAnomalyThresholds() {
    return {
      usage_spike: { multiplier: 3, minBaseline: 5 },
      usage_drop: { multiplier: 0.3, minBaseline: 10 },
      error_rate_spike: { threshold: 20 },
      response_time_spike: { multiplier: 2, minBaseline: 100 }
    };
  }

  loadAnalyticsLogs() {
    if (fs.existsSync(ANALYTICS_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(ANALYTICS_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading analytics logs:', error.message);
        return [];
      }
    }
    return [];
  }

  saveAnalyticsLogs() {
    fs.writeFileSync(ANALYTICS_LOG_FILE, JSON.stringify(this.analyticsLogs, null, 2));
  }

  async analyze(timeWindow = 86400000) {
    console.log('=== Analyzing usage patterns ===');

    const startTime = Date.now();
    const cutoffTime = startTime - timeWindow;

    const usageData = this.collectUsageData(cutoffTime);

    const patterns = {
      sequential: this.detectSequentialPatterns(usageData),
      timeBased: this.detectTimeBasedPatterns(usageData),
      frequency: this.detectFrequencyPatterns(usageData),
      clustering: this.detectClusteringPatterns(usageData),
      errors: this.detectErrorPatterns(usageData)
    };

    const anomalies = this.detectAnomalies(usageData);

    const analysisResult = {
      timestamp: new Date().toISOString(),
      timeWindow,
      duration: Date.now() - startTime,
      patterns,
      anomalies,
      summary: this.generateSummary(patterns, anomalies)
    };

    this.analyticsLogs.push(analysisResult);
    this.saveAnalyticsLogs();

    console.log(`✅ Pattern analysis complete: ${Object.values(patterns).flat().length} patterns detected`);
    return analysisResult;
  }

  collectUsageData(cutoffTime) {
    const stats = this.unifiedInterface.getStatistics();
    const calls = stats.recentCalls || [];

    return {
      calls: calls.filter(c => new Date(c.timestamp).getTime() > cutoffTime),
      byCapability: stats.byCapability,
      totalCalls: stats.totalCalls,
      successRate: stats.successfulCalls / stats.totalCalls * 100
    };
  }

  detectSequentialPatterns(usageData) {
    const patterns = [];
    const calls = usageData.calls;

    if (calls.length < 3) return patterns;

    const sequences = new Map();

    for (let i = 0; i < calls.length - 1; i++) {
      const current = calls[i].capabilityId;
      const next = calls[i + 1].capabilityId;

      if (current && next) {
        const key = `${current}->${next}`;
        sequences.set(key, (sequences.get(key) || 0) + 1);
      }
    }

    for (const [sequence, count] of sequences) {
      if (count >= this.patternDefinitions.sequential_usage.minOccurrences) {
        const [from, to] = sequence.split('->');
        patterns.push({
          type: 'sequential',
          sequence: { from, to },
          occurrences: count,
          confidence: Math.min(1, count / 10)
        });
      }
    }

    return patterns;
  }

  detectTimeBasedPatterns(usageData) {
    const patterns = [];
    const calls = usageData.calls;

    if (calls.length < 5) return patterns;

    const hourlyUsage = new Array(24).fill(0);

    for (const call of calls) {
      const hour = new Date(call.timestamp).getHours();
      hourlyUsage[hour]++;
    }

    const avgUsage = hourlyUsage.reduce((a, b) => a + b, 0) / 24;

    for (let hour = 0; hour < 24; hour++) {
      if (hourlyUsage[hour] > avgUsage * 1.5) {
        patterns.push({
          type: 'time_based',
          hour,
          usage: hourlyUsage[hour],
          average: avgUsage,
          deviation: (hourlyUsage[hour] - avgUsage) / avgUsage
        });
      }
    }

    return patterns;
  }

  detectFrequencyPatterns(usageData) {
    const patterns = [];
    const calls = usageData.calls;

    if (calls.length < 10) return patterns;

    const timeWindows = new Map();
    const windowSize = 300000;

    for (const call of calls) {
      const windowKey = Math.floor(new Date(call.timestamp).getTime() / windowSize);
      timeWindows.set(windowKey, (timeWindows.get(windowKey) || 0) + 1);
    }

    const frequencies = Array.from(timeWindows.values());
    const avgFrequency = frequencies.reduce((a, b) => a + b, 0) / frequencies.length;

    for (const [window, count] of timeWindows) {
      if (count > avgFrequency * this.patternDefinitions.frequency_burst.threshold) {
        patterns.push({
          type: 'frequency_burst',
          timestamp: new Date(parseInt(window) * windowSize).toISOString(),
          count,
          average: avgFrequency,
          ratio: count / avgFrequency
        });
      }
    }

    return patterns;
  }

  detectClusteringPatterns(usageData) {
    const patterns = [];
    const calls = usageData.calls;

    if (calls.length < 5) return patterns;

    const clusters = new Map();
    const windowSize = 600000;

    for (const call of calls) {
      const windowKey = Math.floor(new Date(call.timestamp).getTime() / windowSize);
      if (!clusters.has(windowKey)) {
        clusters.set(windowKey, new Set());
      }
      clusters.get(windowKey).add(call.capabilityId);
    }

    for (const [window, capabilities] of clusters) {
      if (capabilities.size >= this.patternDefinitions.capability_clustering.minClusterSize) {
        patterns.push({
          type: 'clustering',
          timestamp: new Date(parseInt(window) * windowSize).toISOString(),
          capabilities: Array.from(capabilities),
          clusterSize: capabilities.size
        });
      }
    }

    return patterns;
  }

  detectErrorPatterns(usageData) {
    const patterns = [];
    const calls = usageData.calls;

    const failedCalls = calls.filter(c => !c.success);
    if (failedCalls.length < 2) return patterns;

    const errorSequences = new Map();

    for (let i = 0; i < failedCalls.length - 1; i++) {
      const current = failedCalls[i].capabilityId;
      const next = failedCalls[i + 1].capabilityId;

      if (current && next) {
        const key = `${current}->${next}`;
        errorSequences.set(key, (errorSequences.get(key) || 0) + 1);
      }
    }

    for (const [sequence, count] of errorSequences) {
      if (count >= this.patternDefinitions.error_pattern.minOccurrences) {
        const [from, to] = sequence.split('->');
        patterns.push({
          type: 'error_sequence',
          sequence: { from, to },
          occurrences: count
        });
      }
    }

    return patterns;
  }

  detectAnomalies(usageData) {
    const anomalies = [];
    const thresholds = this.anomalyThresholds;

    const byCapability = usageData.byCapability || {};
    const values = Object.values(byCapability);
    const avgUsage = values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;

    for (const [capabilityId, count] of Object.entries(byCapability)) {
      if (avgUsage >= thresholds.usage_spike.minBaseline && count > avgUsage * thresholds.usage_spike.multiplier) {
        anomalies.push({
          type: 'usage_spike',
          capabilityId,
          current: count,
          baseline: avgUsage,
          ratio: count / avgUsage
        });
      }

      if (avgUsage >= thresholds.usage_drop.minBaseline && count < avgUsage * thresholds.usage_drop.multiplier) {
        anomalies.push({
          type: 'usage_drop',
          capabilityId,
          current: count,
          baseline: avgUsage,
          ratio: count / avgUsage
        });
      }
    }

    return anomalies;
  }

  generateSummary(patterns, anomalies) {
    const totalPatterns = Object.values(patterns).flat().length;

    return {
      totalPatterns,
      patternBreakdown: {
        sequential: patterns.sequential.length,
        timeBased: patterns.timeBased.length,
        frequency: patterns.frequency.length,
        clustering: patterns.clustering.length,
        errors: patterns.errors.length
      },
      totalAnomalies: anomalies.length,
      anomalyBreakdown: {
        usageSpike: anomalies.filter(a => a.type === 'usage_spike').length,
        usageDrop: anomalies.filter(a => a.type === 'usage_drop').length
      },
      healthScore: this.calculateHealthScore(patterns, anomalies)
    };
  }

  calculateHealthScore(patterns, anomalies) {
    let score = 100;

    score -= patterns.errors.length * 5;
    score -= anomalies.filter(a => a.type === 'usage_spike').length * 3;
    score -= anomalies.filter(a => a.type === 'usage_drop').length * 2;

    score += patterns.sequential.length * 2;
    score += patterns.clustering.length * 1;

    return Math.max(0, Math.min(100, score));
  }

  getAnalyticsStatistics() {
    return {
      totalAnalyses: this.analyticsLogs.length,
      recentAnalyses: this.analyticsLogs.slice(-10),
      averagePatternsDetected: this.calculateAveragePatterns(),
      averageAnomaliesDetected: this.calculateAverageAnomalies()
    };
  }

  calculateAveragePatterns() {
    if (this.analyticsLogs.length === 0) return 0;
    return this.analyticsLogs.reduce((sum, a) => sum + (a.summary?.totalPatterns || 0), 0) / this.analyticsLogs.length;
  }

  calculateAverageAnomalies() {
    if (this.analyticsLogs.length === 0) return 0;
    return this.analyticsLogs.reduce((sum, a) => sum + (a.summary?.totalAnomalies || 0), 0) / this.analyticsLogs.length;
  }

  clearLogs() {
    this.analyticsLogs = [];
    this.saveAnalyticsLogs();
    console.log('Analytics logs cleared');
  }
}

module.exports = UsagePatternAnalyzer;
