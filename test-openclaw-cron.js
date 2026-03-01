const http = require('http');

const openclawGateway = 'http://127.0.0.1:18789';
const openclawToken = '2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da';

async function callOpenClawApi(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    const url = `${openclawGateway}${endpoint}`;
    console.log(`Calling: ${url} (${options.method || 'GET'})`);
    
    const req = http.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${openclawToken}`,
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        console.log(`Response status: ${res.statusCode}`);
        console.log(`Response data: ${data}`);
        resolve({ statusCode: res.statusCode, data: data });
      });
    });

    req.on('error', (error) => {
      console.error('Request error:', error.message);
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

async function testCronEndpoints() {
  console.log('=== Testing OpenClaw Cron API Endpoints ===\n');
  
  // 测试 1: GET /cron
  console.log('Test 1: GET /cron');
  try {
    await callOpenClawApi('/cron');
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('');
  
  // 测试 2: GET /api/cron
  console.log('Test 2: GET /api/cron');
  try {
    await callOpenClawApi('/api/cron');
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('');
  
  // 测试 3: GET /cron/jobs
  console.log('Test 3: GET /cron/jobs');
  try {
    await callOpenClawApi('/cron/jobs');
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('');
  
  // 测试 4: GET /api/cron/jobs
  console.log('Test 4: GET /api/cron/jobs');
  try {
    await callOpenClawApi('/api/cron/jobs');
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('');
  
  // 测试 5: POST /cron
  console.log('Test 5: POST /cron');
  try {
    const testJob = {
      name: 'Test Job',
      description: 'Test job for API exploration',
      agentId: 'main',
      enabled: true,
      schedule: {
        type: 'every',
        every: {
          value: 1,
          unit: 'hours'
        }
      },
      execution: {
        session: 'isolated',
        wakeMode: 'now',
        what: 'agentTurn',
        prompt: 'Test prompt'
      },
      delivery: {
        mode: 'announce',
        channel: 'feishu'
      }
    };
    await callOpenClawApi('/cron', {
      method: 'POST',
      body: testJob
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('');
  
  // 测试 6: POST /api/cron
  console.log('Test 6: POST /api/cron');
  try {
    const testJob = {
      name: 'Test Job 2',
      description: 'Test job for API exploration',
      agentId: 'main',
      enabled: true,
      schedule: {
        type: 'every',
        every: {
          value: 1,
          unit: 'hours'
        }
      },
      execution: {
        session: 'isolated',
        wakeMode: 'now',
        what: 'agentTurn',
        prompt: 'Test prompt'
      },
      delivery: {
        mode: 'announce',
        channel: 'feishu'
      }
    };
    await callOpenClawApi('/api/cron', {
      method: 'POST',
      body: testJob
    });
  } catch (error) {
    console.error('Error:', error.message);
  }
  console.log('');
  
  console.log('=== End of API Endpoint Testing ===');
}

testCronEndpoints();