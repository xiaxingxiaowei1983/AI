// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
    // 检查登录状态和权限
    checkAuthAndRedirect();

    // 加载管理员信息
    loadAdminInfo();

    // 加载仪表盘数据
    loadDashboardData();

    // 侧边栏导航
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            switchPage(page);
        });
    });

    // 登出按钮
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            if (confirm('确定要退出登录吗？')) {
                AuthAPI.clearToken();
                AuthAPI.clearToken();
                window.location.href = '/index.html';
            }
        });
    }

    // 刷新用户列表按钮
    const refreshUsersBtn = document.getElementById('refresh-users-btn');
    if (refreshUsersBtn) {
        refreshUsersBtn.addEventListener('click', loadUsersTable);
    }

    // 添加API配置按钮
    const addApiConfigBtn = document.getElementById('add-api-config-btn');
    if (addApiConfigBtn) {
        addApiConfigBtn.addEventListener('click', showAddApiConfigDialog);
    }

    // 测试LLM连接按钮
    const testLlmBtn = document.getElementById('test-llm-btn');
    if (testLlmBtn) {
        testLlmBtn.addEventListener('click', testLlmConnection);
    }

    // 保存LLM配置按钮
    const saveLlmConfigBtn = document.getElementById('save-llm-config-btn');
    if (saveLlmConfigBtn) {
        saveLlmConfigBtn.addEventListener('click', saveLlmConfig);
    }

    // 添加思维模型按钮
    const addThinkingModelBtn = document.getElementById('add-thinking-model-btn');
    if (addThinkingModelBtn) {
        addThinkingModelBtn.addEventListener('click', showThinkingModelModal);
    }

    // 思维模型弹窗事件
    const cancelModelBtn = document.getElementById('cancel-model-btn');
    const saveModelBtn = document.getElementById('save-model-btn');
    if (cancelModelBtn) {
        cancelModelBtn.addEventListener('click', hideThinkingModelModal);
    }
    if (saveModelBtn) {
        saveModelBtn.addEventListener('click', saveThinkingModel);
    }
});

// 检查登录状态和权限
function checkAuthAndRedirect() {
    if (!AuthAPI.isLoggedIn()) {
        alert('请先登录');
        window.location.href = '/index.html';
        return;
    }

    const user = AuthAPI.getUser();
    if (!user || user.role !== 'admin') {
        alert('无权访问后台管理系统');
        window.location.href = '/index.html';
    }
}

// 加载管理员信息
function loadAdminInfo() {
    const user = AuthAPI.getUser();
    if (user) {
        const usernameEl = document.getElementById('admin-username');
        const emailEl = document.getElementById('admin-email');
        if (usernameEl) usernameEl.textContent = user.username;
        if (emailEl) emailEl.textContent = user.email;
    }
}

// 切换页面
function switchPage(pageName) {
    // 更新侧边栏激活状态
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    sidebarLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('data-page') === pageName) {
            link.classList.add('active');
        }
    });

    // 更新页面标题
    const pageTitle = document.getElementById('page-title');
    const pageTitles = {
        dashboard: '仪表盘',
        users: '用户管理',
        'api-configs': 'API配置',
        'llm-models': 'LLM模型',
        'thinking-models': '思维模型',
        stats: '数据统计',
        settings: '系统设置'
    };
    if (pageTitle) {
        pageTitle.textContent = pageTitles[pageName] || '仪表盘';
    }

    // 隐藏所有页面
    const pageSections = document.querySelectorAll('.page-section');
    pageSections.forEach(section => {
        section.classList.add('hidden');
    });

    // 显示目标页面
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.remove('hidden');
    }

    // 根据页面加载数据
    if (pageName === 'dashboard') {
        loadDashboardData();
    } else if (pageName === 'users') {
        loadUsersTable();
    } else if (pageName === 'api-configs') {
        loadApiConfigs();
    } else if (pageName === 'llm-models') {
        loadLlmConfig();
    } else if (pageName === 'thinking-models') {
        loadThinkingModels();
    }
}

// 加载仪表盘数据
async function loadDashboardData() {
    try {
        // 这里应该调用后端API获取统计数据
        // 暂时使用模拟数据
        document.getElementById('total-users').textContent = '0';
        document.getElementById('today-users').textContent = '0';
        document.getElementById('total-process').textContent = '0';

        // 加载最近用户
        await loadRecentUsers();
    } catch (error) {
        console.error('加载仪表盘数据失败:', error);
    }
}

// 加载最近用户
async function loadRecentUsers() {
    try {
        const response = await fetch('/api/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const users = data.users || [];
            displayRecentUsers(users.slice(0, 5)); // 只显示最近5个
        }
    } catch (error) {
        console.error('加载最近用户失败:', error);
    }
}

// 显示最近用户
function displayRecentUsers(users) {
    const tableBody = document.getElementById('recent-users-table');
    if (!tableBody) return;

    if (users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="4" class="py-8 text-center text-text-gray">暂无用户</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = users.map(user => `
        <tr class="border-b border-border-gray table-row">
            <td class="py-3 px-4">${escapeHtml(user.username)}</td>
            <td class="py-3 px-4 text-text-gray">${escapeHtml(user.email)}</td>
            <td class="py-3 px-4">
                ${user.role === 'admin' 
                    ? '<span class="px-2 py-1 bg-warning text-black text-xs rounded">管理员</span>' 
                    : '<span class="px-2 py-1 bg-bg-gray text-text-gray text-xs rounded">普通用户</span>'}
            </td>
            <td class="py-3 px-4 text-text-gray text-sm">${formatDate(user.createdAt)}</td>
        </tr>
    `).join('');

    // 更新统计
    document.getElementById('total-users').textContent = users.length;
}

// 加载用户列表
async function loadUsersTable() {
    try {
        const response = await fetch('/api/admin/users', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayUsersTable(data.users || []);
        } else {
            showToast('加载用户列表失败', 'error');
        }
    } catch (error) {
        console.error('加载用户列表失败:', error);
        showToast('网络错误', 'error');
    }
}

// 显示用户列表
function displayUsersTable(users) {
    const tableBody = document.getElementById('users-table');
    if (!tableBody) return;

    if (users.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7" class="py-8 text-center text-text-gray">暂无用户</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = users.map(user => `
        <tr class="border-b border-border-gray table-row">
            <td class="py-3 px-4 text-text-gray text-sm font-mono">${user.id.substring(0, 8)}...</td>
            <td class="py-3 px-4 font-medium">${escapeHtml(user.username)}</td>
            <td class="py-3 px-4 text-text-gray">${escapeHtml(user.email)}</td>
            <td class="py-3 px-4">
                ${user.role === 'admin' 
                    ? '<span class="px-2 py-1 bg-warning text-black text-xs rounded">管理员</span>' 
                    : '<span class="px-2 py-1 bg-bg-gray text-text-gray text-xs rounded">普通用户</span>'}
            </td>
            <td class="py-3 px-4">
                ${user.isActive 
                    ? '<span class="px-2 py-1 bg-success text-white text-xs rounded">正常</span>' 
                    : '<span class="px-2 py-1 bg-error text-white text-xs rounded">禁用</span>'}
            </td>
            <td class="py-3 px-4 text-text-gray text-sm">${formatDate(user.createdAt)}</td>
            <td class="py-3 px-4">
                <div class="flex space-x-2">
                    ${user.email !== '10919669@qq.com' ? `
                        <button onclick="toggleUserRole('${user.id}', '${user.role}')" class="text-text-gray hover:text-white transition-colors text-sm" title="切换角色">
                            <i class="fa fa-user-circle"></i>
                        </button>
                        <button onclick="toggleUserStatus('${user.id}', '${user.isActive}')" class="text-text-gray hover:text-white transition-colors text-sm" title="${user.isActive ? '禁用' : '启用'}">
                            <i class="fa fa-${user.isActive ? 'ban' : 'check'}"></i>
                        </button>
                        <button onclick="deleteUser('${user.id}')" class="text-error hover:text-red-400 transition-colors text-sm" title="删除">
                            <i class="fa fa-trash"></i>
                        </button>
                    ` : `
                        <span class="text-text-gray text-xs">不可操作</span>
                    `}
                </div>
            </td>
        </tr>
    `).join('');
}

// 切换用户角色
async function toggleUserRole(userId, currentRole) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    if (!confirm(`确定要将该用户设置为${newRole === 'admin' ? '管理员' : '普通用户'}吗？`)) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/users/${userId}/role`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: newRole })
        });

        if (response.ok) {
            showToast('角色更新成功');
            loadUsersTable();
        } else {
            showToast('角色更新失败', 'error');
        }
    } catch (error) {
        console.error('更新角色失败:', error);
        showToast('网络错误', 'error');
    }
}

// 切换用户状态
async function toggleUserStatus(userId, currentStatus) {
    const newStatus = !currentStatus;
    if (!confirm(`确定要${newStatus ? '启用' : '禁用'}该用户吗？`)) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/users/${userId}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isActive: newStatus })
        });

        if (response.ok) {
            showToast('状态更新成功');
            loadUsersTable();
        } else {
            showToast('状态更新失败', 'error');
        }
    } catch (error) {
        console.error('更新状态失败:', error);
        showToast('网络错误', 'error');
    }
}

// 删除用户
async function deleteUser(userId) {
    if (!confirm('确定要删除该用户吗？此操作不可恢复！')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/users/${userId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            showToast('删除成功');
            loadUsersTable();
        } else {
            showToast('删除失败', 'error');
        }
    } catch (error) {
        console.error('删除用户失败:', error);
        showToast('网络错误', 'error');
    }
}

// 显示提示
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');

    if (!toast || !toastMessage) return;

    toast.className = `fixed top-4 right-4 ${type === 'success' ? 'bg-success' : 'bg-error'} text-white px-6 py-3 rounded-lg shadow-lg z-50`;
    toastMessage.textContent = message;
    toast.classList.remove('hidden');

    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000);
}

// ==================== API配置管理 ====================

// 加载API配置
async function loadApiConfigs() {
    try {
        const response = await fetch('/api/admin/api-configs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayApiConfigs(data.configs || []);
        } else {
            showToast('加载API配置失败', 'error');
        }
    } catch (error) {
        console.error('加载API配置失败:', error);
        showToast('网络错误', 'error');
    }
}

// 显示API配置
function displayApiConfigs(configs) {
    const tableBody = document.getElementById('api-configs-table');
    if (!tableBody) return;

    if (configs.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="6" class="py-8 text-center text-text-gray">暂无配置</td>
            </tr>
        `;
        return;
    }

    tableBody.innerHTML = configs.map(config => `
        <tr class="border-b border-border-gray table-row">
            <td class="py-3 px-4 font-medium">${escapeHtml(config.configKey)}</td>
            <td class="py-3 px-4 text-text-gray text-sm font-mono">${config.isEncrypted ? '******' : escapeHtml(config.configValue.substring(0, 50))}${config.configValue.length > 50 ? '...' : ''}</td>
            <td class="py-3 px-4 text-text-gray text-sm">${escapeHtml(config.description || '-')}</td>
            <td class="py-3 px-4">
                ${config.isEncrypted
                    ? '<span class="px-2 py-1 bg-warning text-black text-xs rounded">是</span>'
                    : '<span class="px-2 py-1 bg-bg-gray text-text-gray text-xs rounded">否</span>'}
            </td>
            <td class="py-3 px-4 text-text-gray text-sm">${formatDate(config.updatedAt)}</td>
            <td class="py-3 px-4">
                <div class="flex space-x-2">
                    <button onclick="editApiConfig('${config.id}')" class="text-text-gray hover:text-white transition-colors text-sm" title="编辑">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button onclick="deleteApiConfig('${config.id}')" class="text-error hover:text-red-400 transition-colors text-sm" title="删除">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 显示添加API配置对话框
function showAddApiConfigDialog() {
    const configKey = prompt('请输入配置键:');
    if (!configKey) return;

    const configValue = prompt('请输入配置值:');
    if (!configValue) return;

    const description = prompt('请输入描述(可选):') || '';

    const isEncrypted = confirm('是否加密存储该配置?');

    createApiConfig(configKey, configValue, description, isEncrypted);
}

// 创建API配置
async function createApiConfig(configKey, configValue, description, isEncrypted) {
    try {
        const response = await fetch('/api/admin/api-configs', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                configKey,
                configValue,
                description,
                isEncrypted
            })
        });

        if (response.ok) {
            showToast('API配置创建成功');
            loadApiConfigs();
        } else {
            const data = await response.json();
            showToast(data.error || '创建失败', 'error');
        }
    } catch (error) {
        console.error('创建API配置失败:', error);
        showToast('网络错误', 'error');
    }
}

// 编辑API配置
async function editApiConfig(configId) {
    const configValue = prompt('请输入新的配置值:');
    if (!configValue) return;

    const description = prompt('请输入新的描述(可选):') || '';

    updateApiConfig(configId, configValue, description);
}

// 更新API配置
async function updateApiConfig(configId, configValue, description) {
    try {
        const response = await fetch(`/api/admin/api-configs/${configId}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                configValue,
                description
            })
        });

        if (response.ok) {
            showToast('API配置更新成功');
            loadApiConfigs();
        } else {
            const data = await response.json();
            showToast(data.error || '更新失败', 'error');
        }
    } catch (error) {
        console.error('更新API配置失败:', error);
        showToast('网络错误', 'error');
    }
}

// 删除API配置
async function deleteApiConfig(configId) {
    if (!confirm('确定要删除该配置吗？')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/api-configs/${configId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            showToast('API配置删除成功');
            loadApiConfigs();
        } else {
            showToast('删除失败', 'error');
        }
    } catch (error) {
        console.error('删除API配置失败:', error);
        showToast('网络错误', 'error');
    }
}

// ==================== LLM模型配置 ====================

// 加载LLM配置
async function loadLlmConfig() {
    try {
        const response = await fetch('/api/admin/api-configs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const configs = data.configs || [];

            // 填充表单（按照扣子规则）
            const modelConfig = configs.find(c => c.configKey === 'llm_model');
            const temperatureConfig = configs.find(c => c.configKey === 'llm_temperature');
            const thinkingConfig = configs.find(c => c.configKey === 'llm_thinking');
            const cachingConfig = configs.find(c => c.configKey === 'llm_caching');

            if (document.getElementById('llm-model')) {
                document.getElementById('llm-model').value = modelConfig?.configValue || 'doubao-seed-1-8-251228';
            }
            if (document.getElementById('llm-temperature')) {
                document.getElementById('llm-temperature').value = temperatureConfig?.configValue || '1.0';
            }
            if (document.getElementById('llm-thinking')) {
                document.getElementById('llm-thinking').value = thinkingConfig?.configValue || 'disabled';
            }
            if (document.getElementById('llm-caching')) {
                document.getElementById('llm-caching').value = cachingConfig?.configValue || 'disabled';
            }
        }
    } catch (error) {
        console.error('加载LLM配置失败:', error);
    }
}

// 保存LLM配置
async function saveLlmConfig() {
    const model = document.getElementById('llm-model').value;
    const temperature = document.getElementById('llm-temperature').value;
    const thinking = document.getElementById('llm-thinking').value;
    const caching = document.getElementById('llm-caching').value;

    const configs = [
        { key: 'llm_model', value: model, desc: '模型ID' },
        { key: 'llm_temperature', value: temperature, desc: '温度参数（0-2）' },
        { key: 'llm_thinking', value: thinking, desc: '思维模式（enabled/disabled）' },
        { key: 'llm_caching', value: caching, desc: '缓存模式（enabled/disabled）' }
    ];

    try {
        const response = await fetch('/api/admin/api-configs', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const existingConfigs = data.configs || [];

            // 更新或创建配置
            for (const config of configs) {
                const existing = existingConfigs.find(c => c.configKey === config.key);
                if (existing) {
                    await updateApiConfig(existing.id, config.value, config.desc);
                } else {
                    await createApiConfig(config.key, config.value, config.desc, false);
                }
            }

            showToast('LLM配置保存成功');
        }
    } catch (error) {
        console.error('保存LLM配置失败:', error);
        showToast('保存失败', 'error');
    }
}

// 测试LLM连接
async function testLlmConnection() {
    showToast('测试中，请稍候...');

    try {
        const response = await fetch('/api/test-llm', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            showToast(`LLM连接测试成功！使用模型：${data.response.model}`);
            console.log('LLM响应:', data.response.content);
        } else {
            const data = await response.json();
            showToast(data.error || 'LLM连接测试失败', 'error');
        }
    } catch (error) {
        console.error('测试LLM连接失败:', error);
        showToast('测试失败', 'error');
    }
}

// ==================== 思维模型管理 ====================

let currentEditingModelId = null;

// 加载思维模型
async function loadThinkingModels() {
    try {
        const response = await fetch('/api/thinking-models', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayThinkingModels(data.models || []);
        } else {
            showToast('加载思维模型失败', 'error');
        }
    } catch (error) {
        console.error('加载思维模型失败:', error);
        showToast('网络错误', 'error');
    }
}

// 显示思维模型
function displayThinkingModels(models) {
    const grid = document.getElementById('thinking-models-grid');
    if (!grid) return;

    if (models.length === 0) {
        grid.innerHTML = `
            <div class="text-center py-12 col-span-full">
                <i class="fa fa-lightbulb-o text-6xl text-text-gray mb-4"></i>
                <p class="text-text-gray">暂无思维模型</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = models.map(model => `
        <div class="bg-bg-gray border border-border-gray rounded-lg p-6 hover:border-primary transition-colors">
            <div class="flex items-start justify-between mb-4">
                <div class="w-12 h-12 rounded-full bg-bg-dark flex items-center justify-center">
                    <i class="fa ${model.icon || 'fa-lightbulb-o'} text-2xl text-primary"></i>
                </div>
                <div class="flex space-x-2">
                    <button onclick="editThinkingModel('${model.id}')" class="text-text-gray hover:text-white transition-colors text-sm">
                        <i class="fa fa-edit"></i>
                    </button>
                    <button onclick="deleteThinkingModel('${model.id}')" class="text-error hover:text-red-400 transition-colors text-sm">
                        <i class="fa fa-trash"></i>
                    </button>
                </div>
            </div>
            <h4 class="font-medium mb-2">${escapeHtml(model.name)}</h4>
            <p class="text-text-gray text-sm mb-4">${escapeHtml(model.description || '')}</p>
            <div class="flex items-center justify-between text-xs">
                <span class="px-2 py-1 bg-bg-dark rounded text-text-gray">${escapeHtml(model.category || '其他')}</span>
                ${model.isActive ? '<span class="text-success">启用</span>' : '<span class="text-error">禁用</span>'}
            </div>
        </div>
    `).join('');
}

// 显示思维模型弹窗
function showThinkingModelModal(modelId = null) {
    const modal = document.getElementById('thinking-model-modal');
    const title = document.getElementById('model-modal-title');

    if (modelId) {
        currentEditingModelId = modelId;
        title.textContent = '编辑思维模型';

        // 加载模型数据
        loadThinkingModelData(modelId);
    } else {
        currentEditingModelId = null;
        title.textContent = '添加思维模型';

        // 清空表单
        document.getElementById('model-name').value = '';
        document.getElementById('model-category').value = '决策';
        document.getElementById('model-icon').value = 'fa-lightbulb-o';
        document.getElementById('model-description').value = '';
        document.getElementById('model-content').value = '';
        document.getElementById('model-examples').value = '';
        document.getElementById('model-sort-order').value = '0';
    }

    modal.classList.remove('hidden');
}

// 隐藏思维模型弹窗
function hideThinkingModelModal() {
    const modal = document.getElementById('thinking-model-modal');
    modal.classList.add('hidden');
    currentEditingModelId = null;
}

// 加载思维模型数据
async function loadThinkingModelData(modelId) {
    try {
        const response = await fetch(`/api/thinking-models/${modelId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const model = data.model;

            document.getElementById('model-name').value = model.name || '';
            document.getElementById('model-category').value = model.category || '决策';
            document.getElementById('model-icon').value = model.icon || 'fa-lightbulb-o';
            document.getElementById('model-description').value = model.description || '';
            document.getElementById('model-content').value = model.content || '';
            document.getElementById('model-examples').value = model.examples ? JSON.stringify(model.examples, null, 2) : '';
            document.getElementById('model-sort-order').value = model.sortOrder || 0;
        }
    } catch (error) {
        console.error('加载思维模型数据失败:', error);
    }
}

// 保存思维模型
async function saveThinkingModel() {
    const name = document.getElementById('model-name').value;
    const category = document.getElementById('model-category').value;
    const icon = document.getElementById('model-icon').value;
    const description = document.getElementById('model-description').value;
    const content = document.getElementById('model-content').value;
    const examples = document.getElementById('model-examples').value;
    const sortOrder = parseInt(document.getElementById('model-sort-order').value) || 0;

    if (!name || !content) {
        showToast('请填写必填字段', 'error');
        return;
    }

    let examplesJson;
    try {
        examplesJson = examples ? JSON.parse(examples) : null;
    } catch (error) {
        showToast('示例格式错误，请使用有效的JSON格式', 'error');
        return;
    }

    const modelData = {
        name,
        category,
        icon,
        description,
        content,
        examples: examplesJson,
        sortOrder,
        isActive: true
    };

    try {
        const url = currentEditingModelId
            ? `/api/admin/thinking-models/${currentEditingModelId}`
            : '/api/admin/thinking-models';

        const response = await fetch(url, {
            method: currentEditingModelId ? 'PUT' : 'POST',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(modelData)
        });

        if (response.ok) {
            showToast(currentEditingModelId ? '思维模型更新成功' : '思维模型创建成功');
            hideThinkingModelModal();
            loadThinkingModels();
        } else {
            const data = await response.json();
            showToast(data.error || '保存失败', 'error');
        }
    } catch (error) {
        console.error('保存思维模型失败:', error);
        showToast('网络错误', 'error');
    }
}

// 编辑思维模型
function editThinkingModel(modelId) {
    showThinkingModelModal(modelId);
}

// 删除思维模型
async function deleteThinkingModel(modelId) {
    if (!confirm('确定要删除该思维模型吗？')) {
        return;
    }

    try {
        const response = await fetch(`/api/admin/thinking-models/${modelId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${AuthAPI.getToken()}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            showToast('思维模型删除成功');
            loadThinkingModels();
        } else {
            showToast('删除失败', 'error');
        }
    } catch (error) {
        console.error('删除思维模型失败:', error);
        showToast('网络错误', 'error');
    }
}

// ==================== 工具函数 ====================

// HTML转义
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// 转义HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// 格式化日期
function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
    });
}
