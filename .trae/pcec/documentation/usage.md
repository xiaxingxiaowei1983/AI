# PCEC 系统使用说明

## 1. 系统启动

### 1.1 手动启动

```bash
# 启动PCEC核心执行模块
node pcec-cycle.js

# 启动小时调度器
node pcec-hourly-scheduler.js
```

### 1.2 自动启动

将以下命令添加到系统启动脚本中，确保PCEC系统在系统启动时自动运行：

```bash
# 启动小时调度器
node pcec-hourly-scheduler.js
```

## 2. 系统配置

### 2.1 核心配置 (pcec-cycle.js)

核心配置位于`PCEC_CONFIG`对象中：

```javascript
const PCEC_CONFIG = {
  interval: 60 * 60 * 1000, // 1小时
  minEvolutionItems: 1,
  maxNightEvolution: 8, // 夜间进化8小时
  reportRecipient: '陈婷（剑锋传奇）',
  consecutiveFailureThreshold: 2 // 连续失败阈值
};
```

### 2.2 调度器配置 (pcec-hourly-scheduler.js)

调度器配置位于`CONFIG`对象中：

```javascript
const CONFIG = {
  // 基础配置
  interval: 60 * 60 * 1000, // 1小时间隔
  mainTriggerInterval: 1 * 60 * 60 * 1000, // 1小时主要触发
  nightEvolutionHours: 8, // 夜间进化8小时
  
  // 路径配置
  baseDir: path.join(__dirname, 'skills', 'capability-evolver'),
  dataDir: path.join(__dirname, 'skills', 'capability-evolver', 'data'),
  tasksDir: path.join(__dirname, 'skills', 'capability-evolver', 'tasks'),
  
  // 日志配置
  logFile: path.join(__dirname, 'logs', 'pcec.log'),
  
  // 状态配置
  statusFile: path.join(__dirname, 'skills', 'capability-evolver', 'data', 'pcec-status.json'),
  lastRunFile: path.join(__dirname, 'skills', 'capability-evolver', 'data', 'pcec-last-run.json')
};
```

## 3. 系统操作

### 3.1 手动触发PCEC

```bash
# 手动触发一次PCEC
node -e "require('./pcec-cycle').executePCECCycle()"
```

### 3.2 检查系统状态

```bash
# 检查PCEC状态
node -e "const storage = require('./pcec-cycle'); storage.initializeStorage(); const status = storage.readStorage().status; console.log(status);"
```

### 3.3 查看进化历史

```bash
# 查看进化历史索引
cat .trae/pcec/history/index.json

# 查看具体的进化历史记录
ls .trae/pcec/history/
cat .trae/pcec/history/<history-file>.json
```

### 3.4 查看进化产物

```bash
# 查看能力轮廓
ls .trae/pcec/products/capability-shapes/

# 查看默认策略
ls .trae/pcec/products/default-strategies/

# 查看行为规则
ls .trae/pcec/products/behavior-rules/
```

## 4. 监控与管理

### 4.1 查看监控报告

```bash
# 生成监控报告
node -e "const monitor = require('./capabilities/evolution-monitor').evolutionMonitor; const report = monitor.generateExecutionReport(); console.log(JSON.stringify(report, null, 2));"
```

### 4.2 查看报告状态

```bash
# 查看报告系统状态
node -e "const reporting = require('./capabilities/reporting-system').reportingSystem; const status = reporting.getStatus(); console.log(status);"
```

### 4.3 查看能力树状态

```bash
# 查看能力树状态
node -e "const tree = require('./capabilities/capability-tree').capabilityTree; const status = tree.getStatus(); console.log(status);"
```

### 4.4 查看反退化锁定状态

```bash
# 查看反退化锁定状态
node -e "const adl = require('./capabilities/anti-degeneration-lock').antiDegenerationLock; const status = adl.getStatus(); console.log(status);"
```

## 5. 故障排除

### 5.1 常见问题

| 问题 | 可能原因 | 解决方案 |
|------|----------|----------|
| PCEC执行失败 | 热点信息缓存集成错误 | 检查hotInfoCache对象的方法是否存在 |
| 进化验证失败 | 进化类型不被认可 | 确保进化类型在ADL的substantialTypes列表中 |
| 系统资源使用过高 | 内存或CPU使用超过阈值 | 检查系统资源使用情况，优化系统配置 |
| 报告发送失败 | 报告系统配置错误 | 检查reportingSystem的配置是否正确 |

### 5.2 日志查看

```bash
# 查看PCEC日志
cat logs/pcec.log

# 查看系统错误日志
node -e "const fs = require('fs'); const logs = fs.readFileSync('evolution-errors.txt', 'utf8'); console.log(logs);"
```

### 5.3 回滚操作

```bash
# 手动触发回滚
node -e "const adl = require('./capabilities/anti-degeneration-lock').antiDegenerationLock; const rolledBackState = adl.rollbackToLatest(); console.log('Rolled back to:', rolledBackState);"
```

## 6. 系统维护

### 6.1 清理历史数据

```bash
# 清理进化历史（保留最近100条）
node -e "const fs = require('fs'); const path = require('path'); const historyDir = path.join(__dirname, '.trae', 'pcec', 'history'); const files = fs.readdirSync(historyDir); const jsonFiles = files.filter(f => f.endsWith('.json') && f !== 'index.json'); if (jsonFiles.length > 100) { const filesToDelete = jsonFiles.sort().slice(0, jsonFiles.length - 100); filesToDelete.forEach(f => fs.unlinkSync(path.join(historyDir, f))); console.log(`Deleted ${filesToDelete.length} old history files`); }"
```

### 6.2 优化系统性能

```bash
# 优化能力树
node -e "const tree = require('./capabilities/capability-tree').capabilityTree; const trimCandidates = tree.trimCapabilities(); console.log(`Identified ${trimCandidates.length} capabilities for trimming`); const removed = tree.cleanupTrimmedNodes(); console.log(`Removed ${removed.length} unused capabilities`);"
```

### 6.3 更新系统配置

```bash
# 更新报告接收者
node -e "const reporting = require('./capabilities/reporting-system').reportingSystem; reporting.updateConfig({ reportingTo: '陈婷（剑锋传奇）', feishuId: 'ou_4d9197bf2f8cf48a7097b17b623e3bd3' }); console.log('Reporting configuration updated');"
```

## 7. 高级功能

### 7.1 自定义思维爆炸问题

在`pcec-cycle.js`文件中，修改`explosionQuestions`数组：

```javascript
const explosionQuestions = [
  "如果我彻底推翻当前默认做法，会发生什么？",
  "如果我是系统设计者而不是执行者，我会删掉什么？",
  "如果我要让一个能力弱 10 倍的 agent 也能成功，我需要补什么？",
  "如果这个能力要被调用 1000 次，现在的设计是否必然崩溃？",
  // 添加自定义问题
];
```

### 7.2 自定义进化产物模板

在`pcec-cycle.js`文件中，修改`capabilityShapes`、`defaultStrategies`或`behaviorRules`数组：

```javascript
const capabilityShapes = [
  {
    type: 'capabilityShape',
    name: "智能错误恢复能力",
    input: "错误类型、错误消息、上下文信息",
    output: "恢复策略、执行步骤、预防措施",
    invariants: "错误处理必须不破坏现有功能",
    variables: "错误类型、系统状态、可用资源",
    failurePoints: "恢复策略不适用、资源不足、系统状态异常"
  },
  // 添加自定义能力轮廓
];
```

### 7.3 集成新系统

在`pcec-cycle.js`文件中，添加新系统的集成逻辑：

```javascript
// 集成新系统
console.log('\n🔗 与新系统集成...');
try {
  const newSystem = require('./path/to/new-system');
  newSystem.integrateWithPCEC(module.exports);
} catch (error) {
  console.error(`Error integrating with new system: ${error.message}`);
}
```

## 8. 总结

PCEC系统是一个强大的自我进化系统，通过持续的周期性进化，不断提升智能体的能力和性能。本使用说明提供了系统的启动、配置、操作、监控、故障排除和维护指南，帮助用户更好地使用和管理PCEC系统。