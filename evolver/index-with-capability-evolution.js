const fs = require('fs');
const path = require('path');
const https = require('https');
const crypto = require('crypto');
const CapabilityEvolutionSystem = require('./capability-evolution-system');

const EVOMAP_API = 'https://evomap.ai/a2a';
const CONFIG_FILE = path.join(__dirname, 'config.json');
const LOOP_INTERVAL = 4 * 60 * 60 * 1000; // 4 hours

class EvolverWithCapabilityEvolution {
  constructor() {
    this.evolutionSystem = new CapabilityEvolutionSystem();
  }

  loadConfig() {
    if (fs.existsSync(CONFIG_FILE)) {
      return JSON.parse(fs.readFileSync(CONFIG_FILE, 'utf8'));
    }
    return {};
  }

  saveConfig(config) {
    fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2));
  }

  // 生成或加载 agentId
  getAgentId() {
    const config = this.loadConfig();
    if (config.agent_id) {
      return config.agent_id;
    }
    const agentId = "node_" + crypto.randomBytes(8).toString("hex");
    config.agent_id = agentId;
    this.saveConfig(config);
    return agentId;
  }

  // 生成消息 ID
  generateMessageId() {
    return "msg_" + Date.now() + "_" + crypto.randomBytes(4).toString("hex");
  }

  // 生成时间戳
  getTimestamp() {
    return new Date().toISOString();
  }

  // 创建协议信封
  createProtocolEnvelope(messageType, payload) {
    return {
      protocol: "gep-a2a",
      protocol_version: "1.0.0",
      message_type: messageType,
      message_id: this.generateMessageId(),
      sender_id: this.getAgentId(),
      timestamp: this.getTimestamp(),
      payload: payload
    };
  }

  apiRequest(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      const url = `${EVOMAP_API}${endpoint}`;
      console.log(`Sending request to: ${url}`);
      console.log(`Method: ${options.method || 'GET'}`);
      
      const req = https.request(url, {
        method: options.method || 'GET',
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        },
        timeout: 30000 // 30 seconds timeout
      }, (res) => {
        console.log(`Response status: ${res.statusCode}`);
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const jsonData = JSON.parse(data);
            console.log('Response received successfully');
            resolve(jsonData);
          } catch (error) {
            console.log('Response parsing error, returning raw data');
            resolve({ raw: data });
          }
        });
      });

      req.on('error', (error) => {
        console.error('Request error:', error.message);
        reject(error);
      });

      req.on('timeout', () => {
        console.error('Request timeout after 30 seconds');
        req.destroy();
        reject(new Error('Request timeout'));
      });

      if (options.body) {
        req.write(JSON.stringify(options.body));
      }

      req.end();
    });
  }

  async hello() {
    console.log('=== Registering node on EvoMap hub ===');
    try {
      const envelope = this.createProtocolEnvelope("hello", {
        capabilities: {},
        gene_count: 0,
        capsule_count: 0,
        env_fingerprint: {
          platform: process.platform,
          arch: process.arch
        }
      });

      const response = await this.apiRequest('/hello', {
        method: 'POST',
        body: envelope
      });

      console.log('Registration response:', JSON.stringify(response, null, 2));

      if (response.claim_code) {
        console.log('\n=== Claim Code ===');
        console.log(`Claim code: ${response.claim_code}`);
        console.log(`Claim URL: https://evomap.ai/claim/${response.claim_code}`);
        console.log('\nPlease visit the claim URL to bind this agent to your EvoMap account.');

        const config = this.loadConfig();
        config.claim_code = response.claim_code;
        config.claim_url = `https://evomap.ai/claim/${response.claim_code}`;
        this.saveConfig(config);

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

  async stats() {
    console.log('=== Checking node status ===');
    try {
      const config = this.loadConfig();
      if (!config.agent_id) {
        console.log('Node not registered. Please run `node index.js hello` first.');
        return;
      }

      // 使用 REST 端点，不需要协议信封
      const response = await this.apiRequest(`/nodes/${config.agent_id}`);
      console.log('Node status:', JSON.stringify(response, null, 2));

    } catch (error) {
      console.error('Status check failed:', error.message);
    }
  }

  async fetch() {
    console.log('=== Fetching promoted capsules from EvoMap ===');
    try {
      const envelope = this.createProtocolEnvelope("fetch", {
        asset_type: "Capsule"
      });

      const response = await this.apiRequest('/fetch', {
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

  async health() {
    console.log('=== Checking EvoMap hub health ===');
    try {
      // 使用 REST 端点，不需要协议信封
      const response = await this.apiRequest('/stats');
      console.log('Hub health:', JSON.stringify(response, null, 2));
    } catch (error) {
      console.error('Health check failed:', error.message);
    }
  }

  async runCapabilityEvolution() {
    console.log('=== Running capability evolution ===');
    try {
      const result = await this.evolutionSystem.runEvolutionCycle();
      console.log('Capability evolution completed successfully');
      return result;
    } catch (error) {
      console.error('Capability evolution failed:', error.message);
      return null;
    }
  }

  getCapabilityEvolutionStatus() {
    return this.evolutionSystem.getSystemStatus();
  }

  usage() {
    console.log('Evolver Client v1.0.0 with Capability Evolution');
    console.log('');
    console.log('Usage:');
    console.log('  node index.js hello                - Register node on EvoMap hub');
    console.log('  node index.js stats                - Check node status');
    console.log('  node index.js fetch                - Fetch promoted capsules');
    console.log('  node index.js health               - Check hub health');
    console.log('  node index.js evolve               - Run capability evolution');
    console.log('  node index.js evolution-status     - Get capability evolution status');
    console.log('  node index.js help                 - Show this help');
    console.log('  node index.js --loop               - Run in continuous loop mode (every 4 hours)');
    console.log('');
    console.log('EvoMap Integration:');
    console.log('  - Register your node to get a claim code');
    console.log('  - Visit the claim URL to bind to your account');
    console.log('  - Fetch capsules to get Gene and Capsule assets');
    console.log('');
    console.log('Capability Evolution:');
    console.log('  - Automatically identifies and abstracts reusable capabilities');
    console.log('  - Internalizes capabilities as behavioral patterns, high-level operations, and priority solutions');
    console.log('  - Merges similar capabilities to create higher-level abstractions');
    console.log('  - Evaluates capability performance and suggests enhancements');
    console.log('');
    console.log('Configuration:');
    console.log('  - Config stored in config.json');
    console.log('  - Includes agent_id and claim_code');
  }

  // Loop mode function
  async runLoop() {
    console.log('=== Evolver Loop Mode ===');
    console.log('Running every 4 hours');
    console.log('Current time:', new Date().toISOString());
    console.log('Agent ID:', this.getAgentId());
    console.log('');

    // Initial run
    console.log('--- Initial cycle ---');
    await this.hello();
    await this.fetch();
    await this.runCapabilityEvolution();

    // Set up interval
    setInterval(async () => {
      console.log('\n--- New cycle ---');
      console.log('Current time:', new Date().toISOString());
      await this.hello();
      await this.fetch();
      await this.runCapabilityEvolution();
    }, LOOP_INTERVAL);

    console.log('\n=== Loop Mode Started ===');
    console.log('Evolver will continue running in the background');
    console.log('Press Ctrl+C to stop');
  }

  async main() {
    // Check for --loop parameter
    if (process.argv.includes('--loop')) {
      await this.runLoop();
      return;
    }

    const command = process.argv[2] || 'help';

    switch (command) {
      case 'hello':
        await this.hello();
        break;
      case 'stats':
        await this.stats();
        break;
      case 'fetch':
        await this.fetch();
        break;
      case 'health':
        await this.health();
        break;
      case 'evolve':
        await this.runCapabilityEvolution();
        break;
      case 'evolution-status':
        const status = this.getCapabilityEvolutionStatus();
        console.log('Capability Evolution Status:', JSON.stringify(status, null, 2));
        break;
      case 'help':
      default:
        this.usage();
        break;
    }
  }
}

// Run the evolver
const evolver = new EvolverWithCapabilityEvolution();
evolver.main();