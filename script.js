// 簡單互動：搜尋篩選 + 加入購物車提示 + 手機選單
document.addEventListener('DOMContentLoaded', ()=>{
const searchInput = document.getElementById('search');
const productsGrid = document.getElementById('productsGrid');
const menuBtn = document.getElementById('menu-btn');
const mainNav = document.querySelector('.main-nav');


// 搜尋即時篩選
searchInput.addEventListener('input', (e)=>{
const q = e.target.value.trim().toLowerCase();
const cards = productsGrid.querySelectorAll('.product-card');
cards.forEach(card =>{
const title = card.dataset.title.toLowerCase();
card.style.display = title.includes(q) ? '' : 'none';
})
});


// 加入購物車互動 (簡單提示)
productsGrid.addEventListener('click', (e)=>{
if(e.target.classList.contains('add-btn')){
const name = e.target.closest('.product-card').dataset.title;
alert(name + ' 已加入購物車（範例）');
}
});


// 手機選單
menuBtn.addEventListener('click', ()=>{
if(mainNav.style.display === 'flex') mainNav.style.display = '';
else mainNav.style.display = 'flex';
});
});

