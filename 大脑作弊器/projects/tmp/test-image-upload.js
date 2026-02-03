#!/usr/bin/env node

const fs = require('fs');
const http = require('http');

// 创建一个简单的测试图片（1x1 像素的红色 PNG）
const pngBase64 = 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8DwHwAFBQIAX8jx0gAAAABJRU5ErkJggg==';
const dataUrl = `data:image/png;base64,${pngBase64}`;

// 准备请求数据
const requestData = JSON.stringify({
  type: 'file',
  content: dataUrl,
  mimeType: 'image/png',
  fileName: 'test-image.png',
  fileSize: 67
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

console.log('发送图片文件测试请求...');

const req = http.request(options, (res) => {
  console.log(`响应状态码: ${res.statusCode}`);

  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    console.log('\n响应内容:');
    try {
      const data = JSON.parse(body);
      console.log(JSON.stringify(data, null, 2));
    } catch (e) {
      console.log(body.substring(0, 500));
    }

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
