const fs = require('fs');
const path = require('path');

class AnomalyDetection {
  constructor(options = {}) {
    this.options = {
      dataDir: path.join(process.cwd(), 'anomaly-data'),
      windowSize: 100,
      thresholdMultiplier: 1.5,
      minDataPoints: 10,
      ...options
    };
    
    this.metrics = new Map();
    this.alerts = [];
    
    this.ensureDirectories();
  }

  // 确保目录存在
  ensureDirectories() {
    if (!fs.existsSync(this.options.dataDir)) {
      fs.mkdirSync(this.options.dataDir, { recursive: true });
    }
  }

  // 记录指标数据
  recordMetric(metricName, value, timestamp = Date.now()) {
    if (!this.metrics.has(metricName)) {
      this.metrics.set(metricName, []);
    }
    
    const metricData = this.metrics.get(metricName);
    metricData.push({ value, timestamp });
    
    // 保持窗口大小
    if (metricData.length > this.options.windowSize) {
      metricData.shift();
    }
    
    // 检测异常
    const anomaly = this.detectAnomaly(metricName, value);
    if (anomaly) {
      this.generateAlert(metricName, value, anomaly);
    }
    
    return { recorded: true, anomaly };
  }

  // 检测异常（基于中位数和IQR）
  detectAnomaly(metricName, currentValue) {
    const metricData = this.metrics.get(metricName);
    if (!metricData || metricData.length < this.options.minDataPoints) {
      return null;
    }
    
    // 计算中位数和IQR
    const values = metricData.map(d => d.value).sort((a, b) => a - b);
    const median = this.calculateMedian(values);
    const q1 = this.calculateMedian(values.slice(0, Math.floor(values.length / 2)));
    const q3 = this.calculateMedian(values.slice(Math.ceil(values.length / 2)));
    const iqr = q3 - q1;
    
    // 计算上下边界
    const lowerBound = median - this.options.thresholdMultiplier * iqr;
    const upperBound = median + this.options.thresholdMultiplier * iqr;
    
    // 检测异常
    if (currentValue < lowerBound || currentValue > upperBound) {
      return {
        isAnomaly: true,
        value: currentValue,
        median,
        lowerBound,
        upperBound,
        deviation: currentValue > median 
          ? (currentValue - median) / (upperBound - median) 
          : (median - currentValue) / (median - lowerBound)
      };
    }
    
    return null;
  }

  // 计算中位数
  calculateMedian(values) {
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    
    if (sorted.length % 2 === 0) {
      return (sorted[mid - 1] + sorted[mid]) / 2;
    } else {
      return sorted[mid];
    }
  }

  // 生成警报
  generateAlert(metricName, value, anomaly) {
    const alert = {
      alertId: `alert_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      metricName,
      value,
      anomaly,
      timestamp: new Date().toISOString(),
      severity: this.calculateSeverity(anomaly.deviation)
    };
    
    this.alerts.push(alert);
    
    // 保存警报
    this.saveAlert(alert);
    
    // 输出警报
    this.logAlert(alert);
    
    return alert;
  }

  // 计算警报严重程度
  calculateSeverity(deviation) {
    if (deviation >= 3) return 'critical';
    if (deviation >= 2) return 'high';
    if (deviation >= 1) return 'medium';
    return 'low';
  }

  // 保存警报
  saveAlert(alert) {
    const alertFile = path.join(this.options.dataDir, `alerts_${new Date().toISOString().split('T')[0]}.json`);
    
    let alerts = [];
    if (fs.existsSync(alertFile)) {
      try {
        alerts = JSON.parse(fs.readFileSync(alertFile, 'utf8'));
      } catch (error) {
        console.error('Error reading alerts file:', error);
      }
    }
    
    alerts.push(alert);
    
    try {
      fs.writeFileSync(alertFile, JSON.stringify(alerts, null, 2), 'utf8');
    } catch (error) {
      console.error('Error saving alert:', error);
    }
  }

  // 记录警报
  logAlert(alert) {
    const severityColor = {
      critical: '🔴',
      high: '🟠',
      medium: '🟡',
      low: '🔵'
    };
    
    console.log(`${severityColor[alert.severity]} [Anomaly Detection] ${alert.severity.toUpperCase()} ALERT: ${alert.metricName}`);
    console.log(`   Value: ${alert.value}`);
    console.log(`   Median: ${alert.anomaly.median}`);
    console.log(`   Bounds: [${alert.anomaly.lowerBound}, ${alert.anomaly.upperBound}]`);
    console.log(`   Deviation: ${alert.anomaly.deviation.toFixed(2)}x`);
    console.log(`   Timestamp: ${alert.timestamp}`);
    console.log('');
  }

  // 获取指标统计
  getMetricStats(metricName) {
    const metricData = this.metrics.get(metricName);
    if (!metricData || metricData.length === 0) {
      return null;
    }
    
    const values = metricData.map(d => d.value);
    const sorted = [...values].sort((a, b) => a - b);
    
    return {
      metricName,
      count: metricData.length,
      min: Math.min(...values),
      max: Math.max(...values),
      mean: values.reduce((sum, val) => sum + val, 0) / values.length,
      median: this.calculateMedian(sorted),
      q1: this.calculateMedian(sorted.slice(0, Math.floor(sorted.length / 2))),
      q3: this.calculateMedian(sorted.slice(Math.ceil(sorted.length / 2))),
      iqr: this.calculateMedian(sorted.slice(Math.ceil(sorted.length / 2))) - this.calculateMedian(sorted.slice(0, Math.floor(sorted.length / 2))),
      lastValue: values[values.length - 1],
      timestamp: new Date().toISOString()
    };
  }

  // 分析趋势
  analyzeTrend(metricName, windowSize = 20) {
    const metricData = this.metrics.get(metricName);
    if (!metricData || metricData.length < windowSize) {
      return null;
    }
    
    const recentData = metricData.slice(-windowSize);
    const values = recentData.map(d => d.value);
    
    // 简单线性回归计算趋势
    const n = values.length;
    const sumX = Array.from({ length: n }, (_, i) => i).reduce((a, b) => a + b, 0);
    const sumY = values.reduce((a, b) => a + b, 0);
    const sumXY = Array.from({ length: n }, (_, i) => i * values[i]).reduce((a, b) => a + b, 0);
    const sumX2 = Array.from({ length: n }, (_, i) => i * i).reduce((a, b) => a + b, 0);
    
    const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
    
    return {
      metricName,
      slope,
      trend: slope > 0.1 ? 'increasing' : slope < -0.1 ? 'decreasing' : 'stable',
      strength: Math.abs(slope),
      dataPoints: n,
      timestamp: new Date().toISOString()
    };
  }

  // 获取所有指标
  getAllMetrics() {
    const metrics = [];
    for (const [metricName, data] of this.metrics.entries()) {
      const stats = this.getMetricStats(metricName);
      const trend = this.analyzeTrend(metricName);
      metrics.push({
        name: metricName,
        dataPoints: data.length,
        stats,
        trend
      });
    }
    return metrics;
  }

  // 获取最近警报
  getRecentAlerts(limit = 20) {
    return this.alerts.slice(-limit).reverse();
  }

  // 清除指标数据
  clearMetric(metricName) {
    if (this.metrics.has(metricName)) {
      this.metrics.delete(metricName);
      return { cleared: true, metricName };
    }
    return { cleared: false, metricName, error: 'Metric not found' };
  }

  // 清除所有指标
  clearAllMetrics() {
    const count = this.metrics.size;
    this.metrics.clear();
    return { cleared: true, metricsCount: count };
  }

  // 导出数据
  exportData() {
    const exportData = {
      metrics: Object.fromEntries(
        Array.from(this.metrics.entries()).map(([name, data]) => [name, data])
      ),
      alerts: this.alerts,
      options: this.options,
      timestamp: new Date().toISOString()
    };
    
    const exportFile = path.join(this.options.dataDir, `export_${Date.now()}.json`);
    fs.writeFileSync(exportFile, JSON.stringify(exportData, null, 2), 'utf8');
    
    return { exported: true, file: exportFile };
  }

  // 导入数据
  importData(filePath) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const importData = JSON.parse(content);
      
      if (importData.metrics) {
        for (const [name, data] of Object.entries(importData.metrics)) {
          this.metrics.set(name, data);
        }
      }
      
      if (importData.alerts) {
        this.alerts.push(...importData.alerts);
      }
      
      if (importData.options) {
        this.options = { ...this.options, ...importData.options };
      }
      
      return { imported: true, metrics: Object.keys(importData.metrics || {}).length };
    } catch (error) {
      return { imported: false, error: error.message };
    }
  }

  // 获取系统状态
  getStatus() {
    return {
      metricsCount: this.metrics.size,
      alertsCount: this.alerts.length,
      recentAlerts: this.getRecentAlerts(5),
      options: this.options,
      timestamp: new Date().toISOString()
    };
  }

  // 健康检查
  healthCheck() {
    return {
      status: 'healthy',
      metricsCount: this.metrics.size,
      dataDir: this.options.dataDir,
      windowSize: this.options.windowSize,
      timestamp: new Date().toISOString()
    };
  }
}

// 导出单例
module.exports = new AnomalyDetection();
module.exports.AnomalyDetection = AnomalyDetection;