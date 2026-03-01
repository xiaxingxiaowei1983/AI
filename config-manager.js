#!/usr/bin/env node

/**
 * OpenClaw 配置管理工具
 * 用于验证、修复和管理OpenClaw配置文件
 */

const fs = require('fs');
const path = require('path');

class ConfigManager {
  constructor() {
    this.configPath = path.join(process.env.USERPROFILE || process.env.HOME, '.openclaw', 'openclaw.json');
    this.envPath = path.join(process.env.USERPROFILE || process.env.HOME, '.openclaw', '.env');
    this.defaultConfig = this._getDefaultConfig();
  }

  // 获取默认配置
  _getDefaultConfig() {
    return {
      meta: {
        lastTouchedVersion: '2026.2.24',
        lastTouchedAt: new Date().toISOString()
      },
      wizard: {
        lastRunAt: new Date().toISOString(),
        lastRunVersion: '2026.2.24',
        lastRunCommand: 'configure',
        lastRunMode: 'local'
      },
      auth: {
        profiles: {}
      },
      models: {
        mode: 'merge'
      },
      agents: {
        defaults: {
          model: {
            primary: 'volcengine/doubao-seed-2-0-code-preview-260215',
            fallbacks: []
          },
          models: {
            'doubao-seed-2-0-code-preview-260215': {},
            'anthropic/doubao-seed-2-0-code-preview-260215': {},
            'volcengine/doubao-seed-2-0-code-preview-260215': {}
          },
          workspace: path.join(process.env.USERPROFILE || process.env.HOME, '.openclaw', 'workspace'),
          compaction: {
            mode: 'safeguard'
          },
          maxConcurrent: 4,
          subagents: {
            maxConcurrent: 8
          }
        },
        list: [
          {
            id: 'main'
          }
        ]
      },
      messages: {
        ackReactionScope: 'group-mentions'
      },
      commands: {
        native: 'auto',
        nativeSkills: 'auto',
        restart: true,
        ownerDisplay: 'raw'
      },
      channels: {},
      gateway: {
        mode: 'local',
        auth: {
          mode: 'token',
          token: '2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da'
        }
      },
      plugins: {
        entries: {}
      }
    };
  }

  // 读取配置文件
  readConfig() {
    try {
      if (!fs.existsSync(this.configPath)) {
        console.log('配置文件不存在，将创建默认配置');
        this.writeConfig(this.defaultConfig);
        return this.defaultConfig;
      }
      const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
      return config;
    } catch (error) {
      console.error('读取配置文件失败:', error.message);
      console.log('将使用默认配置');
      return this.defaultConfig;
    }
  }

  // 写入配置文件
  writeConfig(config) {
    try {
      // 确保目录存在
      const dir = path.dirname(this.configPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf8');
      console.log('配置文件已保存:', this.configPath);
      return true;
    } catch (error) {
      console.error('写入配置文件失败:', error.message);
      return false;
    }
  }

  // 验证配置
  validateConfig(config) {
    const errors = [];
    const warnings = [];

    // 检查必要的配置项
    if (!config.gateway) {
      errors.push('缺少gateway配置');
    } else if (!config.gateway.auth) {
      errors.push('缺少gateway.auth配置');
    } else if (!config.gateway.auth.token) {
      errors.push('缺少gateway.auth.token配置');
    }

    if (!config.agents) {
      errors.push('缺少agents配置');
    } else if (!config.agents.defaults) {
      errors.push('缺少agents.defaults配置');
    } else if (!config.agents.defaults.model) {
      errors.push('缺少agents.defaults.model配置');
    } else if (!config.agents.defaults.model.primary) {
      errors.push('缺少agents.defaults.model.primary配置');
    }

    // 检查可选配置项
    if (!config.models) {
      warnings.push('缺少models配置，将使用默认值');
    }

    if (!config.channels) {
      warnings.push('缺少channels配置，将使用默认值');
    }

    if (!config.plugins) {
      warnings.push('缺少plugins配置，将使用默认值');
    }

    return { errors, warnings };
  }

  // 修复配置
  fixConfig(config) {
    let fixedConfig = { ...config };

    // 修复gateway配置
    if (!fixedConfig.gateway) {
      fixedConfig.gateway = this.defaultConfig.gateway;
      console.log('修复了gateway配置');
    } else if (!fixedConfig.gateway.auth) {
      fixedConfig.gateway.auth = this.defaultConfig.gateway.auth;
      console.log('修复了gateway.auth配置');
    } else if (!fixedConfig.gateway.auth.token) {
      fixedConfig.gateway.auth.token = this.defaultConfig.gateway.auth.token;
      console.log('修复了gateway.auth.token配置');
    }

    // 修复agents配置
    if (!fixedConfig.agents) {
      fixedConfig.agents = this.defaultConfig.agents;
      console.log('修复了agents配置');
    } else if (!fixedConfig.agents.defaults) {
      fixedConfig.agents.defaults = this.defaultConfig.agents.defaults;
      console.log('修复了agents.defaults配置');
    } else if (!fixedConfig.agents.defaults.model) {
      fixedConfig.agents.defaults.model = this.defaultConfig.agents.defaults.model;
      console.log('修复了agents.defaults.model配置');
    } else if (!fixedConfig.agents.defaults.model.primary) {
      fixedConfig.agents.defaults.model.primary = this.defaultConfig.agents.defaults.model.primary;
      console.log('修复了agents.defaults.model.primary配置');
    }

    // 修复其他配置
    if (!fixedConfig.models) {
      fixedConfig.models = this.defaultConfig.models;
      console.log('修复了models配置');
    }

    if (!fixedConfig.channels) {
      fixedConfig.channels = this.defaultConfig.channels;
      console.log('修复了channels配置');
    }

    if (!fixedConfig.plugins) {
      fixedConfig.plugins = this.defaultConfig.plugins;
      console.log('修复了plugins配置');
    }

    // 更新元数据
    fixedConfig.meta = {
      ...fixedConfig.meta,
      lastTouchedVersion: '2026.2.24',
      lastTouchedAt: new Date().toISOString()
    };

    return fixedConfig;
  }

  // 检查并修复配置
  checkAndFixConfig() {
    console.log('=== 检查OpenClaw配置 ===');
    
    // 读取当前配置
    const currentConfig = this.readConfig();
    
    // 验证配置
    const validation = this.validateConfig(currentConfig);
    
    // 显示验证结果
    if (validation.errors.length > 0) {
      console.log('发现错误:');
      validation.errors.forEach(error => console.log(`- ${error}`));
    }
    
    if (validation.warnings.length > 0) {
      console.log('发现警告:');
      validation.warnings.forEach(warning => console.log(`- ${warning}`));
    }
    
    // 修复配置
    const fixedConfig = this.fixConfig(currentConfig);
    
    // 保存修复后的配置
    if (JSON.stringify(currentConfig) !== JSON.stringify(fixedConfig)) {
      console.log('\n正在保存修复后的配置...');
      this.writeConfig(fixedConfig);
      console.log('配置修复完成！');
    } else {
      console.log('\n配置已经是最新的，无需修复');
    }
    
    return fixedConfig;
  }

  // 查看配置
  viewConfig() {
    console.log('=== 查看OpenClaw配置 ===');
    const config = this.readConfig();
    console.log(JSON.stringify(config, null, 2));
    return config;
  }

  // 更新配置项
  updateConfig(keyPath, value) {
    console.log(`=== 更新配置项: ${keyPath} ===`);
    
    const config = this.readConfig();
    const keys = keyPath.split('.');
    let current = config;
    
    // 导航到目标配置项
    for (let i = 0; i < keys.length - 1; i++) {
      const key = keys[i];
      if (!current[key]) {
        current[key] = {};
      }
      current = current[key];
    }
    
    // 更新值
    const lastKey = keys[keys.length - 1];
    current[lastKey] = value;
    
    // 保存配置
    this.writeConfig(config);
    console.log(`配置项 ${keyPath} 已更新为:`, value);
    
    return config;
  }

  // 检查环境变量配置
  checkEnvConfig() {
    console.log('=== 检查环境变量配置 ===');
    
    if (!fs.existsSync(this.envPath)) {
      console.log('环境变量文件不存在，将创建默认配置');
      const defaultEnv = 'VOLCANO_ENGINE_API_KEY=c13b2982-0aab-4c75-9404-0deb12a219ec\n';
      fs.writeFileSync(this.envPath, defaultEnv);
      console.log('环境变量文件已创建:', this.envPath);
      return { VOLCANO_ENGINE_API_KEY: 'c13b2982-0aab-4c75-9404-0deb12a219ec' };
    }
    
    const envContent = fs.readFileSync(this.envPath, 'utf8');
    const envVars = {};
    
    envContent.split('\n').forEach(line => {
      const match = line.match(/^(\w+)=(.*)$/);
      if (match) {
        envVars[match[1]] = match[2];
      }
    });
    
    console.log('当前环境变量:');
    Object.entries(envVars).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
    });
    
    return envVars;
  }
}

// 命令行接口
function main() {
  const manager = new ConfigManager();
  const args = process.argv.slice(2);
  
  if (args.length === 0) {
    console.log('OpenClaw 配置管理工具');
    console.log('用法:');
    console.log('  config-manager check     - 检查并修复配置');
    console.log('  config-manager view      - 查看当前配置');
    console.log('  config-manager update <key> <value> - 更新配置项');
    console.log('  config-manager env       - 检查环境变量配置');
    return;
  }
  
  const command = args[0];
  
  switch (command) {
    case 'check':
      manager.checkAndFixConfig();
      break;
    case 'view':
      manager.viewConfig();
      break;
    case 'update':
      if (args.length < 3) {
        console.log('用法: config-manager update <key> <value>');
        return;
      }
      const keyPath = args[1];
      let value = args[2];
      
      // 尝试解析值为JSON
      try {
        value = JSON.parse(value);
      } catch (e) {
        // 保持为字符串
      }
      
      manager.updateConfig(keyPath, value);
      break;
    case 'env':
      manager.checkEnvConfig();
      break;
    default:
      console.log('未知命令:', command);
      console.log('使用 help 查看可用命令');
  }
}

if (require.main === module) {
  main();
}

module.exports = ConfigManager;