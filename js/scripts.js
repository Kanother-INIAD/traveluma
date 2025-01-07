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

// 以下、OpenWeatherを用いる部分とする

const API_KEY_WEATHER = '2f7a3ea0ed36451433cdd6273f0325ac';
const URL = "https://api.openweathermap.org/data/2.5/weather?";

// 各競馬場の位置情報
const LOCATIONS = {
    tokyo: {
        city: 'Fuchu,JP',
        name: '東京'
    },
    kyoto: {
        city: 'Kyoto,JP',
        name: '京都'
    },
    nakayama: {
        city: 'Funabashi,JP',
        name: '中山'
    }
};

// 天気情報を取得して表示する関数
function fetchWeather(location, locationKey) {
    const url = `${URL}q=${location.city}&units=metric&appid=${API_KEY_WEATHER}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            // 天気情報の表示
            const weatherElement = document.getElementById(`weather-${locationKey}`);
            if (weatherElement) {
                weatherElement.innerHTML = `${location.name}競馬場周辺<br>天気: ${data.weather[0].main}<br>気温: ${Math.round(data.main.temp)}°C`;
            }

            // 時刻の表示
            const timeElement = document.getElementById(`time-${locationKey}`);
            if (timeElement) {
                let dateObj = new Date();
                dateObj.setTime(Number(data.dt) * 1000);
                let month = dateObj.getMonth();
                let date = dateObj.getDate();
                let hours = dateObj.getHours();
                let minutes = dateObj.getMinutes();
                const formattedTime = `${month + 1}月${date}日 ${hours}時${minutes}分更新`;
                timeElement.innerHTML = formattedTime;
            }
        })
        .catch(error => {
            console.error(`Error fetching weather data for ${location.name}:`, error);
            const weatherElement = document.getElementById(`weather-${locationKey}`);
            if (weatherElement) {
                weatherElement.innerHTML = `天気情報を取得できませんでした`;
            }
        });
}

// DOMの読み込み完了後に実行
document.addEventListener('DOMContentLoaded', function() {
    // 各競馬場の天気情報を取得
    Object.entries(LOCATIONS).forEach(([key, location]) => {
        fetchWeather(location, key);
    });

    // 30分ごとに天気情報を更新
    setInterval(() => {
        Object.entries(LOCATIONS).forEach(([key, location]) => {
            fetchWeather(location, key);
        });
    }, 1800000); // 30分 = 1800000ミリ秒
});

document.querySelectorAll('.scroll-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

document.querySelectorAll('.scroll-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
