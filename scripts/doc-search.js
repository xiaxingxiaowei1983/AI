#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const INDEX_FILE = path.resolve(ROOT_DIR, 'DOCUMENT_INDEX.json');

function loadIndex() {
  if (!fs.existsSync(INDEX_FILE)) {
    console.error('❌ 索引文件不存在，请先运行 doc-indexer.js');
    process.exit(1);
  }
  return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf8'));
}

function searchIndex(query, options = {}) {
  const index = loadIndex();
  const { limit = 10, types = [] } = options;
  
  const queryLower = query.toLowerCase();
  const results = [];
  
  for (const doc of index.documents) {
    if (types.length > 0 && !types.includes(doc.type)) {
      continue;
    }
    
    let score = 0;
    
    if (doc.title && doc.title.toLowerCase().includes(queryLower)) {
      score += 10;
    }
    
    if (doc.summary && doc.summary.toLowerCase().includes(queryLower)) {
      score += 5;
    }
    
    if (doc.path.toLowerCase().includes(queryLower)) {
      score += 3;
    }
    
    if (score > 0) {
      results.push({ ...doc, score });
    }
  }
  
  results.sort((a, b) => b.score - a.score);
  
  return results.slice(0, limit);
}

function displayResults(results) {
  if (results.length === 0) {
    console.log('未找到匹配的文档');
    return;
  }
  
  console.log(`找到 ${results.length} 个匹配结果:\n`);
  
  for (let i = 0; i < results.length; i++) {
    const doc = results[i];
    console.log(`${i + 1}. ${doc.title || doc.path}`);
    console.log(`   路径: ${doc.path}`);
    console.log(`   类型: ${doc.type}`);
    if (doc.summary) {
      console.log(`   摘要: ${doc.summary.substring(0, 100)}...`);
    }
    console.log('');
  }
}

function main() {
  const args = process.argv.slice(2);
  
  if (args.length === 0 || args.includes('--help') || args.includes('-h')) {
    console.log(`
用法: node doc-search.js <关键词> [选项]

选项:
  --limit, -l <数量>  限制结果数量 (默认: 10)
  --type, -t <类型>   按文件类型过滤 (markdown, javascript, json, etc.)
  --help, -h         显示帮助

示例:
  node doc-search.js "组织架构"
  node doc-search.js "技能" --limit 20
  node doc-search.js "配置" --type markdown
`);
    process.exit(0);
  }
  
  let query = '';
  const options = { limit: 10, types: [] };
  
  for (let i = 0; i < args.length; i++) {
    const arg = args[i];
    
    if (arg === '--limit' || arg === '-l') {
      options.limit = parseInt(args[++i]) || 10;
    } else if (arg === '--type' || arg === '-t') {
      options.types.push(args[++i]);
    } else if (!arg.startsWith('-')) {
      query = arg;
    }
  }
  
  if (!query) {
    console.error('❌ 请提供搜索关键词');
    process.exit(1);
  }
  
  const results = searchIndex(query, options);
  displayResults(results);
}

if (require.main === module) {
  main();
}

module.exports = { searchIndex, loadIndex };
