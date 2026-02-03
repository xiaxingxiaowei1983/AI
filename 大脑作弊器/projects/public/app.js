// ==================== 日志清理（终极版） ====================
// 彻底屏蔽所有SDK和系统日志，只保留业务日志
(function filterConsoleLogs() {
  const originalLog = console.log;
  const originalWarn = console.warn;
  const originalError = console.error;

  // 需要屏蔽的关键词（扩展版）
  const filterKeywords = [
    // 连接错误
    'Connection is disposed',
    // SDK相关
    'Logger  coze-coding-error',
    'Logger  @coze-arch/flags',
    'Load FG from context',
    'handled rejection',
    '[SDK]',
    // CORS和跨域
    'Access to XMLHttpRequest at',
    'No \'Access-Control-Allow-Origin\' header',
    'ERR_FAILED',
    'blocked by CORS policy',
    // 字节跳动相关
    'mssdk.bytedance.com',
    'msToken=',
    'slardar_umd',
    'already inited',
    // 库相关
    'lib-react',
    'lib-polyfill',
    'Unrecognized feature',
    'ambient-light-sensor',
    'battery',
    'vr',
    // Tailwind警告
    'cdn.tailwindcss.com should not be used in production',
    'Tailwind CSS',
    'sourcemap',
    // 其他
    'f2991cab',
    '612.407ca092',
    '3758.9084fc6f',
    '96e0f2e1',
    'c8f2be7d'
  ];

  // 业务日志关键词（只保留包含这些关键词的日志）
  const businessKeywords = [
    '大脑作弊器',
    '新功能：',
    'DOM加载完成',
    '文件已添加',
    '生成按钮被点击',
    '正在上传',
    '启用扫描版OCR模式',
    '扫描版PDF处理',
    '进度:',
    '处理成功',
    '处理统计',
    '开始处理',
    '处理失败',
    '调试工具已加载',
    '未登录',
    '跳过保存',
    '正在渲染',
    '已完成',
    '分片',
    'OCR',
    '识别',
    '提取',
    '转换',
    '生成',
    '导出',
    '保存',
    '脚本',
    'JSON'
  ];

  const shouldFilter = (msg) => {
    const msgStr = typeof msg === 'string' ? msg : JSON.stringify(msg || '');

    // 如果包含任何屏蔽关键词，则过滤
    if (filterKeywords.some(key => msgStr.includes(key))) {
      return true;
    }

    // 如果不包含任何业务关键词，则过滤
    if (!businessKeywords.some(key => msgStr.includes(key))) {
      return true;
    }

    return false;
  };

  console.log = function(msg, ...args) {
    if (!shouldFilter(msg)) {
      originalLog.apply(console, [msg, ...args]);
    }
  };

  console.warn = function(msg, ...args) {
    if (!shouldFilter(msg)) {
      originalWarn.apply(console, [msg, ...args]);
    }
  };

  console.error = function(msg, ...args) {
    if (!shouldFilter(msg)) {
      originalError.apply(console, [msg, ...args]);
    }
  };

  // 额外拦截：对于某些特定的错误，完全静默
  const originalErrorFunc = window.onerror;
  window.onerror = function(message, source, lineno, colno, error) {
    const msgStr = message || '';
    if (filterKeywords.some(key => msgStr.includes(key))) {
      return true; // 阻止错误冒泡
    }
    if (originalErrorFunc) {
      return originalErrorFunc(message, source, lineno, colno, error);
    }
    return false;
  };
})();

// ==================== 版本信息 ====================
const APP_VERSION = 'v1.5';
const APP_VERSION_NAME = '增强版';

console.log(`🚀 大脑作弊器 ${APP_VERSION} - ${APP_VERSION_NAME}`);
console.log(`✨ 新功能：批量上传、Office文档支持、自动压缩、多格式导出、150MB大文件支持`);

// ==================== 页面初始化 ====================
// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM加载完成，开始初始化...');
    // ==================== 大脑作弊器模块 ====================
    const scriptGeneratorSection = document.getElementById('script-generator');
    const processingSection = document.getElementById('processing-section');
    const resultSection = document.getElementById('result-section');
    
    const inputTypeSelector = document.getElementById('input-type-selector');
    const fileInputArea = document.getElementById('file-input-area');
    const urlInputArea = document.getElementById('url-input-area');
    const imageInputArea = document.getElementById('image-input-area');
    
    const fileInput = document.getElementById('file-input');
    const urlInput = document.getElementById('url-input');
    const imageInput = document.getElementById('image-input');
    
    const dropZone = document.getElementById('drop-zone');
    const imageDropZone = document.getElementById('image-drop-zone');
    
    const selectedFileInfo = document.getElementById('selected-file-info');
    const selectedFileName = document.getElementById('selected-file-name');
    const selectedImagePreview = document.getElementById('selected-image-preview');
    const imagePreview = document.getElementById('image-preview');
    
    const generateBtn = document.getElementById('generate-btn');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    
    // 检查关键元素是否存在
    const criticalElements = {
        'input-type-selector': inputTypeSelector,
        'file-input': fileInput,
        'drop-zone': dropZone,
        'image-drop-zone': imageDropZone,
        'generate-btn': generateBtn
    };
    
    const missingElements = Object.entries(criticalElements)
        .filter(([name, el]) => !el)
        .map(([name]) => name);
    
    if (missingElements.length > 0) {
        console.error('❌ 关键元素不存在:', missingElements.join(', '));
        return;
    }
    
    const copyBtn = document.getElementById('copy-btn');
    const downloadBtn = document.getElementById('download-btn');
    const regenerateBtn = document.getElementById('regenerate-btn');
    
    let currentInputType = 'file';
    let selectedFiles = []; // 改为数组，支持多个文件
    let selectedImages = [];
    let generatedScript = null;
    
    // 输入类型切换
    inputTypeSelector.addEventListener('click', function(e) {
        console.log('🔘 输入类型选择器被点击');
        const btn = e.target.closest('.input-type-btn');
        if (!btn) return;
        
        const type = btn.getAttribute('data-type');
        currentInputType = type;
        
        // 更新按钮样式
        document.querySelectorAll('.input-type-btn').forEach(b => {
            b.classList.remove('bg-white', 'text-black', 'border-white', 'active');
            b.classList.add('border-border-gray', 'text-text-gray');
        });
        btn.classList.add('bg-white', 'text-black', 'border-white', 'active');
        btn.classList.remove('border-border-gray', 'text-text-gray');
        
        // 显示对应的输入区域
        fileInputArea.classList.add('hidden');
        urlInputArea.classList.add('hidden');
        imageInputArea.classList.add('hidden');
        
        if (type === 'file') {
            fileInputArea.classList.remove('hidden');
        } else if (type === 'url') {
            urlInputArea.classList.remove('hidden');
        } else if (type === 'image') {
            imageInputArea.classList.remove('hidden');
        }
    });
    
    // 文件拖拽
    dropZone.addEventListener('click', function() {
        fileInput.click();
    });
    
    dropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('border-white');
    });
    
    dropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('border-white');
    });
    
    dropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('border-white');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileSelect(Array.from(files));
        }
    });

    fileInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleFileSelect(Array.from(e.target.files));
        }
    });

    function handleFileSelect(files) {
        // 支持的文件扩展名
        const supportedExtensions = ['.pdf', '.epub', '.txt', '.docx', '.xlsx', '.pptx', '.doc', '.xls', '.ppt'];
        const supportedMimeTypes = [
            'application/pdf',
            'application/epub+zip',
            'text/plain',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/msword',
            'application/vnd.ms-excel',
            'application/vnd.ms-powerpoint',
            'application/octet-stream' // 为了兼容一些浏览器对 Office 格式的识别
        ];

        // 检查文件数量限制
        if (selectedFiles.length + files.length > 5) {
            alert(`最多只能上传 5 个文件，当前已选择 ${selectedFiles.length} 个，尝试添加 ${files.length} 个`);
            return;
        }

        // 处理每个文件
        files.forEach(file => {
            const fileName = file.name.toLowerCase();
            const fileExt = fileName.substring(fileName.lastIndexOf('.'));

            // 检查文件是否被支持
            const isSupported = supportedMimeTypes.includes(file.type) ||
                               supportedExtensions.includes(fileExt);

            // 检查文件大小（150MB = 157286400 字节）
            const MAX_FILE_SIZE = 150 * 1024 * 1024;
            if (file.size > MAX_FILE_SIZE) {
                alert(`文件 "${file.name}" 超过 150MB 限制`);
                return;
            }

            // 检查是否已选择
            const isDuplicate = selectedFiles.some(f => f.name === file.name && f.size === file.size);
            if (isDuplicate) {
                console.log('⚠️ 文件已存在:', file.name);
                return;
            }

            if (isSupported) {
                selectedFiles.push(file);
                console.log('✅ 文件已添加:', file.name, '类型:', file.type, '扩展名:', fileExt);

                // 智能提醒：如果是PDF文件且>10MB，提示不要使用扫描版OCR模式
                if (fileExt === '.pdf' && file.size > 10 * 1024 * 1024) {
                    const scannedPdfMode = document.getElementById('scanned-pdf-mode');
                    if (scannedPdfMode && scannedPdfMode.checked) {
                        console.log('⚠️ 大文件PDF已选中，建议取消扫描版OCR模式');
                        // 自动取消勾选
                        scannedPdfMode.checked = false;
                        console.log('✅ 已自动取消扫描版OCR模式');
                    }
                }
            } else {
                alert(`仅支持 PDF、EPUB、TXT、DOC、DOCX、XLS、XLSX、PPT、PPTX 文件\n\n当前文件类型: ${file.type || '未知'}\n文件扩展名: ${fileExt}`);
                console.error('❌ 不支持的文件类型:', file.type, '文件名:', file.name);
            }
        });

        // 更新UI
        updateFileListUI();
    }

    function updateFileListUI() {
        const fileList = document.getElementById('file-list');
        const fileCount = document.getElementById('file-count');

        if (selectedFiles.length === 0) {
            selectedFileInfo.classList.add('hidden');
            return;
        }

        selectedFileInfo.classList.remove('hidden');
        fileCount.textContent = `已选择 ${selectedFiles.length} 个文件`;

        fileList.innerHTML = selectedFiles.map((file, index) => `
            <div class="flex items-center justify-between p-2 bg-bg-dark-gray rounded">
                <div class="flex items-center flex-1 min-w-0">
                    <i class="fa fa-file text-white mr-3 flex-shrink-0"></i>
                    <div class="flex-1 min-w-0">
                        <p class="text-text-white truncate">${file.name}</p>
                        <p class="text-xs text-text-gray">${(file.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                </div>
                <button onclick="removeFile(${index})" class="ml-3 text-text-gray hover:text-error transition-colors duration-300 flex-shrink-0" title="删除文件">
                    <i class="fa fa-times"></i>
                </button>
            </div>
        `).join('');
    }

    // 全局函数：删除文件
    window.removeFile = function(index) {
        selectedFiles.splice(index, 1);
        updateFileListUI();
    };

    // 清除全部文件
    document.getElementById('clear-files').addEventListener('click', function() {
        selectedFiles = [];
        updateFileListUI();
    });


    // 图片拖拽
    imageDropZone.addEventListener('click', function() {
        imageInput.click();
    });

    imageDropZone.addEventListener('dragover', function(e) {
        e.preventDefault();
        this.classList.add('border-white');
    });

    imageDropZone.addEventListener('dragleave', function(e) {
        e.preventDefault();
        this.classList.remove('border-white');
    });

    imageDropZone.addEventListener('drop', function(e) {
        e.preventDefault();
        this.classList.remove('border-white');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageSelect(Array.from(files));
        }
    });

    imageInput.addEventListener('change', function(e) {
        if (e.target.files.length > 0) {
            handleImageSelect(Array.from(e.target.files));
        }
    });

    function handleImageSelect(files) {
        const validFiles = files.filter(file => file.type.startsWith('image/'));

        if (validFiles.length === 0) {
            alert('仅支持图片文件');
            return;
        }

        // 检查单张图片大小（提升到5MB，支持扫描版书籍）
        const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
        const oversizedFiles = validFiles.filter(file => file.size > MAX_IMAGE_SIZE);
        if (oversizedFiles.length > 0) {
            const fileNames = oversizedFiles.map(f => `${f.name} (${(f.size / 1024 / 1024).toFixed(2)}MB)`).join('\n');
            alert(`以下图片超过5MB限制，请压缩后重试：\n\n${fileNames}\n\n建议：\n• 使用在线压缩工具（如TinyPNG、Compressor.io）\n• 或降低图片分辨率（建议宽度1500-2000px）`);
            return;
        }

        // 检查总数量（支持最多100张图片，用于扫描版书籍）
        const totalImages = selectedImages.length + validFiles.length;
        if (totalImages > 100) {
            alert(`最多只能上传100张图片，当前已选择${selectedImages.length}张，尝试添加${validFiles.length}张。\n\n💡 扫描版书籍处理建议：\n• 将书籍拆分为多个批次处理（每批50-100张）\n• 每批会自动生成独立的认知脚本`);
            return;
        }

        // 检查所有图片总大小（提升到100MB，支持扫描版书籍）
        const currentTotalSize = selectedImages.reduce((sum, img) => sum + img.size, 0);
        const newTotalSize = currentTotalSize + validFiles.reduce((sum, img) => sum + img.size, 0);
        const MAX_TOTAL_SIZE = 100 * 1024 * 1024; // 100MB

        if (newTotalSize > MAX_TOTAL_SIZE) {
            const currentTotalMB = (currentTotalSize / 1024 / 1024).toFixed(2);
            const newTotalMB = (newTotalSize / 1024 / 1024).toFixed(2);
            alert(`所有图片总大小不能超过100MB\n\n当前总大小：${currentTotalMB}MB\n添加后总大小：${newTotalMB}MB\n\n建议：\n• 删除部分图片或使用更小的图片\n• 将书籍拆分为多个批次处理`);
            return;
        }

        // 添加到数组
        selectedImages = [...selectedImages, ...validFiles];

        // 更新预览
        updateImagePreview();
    }

    function updateImagePreview() {
        const previewGrid = document.getElementById('image-preview-grid');
        const imageCount = document.getElementById('image-count');

        if (selectedImages.length === 0) {
            selectedImagePreview.classList.add('hidden');
            return;
        }

        selectedImagePreview.classList.remove('hidden');
        imageCount.textContent = `已选择 ${selectedImages.length} 张图片`;

        // 清空现有内容
        previewGrid.innerHTML = '';

        // 为每个图片创建预览
        selectedImages.forEach((file, index) => {
            const reader = new FileReader();
            reader.onload = function(e) {
                const imageContainer = document.createElement('div');
                imageContainer.className = 'relative group';

                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'w-full h-32 object-cover rounded border border-border-gray';

                const removeBtn = document.createElement('button');
                removeBtn.className = 'absolute top-2 right-2 bg-black/80 text-white w-6 h-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center';
                removeBtn.innerHTML = '<i class="fa fa-times"></i>';
                removeBtn.onclick = function() {
                    removeImage(index);
                };

                imageContainer.appendChild(img);
                imageContainer.appendChild(removeBtn);
                previewGrid.appendChild(imageContainer);
            };
            reader.readAsDataURL(file);
        });
    }

    function removeImage(index) {
        selectedImages = selectedImages.filter((_, i) => i !== index);
        updateImagePreview();
    }

    // 清除全部图片
    const clearImagesBtn = document.getElementById('clear-images');
    clearImagesBtn.addEventListener('click', function() {
        selectedImages = [];
        updateImagePreview();
        imageInput.value = '';
    });

    // 生成按钮点击
    generateBtn.addEventListener('click', async function() {
        console.log('🔘 生成按钮被点击');
        let content = '';
        let type = '';

        if (currentInputType === 'file') {
            if (selectedFiles.length === 0) {
                alert('请选择文件');
                return;
            }
            type = 'file';
        } else if (currentInputType === 'url') {
            const url = urlInput.value.trim();
            if (!url) {
                alert('请输入URL');
                return;
            }
            type = 'url';
            content = url;
        } else if (currentInputType === 'image') {
            if (selectedImages.length === 0) {
                alert('请选择图片');
                return;
            }
            type = 'image';
        }

        // 显示处理中界面
        scriptGeneratorSection.classList.add('hidden');
        processingSection.classList.remove('hidden');

        // 重置进度条
        progressBar.style.width = '0%';
        progressText.textContent = '准备处理...';

        try {
            // 步骤1：上传内容
            console.log('开始处理，类型:', type);
            updateProgress(10, '正在上传内容...');

            // 检查是否启用了扫描版OCR模式
            const scannedPdfMode = document.getElementById('scanned-pdf-mode')?.checked;

            // 检查文件大小
            if (type === 'file') {
                const MAX_FILE_SIZE = 150 * 1024 * 1024; // 150MB

                // 检查每个文件的大小
                for (const file of selectedFiles) {
                    if (file.size > MAX_FILE_SIZE) {
                        throw new Error(`文件 "${file.name}" 太大（${(file.size / 1024 / 1024).toFixed(2)}MB），请使用小于150MB的文件。\n\n提示：\n• 可以使用文件压缩工具压缩文件\n• 大文件建议拆分成多个小文件分别处理`);
                    }
                }

                // 检测是否启用扫描版OCR模式且是单个PDF文件
                if (scannedPdfMode && selectedFiles.length === 1 && selectedFiles[0].type.includes('pdf')) {
                    console.log('🔍 启用扫描版OCR模式');
                    await processScannedPDF(selectedFiles[0]);
                    return;
                }

                // 批量上传模式：如果只有一个文件且大于10MB，使用分片上传
                // 如果有多个文件，逐个上传处理
                if (selectedFiles.length === 1 && selectedFiles[0].size > 10 * 1024 * 1024) {
                    console.log('📦 检测到大文件，启用分片上传模式');
                    const result = await uploadLargeFile(selectedFiles[0], content);
                    generatedScript = result;
                    await saveScriptToHistory(result, type, content);
                    displayResult(result.script);
                    return;
                }
            }

            // 检查图片总大小（提升到100MB，支持扫描版书籍）
            if (type === 'image') {
                const totalSize = selectedImages.reduce((sum, img) => sum + img.size, 0);
                if (totalSize > 100 * 1024 * 1024) {
                    throw new Error(`所有图片总大小太大（${(totalSize / 1024 / 1024).toFixed(2)}MB），请使用总大小小于100MB的图片。\n\n提示：\n• 单张图片建议压缩到5MB以内\n• 将书籍拆分为多个批次处理（每批50-100张）`);
                }
            }

            // 使用 FormData 传输二进制文件（避免 JSON 转义导致的数据损坏）
            const formData = new FormData();
            formData.append('type', type);

            if (type === 'file') {
                // 批量上传所有文件
                selectedFiles.forEach((file, index) => {
                    formData.append('files', file);
                });
                console.log('📁 文件信息:', {
                    count: selectedFiles.length,
                    files: selectedFiles.map(f => ({
                        name: f.name,
                        type: f.type,
                        size: (f.size / 1024 / 1024).toFixed(2) + ' MB'
                    }))
                });
            } else if (type === 'url') {
                formData.append('url', content);
                console.log('🔗 URL:', content);
            } else if (type === 'image') {
                // 批量添加图片文件
                selectedImages.forEach((img, index) => {
                    formData.append(`images`, img);
                });
                console.log('🖼️ 图片数量:', selectedImages.length);
            }

            // 步骤2：调用API处理
            updateProgress(20, '正在识别内容...');
            console.log('调用API...');

            const startTime = Date.now();

            // 添加超时控制（150秒，比后端120秒长30秒，确保能接收到后端的错误响应）
            const timeoutPromise = new Promise((_, reject) => {
                setTimeout(() => reject(new Error('请求超时（超过150秒），请稍后重试或减少输入内容')), 150000);
            });

            const fetchPromise = fetch('/api/process', {
                method: 'POST',
                // 不设置 Content-Type，让浏览器自动设置 multipart/form-data 并生成 boundary
                body: formData
            });

            const response = await Promise.race([fetchPromise, timeoutPromise]);

            const apiDuration = Date.now() - startTime;
            console.log('API响应时间:', apiDuration, 'ms');

            // 步骤3：处理响应
            updateProgress(70, '正在解析结果...');

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                console.error('API错误:', errorData);
                throw new Error(errorData.error || `服务器错误 (${response.status})`);
            }

            const result = await response.json();
            console.log('API返回结果:', result);

            // 检查是否有错误
            if (result.error) {
                console.error('业务错误:', result.error);
                throw new Error(result.error);
            }

            generatedScript = result;

            // 保存脚本到历史记录（如果已登录）
            await saveScriptToHistory(result, type, content);

            // 显示结果
            displayResult(result.script);
        } catch (error) {
            console.error('处理失败:', error);

            let errorMessage = '生成失败，请重试';
            if (error instanceof Error) {
                errorMessage = error.message;

                // 检测是否是扫描型PDF，自动勾选扫描版模式并提示用户
                const isScannedPDF =
                    errorMessage.includes('扫描型PDF') ||
                    errorMessage.includes('中文占比过低') ||
                    errorMessage.includes('英文/数字占比过高') ||
                    errorMessage.includes('文件内容质量不达标') ||
                    errorMessage.includes('内容质量不达标');

                if (isScannedPDF && type === 'file' && selectedFiles.length === 1 && selectedFiles[0].type.includes('pdf')) {
                    console.log('🔍 检测到扫描型PDF');

                    // 自动勾选扫描版OCR模式
                    const scannedPdfCheckbox = document.getElementById('scanned-pdf-mode');
                    if (scannedPdfCheckbox) {
                        scannedPdfCheckbox.checked = true;
                        // 添加高亮效果提醒用户
                        scannedPdfCheckbox.parentElement.classList.add('border-yellow-400');
                        setTimeout(() => {
                            scannedPdfCheckbox.parentElement.classList.remove('border-yellow-400');
                        }, 3000);
                    }

                    // 提示用户重新上传
                    const confirmUpload = confirm(
                        '检测到扫描型PDF（纯图片格式）\n\n' +
                        '系统已自动勾选"扫描版书籍（自动OCR识别）"选项\n\n' +
                        '请点击"重新生成"按钮，系统将自动进行OCR识别并生成脚本\n\n' +
                        '提示：扫描版OCR识别需要较长时间，请耐心等待'
                    );

                    if (confirmUpload) {
                        return; // 用户确认后返回，等待重新上传
                    } else {
                        // 取消后取消勾选
                        if (scannedPdfCheckbox) {
                            scannedPdfCheckbox.checked = false;
                        }
                    }
                }

                // 提供更友好的错误提示
                if (error.message.includes('超时')) {
                    errorMessage = error.message + '\n\n建议：使用较小的图片或减少输入内容';
                } else if (error.message.includes('识别')) {
                    errorMessage = error.message + '\n\n建议：请确保图片清晰度足够';
                } else if (error.message.includes('内容太少')) {
                    errorMessage = error.message + '\n\n建议：请提供更详细的内容';
                } else if (error.message.includes('文件解析失败') || error.message.includes('解析失败')) {
                    errorMessage = error.message + '\n\n建议：\n• 请确保文件格式正确，支持PDF、EPUB、TXT文件\n• 检查文件是否已损坏\n• 如果是PDF，请确认未加密\n• 如果是EPUB，请确认文件完整';
                } else if (error.message.includes('PDF') || error.message.includes('EPUB')) {
                    errorMessage = error.message + '\n\n建议：该文件可能已损坏或包含加密内容';
                } else if (error.message.includes('文件格式错误')) {
                    errorMessage = error.message + '\n\n支持的文件类型：PDF、EPUB、TXT';
                }
            } else if (typeof error === 'string') {
                errorMessage = error;
            }

            alert(errorMessage);

            // 显示详细的错误信息到控制台
            console.error('详细错误信息:', {
                type: type,
                error: error,
                timestamp: new Date().toISOString()
            });

            resetToInput();
        }
    });
    
    function fileToBase64(file) {
        return new Promise((resolve, reject) => {
            console.log('🔄 开始将文件转换为 base64:', file.name, file.type);
            const reader = new FileReader();
            reader.onload = () => {
                const result = reader.result;
                console.log('✅ 文件转换为 base64 成功:', {
                    name: file.name,
                    type: file.type,
                    base64Prefix: result.substring(0, 50) + '...',
                    base64Length: result.length
                });
                resolve(result);
            };
            reader.onerror = (error) => {
                console.error('❌ 文件转换为 base64 失败:', error);
                reject(error);
            };
            reader.readAsDataURL(file);
        });
    }

    function updateProgress(progress, text) {
        progressBar.style.width = progress + '%';
        progressText.textContent = text || `已完成 ${progress}%`;
        console.log(`进度: ${progress}% - ${text}`);
    }
    
    function displayResult(script) {
        console.log('[开始渲染结果]', JSON.stringify(script, null, 2));

        updateProgress(90, '正在渲染结果...');

        setTimeout(() => {
            updateProgress(100, '已完成');

            processingSection.classList.add('hidden');
            resultSection.classList.remove('hidden');

            // 🔍 调试信息：检查script结构
            console.log('[调试] script类型:', typeof script);
            console.log('[调试] script键:', Object.keys(script || {}));
            console.log('[调试] script["名"]:', script["名"]);
            console.log('[调试] script["道"]:', script["道"]);

            // 兼容新旧两种数据结构
            // 新结构（后端返回的六段式）:
            // {
            //   "名": { "核心命题": "", "核心观点": [], "核心价值": "", "适用场景": "" },
            //   "道": "",
            //   "法": "",
            //   "术": "",
            //   "器": "",
            //   "例": ""
            // }
            // 旧结构（前端期望的）:
            // { name, dao, fa, shu, qi, li }

            const nameEl = document.getElementById('result-name');
            const daoEl = document.getElementById('result-dao');
            const faEl = document.getElementById('result-fa');
            const shuEl = document.getElementById('result-shu');
            const qiEl = document.getElementById('result-qi');
            const liEl = document.getElementById('result-li');

            if (!nameEl || !daoEl || !faEl || !shuEl || !qiEl || !liEl) {
                console.error('[渲染失败] 结果容器元素不存在');
                return;
            }

            // 检查数据是否为空
            if (!script || Object.keys(script).length === 0) {
                console.warn('[渲染警告] script数据为空');
                nameEl.innerHTML = '<p class="text-yellow-500">⚠️ 处理完成，但未生成脚本内容</p>';
                return;
            }

            // 处理"名"部分（包含核心命题、核心观点、核心价值、适用场景）
            if (script["名"] && typeof script["名"] === 'object') {
                const ming = script["名"];
                let nameContent = '';

                if (ming["核心命题"]) {
                    nameContent += `<div class="mb-4"><p class="font-semibold text-white mb-2">核心命题：</p><p>${ming["核心命题"]}</p></div>`;
                }

                if (ming["核心观点"] && Array.isArray(ming["核心观点"]) && ming["核心观点"].length > 0) {
                    nameContent += `<div class="mb-4"><p class="font-semibold text-white mb-2">核心观点：</p><ul class="list-disc list-inside space-y-1">`;
                    ming["核心观点"].forEach(view => {
                        nameContent += `<li>${view}</li>`;
                    });
                    nameContent += `</ul></div>`;
                }

                if (ming["核心价值"]) {
                    nameContent += `<div class="mb-4"><p class="font-semibold text-white mb-2">核心价值：</p><p>${ming["核心价值"]}</p></div>`;
                }

                if (ming["适用场景"]) {
                    nameContent += `<div><p class="font-semibold text-white mb-2">适用场景：</p><p>${ming["适用场景"]}</p></div>`;
                }

                nameEl.innerHTML = nameContent || '<p>暂无内容</p>';
            } else if (script.name) {
                // 兼容旧结构
                nameEl.textContent = script.name;
            } else {
                nameEl.textContent = '暂无内容';
            }

            // 处理其他五个部分（道、法、术、器、例）
            const mappings = [
                { el: daoEl, key: '道', oldKey: 'dao' },
                { el: faEl, key: '法', oldKey: 'fa' },
                { el: shuEl, key: '术', oldKey: 'shu' },
                { el: qiEl, key: '器', oldKey: 'qi' },
                { el: liEl, key: '例', oldKey: 'li' }
            ];

            mappings.forEach(({ el, key, oldKey }) => {
                if (script[key]) {
                    // 将换行符转换为段落标签
                    const content = script[key].split('\n').filter(line => line.trim()).map(line => `<p class="mb-2">${line}</p>`).join('');
                    
                    // 检测是否是扫描型PDF错误（仅在"道"部分检测）
                    let enhancedContent = content;
                    if (key === '道' && script[key].includes('扫描型PDF')) {
                        enhancedContent = `
                            ${content}
                            <div class="mt-6 p-4 bg-bg-dark border border-border-gray rounded-lg">
                                <p class="text-white font-semibold mb-3">📸 快速解决方案：使用截图上传</p>
                                <p class="text-text-gray text-sm mb-3">截取PDF的内容（最多100张截图），系统会自动使用OCR识别文字并生成脚本。</p>
                                <button id="switch-to-image-upload" class="bg-white text-black px-4 py-2 rounded text-sm hover:bg-gray-200 transition-colors duration-300">
                                    切换到截图上传
                                </button>
                            </div>
                        `;
                    }
                    
                    el.innerHTML = enhancedContent || '<p>暂无内容</p>';
                } else if (script[oldKey]) {
                    // 兼容旧结构
                    const content = script[oldKey].split('\n').filter(line => line.trim()).map(line => `<p class="mb-2">${line}</p>`).join('');
                    el.innerHTML = content || '<p>暂无内容</p>';
                } else {
                    el.innerHTML = '<p>暂无内容</p>';
                }
            });

            console.log('[渲染成功] 已将数据插入到页面');

            // 触发动画
            const revealElements = resultSection.querySelectorAll('[data-scroll-reveal]');
            revealElements.forEach((element, index) => {
                setTimeout(() => {
                    element.classList.add('animate-fade-in');
                }, index * 100);
            });

            // 滚动到结果区域
            resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // 绑定"切换到截图上传"按钮事件
            const switchToImageBtn = document.getElementById('switch-to-image-upload');
            if (switchToImageBtn) {
                switchToImageBtn.addEventListener('click', function() {
                    console.log('🔘 用户点击了切换到截图上传按钮');
                    
                    // 切换到截图上传模式
                    const imageBtn = document.querySelector('.input-type-btn[data-type="image"]');
                    if (imageBtn) {
                        imageBtn.click();
                    }
                    
                    // 重置状态，返回到输入页面
                    resetToInput();
                });
            }
        }, 300);
    }
    
    function resetToInput() {
        scriptGeneratorSection.classList.remove('hidden');
        processingSection.classList.add('hidden');
        resultSection.classList.add('hidden');

        // 重置进度条
        updateProgress(0, '已完成 0%');
    }

    // 处理扫描版PDF（自动OCR识别）
    async function processScannedPDF(file) {
        console.log('🔍 开始处理扫描版PDF:', file.name, file.size);

        try {
            // 检查文件大小限制
            const MAX_SIZE = 10 * 1024 * 1024; // 10MB
            if (file.size > MAX_SIZE) {
                throw new Error(`文件过大（${(file.size / 1024 / 1024).toFixed(2)}MB），扫描版OCR模式仅支持≤10MB的PDF。\n\n建议：使用普通上传模式，或先将PDF拆分为多个小文件。`);
            }

            updateProgress(20, '正在上传文件...');

            // 上传文件到扫描版PDF处理接口
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch('/api/process-scanned-pdf', {
                method: 'POST',
                body: formData
            });

            // 处理413错误（Payload Too Large）
            if (response.status === 413) {
                throw new Error(`文件过大，服务器拒绝处理。\n\n建议：\n1. 使用普通上传模式（支持150MB大文件）\n2. 或将PDF拆分为多个≤10MB的小文件`);
            }

            if (!response.ok) {
                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `处理失败，状态码：${response.status}`);
                } else {
                    throw new Error(`服务器返回错误（状态码：${response.status}），请稍后重试`);
                }
            }

            // 容错解析JSON（核心修复）
            const responseText = await response.text();
            let result;
            try {
                result = JSON.parse(responseText);
                console.log('✅ 扫描版PDF处理成功:', result);
            } catch (jsonError) {
                console.error('❌ JSON解析失败:', jsonError);
                console.error('❌ 原始响应:', responseText.substring(0, 500));

                // 返回友好的错误提示
                result = {
                    title: '解析失败',
                    名: {
                        核心命题: '脚本生成失败',
                        核心观点: ['JSON格式错误', 'OCR文本包含特殊字符'],
                        核心价值: '文件已上传，但解析结果格式异常',
                        适用场景: '无法确定'
                    },
                    道: `⚠️ 解析失败：${jsonError.message}\n\n建议：\n1. 将PDF转为纯文字版后重新上传\n2. 检查PDF是否损坏或加密`,
                    法: '解析失败',
                    术: '解析失败',
                    器: '解析失败',
                    例: '解析失败'
                };
            }

            if (!result.success) {
                throw new Error(result.error || '处理失败');
            }

            // 显示处理统计信息
            const stats = result.stats || {};
            console.log('📊 处理统计:', stats);

            // 保存脚本
            generatedScript = result.script;
            await saveScriptToHistory(result.script, 'file', file.name);

            // 显示结果
            displayResult(result.script);

        } catch (error) {
            console.error('❌ 扫描版PDF处理失败:', error);

            // 失败兜底处理
            const fallbackScript = {
                title: '处理失败',
                名: {
                    核心命题: '脚本生成失败',
                    核心观点: ['后端接口异常', 'OCR处理出错'],
                    核心价值: '文件上传成功，但处理失败',
                    适用场景: '无法确定'
                },
                道: `❌ 具体错误：${error.message}\n\n解决方案：\n1. 将PDF转为纯文字版后上传\n2. 检查PDF是否损坏或加密\n3. 对于大文件，使用普通上传模式`,
                法: '处理失败',
                术: '处理失败',
                器: '处理失败',
                例: '处理失败'
            };

            displayResult(fallbackScript);
            throw error;
        }
    }
    
    // 复制按钮
    copyBtn.addEventListener('click', function() {
        if (!generatedScript) return;
        
        const text = `
名 · 核心概念
${generatedScript.name || ''}

道 · 底层逻辑
${generatedScript.dao || ''}

法 · 执行框架
${generatedScript.fa || ''}

术 · 具体方法
${generatedScript.shu || ''}

器 · 工具资源
${generatedScript.qi || ''}

例 · 实战案例
${generatedScript.li || ''}
        `.trim();
        
        navigator.clipboard.writeText(text).then(() => {
            alert('已复制到剪贴板');
        });
    });
    
    // 下载按钮（显示/隐藏导出下拉菜单）
    downloadBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        if (!generatedScript) {
            alert('请先生成脚本');
            return;
        }

        const dropdown = document.getElementById('export-dropdown');
        dropdown.classList.toggle('hidden');
    });

    // 点击其他地方关闭下拉菜单
    document.addEventListener('click', function() {
        const dropdown = document.getElementById('export-dropdown');
        if (dropdown) {
            dropdown.classList.add('hidden');
        }
    });

    // 导出选项点击事件
    document.querySelectorAll('.export-option').forEach(option => {
        option.addEventListener('click', async function(e) {
            e.stopPropagation();
            const format = this.getAttribute('data-format');

            if (!generatedScript) {
                alert('请先生成脚本');
                return;
            }

            // 关闭下拉菜单
            document.getElementById('export-dropdown').classList.add('hidden');

            // 导出文件
            await exportScript(generatedScript, format);
        });
    });

    // 导出脚本函数
    async function exportScript(script, format) {
        try {
            console.log(`📤 开始导出脚本，格式: ${format}`);

            const response = await fetch('/api/export', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    script: script,
                    format: format
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.error || '导出失败');
            }

            // 获取文件内容
            const blob = await response.blob();
            const url = URL.createObjectURL(blob);

            // 创建下载链接
            const a = document.createElement('a');
            a.href = url;

            // 根据格式设置文件名
            let extension;
            switch (format) {
                case 'pdf':
                    extension = 'pdf';
                    break;
                case 'word':
                    extension = 'docx';
                    break;
                case 'markdown':
                    extension = 'md';
                    break;
                default:
                    extension = 'txt';
            }

            a.download = `认知脚本_${Date.now()}.${extension}`;
            a.click();

            // 清理URL对象
            URL.revokeObjectURL(url);

            console.log('✅ 导出成功');
        } catch (error) {
            console.error('❌ 导出失败:', error);
            alert(`导出失败: ${error.message}`);
        }
    }
    
    // 重新投喂按钮
    regenerateBtn.addEventListener('click', function() {
        resetToInput();

        // 清空输入
        fileInput.value = '';
        urlInput.value = '';
        imageInput.value = '';
        selectedFiles = [];
        selectedImages = [];
        selectedFileInfo.classList.add('hidden');
        selectedImagePreview.classList.add('hidden');
    });
    
    // ==================== 原网站的其他功能 ====================
    
    // 移动端菜单切换
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuButton.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
    });
    
    // 点击移动端菜单链接后自动关闭菜单
    document.querySelectorAll('#mobile-menu a').forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
        });
    });
    
    // 平滑滚动
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    
    // 滚动渐入效果
    const setupScrollReveal = () => {
        const revealElements = document.querySelectorAll('[data-scroll-reveal]');
        
        const revealOnScroll = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const delay = element.getAttribute('data-delay') || 0;
                    
                    setTimeout(() => {
                        element.classList.add('animate-fade-in');
                    }, delay);
                    
                    revealOnScroll.unobserve(element);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });
        
        revealElements.forEach(element => {
            revealOnScroll.observe(element);
            element.style.opacity = '0';
        });
    };
    
    setupScrollReveal();
    
    // 思维模型标签切换
    const modelTags = document.querySelectorAll('.model-tag');
    const modelCards = document.querySelectorAll('.model-card');
    const loadMoreBtn = document.getElementById('load-more-models');
    
    let currentCategory = 'all';
    let isExpanded = false;
    
    // 初始化：默认显示全部的前6个
    function initModelsDisplay() {
        let visibleCount = 0;
        modelCards.forEach((card, index) => {
            if (currentCategory === 'all') {
                // 全部分类默认显示6个
                if (visibleCount < 6) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            } else {
                // 其他分类默认显示该分类的所有模型
                if (card.getAttribute('data-category') === currentCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
        
        // 更新"查看更多"按钮显示状态
        updateLoadMoreBtn();
    }
    
    // 更新"查看更多"按钮
    function updateLoadMoreBtn() {
        if (currentCategory === 'all' && !isExpanded) {
            loadMoreBtn.classList.remove('hidden');
            loadMoreBtn.textContent = '查看更多';
        } else if (currentCategory === 'all' && isExpanded) {
            loadMoreBtn.classList.remove('hidden');
            loadMoreBtn.textContent = '收起';
        } else {
            // 其他分类隐藏"查看更多"按钮
            loadMoreBtn.classList.add('hidden');
        }
    }
    
    // 点击"查看更多"按钮
    loadMoreBtn.addEventListener('click', function() {
        isExpanded = !isExpanded;
        
        if (isExpanded) {
            // 展开全部
            modelCards.forEach(card => {
                card.style.display = 'block';
            });
        } else {
            // 收起到前6个
            let visibleCount = 0;
            modelCards.forEach(card => {
                if (visibleCount < 6) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });
        }
        
        updateLoadMoreBtn();
        
        // 滚动到模型区域
        document.getElementById('models').scrollIntoView({ behavior: 'smooth' });
    });
    
    modelTags.forEach(tag => {
        tag.addEventListener('click', function() {
            modelTags.forEach(t => {
                t.classList.remove('active', 'border-white', 'text-white');
                t.classList.add('border-border-gray', 'text-text-gray');
            });
            
            this.classList.add('active', 'border-white', 'text-white');
            this.classList.remove('border-border-gray', 'text-text-gray');
            
            currentCategory = this.getAttribute('data-category');
            isExpanded = false; // 切换分类时重置展开状态
            
            // 筛选并显示模型
            modelCards.forEach(card => {
                if (currentCategory === 'all') {
                    card.style.display = 'block';
                } else if (card.getAttribute('data-category') === currentCategory) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
            
            // 如果是"全部"分类，应用折叠逻辑
            if (currentCategory === 'all') {
                let visibleCount = 0;
                modelCards.forEach(card => {
                    if (visibleCount >= 6) {
                        card.style.display = 'none';
                    } else {
                        visibleCount++;
                    }
                });
            }
            
            updateLoadMoreBtn();
        });
    });
    
    // 初始化显示
    initModelsDisplay();
    
    // 思维模型详情弹窗
    const modelDetailBtns = document.querySelectorAll('.model-detail-btn');
    const modelDetailModal = document.getElementById('model-detail-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    
    const modelDetails = {
        'first-principle': {
            title: '第一性原理',
            content: `
                <p>第一性原理是一种从最基本的事实出发，层层推导，不被现有经验和假设限制的思维方式。</p>
                <h4 class="text-white mt-4 mb-2">核心概念</h4>
                <p>第一性原理思维要求我们回到问题的本质，而不是基于类比或经验进行推理。它鼓励我们质疑一切假设，从头开始构建解决方案。</p>
                <h4 class="text-white mt-4 mb-2">应用步骤</h4>
                <ol class="list-decimal pl-5 space-y-2">
                    <li>识别并质疑所有假设</li>
                    <li>分解问题至最基本的事实</li>
                    <li>从这些基本事实出发，重新构建解决方案</li>
                    <li>验证解决方案是否符合实际情况</li>
                </ol>
                <h4 class="text-white mt-4 mb-2">实际应用</h4>
                <p>在商业领域，埃隆·马斯克运用第一性原理思维，重新思考电动汽车电池的成本结构，最终使特斯拉汽车的电池成本大幅降低。</p>
            `
        },
        'bayesian-thinking': {
            title: '贝叶斯思维',
            content: `
                <p>贝叶斯思维是一种根据新信息不断更新对事物的看法，保持开放心态的思维方式。</p>
                <h4 class="text-white mt-4 mb-2">核心概念</h4>
                <p>贝叶斯思维基于贝叶斯定理，它告诉我们如何根据新证据更新我们对某个假设的置信度。简单来说，就是"观点应该随着事实而改变"。</p>
                <h4 class="text-white mt-4 mb-2">应用步骤</h4>
                <ol class="list-decimal pl-5 space-y-2">
                    <li>明确你的初始信念（先验概率）</li>
                    <li>收集新的相关信息</li>
                    <li>根据新信息更新你的信念（后验概率）</li>
                    <li>持续这个过程，保持开放的心态</li>
                </ol>
            `
        },
        'decision-tree': {
            title: '决策树',
            content: `
                <p>决策树是一种将决策过程分解为树形结构，帮助系统分析各种可能结果的工具。</p>
                <h4 class="text-white mt-4 mb-2">核心概念</h4>
                <p>决策树由节点和边组成，节点代表决策点或事件，边代表可能的选择或结果。</p>
                <h4 class="text-white mt-4 mb-2">应用步骤</h4>
                <ol class="list-decimal pl-5 space-y-2">
                    <li>明确决策目标</li>
                    <li>识别所有可能的决策选项</li>
                    <li>分析每个选项可能导致的结果</li>
                    <li>评估每个结果的概率和影响</li>
                    <li>选择最优路径</li>
                </ol>
            `
        },
        'swot': {
            title: 'SWOT分析',
            content: `
                <p>SWOT分析是一种从优势（Strengths）、劣势（Weaknesses）、机会（Opportunities）和威胁（Threats）四个方面全面分析问题的方法。</p>
                <h4 class="text-white mt-4 mb-2">核心概念</h4>
                <p>SWOT分析将内部因素（优势和劣势）与外部因素（机会和威胁）结合起来，帮助我们全面了解情况。</p>
                <h4 class="text-white mt-4 mb-2">应用步骤</h4>
                <ol class="list-decimal pl-5 space-y-2">
                    <li>列出所有内部优势</li>
                    <li>识别内部劣势</li>
                    <li>分析外部环境中的机会</li>
                    <li>识别潜在的威胁</li>
                    <li>结合四个方面，制定策略</li>
                </ol>
            `
        },
        '5w2h': {
            title: '5W2H分析法',
            content: `
                <p>5W2H分析法是一种通过What（是什么）、Why（为什么）、Who（谁）、When（何时）、Where（何地）、How（如何）、How much（多少）七个维度分析问题的方法。</p>
                <h4 class="text-white mt-4 mb-2">核心概念</h4>
                <p>5W2H分析法通过系统性地提出问题，帮助我们全面了解问题的各个方面。</p>
            `
        },
        'porter-five-forces': {
            title: '波特五力模型',
            content: `
                <p>波特五力模型是一种分析行业竞争结构的工具，包括供应商议价能力、购买者议价能力、新进入者威胁、替代品威胁和现有竞争者竞争程度五个方面。</p>
                <h4 class="text-white mt-4 mb-2">核心概念</h4>
                <p>波特五力模型帮助我们了解行业的竞争格局和盈利能力。</p>
            `
        }
    };
    
    modelDetailBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const modelId = this.getAttribute('data-model');
            const model = modelDetails[modelId];
            
            if (model) {
                modalTitle.textContent = model.title;
                modalContent.innerHTML = model.content;
                modelDetailModal.classList.remove('hidden');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    
    closeModalBtn.addEventListener('click', function() {
        modelDetailModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    modelDetailModal.addEventListener('click', function(e) {
        if (e.target === modelDetailModal) {
            modelDetailModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    // 登录功能
    const loginBtn = document.getElementById('login-btn');
    const mobileLoginBtn = document.getElementById('mobile-login-btn');
    const loginModal = document.getElementById('login-modal');
    const closeLoginModalBtn = document.getElementById('close-login-modal-btn');
    const loginForm = document.getElementById('login-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('password');
    
    loginBtn.addEventListener('click', function() {
        loginModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    });
    
    mobileLoginBtn.addEventListener('click', function() {
        loginModal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        mobileMenu.classList.add('hidden');
    });
    
    closeLoginModalBtn.addEventListener('click', function() {
        loginModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    loginModal.addEventListener('click', function(e) {
        if (e.target === loginModal) {
            loginModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    togglePasswordBtn.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        togglePasswordBtn.innerHTML = type === 'password' ? '<i class="fa fa-eye-slash"></i>' : '<i class="fa fa-eye"></i>';
    });

    // 登录表单提交
    loginForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const username = document.getElementById('username').value.trim();
        const password = document.getElementById('password').value;
        const loginText = document.getElementById('login-text');
        const loginLoading = document.getElementById('login-loading');
        const loginError = document.getElementById('login-error');
        const errorMessage = document.getElementById('error-message');

        // 显示加载状态
        loginText.classList.add('hidden');
        loginLoading.classList.remove('hidden');
        loginError.classList.add('hidden');

        try {
            // 调用登录API
            const result = await AuthAPI.login(username, password);

            if (result.success) {
                // 保存token和用户信息
                AuthAPI.saveToken(result.token);
                AuthAPI.saveUser(result.user);

                // 关闭模态框
                loginModal.classList.add('hidden');
                document.body.style.overflow = 'auto';

                // 检查是否是管理员
                if (result.user.role === 'admin') {
                    // 管理员跳转到后台管理页面
                    window.location.href = '/admin.html';
                } else {
                    // 普通用户更新登录按钮显示
                    updateLoginButton(result.user);
                    // 显示成功提示
                    showSuccessToast('登录成功');
                }
            } else {
                // 显示错误信息
                errorMessage.textContent = result.error || '登录失败，请重试';
                loginError.classList.remove('hidden');
            }
        } catch (error) {
            console.error('登录失败:', error);
            errorMessage.textContent = '网络错误，请重试';
            loginError.classList.remove('hidden');
        } finally {
            // 恢复按钮状态
            loginText.classList.remove('hidden');
            loginLoading.classList.add('hidden');
        }
    });

    // 更新登录按钮显示
    function updateLoginButton(user) {
        if (AuthAPI.isLoggedIn()) {
            // 已登录：显示用户名和下拉菜单
            loginBtn.innerHTML = `<i class="fa fa-user mr-2"></i>${user.username}`;
            loginBtn.onclick = showUserMenu;
            mobileLoginBtn.innerHTML = `<i class="fa fa-user mr-2"></i>${user.username}`;
            mobileLoginBtn.onclick = showUserMenu;
        }
    }

    // 显示用户菜单
    function showUserMenu() {
        // 简单实现：确认是否登出
        if (confirm('确定要登出吗？')) {
            AuthAPI.logout();
        }
    }

    // 显示成功提示
    function showSuccessToast(message) {
        const successToast = document.getElementById('success-toast');
        const successMessage = document.getElementById('success-message');
        successMessage.textContent = message;
        successToast.classList.remove('hidden');

        setTimeout(() => {
            successToast.classList.add('hidden');
        }, 3000);
    }

    // 页面加载时检查登录状态
    if (AuthAPI.isLoggedIn()) {
        const user = AuthAPI.getUser();
        if (user) {
            updateLoginButton(user);
        }
    }

    // 注册功能
    const registerLink = document.getElementById('register-link');
    const registerModal = document.getElementById('register-modal');
    const closeRegisterModalBtn = document.getElementById('close-register-modal-btn');
    const toggleRegPasswordBtn = document.getElementById('toggle-reg-password');
    const regPasswordInput = document.getElementById('reg-password');
    
    registerLink.addEventListener('click', function(e) {
        e.preventDefault();
        loginModal.classList.add('hidden');
        registerModal.classList.remove('hidden');
    });
    
    closeRegisterModalBtn.addEventListener('click', function() {
        registerModal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    });
    
    registerModal.addEventListener('click', function(e) {
        if (e.target === registerModal) {
            registerModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    });
    
    toggleRegPasswordBtn.addEventListener('click', function() {
        const type = regPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        regPasswordInput.setAttribute('type', type);
        toggleRegPasswordBtn.innerHTML = type === 'password' ? '<i class="fa fa-eye-slash"></i>' : '<i class="fa fa-eye"></i>';
    });

    // 注册表单提交
    const registerForm = document.getElementById('register-form');
    const regPasswordConfirmInput = document.getElementById('reg-confirm-password');

    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            const confirmPassword = regPasswordConfirmInput.value;
            const registerBtn = document.getElementById('register-btn');
            const registerText = document.getElementById('register-text');
            const registerLoading = document.getElementById('register-loading');
            const registerError = document.getElementById('register-error');
            const registerErrorMessage = document.getElementById('register-error-message');

            // 验证密码一致性
            if (password !== confirmPassword) {
                registerErrorMessage.textContent = '两次输入的密码不一致';
                registerError.classList.remove('hidden');
                return;
            }

            // 显示加载状态
            registerText.classList.add('hidden');
            registerLoading.classList.remove('hidden');
            registerError.classList.add('hidden');

            try {
                // 调用注册API
                const result = await AuthAPI.register(username, email, password);

                if (result.success) {
                    // 关闭注册模态框
                    registerModal.classList.add('hidden');
                    document.body.style.overflow = 'auto';

                    // 显示成功提示
                    showSuccessToast('注册成功，请登录');

                    // 自动切换到登录模态框
                    setTimeout(() => {
                        loginModal.classList.remove('hidden');
                        document.body.style.overflow = 'hidden';
                    }, 1000);
                } else {
                    // 显示错误信息
                    registerErrorMessage.textContent = result.error || '注册失败，请重试';
                    registerError.classList.remove('hidden');
                }
            } catch (error) {
                console.error('注册失败:', error);
                registerErrorMessage.textContent = '网络错误，请重试';
                registerError.classList.remove('hidden');
            } finally {
                // 恢复按钮状态
                registerText.classList.remove('hidden');
                registerLoading.classList.add('hidden');
            }
        });
    }

    // 键盘事件
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (!loginModal.classList.contains('hidden')) {
                loginModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            if (!registerModal.classList.contains('hidden')) {
                registerModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
            if (!modelDetailModal.classList.contains('hidden')) {
                modelDetailModal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        }
    });

    // ==================== 保存脚本到历史记录 ====================

    async function saveScriptToHistory(script, inputType, inputContent) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('未登录，跳过保存脚本');
            return;
        }

        try {
            const response = await fetch('/api/scripts', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: script.name || '认知脚本',
                    content: script,
                    input_type: inputType,
                    input_content: typeof inputContent === 'string' ? inputContent : JSON.stringify(inputContent)
                })
            });

            if (response.ok) {
                const data = await response.json();
                currentScriptId = data.script.id;
                console.log('脚本保存成功，ID:', currentScriptId);
            } else {
                console.error('保存脚本失败:', response.status);
            }
        } catch (error) {
            console.error('保存脚本失败:', error);
        }
    }

    // ==================== 大文件分片上传 v1.2 ====================

    // 全局上传状态管理
    let uploadState = {
        isPaused: false,
        isCancelled: false,
        fileId: null,
        startTime: null,
        uploadedSize: 0,
        lastUpdateSize: 0,
        lastUpdateTime: null
    };

    // 更新进度显示（支持圆环进度条、速度、剩余时间）
    function updateProgressV2(progress, text, status = '上传中') {
        // 传统进度条（保留兼容）
        const progressBar = document.getElementById('progress-bar');
        const progressText = document.getElementById('progress-text');

        if (progressBar) progressBar.style.width = progress + '%';
        if (progressText) progressText.textContent = text || `已完成 ${progress}%`;

        // 圆环进度条
        const progressCircle = document.getElementById('progress-circle');
        const progressPercent = document.getElementById('progress-percent');
        const progressStatus = document.getElementById('progress-status');

        if (progressCircle && progressPercent && progressStatus) {
            const circumference = 2 * Math.PI * 88; // r=88
            const offset = circumference - (progress / 100) * circumference;
            progressCircle.style.strokeDashoffset = offset;
            progressPercent.textContent = Math.round(progress) + '%';
            progressStatus.textContent = status;
        }
    }

    // 更新上传统计信息（速度、剩余时间、已上传大小）
    function updateUploadStats(uploadedSize, totalSize, startTime) {
        const uploadStats = document.getElementById('upload-stats');
        const uploadSpeedEl = document.getElementById('upload-speed');
        const remainingTimeEl = document.getElementById('remaining-time');
        const uploadedSizeEl = document.getElementById('uploaded-size');

        if (!uploadStats) return;

        // 计算上传速度
        const currentTime = Date.now();
        const elapsedSeconds = (currentTime - startTime) / 1000;

        if (elapsedSeconds > 0) {
            const speed = uploadedSize / elapsedSeconds; // bytes per second
            const speedMB = (speed / 1024 / 1024).toFixed(2);
            uploadSpeedEl.textContent = speedMB + ' MB/s';

            // 计算剩余时间
            const remainingSize = totalSize - uploadedSize;
            const remainingSeconds = remainingSize / speed;

            if (remainingSeconds > 0) {
                const minutes = Math.floor(remainingSeconds / 60);
                const seconds = Math.floor(remainingSeconds % 60);
                remainingTimeEl.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
            } else {
                remainingTimeEl.textContent = '即将完成';
            }
        }

        // 已上传大小
        const uploadedMB = (uploadedSize / 1024 / 1024).toFixed(2);
        uploadedSizeEl.textContent = uploadedMB + ' MB';
    }

    // 更新分片可视化
    function updateChunksVisualization(chunkStatus) {
        const chunksContainer = document.getElementById('chunks-container');
        if (!chunksContainer) return;

        chunksContainer.innerHTML = '';

        chunkStatus.forEach((status, index) => {
            const chunkEl = document.createElement('div');
            chunkEl.className = 'w-3 h-3 rounded-sm transition-all duration-200';

            if (status === 'completed') {
                chunkEl.classList.add('bg-success');
            } else if (status === 'uploading') {
                chunkEl.classList.add('bg-blue-500');
            } else if (status === 'failed') {
                chunkEl.classList.add('bg-error');
            } else {
                chunkEl.classList.add('bg-bg-black', 'border', 'border-border-gray');
            }

            chunkEl.title = `分片 ${index + 1}`;
            chunksContainer.appendChild(chunkEl);
        });
    }

    // 显示/隐藏上传控制面板
    function toggleUploadControls(show) {
        const uploadControls = document.getElementById('upload-controls');
        const uploadStats = document.getElementById('upload-stats');
        const chunksVisualization = document.getElementById('chunks-visualization');

        if (uploadControls) uploadControls.classList.toggle('hidden', !show);
        if (uploadStats) uploadStats.classList.toggle('hidden', !show);
        if (chunksVisualization) chunksVisualization.classList.toggle('hidden', !show);
    }

    // 保存上传状态到 localStorage（断点续传）
    function saveUploadState(fileId, chunkStatus, fileName, fileSize) {
        const state = {
            fileId,
            chunkStatus,
            fileName,
            fileSize,
            timestamp: Date.now()
        };
        localStorage.setItem(`upload_${fileId}`, JSON.stringify(state));
    }

    // 加载上传状态（断点续传）
    function loadUploadState(fileId) {
        const saved = localStorage.getItem(`upload_${fileId}`);
        if (!saved) return null;

        try {
            const state = JSON.parse(saved);
            // 检查是否过期（24小时）
            if (Date.now() - state.timestamp > 24 * 60 * 60 * 1000) {
                localStorage.removeItem(`upload_${fileId}`);
                return null;
            }
            return state;
        } catch {
            return null;
        }
    }

    // 清除上传状态
    function clearUploadState(fileId) {
        localStorage.removeItem(`upload_${fileId}`);
    }

    async function uploadLargeFile(file, content) {
        console.log('📦 开始大文件分片上传 v1.5（豆包优化版）:', file.name, file.size);

        // 豆包建议的核心配置优化
        const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB/分片（保持不变）
        const MAX_CONCURRENT = 1; // 关键：将并发数从3降到1，避免连接耗尽
        const MAX_RETRY = 3; // 每个分片最多重试3次
        const REQUEST_TIMEOUT = 120000; // 超时时间延长到2分钟（120秒）

        const totalSize = file.size;
        const totalChunks = Math.ceil(totalSize / CHUNK_SIZE);

        console.log(`📊 分片配置: 大小=${(CHUNK_SIZE / 1024 / 1024).toFixed(1)}MB, 并发=${MAX_CONCURRENT}, 总分片=${totalChunks}, 重试次数=${MAX_RETRY}, 超时=${REQUEST_TIMEOUT/1000}秒`);

        // 生成文件ID（使用文件名和大小作为种子，确保同一文件有相同ID）
        const fileHash = file.name + '_' + file.size;
        // 使用支持Unicode的Base64编码，避免中文字符导致btoa错误
        const fileId = 'file_' + btoa(unescape(encodeURIComponent(fileHash))).substring(0, 20);
        console.log('🆔 文件ID:', fileId);

        // 初始化上传状态
        uploadState = {
            isPaused: false,
            isCancelled: false,
            fileId,
            startTime: Date.now(),
            uploadedSize: 0,
            lastUpdateSize: 0,
            lastUpdateTime: Date.now()
        };

        let uploadedChunks = 0;
        let failedChunks = [];

        // 显示上传控制面板
        toggleUploadControls(true);

        // 更新进度显示函数
        function updateUploadProgress() {
            const progress = (uploadedChunks / totalChunks) * 100;
            const remainingChunks = totalChunks - uploadedChunks;
            updateProgressV2(
                Math.min(progress, 90),
                `正在上传分片 (${uploadedChunks}/${totalChunks})，剩余 ${remainingChunks} 片...`,
                '上传中'
            );

            // 更新统计信息
            const uploadedSize = uploadedChunks * CHUNK_SIZE;
            updateUploadStats(uploadedSize, totalSize, uploadState.startTime);
        }

        // 豆包建议的分片上传核心方法（带重试和超时）
        async function uploadChunkWithRetry(chunkIndex) {
            let retryCount = 0;

            while (retryCount < MAX_RETRY) {
                try {
                    const start = chunkIndex * CHUNK_SIZE;
                    const end = Math.min(start + CHUNK_SIZE, totalSize);
                    const chunk = file.slice(start, end);

                    // 构建表单数据
                    const formData = new FormData();
                    formData.append('file', chunk);
                    formData.append('fileId', fileId);
                    formData.append('chunkIndex', chunkIndex.toString());
                    formData.append('totalChunks', totalChunks.toString());

                    // 豆包建议：构建请求（带超时控制）
                    const abortController = new AbortController();
                    const timeoutId = setTimeout(() => abortController.abort(), REQUEST_TIMEOUT);

                    const response = await fetch('/api/upload-chunk', {
                        method: 'POST',
                        body: formData,
                        signal: abortController.signal,
                        // 豆包建议：禁用缓存，避免连接复用问题
                        headers: {
                            'Cache-Control': 'no-cache',
                            'Pragma': 'no-cache'
                        }
                    });

                    clearTimeout(timeoutId);

                    if (!response.ok) {
                        throw new Error(`分片${chunkIndex}上传失败，状态码：${response.status}`);
                    }

                    const result = await response.json();
                    if (!result.success) {
                        throw new Error(`分片${chunkIndex}上传失败：${result.error}`);
                    }

                    // 分片上传成功
                    uploadedChunks++;
                    console.log(`✅ 分片 ${chunkIndex+1}/${totalChunks} 上传成功`, result);
                    updateUploadProgress();
                    return true;

                } catch (error) {
                    retryCount++;
                    console.warn(`⚠️ 分片${chunkIndex}上传失败（第${retryCount}次重试）：`, error.message);

                    // 豆包建议：重试间隔（指数退避）
                    if (retryCount < MAX_RETRY) {
                        const delay = 1000 * Math.pow(2, retryCount);
                        console.log(`⏱️ 等待 ${delay}ms 后重试...`);
                        await new Promise(resolve => setTimeout(resolve, delay));
                    }
                }
            }

            // 所有重试都失败
            failedChunks.push(chunkIndex);
            console.error(`❌ 分片${chunkIndex}上传失败（已重试${MAX_RETRY}次）`);
            return false;
        }

        try {
            // 豆包建议：串行上传所有分片（降低并发避免连接耗尽）
            console.log(`📊 开始串行上传 ${totalChunks} 个分片...`);
            updateProgressV2(5, '正在准备分片...', '准备中');

            for (let i = 0; i < totalChunks; i++) {
                // 检查是否取消
                if (uploadState.isCancelled) {
                    throw new Error('上传已取消');
                }

                // 检查是否暂停
                while (uploadState.isPaused) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }

                await uploadChunkWithRetry(i);
            }

            // 豆包建议：检查是否有失败的分片
            if (failedChunks.length > 0) {
                throw new Error(
                    `部分分片上传失败 (${uploadedChunks}/${totalChunks})，失败分片：[${failedChunks.map(i => i+1).join(',')}]，请重试`
                );
            }

            // 豆包建议：所有分片上传成功，请求合并
            console.log("✅ 所有分片上传完成，请求合并文件...");
            updateProgressV2(90, '正在合并文件...', '合并中');

            const mergeResult = await mergeFile(fileId);

            // 检测是否是扫描型PDF，自动切换到OCR识别模式
            if (mergeResult.isScannedPDF && file.type.includes('pdf')) {
                console.log('🔍 检测到扫描型PDF，自动切换到OCR识别模式...');
                updateProgressV2(95, '检测到扫描型PDF，正在启动OCR识别...', 'OCR识别中');
                const ocrResult = await processScannedPDF(file);
                console.log('✅ 扫描版OCR识别完成');
                return ocrResult;
            }

            console.log('✅ 大文件上传成功');
            return mergeResult;

        } finally {
            // 清理上传状态
            toggleUploadControls(false);
        }
    }

    // 豆包建议的合并文件函数（优化超时）
    async function mergeFile(fileId) {
        try {
            const abortController = new AbortController();
            const timeoutId = setTimeout(() => abortController.abort(), 120000); // 2分钟超时

            const response = await fetch('/api/merge-file', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({ fileId }),
                signal: abortController.signal
            });

            clearTimeout(timeoutId);
            const rawText = await response.text();
            let result;
            try {
                result = JSON.parse(rawText);
            } catch (e) {
                throw new Error(`合并接口返回非JSON：${rawText.substring(0, 200)}`);
            }

            if (!result.success) {
                throw new Error(`合并失败：${result.error}`);
            }

            return result;
        } catch (error) {
            throw new Error(`合并文件失败：${error.message}`);
        }
    }

    // ==================== 上传控制按钮事件 ====================

    // 暂停按钮
    document.getElementById('pause-btn')?.addEventListener('click', () => {
        if (uploadState.fileId) {
            uploadState.isPaused = true;
            document.getElementById('pause-btn').classList.add('hidden');
            document.getElementById('resume-btn').classList.remove('hidden');
            updateProgressV2(parseFloat(document.getElementById('progress-percent').textContent), '上传已暂停', '已暂停');
            console.log('⏸️ 上传已暂停');
        }
    });

    // 继续按钮
    document.getElementById('resume-btn')?.addEventListener('click', () => {
        if (uploadState.fileId) {
            uploadState.isPaused = false;
            document.getElementById('resume-btn').classList.add('hidden');
            document.getElementById('pause-btn').classList.remove('hidden');
            console.log('▶️ 上传已继续');
        }
    });

    // 取消按钮
    document.getElementById('cancel-btn')?.addEventListener('click', () => {
        if (uploadState.fileId && confirm('确定要取消上传吗？已上传的分片将保留，下次上传时会自动恢复。')) {
            uploadState.isCancelled = true;
            uploadState.isPaused = false;
            toggleUploadControls(false);
            resetToInput();
            console.log('❌ 上传已取消');
        }
    });

    // 初始化GSAP动画
    if (typeof gsap !== 'undefined') {
        gsap.from('h1', {
            opacity: 0,
            y: 30,
            duration: 1,
            delay: 0.2
        });
        
        gsap.from('.text-xl', {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 0.6
        });
    }
});
