## 问题分析

### 1. API调用问题
- 当前代码调用的是本地API (`http://localhost:3000/api/decision-analysis`)
- 用户希望使用阿里云的DashScope API
- 需要修改API调用逻辑，使用`dashscope.Application.call`方法

### 2. 红灯数据问题
- 当前`bazi-engine.ts`中所有高光日的score都在70-93之间
- 没有score低于60的情况，因此不会显示红灯
- 需要修改score计算逻辑，确保有部分日期的score低于60

## 解决方案

### 1. 修改API调用逻辑
- 在`BirthInputModal.tsx`中添加阿里云DashScope API调用
- 安装必要的依赖包
- 实现正确的API调用格式，使用用户提供的配置
- 处理API调用失败的情况

### 2. 实现红灯数据
- 修改`bazi-engine.ts`中的score计算逻辑
- 为某些日期计算较低的score
- 确保每月红绿灯部分能够显示红灯状态

## 具体修改步骤

1. **添加依赖**：
   - 安装`@dashscope/sdk`包

2. **修改BirthInputModal.tsx**：
   - 导入必要的模块
   - 替换本地API调用为阿里云DashScope API调用
   - 实现正确的API调用格式
   - 处理API响应和错误情况

3. **修改bazi-engine.ts**：
   - 修改score计算逻辑，为某些日期生成较低的score
   - 确保score的分布能够覆盖0-100范围

4. **验证修改**：
   - 测试API调用是否成功
   - 验证是否能够显示红灯状态

## 预期结果

- AI服务能够成功调用阿里云的DashScope API
- 每月红绿灯部分能够显示红灯、黄灯和绿灯三种状态
- 当API调用失败时，能够显示适当的错误信息