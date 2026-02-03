#!/usr/bin/env node

const fs = require('fs');
const http = require('http');

// 读取测试文件
const testFile = fs.readFileSync('/tmp/test-upload.txt');
const base64Data = Buffer.from(testFile).toString('base64');
const dataUrl = `data:text/plain;base64,${base64Data}`;

// 准备请求数据
const requestData = JSON.stringify({
  type: 'file',
  content: dataUrl,
  mimeType: 'text/plain',
  fileName: 'test-upload.txt',
  fileSize: testFile.length
});

// 发送请求
const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/process',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(requestData)
  }
};

console.log('发送文件上传测试请求...');

const req = http.request(options, (res) => {
  console.log(`响应状态码: ${res.statusCode}`);
  console.log(`响应头:`, res.headers);

  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    console.log('\n响应内容:');
    console.log(body.substring(0, 1000));

    if (res.statusCode === 200) {
      console.log('\n✅ 测试成功！');
    } else {
      console.log('\n❌ 测试失败！');
    }
  });
});

req.on('error', (error) => {
  console.error('请求错误:', error);
});

req.write(requestData);
req.end();
