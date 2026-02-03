// ==================== 脚本管理功能 ====================

// 全局变量
let currentUser = null;
let currentScriptId = null;

// 初始化
document.addEventListener('DOMContentLoaded', function() {
    try {
        checkLoginStatus();
    } catch (error) {
        console.error('检查登录状态失败:', error);
    }
    try {
        initScriptManagement();
    } catch (error) {
        console.error('初始化脚本管理失败:', error);
    }
    try {
        initStatsSection();
    } catch (error) {
        console.error('初始化统计section失败:', error);
    }
    try {
        initUserMenu();
    } catch (error) {
        console.error('初始化用户菜单失败:', error);
    }
});

// 检查登录状态
async function checkLoginStatus() {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    try {
        const response = await fetch('/api/auth/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            currentUser = data.user;
            updateUIForLoggedInUser();
        } else {
            localStorage.removeItem('token');
        }
    } catch (error) {
        console.error('检查登录状态失败:', error);
        localStorage.removeItem('token');
    }
}

// 更新登录后的UI
function updateUIForLoggedInUser() {
    // 隐藏登录按钮
    document.getElementById('login-btn').classList.add('hidden');

    // 显示用户菜单
    const userMenu = document.getElementById('user-menu');
    userMenu.classList.remove('hidden');

    // 更新用户名
    document.getElementById('user-name').textContent = currentUser.username || currentUser.email;
    document.getElementById('dropdown-user-email').textContent = currentUser.email;

    // 如果是管理员，显示管理后台链接
    if (currentUser.role === 'admin') {
        document.getElementById('admin-link').classList.remove('hidden');
        document.getElementById('admin-link').classList.add('flex');
    }
}

// 初始化用户菜单
function initUserMenu() {
    const userMenuBtn = document.getElementById('user-menu-btn');
    const userDropdown = document.getElementById('user-dropdown');

    if (!userMenuBtn || !userDropdown) {
        console.warn('用户菜单元素不存在，跳过初始化');
        return;
    }

    userMenuBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        userDropdown.classList.toggle('hidden');
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', function(e) {
        if (!userMenuBtn.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.add('hidden');
        }
    });

    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', async function() {
            localStorage.removeItem('token');
            currentUser = null;

            // 重置UI
            const loginBtn = document.getElementById('login-btn');
            if (loginBtn) loginBtn.classList.remove('hidden');
            const userMenu = document.getElementById('user-menu');
            if (userMenu) userMenu.classList.add('hidden');

            // 隐藏脚本管理和统计section
            const scriptsSection = document.getElementById('scripts-section');
            const favoritesSection = document.getElementById('favorites-section');
            const statsSection = document.getElementById('stats-section');
            if (scriptsSection) scriptsSection.classList.add('hidden');
            if (favoritesSection) favoritesSection.classList.add('hidden');
            if (statsSection) statsSection.classList.add('hidden');

            alert('已退出登录');
            window.location.reload();
        });
    }
}

// ==================== 脚本管理 ====================

function initScriptManagement() {
    const scriptsHistoryTab = document.getElementById('scripts-history-tab');
    const scriptsFavoritesTab = document.getElementById('scripts-favorites-tab');

    if (!scriptsHistoryTab || !scriptsFavoritesTab) {
        console.warn('脚本管理tab元素不存在，跳过初始化');
        return;
    }

    scriptsHistoryTab.addEventListener('click', function() {
        loadScripts('history');
    });

    scriptsFavoritesTab.addEventListener('click', function() {
        loadScripts('favorites');
    });
}

// 加载脚本列表
async function loadScripts(type) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('请先登录');
        return;
    }

    const scriptsSection = document.getElementById('scripts-section');
    const favoritesSection = document.getElementById('favorites-section');

    if (type === 'history') {
        scriptsSection.classList.remove('hidden');
        favoritesSection.classList.add('hidden');

        document.getElementById('scripts-history-tab').classList.add('bg-white', 'text-black');
        document.getElementById('scripts-history-tab').classList.remove('text-text-gray');
        document.getElementById('scripts-favorites-tab').classList.remove('bg-white', 'text-black');
        document.getElementById('scripts-favorites-tab').classList.add('text-text-gray');

        await fetchScripts();
    } else if (type === 'favorites') {
        scriptsSection.classList.add('hidden');
        favoritesSection.classList.remove('hidden');

        await fetchFavorites();
    }
}

// 获取脚本列表
async function fetchScripts() {
    const token = localStorage.getItem('token');
    const scriptsList = document.getElementById('scripts-list');
    const emptyState = document.getElementById('scripts-empty');

    scriptsList.innerHTML = '';

    try {
        const response = await fetch('/api/scripts', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();

            if (data.scripts && data.scripts.length > 0) {
                emptyState.classList.add('hidden');
                data.scripts.forEach(script => {
                    scriptsList.appendChild(createScriptCard(script));
                });
            } else {
                emptyState.classList.remove('hidden');
            }
        } else {
            console.error('获取脚本列表失败');
        }
    } catch (error) {
        console.error('获取脚本列表失败:', error);
    }
}

// 获取收藏列表
async function fetchFavorites() {
    const token = localStorage.getItem('token');
    const favoritesList = document.getElementById('favorites-list');
    const emptyState = document.getElementById('favorites-empty');

    favoritesList.innerHTML = '';

    try {
        const response = await fetch('/api/scripts/favorites', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();

            if (data.scripts && data.scripts.length > 0) {
                emptyState.classList.add('hidden');
                data.scripts.forEach(script => {
                    favoritesList.appendChild(createScriptCard(script, true));
                });
            } else {
                emptyState.classList.remove('hidden');
            }
        } else {
            console.error('获取收藏列表失败');
        }
    } catch (error) {
        console.error('获取收藏列表失败:', error);
    }
}

// 创建脚本卡片
function createScriptCard(script, isFavorite = false) {
    const card = document.createElement('div');
    card.className = 'bg-bg-dark border border-border-gray p-6 rounded-lg hover:border-white transition-colors';

    const content = script.content || {};
    const title = content.name || script.title || '未命名脚本';
    const date = new Date(script.created_at).toLocaleDateString('zh-CN');
    const shareCount = script.share_count || 0;
    const viewCount = script.view_count || 0;

    card.innerHTML = `
        <div class="flex justify-between items-start mb-4">
            <div class="flex-1">
                <h3 class="text-lg font-light mb-2">${title}</h3>
                <div class="flex items-center space-x-4 text-xs text-text-gray">
                    <span><i class="fa fa-calendar mr-1"></i>${date}</span>
                    <span><i class="fa fa-eye mr-1"></i>${viewCount}</span>
                    ${shareCount > 0 ? `<span><i class="fa fa-share mr-1"></i>${shareCount}</span>` : ''}
                </div>
            </div>
            <button class="favorite-btn ${isFavorite ? 'text-amber-500' : 'text-text-gray hover:text-amber-500'}" data-id="${script.id}">
                <i class="fa fa-star text-xl"></i>
            </button>
        </div>
        <div class="flex justify-between items-center">
            <span class="text-xs text-text-gray px-2 py-1 border border-border-gray rounded">
                ${getInputTypeLabel(script.input_type)}
            </span>
            <div class="space-x-2">
                <button class="view-script-btn px-3 py-1 text-xs border border-white text-white hover:bg-white hover:text-black rounded transition-colors" data-id="${script.id}">
                    查看
                </button>
                <button class="share-script-btn px-3 py-1 text-xs border border-border-gray text-text-gray hover:border-white hover:text-white rounded transition-colors" data-id="${script.id}">
                    分享
                </button>
                <button class="delete-script-btn px-3 py-1 text-xs border border-error text-error hover:bg-error hover:text-white rounded transition-colors" data-id="${script.id}">
                    删除
                </button>
            </div>
        </div>
    `;

    // 绑定事件
    card.querySelector('.favorite-btn').addEventListener('click', () => toggleFavorite(script.id, !isFavorite));
    card.querySelector('.view-script-btn').addEventListener('click', () => viewScript(script));
    card.querySelector('.share-script-btn').addEventListener('click', () => shareScript(script.id));
    card.querySelector('.delete-script-btn').addEventListener('click', () => deleteScript(script.id));

    return card;
}

// 获取输入类型标签
function getInputTypeLabel(type) {
    const labels = {
        'file': '文件',
        'url': '链接',
        'image': '截图'
    };
    return labels[type] || type;
}

// 切换收藏状态
async function toggleFavorite(scriptId, isFavorite) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('请先登录');
        return;
    }

    try {
        const response = await fetch(`/api/scripts/${scriptId}/favorite`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ isFavorite })
        });

        if (response.ok) {
            alert(isFavorite ? '已添加到收藏' : '已取消收藏');
            // 重新加载当前列表
            const currentTab = document.getElementById('scripts-history-tab').classList.contains('bg-white') ? 'history' : 'favorites';
            loadScripts(currentTab);
        } else {
            alert('操作失败，请重试');
        }
    } catch (error) {
        console.error('收藏操作失败:', error);
        alert('操作失败，请重试');
    }
}

// 查看脚本
function viewScript(script) {
    const content = script.content || {};

    // 填充结果区域
    document.getElementById('result-name').textContent = content.name || '';
    document.getElementById('result-dao').textContent = content.dao || '';
    document.getElementById('result-fa').textContent = content.fa || '';
    document.getElementById('result-shu').textContent = content.shu || '';
    document.getElementById('result-qi').textContent = content.qi || '';
    document.getElementById('result-li').textContent = content.li || '';

    // 隐藏其他区域，显示结果区域
    document.getElementById('script-generator').classList.add('hidden');
    document.getElementById('processing-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');

    // 滚动到结果区域
    document.getElementById('result-section').scrollIntoView({ behavior: 'smooth' });

    // 更新全局变量
    currentScriptId = script.id;
}

// 分享脚本
async function shareScript(scriptId) {
    const token = localStorage.getItem('token');
    if (!token) {
        alert('请先登录');
        return;
    }

    try {
        const response = await fetch(`/api/scripts/${scriptId}/share`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const shareUrl = `${window.location.origin}/share/${data.shareCode}`;

            // 复制到剪贴板
            navigator.clipboard.writeText(shareUrl).then(() => {
                alert(`分享链接已复制到剪贴板：\n${shareUrl}`);
            }).catch(() => {
                alert(`分享链接：\n${shareUrl}`);
            });
        } else {
            alert('生成分享链接失败');
        }
    } catch (error) {
        console.error('分享失败:', error);
        alert('分享失败，请重试');
    }
}

// 删除脚本
async function deleteScript(scriptId) {
    if (!confirm('确定要删除这个脚本吗？')) {
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
        alert('请先登录');
        return;
    }

    try {
        const response = await fetch(`/api/scripts/${scriptId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            alert('删除成功');
            // 重新加载当前列表
            const currentTab = document.getElementById('scripts-history-tab').classList.contains('bg-white') ? 'history' : 'favorites';
            loadScripts(currentTab);
        } else {
            alert('删除失败，请重试');
        }
    } catch (error) {
        console.error('删除失败:', error);
        alert('删除失败，请重试');
    }
}

// ==================== 数据统计 ====================

function initStatsSection() {
    // 监听hash变化，显示统计section
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash;
        if (hash === '#stats-section') {
            loadStats();
        }
    });
}

// 加载统计数据
async function loadStats() {
    const token = localStorage.getItem('token');
    if (!token) {
        return;
    }

    try {
        const response = await fetch('/api/stats', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            displayStats(data);
        }
    } catch (error) {
        console.error('加载统计数据失败:', error);
    }
}

// 显示统计数据
function displayStats(data) {
    // 总体统计
    document.getElementById('stat-total-scripts').textContent = data.totalScripts || 0;
    document.getElementById('stat-favorites').textContent = data.favorites || 0;
    document.getElementById('stat-shares').textContent = data.shares || 0;
    document.getElementById('stat-views').textContent = data.views || 0;

    // 热门思维模型
    const topModelsList = document.getElementById('top-models-list');
    topModelsList.innerHTML = '';

    if (data.topModels && data.topModels.length > 0) {
        data.topModels.forEach((model, index) => {
            const item = document.createElement('div');
            item.className = 'flex items-center justify-between p-3 bg-bg-black border border-border-gray rounded';
            item.innerHTML = `
                <div class="flex items-center">
                    <span class="text-white font-medium w-8">${index + 1}</span>
                    <span class="text-text-gray">${model.name || model.description || '未知'}</span>
                </div>
                <span class="text-text-white font-medium">${model.count || 0}次</span>
            `;
            topModelsList.appendChild(item);
        });
    } else {
        topModelsList.innerHTML = '<p class="text-text-gray text-center py-4">暂无数据</p>';
    }

    // 最近活动
    const recentActivityList = document.getElementById('recent-activity-list');
    recentActivityList.innerHTML = '';

    if (data.recentActivities && data.recentActivities.length > 0) {
        data.recentActivities.forEach(activity => {
            const item = document.createElement('div');
            item.className = 'flex items-center justify-between p-3 bg-bg-black border border-border-gray rounded';
            item.innerHTML = `
                <div class="flex items-center">
                    <i class="fa fa-${getActivityIcon(activity.action_type)} text-text-gray mr-3"></i>
                    <span class="text-text-gray">${getActivityText(activity)}</span>
                </div>
                <span class="text-xs text-text-gray">${formatDate(activity.created_at)}</span>
            `;
            recentActivityList.appendChild(item);
        });
    } else {
        recentActivityList.innerHTML = '<p class="text-text-gray text-center py-4">暂无数据</p>';
    }
}

// 获取活动图标
function getActivityIcon(actionType) {
    const icons = {
        'create': 'plus-circle',
        'view': 'eye',
        'favorite': 'star',
        'share': 'share'
    };
    return icons[actionType] || 'circle';
}

// 获取活动文本
function getActivityText(activity) {
    const texts = {
        'create': '生成了新脚本',
        'view': '查看了脚本',
        'favorite': '收藏了脚本',
        'share': '分享了脚本'
    };
    return texts[activity.action_type] || activity.action_type;
}

// 格式化日期
function formatDate(dateStr) {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now - date;

    if (diff < 60000) {
        return '刚刚';
    } else if (diff < 3600000) {
        return `${Math.floor(diff / 60000)}分钟前`;
    } else if (diff < 86400000) {
        return `${Math.floor(diff / 3600000)}小时前`;
    } else if (diff < 604800000) {
        return `${Math.floor(diff / 86400000)}天前`;
    } else {
        return date.toLocaleDateString('zh-CN');
    }
}
