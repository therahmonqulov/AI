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


// form
const showButtons = document.querySelectorAll(".show_button");
const registerFormModal = document.querySelector(".registration-modal");
const closeBtn = document.querySelector(".close-btn");
const form = document.getElementById("registrationForm");
const nameInput = document.getElementById("fullName");
const phoneInput = document.getElementById("phone");

const nameError = document.getElementById("nameError");
const phoneError = document.getElementById("phoneError");

// Modalni ochish/yopish
showButtons.forEach(button => {
    button.addEventListener("click", () => {
        registerFormModal.style.display = "block";
        form.reset();
        phoneInput.value = "+998";
        clearErrors();
    });
});

closeBtn.addEventListener("click", () => {
    registerFormModal.style.display = "none";
    clearErrors();
});

// Telefon raqamini formatlash (+998 XX XXX XX XX)
phoneInput.addEventListener("input", (e) => {
    let value = e.target.value.replace(/\D/g, ''); // faqat raqamlar

    if (value.startsWith('998')) {
        value = value.substring(3);
    }

    // +998 dan keyin maksimum 9 ta raqam
    value = value.substring(0, 9);

    let formatted = "+998";
    if (value.length > 0) formatted += " " + value.substring(0, 2);
    if (value.length > 2) formatted += " " + value.substring(2, 5);
    if (value.length > 5) formatted += " " + value.substring(5, 7);
    if (value.length > 7) formatted += " " + value.substring(7, 9);

    e.target.value = formatted;
});

// Xatoliklarni tozalash
function clearErrors() {
    nameError.textContent = "";
    phoneError.textContent = "";
    nameInput.classList.remove("error");
    phoneInput.classList.remove("error");
}

// Formani tekshirish va yuborish
form.addEventListener("submit", async function (e) {
    e.preventDefault();

    clearErrors();
    let isValid = true;

    // Ism tekshiruvi (kamida 2 ta harf)
    const name = nameInput.value.trim();
    if (name.length < 2) {
        nameError.textContent = "Ism kamida 2 ta belgidan iborat bo'lishi kerak";
        nameInput.classList.add("error");
        isValid = false;
    }

    // Telefon raqami tekshiruvi
    const phoneValue = phoneInput.value.replace(/\D/g, '');
    if (phoneValue.length !== 12 || !phoneValue.startsWith("998")) {
        phoneError.textContent = "Telefon raqami +998 XX XXX XX XX formatida bo'lishi kerak";
        phoneInput.classList.add("error");
        isValid = false;
    }

    if (!isValid) return;

    // Ma'lumotlarni tayyorlash
    const formData = {
        name: name,
        phone: "'" + phoneInput.value,   // ← mana bu yerda "'" + qo'shildi
        timestamp: new Date().toLocaleString("uz-UZ", { timeZone: "Asia/Tashkent" })
    };

    try {
        // Google Apps Script Web App URL manzili kerak!
        // Avval Google Sheet → Extensions → Apps Script da skript yoziladi
        const scriptURL = "https://script.google.com/macros/s/AKfycbwYeiF44X4Y6k4cpA377kyURyxNmpP91HCR-kx_T7bX1DaZ4HL-fMlsLIm1-E4QmIHliA/exec";

        const response = await fetch(scriptURL, {
            method: "POST",
            mode: "no-cors", // muhim!
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        // muvaffaqiyatli yuborilganini bildirish
        alert("Muvaffaqiyatli yuborildi! Tez orada menejerimiz siz bilan bog'lanadi.");

        registerFormModal.style.display = "none";
        form.reset();
        phoneInput.value = "+998";

    } catch (error) {
        console.error("Xatolik:", error);
        alert("Yuborishda xatolik yuz berdi. Iltimos qayta urinib ko'ring.");
    }
});