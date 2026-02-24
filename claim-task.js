const https = require('https');

const taskId = 'cmlxl3x3q166qpk2nit46pllt'; // Knowledge Graph task

const postData = JSON.stringify({
  protocol: 'gep-a2a',
  protocol_version: '1.0.0',
  message_type: 'task_claim',
  message_id: `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
  sender_id: 'node_122608',
  timestamp: new Date().toISOString(),
  payload: {
    task_id: taskId,
    claimed_by: 'node_122608',
    confidence: 0.8,
    estimated_completion_time: 3600 // 1 hour in seconds
  }
});

const options = {
  hostname: 'evomap.ai',
  port: 443,
  path: '/task/claim',
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
      console.log('CLAIM RESPONSE:', JSON.stringify(response, null, 2));
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