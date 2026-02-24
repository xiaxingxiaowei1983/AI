# 测试火山引擎豆包API
Write-Host "测试火山引擎豆包API"

# API端点
$apiEndpoint = "https://ark.cn-beijing.volces.com/api/v3/responses"

# 请求头
$headers = @{}
$headers.Add("Authorization", "Bearer c13b2982-0aab-4c75-9404-0deb12a219ec")
$headers.Add("Content-Type", "application/json")

# 请求体
$body = '{"model": "doubao-seed-2-0-lite-260215", "input": [{"role": "user", "content": [{"type": "input_image", "image_url": "https://ark-project.tos-cn-beijing.volces.com/doc_image/ark_demo_img_1.png"}, {"type": "input_text", "text": "你看见了什么？"}]}]}'

# 发送请求
try {
    $response = Invoke-WebRequest -Uri $apiEndpoint -Method POST -Headers $headers -Body $body -UseBasicParsing
    Write-Host "请求成功!"
    Write-Host "状态码: $($response.StatusCode)"
    Write-Host "响应内容:"
    Write-Host $response.Content
} catch {
    Write-Host "请求失败!"
    Write-Host "错误信息: $($_.Exception.Message)"
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        $statusDescription = $_.Exception.Response.StatusDescription
        Write-Host "状态码: $statusCode - $statusDescription"
        
        # 读取错误响应内容
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        $reader.Close()
        Write-Host "错误响应内容:"
        Write-Host $errorBody
    }
}
