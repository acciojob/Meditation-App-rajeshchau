const app = document.getElementById("app");
const audio = document.getElementById("audio");
const video = document.getElementById("video");
const playBtn = document.querySelector(".play");
const timeDisplay = document.querySelector(".time-display");
const timeButtons = document.querySelectorAll("#time-select button");
const soundButtons = document.querySelectorAll(".sound-picker button");

let duration = 600; // default 10 minutes
let currentTime = duration;
let timer;
let isPlaying = false;

// Set time from buttons
timeButtons.forEach(button => {
  button.addEventListener("click", () => {
    if (button.id === "smaller-mins") duration = 120;
    if (button.id === "medium-mins") duration = 300;
    if (button.id === "long-mins") duration = 600;
    resetTimer();
  });
});

// Play / Pause logic
playBtn.addEventListener("click", () => {
  if (isPlaying) {
    pauseMedia();
  } else {
    playMedia();
  }
});

const playMedia = () => {
  audio.play().catch(() => {});
  video.play();
  startTimer();
  playBtn.textContent = "❚❚";
  isPlaying = true;
};

const pauseMedia = () => {
  audio.pause();
  video.pause();
  clearInterval(timer);
  playBtn.textContent = "▶";
  isPlaying = false;
};

const startTimer = () => {
  timer = setInterval(() => {
    currentTime--;
    const mins = Math.floor(currentTime / 60);
    const secs = currentTime % 60;
    timeDisplay.textContent = `${mins}:${secs < 10 ? "0" + secs : secs}`;
    if (currentTime <= 0) {
      pauseMedia();
      resetTimer();
    }
  }, 1000);
};

const resetTimer = () => {
  clearInterval(timer);
  currentTime = duration;
  timeDisplay.textContent = `${Math.floor(duration / 60)}:0`;
  isPlaying = false;
  playBtn.textContent = "▶";
  audio.pause();
  audio.currentTime = 0;
};

// Sound & Video Switcher
soundButtons.forEach(button => {
  button.addEventListener("click", () => {
    const sound = button.getAttribute("data-sound");
    const vid = button.getAttribute("data-video");
    audio.src = sound;
    video.src = vid;
    pauseMedia();
    resetTimer();
  });
});
