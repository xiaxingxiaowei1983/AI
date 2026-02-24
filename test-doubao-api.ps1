#!/usr/bin/env powershell

# 测试火山引擎豆包API
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "🦞 测试火山引擎豆包API" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# API端点
$apiEndpoint = "https://ark.cn-beijing.volces.com/api/v3/responses"

# 请求头
$headers = @{
    "Authorization" = "Bearer c13b2982-0aab-4c75-9404-0deb12a219ec"
    "Content-Type" = "application/json"
}

# 请求体
$body = @{
    "model" = "doubao-seed-2-0-lite-260215"
    "input" = @(
        @{
            "role" = "user"
            "content" = @(
                @{
                    "type" = "input_image"
                    "image_url" = "https://ark-project.tos-cn-beijing.volces.com/doc_image/ark_demo_img_1.png"
                },
                @{
                    "type" = "input_text"
                    "text" = "你看见了什么？"
                }
            )
        }
    )
} | ConvertTo-Json -Depth 10

Write-Host "发送请求到豆包API..." -ForegroundColor Green
Write-Host "模型: doubao-seed-2-0-lite-260215" -ForegroundColor Green
Write-Host "端点: $apiEndpoint" -ForegroundColor Green

# 发送请求
try {
    $response = Invoke-WebRequest -Uri $apiEndpoint -Method POST -Headers $headers -Body $body -UseBasicParsing
    Write-Host "\n✅ 请求成功!" -ForegroundColor Green
    Write-Host "状态码: $($response.StatusCode)" -ForegroundColor Green
    Write-Host "\n响应内容:" -ForegroundColor Green
    Write-Host $response.Content -ForegroundColor White
} catch {
    Write-Host "\n❌ 请求失败!" -ForegroundColor Red
    Write-Host "错误信息: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $statusDescription = $_.Exception.Response.StatusDescription
        Write-Host "状态码: $statusCode - $statusDescription" -ForegroundColor Red
        
        # 读取错误响应内容
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        $reader.Close()
        Write-Host "\n错误响应内容:" -ForegroundColor Red
        Write-Host $errorBody -ForegroundColor White
    }
}

Write-Host "\n=====================================" -ForegroundColor Cyan
Write-Host "🦞 API测试完成" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
