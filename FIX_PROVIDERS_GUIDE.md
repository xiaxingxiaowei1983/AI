# 修复 providers 配置

## 问题
你截图中的配置有问题：

```json
"providers": {
  },  // ← 这里不能为空对象！
"kimi": {
```

## 正确的结构

`providers` 应该包含所有模型提供商，像这样：

```json
"providers": {
    "kimi": {
      "baseUrl": "https://api.moonshot.cn/v1",
      "apiKey": "sk-GIJ1y3DvfdB4pVYlNjrGEXptsVpyeBI50aRcjMihoFW1H7eG",
      "api": "openai-completions",
      "models": [
        {
          "id": "kimi-k2-turbo-preview",
          "name": "Kimi K2 Turbo"
        }
      ]
    },
    "alibaba-bailian": {
      "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
      "apiKey": "sk-sp-8c3eefb330194d8ab000277eb97b103e",
      "api": "openai-completions",
      "models": [
        {
          "id": "qwen3.5-plus",
          "name": "Qwen3.5-Plus"
        }
      ]
    }
  }
```

## 修复步骤

### 方法1：直接删除 custom-doubao 块

找到这段代码：
```json
"providers": {
      "custom-doubao": {
        "baseUrl": "https://ark.cn-beijing.volces.com/api/v3",
        "apiKey": "c13b2982-0aab-4c75-9404-0deb12a219ec",
        "api": "openai-completions",
        "models": [
          {
            "id": "ep-20260225031720-mp6fh",
            "name": "Doubao-Seed-Code"
          },
          {
            "id": "ep-20260225031321-nvprc",
            "name": "Doubao-Seed-Code"
          },
          {
            "id": "ep-20260228195036-gczhx",
            "name": "Doubao-Seed-Code"
          }
        ]
      },
    "kimi": {
```

**删除后应该是**：
```json
"providers": {
    "kimi": {
```

### 方法2：使用替换

1. 找到 `"custom-doubao": {` 
2. 从这一行开始，一直删除到 `"kimi": {` 前面的逗号和换行

**删除前**：
```json
"providers": {
      "custom-doubao": {
        ... (豆包配置)
      },
    "kimi": {
```

**删除后**：
```json
"providers": {
    "kimi": {
```

## 完整正确的 models 部分

```json
"models": {
    "mode": "merge",
    "providers": {
      "kimi": {
        "baseUrl": "https://api.moonshot.cn/v1",
        "apiKey": "sk-GIJ1y3DvfdB4pVYlNjrGEXptsVpyeBI50aRcjMihoFW1H7eG",
        "api": "openai-completions",
        "models": [
          {
            "id": "kimi-k2-turbo-preview",
            "name": "Kimi K2 Turbo"
          }
        ]
      },
      "alibaba-bailian": {
        "baseUrl": "https://dashscope.aliyuncs.com/compatible-mode/v1",
        "apiKey": "sk-sp-8c3eefb330194d8ab000277eb97b103e",
        "api": "openai-completions",
        "models": [
          {
            "id": "qwen3.5-plus",
            "name": "Qwen3.5-Plus"
          }
        ]
      }
    }
  }
```

## 检查点

修复后，确保：
1. ✅ `providers` 后面直接是 `"kimi": {`
2. ✅ 没有空的 `},` 在 `providers` 里面
3. ✅ JSON 格式正确（可以用在线 JSON 验证工具检查）
