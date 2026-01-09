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

// 2 daqiqa = 120 soniya
let timeLeft = 120;
let timerRunning = false;
let countdownInterval = null;

const bar = document.getElementById('bottomBar');
const tMin = document.getElementById('tm-min');
const tSec = document.getElementById('tm-sec');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    tMin.textContent = minutes.toString().padStart(2, '0');
    tSec.textContent = seconds.toString().padStart(2, '0');
    if (timeLeft <= 0) {
        tMin.textContent = "00";
        tSec.textContent = "00";
        clearInterval(countdownInterval);
        // option: bar.style.background = "linear-gradient(88deg,#401c2f,#1b2340)"
    }
}

function startTimer() {
    if (!timerRunning) {
        timerRunning = true;
        countdownInterval = setInterval(() => {
          timeLeft--;
          updateTimer();
        }, 1000);
    }
}

// Scroll bilan boshqarish
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const windowH = window.innerHeight;
    const docH = document.documentElement.scrollHeight;
    const percent = ((scrollTop + windowH) / docH) * 100;
    if (percent > 50) {
        bar.classList.add('visible');
        if (!timerRunning) { startTimer(); }
    } else {
        bar.classList.remove('visible');
    }
}, { passive: true });

// dastlabki ko'rsatish
updateTimer();