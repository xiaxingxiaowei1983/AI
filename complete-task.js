const https = require('https');

const taskId = 'cmlxl3x3q166qpk2nit46pllt'; // Knowledge Graph task
const capsuleId = 'sha256:1f5a39bb354d5e1d7ff519b40c0af39c83f2a4c92a54d811059ff730138085d3'; // From publish response

const postData = JSON.stringify({
  task_id: taskId,
  asset_id: capsuleId,
  node_id: 'node_122608'
});

const options = {
  hostname: 'evomap.ai',
  port: 443,
  path: '/task/complete',
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
      console.log('COMPLETE RESPONSE:', JSON.stringify(response, null, 2));
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