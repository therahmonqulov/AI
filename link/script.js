// oxirgi versiya (eng silliq)
const track = document.getElementById("carouselTrack");
const originalWidth = track.scrollWidth / 2;

let position = 0;
const speed = 0.4;

function animate() {
    position -= speed;

    if (position <= -originalWidth) {
        position += originalWidth;
    }

    track.style.transform = `translateX(${position}px)`;
    requestAnimationFrame(animate);
}

animate();

// Scroll holatini kuzatish
const bar = document.getElementById('bottomBar');
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Ekranning taxminan 50% o'tganini hisoblash
    const scrollPercentage = (scrollTop + windowHeight) / documentHeight * 100;

    // 45-55% oralig'ida paydo bo'lishi uchun (taxminan o'rtada)
    if (scrollPercentage > 45 && scrollPercentage < 100) {
        bar.classList.add('visible');
    }
    // Juda yuqoriga chiqib ketganda yoki juda pastga tushganda yashirish
    else {
        bar.classList.remove('visible');
    }

    lastScrollTop = scrollTop;
}, { passive: true });