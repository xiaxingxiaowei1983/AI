// 调试脚本：检查上传环境和文件信息
function debugUpload() {
    console.log('=== 上传调试信息 ===');

    // 检查浏览器信息
    console.log('浏览器:', navigator.userAgent);
    console.log('语言:', navigator.language);

    // 检查网络信息
    if (navigator.connection) {
        console.log('网络类型:', navigator.connection.effectiveType);
        console.log('下行链路:', navigator.connection.downlink, 'Mbps');
        console.log('往返时间:', navigator.connection.rtt, 'ms');
    }

    // 检查当前页面URL
    console.log('当前页面URL:', window.location.href);
    console.log('API URL:', window.location.origin + '/api/process');

    // 检查文件输入
    const fileInput = document.getElementById('file-input');
    if (fileInput && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        console.log('=== 文件信息 ===');
        console.log('文件名:', file.name);
        console.log('文件类型:', file.type);
        console.log('文件大小:', file.size, '字节');
        console.log('文件大小(MB):', (file.size / 1024 / 1024).toFixed(2), 'MB');
        console.log('最后修改时间:', new Date(file.lastModified).toLocaleString());
    }

    // 检查图片输入
    const imageInput = document.getElementById('image-input');
    if (imageInput && imageInput.files.length > 0) {
        console.log('=== 图片信息 ===');
        console.log('图片数量:', imageInput.files.length);
        for (let i = 0; i < imageInput.files.length; i++) {
            const img = imageInput.files[i];
            console.log(`图片 ${i + 1}:`, {
                name: img.name,
                type: img.type,
                size: (img.size / 1024 / 1024).toFixed(2) + ' MB'
            });
        }
    }

    console.log('=== 存储信息 ===');
    console.log('是否支持Storage:', typeof Storage !== 'undefined');
    if (typeof Storage !== 'undefined') {
        console.log('LocalStorage已用:', (JSON.stringify(localStorage).length / 1024).toFixed(2), 'KB');
        console.log('SessionStorage已用:', (JSON.stringify(sessionStorage).length / 1024).toFixed(2), 'KB');
    }

    console.log('=== 性能信息 ===');
    if (performance && performance.memory) {
        console.log('JS堆大小:', (performance.memory.usedJSHeapSize / 1024 / 1024).toFixed(2), 'MB');
        console.log('JS堆限制:', (performance.memory.jsHeapSizeLimit / 1024 / 1024).toFixed(2), 'MB');
    }

    console.log('==================');
}

// 添加到全局，方便在控制台调用
window.debugUpload = debugUpload;

// 页面加载完成后自动执行
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        console.log('调试工具已加载。在控制台输入 debugUpload() 查看详细信息。');
    });
} else {
    console.log('调试工具已加载。在控制台输入 debugUpload() 查看详细信息。');
}
