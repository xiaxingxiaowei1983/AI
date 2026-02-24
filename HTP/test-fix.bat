@echo off
chcp 65001 > nul
echo 开始测试房树人AI分析修复效果...
echo.

REM 测试图片的Base64数据（这里使用一个简单的示例图片）
REM 注意：实际测试时需要替换为真实的房树人画作Base64数据
set "testImageBase64=iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="

echo 测试图片数据长度: %testImageBase64:~0,20%...(%testImageBase64:length%)
echo 测试图片数据前50字符: %testImageBase64:~0,50%
echo.

REM 构建请求数据
set "jsonData={\"imageBase64\":\"%testImageBase64%\"}"

REM 调用后端API
echo 调用后端分析接口...
echo.
powershell -Command "try { $response = Invoke-RestMethod -Uri 'http://localhost:3000/api/htp/analyze' -Method POST -Body '$env:jsonData' -ContentType 'application/json'; Write-Host '✅ 后端接口调用成功!' -ForegroundColor Green; Write-Host '📋 后端返回结果:' -ForegroundColor Cyan; $response | ConvertTo-Json -Depth 10 | Write-Host; if ($response.clientInsightReport -and $response.clientInsightReport -notlike '*暂未解析到画作特征*') { Write-Host '🎉 修复成功! AI返回了有效的分析结果!' -ForegroundColor Green } else { Write-Host '❌ 修复失败! AI仍然返回了兜底提示!' -ForegroundColor Red } } catch { Write-Host '❌ 后端接口调用失败: ' $_.Exception.Message -ForegroundColor Red; Write-Host '错误详情: ' $_.ErrorDetails.Message -ForegroundColor Red }"

echo.
echo 测试完成!
pause
