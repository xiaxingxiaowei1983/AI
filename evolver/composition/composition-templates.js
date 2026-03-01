const fs = require('fs');
const path = require('path');

const TEMPLATES_FILE = path.join(__dirname, '../composition-templates.json');

class CompositionTemplates {
  constructor(composer) {
    this.composer = composer;
    this.templates = this.loadTemplates();
    this.templateUsageStats = this.loadTemplateUsageStats();
  }

  loadTemplates() {
    return {
      data_pipeline: {
        id: 'data_pipeline',
        name: 'Data Processing Pipeline',
        description: 'Fetch, transform, and save data',
        category: 'data_processing',
        capabilities: [
          { capabilityId: 'net_http_get', params: { url: '${sourceUrl}' }, options: {} },
          { capabilityId: 'dt_json_to_csv', params: {}, options: {} },
          { capabilityId: 'fs_create_file', params: { filePath: '${outputPath}' }, options: {} }
        ],
        parameters: [
          { name: 'sourceUrl', type: 'string', required: true, description: 'Data source URL' },
          { name: 'outputPath', type: 'string', required: true, description: 'Output file path' }
        ],
        rule: 'sequential',
        estimatedDuration: 5000
      },
      backup_workflow: {
        id: 'backup_workflow',
        name: 'File Backup Workflow',
        description: 'Copy file to backup location with timestamp',
        category: 'file_management',
        capabilities: [
          { capabilityId: 'fs_copy_file', params: { sourcePath: '${sourcePath}', destinationPath: '${backupPath}' }, options: {} }
        ],
        parameters: [
          { name: 'sourcePath', type: 'string', required: true, description: 'Source file path' },
          { name: 'backupPath', type: 'string', required: true, description: 'Backup destination path' }
        ],
        rule: 'sequential',
        estimatedDuration: 1000
      },
      api_data_sync: {
        id: 'api_data_sync',
        name: 'API Data Synchronization',
        description: 'Fetch data from API and sync to local storage',
        category: 'integration',
        capabilities: [
          { capabilityId: 'net_http_get', params: { url: '${apiUrl}' }, options: {} },
          { capabilityId: 'dt_json_to_csv', params: {}, options: {}, condition: '${format === "csv"}' },
          { capabilityId: 'fs_create_file', params: { filePath: '${localPath}' }, options: {} }
        ],
        parameters: [
          { name: 'apiUrl', type: 'string', required: true, description: 'API endpoint URL' },
          { name: 'localPath', type: 'string', required: true, description: 'Local storage path' },
          { name: 'format', type: 'string', required: false, default: 'json', description: 'Output format' }
        ],
        rule: 'conditional',
        estimatedDuration: 3000
      },
      parallel_data_fetch: {
        id: 'parallel_data_fetch',
        name: 'Parallel Data Fetch',
        description: 'Fetch data from multiple sources simultaneously',
        category: 'data_processing',
        capabilities: [
          { capabilityId: 'net_http_get', params: { url: '${url1}' }, options: {} },
          { capabilityId: 'net_http_get', params: { url: '${url2}' }, options: {} },
          { capabilityId: 'net_http_get', params: { url: '${url3}' }, options: {} }
        ],
        parameters: [
          { name: 'url1', type: 'string', required: true, description: 'First data source URL' },
          { name: 'url2', type: 'string', required: true, description: 'Second data source URL' },
          { name: 'url3', type: 'string', required: true, description: 'Third data source URL' }
        ],
        rule: 'parallel',
        estimatedDuration: 2000
      },
      error_recovery_workflow: {
        id: 'error_recovery_workflow',
        name: 'Error Recovery Workflow',
        description: 'Execute with automatic error recovery',
        category: 'error_handling',
        capabilities: [
          { capabilityId: '${primaryCapability}', params: '${primaryParams}', options: { retryCount: 3 } },
          { capabilityId: '${fallbackCapability}', params: '${fallbackParams}', options: {}, condition: '${previousFailed}' }
        ],
        parameters: [
          { name: 'primaryCapability', type: 'string', required: true, description: 'Primary capability to execute' },
          { name: 'primaryParams', type: 'object', required: true, description: 'Primary capability parameters' },
          { name: 'fallbackCapability', type: 'string', required: false, description: 'Fallback capability on failure' },
          { name: 'fallbackParams', type: 'object', required: false, description: 'Fallback capability parameters' }
        ],
        rule: 'conditional',
        estimatedDuration: 4000
      },
      format_converter: {
        id: 'format_converter',
        name: 'Format Converter',
        description: 'Convert data between different formats',
        category: 'data_transform',
        capabilities: [
          { capabilityId: 'fs_read_file', params: { filePath: '${inputPath}' }, options: {} },
          { capabilityId: '${transformCapability}', params: {}, options: {} },
          { capabilityId: 'fs_create_file', params: { filePath: '${outputPath}' }, options: {} }
        ],
        parameters: [
          { name: 'inputPath', type: 'string', required: true, description: 'Input file path' },
          { name: 'outputPath', type: 'string', required: true, description: 'Output file path' },
          { name: 'transformCapability', type: 'string', required: true, description: 'Transform capability ID' }
        ],
        rule: 'pipeline',
        estimatedDuration: 2000
      }
    };
  }

  loadTemplateUsageStats() {
    if (fs.existsSync(TEMPLATES_FILE)) {
      try {
        return JSON.parse(fs.readFileSync(TEMPLATES_FILE, 'utf8'));
      } catch (error) {
        console.error('Error loading template usage stats:', error.message);
        return {};
      }
    }
    return {};
  }

  saveTemplateUsageStats() {
    fs.writeFileSync(TEMPLATES_FILE, JSON.stringify(this.templateUsageStats, null, 2));
  }

  getTemplate(templateId) {
    return this.templates[templateId];
  }

  listTemplates(category = null) {
    const templates = Object.values(this.templates);
    
    if (category) {
      return templates.filter(t => t.category === category);
    }
    
    return templates;
  }

  async executeTemplate(templateId, params = {}) {
    console.log(`=== Executing template: ${templateId} ===`);

    const template = this.templates[templateId];
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }

    this.validateTemplateParams(template, params);

    const resolvedCapabilities = this.resolveTemplateCapabilities(template, params);

    const result = await this.composer.compose(
      resolvedCapabilities,
      template.rule,
      { initialData: params.initialData }
    );

    this.recordTemplateUsage(templateId, result.success);

    console.log(`✅ Template execution complete: ${templateId}`);
    return result;
  }

  validateTemplateParams(template, params) {
    for (const param of template.parameters) {
      if (param.required && (params[param.name] === undefined || params[param.name] === null)) {
        throw new Error(`Missing required parameter: ${param.name}`);
      }
    }
  }

  resolveTemplateCapabilities(template, params) {
    return template.capabilities.map(cap => {
      const resolved = { ...cap };
      
      if (resolved.params) {
        resolved.params = this.resolveParams(resolved.params, params);
      }
      
      if (resolved.condition) {
        resolved.condition = this.resolveCondition(resolved.condition, params);
      }

      return resolved;
    });
  }

  resolveParams(templateParams, userParams) {
    if (typeof templateParams === 'string') {
      return this.resolveValue(templateParams, userParams);
    }

    if (typeof templateParams !== 'object') {
      return templateParams;
    }

    const resolved = {};
    for (const [key, value] of Object.entries(templateParams)) {
      resolved[key] = this.resolveValue(value, userParams);
    }
    return resolved;
  }

  resolveValue(value, params) {
    if (typeof value !== 'string') {
      return value;
    }

    return value.replace(/\$\{(\w+)\}/g, (match, paramName) => {
      return params[paramName] !== undefined ? params[paramName] : match;
    });
  }

  resolveCondition(condition, params) {
    if (typeof condition !== 'string') {
      return condition;
    }

    return condition.replace(/\$\{(\w+)\}/g, (match, paramName) => {
      const value = params[paramName];
      return JSON.stringify(value);
    });
  }

  recordTemplateUsage(templateId, success) {
    if (!this.templateUsageStats[templateId]) {
      this.templateUsageStats[templateId] = {
        totalExecutions: 0,
        successfulExecutions: 0,
        failedExecutions: 0,
        lastUsed: null
      };
    }

    this.templateUsageStats[templateId].totalExecutions++;
    if (success) {
      this.templateUsageStats[templateId].successfulExecutions++;
    } else {
      this.templateUsageStats[templateId].failedExecutions++;
    }
    this.templateUsageStats[templateId].lastUsed = new Date().toISOString();

    this.saveTemplateUsageStats();
  }

  matchTemplate(context) {
    console.log('Matching template for context');

    const matches = [];

    for (const template of Object.values(this.templates)) {
      let score = 0;
      const reasons = [];

      if (context.taskType && template.category === context.taskType) {
        score += 0.5;
        reasons.push('Category match');
      }

      if (context.requiredCapabilities) {
        const templateCapabilities = template.capabilities.map(c => c.capabilityId);
        const matchCount = context.requiredCapabilities.filter(c => 
          templateCapabilities.some(tc => tc.includes(c))
        ).length;
        score += matchCount / context.requiredCapabilities.length * 0.3;
        if (matchCount > 0) reasons.push('Capability match');
      }

      const stats = this.templateUsageStats[template.id];
      if (stats && stats.successfulExecutions > 0) {
        const successRate = stats.successfulExecutions / stats.totalExecutions;
        score += successRate * 0.2;
        reasons.push('High success rate');
      }

      if (score > 0) {
        matches.push({
          template,
          score,
          reasons
        });
      }
    }

    matches.sort((a, b) => b.score - a.score);
    return matches.slice(0, 5);
  }

  createCustomTemplate(templateConfig) {
    const template = {
      id: templateConfig.id || `custom_${Date.now()}`,
      name: templateConfig.name,
      description: templateConfig.description || '',
      category: templateConfig.category || 'custom',
      capabilities: templateConfig.capabilities,
      parameters: templateConfig.parameters || [],
      rule: templateConfig.rule || 'sequential',
      estimatedDuration: templateConfig.estimatedDuration || 5000
    };

    this.templates[template.id] = template;
    console.log(`Custom template created: ${template.id}`);
    return template;
  }

  getTemplateStatistics() {
    return {
      totalTemplates: Object.keys(this.templates).length,
      byCategory: this.groupByCategory(),
      usageStats: this.templateUsageStats,
      mostUsed: this.getMostUsedTemplates()
    };
  }

  groupByCategory() {
    const groups = {};
    for (const template of Object.values(this.templates)) {
      groups[template.category] = (groups[template.category] || 0) + 1;
    }
    return groups;
  }

  getMostUsedTemplates(limit = 5) {
    return Object.entries(this.templateUsageStats)
      .sort((a, b) => b[1].totalExecutions - a[1].totalExecutions)
      .slice(0, limit)
      .map(([id, stats]) => ({
        template: this.templates[id],
        stats
      }));
  }
}

module.exports = CompositionTemplates;
