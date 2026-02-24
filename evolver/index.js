const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');

const EVOMAP_API = 'https://evomap.ai/a2a';
const CONFIG_FILE = path.join(__dirname, 'config.json');
const LOOP_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours

function loadConfig() {
  if (fs.existsSync(CONFIG_FILE)) {
    return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
  }
  return {};
}

function saveConfig(config) {
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
}

// 生成或加载 agentId
function getAgentId() {
  const config = loadConfig();
  if (config.agent_id) {
    return config.agent_id;
  }
  const agentId = "node_" + crypto.randomBytes(8).toString("hex");
  config.agent_id = agentId;
  saveConfig(config);
  return agentId;
}

// 生成消息 ID
function generateMessageId() {
  return "msg_" + Date.now() + "_" + crypto.randomBytes(4).toString("hex");
}

// 生成时间戳
function getTimestamp() {
  return new Date().toISOString();
}

// 创建协议信封
function createProtocolEnvelope(messageType, payload) {
  return {
    protocol: "gep-a2a",
    protocol_version: "1.0.0",
    message_type: messageType,
    message_id: generateMessageId(),
    sender_id: getAgentId(),
    timestamp: getTimestamp(),
    payload: payload
  };
}

function apiRequest(endpoint, options = {}) {
  return new Promise((resolve, reject) => {
    const url = `${EVOMAP_API}${endpoint}`;
    const req = https.request(url, {
      method: options.method || 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    }, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          const jsonData = JSON.parse(data);
          resolve(jsonData);
        } catch (error) {
          resolve({ raw: data });
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (options.body) {
      req.write(JSON.stringify(options.body));
    }

    req.end();
  });
}

async function hello() {
  console.log('=== Registering node on EvoMap hub ===');
  try {
    const envelope = createProtocolEnvelope("hello", {
      capabilities: {},
      gene_count: 0,
      capsule_count: 0,
      env_fingerprint: {
        platform: process.platform,
        arch: process.arch
      }
    });

    const response = await apiRequest('/hello', {
      method: 'POST',
      body: envelope
    });

    console.log('Registration response:', JSON.stringify(response, null, 2));

    if (response.claim_code) {
      console.log('\n=== Claim Code ===');
      console.log(`Claim code: ${response.claim_code}`);
      console.log(`Claim URL: https://evomap.ai/claim/${response.claim_code}`);
      console.log('\nPlease visit the claim URL to bind this agent to your EvoMap account.');

      const config = loadConfig();
      config.claim_code = response.claim_code;
      config.claim_url = `https://evomap.ai/claim/${response.claim_code}`;
      saveConfig(config);

      console.log('\n=== Configuration Saved ===');
      console.log('Claim code and URL have been saved to config.json');
    } else if (response.error) {
      console.error('Registration error:', response.error);
      if (response.correction) {
        console.error('Correction:', response.correction);
      }
    }

  } catch (error) {
    console.error('Registration failed:', error.message);
  }
}

async function stats() {
  console.log('=== Checking node status ===');
  try {
    const config = loadConfig();
    if (!config.agent_id) {
      console.log('Node not registered. Please run `node index.js hello` first.');
      return;
    }

    // 使用 REST 端点，不需要协议信封
    const response = await apiRequest(`/nodes/${config.agent_id}`);
    console.log('Node status:', JSON.stringify(response, null, 2));

  } catch (error) {
    console.error('Status check failed:', error.message);
  }
}

async function fetch() {
  console.log('=== Fetching promoted capsules from EvoMap ===');
  try {
    const envelope = createProtocolEnvelope("fetch", {
      asset_type: "Capsule"
    });

    const response = await apiRequest('/fetch', {
      method: 'POST',
      body: envelope
    });

    console.log('Fetched assets:', JSON.stringify(response, null, 2));

    // Save fetched assets
    const assetsDir = path.join(__dirname, 'assets');
    if (!fs.existsSync(assetsDir)) {
      fs.mkdirSync(assetsDir);
    }

    fs.writeFileSync(
      path.join(assetsDir, 'fetched_assets.json'),
      JSON.stringify(response, null, 2)
    );

    console.log('\n=== Assets Saved ===');
    console.log('Fetched assets have been saved to assets/fetched_assets.json');

  } catch (error) {
    console.error('Fetch failed:', error.message);
  }
}

async function health() {
  console.log('=== Checking EvoMap hub health ===');
  try {
    // 使用 REST 端点，不需要协议信封
    const response = await apiRequest('/stats');
    console.log('Hub health:', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Health check failed:', error.message);
  }
}

function usage() {
  console.log('Evolver Client v1.0.0');
  console.log('');
  console.log('Usage:');
  console.log('  node index.js hello    - Register node on EvoMap hub');
  console.log('  node index.js stats    - Check node status');
  console.log('  node index.js fetch    - Fetch promoted capsules');
  console.log('  node index.js health   - Check hub health');
  console.log('  node index.js help     - Show this help');
  console.log('  node index.js --loop   - Run in continuous loop mode (every 4 hours)');
  console.log('');
  console.log('EvoMap Integration:');
  console.log('  - Register your node to get a claim code');
  console.log('  - Visit the claim URL to bind to your account');
  console.log('  - Fetch capsules to get Gene and Capsule assets');
  console.log('');
  console.log('Configuration:');
  console.log('  - Config stored in config.json');
  console.log('  - Includes agent_id and claim_code');
}

// Loop mode function
async function runLoop() {
  console.log('=== Evolver Loop Mode ===');
  console.log('Running every 4 hours');
  console.log('Current time:', new Date().toISOString());
  console.log('Agent ID:', getAgentId());
  console.log('');

  // Initial run
  console.log('--- Initial cycle ---');
  await hello();
  await fetch();

  // Set up interval
  setInterval(async () => {
    console.log('\n--- New cycle ---');
    console.log('Current time:', new Date().toISOString());
    await hello();
    await fetch();
  }, LOOP_INTERVAL);

  console.log('\n=== Loop Mode Started ===');
  console.log('Evolver will continue running in the background');
  console.log('Press Ctrl+C to stop');
}

async function main() {
  // Check for --loop parameter
  if (process.argv.includes('--loop')) {
    await runLoop();
    return;
  }

  const command = process.argv[2] || 'help';

  switch (command) {
    case 'hello':
      await hello();
      break;
    case 'stats':
      await stats();
      break;
    case 'fetch':
      await fetch();
      break;
    case 'health':
      await health();
      break;
    case 'help':
    default:
      usage();
      break;
  }
}

main();