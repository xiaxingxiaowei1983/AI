# Test HTP analysis request PowerShell script

# Set variables
$apiUrl = 'http://localhost:3000/api/htp/analyze'
$age = '33'
$gender = '女'

# Create a simple test image (base64 encoded red square)
$testImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='

# Create request body
$requestBody = @{
    image = $testImage
    age = $age
    gender = $gender
} | ConvertTo-Json

# Send request
Write-Host 'Sending test request to $apiUrl...'
Write-Host 'Request body: $requestBody'

try {
    $response = Invoke-RestMethod -Uri $apiUrl -Method POST -Body $requestBody -ContentType 'application/json'
    Write-Host 'Response received successfully!'
    Write-Host 'Response:'
    $response | ConvertTo-Json -Depth 10
} catch {
    Write-Host 'Error sending request:'
    Write-Host $_.Exception.Message
    if ($_.Exception.Response) {
        $reader = New-Object System.IO.StreamReader($_.Exception.Response.GetResponseStream())
        $errorBody = $reader.ReadToEnd()
        Write-Host 'Error response:'
        Write-Host $errorBody
    }
}
