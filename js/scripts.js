let slideIndex = 0;
showSlides();

function showSlides() {
    let i;
    let slides = document.getElementsByClassName("slide");
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove("fade-out");
        slides[i].classList.remove("fade");
        slides[i].style.opacity = 0; // 透明にする
    }

    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }

    let currentSlide = slides[slideIndex - 1];
    currentSlide.style.display = "block";
    currentSlide.style.opacity = 1; // 表示して不透明にする
    currentSlide.classList.add("fade");

    setTimeout(() => {
       currentSlide.classList.add("fade-out");
        setTimeout(() => {
            currentSlide.style.display = "none";
            showSlides();
        }, 1500); // フェードアウトアニメーションが終わるまで待つ
    }, 3500); // フェードインアニメーションが終わるまで待つ
}