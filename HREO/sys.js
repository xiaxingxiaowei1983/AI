// 确保sys对象在全局作用域可用
var sys;
window.sys = sys = {
    step: 0,
    riasec: { R:0, I:0, A:0, S:0, E:0, C:0 },
    mbti: { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 },
    user: {
        isGuest: true,
        nickname: 'Visitor',
        heroTitle: '荣耀统帅'
    },
    
    // 重置状态
    reset: () => {
        sys.step = 0;
        sys.riasec = { R:0, I:0, A:0, S:0, E:0, C:0 };
        sys.mbti = { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
    },
    
    // 跳过身份定义，直接开始测评
    skipIdentity: () => {
        sys.user.isGuest = true;
        sys.user.nickname = 'Visitor';
        // 直接跳转到测评页面
        window.location.href = 'quiz.html';
    },
    
    // 确认身份，开始测评
    confirmIdentity: () => {
        const nickname = document.getElementById('ghost-id').value || 'Visitor';
        sys.user.isGuest = true;
        sys.user.nickname = nickname;
        // 保存用户信息到localStorage
        localStorage.setItem('sysUser', JSON.stringify(sys.user));
        // 跳转到测评页面
        window.location.href = 'quiz.html';
    },
    
    // 登录逻辑
    login: (type) => {
        // 保存用户登录类型
        sys.user.isGuest = (type === 'Guest');
        localStorage.setItem('sysUser', JSON.stringify(sys.user));
        
        if (type === 'Guest') {
            // 游客登录，跳转到待觉醒者主页
            window.location.href = 'dash.html';
        } else {
            // 已觉醒英雄，跳转到扫描界面
            window.location.href = 'channelA.html';
        }
    },
    
    // 渲染测评题目
    renderQ: () => {
        const q = SYSTEM_DATA.questions[sys.step];
        
        // 更新问题文本，移除Q1前缀
        document.getElementById('q-text').innerText = q.q.replace(/^Q\d+: /, '');
        
        // 更新阶段显示为中文
        document.getElementById('quiz-phase').innerText = q.cat === '战场定位' ? '第一阶段：战场定位' : '第二阶段：能量武器校准';
        
        // 更新进度显示为X/24格式
            document.getElementById('quiz-pct').innerText = `${sys.step + 1}/24`;
            
            // 更新进度条
            const progress = ((sys.step + 1) / 24) * 100;
            document.getElementById('quiz-progress').style.width = progress + '%';
            
            // 更新百分比显示
            const progressText = document.querySelector('.text-right.text-cyan-400');
            if (progressText) {
                progressText.innerText = `${Math.round(progress)}% 完成`;
            }
        
        const opts = document.getElementById('q-opts');
        opts.innerHTML = '';
        
        // 为战场定位阶段生成三个选项：非常符合、一般/有时候、完全不符
        if(q.cat === '战场定位') {
            // 使用问题中定义的选项，而不是固定选项
            q.opts.forEach((o, index) => {
                const optDiv = document.createElement('div');
                optDiv.className = "flex items-center gap-3 p-4 bg-white/5 border border-cyan-400/30 rounded-xl hover:bg-cyan-400/10 hover:border-cyan-400 transition-all duration-300 cursor-pointer";
                
                // 圆形单选按钮容器
                const radioDiv = document.createElement('div');
                radioDiv.className = "w-5 h-5 rounded-full border-2 border-cyan-400 flex items-center justify-center";
                
                // 单选按钮选中状态
                const radioInner = document.createElement('div');
                radioInner.className = "w-3 h-3 rounded-full bg-cyan-400 opacity-0 transition-opacity duration-300";
                radioDiv.appendChild(radioInner);
                
                // 选项文本
                const optText = document.createElement('span');
                optText.className = "text-sm text-white";
                optText.innerText = o.t;
                
                // 组装选项
                optDiv.appendChild(radioDiv);
                optDiv.appendChild(optText);
                
                // 点击事件
                optDiv.onclick = () => {
                    // 添加选中效果
                    optDiv.classList.add('bg-cyan-400/10', 'border-cyan-400');
                    radioInner.classList.add('opacity-100');
                    
                    // 使用选项中定义的v值作为分数
                    sys.riasec[q.tag] += o.v;
                    
                    // 延迟跳转到下一题，让用户看到选中效果
                    setTimeout(() => {
                        sys.next();
                    }, 300);
                };
                
                opts.appendChild(optDiv);
            });
        } else {
            // MBTI选项逻辑
            q.opts.forEach(o => {
                const optDiv = document.createElement('div');
                optDiv.className = "flex items-center gap-3 p-4 bg-white/5 border border-purple-500/30 rounded-xl hover:bg-purple-500/10 hover:border-purple-500 transition-all duration-300 cursor-pointer";
                
                // 圆形单选按钮容器
                const radioDiv = document.createElement('div');
                radioDiv.className = "w-5 h-5 rounded-full border-2 border-purple-500 flex items-center justify-center";
                
                // 单选按钮选中状态
                const radioInner = document.createElement('div');
                radioInner.className = "w-3 h-3 rounded-full bg-purple-500 opacity-0 transition-opacity duration-300";
                radioDiv.appendChild(radioInner);
                
                // 选项文本
                const optText = document.createElement('span');
                optText.className = "text-sm text-white";
                optText.innerText = o.t;
                
                // 组装选项
                optDiv.appendChild(radioDiv);
                optDiv.appendChild(optText);
                
                // 点击事件
                optDiv.onclick = () => {
                    // 添加选中效果
                    optDiv.classList.add('bg-purple-500/10', 'border-purple-500');
                    radioInner.classList.add('opacity-100');
                    
                    sys.mbti[o.v]++;
                    
                    // 延迟跳转到下一题，让用户看到选中效果
                    setTimeout(() => {
                        sys.next();
                    }, 300);
                };
                
                opts.appendChild(optDiv);
            });
        }
    },
    
    // 下一题
    next: () => {
        sys.step++;
        if(sys.step < 24) {
            sys.renderQ();
        } else {
            sys.finish();
        }
    },
    
    // 完成测评，计算结果
    finish: () => {
        // 保存测评数据到localStorage
        localStorage.setItem('sysRiasec', JSON.stringify(sys.riasec));
        localStorage.setItem('sysMbti', JSON.stringify(sys.mbti));
        
        // 跳转到加载页面
        window.location.href = 'loading.html';
    },
    
    // 计算测评结果
    calculateResult: () => {
        // 从localStorage获取测评数据
        const riasec = JSON.parse(localStorage.getItem('sysRiasec')) || { R:0, I:0, A:0, S:0, E:0, C:0 };
        const mbti = JSON.parse(localStorage.getItem('sysMbti')) || { E:0, I:0, S:0, N:0, T:0, F:0, J:0, P:0 };
        
        // 1. RIASEC 逻辑
        let max = -1, primary = 'R';
        for(let k in riasec) if(riasec[k] > max) { max = riasec[k]; primary = k; }
        
        // 2. MBTI 逻辑
        const mbtiCode = (mbti.E >= mbti.I ? 'E' : 'I') + (mbti.S >= mbti.N ? 'S' : 'N') + 
                        (mbti.T >= mbti.F ? 'T' : 'F') + (mbti.J >= mbti.P ? 'J' : 'P');
        
        // 3. 匹配 (演示用，无匹配则展示默认 ENFP)
        const res = (SYSTEM_DATA.archetypes[primary] && SYSTEM_DATA.archetypes[primary][mbtiCode]) ? 
                    SYSTEM_DATA.archetypes[primary][mbtiCode] : SYSTEM_DATA.archetypes['E']['ENFP'];
        
        return {
            primary: primary,
            mbtiCode: mbtiCode,
            result: res
        };
    }
};

// 页面加载时恢复用户状态
document.addEventListener('DOMContentLoaded', () => {
    const savedUser = localStorage.getItem('sysUser');
    if (savedUser) {
        sys.user = JSON.parse(savedUser);
    }
});