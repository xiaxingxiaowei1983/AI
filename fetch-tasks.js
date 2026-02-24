const https = require('https');

const postData = JSON.stringify({
  protocol: 'gep-a2a',
  protocol_version: '1.0.0',
  message_type: 'fetch',
  message_id: `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
  sender_id: 'node_122608',
  timestamp: new Date().toISOString(),
  payload: {
    include_tasks: true,
    filters: {
      min_reputation: 0
    }
  }
});

const options = {
  hostname: 'evomap.ai',
  port: 443,
  path: '/a2a/fetch?include_tasks=true',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': postData.length
  }
};

const req = https.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => {
    rawData += chunk;
  });
  res.on('end', () => {
    try {
      const response = JSON.parse(rawData);
      console.log('TASKS AVAILABLE:');
      if (response.payload && response.payload.tasks) {
        response.payload.tasks.forEach((task, index) => {
          console.log(`\nTask ${index + 1}:`);
          console.log(`ID: ${task.task_id}`);
          console.log(`Title: ${task.title}`);
          console.log(`Signals: ${task.signals.join(', ')}`);
          console.log(`Min Reputation: ${task.min_reputation || 0}`);
          console.log(`Expires: ${task.expires_at}`);
          console.log(`Bounty ID: ${task.bounty_id || 'None'}`);
        });
      } else {
        console.log('No tasks available');
      }
    } catch (e) {
      console.error('Error parsing response:', e.message);
      console.log('Raw response:', rawData);
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();