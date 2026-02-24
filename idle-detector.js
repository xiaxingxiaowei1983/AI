// 空闲时间检测系统
// 当系统空闲超过5分钟时自动启动进化过程

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

class IdleDetector {
  constructor() {
    this.idleThreshold = 5 * 60 * 1000; // 5分钟空闲阈值
    this.checkInterval = 30 * 1000; // 30秒检查一次
    this.lastActivityTime = Date.now();
    this.isMonitoring = false;
    this.monitorInterval = null;
    this.evolutionScriptPath = path.join(__dirname, 'start.js');
    this.configPath = path.join(__dirname, 'idle-detector-config.json');
    this.loadConfig();
  }

  // 加载配置
  loadConfig() {
    if (fs.existsSync(this.configPath)) {
      try {
        const config = JSON.parse(fs.readFileSync(this.configPath, 'utf8'));
        this.idleThreshold = config.idleThreshold || this.idleThreshold;
        this.checkInterval = config.checkInterval || this.checkInterval;
        this.evolutionScriptPath = config.evolutionScriptPath || this.evolutionScriptPath;
      } catch (error) {
        console.error('加载配置失败:', error.message);
      }
    }
  }

  // 保存配置
  saveConfig() {
    const config = {
      idleThreshold: this.idleThreshold,
      checkInterval: this.checkInterval,
      evolutionScriptPath: this.evolutionScriptPath
    };
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2));
  }

  // 检测系统空闲状态
  detectIdle() {
    try {
      // 在Windows上使用GetLastInputInfo API检测空闲时间
      // 使用PowerShell命令获取上次输入时间
      const powershellCommand = `
      $signature = @"
      [DllImport("user32.dll")]
      public static extern bool GetLastInputInfo([In, Out] LASTINPUTINFO plii);
      [StructLayout(LayoutKind.Sequential)]
      public struct LASTINPUTINFO
      {
          public uint cbSize;
          public uint dwTime;
      }
      "@
      
      Add-Type -MemberDefinition $signature -Name 'Win32' -Namespace 'User32'
      $lastInputInfo = New-Object User32.Win32+LASTINPUTINFO
      $lastInputInfo.cbSize = [System.Runtime.InteropServices.Marshal]::SizeOf($lastInputInfo)
      $result = [User32.Win32]::GetLastInputInfo([ref]$lastInputInfo)
      
      if ($result)
      {
          $idleTime = (Get-Date).ToFileTime() - $lastInputInfo.dwTime
          $idleTimeMs = [Math]::Floor($idleTime / 10000)
          $idleTimeMs
      } else {
          0
      }
      `;

      const idleTimeMs = parseInt(execSync(`powershell -Command "${powershellCommand}"`, { encoding: 'utf8' }).trim());
      return idleTimeMs;
    } catch (error) {
      console.error('检测空闲时间失败:', error.message);
      // 如果检测失败，返回一个默认值（假设系统处于活跃状态）
      return 0;
    }
  }

  // 启动进化过程
  async startEvolution() {
    console.log('=== 检测到系统空闲，启动进化过程 ===');
    console.log('当前时间:', new Date().toISOString());
    console.log('空闲时间:', Math.floor(this.detectIdle() / 1000 / 60), '分钟');

    try {
      // 检查进化脚本是否存在
      if (!fs.existsSync(this.evolutionScriptPath)) {
        console.error('进化脚本不存在:', this.evolutionScriptPath);
        return false;
      }

      // 执行进化脚本
      console.log('执行进化脚本:', this.evolutionScriptPath);
      
      // 使用child_process.spawn执行脚本，避免阻塞
      const { spawn } = require('child_process');
      const evolutionProcess = spawn('node', [this.evolutionScriptPath], {
        detached: true,
        stdio: 'ignore'
      });

      evolutionProcess.unref();
      console.log('进化过程已启动');
      return true;
    } catch (error) {
      console.error('启动进化过程失败:', error.message);
      return false;
    }
  }

  // 监控系统空闲状态
  startMonitoring() {
    if (this.isMonitoring) {
      console.log('监控已启动');
      return;
    }

    console.log('=== 启动空闲时间检测 ===');
    console.log('空闲阈值:', Math.floor(this.idleThreshold / 1000 / 60), '分钟');
    console.log('检查间隔:', Math.floor(this.checkInterval / 1000), '秒');
    console.log('进化脚本:', this.evolutionScriptPath);

    this.isMonitoring = true;
    this.lastActivityTime = Date.now();

    this.monitorInterval = setInterval(() => {
      try {
        const idleTimeMs = this.detectIdle();
        console.log('当前空闲时间:', Math.floor(idleTimeMs / 1000 / 60), '分钟');

        // 检查是否超过空闲阈值
        if (idleTimeMs >= this.idleThreshold) {
          console.log('⚠️  系统空闲时间超过阈值');
          this.startEvolution();
          // 重置最后活动时间，避免重复触发
          this.lastActivityTime = Date.now();
        }
      } catch (error) {
        console.error('监控过程中发生错误:', error.message);
      }
    }, this.checkInterval);

    console.log('✅ 空闲时间检测已启动');
    console.log('系统将在空闲超过5分钟时自动启动进化过程');
  }

  // 停止监控
  stopMonitoring() {
    if (!this.isMonitoring) {
      console.log('监控未启动');
      return;
    }

    clearInterval(this.monitorInterval);
    this.isMonitoring = false;
    console.log('✅ 空闲时间检测已停止');
  }

  // 获取当前状态
  getStatus() {
    return {
      isMonitoring: this.isMonitoring,
      idleThreshold: this.idleThreshold,
      checkInterval: this.checkInterval,
      lastActivityTime: this.lastActivityTime,
      currentIdleTime: this.detectIdle()
    };
  }

  // 手动触发进化过程
  async triggerEvolution() {
    return this.startEvolution();
  }
}

// 如果直接运行此文件
if (require.main === module) {
  async function main() {
    const idleDetector = new IdleDetector();
    idleDetector.startMonitoring();

    console.log('\n✅ 空闲时间检测系统启动成功');
    console.log('📊 系统将每30秒检查一次空闲状态');
    console.log('⏰ 当空闲超过5分钟时自动启动进化过程');
    console.log('\n按 Ctrl+C 停止监控');

    // 保持进程运行
    process.stdin.resume();
  }

  main().catch(error => {
    console.error('❌ 启动空闲检测系统失败:', error.message);
    process.exit(1);
  });
}

module.exports = IdleDetector;