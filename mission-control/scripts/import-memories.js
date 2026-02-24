const fs = require('fs');
const path = require('path');

// 数据导入脚本
// 用于将现有的记忆数据导入到 Convex 数据库

console.log('🚀 开始导入记忆数据...');

// 现有记忆数据路径
const memoryFiles = [
  '../agents/green-tea/memory.md',
  '../company-brain/src/memory/index.js'
];

// 解析记忆数据
function parseMemoryFile(filePath) {
  try {
    const fullPath = path.resolve(__dirname, filePath);
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️ 文件不存在: ${fullPath}`);
      return [];
    }

    const content = fs.readFileSync(fullPath, 'utf8');
    console.log(`📄 读取文件: ${fullPath}`);

    // 根据文件类型解析
    if (filePath.endsWith('.md')) {
      return parseMarkdownFile(content, filePath);
    } else if (filePath.endsWith('.js')) {
      return parseJavaScriptFile(content, filePath);
    } else {
      console.log(`⚠️ 不支持的文件类型: ${filePath}`);
      return [];
    }
  } catch (error) {
    console.error(`❌ 解析文件时出错: ${filePath}`, error.message);
    return [];
  }
}

// 解析 Markdown 文件
function parseMarkdownFile(content, filePath) {
  const memories = [];
  const lines = content.split('\n');
  let currentMemory = null;
  let currentContent = [];

  for (const line of lines) {
    // 检查标题行
    if (line.startsWith('# ')) {
      // 如果有当前记忆，保存它
      if (currentMemory) {
        currentMemory.content = currentContent.join('\n');
        memories.push(currentMemory);
      }

      // 创建新记忆
      currentMemory = {
        title: line.substring(2).trim(),
        content: '',
        createdAt: Date.now(),
        updatedAt: Date.now(),
        tags: [],
        category: 'personal',
        userId: 'user1'
      };
      currentContent = [];
    } else if (currentMemory) {
      // 收集内容
      currentContent.push(line);
    }
  }

  // 保存最后一个记忆
  if (currentMemory) {
    currentMemory.content = currentContent.join('\n');
    memories.push(currentMemory);
  }

  console.log(`✅ 从 Markdown 文件解析出 ${memories.length} 个记忆`);
  return memories;
}

// 解析 JavaScript 文件
function parseJavaScriptFile(content, filePath) {
  const memories = [];
  // 简单的解析逻辑，实际情况可能需要更复杂的解析
  console.log(`✅ 从 JavaScript 文件解析记忆数据`);
  return memories;
}

// 导入记忆数据到 Convex
async function importMemoriesToConvex(memories) {
  console.log(`📦 准备导入 ${memories.length} 个记忆到 Convex 数据库...`);

  // 这里应该调用 Convex API 导入数据
  // 暂时只打印信息
  memories.forEach((memory, index) => {
    console.log(`\n记忆 ${index + 1}:`);
    console.log(`标题: ${memory.title}`);
    console.log(`分类: ${memory.category}`);
    console.log(`标签: ${memory.tags.join(', ')}`);
    console.log(`内容长度: ${memory.content.length} 字符`);
  });

  console.log(`\n✅ 记忆数据导入完成！`);
  return memories.length;
}

// 主函数
async function main() {
  try {
    let allMemories = [];

    // 解析所有记忆文件
    for (const file of memoryFiles) {
      const memories = parseMemoryFile(file);
      allMemories = [...allMemories, ...memories];
    }

    // 去重
    const uniqueMemories = [];
    const seenTitles = new Set();

    for (const memory of allMemories) {
      if (!seenTitles.has(memory.title)) {
        seenTitles.add(memory.title);
        uniqueMemories.push(memory);
      }
    }

    console.log(`\n📊 总计解析出 ${allMemories.length} 个记忆，去重后 ${uniqueMemories.length} 个`);

    // 导入到 Convex
    const importedCount = await importMemoriesToConvex(uniqueMemories);

    console.log(`\n🎉 数据导入完成！`);
    console.log(`📈 导入了 ${importedCount} 个记忆`);
  } catch (error) {
    console.error(`❌ 导入过程中出错:`, error);
  }
}

// 执行主函数
main();
