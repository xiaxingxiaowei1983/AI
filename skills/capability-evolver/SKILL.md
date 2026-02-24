# capability-evolver 元技能

## 技能描述
专门用于记录、分析、抽象和孵化新能力的元技能，支持能力从发现到内生化的完整生命周期管理。

## 核心功能

### 1. 能力发现与识别
- 自动识别能力候选（重复操作、手动流程、可复用模式）
- 收集能力使用数据和反馈
- 分析能力使用频率和成功率
- 识别能力进化触发点

### 2. 能力抽象与建模
- 将具体操作抽象为能力轮廓
- 定义能力的输入、输出、不变量和可变参数
- 分析能力的失败点和边界条件
- 建立能力之间的关联关系

### 3. 能力内生化管理
- 制定能力内生化策略
- 选择合适的内生化方式（行为模式、高阶操作、优先解法）
- 跟踪能力内生化进度
- 评估内生化效果

### 4. 能力合并与升级
- 识别相似能力并进行合并
- 提炼更通用、更高层的能力
- 优化能力调用路径和成本
- 提升能力成功率和覆盖面

### 5. 能力生态系统管理
- 维护能力注册表和依赖图
- 监控能力使用情况和健康状态
- 提供能力推荐和应用建议
- 支持能力版本控制和回滚

## 技术架构

### 目录结构
```
capability-evolver/
├── SKILL.md              # 技能定义文件
├── capabilities/         # 能力存储目录
│   ├── capability-shapes.md          # 能力轮廓
│   ├── internalization-strategy.md   # 内生化策略
│   └── high-level-capabilities.md    # 高阶能力
├── data/                 # 数据存储
│   ├── usage-stats.json              # 使用统计
│   ├── capability-registry.json      # 能力注册表
│   └── evolution-history.json        # 进化历史
└── tools/                # 工具脚本
    ├── discover-capabilities.js      # 能力发现
    ├── abstract-capabilities.js      # 能力抽象
    ├── internalize-capabilities.js   # 能力内生化
    └── merge-capabilities.js         # 能力合并
```

## 工作流程

### 1. 能力发现
1. 监控用户操作和系统行为
2. 识别重复模式和可优化点
3. 标记能力候选并收集数据

### 2. 能力抽象
1. 分析能力候选的输入输出
2. 定义能力轮廓和边界
3. 评估能力的可复用性

### 3. 能力内生化
1. 制定内生化策略
2. 选择内生化方式
3. 实施内生化并验证效果

### 4. 能力进化
1. 定期评估能力表现
2. 识别能力合并机会
3. 提炼高阶能力
4. 优化能力生态系统

## 使用方法

### 命令行接口
```bash
# 发现新能力
npx capability-evolver discover

# 抽象能力
npx capability-evolver abstract <capability-id>

# 内生化能力
npx capability-evolver internalize <capability-id>

# 合并能力
npx capability-evolver merge <capability-id-1> <capability-id-2>

# 列出能力
npx capability-evolver list

# 评估能力
npx capability-evolver evaluate <capability-id>
```

### API接口
```javascript
// 导入能力进化器
const capabilityEvolver = require('capability-evolver');

// 发现新能力
const candidates = await capabilityEvolver.discover();

// 抽象能力
const capabilityShape = await capabilityEvolver.abstract(candidate);

// 内生化能力
const internalizedCapability = await capabilityEvolver.internalize(capabilityShape);

// 合并能力
const mergedCapability = await capabilityEvolver.merge(capability1, capability2);

// 评估能力
const evaluation = await capabilityEvolver.evaluate(capability);
```

## 集成方式

### 与其他技能集成
- 作为基础技能被其他技能调用
- 为其他技能提供能力管理功能
- 监控其他技能的使用情况

### 与系统集成
- 作为系统启动的默认技能
- 定期运行能力发现和评估
- 提供能力使用建议和优化

## 配置选项

### 基本配置
```json
{
  "enabled": true,
  "autoDiscover": true,
  "discoveryInterval": "1h",
  "evaluationInterval": "1d",
  "minUsageThreshold": 3,
  "successRateThreshold": 0.8
}
```

### 高级配置
```json
{
  "capabilityStorage": "./capabilities",
  "dataStorage": "./data",
  "toolsPath": "./tools",
  "maxCapabilityAge": "30d",
  "mergeSimilarityThreshold": 0.8,
  "evolutionStrategy": "aggressive" // aggressive, balanced, conservative
}
```

## 评估标准

### 能力质量评估
- **可复用性**：能力是否可以在不同场景中稳定复用
- **可靠性**：能力执行的成功率和稳定性
- **效率**：能力执行的速度和资源消耗
- **通用性**：能力覆盖的场景范围

### 进化效果评估
- **成功率提升**：进化后能力成功率的提升幅度
- **效率提升**：进化后能力执行时间的减少幅度
- **步骤减少**：进化后完成同类任务所需步骤的减少幅度
- **用户负担减轻**：进化后用户心智负担的减轻程度

## 最佳实践

### 能力发现
- 关注用户重复执行的操作
- 识别手动完成的流程
- 分析失败率高的操作
- 跟踪用户反馈和需求

### 能力抽象
- 保持能力轮廓简洁明了
- 明确能力的输入输出边界
- 考虑能力的可扩展性
- 分析能力的失败模式

### 能力内生化
- 选择合适的内生化方式
- 确保内生化不增加用户负担
- 提供能力回退机制
- 定期评估内生化效果

### 能力合并
- 优先合并高频使用的能力
- 提炼更通用的能力抽象
- 确保合并后的能力更稳定
- 优化能力调用路径

## 故障排除

### 常见问题
- **能力发现不及时**：调整发现间隔和阈值
- **能力抽象不准确**：增加更多样本数据
- **内生化效果不佳**：重新评估内生化策略
- **能力合并失败**：降低相似度阈值或手动干预

### 解决方案
- 检查能力数据收集是否正常
- 验证能力轮廓定义是否准确
- 评估内生化方式是否合适
- 分析能力依赖关系是否正确

## 版本历史

### v1.0.0
- 初始版本
- 实现核心功能：能力发现、抽象、内生化和合并
- 建立基本目录结构和配置

### v1.1.0
- 增强能力发现算法
- 优化能力抽象过程
- 增加能力评估指标
- 改进用户界面

### v1.2.0
- 支持能力版本控制
- 增加能力依赖管理
- 实现能力推荐系统
- 优化性能和稳定性

## 未来规划

### 短期规划
- 增强能力发现的自动化程度
- 改进能力抽象的准确性
- 优化能力内生化的效果评估

### 中期规划
- 实现能力的自动合并和升级
- 建立能力生态系统的自平衡机制
- 支持能力的跨系统共享和迁移

### 长期规划
- 发展能力的自我进化能力
- 建立能力市场和交易系统
- 实现能力的智能组合和创新

## 贡献指南

### 开发流程
1. Fork 仓库并克隆到本地
2. 创建功能分支
3. 实现新功能或修复bug
4. 运行测试确保代码质量
5. 提交Pull Request

### 代码规范
- 遵循JavaScript/TypeScript标准规范
- 使用ES6+语法
- 提供详细的代码注释
- 编写单元测试

### 文档规范
- 保持文档更新
- 提供清晰的使用示例
- 记录API变更和版本历史
- 维护故障排除指南

## 许可协议

MIT License

## 联系方式

- 维护者：OpenClaw Team
- 邮箱：support@openclaw.ai
- 仓库：https://github.com/openclaw/capability-evolver
