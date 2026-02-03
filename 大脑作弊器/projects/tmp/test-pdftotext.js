const { exec } = require('child_process');
const { promisify } = require('util');
const fs = require('fs');

const execAsync = promisify(exec);

async function testPdftotext() {
  console.log('测试pdftotext命令...');

  try {
    const result = await execAsync('pdftotext -v');
    console.log('✅ pdftotext可用');
    console.log(result.stdout);
  } catch (error) {
    console.error('❌ pdftotext不可用:', error.message);
  }
}

testPdftotext();
