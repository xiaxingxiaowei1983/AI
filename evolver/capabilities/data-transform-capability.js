const fs = require('fs');
const path = require('path');

const DATA_TRANSFORM_CAPABILITIES_FILE = path.join(__dirname, '../capability-shapes.json');

class DataTransformCapability {
  constructor() {
    this.capabilities = this.loadCapabilities();
  }

  loadCapabilities() {
    return {
      version: '1.0',
      category: 'data_transform',
      description: 'Data format transformation capabilities',
      capabilities: [
        {
          id: 'dt_json_to_csv',
          name: 'JSON to CSV',
          type: 'data_transformation',
          description: 'Convert JSON data to CSV format',
          inputs: [
            { name: 'jsonData', type: 'object|array', description: 'JSON data to convert', required: true },
            { name: 'options', type: 'object', description: 'Conversion options', required: false, default: {} }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the conversion succeeded' },
            { name: 'csvData', type: 'string', description: 'Converted CSV data' },
            { name: 'rowCount', type: 'number', description: 'Number of rows in CSV' }
          ],
          failurePoints: [
            { type: 'invalid_json', description: 'Input is not valid JSON', impact: 'conversion_failure' },
            { type: 'empty_data', description: 'JSON data is empty', impact: 'conversion_failure' },
            { type: 'nested_objects', description: 'JSON contains deeply nested objects', impact: 'data_loss' }
          ],
          reliability: 0.92,
          适用场景: ['数据导出', '报表生成', '数据分析准备'],
          优势: ['自动检测字段', '支持嵌套对象扁平化', '可自定义分隔符']
        },
        {
          id: 'dt_csv_to_json',
          name: 'CSV to JSON',
          type: 'data_transformation',
          description: 'Convert CSV data to JSON format',
          inputs: [
            { name: 'csvData', type: 'string', description: 'CSV data to convert', required: true },
            { name: 'options', type: 'object', description: 'Conversion options', required: false, default: {} }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the conversion succeeded' },
            { name: 'jsonData', type: 'array', description: 'Converted JSON data' },
            { name: 'rowCount', type: 'number', description: 'Number of records in JSON' }
          ],
          failurePoints: [
            { type: 'invalid_csv', description: 'Input is not valid CSV', impact: 'conversion_failure' },
            { type: 'inconsistent_columns', description: 'CSV rows have inconsistent column counts', impact: 'data_loss' },
            { type: 'encoding_issues', description: 'CSV has encoding problems', impact: 'data_corruption' }
          ],
          reliability: 0.94,
          适用场景: ['数据导入', '配置转换', 'API数据处理'],
          优势: ['自动类型推断', '支持自定义分隔符', '处理引号和转义']
        },
        {
          id: 'dt_json_to_xml',
          name: 'JSON to XML',
          type: 'data_transformation',
          description: 'Convert JSON data to XML format',
          inputs: [
            { name: 'jsonData', type: 'object', description: 'JSON data to convert', required: true },
            { name: 'rootElement', type: 'string', description: 'Root element name for XML', required: false, default: 'root' },
            { name: 'options', type: 'object', description: 'Conversion options', required: false, default: {} }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the conversion succeeded' },
            { name: 'xmlData', type: 'string', description: 'Converted XML data' },
            { name: 'elementCount', type: 'number', description: 'Number of XML elements' }
          ],
          failurePoints: [
            { type: 'invalid_json', description: 'Input is not valid JSON', impact: 'conversion_failure' },
            { type: 'circular_reference', description: 'JSON contains circular references', impact: 'conversion_failure' },
            { type: 'invalid_characters', description: 'JSON contains invalid XML characters', impact: 'encoding_error' }
          ],
          reliability: 0.90,
          适用场景: ['数据交换', '系统集成', '配置文件生成'],
          优势: ['自定义根元素', '属性支持', '格式化输出']
        },
        {
          id: 'dt_xml_to_json',
          name: 'XML to JSON',
          type: 'data_transformation',
          description: 'Convert XML data to JSON format',
          inputs: [
            { name: 'xmlData', type: 'string', description: 'XML data to convert', required: true },
            { name: 'options', type: 'object', description: 'Conversion options', required: false, default: {} }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the conversion succeeded' },
            { name: 'jsonData', type: 'object', description: 'Converted JSON data' },
            { name: 'elementCount', type: 'number', description: 'Number of JSON elements' }
          ],
          failurePoints: [
            { type: 'invalid_xml', description: 'Input is not valid XML', impact: 'conversion_failure' },
            { type: 'malformed_tags', description: 'XML has malformed tags', impact: 'parsing_error' },
            { type: 'namespace_issues', description: 'XML namespace handling issues', impact: 'data_loss' }
          ],
          reliability: 0.88,
          适用场景: ['API响应处理', '配置文件解析', '数据迁移'],
          优势: ['属性保留', '命名空间支持', '文本节点处理']
        },
        {
          id: 'dt_auto_detect',
          name: 'Auto Detect Format',
          type: 'data_transformation',
          description: 'Automatically detect data format and convert to target format',
          inputs: [
            { name: 'data', type: 'string|object', description: 'Data to analyze and convert', required: true },
            { name: 'targetFormat', type: 'string', description: 'Target format: json, csv, xml', required: true }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the conversion succeeded' },
            { name: 'detectedFormat', type: 'string', description: 'Detected source format' },
            { name: 'convertedData', type: 'any', description: 'Converted data in target format' }
          ],
          failurePoints: [
            { type: 'unknown_format', description: 'Unable to detect data format', impact: 'conversion_failure' },
            { type: 'unsupported_conversion', description: 'Conversion not supported', impact: 'operation_failure' },
            { type: 'ambiguous_format', description: 'Data matches multiple formats', impact: 'incorrect_detection' }
          ],
          reliability: 0.85,
          适用场景: ['自动数据处理', '批量转换', '智能数据导入'],
          优势: ['自动格式检测', '智能转换', '错误容忍']
        }
      ],
      usageStats: {
        totalOperations: 0,
        successfulOperations: 0,
        failedOperations: 0,
        lastUsed: null
      }
    };
  }

  async executeCapability(capabilityId, params) {
    console.log(`=== Executing data transform capability: ${capabilityId} ===`);
    
    const capability = this.capabilities.capabilities.find(c => c.id === capabilityId);
    if (!capability) {
      throw new Error(`Capability not found: ${capabilityId}`);
    }

    let result;
    switch (capabilityId) {
      case 'dt_json_to_csv':
        result = await this.jsonToCsv(params);
        break;
      case 'dt_csv_to_json':
        result = await this.csvToJson(params);
        break;
      case 'dt_json_to_xml':
        result = await this.jsonToXml(params);
        break;
      case 'dt_xml_to_json':
        result = await this.xmlToJson(params);
        break;
      case 'dt_auto_detect':
        result = await this.autoDetectAndConvert(params);
        break;
      default:
        throw new Error(`Unknown capability: ${capabilityId}`);
    }

    this.updateUsageStats(result.success);
    return result;
  }

  async jsonToCsv(params) {
    const { jsonData, options = {} } = params;
    const delimiter = options.delimiter || ',';
    const includeHeaders = options.includeHeaders !== false;

    try {
      if (!jsonData || (Array.isArray(jsonData) && jsonData.length === 0)) {
        return { success: false, error: 'Empty JSON data' };
      }

      const dataArray = Array.isArray(jsonData) ? jsonData : [jsonData];
      const headers = this.extractHeaders(dataArray);
      
      let csv = '';
      if (includeHeaders) {
        csv += headers.join(delimiter) + '\n';
      }

      for (const item of dataArray) {
        const row = headers.map(header => {
          const value = this.getNestedValue(item, header);
          return this.formatCsvValue(value, delimiter);
        });
        csv += row.join(delimiter) + '\n';
      }

      console.log(`✅ JSON to CSV conversion: ${dataArray.length} rows`);
      return {
        success: true,
        csvData: csv.trim(),
        rowCount: dataArray.length
      };
    } catch (error) {
      console.error(`❌ JSON to CSV conversion failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async csvToJson(params) {
    const { csvData, options = {} } = params;
    const delimiter = options.delimiter || ',';

    try {
      if (!csvData || csvData.trim().length === 0) {
        return { success: false, error: 'Empty CSV data' };
      }

      const lines = csvData.trim().split('\n');
      if (lines.length < 1) {
        return { success: false, error: 'CSV has no data' };
      }

      const headers = this.parseCsvLine(lines[0], delimiter);
      const jsonData = [];

      for (let i = 1; i < lines.length; i++) {
        const values = this.parseCsvLine(lines[i], delimiter);
        const obj = {};
        headers.forEach((header, index) => {
          obj[header] = this.parseValue(values[index] || '');
        });
        jsonData.push(obj);
      }

      console.log(`✅ CSV to JSON conversion: ${jsonData.length} records`);
      return {
        success: true,
        jsonData,
        rowCount: jsonData.length
      };
    } catch (error) {
      console.error(`❌ CSV to JSON conversion failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async jsonToXml(params) {
    const { jsonData, rootElement = 'root', options = {} } = params;

    try {
      if (!jsonData) {
        return { success: false, error: 'Empty JSON data' };
      }

      let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
      xml += `<${rootElement}>\n`;
      xml += this.objectToXml(jsonData, 1);
      xml += `</${rootElement}>`;

      const elementCount = this.countXmlElements(xml);

      console.log(`✅ JSON to XML conversion: ${elementCount} elements`);
      return {
        success: true,
        xmlData: xml,
        elementCount
      };
    } catch (error) {
      console.error(`❌ JSON to XML conversion failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async xmlToJson(params) {
    const { xmlData, options = {} } = params;

    try {
      if (!xmlData || xmlData.trim().length === 0) {
        return { success: false, error: 'Empty XML data' };
      }

      const result = this.parseXml(xmlData);
      
      console.log(`✅ XML to JSON conversion completed`);
      return {
        success: true,
        jsonData: result,
        elementCount: this.countJsonElements(result)
      };
    } catch (error) {
      console.error(`❌ XML to JSON conversion failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  async autoDetectAndConvert(params) {
    const { data, targetFormat } = params;

    try {
      const detectedFormat = this.detectFormat(data);
      console.log(`🔍 Detected format: ${detectedFormat}`);

      if (detectedFormat === targetFormat) {
        return {
          success: true,
          detectedFormat,
          convertedData: data
        };
      }

      let result;
      switch (detectedFormat) {
        case 'json':
          if (targetFormat === 'csv') {
            result = await this.jsonToCsv({ jsonData: typeof data === 'string' ? JSON.parse(data) : data });
          } else if (targetFormat === 'xml') {
            result = await this.jsonToXml({ jsonData: typeof data === 'string' ? JSON.parse(data) : data });
          }
          break;
        case 'csv':
          if (targetFormat === 'json') {
            result = await this.csvToJson({ csvData: data });
          }
          break;
        case 'xml':
          if (targetFormat === 'json') {
            result = await this.xmlToJson({ xmlData: data });
          }
          break;
        default:
          return { success: false, error: `Unknown source format: ${detectedFormat}` };
      }

      return {
        success: result.success,
        detectedFormat,
        convertedData: result.success ? (result.csvData || result.xmlData || result.jsonData) : null,
        error: result.error
      };
    } catch (error) {
      console.error(`❌ Auto detection and conversion failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  }

  extractHeaders(dataArray) {
    const headers = new Set();
    for (const item of dataArray) {
      this.flattenObject(item, '', headers);
    }
    return Array.from(headers);
  }

  flattenObject(obj, prefix, headers) {
    for (const key in obj) {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
        this.flattenObject(obj[key], newKey, headers);
      } else {
        headers.add(newKey);
      }
    }
  }

  getNestedValue(obj, path) {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  }

  formatCsvValue(value, delimiter) {
    if (value === null || value === undefined) return '';
    const str = String(value);
    if (str.includes(delimiter) || str.includes('"') || str.includes('\n')) {
      return `"${str.replace(/"/g, '""')}"`;
    }
    return str;
  }

  parseCsvLine(line, delimiter) {
    const result = [];
    let current = '';
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === delimiter && !inQuotes) {
        result.push(current);
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current);
    return result;
  }

  parseValue(value) {
    if (value === '' || value === 'null') return null;
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (!isNaN(value) && value !== '') return Number(value);
    return value;
  }

  objectToXml(obj, indent) {
    const spaces = '  '.repeat(indent);
    let xml = '';

    for (const key in obj) {
      const value = obj[key];
      if (Array.isArray(value)) {
        for (const item of value) {
          xml += `${spaces}<${key}>\n`;
          if (typeof item === 'object') {
            xml += this.objectToXml(item, indent + 1);
          } else {
            xml += `${spaces}  ${this.escapeXml(String(item))}\n`;
          }
          xml += `${spaces}</${key}>\n`;
        }
      } else if (typeof value === 'object' && value !== null) {
        xml += `${spaces}<${key}>\n`;
        xml += this.objectToXml(value, indent + 1);
        xml += `${spaces}</${key}>\n`;
      } else {
        xml += `${spaces}<${key}>${this.escapeXml(String(value))}</${key}>\n`;
      }
    }

    return xml;
  }

  escapeXml(str) {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  parseXml(xml) {
    const result = {};
    const tagRegex = /<(\w+)>(.*?)<\/\1>/gs;
    let match;

    while ((match = tagRegex.exec(xml)) !== null) {
      const tagName = match[1];
      const content = match[2].trim();

      if (content.includes('<')) {
        if (result[tagName]) {
          if (!Array.isArray(result[tagName])) {
            result[tagName] = [result[tagName]];
          }
          result[tagName].push(this.parseXml(content));
        } else {
          result[tagName] = this.parseXml(content);
        }
      } else {
        if (result[tagName]) {
          if (!Array.isArray(result[tagName])) {
            result[tagName] = [result[tagName]];
          }
          result[tagName].push(this.parseValue(content));
        } else {
          result[tagName] = this.parseValue(content);
        }
      }
    }

    return result;
  }

  countXmlElements(xml) {
    return (xml.match(/<[^/][^>]*>/g) || []).length;
  }

  countJsonElements(obj) {
    let count = 0;
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        count++;
        if (typeof obj[key] === 'object') {
          count += this.countJsonElements(obj[key]);
        }
      }
    }
    return count;
  }

  detectFormat(data) {
    if (typeof data === 'object') return 'json';
    
    const trimmed = data.trim();
    
    if ((trimmed.startsWith('{') && trimmed.endsWith('}')) ||
        (trimmed.startsWith('[') && trimmed.endsWith(']'))) {
      try {
        JSON.parse(trimmed);
        return 'json';
      } catch {}
    }

    if (trimmed.startsWith('<') && trimmed.endsWith('>')) {
      return 'xml';
    }

    if (trimmed.includes(',') || trimmed.includes('\t')) {
      const lines = trimmed.split('\n');
      if (lines.length > 0 && lines[0].split(/[,\t]/).length > 1) {
        return 'csv';
      }
    }

    return 'unknown';
  }

  updateUsageStats(success) {
    this.capabilities.usageStats.totalOperations++;
    if (success) {
      this.capabilities.usageStats.successfulOperations++;
    } else {
      this.capabilities.usageStats.failedOperations++;
    }
    this.capabilities.usageStats.lastUsed = new Date().toISOString();
  }

  getCapabilities() {
    return this.capabilities;
  }

  getCapabilityById(id) {
    return this.capabilities.capabilities.find(c => c.id === id);
  }

  getUsageStats() {
    return this.capabilities.usageStats;
  }
}

module.exports = DataTransformCapability;
