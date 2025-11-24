// 購物車功能
// 儲存購物車商品數量
let cartCount = 2; // 初始購物車有 2 個商品

// 當頁面載入完成後執行
document.addEventListener('DOMContentLoaded', function() {
    // 更新購物車顯示數量
    updateCartBadge();
    
    // 為所有「加入購物車」按鈕添加事件監聽器
    const addToCartButtons = document.querySelectorAll('.btn-full');
    addToCartButtons.forEach(button => {
        // 只處理商品卡片中的按鈕（排除其他區域的按鈕）
        if (button.closest('.product-card')) {
            button.addEventListener('click', function() {
                // 增加購物車數量
                cartCount++;
                updateCartBadge();
                
                // 顯示提示訊息（可選）
                showNotification('商品已加入購物車！');
            });
        }
    });
    
    // 搜尋功能
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(event) {
            // 當按下 Enter 鍵時執行搜尋
            if (event.key === 'Enter') {
                const searchTerm = this.value.trim();
                if (searchTerm) {
                    // 這裡可以添加實際的搜尋功能
                    console.log('搜尋:', searchTerm);
                    showNotification(`正在搜尋: ${searchTerm}`);
                }
            }
        });
    }
    
    // 初始化滑動功能
    initSmoothScroll();
    
    // 初始化箭頭按鈕滑動功能
    initArrowScroll();
});

// 更新購物車徽章顯示的數量
function updateCartBadge() {
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        cartBadge.textContent = cartCount;
    }
}

// 顯示通知訊息（簡單版本）
function showNotification(message) {
    // 創建通知元素
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: #ffffff;
        color: #000000;
        padding: 16px 24px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        z-index: 1000;
        font-size: 14px;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    
    // 添加動畫樣式（如果還沒有）
    if (!document.getElementById('notification-style')) {
        const style = document.createElement('style');
        style.id = 'notification-style';
        style.textContent = `
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // 將通知添加到頁面
    document.body.appendChild(notification);
    
    // 3 秒後自動移除通知
    setTimeout(() => {
        notification.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 初始化平滑滑動功能
function initSmoothScroll() {
    // 為所有可滾動的容器添加平滑滑動功能
    const scrollContainers = document.querySelectorAll('.category-grid, .products-grid, .discover-grid');
    
    scrollContainers.forEach(container => {
        // 啟用觸摸滑動（移動設備）
        let isDown = false;
        let startX;
        let scrollLeft;
        
        // 滑鼠按下事件
        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });
        
        // 滑鼠離開事件
        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        // 滑鼠放開事件
        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });
        
        // 滑鼠移動事件
        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2; // 滑動速度倍數
            container.scrollLeft = scrollLeft - walk;
        });
        
        // 設置初始游標樣式
        container.style.cursor = 'grab';
        
        // 觸摸事件（移動設備）
        let touchStartX = 0;
        let touchScrollLeft = 0;
        
        container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX;
            touchScrollLeft = container.scrollLeft;
        }, { passive: true });
        
        container.addEventListener('touchmove', (e) => {
            if (!touchStartX) return;
            const touchX = e.touches[0].pageX;
            const diff = touchStartX - touchX;
            container.scrollLeft = touchScrollLeft + diff;
        }, { passive: true });
        
        container.addEventListener('touchend', () => {
            touchStartX = 0;
        });
    });
}

// 初始化箭頭按鈕滑動功能
function initArrowScroll() {
    // 為探索威士忌區域的箭頭按鈕添加功能
    const discoverGrid = document.querySelector('.discover-grid');
    const leftArrow = document.querySelector('.discover-container .scroll-arrow-left');
    const rightArrow = document.querySelector('.discover-container .scroll-arrow-right');
    
    if (discoverGrid && leftArrow && rightArrow) {
        // 計算滑動距離（根據第一個卡片的寬度和間距）
        function getScrollAmount() {
            const firstCard = discoverGrid.querySelector('.discover-card');
            if (firstCard) {
                const cardWidth = firstCard.offsetWidth;
                const gap = 16; // gap 值
                return cardWidth + gap;
            }
            return 176; // 預設值
        }
        
        // 左箭頭：向左滑動
        leftArrow.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            discoverGrid.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // 右箭頭：向右滑動
        rightArrow.addEventListener('click', () => {
            const scrollAmount = getScrollAmount();
            discoverGrid.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });
        
        // 根據滾動位置顯示/隱藏箭頭
        function updateArrowVisibility() {
            const isAtStart = discoverGrid.scrollLeft <= 0;
            const isAtEnd = discoverGrid.scrollLeft >= discoverGrid.scrollWidth - discoverGrid.clientWidth - 1;
            
            leftArrow.style.opacity = isAtStart ? '0.3' : '1';
            leftArrow.style.pointerEvents = isAtStart ? 'none' : 'auto';
            
            rightArrow.style.opacity = isAtEnd ? '0.3' : '1';
            rightArrow.style.pointerEvents = isAtEnd ? 'none' : 'auto';
        }
        
        // 監聽滾動事件
        discoverGrid.addEventListener('scroll', updateArrowVisibility);
        
        // 監聽視窗大小變化
        window.addEventListener('resize', updateArrowVisibility);
        
        // 初始檢查
        updateArrowVisibility();
    }
}
