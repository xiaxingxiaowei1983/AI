const crypto = require('crypto');
const https = require('https');

class EvoMapClient {
  constructor(options = {}) {
    this.apiUrl = options.apiUrl || 'https://evomap.ai';
    this.nodeId = options.nodeId || this.generateNodeId();
    this.heartbeatInterval = options.heartbeatInterval || 900000; // 15 minutes
    this.heartbeatTimer = null;
    this.timeout = options.timeout || 30000;
  }

  generateNodeId() {
    const randomHex = crypto.randomBytes(8).toString('hex');
    return `node_${randomHex}`;
  }

  generateMessageId() {
    const timestamp = Date.now();
    const randomHex = crypto.randomBytes(4).toString('hex');
    return `msg_${timestamp}_${randomHex}`;
  }

  generateTimestamp() {
    return new Date().toISOString();
  }

  createProtocolEnvelope(messageType, payload) {
    return {
      protocol: 'gep-a2a',
      protocol_version: '1.0.0',
      message_type: messageType,
      message_id: this.generateMessageId(),
      sender_id: this.nodeId,
      timestamp: this.generateTimestamp(),
      payload: payload
    };
  }

  async sendRequest(endpoint, data, isProtocol = true) {
    return new Promise((resolve, reject) => {
      const url = new URL(endpoint, this.apiUrl);
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        timeout: this.timeout
      };

      const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            reject(new Error(`Invalid response: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      const requestData = isProtocol ? this.createProtocolEnvelope(endpoint.replace('/a2a/', ''), data) : data;
      req.write(JSON.stringify(requestData));
      req.end();
    });
  }

  async hello() {
    const payload = {
      capabilities: {},
      gene_count: 0,
      capsule_count: 0,
      env_fingerprint: {
        platform: process.platform,
        arch: process.arch
      }
    };

    return this.sendRequest('/a2a/hello', payload);
  }

  async heartbeat() {
    const payload = {
      status: 'online',
      timestamp: this.generateTimestamp()
    };

    return this.sendRequest('/a2a/heartbeat', payload);
  }

  async publish(assets) {
    return this.sendRequest('/a2a/publish', assets);
  }

  async fetch(options = {}) {
    return this.sendRequest('/a2a/fetch', options);
  }

  async report(reportData) {
    return this.sendRequest('/a2a/report', reportData);
  }

  async decision(decisionData) {
    return this.sendRequest('/a2a/decision', decisionData);
  }

  async revoke(revokeData) {
    return this.sendRequest('/a2a/revoke', revokeData);
  }

  async claimTask(taskId) {
    const data = {
      task_id: taskId,
      node_id: this.nodeId
    };
    return this.sendRequest('/task/claim', data, false);
  }

  async completeTask(taskId, assetId) {
    const data = {
      task_id: taskId,
      asset_id: assetId,
      node_id: this.nodeId
    };
    return this.sendRequest('/task/complete', data, false);
  }

  async registerWorker(workerData) {
    const data = {
      sender_id: this.nodeId,
      ...workerData
    };
    return this.sendRequest('/a2a/worker/register', data, false);
  }

  async createRecipe(recipeData) {
    const data = {
      sender_id: this.nodeId,
      ...recipeData
    };
    return this.sendRequest('/a2a/recipe', data, false);
  }

  startHeartbeat() {
    this.heartbeatTimer = setInterval(async () => {
      try {
        await this.heartbeat();
        console.log('Heartbeat sent successfully');
      } catch (error) {
        console.error('Heartbeat failed:', error.message);
      }
    }, this.heartbeatInterval);
  }

  stopHeartbeat() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
  }

  computeAssetId(asset) {
    const assetWithoutId = { ...asset };
    delete assetWithoutId.asset_id;
    const canonicalJson = JSON.stringify(assetWithoutId, Object.keys(assetWithoutId).sort());
    const hash = crypto.createHash('sha256').update(canonicalJson).digest('hex');
    return `sha256:${hash}`;
  }

  async getNodeStatus() {
    return new Promise((resolve, reject) => {
      const url = new URL(`/a2a/nodes/${this.nodeId}`, this.apiUrl);
      const options = {
        method: 'GET',
        timeout: this.timeout
      };

      const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            reject(new Error(`Invalid response: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }

  async listAssets(queryOptions = {}) {
    return new Promise((resolve, reject) => {
      const url = new URL('/a2a/assets', this.apiUrl);
      Object.entries(queryOptions).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });

      const options = {
        method: 'GET',
        timeout: this.timeout
      };

      const req = https.request(url, options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (error) {
            reject(new Error(`Invalid response: ${data}`));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Request timeout'));
      });

      req.end();
    });
  }
}

module.exports = { EvoMapClient };
