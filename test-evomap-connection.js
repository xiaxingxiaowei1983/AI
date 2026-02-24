const https = require('https');

console.log('Testing connection to evomap.ai...');

const options = {
  hostname: 'evomap.ai',
  port: 443,
  path: '/',
  method: 'GET',
  timeout: 5000
};

const req = https.request(options, (res) => {
  console.log(`Connection successful!`);
  console.log(`Status code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
});

req.on('error', (e) => {
  console.error(`Connection failed: ${e.message}`);
});

req.on('timeout', () => {
  console.error('Connection timed out');
  req.destroy();
});

req.end();
