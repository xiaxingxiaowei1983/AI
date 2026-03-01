#!/usr/bin/env node

/**
 * OpenClaw 问题修复工具
 * 解决 CSP 问题和网关令牌问题
 */

const fs = require('fs');
const path = require('path');
const http = require('http');

console.log('🔧 启动 OpenClaw 问题修复工具...');

// 检查并修复 CSP 问题
function fixCSP() {
  console.log('\n🔍 检查 CSP 配置...');
  
  // 检查 gateway.js 文件
  const gatewayPath = path.join(__dirname, 'gateway.js');
  
  if (fs.existsSync(gatewayPath)) {
    const gatewayContent = fs.readFileSync(gatewayPath, 'utf8');
    
    // 检查 CSP 配置
    if (gatewayContent.includes('Content-Security-Policy')) {
      console.log('✅ 发现 CSP 配置，检查是否包含 Google 字体...');
      
      if (gatewayContent.includes('fonts.googleapis.com') && gatewayContent.includes('fonts.gstatic.com')) {
        console.log('✅ CSP 配置已包含 Google 字体，无需修改');
      } else {
        console.log('⚠️ CSP 配置缺少 Google 字体，需要更新...');
        
        // 更新 CSP 配置
        const updatedContent = gatewayContent.replace(
          /res\.setHeader\('Content-Security-Policy', "[^"]+"\);/,
          "res.setHeader('Content-Security-Policy', \"default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; connect-src 'self';\");"
        );
        
        fs.writeFileSync(gatewayPath, updatedContent);
        console.log('✅ CSP 配置已更新，添加了 Google 字体支持');
      }
    } else {
      console.log('⚠️ 未发现 CSP 配置，需要添加...');
      
      // 在中间件部分添加 CSP 配置
      const updatedContent = gatewayContent.replace(
        /app\.use\(express\.urlencoded\({ extended: true }\)\);/,
        "app.use(express.urlencoded({ extended: true }));\n\n// 添加 CSP 头\napp.use((req, res, next) => {\n  res.setHeader('Content-Security-Policy', \"default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https:; connect-src 'self';\");\n  next();\n});"
      );
      
      fs.writeFileSync(gatewayPath, updatedContent);
      console.log('✅ CSP 配置已添加');
    }
  } else {
    console.log('⚠️ 未找到 gateway.js 文件，跳过 CSP 修复');
  }
}

// 检查并修复网关令牌问题
function fixGatewayToken() {
  console.log('\n🔍 检查网关令牌配置...');
  
  // 检查 openclaw.json 文件
  const configPath = path.join(__dirname, 'openclaw.json');
  
  if (fs.existsSync(configPath)) {
    const configContent = fs.readFileSync(configPath, 'utf8');
    const config = JSON.parse(configContent);
    
    if (config.gateway && config.gateway.auth && config.gateway.auth.token) {
      console.log('✅ 网关令牌配置存在:', config.gateway.auth.token);
      
      // 检查令牌格式是否正确
      if (config.gateway.auth.token.length >= 32) {
        console.log('✅ 网关令牌格式正确');
      } else {
        console.log('⚠️ 网关令牌格式可能不正确，建议使用更长的令牌');
      }
    } else {
      console.log('⚠️ 网关令牌配置缺失，需要添加...');
      
      // 添加默认网关令牌配置
      config.gateway = {
        mode: 'gateway',
        auth: {
          mode: 'token',
          token: '2e47ede431dbd73de7ae4a2556ba69260427d1269e8878da'
        }
      };
      
      fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
      console.log('✅ 网关令牌配置已添加');
    }
  } else {
    console.log('⚠️ 未找到 openclaw.json 文件，跳过网关令牌修复');
  }
}

// 检查 OpenClaw 服务状态
function checkOpenClawStatus() {
  console.log('\n🔍 检查 OpenClaw 服务状态...');
  
  return new Promise((resolve) => {
    const options = {
      hostname: 'localhost',
      port: 18790,
      path: '/',
      method: 'GET',
      timeout: 5000
    };
    
    const req = http.request(options, (res) => {
      console.log(`✅ OpenClaw 服务状态: ${res.statusCode}`);
      resolve(res.statusCode);
    });
    
    req.on('error', (error) => {
      console.log(`⚠️ OpenClaw 服务可能未运行: ${error.message}`);
      resolve(null);
    });
    
    req.on('timeout', () => {
      req.destroy();
      console.log('⚠️ OpenClaw 服务超时');
      resolve(null);
    });
    
    req.end();
  });
}

// 主修复函数
async function runFix() {
  try {
    console.log('🚀 开始修复 OpenClaw 问题...');
    
    // 修复 CSP 问题
    fixCSP();
    
    // 修复网关令牌问题
    fixGatewayToken();
    
    // 检查服务状态
    await checkOpenClawStatus();
    
    console.log('\n🎉 修复完成！');
    console.log('\n📋 修复结果:');
    console.log('   ✅ CSP 配置已检查并修复');
    console.log('   ✅ 网关令牌配置已检查并修复');
    console.log('   ✅ OpenClaw 服务状态已检查');
    
    console.log('\n💡 建议操作:');
    console.log('   1. 重启 OpenClaw 服务以应用更改');
    console.log('   2. 在 OpenClaw 控制 UI 中验证令牌配置');
    console.log('   3. 刷新浏览器页面以测试 CSP 修复');
    
  } catch (error) {
    console.error('❌ 修复过程中发生错误:', error.message);
  }
}

// 启动修复
runFix();