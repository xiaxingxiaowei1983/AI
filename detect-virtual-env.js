const os = require('os');
const fs = require('fs');
const { execSync } = require('child_process');

console.log('🔍 检测虚拟环境...\n');

// 1. 检查环境变量
console.log('📋 环境变量检查:');
const envVars = process.env;
const virtualEnvIndicators = {
  'VIRTUAL_ENV': envVars.VIRTUAL_ENV,
  'CONDA_PREFIX': envVars.CONDA_PREFIX,
  'CONDA_DEFAULT_ENV': envVars.CONDA_DEFAULT_ENV,
  'VIRTUAL_ENV_PROMPT': envVars.VIRTUAL_ENV_PROMPT,
  'PYENV_VIRTUAL_ENV': envVars.PYENV_VIRTUAL_ENV,
  'TERM': envVars.TERM,
  'SSH_TTY': envVars.SSH_TTY
};

Object.entries(virtualEnvIndicators).forEach(([key, value]) => {
  const status = value ? '✅ 存在' : '❌ 不存在';
  console.log(`  ${key}: ${status}`);
  if (value) {
    console.log(`    值: ${value}`);
  }
});

// 2. 检查文件系统
console.log('\n📁 文件系统检查:');
const systemPaths = [
  '/proc',
  '/sys',
  '/dev',
  '/.dockerenv',
  '/.dockerinit',
  '/vagrant',
  '/.vagrant'
];

systemPaths.forEach(path => {
  const exists = fs.existsSync(path);
  const status = exists ? '✅ 存在' : '❌ 不存在';
  console.log(`  ${path}: ${status}`);
});

// 3. 检查系统信息
console.log('\n💻 系统信息检查:');
const platform = os.platform();
const arch = os.arch();
const hostname = os.hostname();
const cpus = os.cpus();
const totalmem = os.totalmem();
const freemem = os.freemem();

console.log(`  平台: ${platform}`);
console.log(`  架构: ${arch}`);
console.log(`  主机名: ${hostname}`);
console.log(`  CPU 数量: ${cpus.length}`);
console.log(`  CPU 型号: ${cpus[0].model}`);
console.log(`  总内存: ${(totalmem / 1024 / 1024 / 1024).toFixed(2)} GB`);
console.log(`  可用内存: ${(freemem / 1024 / 1024 / 1024).toFixed(2)} GB`);

// 4. 检查网络接口
console.log('\n🌐 网络接口检查:');
const networkInterfaces = os.networkInterfaces();
Object.entries(networkInterfaces).forEach(([iface, addresses]) => {
  console.log(`  ${iface}:`);
  addresses.forEach(addr => {
    if (addr.family === 'IPv4') {
      console.log(`    IPv4: ${addr.address}`);
    } else if (addr.family === 'IPv6') {
      console.log(`    IPv6: ${addr.address}`);
    }
  });
});

// 5. 检查进程信息
console.log('\n🔄 进程信息检查:');
const pid = process.pid;
const ppid = process.ppid;
const execPath = process.execPath;
const cwd = process.cwd();

console.log(`  当前进程 PID: ${pid}`);
console.log(`  父进程 PID: ${ppid}`);
console.log(`  执行路径: ${execPath}`);
console.log(`  工作目录: ${cwd}`);

// 6. 检查容器特征
console.log('\n🐳 容器特征检查:');
const containerIndicators = {
  cgroup: fs.existsSync('/proc/self/cgroup'),
  dockerenv: fs.existsSync('/.dockerenv'),
  dockerinit: fs.existsSync('/.dockerinit'),
  kubepod: fs.existsSync('/var/run/secrets/kubernetes.io/serviceaccount')
};

Object.entries(containerIndicators).forEach(([key, exists]) => {
  const status = exists ? '⚠️ 可能是容器' : '✅ 非容器';
  console.log(`  ${key}: ${status}`);
});

// 7. 综合判断
console.log('\n🎯 综合判断:');

let virtualScore = 0;
let virtualReasons = [];

// 环境变量检测
if (envVars.VIRTUAL_ENV || envVars.CONDA_PREFIX) {
  virtualScore += 2;
  virtualReasons.push('检测到 Python 虚拟环境');
}

// 文件系统检测
if (fs.existsSync('/proc') || fs.existsSync('/sys')) {
  virtualScore += 1;
  virtualReasons.push('检测到 Linux 系统文件');
}

// 容器检测
if (containerIndicators.cgroup || containerIndicators.dockerenv) {
  virtualScore += 3;
  virtualReasons.push('检测到容器环境');
}

// 主机名检测
if (hostname.includes('docker') || hostname.includes('container') || hostname.includes('vm')) {
  virtualScore += 2;
  virtualReasons.push('主机名包含虚拟化关键词');
}

// CPU 检测
if (cpus[0].model.includes('QEMU') || cpus[0].model.includes('Virtual')) {
  virtualScore += 2;
  virtualReasons.push('CPU 型号包含虚拟化标识');
}

// 网络接口检测
const hasVirtualNetwork = Object.values(networkInterfaces).some(addresses => 
  addresses.some(addr => addr.address && (addr.address.startsWith('172.17.') || addr.address.startsWith('192.168.')))
);
if (hasVirtualNetwork) {
  virtualScore += 1;
  virtualReasons.push('检测到虚拟网络地址');
}

// 最终判断
console.log(`  虚拟化评分: ${virtualScore}/10`);

if (virtualScore >= 5) {
  console.log('  🚨 判断结果: 高概率为虚拟环境');
  console.log(`  📝 原因: ${virtualReasons.join(', ')}`);
} else if (virtualScore >= 3) {
  console.log('  ⚠️ 判断结果: 可能为虚拟环境');
  console.log(`  📝 原因: ${virtualReasons.join(', ')}`);
} else {
  console.log('  ✅ 判断结果: 物理机环境');
}

console.log('\n📊 详细分析:');
console.log(`  Windows 平台: ${platform === 'win32' ? '通常为物理机或虚拟机' : '需要进一步检测'}`);
console.log(`  虚拟化特征: ${virtualScore > 0 ? '存在' : '不存在'}`);
console.log(`  置信度: ${virtualScore < 3 ? '高' : virtualScore < 5 ? '中' : '低'}`);
