const display = document.getElementById("text");
const memeContainer = document.getElementById("memeContainer");


const videos = ["meme1.mp4", "meme2.mp4", "meme3.mp4", "meme4.mp4"];


const photos = [
    "adga.jpg",   
    "ads.jpg",
    "hello.jpg",
    "hew12.jpg",
];


const videoPositions = [
    { left: "5vw",  top: "5vh"  },
    { left: "55vw", top: "8vh"  },
    { left: "10vw", top: "55vh" },
    { left: "58vw", top: "52vh" }
];

const photoPositions = [
    { left: "30vw", top: "2vh"  },
    { left: "2vw",  top: "35vh" },
    { left: "68vw", top: "35vh" },
    { left: "30vw", top: "72vh" },
    { left: "48vw", top: "20vh" },
    { left: "15vw", top: "20vh" },
];

let spawned = false;

function append(value) {
    display.value += value;
}

function clearDisplay() {
    display.value = "";
    stopMemes();
}

function deleteLast() {
    display.value = display.value.slice(0, -1);
}

function calculate() {
    display.value = "IMISSU <3";
    if (!spawned) startMemes();
}

function stopMemes() {
    spawned = false;
    memeContainer.innerHTML = "";
}

function spawnVideo(index) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("floating-meme");
    wrapper.style.left = videoPositions[index].left;
    wrapper.style.top  = videoPositions[index].top;

    const video = document.createElement("video");
    video.src = videos[index];
    video.autoplay = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = true;
    video.volume = index === 0 ? 0.8 : 0.2; // meme1 louder, rest quiet

    wrapper.appendChild(video);
    memeContainer.appendChild(wrapper);

    wrapper.animate([
        { transform: "scale(0.3)", opacity: 0 },
        { transform: "scale(1)",   opacity: 1 }
    ], { duration: 500, fill: "forwards", easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" });
}

function spawnPhoto(index) {
    if (index >= photos.length) return;

    const pos = photoPositions[index % photoPositions.length];

    const wrapper = document.createElement("div");
    wrapper.classList.add("floating-photo");
    wrapper.style.left = pos.left;
    wrapper.style.top  = pos.top;

    const img = document.createElement("img");
    img.src = photos[index];

    wrapper.appendChild(img);
    memeContainer.appendChild(wrapper);

    wrapper.animate([
        { transform: "scale(0.3) rotate(-10deg)", opacity: 0 },
        { transform: "scale(1) rotate(0deg)",     opacity: 1 }
    ], { duration: 500, fill: "forwards", easing: "cubic-bezier(0.34, 1.56, 0.64, 1)" });
}

function startMemes() {
    spawned = true;
    memeContainer.innerHTML = "";

    // Videos: 1.5s interval bawat isa
    videos.forEach((_, i) => {
        setTimeout(() => spawnVideo(i), i * 1500);
    });

    // Photos: lalabas pagkatapos ng lahat ng videos, 1s interval bawat isa
    const videosDone = videos.length * 3000;
    photos.forEach((_, i) => {
        setTimeout(() => spawnPhoto(i), videosDone + i *3000);
    });
}