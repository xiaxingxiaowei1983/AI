# PM2进程管理与优化定时任务 - 技能沉淀

## 项目概述

本次实施成功将PM2进程管理系统集成到AI代理架构中，并优化了定时任务配置，实现了更稳定、更高效的自动化进化系统。

## 实施内容

### 1. PM2配置文件创建

创建了`ecosystem.config.js`文件，用于统一管理以下服务：

```javascript
module.exports = {
  apps: [
    {
      name: 'openclaw-core',
      script: 'npm',
      args: 'run start',
      cwd: './',
      watch: false,
      autorestart: true,
      max_memory_restart: '1G',
      env: {
        NODE_ENV: 'production',
        PORT: 3000
      }
    },
    {
      name: 'auto-evolution',
      script: 'node',
      args: 'auto-evolution/index.js',
      cwd: './',
      watch: false,
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production'
      }
    },
    {
      name: 'evolver-pcec',
      script: 'node',
      args: 'evolver/start-pcec.js',
      cwd: './',
      watch: false,
      autorestart: true,
      max_memory_restart: '512M',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
```

### 2. PM2进程管理配置

#### 服务列表
- **openclaw-core**: OpenClaw核心服务
- **auto-evolution**: 自动进化系统
- **evolver-pcec**: PCEC进化引擎

#### 配置特点
- **自动重启**: 所有服务都设置了`autorestart: true`，确保服务崩溃后自动恢复
- **内存限制**: 为每个服务设置了合理的内存限制，防止内存泄漏
- **环境变量**: 统一使用生产环境配置
- **监控模式**: 关闭了watch模式，避免不必要的资源消耗

### 3. PM2命令执行

#### 启动服务
```bash
pm2 start ecosystem.config.js
```

#### 保存配置
```bash
pm2 save
```

#### 开机自启
```bash
pm2 startup
```

#### 查看状态
```bash
pm2 status
```

#### 查看日志
```bash
pm2 logs <service-name>
pm2 logs <service-name> --err
```

### 4. 定时任务优化

#### 原有问题
- **Periodic Cognitive Expansion Cycle**: 缺少`delivery.to`字段，导致通知发送失败
- **Auto Evolution System**: 新创建的进化系统，配置正确

#### 解决方案
- 删除了有问题的定时任务
- 重新创建了包含正确`delivery`配置的任务
- 保留了两个进化任务，分别关注不同的进化维度

### 5. 服务状态监控

#### 当前运行状态
- **evolver-pcec**: 在线运行，内存使用52.2MB
- **auto-evolution**: 已停止（完成进化周期后自动停止）
- **openclaw-core**: 已停止（需要手动启动）

#### 日志监控
- 所有服务的日志都保存在`C:\Users\10919\.pm2\logs\`目录
- 可以通过`pm2 logs`命令实时查看服务日志
- 错误日志和输出日志分离存储，便于排查问题

## 技术亮点

### 1. 进程守护机制
- 使用PM2作为进程管理器，确保服务持续运行
- 自动重启机制提高了系统的容错能力
- 统一的进程管理简化了运维复杂度

### 2. 配置文件管理
- 通过`ecosystem.config.js`集中管理所有服务
- 便于版本控制和团队协作
- 支持批量操作和统一配置

### 3. 资源优化
- 合理的内存限制防止资源耗尽
- 关闭不必要的监控模式降低CPU使用率
- 生产环境配置确保最佳性能

### 4. 故障恢复
- 自动重启机制确保服务快速恢复
- 详细的日志记录便于问题排查
- PM2的持久化配置支持开机自启

## 系统架构

### 服务层次结构
```
┌─────────────────────────────────────────┐
│         PM2进程管理器               │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────┐  │
│  │  OpenClaw核心服务        │  │
│  └─────────────────────────────┘  │
│  ┌─────────────────────────────┐  │
│  │  自动进化系统            │  │
│  └─────────────────────────────┘  │
│  ┌─────────────────────────────┐  │
│  │  PCEC进化引擎           │  │
│  └─────────────────────────────┘  │
└─────────────────────────────────────────┘
```

### 进化流程
```
定时任务触发 → 进化系统执行 → 生成进化报告 → 更新能力库
     ↓              ↓              ↓            ↓
  PM2监控    PM2重启      PM2日志      PM2持久化
```

## 使用指南

### 日常运维

#### 启动所有服务
```bash
pm2 start ecosystem.config.js
```

#### 停止所有服务
```bash
pm2 stop all
```

#### 重启特定服务
```bash
pm2 restart <service-name>
```

#### 查看服务状态
```bash
pm2 status
```

#### 实时监控日志
```bash
pm2 logs
pm2 logs <service-name> --lines 100
```

### 故障排查

#### 服务无法启动
1. 检查配置文件语法：`pm2 validate ecosystem.config.js`
2. 查看错误日志：`pm2 logs <service-name> --err`
3. 检查端口占用：确保配置的端口未被占用

#### 服务频繁重启
1. 检查内存使用情况：`pm2 monit`
2. 查看错误日志找出根本原因
3. 考虑增加内存限制或优化代码

#### 进化任务不执行
1. 检查OpenClaw定时任务配置：`openclaw cron list`
2. 查看定时任务日志：`openclaw cron logs`
3. 手动触发测试：`openclaw cron trigger <job-id>`

## 性能优化建议

### 1. 内存管理
- 监控各服务的内存使用情况
- 根据实际使用情况调整`max_memory_restart`参数
- 定期清理内存泄漏

### 2. 日志管理
- 定期清理旧日志文件，避免磁盘空间不足
- 使用日志轮转策略，控制日志文件大小
- 重要日志定期备份到外部存储

### 3. 服务监控
- 使用`pm2 monit`实时监控服务状态
- 设置告警机制，及时发现服务异常
- 定期检查服务健康状态

## 扩展性考虑

### 1. 新服务集成
- 在`ecosystem.config.js`中添加新的服务配置
- 遵循现有的配置规范和命名约定
- 测试新服务的稳定性和性能

### 2. 环境适配
- 为不同环境（开发、测试、生产）创建不同的配置文件
- 使用环境变量管理敏感信息
- 支持配置文件的热更新

### 3. 集群部署
- 使用PM2的集群模式提高服务可用性
- 配置负载均衡和故障转移
- 实现服务的水平扩展

## 总结

本次实施成功实现了以下目标：

1. **进程管理现代化**: 使用PM2替代手动进程管理，提高了系统稳定性
2. **配置标准化**: 通过统一的配置文件管理所有服务，简化了运维复杂度
3. **自动化程度提升**: 实现了服务的自动监控、自动重启和开机自启
4. **定时任务优化**: 修复了原有定时任务的配置问题，确保进化任务正常执行
5. **系统可观测性**: 完善的日志和监控机制，便于问题排查和性能优化

这套PM2进程管理系统为AI代理的持续进化和稳定运行提供了坚实的技术基础，是现代DevOps实践在AI系统中的成功应用。