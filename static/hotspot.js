// 榫卯结构热区交互

class HotspotManager {
    constructor() {
        this.heroImage = document.getElementById('heroImage');
        this.container = document.getElementById('hotspotContainer');
        
        if (!this.heroImage || !this.container) return;
        
        // 定义热区位置（百分比坐标）
        this.hotspots = [
            {
                id: 1,
                name: '直榫',
                type: 'mortise-tenon',
                x: 25,  // 左侧位置
                y: 40,
                description: '最基本的榫卯结构'
            },
            {
                id: 2,
                name: '燕尾榫',
                type: 'dovetail',
                x: 45,  // 中左位置
                y: 35,
                description: '抗拉力最强'
            },
            {
                id: 3,
                name: '透榫',
                type: 'through-tenon',
                x: 55,  // 中心位置
                y: 50,
                description: '穿透式连接'
            },
            {
                id: 4,
                name: '半搭接',
                type: 'half-lap',
                x: 70,  // 中右位置
                y: 45,
                description: '简单实用'
            },
            {
                id: 5,
                name: '指接',
                type: 'finger-joint',
                x: 80,  // 右侧位置
                y: 55,
                description: '板材拼接'
            }
        ];
        
        this.init();
    }
    
    init() {
        // 等待图片加载完成
        if (this.heroImage.complete) {
            this.createHotspots();
        } else {
            this.heroImage.addEventListener('load', () => {
                this.createHotspots();
            });
        }
        
        // 窗口调整时重新定位
        window.addEventListener('resize', () => {
            this.updateHotspotPositions();
        });
    }
    
    createHotspots() {
        this.hotspots.forEach(spot => {
            const hotspot = this.createHotspotElement(spot);
            this.container.appendChild(hotspot);
        });
    }
    
    createHotspotElement(spot) {
        // 创建热区容器
        const hotspot = document.createElement('div');
        hotspot.className = 'hotspot';
        hotspot.style.left = `${spot.x}%`;
        hotspot.style.top = `${spot.y}%`;
        hotspot.dataset.type = spot.type;
        
        // 创建脉冲圆点
        const pulse = document.createElement('div');
        pulse.className = 'hotspot-pulse';
        
        // 创建标签
        const label = document.createElement('div');
        label.className = 'hotspot-label';
        label.innerHTML = `
            <div class="hotspot-name">${spot.name}</div>
            <div class="hotspot-desc">${spot.description}</div>
        `;
        
        hotspot.appendChild(pulse);
        hotspot.appendChild(label);
        
        // 点击事件
        hotspot.addEventListener('click', () => {
            this.onHotspotClick(spot);
        });
        
        // 悬停效果
        hotspot.addEventListener('mouseenter', () => {
            label.style.opacity = '1';
            label.style.transform = 'translateX(-50%) translateY(-10px) scale(1)';
        });
        
        hotspot.addEventListener('mouseleave', () => {
            label.style.opacity = '0';
            label.style.transform = 'translateX(-50%) translateY(0) scale(0.9)';
        });
        
        return hotspot;
    }
    
    onHotspotClick(spot) {
        // 添加点击动画
        const hotspot = this.container.querySelector(`[data-type="${spot.type}"]`);
        hotspot.classList.add('hotspot-clicked');
        
        // 跳转到3D查看器，并传递结构类型
        setTimeout(() => {
            window.location.href = `/viewer3d?type=${spot.type}`;
        }, 300);
    }
    
    updateHotspotPositions() {
        // 响应式调整（如果需要）
        const hotspots = this.container.querySelectorAll('.hotspot');
        hotspots.forEach((hotspot, index) => {
            const spot = this.hotspots[index];
            hotspot.style.left = `${spot.x}%`;
            hotspot.style.top = `${spot.y}%`;
        });
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new HotspotManager();
});
