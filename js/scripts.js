let slideIndex = 0;
let slides = document.getElementsByClassName("slide");
let timeoutId;

function showSlides() {
    if (!slides) return;
    
    // 現在のスライドを取得
    const currentSlide = slides[slideIndex];
    
    // 前のスライドのインデックスを計算
    const prevIndex = (slideIndex - 1 + slides.length) % slides.length;
    const prevSlide = slides[prevIndex];
    
    // すべてのスライドからクラスを除去
    for (let slide of slides) {
        slide.classList.remove('active', 'previous');
    }
    
    // 前のスライドに'previous'クラスを追加
    prevSlide.classList.add('previous');
    
    // 現在のスライドに'active'クラスを追加
    currentSlide.classList.add('active');
    
    // 次のスライドのインデックスを設定
    slideIndex = (slideIndex + 1) % slides.length;
    
    // 次のスライド表示をスケジュール
    timeoutId = setTimeout(showSlides, 6000);
}

function initializeSlideshow() {
    // スタイルの適用
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // スライドの初期化
    slides = document.getElementsByClassName('slide');
    if (slides.length > 0) {
        slides[0].classList.add('active');
        slideIndex = 1;
        timeoutId = setTimeout(showSlides, 6000);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    slides = document.getElementsByClassName("slide");
    slides[0].style.display = "block";
    setTimeout(() => {
        slides[0].classList.add("active");
    }, 50);
    
    timeoutId = setTimeout(showSlides, 6000);
});

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        clearTimeout(timeoutId);
    } else {
        clearTimeout(timeoutId);
        showSlides();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    setTimeout(function() {
        const loadingScreen = document.querySelector('.loading-screen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease';
        setTimeout(function() {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 4000);
});