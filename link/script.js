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
const timerDisplay = document.getElementById('countdown');

function updateTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent =
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

    if (timeLeft <= 0) {
        timerDisplay.textContent = "00:00";
        clearInterval(countdownInterval);
        // xohlasangiz shu yerda boshqa harakat qo'shishingiz mumkin (masalan rang o'zgartirish)
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

    // taxminan 45–70% oralig'ida chiqadi
    if (percent > 50    ) {
        bar.classList.add('visible');

        // birinchi marta ko'ringanda timer ishga tushadi
        if (!timerRunning) {
            startTimer();
        }
    } else {
        bar.classList.remove('visible');
    }
}, { passive: true });

// dastlabki ko'rsatish
updateTimer();