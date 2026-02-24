---
name: "evomap-asset-management"
description: "EvoMap 资产管理 SKILL，用于连接 EvoMap 获取和应用 Gene（基因）和 Capsule（胶囊）资产"
author: "OpenClaw Team"
version: "1.0.0"
category: "system"
platforms: ["windows", "linux"]
requires: []
config:
  - key: "EVOMAP_API_URL"
    value: "https://evomap.ai"
    description: "EvoMap API 地址"
  - key: "ASSET_STORAGE_PATH"
    value: "./assets"
    description: "资产存储路径"

# EvoMap 资产管理 SKILL

## 功能
- 连接 EvoMap 获取 Gene（基因）和 Capsule（胶囊）资产
- 自动应用资产到项目中
- 资产版本管理和监控
- 智能匹配和推荐资产

## 使用场景
- 项目初始化时自动加载最佳实践资产
- CI/CD 流程中集成资产验证
- 跨项目共享和复用解决方案
- 基于项目类型自动匹配合适的资产

## 核心组件
### 1. 资产获取和分析
- 连接 EvoMap API 获取最新资产
- 分析资产结构和适用场景
- 评估资产质量和可靠性

### 2. 智能匹配和应用
- 基于项目类型和需求匹配资产
- 自动应用资产到项目中
- 处理资产依赖关系

### 3. 验证和监控
- 验证资产应用效果
- 监控资产使用情况
- 提供资产使用报告

## 配置
### 环境变量
- `EVOMAP_API_URL`: EvoMap API 地址
- `ASSET_STORAGE_PATH`: 资产存储路径
- `ASSET_AUTO_APPLY`: 是否自动应用资产（true/false）

### 配置文件
```json
{
  "evomap": {
    "apiUrl": "https://evomap.ai",
    "timeout": 30000
  },
  "assets": {
    "storagePath": "./assets",
    "autoApply": true,
    "versionControl": true
  },
  "monitoring": {
    "enabled": true,
    "interval": 3600000
  }
}
```

## 使用示例
### 1. 手动获取资产
```bash
# 获取最新资产
evomap assets fetch

# 查看可用资产
evomap assets list

# 应用特定资产
evomap assets apply --id <asset-id>
```

### 2. 集成到 CI/CD
```yaml
# .github/workflows/evomap-assets.yml
name: EvoMap Assets Integration

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  apply-assets:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '16'
      - name: Install dependencies
        run: npm install
      - name: Fetch and apply EvoMap assets
        run: npx evomap assets apply
```

### 3. 自动应用配置
```javascript
// auto-apply-assets.js
const { EvoMapClient } = require('./evomap-client');

async function autoApplyAssets() {
  const client = new EvoMapClient();
  
  // 获取最新资产
  const assets = await client.fetchAssets();
  
  // 智能匹配资产
  const matchedAssets = await client.matchAssets({ projectType: 'web', techStack: ['react', 'nodejs'] });
  
  // 应用匹配的资产
  for (const asset of matchedAssets) {
    await client.applyAsset(asset.id);
  }
  
  console.log('Assets applied successfully!');
}

autoApplyAssets().catch(console.error);
```

## 安全
- 资产来源验证
- 资产内容安全扫描
- 权限控制和访问管理

## 监控
- 资产使用统计
- 应用效果评估
- 异常情况告警

## 维护
- 定期更新资产库
- 优化资产匹配算法
- 修复已知问题和漏洞