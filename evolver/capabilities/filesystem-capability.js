const fs = require('fs');
const path = require('path');

const FILESYSTEM_CAPABILITIES_FILE = path.join(__dirname, '../capability-shapes.json');

class FilesystemCapability {
  constructor() {
    this.capabilities = this.loadCapabilities();
  }

  loadCapabilities() {
    return {
      version: '1.0',
      category: 'filesystem',
      description: 'File system operation capabilities',
      capabilities: [
        {
          id: 'fs_create_file',
          name: 'Create File',
          type: 'filesystem_operation',
          description: 'Create a new file with specified content',
          inputs: [
            { name: 'filePath', type: 'string', description: 'Path to the file to create', required: true },
            { name: 'content', type: 'string', description: 'Content to write to the file', required: true },
            { name: 'encoding', type: 'string', description: 'File encoding (default: utf8)', required: false, default: 'utf8' }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the operation succeeded' },
            { name: 'filePath', type: 'string', description: 'Absolute path of the created file' },
            { name: 'size', type: 'number', description: 'Size of the created file in bytes' }
          ],
          failurePoints: [
            { type: 'permission_denied', description: 'No write permission for the target directory', impact: 'operation_failure' },
            { type: 'path_not_found', description: 'Parent directory does not exist', impact: 'operation_failure' },
            { type: 'file_exists', description: 'File already exists', impact: 'operation_failure' }
          ],
          reliability: 0.95,
          适用场景: ['创建配置文件', '生成日志文件', '写入数据文件'],
          优势: ['原子操作', '支持多种编码', '自动创建父目录']
        },
        {
          id: 'fs_delete_file',
          name: 'Delete File',
          type: 'filesystem_operation',
          description: 'Delete an existing file',
          inputs: [
            { name: 'filePath', type: 'string', description: 'Path to the file to delete', required: true },
            { name: 'force', type: 'boolean', description: 'Force deletion even if file is read-only', required: false, default: false }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the operation succeeded' },
            { name: 'filePath', type: 'string', description: 'Absolute path of the deleted file' }
          ],
          failurePoints: [
            { type: 'file_not_found', description: 'File does not exist', impact: 'operation_failure' },
            { type: 'permission_denied', description: 'No delete permission for the file', impact: 'operation_failure' },
            { type: 'file_in_use', description: 'File is currently in use by another process', impact: 'operation_failure' }
          ],
          reliability: 0.92,
          适用场景: ['清理临时文件', '删除过期数据', '移除配置文件'],
          优势: ['安全删除', '支持强制模式', '错误处理完善']
        },
        {
          id: 'fs_modify_file',
          name: 'Modify File',
          type: 'filesystem_operation',
          description: 'Modify an existing file',
          inputs: [
            { name: 'filePath', type: 'string', description: 'Path to the file to modify', required: true },
            { name: 'content', type: 'string', description: 'New content to write to the file', required: true },
            { name: 'mode', type: 'string', description: 'Modification mode: overwrite, append, prepend', required: false, default: 'overwrite' },
            { name: 'encoding', type: 'string', description: 'File encoding (default: utf8)', required: false, default: 'utf8' }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the operation succeeded' },
            { name: 'filePath', type: 'string', description: 'Absolute path of the modified file' },
            { name: 'size', type: 'number', description: 'New size of the file in bytes' }
          ],
          failurePoints: [
            { type: 'file_not_found', description: 'File does not exist', impact: 'operation_failure' },
            { type: 'permission_denied', description: 'No write permission for the file', impact: 'operation_failure' },
            { type: 'invalid_mode', description: 'Invalid modification mode specified', impact: 'operation_failure' }
          ],
          reliability: 0.94,
          适用场景: ['更新配置文件', '追加日志内容', '修改数据文件'],
          优势: ['多种修改模式', '支持追加和前置', '保留原文件属性']
        },
        {
          id: 'fs_copy_file',
          name: 'Copy File',
          type: 'filesystem_operation',
          description: 'Copy a file to a new location',
          inputs: [
            { name: 'sourcePath', type: 'string', description: 'Path to the source file', required: true },
            { name: 'destinationPath', type: 'string', description: 'Path to the destination file', required: true },
            { name: 'overwrite', type: 'boolean', description: 'Overwrite destination if exists', required: false, default: false }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the operation succeeded' },
            { name: 'sourcePath', type: 'string', description: 'Absolute path of the source file' },
            { name: 'destinationPath', type: 'string', description: 'Absolute path of the destination file' },
            { name: 'size', type: 'number', description: 'Size of the copied file in bytes' }
          ],
          failurePoints: [
            { type: 'source_not_found', description: 'Source file does not exist', impact: 'operation_failure' },
            { type: 'destination_exists', description: 'Destination file already exists', impact: 'operation_failure' },
            { type: 'permission_denied', description: 'No read/write permission', impact: 'operation_failure' }
          ],
          reliability: 0.96,
          适用场景: ['备份文件', '复制配置', '创建文件副本'],
          优势: ['保留文件属性', '支持覆盖选项', '原子操作']
        },
        {
          id: 'fs_move_file',
          name: 'Move File',
          type: 'filesystem_operation',
          description: 'Move a file to a new location',
          inputs: [
            { name: 'sourcePath', type: 'string', description: 'Path to the source file', required: true },
            { name: 'destinationPath', type: 'string', description: 'Path to the destination file', required: true },
            { name: 'overwrite', type: 'boolean', description: 'Overwrite destination if exists', required: false, default: false }
          ],
          outputs: [
            { name: 'success', type: 'boolean', description: 'Whether the operation succeeded' },
            { name: 'sourcePath', type: 'string', description: 'Original absolute path of the file' },
            { name: 'destinationPath', type: 'string', description: 'New absolute path of the file' }
          ],
          failurePoints: [
            { type: 'source_not_found', description: 'Source file does not exist', impact: 'operation_failure' },
            { type: 'destination_exists', description: 'Destination file already exists', impact: 'operation_failure' },
            { type: 'cross_device', description: 'Source and destination are on different devices', impact: 'operation_failure' }
          ],
          reliability: 0.93,
          适用场景: ['重命名文件', '移动文件到新目录', '整理文件结构'],
          优势: ['原子操作', '保留文件属性', '支持跨目录移动']
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

  saveCapabilities() {
    fs.writeFileSync(FILESYSTEM_CAPABILITIES_FILE, JSON.stringify(this.capabilities, null, 2));
    console.log('Filesystem capabilities saved to', FILESYSTEM_CAPABILITIES_FILE);
  }

  async executeCapability(capabilityId, params) {
    console.log(`=== Executing filesystem capability: ${capabilityId} ===`);
    
    const capability = this.capabilities.capabilities.find(c => c.id === capabilityId);
    if (!capability) {
      throw new Error(`Capability not found: ${capabilityId}`);
    }

    this.validateInputs(capability, params);

    let result;
    switch (capabilityId) {
      case 'fs_create_file':
        result = await this.createFile(params);
        break;
      case 'fs_delete_file':
        result = await this.deleteFile(params);
        break;
      case 'fs_modify_file':
        result = await this.modifyFile(params);
        break;
      case 'fs_copy_file':
        result = await this.copyFile(params);
        break;
      case 'fs_move_file':
        result = await this.moveFile(params);
        break;
      default:
        throw new Error(`Unknown capability: ${capabilityId}`);
    }

    this.updateUsageStats(result.success);
    this.saveCapabilities();

    return result;
  }

  validateInputs(capability, params) {
    for (const input of capability.inputs) {
      if (input.required && (params[input.name] === undefined || params[input.name] === null)) {
        throw new Error(`Missing required parameter: ${input.name}`);
      }
    }
  }

  async createFile(params) {
    const { filePath, content, encoding = 'utf8' } = params;
    const absolutePath = path.resolve(filePath);

    try {
      const parentDir = path.dirname(absolutePath);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      if (fs.existsSync(absolutePath)) {
        return {
          success: false,
          error: 'File already exists',
          filePath: absolutePath
        };
      }

      fs.writeFileSync(absolutePath, content, { encoding });
      const stats = fs.statSync(absolutePath);

      console.log(`✅ File created: ${absolutePath} (${stats.size} bytes)`);
      return {
        success: true,
        filePath: absolutePath,
        size: stats.size
      };
    } catch (error) {
      console.error(`❌ Failed to create file: ${error.message}`);
      return {
        success: false,
        error: error.message,
        filePath: absolutePath
      };
    }
  }

  async deleteFile(params) {
    const { filePath, force = false } = params;
    const absolutePath = path.resolve(filePath);

    try {
      if (!fs.existsSync(absolutePath)) {
        return {
          success: false,
          error: 'File not found',
          filePath: absolutePath
        };
      }

      if (force) {
        fs.chmodSync(absolutePath, 0o666);
      }

      fs.unlinkSync(absolutePath);
      console.log(`✅ File deleted: ${absolutePath}`);
      return {
        success: true,
        filePath: absolutePath
      };
    } catch (error) {
      console.error(`❌ Failed to delete file: ${error.message}`);
      return {
        success: false,
        error: error.message,
        filePath: absolutePath
      };
    }
  }

  async modifyFile(params) {
    const { filePath, content, mode = 'overwrite', encoding = 'utf8' } = params;
    const absolutePath = path.resolve(filePath);

    try {
      if (!fs.existsSync(absolutePath)) {
        return {
          success: false,
          error: 'File not found',
          filePath: absolutePath
        };
      }

      let finalContent;
      switch (mode) {
        case 'overwrite':
          finalContent = content;
          break;
        case 'append':
          const existingContent = fs.readFileSync(absolutePath, { encoding });
          finalContent = existingContent + content;
          break;
        case 'prepend':
          const currentContent = fs.readFileSync(absolutePath, { encoding });
          finalContent = content + currentContent;
          break;
        default:
          return {
            success: false,
            error: `Invalid mode: ${mode}`,
            filePath: absolutePath
          };
      }

      fs.writeFileSync(absolutePath, finalContent, { encoding });
      const stats = fs.statSync(absolutePath);

      console.log(`✅ File modified: ${absolutePath} (${stats.size} bytes, mode: ${mode})`);
      return {
        success: true,
        filePath: absolutePath,
        size: stats.size
      };
    } catch (error) {
      console.error(`❌ Failed to modify file: ${error.message}`);
      return {
        success: false,
        error: error.message,
        filePath: absolutePath
      };
    }
  }

  async copyFile(params) {
    const { sourcePath, destinationPath, overwrite = false } = params;
    const absoluteSource = path.resolve(sourcePath);
    const absoluteDestination = path.resolve(destinationPath);

    try {
      if (!fs.existsSync(absoluteSource)) {
        return {
          success: false,
          error: 'Source file not found',
          sourcePath: absoluteSource,
          destinationPath: absoluteDestination
        };
      }

      if (fs.existsSync(absoluteDestination) && !overwrite) {
        return {
          success: false,
          error: 'Destination file already exists',
          sourcePath: absoluteSource,
          destinationPath: absoluteDestination
        };
      }

      const parentDir = path.dirname(absoluteDestination);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      fs.copyFileSync(absoluteSource, absoluteDestination);
      const stats = fs.statSync(absoluteDestination);

      console.log(`✅ File copied: ${absoluteSource} -> ${absoluteDestination} (${stats.size} bytes)`);
      return {
        success: true,
        sourcePath: absoluteSource,
        destinationPath: absoluteDestination,
        size: stats.size
      };
    } catch (error) {
      console.error(`❌ Failed to copy file: ${error.message}`);
      return {
        success: false,
        error: error.message,
        sourcePath: absoluteSource,
        destinationPath: absoluteDestination
      };
    }
  }

  async moveFile(params) {
    const { sourcePath, destinationPath, overwrite = false } = params;
    const absoluteSource = path.resolve(sourcePath);
    const absoluteDestination = path.resolve(destinationPath);

    try {
      if (!fs.existsSync(absoluteSource)) {
        return {
          success: false,
          error: 'Source file not found',
          sourcePath: absoluteSource,
          destinationPath: absoluteDestination
        };
      }

      if (fs.existsSync(absoluteDestination) && !overwrite) {
        return {
          success: false,
          error: 'Destination file already exists',
          sourcePath: absoluteSource,
          destinationPath: absoluteDestination
        };
      }

      const parentDir = path.dirname(absoluteDestination);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      fs.renameSync(absoluteSource, absoluteDestination);

      console.log(`✅ File moved: ${absoluteSource} -> ${absoluteDestination}`);
      return {
        success: true,
        sourcePath: absoluteSource,
        destinationPath: absoluteDestination
      };
    } catch (error) {
      console.error(`❌ Failed to move file: ${error.message}`);
      return {
        success: false,
        error: error.message,
        sourcePath: absoluteSource,
        destinationPath: absoluteDestination
      };
    }
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

module.exports = FilesystemCapability;
