# OpenClaw中文显示问题修复计划

## 问题描述
OpenClaw界面没有显示中文，而且每次重启后都会变为英文，即使安装的是@qingchencloud/openclaw-zh汉化版本。

## 任务分解与优先级

### [x] 任务 1: 检查当前语言设置
- **优先级**: P0
- **Depends On**: None
- **Description**:
  - 检查OpenClaw的语言设置配置
  - 确认当前的语言偏好设置
  - 验证汉化文件是否存在
- **Success Criteria**:
  - 确认当前语言设置状态
  - 找到语言配置的存储位置
- **Test Requirements**:
  - `programmatic` TR-1.1: 找到语言配置文件或设置
  - `human-judgement` TR-1.2: 确认当前语言设置是否为中文
- **Notes**: 重点检查用户设置和默认配置

### [/] 任务 2: 分析汉化文件加载机制
- **优先级**: P0
- **Depends On**: 任务 1
- **Description**:
  - 分析OpenClaw如何加载和应用汉化文件
  - 检查汉化文件的路径和加载逻辑
  - 确认汉化文件是否被正确加载
- **Success Criteria**:
  - 理解汉化文件的加载流程
  - 确认汉化文件是否存在且格式正确
- **Test Requirements**:
  - `programmatic` TR-2.1: 找到汉化文件加载的相关代码
  - `human-judgement` TR-2.2: 确认汉化文件内容完整
- **Notes**: 重点检查dist目录下的汉化资源

### [ ] 任务 3: 找出语言设置不保存的原因
- **优先级**: P0
- **Depends On**: 任务 2
- **Description**:
  - 检查语言设置的保存机制
  - 分析重启后设置丢失的原因
  - 确认配置文件的读写权限
- **Success Criteria**:
  - 找到设置不保存的根本原因
  - 确认配置文件的权限状态
- **Test Requirements**:
  - `programmatic` TR-3.1: 验证配置文件的读写操作
  - `human-judgement` TR-3.2: 确认设置修改后是否被正确保存
- **Notes**: 检查用户主目录下的配置文件

### [ ] 任务 4: 实现持久化的语言设置解决方案
- **优先级**: P0
- **Depends On**: 任务 3
- **Description**:
  - 修复语言设置的保存机制
  - 确保重启后语言设置保持为中文
  - 验证解决方案的有效性
- **Success Criteria**:
  - 语言设置能够持久保存
  - 重启后界面仍然显示中文
- **Test Requirements**:
  - `programmatic` TR-4.1: 验证设置保存和加载的完整性
  - `human-judgement` TR-4.2: 确认重启后界面显示中文
- **Notes**: 可能需要修改配置文件或添加启动脚本

### [ ] 任务 5: 优化汉化覆盖范围
- **优先级**: P1
- **Depends On**: 任务 4
- **Description**:
  - 识别未汉化的界面元素
  - 补充和完善汉化内容
  - 确保所有界面元素都显示为中文
- **Success Criteria**:
  - 界面主要内容都显示为中文
  - 汉化覆盖范围达到95%以上
- **Test Requirements**:
  - `programmatic` TR-5.1: 验证汉化文件的完整性
  - `human-judgement` TR-5.2: 确认界面显示效果良好
- **Notes**: 重点关注Sessions、Usage、Settings等页面

### [ ] 任务 6: 验证修复效果
- **优先级**: P1
- **Depends On**: 任务 5
- **Description**:
  - 重启OpenClaw服务
  - 验证界面是否显示中文
  - 测试多次重启后的表现
- **Success Criteria**:
  - 重启后界面保持中文显示
  - 所有主要功能正常工作
- **Test Requirements**:
  - `programmatic` TR-6.1: 验证服务重启后设置保持
  - `human-judgement` TR-6.2: 确认界面整体汉化效果
- **Notes**: 测试至少3次重启，确保设置稳定保存

## 预期成果
- OpenClaw界面完全显示为中文
- 重启后语言设置保持不变
- 汉化覆盖范围达到95%以上
- 所有功能正常工作

## 风险评估
- **低风险**: 语言设置修改可能影响其他配置
- **中风险**: 汉化文件修改可能导致界面显示异常
- **低风险**: 配置文件权限修改可能影响其他应用

## 应急方案
- 如需回滚，可恢复原始配置文件
- 如遇界面显示异常，可重新安装汉化版本
- 如遇服务启动失败，可检查配置文件语法