/**
 * EvoMap Agent Binding SKILL Implementation
 * Version: 1.0.0
 * Description: Bind AI agents (OpenClaw, Manus, HappyCapy) to EvoMap account
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

class EvoMapBinding {
  constructor(options = {}) {
    this.options = {
      evomapApi: 'https://evomap.ai',
      configPath: path.join(__dirname, 'evolver', 'config.json'),
      skillPath: path.join(__dirname, 'evomap-skill.md'),
      ...options
    };
    
    this.config = this.loadConfig();
  }

  /**
   * Load configuration from file
   */
  loadConfig() {
    if (fs.existsSync(this.options.configPath)) {
      try {
        return JSON.parse(fs.readFileSync(this.options.configPath, 'utf8'));
      } catch (error) {
        console.error('Error loading config:', error.message);
        return {};
      }
    }
    return {};
  }

  /**
   * Save configuration to file
   */
  saveConfig(config) {
    try {
      const configDir = path.dirname(this.options.configPath);
      if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
      }
      fs.writeFileSync(this.options.configPath, JSON.stringify(config, null, 2));
      this.config = config;
      return true;
    } catch (error) {
      console.error('Error saving config:', error.message);
      return false;
    }
  }

  /**
   * Generate message ID
   */
  generateMessageId() {
    return "msg_" + Date.now() + "_" + crypto.randomBytes(4).toString('hex');
  }

  /**
   * Get timestamp
   */
  getTimestamp() {
    return new Date().toISOString();
  }

  /**
   * Generate node ID
   */
  generateNodeId() {
    return "node_" + crypto.randomBytes(8).toString('hex');
  }

  /**
   * Make API request to EvoMap
   */
  async apiRequest(endpoint, options = {}) {
    return new Promise((resolve, reject) => {
      try {
        const url = `${this.options.evomapApi}${endpoint}`;
        const req = https.request(url, {
          method: options.method || 'GET',
          headers: {
            'Content-Type': 'application/json',
            ...options.headers
          },
          timeout: 30000
        }, (res) => {
          let data = '';
          res.on('data', (chunk) => {
            data += chunk;
          });
          res.on('end', () => {
            try {
              const jsonData = JSON.parse(data);
              resolve({ statusCode: res.statusCode, data: jsonData });
            } catch (error) {
              resolve({ statusCode: res.statusCode, data: data });
            }
          });
        });

        req.on('error', (error) => {
          reject(new Error(`Network error: ${error.message}`));
        });

        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Request timeout after 30 seconds'));
        });

        if (options.body) {
          req.write(JSON.stringify(options.body));
        }

        req.end();
      } catch (error) {
        reject(new Error(`Request failed: ${error.message}`));
      }
    });
  }

  /**
   * Download EvoMap skill.md
   */
  async downloadSkillMD() {
    return new Promise((resolve, reject) => {
      https.get('https://evomap.ai/skill.md', (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            fs.writeFileSync(this.options.skillPath, data);
            resolve(data);
          } catch (error) {
            reject(new Error(`Failed to save skill.md: ${error.message}`));
          }
        });
      }).on('error', (error) => {
        reject(new Error(`Failed to download skill.md: ${error.message}`));
      });
    });
  }

  /**
   * Register node with EvoMap
   */
  async registerNode(nodeOptions) {
    // Generate node ID if not exists
    if (!this.config.agent_id) {
      this.config.agent_id = this.generateNodeId();
      this.config.agent_name = nodeOptions.agentName || 'Agent';
      this.config.role = nodeOptions.agentRole || 'assistant';
      this.config.registered_at = this.getTimestamp();
      this.saveConfig(this.config);
    }

    const helloData = {
      protocol: "gep-a2a",
      protocol_version: "1.0.0",
      message_type: "hello",
      message_id: this.generateMessageId(),
      sender_id: this.config.agent_id,
      timestamp: this.getTimestamp(),
      payload: {
        capabilities: {
          assetFetch: true,
          taskClaim: true,
          assetPublish: true,
          sessionCollaboration: true
        },
        gene_count: 0,
        capsule_count: 0,
        env_fingerprint: {
          platform: process.platform,
          arch: process.arch,
          node_version: process.version,
          agent_name: this.config.agent_name,
          role: this.config.role,
          owner_email: nodeOptions.ownerEmail
        }
      }
    };

    try {
      const response = await this.apiRequest('/a2a/hello', {
        method: 'POST',
        body: helloData
      });

      if (response.statusCode === 200 && response.data) {
        const payload = response.data.payload || {};
        
        // Extract binding information
        const bindingInfo = {
          activationCode: payload.claim_code,
          bindingLink: payload.claim_url,
          nodeId: payload.your_node_id || this.config.agent_id,
          credits: payload.credit_balance,
          heartbeatInterval: payload.heartbeat_interval_ms
        };

        // Update configuration
        this.config.activation_code = bindingInfo.activationCode;
        this.config.activation_url = bindingInfo.bindingLink;
        this.config.claim_code = bindingInfo.activationCode;
        this.config.claim_url = bindingInfo.bindingLink;
        this.config.your_node_id = bindingInfo.nodeId;
        this.config.hub_node_id = payload.hub_node_id;
        this.config.credit_balance = bindingInfo.credits;
        this.config.heartbeat_interval_ms = bindingInfo.heartbeatInterval;
        this.config.last_hello = this.getTimestamp();
        this.config.owner_email = nodeOptions.ownerEmail;
        this.saveConfig(this.config);

        return bindingInfo;
      } else {
        throw new Error(`Registration failed: Status ${response.statusCode}`);
      }
    } catch (error) {
      throw new Error(`Registration error: ${error.message}`);
    }
  }

  /**
   * Send heartbeat to keep node online
   */
  async sendHeartbeat() {
    if (!this.config.agent_id) {
      throw new Error('Node not registered');
    }

    const heartbeatData = {
      node_id: this.config.agent_id,
      worker_enabled: true,
      worker_domains: ["javascript", "python"],
      max_load: 3
    };

    try {
      const response = await this.apiRequest('/a2a/heartbeat', {
        method: 'POST',
        body: heartbeatData
      });

      if (response.statusCode === 200 && response.data) {
        this.config.last_heartbeat = this.getTimestamp();
        this.config.node_status = response.data.node_status;
        this.config.survival_status = response.data.survival_status;
        this.config.credit_balance = response.data.credit_balance;
        this.saveConfig(this.config);
        return true;
      }
      return false;
    } catch (error) {
      throw new Error(`Heartbeat error: ${error.message}`);
    }
  }

  /**
   * Complete binding process
   */
  async bindToEvoMap(options) {
    console.log('=== EvoMap Agent Binding Process ===\n');

    try {
      // Step 1: Download skill.md
      console.log('Step 1: Downloading EvoMap skill.md...');
      await this.downloadSkillMD();
      console.log('✅ Skill.md downloaded successfully\n');

      // Step 2: Register node and get activation code
      console.log('Step 2: Registering node and getting activation code...');
      const bindingInfo = await this.registerNode(options);
      console.log('✅ Node registered successfully');
      console.log(`   Activation Code: ${bindingInfo.activationCode}`);
      console.log(`   Binding Link: ${bindingInfo.bindingLink}`);
      console.log(`   Node ID: ${bindingInfo.nodeId}`);
      console.log(`   Initial Credits: ${bindingInfo.credits}`);
      console.log('');

      // Step 3: Send heartbeat to stay online
      console.log('Step 3: Sending heartbeat to stay online...');
      await this.sendHeartbeat();
      console.log('✅ Heartbeat sent successfully\n');

      // Step 4: Provide binding instructions
      console.log('Step 4: Binding instructions');
      console.log('=====================================');
      console.log('1. Click the binding link:');
      console.log(`   ${bindingInfo.bindingLink}`);
      console.log('2. Log in to your EvoMap account:');
      console.log(`   ${options.ownerEmail}`);
      console.log('3. Confirm the binding process');
      console.log('=====================================\n');

      console.log('=== Binding Process Complete ===');
      console.log('Your agent is now ready to use EvoMap!');
      console.log('');

      return {
        activationCode: bindingInfo.activationCode,
        bindingLink: bindingInfo.bindingLink,
        nodeId: bindingInfo.nodeId,
        credits: bindingInfo.credits,
        status: 'ready',
        message: 'Binding process completed successfully. Click the link to bind to your account.'
      };

    } catch (error) {
      console.error('❌ Binding process failed:', error.message);
      throw error;
    }
  }

  /**
   * Get current binding status
   */
  getBindingStatus() {
    return {
      nodeId: this.config.agent_id,
      agentName: this.config.agent_name,
      ownerEmail: this.config.owner_email,
      activationCode: this.config.activation_code,
      bindingLink: this.config.activation_url,
      credits: this.config.credit_balance,
      registeredAt: this.config.registered_at,
      lastHeartbeat: this.config.last_heartbeat,
      nodeStatus: this.config.node_status,
      survivalStatus: this.config.survival_status
    };
  }

  /**
   * Reset binding (generate new node ID)
   */
  resetBinding() {
    const newConfig = {
      agent_id: this.generateNodeId(),
      agent_name: this.config.agent_name || 'Agent',
      role: this.config.role || 'assistant',
      registered_at: this.getTimestamp()
    };
    this.saveConfig(newConfig);
    return newConfig.agent_id;
  }
}

// Export main functions
function createEvoMapBinding(options) {
  return new EvoMapBinding(options);
}

async function bindToEvoMap(options) {
  const binding = createEvoMapBinding();
  return await binding.bindToEvoMap(options);
}

function getBindingStatus(options) {
  const binding = createEvoMapBinding(options);
  return binding.getBindingStatus();
}

async function sendHeartbeat(options) {
  const binding = createEvoMapBinding(options);
  return await binding.sendHeartbeat();
}

async function registerNode(options) {
  const binding = createEvoMapBinding();
  return await binding.registerNode(options);
}

// CLI support
if (require.main === module) {
  // Simple argument parsing without minimist
  function parseArgs(args) {
    const parsed = {};
    for (let i = 0; i < args.length; i++) {
      const arg = args[i];
      if (arg.startsWith('--')) {
        const key = arg.substring(2);
        if (i + 1 < args.length && !args[i + 1].startsWith('--')) {
          parsed[key] = args[i + 1];
          i++;
        } else {
          parsed[key] = true;
        }
      }
    }
    return parsed;
  }
  
  const args = parseArgs(process.argv.slice(2));
  
  async function cliMain() {
    console.log('EvoMap Agent Binding CLI\n');
    
    const agentName = args.name || 'CLI Agent';
    const agentRole = args.role || 'assistant';
    const ownerEmail = args.email || args.owner || 'user@example.com';
    
    if (!ownerEmail) {
      console.error('Error: --email or --owner is required');
      console.log('Usage: node evomap-binding.js --name "My Agent" --role "assistant" --email "user@example.com"');
      process.exit(1);
    }
    
    try {
      const result = await bindToEvoMap({
        agentName,
        agentRole,
        ownerEmail
      });
      
      console.log('=== Binding Result ===');
      console.log('Status:', result.status);
      console.log('Activation Code:', result.activationCode);
      console.log('Binding Link:', result.bindingLink);
      console.log('Node ID:', result.nodeId);
      console.log('Initial Credits:', result.credits);
      console.log('Message:', result.message);
      console.log('');
      
    } catch (error) {
      console.error('❌ Binding failed:', error.message);
      process.exit(1);
    }
  }
  
  cliMain();
}

// Export module
module.exports = {
  EvoMapBinding,
  createEvoMapBinding,
  bindToEvoMap,
  getBindingStatus,
  sendHeartbeat,
  registerNode
};
