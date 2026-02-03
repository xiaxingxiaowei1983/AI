// 投诉举报功能
(function() {
    'use strict';

    // 打开举报弹窗
    window.openReportModal = function() {
        const modal = document.getElementById('report-modal');
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    };

    // 关闭举报弹窗
    window.closeReportModal = function() {
        const modal = document.getElementById('report-modal');
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
            // 清空表单
            document.getElementById('report-form').reset();
            document.getElementById('report-count').textContent = '0';
        }
    };

    // 提交举报
    window.submitReport = function(event) {
        event.preventDefault();

        const type = document.getElementById('report-type').value;
        const email = document.getElementById('report-email').value;
        const content = document.getElementById('report-content').value;

        // 验证
        if (!type || !email || !content) {
            showReportError('请填写所有必填项');
            return;
        }

        // 邮箱格式验证
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showReportError('请输入有效的邮箱地址');
            return;
        }

        // 内容长度验证
        if (content.trim().length < 10) {
            showReportError('举报内容至少需要10个字符');
            return;
        }

        // 显示加载状态
        setLoading(true);
        hideReportError();

        // 构建邮件内容
        const subject = `[举报] ${type} - ${email}`;
        const body = `
举报类型：${type}
联系邮箱：${email}
举报时间：${new Date().toLocaleString('zh-CN')}
页面URL：${window.location.href}
用户代理：${navigator.userAgent}

举报内容：
${content}
        `.trim();

        // 发送邮件（使用mailto方式）
        setTimeout(() => {
            const mailtoLink = `mailto:support@awkn.cn?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            window.location.href = mailtoLink;

            // 保存举报记录到本地（可选）
            saveReportLog({
                type,
                email,
                content,
                timestamp: new Date().toISOString()
            });

            // 显示成功提示
            showToast('举报信息已准备，请在邮件客户端发送');

            // 重置表单
            document.getElementById('report-form').reset();
            document.getElementById('report-count').textContent = '0';

            // 关闭弹窗
            setTimeout(() => {
                closeReportModal();
                setLoading(false);
            }, 2000);
        }, 500);
    };

    // 显示加载状态
    function setLoading(loading) {
        const btnText = document.getElementById('report-text');
        const btnLoading = document.getElementById('report-loading');
        const submitBtn = document.getElementById('report-submit-btn');

        if (loading) {
            btnText.classList.add('hidden');
            btnLoading.classList.remove('hidden');
            submitBtn.disabled = true;
            submitBtn.classList.add('opacity-50');
        } else {
            btnText.classList.remove('hidden');
            btnLoading.classList.add('hidden');
            submitBtn.disabled = false;
            submitBtn.classList.remove('opacity-50');
        }
    }

    // 显示错误信息
    function showReportError(message) {
        const errorDiv = document.getElementById('report-error');
        const errorMessage = document.getElementById('report-error-message');

        errorMessage.textContent = message;
        errorDiv.classList.remove('hidden');

        // 5秒后自动隐藏
        setTimeout(() => {
            hideReportError();
        }, 5000);
    }

    // 隐藏错误信息
    function hideReportError() {
        const errorDiv = document.getElementById('report-error');
        errorDiv.classList.add('hidden');
    }

    // 保存举报日志到本地存储
    function saveReportLog(reportData) {
        try {
            let reports = JSON.parse(localStorage.getItem('report_logs') || '[]');
            reports.push(reportData);
            // 只保留最近100条记录
            if (reports.length > 100) {
                reports = reports.slice(-100);
            }
            localStorage.setItem('report_logs', JSON.stringify(reports));
        } catch (e) {
            console.error('保存举报日志失败:', e);
        }
    }

    // 显示成功提示
    function showToast(message) {
        const toast = document.getElementById('success-toast');
        if (toast) {
            const successMessage = document.getElementById('success-message');
            successMessage.textContent = message;
            toast.classList.remove('hidden');

            setTimeout(() => {
                toast.classList.add('hidden');
            }, 3000);
        }
    }

    // 字数统计
    const reportContent = document.getElementById('report-content');
    const reportCount = document.getElementById('report-count');

    if (reportContent && reportCount) {
        reportContent.addEventListener('input', function() {
            const count = this.value.length;
            reportCount.textContent = count;

            if (count > 500) {
                reportCount.classList.add('text-error');
                this.value = this.value.substring(0, 500);
                reportCount.textContent = 500;
            } else {
                reportCount.classList.remove('text-error');
            }
        });
    }

    // ESC键关闭弹窗
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeReportModal();
        }
    });

    console.log('[投诉举报] 功能已加载');
})();
