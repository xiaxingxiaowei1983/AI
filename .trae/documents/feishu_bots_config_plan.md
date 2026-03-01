# 飞书双机器人配置实施方案

## 项目概述
为支持两个飞书机器人的配置，需要修改飞书技能库的配置系统，使其能够管理多个机器人实例。

## 任务分解

### [x] 任务 1: 创建主环境变量文件
- **Priority**: P0
- **Depends On**: None
- **Description**:
  - 在项目根目录创建 `.env` 文件
  - 配置主要飞书机器人的环境变量
- **Success Criteria**:
  - 根目录存在 `.env` 文件
  - 文件包含正确的飞书机器人配置
- **Test Requirements**:
  - `programmatic` TR-1.1: 验证 `.env` 文件存在且格式正确 ✅
  - `programmatic` TR-1.2: 验证环境变量值与用户提供的一致 ✅

### [x] 任务 2: 创建飞书机器人配置文件
- **Priority**: P0
- **Depends On**: Task 1
- **Description**:
  - 在 `skills/feishu-skills` 目录创建 `feishu-bots-config.json`
  - 配置两个机器人的详细信息
- **Success Criteria**:
  - 配置文件存在且包含两个机器人的完整配置
  - 配置格式正确，包含所有必要字段
- **Test Requirements**:
  - `programmatic` TR-2.1: 验证配置文件存在且格式正确 ✅
  - `programmatic` TR-2.2: 验证两个机器人的配置信息完整 ✅

### [x] 任务 3: 修改 feishu-common 模块支持多机器人
- **Priority**: P0
- **Depends On**: Task 2
- **Description**:
  - 修改 `feishu-common/index.js` 以支持多机器人配置
  - 添加机器人选择机制
  - 保持向后兼容性
- **Success Criteria**:
  - 模块能够读取多机器人配置
  - 能够根据参数选择不同的机器人
  - 原有功能保持不变
- **Test Requirements**:
  - `programmatic` TR-3.1: 验证模块能正确读取配置文件 ✅
  - `programmatic` TR-3.2: 验证能够选择不同的机器人 ✅
  - `human-judgement` TR-3.3: 代码修改保持清晰可维护 ✅

### [x] 任务 4: 更新技能模块使用多机器人配置
- **Priority**: P1
- **Depends On**: Task 3
- **Description**:
  - 更新主要技能模块以支持指定机器人
  - 确保所有技能都能使用新的配置系统
- **Success Criteria**:
  - 主要技能模块能够接受机器人参数
  - 技能能够正确使用指定的机器人配置
- **Test Requirements**:
  - `programmatic` TR-4.1: 验证技能模块能接受机器人参数 ✅
  - `programmatic` TR-4.2: 验证技能能使用指定机器人发送消息 ✅

### [x] 任务 5: 测试双机器人功能
- **Priority**: P1
- **Depends On**: Task 4
- **Description**:
  - 测试两个机器人的配置是否正确
  - 验证技能能够使用不同的机器人
  - 测试消息发送功能
- **Success Criteria**:
  - 两个机器人都能正常获取 token
  - 技能能够使用指定机器人发送消息
  - 系统能够区分不同的机器人
- **Test Requirements**:
  - `programmatic` TR-5.1: 验证两个机器人都能获取 token ✅
  - `programmatic` TR-5.2: 验证技能能使用不同机器人发送消息 ✅
  - `human-judgement` TR-5.3: 测试流程顺畅，无错误 ✅

## 技术方案

### 环境变量配置
- **主机器人**：使用默认的 `FEISHU_APP_ID` 和 `FEISHU_APP_SECRET`
- **COO机器人**：使用 `FEISHU_COO_APP_ID` 和 `FEISHU_COO_APP_SECRET`

### 配置文件结构
```json
{
  "bots": {
    "main": {
      "appId": "cli_a91012cd0ab89bc9",
      "appSecret": "W2dl8mRwy7ArghhqZSp9heG8i3I2FVP5",
      "description": "主机器人"
    },
    "coo": {
      "appId": "cli_a9107e4a38f8dbb3",
      "appSecret": "H3RyukUiKIKxhcBiMeNvYckqjyzmOTy5",
      "description": "COO机器人"
    }
  },
  "default": "main"
}
```

### 代码修改方案
1. **feishu-common/index.js**：
   - 读取配置文件
   - 添加机器人选择参数
   - 支持不同机器人的 token 缓存

2. **技能模块**：
   - 添加 `--bot` 参数
   - 传递机器人参数给 feishu-common

## 风险评估
- **风险 1**：配置文件读取失败
  - 缓解：添加配置文件不存在时的 fallback 机制
- **风险 2**：token 缓存冲突
  - 缓解：为不同机器人使用不同的缓存文件
- **风险 3**：现有技能不兼容
  - 缓解：保持默认行为不变，只在指定时使用新功能

## 预期成果
- 支持两个飞书机器人的配置和使用
- 保持现有技能的兼容性
- 提供清晰的机器人选择机制
- 所有功能测试通过