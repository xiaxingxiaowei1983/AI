# OpenClaw 技能集成计划 - 实施计划

## 问题描述

当前所有 27 个自定义技能都未集成到 OpenClaw+evo 中，尽管已经创建了完整的技能文件并尝试了多种集成方法。

## 当前状态

- ✅ 技能文件已创建：27个自定义技能存储在 `C:\Users\10919\Desktop\AI\skills\` 目录中
- ✅ OpenClaw 服务运行正常：服务已成功启动并运行
- ✅ 配置文件已更新：已在 `config.json` 中添加自定义技能路径
- ❌ 技能未被识别：OpenClaw 仅识别内置的4个技能

## 实施计划

### [x] 任务 1：验证配置文件格式
- **优先级**：P0
- **依赖**：无
- **描述**：
  - 检查 OpenClaw 配置文件的正确格式
  - 验证 `skills.paths` 配置是否被当前版本支持
  - 查看 OpenClaw 文档了解正确的配置方式
- **成功标准**：
  - 确认配置文件格式正确
  - 了解当前版本是否支持自定义技能路径
- **测试要求**：
  - `programmatic` TR-1.1：配置文件格式验证通过
  - `human-judgement` TR-1.2：理解并记录正确的配置方法
- **注意事项**：OpenClaw 版本可能对配置格式有特定要求
- **结果**：❌ 当前 OpenClaw 2026.2.21-2 版本不支持 `skills.paths` 配置选项

### [x] 任务 2：尝试使用 skill-creator 工具
- **优先级**：P0
- **依赖**：任务 1
- **描述**：
  - 安装 skill-creator 工具
  - 使用 skill-creator 安装自定义技能
  - 验证技能是否被识别
- **成功标准**：
  - skill-creator 工具安装成功
  - 能够使用该工具安装自定义技能
  - OpenClaw 能够识别新安装的技能
- **测试要求**：
  - `programmatic` TR-2.1：skill-creator 工具安装成功
  - `programmatic` TR-2.2：技能安装命令执行成功
  - `programmatic` TR-2.3：OpenClaw 技能列表中显示自定义技能
- **注意事项**：可能需要 Node.js 环境和相关依赖
- **结果**：❌ skill-creator 是一个内置技能，不是独立的安装工具。OpenClaw 建议使用 `npx clawhub` 安装技能，但 clawhub 不支持本地目录路径

### [x] 任务 3：修改 OpenClaw 启动命令
- **优先级**：P1
- **依赖**：任务 2
- **描述**：
  - 停止当前 OpenClaw 服务
  - 使用 `--skills-path` 参数重新启动服务
  - 验证技能是否被识别
- **成功标准**：
  - 服务能够使用新参数启动
  - OpenClaw 能够识别指定路径中的技能
- **测试要求**：
  - `programmatic` TR-3.1：服务启动命令执行成功
  - `programmatic` TR-3.2：OpenClaw 技能列表中显示自定义技能
- **注意事项**：需要确认 OpenClaw 命令是否支持 `--skills-path` 参数
- **结果**：❌ OpenClaw gateway 命令不支持 `--skills-path` 参数。查看了所有可用选项，没有与技能路径相关的参数

### [/] 任务 4：创建符号链接
- **优先级**：P1
- **依赖**：任务 3
- **描述**：
  - 创建从 `.openclaw\skills` 到自定义技能目录的符号链接
  - 重启 OpenClaw 服务
  - 验证技能是否被识别
- **成功标准**：
  - 符号链接创建成功
  - OpenClaw 能够通过符号链接访问自定义技能
- **测试要求**：
  - `programmatic` TR-4.1：符号链接创建成功
  - `programmatic` TR-4.2：OpenClaw 技能列表中显示自定义技能
- **注意事项**：符号链接可能受到安全限制

### [ ] 任务 5：检查 OpenClaw 版本和文档
- **优先级**：P2
- **依赖**：任务 4
- **描述**：
  - 检查当前 OpenClaw 版本
  - 查看官方文档关于技能管理的部分
  - 了解是否需要升级到支持自定义技能的版本
- **成功标准**：
  - 确认当前 OpenClaw 版本
  - 了解该版本对自定义技能的支持情况
  - 确定是否需要升级
- **测试要求**：
  - `programmatic` TR-5.1：成功获取 OpenClaw 版本信息
  - `human-judgement` TR-5.2：理解并记录版本对技能的支持情况
- **注意事项**：版本升级可能引入其他变更

### [ ] 任务 6：尝试手动安装单个技能
- **优先级**：P2
- **依赖**：任务 5
- **描述**：
  - 选择一个简单的技能（如 `programming-expert`）
  - 尝试手动安装到 `.openclaw\skills` 目录
  - 验证该技能是否被识别
- **成功标准**：
  - 技能文件能够复制到目标目录
  - OpenClaw 能够识别该技能
- **测试要求**：
  - `programmatic` TR-6.1：文件复制操作成功
  - `programmatic` TR-6.2：OpenClaw 技能列表中显示该技能
- **注意事项**：可能需要管理员权限

### [ ] 任务 7：创建技能包并使用 clawhub 安装
- **优先级**：P3
- **依赖**：任务 6
- **描述**：
  - 将自定义技能打包为标准格式
  - 使用 clawhub 安装打包后的技能
  - 验证技能是否被识别
- **成功标准**：
  - 技能打包成功
  - clawhub 能够安装打包后的技能
  - OpenClaw 能够识别新安装的技能
- **测试要求**：
  - `programmatic` TR-7.1：技能打包操作成功
  - `programmatic` TR-7.2：clawhub 安装命令执行成功
  - `programmatic` TR-7.3：OpenClaw 技能列表中显示自定义技能
- **注意事项**：需要了解 clawhub 的打包格式要求

## 验证方法

对于每个任务，使用以下命令验证技能是否被识别：

```powershell
# 检查技能状态
openclaw skills check

# 检查特定技能是否存在
openclaw skills list | Select-String -Pattern "programming-expert"

# 检查所有自定义技能
openclaw skills list | Select-String -Pattern "bug-|h5-|mp-|one-bite|zero-to-one|idea-freeze|validation-kit|prd-mvp|tech-freeze"
```

## 成功标准

所有任务完成后，应满足以下标准：

1. ✅ 至少有一个自定义技能被 OpenClaw 识别
2. ✅ 能够通过某种方法安装和管理自定义技能
3. ✅ 了解并记录最有效的技能集成方法
4. ✅ 提供详细的技能集成指南

## 风险评估

1. **权限限制**：可能无法访问或修改某些系统目录
2. **版本兼容性**：当前 OpenClaw 版本可能不支持自定义技能
3. **配置复杂性**：配置文件格式可能与预期不同
4. **工具可用性**：某些工具可能不可用或需要额外安装

## 应急计划

如果所有方法都失败，将：

1. 记录详细的失败原因和错误信息
2. 提供替代方案（如使用技能文件的本地路径）
3. 建议可能的下一步（如升级 OpenClaw 版本）
4. 保持技能文件的完整性，以便在未来版本中使用