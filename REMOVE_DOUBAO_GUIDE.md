# 删除豆包配置指南

## 需要删除的内容

在 `C:\Users\10919\.openclaw\openclaw.json` 文件中，找到并删除以下内容：

### 1. 删除 providers 中的 custom-doubao

找到这段代码（大约在第15-33行）：

```json
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
```

**删除后**，providers 应该只剩：
```json
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
            ...
          }
        ]
      }
```

### 2. 更新默认模型

找到 `agents.defaults.model`，改为：

```json
  "agents": {
    "defaults": {
      "model": "alibaba-bailian/qwen3.5-plus"
    },
```

### 3. 更新大宗师的模型

找到大宗师配置中的 `model`：

```json
{
  "id": "main",
  "name": "大宗师",
  ...
  "model": "alibaba-bailian/qwen3.5-plus",
```

## 完整操作步骤

1. **备份配置**
   ```powershell
   Copy-Item "C:\Users\10919\.openclaw\openclaw.json" "C:\Users\10919\.openclaw\openclaw.json.bak"
   ```

2. **删除 custom-doubao 配置块**
   - 找到 `"custom-doubao": {` 开始的部分
   - 删除整个对象（包括最后的 `},`）

3. **更新模型引用**
   - 将所有 `custom-doubao/ep-...` 改为 `alibaba-bailian/qwen3.5-plus`

4. **保存文件**

5. **重启网关**
   ```powershell
   openclaw gateway restart
   ```

6. **验证**
   ```powershell
   openclaw status
   ```

## 注意事项

- 确保删除 `custom-doubao` 后，JSON 格式仍然正确（逗号匹配）
- 如果其他智能体也使用了豆包模型，需要一并更新
- 建议先备份再修改
