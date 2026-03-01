const https = require('https');
const fs = require('fs');
const path = require('path');

console.log('=== 故障自动恢复系统启动 ===\n');

// 配置参数
const configPath = path.join(__dirname, 'agents', 'business', 'evomap-config.json');
const healthCheckInterval = 5 * 60 * 1000; // 5分钟健康检查一次
const recoveryAttempts = 3; // 最大恢复尝试次数
const recoveryDelay = 30 * 1000; // 恢复尝试间隔30秒

// 系统状态
let systemStatus = {
  evomapApi: 'unknown',
  lastHealthCheck: null,
  recoveryAttempts: 0,
  isRecovering: false
};

/**
 * 生成时间戳
 */
function getTimestamp() {
  return new Date().toISOString();
}

/**
 * 读取配置
 */
function loadConfig() {
  return JSON.parse(fs.readFileSync(configPath, 'utf8'));
}

/**
 * 保存配置
 */
function saveConfig(config) {
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

/**
 * 检查EvoMap API健康状态
 */
async function checkEvoMapHealth() {
  console.log(`[${getTimestamp()}] 检查EvoMap API健康状态...`);
  
  return new Promise((resolve, reject) => {
    try {
      const req = https.request('https://evomap.ai/a2a/status', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          if (res.statusCode === 200) {
            console.log(`[${getTimestamp()}] EvoMap API 健康状态: 正常`);
            systemStatus.evomapApi = 'healthy';
            systemStatus.recoveryAttempts = 0;
            systemStatus.isRecovering = false;
            resolve('healthy');
          } else {
            console.log(`[${getTimestamp()}] EvoMap API 健康状态: 异常 (状态码: ${res.statusCode})`);
            systemStatus.evomapApi = 'unhealthy';
            resolve('unhealthy');
          }
        });
      });

      req.on('error', (error) => {
        console.error(`[${getTimestamp()}] EvoMap API 健康检查失败:`, error.message);
        systemStatus.evomapApi = 'error';
        resolve('error');
      });

      req.setTimeout(10000, () => {
        console.error(`[${getTimestamp()}] EvoMap API 健康检查超时`);
        systemStatus.evomapApi = 'timeout';
        resolve('timeout');
      });

      req.end();
    } catch (error) {
      console.error(`[${getTimestamp()}] 健康检查时出错:`, error.message);
      systemStatus.evomapApi = 'error';
      resolve('error');
    }
  });
}

/**
 * 尝试恢复EvoMap API连接
 */
async function attemptRecovery() {
  if (systemStatus.isRecovering) {
    console.log(`[${getTimestamp()}] 正在恢复中，跳过本次尝试`);
    return;
  }
  
  systemStatus.isRecovering = true;
  systemStatus.recoveryAttempts++;
  
  console.log(`[${getTimestamp()}] 开始恢复EvoMap API连接 (尝试 ${systemStatus.recoveryAttempts}/${recoveryAttempts})...`);
  
  try {
    // 尝试重新连接
    const status = await checkEvoMapHealth();
    
    if (status === 'healthy') {
      console.log(`[${getTimestamp()}] EvoMap API 连接恢复成功！`);
      systemStatus.isRecovering = false;
      systemStatus.recoveryAttempts = 0;
      
      // 通知其他服务API已恢复
      notifyServicesOfRecovery();
    } else {
      if (systemStatus.recoveryAttempts < recoveryAttempts) {
        console.log(`[${getTimestamp()}] 恢复失败，${recoveryDelay/1000}秒后重试...`);
        setTimeout(attemptRecovery, recoveryDelay);
      } else {
        console.log(`[${getTimestamp()}] 恢复失败，已达到最大尝试次数`);
        systemStatus.isRecovering = false;
        systemStatus.recoveryAttempts = 0;
      }
    }
  } catch (error) {
    console.error(`[${getTimestamp()}] 恢复过程中出错:`, error.message);
    systemStatus.isRecovering = false;
    
    if (systemStatus.recoveryAttempts < recoveryAttempts) {
      console.log(`[${getTimestamp()}] 恢复失败，${recoveryDelay/1000}秒后重试...`);
      setTimeout(attemptRecovery, recoveryDelay);
    } else {
      console.log(`[${getTimestamp()}] 恢复失败，已达到最大尝试次数`);
      systemStatus.recoveryAttempts = 0;
    }
  }
}

/**
 * 通知其他服务API已恢复
 */
function notifyServicesOfRecovery() {
  console.log(`[${getTimestamp()}] 通知其他服务EvoMap API已恢复`);
  // 这里可以添加通知其他服务的逻辑
  // 例如通过消息队列或API调用通知自动学习系统等
}

/**
 * 执行健康检查和故障恢复
 */
async function executeHealthCheck() {
  try {
    const status = await checkEvoMapHealth();
    systemStatus.lastHealthCheck = getTimestamp();
    
    if (status !== 'healthy') {
      console.log(`[${getTimestamp()}] 检测到EvoMap API故障，开始恢复流程`);
      await attemptRecovery();
    }
  } catch (error) {
    console.error(`[${getTimestamp()}] 健康检查执行失败:`, error.message);
  }
}

/**
 * 生成系统健康报告
 */
function generateHealthReport() {
  console.log(`[${getTimestamp()}] 生成系统健康报告...`);
  
  const report = {
    timestamp: getTimestamp(),
    status: {
      evomapApi: systemStatus.evomapApi,
      lastHealthCheck: systemStatus.lastHealthCheck,
      recoveryAttempts: systemStatus.recoveryAttempts,
      isRecovering: systemStatus.isRecovering
    },
    recommendations: generateHealthRecommendations()
  };
  
  // 保存健康报告
  const reportPath = path.join(__dirname, 'learning', `health-report-${Date.now()}.json`);
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  
  console.log(`[${getTimestamp()}] 系统健康报告生成成功！`);
  console.log(`   保存路径: ${reportPath}`);
  console.log(`   EvoMap API 状态: ${systemStatus.evomapApi}`);
  
  return report;
}

/**
 * 生成健康建议
 */
function generateHealthRecommendations() {
  const recommendations = [];
  
  if (systemStatus.evomapApi !== 'healthy') {
    recommendations.push('EvoMap API 状态异常，建议检查网络连接和EvoMap服务状态');
  }
  
  if (systemStatus.recoveryAttempts > 0) {
    recommendations.push(`已尝试恢复EvoMap API连接 ${systemStatus.recoveryAttempts} 次`);
  }
  
  if (systemStatus.isRecovering) {
    recommendations.push('系统正在尝试恢复EvoMap API连接');
  }
  
  recommendations.push('建议定期检查系统健康状态，确保服务正常运行');
  recommendations.push('建议优化网络连接，提高API访问稳定性');
  
  return recommendations;
}

/**
 * 启动故障自动恢复系统
 */
async function startFaultRecoverySystem() {
  console.log('=== 故障自动恢复系统初始化 ===');
  console.log(`健康检查间隔: ${healthCheckInterval / 1000 / 60} 分钟`);
  console.log(`最大恢复尝试次数: ${recoveryAttempts}`);
  console.log(`恢复尝试间隔: ${recoveryDelay / 1000} 秒`);
  console.log('');
  
  // 首次执行健康检查
  await executeHealthCheck();
  generateHealthReport();
  
  // 定期执行健康检查
  setInterval(async () => {
    await executeHealthCheck();
    generateHealthReport();
  }, healthCheckInterval);
  
  console.log('=== 故障自动恢复系统已启动 ===');
  console.log('系统将每5分钟检查一次EvoMap API健康状态，并在故障时自动恢复！');
  console.log('');
}

// 启动系统
startFaultRecoverySystem();