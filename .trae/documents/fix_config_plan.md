# OpenClaw 配置文件修复计划

## [x] 任务 1: 移除 baseUrl 和 endpoint 中的多余反引号
- **优先级**: P0
- **依赖**: 无
- **描述**:
  - 移除 models.providers.volcano.baseUrl 中的多余反引号
  - 移除 channels.feishu.volcengine.endpoint 中的多余反引号
- **成功标准**:
  - 配置文件中的 URL 格式正确，没有多余的反引号
- **测试要求**:
  - `programmatic` TR-1.1: 配置文件中的 baseUrl 为 "https://ark.cn-beijing.volces.com/api/v3"
  - `programmatic` TR-1.2: 配置文件中的 endpoint 为 "https://ark.cn-beijing.volces.com/api/v3/chat/completions"

## [x] 任务 2: 修正 API Key
- **优先级**: P0
- **依赖**: 任务 1
- **描述**:
  - 将 models.providers.volcano.apiKey 修正为正确的 API Key
  - 将 channels.feishu.volcengine.api_key 修正为正确的 API Key
- **成功标准**:
  - API Key 格式正确，能够通过认证
- **测试要求**:
  - `programmatic` TR-2.1: API Key 格式为 UUID 格式
  - `human-judgement` TR-2.2: API Key 与火山引擎控制台中的一致

## [x] 任务 3: 调整网关模式
- **优先级**: P1
- **依赖**: 任务 1
- **描述**:
  - 将 gateway.mode 从 "local" 改为 "gateway"
- **成功标准**:
  - 网关模式设置正确
- **测试要求**:
  - `programmatic` TR-3.1: gateway.mode 为 "gateway"

## [x] 任务 4: 修正飞书通道配置
- **优先级**: P1
- **依赖**: 任务 2
- **描述**:
  - 将 channels.feishu.volcengine 改为使用与 models.providers.volcano 一致的配置
  - 修正飞书通道使用的模型引用
- **成功标准**:
  - 飞书通道配置与主模型配置一致
- **测试要求**:
  - `programmatic` TR-4.1: 飞书通道使用正确的 API Key
  - `programmatic` TR-4.2: 飞书通道使用正确的 endpoint_id

## [x] 任务 5: 重启网关验证配置
- **优先级**: P1
- **依赖**: 任务 1, 2, 3, 4
- **描述**:
  - 重启 OpenClaw 网关
  - 验证网关是否正常运行
  - 检查 API provider 是否正确注册
- **成功标准**:
  - 网关成功启动并监听在 18789 端口
  - API provider 正确注册，无错误信息
- **测试要求**:
  - `programmatic` TR-5.1: 网关监听在 18789 端口
  - `programmatic` TR-5.2: 无 API provider 注册错误

## 注意事项
- 确保 API Key 正确无误，否则会导致认证失败
- 所有配置修改后需要重启网关才能生效
- 注意保持配置文件的 JSON 格式正确