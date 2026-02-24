# OPENCLAW+EVO 真实部署计划

## 1. 部署概述

### 1.1 部署目标
- 实现 OPENCLAW+EVO 系统的真实部署
- 配置小红书账号（251940568）实现真实发布
- 确保微信视频号和公众号的真实部署
- 建立完整的内容发布和监控体系

### 1.2 部署架构
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  EvoMap Evolution │────▶ OPENCLAW Core   │────▶ Social Media   │
│  System (Node.js)│     │ (Green Tea Agent)│     │ Platforms       │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                        ▲                        ▲
        │                        │                        │
        ▼                        ▼                        ▼
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│                 │     │                 │     │                 │
│  Task Manager   │     │  Auth Profiles  │     │  Real API Calls │
│                 │     │                 │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

## 2. 部署步骤

### 2.1 系统准备
1. **环境检查**
   - Node.js 14+ 环境
   - npm 6+ 包管理器
   - 网络连接正常
   - 防火墙配置允许 API 调用

2. **依赖安装**
   ```bash
   cd evomap-evolution
   npm install axios form-data
   ```

### 2.2 小红书部署配置

#### 2.2.1 账号配置
- **小红书账号**：251940568
- **认证方式**：需要配置认证信息
- **API 接入**：使用小红书开放平台 API

#### 2.2.2 配置文件修改
1. **创建认证配置文件**
   ```json
   {
     "xiaohongshu": {
       "accountId": "251940568",
       "appKey": "YOUR_APP_KEY",
       "appSecret": "YOUR_APP_SECRET",
       "accessToken": "YOUR_ACCESS_TOKEN",
       "refreshToken": "YOUR_REFRESH_TOKEN"
     }
   }
   ```

2. **修改 socialMediaPublisher.js**
   - 从模拟模式切换到真实 API 调用
   - 添加认证机制
   - 实现真实的发布逻辑

### 2.3 微信平台部署配置

#### 2.3.1 微信视频号
- **认证配置**：微信开放平台认证
- **API 接入**：使用微信视频号 API

#### 2.3.2 微信公众号
- **认证配置**：微信公众号认证
- **API 接入**：使用微信公众号 API

### 2.4 OPENCLAW 配置优化

#### 2.4.1 绿茶智能体配置
- **启用进化功能**：`evo.enable = true`
- **启用自动改进**：`evo.autoImprove = true`
- **启用连续模式**：`agent.continuousMode = true`

#### 2.4.2 技能配置
- 启用内容创作技能：`skills.contentCreation = true`
- 启用发布管理技能：`skills.publishingManagement = true`

## 3. 技术实现

### 3.1 socialMediaPublisher.js 改造

#### 3.1.1 核心修改
```javascript
// 改造前（模拟模式）
async publishToXiaohongshu(content) {
  // 模拟小红书API调用
  this.log('info', '生成小红书图文内容');
  // 生成符合小红书风格的内容
  const xiaohongshuContent = this.generateXiaohongshuContent(content);
  // 模拟发布过程
  await this.sleep(2000);
  // 模拟发布结果
  const publishResult = {
    id: `xhs_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    platform: 'xiaohongshu',
    title: xiaohongshuContent.title,
    status: 'published',
    url: `https://www.xiaohongshu.com/discovery/item/${xiaohongshuContent.id}`,
    timestamp: new Date().toISOString()
  };
  // 保存发布记录
  this.savePublishRecord('xiaohongshu', publishResult);
  return publishResult;
}

// 改造后（真实模式）
async publishToXiaohongshu(content) {
  this.log('info', '开始小红书真实发布');
  
  try {
    // 加载认证配置
    const authConfig = this.loadAuthConfig('xiaohongshu');
    
    // 生成符合小红书风格的内容
    const xiaohongshuContent = this.generateXiaohongshuContent(content);
    
    // 准备发布数据
    const publishData = {
      title: xiaohongshuContent.title,
      content: xiaohongshuContent.content,
      images: xiaohongshuContent.images,
      tags: xiaohongshuContent.tags
    };
    
    // 调用小红书 API
    const publishResult = await this.callXiaohongshuAPI('/content/publish', publishData, authConfig);
    
    // 保存发布记录
    this.savePublishRecord('xiaohongshu', publishResult);
    
    this.log('info', `小红书发布成功: ${publishResult.id}`);
    return publishResult;
  } catch (error) {
    this.log('error', `小红书发布失败: ${error.message}`);
    throw error;
  }
}
```

#### 3.1.2 API 调用实现
```javascript
async callXiaohongshuAPI(endpoint, data, authConfig) {
  const axios = require('axios');
  
  const client = axios.create({
    baseURL: 'https://open.xiaohongshu.com',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authConfig.accessToken}`
    }
  });
  
  const response = await client.post(endpoint, data);
  return response.data;
}
```

### 3.2 认证管理

#### 3.2.1 认证配置加载
```javascript
loadAuthConfig(platform) {
  try {
    const authPath = path.join(__dirname, '..', 'auth', `${platform}.json`);
    if (fs.existsSync(authPath)) {
      return JSON.parse(fs.readFileSync(authPath, 'utf8'));
    }
    
    // 尝试从绿茶智能体的认证配置加载
    const greenTeaAuthPath = path.join(__dirname, '..', '..', 'agents', 'green-tea', 'auth-profiles.json');
    if (fs.existsSync(greenTeaAuthPath)) {
      const authProfiles = JSON.parse(fs.readFileSync(greenTeaAuthPath, 'utf8'));
      return authProfiles[platform];
    }
  } catch (error) {
    this.log('error', `加载认证配置失败: ${error.message}`);
  }
  
  throw new Error(`未找到 ${platform} 的认证配置`);
}
```

## 4. 部署验证

### 4.1 测试步骤

1. **认证测试**
   ```bash
   node -e "const SocialMediaPublisher = require('./evomap-evolution/lib/socialMediaPublisher'); const publisher = new SocialMediaPublisher({}); publisher.testAuth('xiaohongshu').then(console.log).catch(console.error);"
   ```

2. **发布测试**
   ```bash
   node test-social-media-real.js
   ```

3. **集成测试**
   ```bash
   cd evomap-evolution
   node index.js
   ```

### 4.2 验证标准
- ✅ 小红书账号认证成功
- ✅ 小红书内容真实发布成功
- ✅ 微信视频号内容发布成功
- ✅ 微信公众号内容发布成功
- ✅ 系统运行稳定无错误
- ✅ 发布记录正确保存

## 5. 监控与维护

### 5.1 监控体系
- **日志监控**：系统运行日志
- **发布监控**：内容发布状态
- **API 监控**：API 调用成功率
- **性能监控**：系统响应时间

### 5.2 维护计划

#### 5.2.1 日常维护
- 检查认证令牌过期状态
- 监控发布成功率
- 分析发布效果数据

#### 5.2.2 定期维护
- 每周：系统性能评估
- 每月：认证信息更新
- 季度：系统架构优化

### 5.3 故障处理

| 故障类型 | 可能原因 | 解决方案 |
|---------|---------|--------|
| 认证失败 | 令牌过期 | 更新访问令牌 |
| 发布失败 | API 限制 | 检查 API 调用频率 |
| 系统错误 | 依赖问题 | 重新安装依赖 |
| 网络错误 | 连接问题 | 检查网络配置 |

## 6. 安全措施

### 6.1 认证安全
- 认证信息加密存储
- 令牌定期轮换
- 最小权限原则

### 6.2 数据安全
- 发布内容审核
- 敏感信息过滤
- 数据传输加密

### 6.3 系统安全
- 防火墙配置
- 访问控制
- 安全日志记录

## 7. 部署时间计划

| 阶段 | 时间 | 任务 | 负责人 |
|------|------|------|--------|
| 准备阶段 | 1天 | 环境检查、依赖安装 | 系统管理员 |
| 配置阶段 | 1天 | 账号配置、API 接入 | 开发工程师 |
| 测试阶段 | 1天 | 功能测试、集成测试 | 测试工程师 |
| 部署阶段 | 0.5天 | 系统部署、监控配置 | 运维工程师 |
| 验证阶段 | 0.5天 | 发布验证、效果评估 | 产品经理 |

## 8. 风险评估

### 8.1 潜在风险
1. **API 限制**：社交媒体平台 API 调用限制
2. **认证失效**：认证令牌过期导致发布失败
3. **内容审核**：发布内容被平台审核拒绝
4. **网络问题**：网络不稳定影响发布成功率

### 8.2 风险缓解
1. **API 限制**：实现请求节流、错误重试机制
2. **认证失效**：自动令牌刷新、监控提醒
3. **内容审核**：建立内容审核流程、敏感词过滤
4. **网络问题**：实现断点续传、状态恢复机制

## 9. 成功标准

### 9.1 功能标准
- ✅ 小红书账号（251940568）真实发布成功
- ✅ 微信视频号真实发布成功
- ✅ 微信公众号真实发布成功
- ✅ 系统稳定运行 7 天以上
- ✅ 发布成功率 ≥ 95%

### 9.2 性能标准
- 系统启动时间 ≤ 30秒
- 发布响应时间 ≤ 5秒
- 内存占用 ≤ 200MB
- CPU 使用率 ≤ 30%

## 10. 后续优化

### 10.1 功能优化
- 增加内容自动生成能力
- 实现智能发布时间调度
- 建立内容效果分析系统

### 10.2 架构优化
- 微服务架构重构
- 负载均衡配置
- 多实例部署

### 10.3 扩展性
- 支持更多社交媒体平台
- 集成 AI 内容创作
- 建立开放 API 接口

---

**部署计划版本**: 1.0.0  
**创建时间**: 2026-02-24  
**部署负责人**: 绿茶智能体  
**审核状态**: 待审核
