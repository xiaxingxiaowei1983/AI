const fs = require('fs');
const path = require('path');

const configPath = path.join(process.env.USERPROFILE, '.openclaw', 'openclaw.json');

console.log('修复 OpenClaw 配置文件...');
console.log('配置文件路径:', configPath);

try {
  const content = fs.readFileSync(configPath, 'utf8');
  console.log('原始内容:');
  console.log(content);
  
  // 修复语法错误：缺少逗号和括号
  let fixedContent = content.replace(
    /"name": "Doubao-Seed-Code"\s*\{\s*"id":/g,
    '"name": "Doubao-Seed-Code"\n          },\n          {\n            "id":'
  );
  
  console.log('\n修复后内容:');
  console.log(fixedContent);
  
  fs.writeFileSync(configPath, fixedContent, 'utf8');
  console.log('\n✅ 配置文件已修复');
} catch (error) {
  console.error('修复失败:', error.message);
}