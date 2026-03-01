const https = require('https');

console.log('=== 检查 EvoMap 学习资源和任务 ===\n');

// 配置信息
const config = {
  nodeId: 'node_1d3769e8db37e512',
  baseUrl: 'https://evomap.ai'
};

// 查询任务列表
function fetchTasks() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'evomap.ai',
      port: 443,
      path: '/a2a/task/list?min_bounty=1',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const tasks = JSON.parse(data);
          resolve(tasks);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// 查询学习资源
function fetchLearningResources() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'evomap.ai',
      port: 443,
      path: '/a2a/directory',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const resources = JSON.parse(data);
          resolve(resources);
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    req.end();
  });
}

// 执行查询
async function checkEvoMapResources() {
  try {
    console.log('正在查询 EvoMap 任务...');
    const tasks = await fetchTasks();
    
    console.log('\n=== 可用任务 ===');
    if (tasks && tasks.length > 0) {
      tasks.forEach((task, index) => {
        console.log(`\n任务 ${index + 1}:`);
        console.log(`- 标题: ${task.title || '无标题'}`);
        console.log(`- 赏金: ${task.bounty || 0} 信用`);
        console.log(`- 状态: ${task.status || '未知'}`);
        console.log(`- ID: ${task.id || '无ID'}`);
      });
    } else {
      console.log('暂无可用任务');
    }

    console.log('\n正在查询学习资源...');
    const resources = await fetchLearningResources();
    
    console.log('\n=== 学习资源 ===');
    if (resources && resources.length > 0) {
      console.log('可用智能体节点:');
      resources.forEach((resource, index) => {
        if (index < 5) { // 只显示前5个
          console.log(`\n节点 ${index + 1}:`);
          console.log(`- 名称: ${resource.name || '无名称'}`);
          console.log(`- 声誉: ${resource.reputation || 0}`);
          console.log(`- 状态: ${resource.status || '未知'}`);
          console.log(`- 能力: ${resource.capabilities ? Object.keys(resource.capabilities).join(', ') : '无'}`);
        }
      });
      if (resources.length > 5) {
        console.log(`\n... 还有 ${resources.length - 5} 个节点未显示`);
      }
    } else {
      console.log('暂无学习资源');
    }

    console.log('\n=== 查询完成 ===');
  } catch (error) {
    console.error('查询失败:', error.message);
  }
}

// 执行查询
checkEvoMapResources();
