# EvoMap 集成计划 - 获取 Gene 和 Capsule

## 项目概述

本计划旨在通过 Evolver 客户端链接 EvoMap 网络，获取共享的 Gene（基因）和 Capsule（胶囊），实现 AI Agent 之间的经验共享和能力进化。

## 任务分解和优先级

### [x] 任务 1：安装 Evolver 客户端
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 从 GitHub 克隆 Evolver 仓库
  - 安装依赖包
- **成功标准**:
  - Evolver 客户端安装成功
  - 依赖包安装完成
- **测试要求**:
  - `programmatic` TR-1.1: 执行 `npm install` 无错误
  - `programmatic` TR-1.2: 目录结构包含必要文件
- **备注**: 需要 Node.js >= 18 和 Git

### [x] 任务 2：注册节点到 EvoMap 网络
- **优先级**: P0
- **依赖**: 任务 1
- **描述**:
  - 运行注册命令获取 claim code
  - 访问绑定 URL 完成账户关联
  - 验证节点状态
- **成功标准**:
  - 节点成功注册到 EvoMap
  - 获得有效的 claim code
  - 节点状态验证成功
- **测试要求**:
  - `programmatic` TR-2.1: 执行 `node index.js hello` 获得 claim code
  - `programmatic` TR-2.2: 执行 `node index.js stats` 验证节点状态
- **备注**: 需要互联网访问 evomap.ai

### [x] 任务 3：获取 Gene 和 Capsule
- **优先级**: P0
- **依赖**: 任务 2
- **描述**:
  - 执行 fetch 命令获取胶囊
  - 验证获取的 Gene 和 Capsule 信息
- **成功标准**:
  - 成功获取 Capsule
  - 验证 Gene 信息完整性
- **测试要求**:
  - `programmatic` TR-3.1: 执行 `node index.js fetch` 成功
  - `programmatic` TR-3.2: 验证获取的 Capsule 信息
- **备注**: 参考 Green Tea 胶囊示例

### [x] 任务 4：验证集成效果
- **优先级**: P1
- **依赖**: 任务 3
- **描述**:
  - 测试获取的能力是否可用
  - 验证 Gene 和 Capsule 的实际应用
- **成功标准**:
  - 能力测试成功
  - 经验共享机制验证
- **测试要求**:
  - `programmatic` TR-4.1: 执行能力测试命令
  - `human-judgement` TR-4.2: 评估能力提升效果
- **备注**: 可选择安装 Green Tea 相关技能进行测试





### [ ] 任务 4：验证集成效果
- **优先级**: P1
- **依赖**: 任务 3
- **描述**:
  - 测试获取的能力是否可用
  - 验证 Gene 和 Capsule 的实际应用
- **成功标准**:
  - 能力测试成功
  - 经验共享机制验证
- **测试要求**:
  - `programmatic` TR-4.1: 执行能力测试命令
  - `human-judgement` TR-4.2: 评估能力提升效果
- **备注**: 可选择安装 Green Tea 相关技能进行测试

## 技术要求

- **硬件**: 互联网连接
- **软件**:
  - Node.js >= 18
  - Git
  - npm
- **网络**: 访问 github.com 和 evomap.ai

## 风险评估

1. **网络连接问题**: 确保稳定的互联网连接
2. **依赖安装失败**: 检查 npm 源和权限
3. **注册验证失败**: 确保浏览器可访问 evomap.ai
4. **胶囊获取失败**: 检查网络和 EvoMap 服务状态

## 成功指标

- [ ] Evolver 客户端安装成功
- [ ] 节点注册到 EvoMap 网络
- [ ] 成功获取 Gene 和 Capsule
- [ ] 验证能力共享机制
- [ ] 实现经验复用，减少重复探索

## 预期成果

通过本计划的实施，AI Agent 将能够：
1. 链接到 EvoMap 基因共享网络
2. 获取其他 Agent 共享的经验和能力
3. 避免重复踩坑，减少 token 消耗
4. 实现群体智能的协同进化
