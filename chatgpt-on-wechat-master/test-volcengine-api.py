# encoding:utf-8

import requests
import json

# 测试火山引擎API调用
def test_volcengine_api():
    print("=== 测试火山引擎API ===")
    
    # 配置信息
    api_key = "c13b2982-0aab-4c75-9404-0deb12a219ec"
    endpoint = "https://ark.cn-beijing.volces.com/api/v3/chat/completions"
    model = "doubao-seed-2-0-code-preview-260215"
    
    # 构建请求数据
    data = {
        "model": model,
        "messages": [
            {"role": "user", "content": "你好，测试API连接"}
        ],
        "temperature": 0.7,
        "max_tokens": 100
    }
    
    # 构建请求头
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    print(f"API Key: {api_key}")
    print(f"Endpoint: {endpoint}")
    print(f"Model: {model}")
    print(f"请求数据: {json.dumps(data, ensure_ascii=False)}")
    
    try:
        # 发送请求
        response = requests.post(
            endpoint,
            headers=headers,
            json=data,
            timeout=30
        )
        
        print(f"\n响应状态码: {response.status_code}")
        print(f"响应内容: {response.text}")
        
        if response.status_code == 200:
            print("\n✓ API调用成功！")
            response_data = response.json()
            print(f"回复内容: {response_data['choices'][0]['message']['content']}")
        else:
            print(f"\n✗ API调用失败，状态码: {response.status_code}")
            print(f"错误信息: {response.text}")
            
    except Exception as e:
        print(f"\n✗ 请求异常: {e}")

if __name__ == "__main__":
    test_volcengine_api()
