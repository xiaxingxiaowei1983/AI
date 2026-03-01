#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SCAN_DIRS = ['agents', 'skills', 'docs', 'shared-memory'];
const OUTPUT_FILE = path.resolve(ROOT_DIR, 'DOCUMENT_INDEX.json');
const IGNORE_PATTERNS = [
  'node_modules', '.git', '.venv', 'dist', 'build', '.next',
  '*.log', '*.json', 'package-lock.json', 'yarn.lock'
];

function shouldIgnore(filePath) {
  const relativePath = path.relative(ROOT_DIR, filePath);
  for (const pattern of IGNORE_PATTERNS) {
    if (pattern.startsWith('*.')) {
      const ext = pattern.slice(1);
      if (relativePath.endsWith(ext)) return true;
    } else if (relativePath.includes(pattern)) {
      return true;
    }
  }
  return false;
}

function getFileType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const typeMap = {
    '.md': 'markdown',
    '.js': 'javascript',
    '.ts': 'typescript',
    '.json': 'json',
    '.yaml': 'yaml',
    '.yml': 'yaml',
    '.txt': 'text',
    '.py': 'python',
    '.sh': 'shell'
  };
  return typeMap[ext] || 'unknown';
}

function extractTitle(content, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.md') {
    const lines = content.split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.startsWith('# ')) {
        return trimmed.slice(2).trim();
      }
    }
  }
  
  if (ext === '.json') {
    try {
      const data = JSON.parse(content);
      if (data.name) return data.name;
      if (data.title) return data.title;
      if (data.description) return data.description.substring(0, 50);
    } catch (e) {}
  }
  
  return null;
}

function extractSummary(content, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (ext === '.md') {
    const lines = content.split('\n');
    let inCodeBlock = false;
    let summaryLines = [];
    
    for (const line of lines) {
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        continue;
      }
      if (inCodeBlock) continue;
      
      const trimmed = line.trim();
      if (trimmed.startsWith('#')) continue;
      if (trimmed.length > 0) {
        summaryLines.push(trimmed);
        if (summaryLines.length >= 3) break;
      }
    }
    
    if (summaryLines.length > 0) {
      return summaryLines.join(' ').substring(0, 200);
    }
  }
  
  return null;
}

function scanDirectory(dir, results = []) {
  if (!fs.existsSync(dir)) return results;
  
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (shouldIgnore(fullPath)) continue;
    
    if (item.isDirectory()) {
      scanDirectory(fullPath, results);
    } else if (item.isFile()) {
      const relativePath = path.relative(ROOT_DIR, fullPath);
      const content = fs.readFileSync(fullPath, 'utf8');
      
      results.push({
        path: relativePath,
        type: getFileType(fullPath),
        title: extractTitle(content, fullPath),
        summary: extractSummary(content, fullPath),
        size: fs.statSync(fullPath).size,
        modified: fs.statSync(fullPath).mtime.toISOString()
      });
    }
  }
  
  return results;
}

function buildIndex() {
  console.log('🔍 扫描文档目录...');
  
  const documents = [];
  
  for (const dir of SCAN_DIRS) {
    const fullPath = path.join(ROOT_DIR, dir);
    console.log(`   扫描: ${dir}/`);
    const docs = scanDirectory(fullPath);
    documents.push(...docs);
  }
  
  const index = {
    version: '1.0',
    generated: new Date().toISOString(),
    total: documents.length,
    documents: documents
  };
  
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(index, null, 2));
  console.log(`✅ 索引已生成: ${OUTPUT_FILE}`);
  console.log(`   共 ${documents.length} 个文档`);
  
  return index;
}

if (require.main === module) {
  buildIndex();
}

module.exports = { buildIndex, scanDirectory };
