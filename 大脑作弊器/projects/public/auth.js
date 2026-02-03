// 认证API调用函数
const AuthAPI = {
    /**
     * 用户注册
     */
    async register(username, email, password) {
        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('注册请求失败:', error);
            return { error: '网络错误，请重试' };
        }
    },

    /**
     * 用户登录
     */
    async login(username, password) {
        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username,
                    password
                })
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('登录请求失败:', error);
            return { error: '网络错误，请重试' };
        }
    },

    /**
     * 获取当前用户信息
     */
    async getCurrentUser() {
        try {
            const token = localStorage.getItem('auth_token');
            if (!token) {
                return { error: '未登录' };
            }

            const response = await fetch('/api/auth/me', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('获取用户信息失败:', error);
            return { error: '网络错误，请重试' };
        }
    },

    /**
     * 保存Token
     */
    saveToken(token) {
        localStorage.setItem('auth_token', token);
    },

    /**
     * 获取Token
     */
    getToken() {
        return localStorage.getItem('auth_token');
    },

    /**
     * 清除Token（登出）
     */
    clearToken() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
    },

    /**
     * 保存用户信息
     */
    saveUser(user) {
        localStorage.setItem('auth_user', JSON.stringify(user));
    },

    /**
     * 获取用户信息
     */
    getUser() {
        const userStr = localStorage.getItem('auth_user');
        return userStr ? JSON.parse(userStr) : null;
    },

    /**
     * 检查是否已登录
     */
    isLoggedIn() {
        return !!this.getToken();
    },

    /**
     * 登出
     */
    logout() {
        this.clearToken();
        window.location.reload();
    }
};

// 将AuthAPI暴露到全局
window.AuthAPI = AuthAPI;
