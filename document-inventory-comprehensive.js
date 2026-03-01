const fs = require('fs');
const path = require('path');

const rootDir = 'C:\\Users\\10919\\Desktop\\AI';
const outputFile = 'document-inventory-report.json';

const fileTypes = {
  documents: ['.md', '.txt', '.doc', '.docx', '.pdf', '.rtf'],
  code: ['.js', '.jsx', '.ts', '.tsx', '.py', '.html', '.css', '.json', '.yml', '.yaml', '.xml'],
  images: ['.jpg', '.jpeg', '.png', '.gif', '.svg', '.bmp'],
  videos: ['.mp4', '.avi', '.mov', '.wmv'],
  configs: ['.config', '.env', '.lock', '.gitignore', '.gitattributes'],
  scripts: ['.sh', '.bat', '.ps1', '.cmd'],
  other: []
};

const inventory = {
  totalFiles: 0,
  totalDirectories: 0,
  byType: {
    documents: [],
    code: [],
    images: [],
    videos: [],
    configs: [],
    scripts: [],
    other: []
  },
  byDirectory: {},
  extensions: {},
  sizeStats: {
    totalSize: 0,
    averageSize: 0,
    largestFile: { path: '', size: 0 }
  }
};

function getFileType(ext) {
  for (const [type, extensions] of Object.entries(fileTypes)) {
    if (extensions.includes(ext.toLowerCase())) {
      return type;
    }
  }
  return 'other';
}

function scanDirectory(dir) {
  try {
    const items = fs.readdirSync(dir, { withFileTypes: true });
    
    items.forEach(item => {
      const fullPath = path.join(dir, item.name);
      
      if (item.isDirectory()) {
        inventory.totalDirectories++;
        const relativePath = path.relative(rootDir, dir);
        if (!inventory.byDirectory[relativePath]) {
          inventory.byDirectory[relativePath] = { files: 0, size: 0 };
        }
        scanDirectory(fullPath);
      } else if (item.isFile()) {
        inventory.totalFiles++;
        
        const ext = path.extname(item.name);
        const type = getFileType(ext);
        const relativePath = path.relative(rootDir, fullPath);
        
        const stats = fs.statSync(fullPath);
        const fileInfo = {
          path: relativePath,
          name: item.name,
          size: stats.size,
          extension: ext,
          modified: stats.mtime.toISOString()
        };
        
        inventory.byType[type].push(fileInfo);
        
        const dirPath = path.relative(rootDir, dir);
        if (!inventory.byDirectory[dirPath]) {
          inventory.byDirectory[dirPath] = { files: 0, size: 0 };
        }
        inventory.byDirectory[dirPath].files++;
        inventory.byDirectory[dirPath].size += stats.size;
        
        if (!inventory.extensions[ext]) {
          inventory.extensions[ext] = 0;
        }
        inventory.extensions[ext]++;
        
        inventory.sizeStats.totalSize += stats.size;
        if (stats.size > inventory.sizeStats.largestFile.size) {
          inventory.sizeStats.largestFile = { path: relativePath, size: stats.size };
        }
      }
    });
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
}

console.log('开始扫描文档资产...');
console.log(`扫描根目录: ${rootDir}`);

scanDirectory(rootDir);

if (inventory.totalFiles > 0) {
  inventory.sizeStats.averageSize = inventory.sizeStats.totalSize / inventory.totalFiles;
}

const summary = {
  totalFiles: inventory.totalFiles,
  totalDirectories: inventory.totalDirectories,
  byType: Object.fromEntries(
    Object.entries(inventory.byType).map(([type, files]) => [type, files.length])
  ),
  totalSize: {
    bytes: inventory.sizeStats.totalSize,
    human: `${(inventory.sizeStats.totalSize / (1024 * 1024)).toFixed(2)} MB`
  },
  averageFileSize: {
    bytes: inventory.sizeStats.averageSize,
    human: `${(inventory.sizeStats.averageSize / 1024).toFixed(2)} KB`
  },
  largestFile: {
    path: inventory.sizeStats.largestFile.path,
    size: {
      bytes: inventory.sizeStats.largestFile.size,
      human: `${(inventory.sizeStats.largestFile.size / (1024 * 1024)).toFixed(2)} MB`
    }
  },
  topExtensions: Object.entries(inventory.extensions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10),
  directoriesWithMostFiles: Object.entries(inventory.byDirectory)
    .sort((a, b) => b[1].files - a[1].files)
    .slice(0, 10)
};

const report = {
  summary,
  detailed: inventory,
  generatedAt: new Date().toISOString()
};

fs.writeFileSync(outputFile, JSON.stringify(report, null, 2));

console.log('\n文档资产盘点完成！');
console.log(`总文件数: ${summary.totalFiles}`);
console.log(`总目录数: ${summary.totalDirectories}`);
console.log(`总大小: ${summary.totalSize.human}`);
console.log(`平均文件大小: ${summary.averageFileSize.human}`);
console.log('\n文件类型分布:');
Object.entries(summary.byType).forEach(([type, count]) => {
  console.log(`- ${type}: ${count}`);
});
console.log('\n前10个最常见的文件扩展名:');
summary.topExtensions.forEach(([ext, count]) => {
  console.log(`- ${ext}: ${count}`);
});
console.log('\n文件数最多的10个目录:');
summary.directoriesWithMostFiles.forEach(([dir, stats]) => {
  console.log(`- ${dir || '根目录'}: ${stats.files} 个文件`);
});
console.log(`\n详细报告已保存到: ${outputFile}`);