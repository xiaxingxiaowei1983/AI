// memory-manager 工具 - 用于原子更新操作

// 内存存储
const memoryStore = new Map();

/**
 * 原子更新操作
 * @param {string} targetFile - 目标文件
 * @param {string} operation - 操作类型：replace 或 append
 * @param {string} content - 内容
 * @returns {Object} 更新结果
 */
function atomicUpdate(targetFile, operation, content) {
  // 验证输入
  if (!targetFile || typeof targetFile !== 'string') {
    throw new Error('Missing or invalid targetFile parameter');
  }
  
  if (!operation || typeof operation !== 'string' || !['replace', 'append'].includes(operation)) {
    throw new Error('Missing or invalid operation parameter. Must be "replace" or "append".');
  }
  
  if (content === undefined || content === null) {
    throw new Error('Missing content parameter');
  }
  
  // 规范化目标文件路径
  const normalizedFile = normalizeFilePath(targetFile);
  
  // 获取当前内容
  let currentContent = memoryStore.get(normalizedFile) || '';
  
  // 执行操作
  let newContent;
  if (operation === 'replace') {
    newContent = String(content);
  } else { // append
    newContent = currentContent + String(content);
  }
  
  // 原子更新
  memoryStore.set(normalizedFile, newContent);
  
  return {
    success: true,
    targetFile: normalizedFile,
    operation,
    contentLength: content.length,
    newContentLength: newContent.length,
    timestamp: new Date().toISOString(),
    status: 'updated'
  };
}

/**
 * 读取文件内容
 * @param {string} targetFile - 目标文件
 * @returns {Object} 读取结果
 */
function readFile(targetFile) {
  // 验证输入
  if (!targetFile || typeof targetFile !== 'string') {
    throw new Error('Missing or invalid targetFile parameter');
  }
  
  // 规范化目标文件路径
  const normalizedFile = normalizeFilePath(targetFile);
  
  // 获取内容
  const content = memoryStore.get(normalizedFile) || '';
  
  return {
    success: true,
    targetFile: normalizedFile,
    content,
    contentLength: content.length,
    timestamp: new Date().toISOString(),
    status: 'read'
  };
}

/**
 * 删除文件
 * @param {string} targetFile - 目标文件
 * @returns {Object} 删除结果
 */
function deleteFile(targetFile) {
  // 验证输入
  if (!targetFile || typeof targetFile !== 'string') {
    throw new Error('Missing or invalid targetFile parameter');
  }
  
  // 规范化目标文件路径
  const normalizedFile = normalizeFilePath(targetFile);
  
  // 检查文件是否存在
  const exists = memoryStore.has(normalizedFile);
  
  // 删除文件
  const deleted = memoryStore.delete(normalizedFile);
  
  return {
    success: deleted,
    targetFile: normalizedFile,
    existed: exists,
    timestamp: new Date().toISOString(),
    status: deleted ? 'deleted' : 'not_found'
  };
}

/**
 * 列出所有文件
 * @returns {Object} 文件列表
 */
function listFiles() {
  const files = [];
  
  for (const [filePath, content] of memoryStore.entries()) {
    files.push({
      filePath,
      contentLength: content.length,
      lastModified: new Date().toISOString()
    });
  }
  
  return {
    success: true,
    files,
    totalFiles: files.length,
    timestamp: new Date().toISOString(),
    status: 'listed'
  };
}

/**
 * 规范化文件路径
 * @param {string} filePath - 文件路径
 * @returns {string} 规范化后的文件路径
 */
function normalizeFilePath(filePath) {
  // 移除前后空格
  let normalized = filePath.trim();
  
  // 统一使用正斜杠
  normalized = normalized.replace(/\\/g, '/');
  
  // 移除多余的斜杠
  normalized = normalized.replace(/\/+/g, '/');
  
  // 确保路径以/开头
  if (!normalized.startsWith('/')) {
    normalized = '/' + normalized;
  }
  
  return normalized;
}

/**
 * 获取存储状态
 * @returns {Object} 存储状态
 */
function getStoreStatus() {
  let totalSize = 0;
  for (const content of memoryStore.values()) {
    totalSize += content.length;
  }
  
  return {
    totalFiles: memoryStore.size,
    totalSize,
    timestamp: new Date().toISOString(),
    status: 'active'
  };
}

/**
 * 清空存储
 * @returns {Object} 清空结果
 */
function clearStore() {
  const beforeSize = memoryStore.size;
  memoryStore.clear();
  
  return {
    success: true,
    beforeSize,
    afterSize: memoryStore.size,
    timestamp: new Date().toISOString(),
    status: 'cleared'
  };
}

// 导出功能
module.exports = {
  atomicUpdate,
  readFile,
  deleteFile,
  listFiles,
  getStoreStatus,
  clearStore,
  // 工具信息
  info: {
    name: 'memory-manager',
    description: '用于原子更新操作',
    version: '1.0.0',
    author: '陈婷 (剑锋传奇)',
    guarantee: 'No edit conflicts, normalization'
  }
};