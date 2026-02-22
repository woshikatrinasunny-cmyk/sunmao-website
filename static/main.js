// 全局交互功能

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    initQuickEntry();
    initNewsCards();
    initRouteCards();
    initExperienceCards();
    initProductCards();
    initProfileMenu();
    initSearchInput();
    initShopFilters();
    initCultureCards();
});

// 快捷入口点击
function initQuickEntry() {
    const entries = document.querySelectorAll('.entry-item');
    entries.forEach((entry, index) => {
        entry.addEventListener('click', function() {
            const text = this.querySelector('span').textContent;
            switch(text) {
                case '门票':
                    window.location.href = '/shop';
                    break;
                case '导览':
                    window.location.href = '/routes';
                    break;
                case '榫卯知识':
                    window.location.href = '/culture';
                    break;
                case '买文物':
                    window.location.href = '/shop';
                    break;
            }
        });
    });
}

// 新闻卡片点击 - 已改为直接使用<a>标签，无需JS处理
function initNewsCards() {
    console.log('新闻卡片已配置直接跳转');
}

// 路线卡片点击
function initRouteCards() {
    const routeCards = document.querySelectorAll('.route-card');
    routeCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = '/routes';
        });
    });
    
    // 小卡片点击
    const miniCards = document.querySelectorAll('.mini-card');
    miniCards.forEach(card => {
        card.addEventListener('click', function() {
            window.location.href = '/routes';
        });
    });
    
    // 更多链接
    const moreLink = document.querySelector('.more-link');
    if (moreLink) {
        let expanded = false;
        moreLink.addEventListener('click', function() {
            expanded = !expanded;
            this.textContent = expanded ? '收起更多 ∧' : '展开更多 ∨';
            
            // 可以在这里添加展开/收起的动画效果
            const miniCards = document.querySelector('.route-mini-cards');
            if (miniCards) {
                miniCards.style.display = expanded ? 'grid' : 'none';
            }
        });
    }
}

// 体验卡片点击 - 已改为直接使用<a>标签，无需JS处理
function initExperienceCards() {
    // 体验卡片现在使用<a>标签直接跳转，此函数保留用于未来扩展
    console.log('体验卡片已配置直接跳转');
}

// 商品卡片点击 - 在当前页面展示详情
function initProductCards() {
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            // 移除其他选中状态
            productItems.forEach(p => p.classList.remove('selected'));
            // 添加选中状态
            this.classList.add('selected');
            
            // 可以在这里添加显示商品详情的逻辑
            const title = this.querySelector('h3').textContent;
            console.log('选中商品:', title);
        });
    });
}

// 文化卡片点击 - 新设计已优化，无需额外JS
function initCultureCards() {
    console.log('文化卡片已优化');
}

// 个人中心菜单点击
function initProfileMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const text = this.querySelector('.menu-text').textContent;
            
            // 添加选中效果
            menuItems.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // 根据菜单项跳转或显示内容
            switch(text) {
                case '我的收藏':
                    console.log('查看我的收藏');
                    break;
                case '我的订单':
                    console.log('查看我的订单');
                    break;
                case '我的留言':
                    console.log('查看我的留言');
                    break;
                case '账户设置':
                    console.log('打开账户设置');
                    break;
            }
        });
    });
    
    // 登录按钮
    const loginBtn = document.querySelector('.profile-login');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // 简单的登录状态切换
            if (this.textContent === '请点击登录') {
                this.textContent = '游客用户';
                this.style.color = 'var(--accent-dark)';
            }
        });
    }
}

// 搜索输入框
function initSearchInput() {
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const keyword = this.value.trim();
                if (keyword) {
                    // 执行搜索 - 可以添加实际的搜索逻辑
                    console.log('搜索:', keyword);
                    
                    // 简单的搜索效果：高亮匹配的商品
                    const products = document.querySelectorAll('.product-item');
                    products.forEach(product => {
                        const title = product.querySelector('h3').textContent;
                        if (title.includes(keyword)) {
                            product.style.display = 'block';
                            product.classList.add('highlight');
                        } else {
                            product.style.display = 'none';
                        }
                    });
                }
            }
        });
        
        // 清空搜索
        searchInput.addEventListener('input', function() {
            if (this.value === '') {
                const products = document.querySelectorAll('.product-item');
                products.forEach(product => {
                    product.style.display = 'block';
                    product.classList.remove('highlight');
                });
            }
        });
    }
}

// 商店筛选按钮
function initShopFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filterText = this.textContent;
            console.log('筛选:', filterText);
            
            // 可以在这里添加实际的筛选逻辑
        });
    });
}

// 路线页面标签切换
function switchTab(btn, tabId) {
    const parent = btn.closest('.detail-body') || btn.closest('.route-list-item');
    parent.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    parent.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    const panel = document.getElementById(tabId);
    if (panel) panel.classList.add('active');
}

// 景点标签点击
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('spot-tag')) {
        e.target.classList.toggle('active');
    }
});

// 添加卡片悬停效果增强
document.querySelectorAll('.news-card, .route-card, .exp-card, .product-item, .culture-card').forEach(card => {
    card.style.cursor = 'pointer';
});

// 平滑滚动
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

console.log('榫卯网站交互功能已加载');
