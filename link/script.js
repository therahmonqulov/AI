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