const fs = require('fs');
const path = require('path');

const PREDICTOR_LOG_FILE = path.join(__dirname, '../usage-predictor-logs.json');

class UsagePredictor {
  constructor(patternAnalyzer) {
    this.patternAnalyzer = patternAnalyzer;
    this.predictionModel = this.initPredictionModel();
    this.predictorLogs = this.loadPredictorLogs();
    this.predictionAccuracy = new Map();
  }

  initPredictionModel() {
    return {
      version: '1.0',
      algorithms: {
        moving_average: { weight: 0.3, windowSize: 7 },
        exponential_smoothing: { weight: 0.4, alpha: 0.3 },
        trend_based: { weight: 0.3, trendWindow: 14 }
      },
      features: [
        'historical_usage',
        'time_of_day',
        'day_of_week',
        'recent_trends',
        'error_rate'
      ]
    };
  }

  loadPredictorLogs() {
    if (fs.existsSync(PREDICTOR_LOG_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(PREDICTOR_LOG_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading predictor logs:', error.message);
        return [];
      }
    }
    return [];
  }

  savePredictorLogs() {
    fs.writeFileSync(PREDICTOR_LOG_FILE, JSON.stringify(this.predictorLogs, null, 2));
  }

  async predict(capabilityId, horizon = 24) {
    console.log(`=== Predicting usage for: ${capabilityId} ===`);

    const predictionId = `prediction_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const startTime = Date.now();

    try {
      const historicalData = await this.getHistoricalData(capabilityId);

      const features = this.extractFeatures(historicalData);

      const predictions = {
        movingAverage: this.predictMovingAverage(historicalData, horizon),
        exponentialSmoothing: this.predictExponentialSmoothing(historicalData, horizon),
        trendBased: this.predictTrendBased(historicalData, horizon)
      };

      const ensemblePrediction = this.combinePredictions(predictions);

      const confidence = this.calculateConfidence(predictions, historicalData);

      const predictionResult = {
        predictionId,
        capabilityId,
        timestamp: new Date().toISOString(),
        horizon,
        duration: Date.now() - startTime,
        predictions: ensemblePrediction,
        confidence,
        breakdown: predictions,
        features
      };

      this.predictorLogs.push(predictionResult);
      this.savePredictorLogs();

      console.log(`✅ Prediction complete: ${capabilityId} - Predicted usage: ${ensemblePrediction.predicted}`);
      return predictionResult;

    } catch (error) {
      console.error(`❌ Prediction failed for ${capabilityId}:`, error.message);

      const failedResult = {
        predictionId,
        capabilityId,
        timestamp: new Date().toISOString(),
        horizon,
        duration: Date.now() - startTime,
        success: false,
        error: error.message
      };

      this.predictorLogs.push(failedResult);
      this.savePredictorLogs();

      return failedResult;
    }
  }

  async getHistoricalData(capabilityId) {
    const analytics = this.patternAnalyzer.analyticsLogs || [];
    
    const data = [];
    for (const log of analytics) {
      const usage = log.patterns?.frequency?.find(p => p.capabilityId === capabilityId)?.count || 0;
      data.push({
        timestamp: log.timestamp,
        usage
      });
    }

    return data;
  }

  extractFeatures(historicalData) {
    if (historicalData.length === 0) {
      return { hasData: false };
    }

    const usageValues = historicalData.map(d => d.usage);
    const avgUsage = usageValues.reduce((a, b) => a + b, 0) / usageValues.length;
    const maxUsage = Math.max(...usageValues);
    const minUsage = Math.min(...usageValues);

    return {
      hasData: true,
      dataPoints: historicalData.length,
      averageUsage: avgUsage,
      maxUsage,
      minUsage,
      variance: this.calculateVariance(usageValues)
    };
  }

  predictMovingAverage(data, horizon) {
    const windowSize = this.predictionModel.algorithms.moving_average.windowSize;
    const recentData = data.slice(-windowSize);

    if (recentData.length === 0) {
      return { predicted: 0, method: 'moving_average' };
    }

    const average = recentData.reduce((sum, d) => sum + d.usage, 0) / recentData.length;

    const predictions = [];
    for (let i = 0; i < horizon; i++) {
      predictions.push({
        hour: i,
        predicted: Math.round(average)
      });
    }

    return {
      predicted: Math.round(average * horizon),
      hourly: predictions,
      method: 'moving_average'
    };
  }

  predictExponentialSmoothing(data, horizon) {
    const alpha = this.predictionModel.algorithms.exponential_smoothing.alpha;

    if (data.length === 0) {
      return { predicted: 0, method: 'exponential_smoothing' };
    }

    let smoothed = data[0].usage;
    for (let i = 1; i < data.length; i++) {
      smoothed = alpha * data[i].usage + (1 - alpha) * smoothed;
    }

    const predictions = [];
    for (let i = 0; i < horizon; i++) {
      predictions.push({
        hour: i,
        predicted: Math.round(smoothed)
      });
    }

    return {
      predicted: Math.round(smoothed * horizon),
      hourly: predictions,
      method: 'exponential_smoothing'
    };
  }

  predictTrendBased(data, horizon) {
    if (data.length < 2) {
      return { predicted: 0, method: 'trend_based' };
    }

    const recentData = data.slice(-7);
    const values = recentData.map(d => d.usage);

    let trend = 0;
    for (let i = 1; i < values.length; i++) {
      trend += values[i] - values[i - 1];
    }
    trend /= (values.length - 1);

    const lastValue = values[values.length - 1];
    const predictions = [];

    for (let i = 0; i < horizon; i++) {
      const predicted = Math.max(0, Math.round(lastValue + trend * (i + 1)));
      predictions.push({
        hour: i,
        predicted
      });
    }

    const totalPredicted = predictions.reduce((sum, p) => sum + p.predicted, 0);

    return {
      predicted: totalPredicted,
      hourly: predictions,
      method: 'trend_based',
      trend
    };
  }

  combinePredictions(predictions) {
    const weights = {
      movingAverage: this.predictionModel.algorithms.moving_average.weight,
      exponentialSmoothing: this.predictionModel.algorithms.exponential_smoothing.weight,
      trendBased: this.predictionModel.algorithms.trend_based.weight
    };

    const weightedSum = 
      predictions.movingAverage.predicted * weights.movingAverage +
      predictions.exponentialSmoothing.predicted * weights.exponentialSmoothing +
      predictions.trendBased.predicted * weights.trendBased;

    return {
      predicted: Math.round(weightedSum),
      confidence: 0.75,
      method: 'ensemble'
    };
  }

  calculateConfidence(predictions, historicalData) {
    let confidence = 0.5;

    if (historicalData.length >= 7) {
      confidence += 0.2;
    }

    if (historicalData.length >= 14) {
      confidence += 0.1;
    }

    const values = [predictions.movingAverage.predicted, predictions.exponentialSmoothing.predicted, predictions.trendBased.predicted];
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const variance = this.calculateVariance(values);

    if (variance < avg * 0.1) {
      confidence += 0.15;
    }

    return Math.min(1, confidence);
  }

  calculateVariance(values) {
    if (values.length === 0) return 0;
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    return values.reduce((sum, v) => sum + Math.pow(v - avg, 2), 0) / values.length;
  }

  async predictAllCapabilities(horizon = 24) {
    console.log('=== Predicting usage for all capabilities ===');

    const predictions = {};
    const stats = this.patternAnalyzer.unifiedInterface?.getStatistics() || {};
    const capabilities = Object.keys(stats.byCapability || {});

    for (const capabilityId of capabilities) {
      predictions[capabilityId] = await this.predict(capabilityId, horizon);
    }

    const summary = {
      timestamp: new Date().toISOString(),
      horizon,
      totalCapabilities: capabilities.length,
      predictions,
      topPredicted: this.getTopPredicted(predictions, 5),
      lowPredicted: this.getLowPredicted(predictions, 5)
    };

    console.log(`✅ All predictions complete: ${capabilities.length} capabilities`);
    return summary;
  }

  getTopPredicted(predictions, limit) {
    return Object.entries(predictions)
      .filter(([_, p]) => p.predictions?.predicted !== undefined)
      .sort((a, b) => b[1].predictions.predicted - a[1].predictions.predicted)
      .slice(0, limit)
      .map(([capabilityId, prediction]) => ({
        capabilityId,
        predicted: prediction.predictions.predicted,
        confidence: prediction.confidence
      }));
  }

  getLowPredicted(predictions, limit) {
    return Object.entries(predictions)
      .filter(([_, p]) => p.predictions?.predicted !== undefined)
      .sort((a, b) => a[1].predictions.predicted - b[1].predictions.predicted)
      .slice(0, limit)
      .map(([capabilityId, prediction]) => ({
        capabilityId,
        predicted: prediction.predictions.predicted,
        confidence: prediction.confidence
      }));
  }

  recordActualUsage(capabilityId, actualUsage) {
    const recentPredictions = this.predictorLogs
      .filter(p => p.capabilityId === capabilityId && p.predictions)
      .slice(-1);

    if (recentPredictions.length > 0) {
      const prediction = recentPredictions[0];
      const predicted = prediction.predictions.predicted;
      const accuracy = 1 - Math.abs(predicted - actualUsage) / Math.max(predicted, actualUsage, 1);

      this.predictionAccuracy.set(capabilityId, {
        lastAccuracy: accuracy,
        timestamp: new Date().toISOString()
      });

      console.log(`Prediction accuracy for ${capabilityId}: ${(accuracy * 100).toFixed(1)}%`);
    }
  }

  getPredictorStatistics() {
    return {
      totalPredictions: this.predictorLogs.length,
      successfulPredictions: this.predictorLogs.filter(p => p.predictions).length,
      failedPredictions: this.predictorLogs.filter(p => !p.predictions).length,
      averageConfidence: this.calculateAverageConfidence(),
      accuracyTracking: Object.fromEntries(this.predictionAccuracy)
    };
  }

  calculateAverageConfidence() {
    const predictions = this.predictorLogs.filter(p => p.confidence !== undefined);
    if (predictions.length === 0) return 0;
    return predictions.reduce((sum, p) => sum + p.confidence, 0) / predictions.length;
  }

  clearLogs() {
    this.predictorLogs = [];
    this.savePredictorLogs();
    console.log('Predictor logs cleared');
  }
}

module.exports = UsagePredictor;
