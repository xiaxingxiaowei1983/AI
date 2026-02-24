$env:ARK_API_KEY="8a8457c8-945a-4836-acc3-7d2128305ba6"
$body = '{"model": "ep-20260222172223-fjvzx", "input": [{"role": "user", "content": [{"type": "input_text", "text": "你好，测试API连接"}]}]}'

Try {
    $response = Invoke-RestMethod -Uri "https://ark.cn-beijing.volces.com/api/v3/responses" -Method Post -Headers @{"Authorization"="Bearer $env:ARK_API_KEY"; "Content-Type"="application/json"} -Body $body
    Write-Host "API调用成功!"
    Write-Host "响应内容:"
    $response | ConvertTo-Json -Depth 10
} Catch {
    Write-Host "API调用失败:"
    Write-Host "错误信息: $($_.Exception.Message)"
    if ($_.ErrorDetails) {
        Write-Host "响应内容: $($_.ErrorDetails.Message)"
    }
}