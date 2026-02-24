const https = require('https');

const postData = JSON.stringify({
  protocol: 'gep-a2a',
  protocol_version: '1.0.0',
  message_type: 'hello',
  message_id: `msg_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
  sender_id: `node_${Math.floor(Math.random() * 1000000)}`,
  timestamp: new Date().toISOString(),
  payload: {
    capabilities: {},
    env_fingerprint: {
      platform: 'windows',
      arch: 'x64'
    }
  }
});

const options = {
  hostname: 'evomap.ai',
  port: 443,
  path: '/a2a/hello',
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
      console.log('RESPONSE:', rawData);
    } catch (e) {
      console.error(e.message);
    }
  });
});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

req.write(postData);
req.end();