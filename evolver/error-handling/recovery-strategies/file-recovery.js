const fs = require('fs');
const path = require('path');

class FileRecoveryStrategy {
  constructor() {
    this.name = 'File Recovery Strategy';
    this.description = 'Recovery strategies for file system errors';
    this.maxRetries = 3;
    this.retryDelay = 1000;
  }

  async execute(error, context) {
    const errorType = this.identifyErrorType(error);
    const strategy = this.getStrategy(errorType);
    
    console.log(`Executing file recovery strategy for: ${errorType}`);
    return await strategy(error, context);
  }

  identifyErrorType(error) {
    const message = error.message?.toLowerCase() || '';
    const code = error.code?.toLowerCase() || '';

    if (code === 'enoent' || message.includes('no such file')) return 'FILE_NOT_FOUND';
    if (code === 'eacces' || code === 'eperm' || message.includes('permission')) return 'PERMISSION_DENIED';
    if (code === 'eisdir' || message.includes('is a directory')) return 'IS_DIRECTORY';
    if (code === 'enotdir' || message.includes('not a directory')) return 'NOT_DIRECTORY';
    if (code === 'emfile' || code === 'enfile') return 'TOO_MANY_OPEN_FILES';
    if (message.includes('lock') || message.includes('in use')) return 'FILE_LOCKED';
    if (message.includes('disk') || message.includes('space')) return 'DISK_FULL';
    
    return 'UNKNOWN_FILE_ERROR';
  }

  getStrategy(errorType) {
    const strategies = {
      FILE_NOT_FOUND: this.handleFileNotFound.bind(this),
      PERMISSION_DENIED: this.handlePermissionDenied.bind(this),
      IS_DIRECTORY: this.handleIsDirectory.bind(this),
      NOT_DIRECTORY: this.handleNotDirectory.bind(this),
      TOO_MANY_OPEN_FILES: this.handleTooManyOpenFiles.bind(this),
      FILE_LOCKED: this.handleFileLocked.bind(this),
      DISK_FULL: this.handleDiskFull.bind(this),
      UNKNOWN_FILE_ERROR: this.handleUnknownError.bind(this)
    };

    return strategies[errorType] || this.handleUnknownError.bind(this);
  }

  async handleFileNotFound(error, context) {
    console.log('Handling file not found error');
    
    const filePath = context.filePath || this.extractFilePath(error);
    
    return {
      action: 'create_file',
      params: {
        filePath: filePath,
        content: context.defaultContent || '',
        createDirectories: true
      },
      fallbackAction: 'use_alternative_path',
      fallbackParams: {
        alternativePaths: context.alternativePaths || []
      }
    };
  }

  async handlePermissionDenied(error, context) {
    console.log('Handling permission denied error');
    
    return {
      action: 'request_permission',
      params: {
        permission: 'write',
        reason: 'File operation requires elevated permissions'
      },
      fallbackAction: 'use_temp_location',
      fallbackParams: {
        tempDir: context.tempDir || '/tmp'
      }
    };
  }

  async handleIsDirectory(error, context) {
    console.log('Handling is directory error');
    
    return {
      action: 'list_directory',
      params: {
        directory: context.filePath
      },
      fallbackAction: 'use_directory_index',
      fallbackParams: {
        indexFile: 'index.json'
      }
    };
  }

  async handleNotDirectory(error, context) {
    console.log('Handling not directory error');
    
    return {
      action: 'use_parent_directory',
      params: {
        parentLevels: 1
      },
      fallbackAction: 'create_directory',
      fallbackParams: {
        createParents: true
      }
    };
  }

  async handleTooManyOpenFiles(error, context) {
    console.log('Handling too many open files error');
    
    return {
      action: 'close_unused_handles',
      params: {
        closeTimeout: 5000
      },
      fallbackAction: 'reduce_concurrency',
      fallbackParams: {
        maxConcurrency: 10
      }
    };
  }

  async handleFileLocked(error, context) {
    console.log('Handling file locked error');
    
    return {
      action: 'wait_and_retry',
      params: {
        maxWaitTime: 30000,
        checkInterval: 1000
      },
      fallbackAction: 'create_copy',
      fallbackParams: {
        copySuffix: '.copy'
      }
    };
  }

  async handleDiskFull(error, context) {
    console.log('Handling disk full error');
    
    return {
      action: 'cleanup_temp_files',
      params: {
        tempDir: '/tmp',
        olderThan: 86400000
      },
      fallbackAction: 'use_alternative_storage',
      fallbackParams: {
        alternativePaths: context.alternativeStoragePaths || []
      }
    };
  }

  async handleUnknownError(error, context) {
    console.log('Handling unknown file error');
    
    return {
      action: 'retry_operation',
      params: {
        maxRetries: 3,
        delay: 1000
      },
      fallbackAction: 'report_error',
      fallbackParams: {
        severity: 'medium'
      }
    };
  }

  extractFilePath(error) {
    const message = error.message || '';
    const match = message.match(/['"]([^'"]+)['"]/);
    return match ? match[1] : null;
  }

  async ensureDirectoryExists(dirPath) {
    try {
      if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
      }
      return true;
    } catch (error) {
      console.error('Failed to create directory:', error.message);
      return false;
    }
  }

  async sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

module.exports = FileRecoveryStrategy;
