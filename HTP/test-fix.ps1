# 测试房树人AI分析修复效果
Write-Host "开始测试房树人AI分析修复效果..." -ForegroundColor Green

# 测试图片的Base64数据（这里使用一个简单的示例图片）
# 注意：实际测试时需要替换为真实的房树人画作Base64数据
$testImageBase64 = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="

# 构建请求数据
$requestData = @{
    imageBase64 = $testImageBase64
}

# 转换为JSON
$jsonData = $requestData | ConvertTo-Json

Write-Host "测试图片数据长度: $($testImageBase64.Length)" -ForegroundColor Cyan
Write-Host "测试图片数据前50字符: $($testImageBase64.Substring(0, [Math]::Min(50, $testImageBase64.Length)))" -ForegroundColor Cyan

# 调用后端API
Write-Host "调用后端分析接口..." -ForegroundColor Yellow

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/api/htp/analyze" -Method POST -Body $jsonData -ContentType "application/json"
    Write-Host "✅ 后端接口调用成功!" -ForegroundColor Green
    
    # 输出响应结果
    Write-Host "📋 后端返回结果:" -ForegroundColor Cyan
    $response | ConvertTo-Json -Depth 10 | Write-Host
    
    # 检查是否返回了有效的分析结果
    if ($response.clientInsightReport -and $response.clientInsightReport -notlike "*暂未解析到画作特征*") {
        Write-Host "🎉 修复成功! AI返回了有效的分析结果!" -ForegroundColor Green
    } else {
        Write-Host "❌ 修复失败! AI仍然返回了兜底提示!" -ForegroundColor Red
    }
} catch {
    Write-Host "❌ 后端接口调用失败: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "错误详情: $($_.ErrorDetails.Message)" -ForegroundColor Red
}

Write-Host "测试完成!" -ForegroundColor Green
