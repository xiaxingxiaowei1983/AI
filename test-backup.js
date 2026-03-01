const fs = require('fs');
const path = require('path');

// 测试备份目录创建
console.log('测试备份目录创建...');
const now = new Date();
const dayOfWeek = now.getDay(); // 0-6，0是周日
const weekDays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
const dayName = weekDays[dayOfWeek];

const backupDir = path.join('./backups', dayName);
console.log(`备份目录: ${backupDir}`);

// 创建备份目录
if (!fs.existsSync(backupDir)) {
  try {
    fs.mkdirSync(backupDir, { recursive: true });
    console.log('备份目录创建成功');
  } catch (error) {
    console.error('备份目录创建失败:', error);
  }
} else {
  console.log('备份目录已存在');
}

// 测试源目录检查
console.log('\n测试源目录检查...');
const sourceDirs = [
  './agents',
  './data',
  './configs',
  './skills'
];

for (const sourceDir of sourceDirs) {
  if (fs.existsSync(sourceDir)) {
    console.log(`✓ 源目录存在: ${sourceDir}`);
  } else {
    console.log(`✗ 源目录不存在: ${sourceDir}`);
  }
}

console.log('\n测试完成！');
