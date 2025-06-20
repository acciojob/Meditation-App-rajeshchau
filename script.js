let audio = document.querySelector(".audio");
let video = document.querySelector("video");
let timeDisplay = document.querySelector(".time-display");
let playBtn = document.querySelector(".play");
let duration = 600;
let currentInterval;

function setTime(sec) {
  duration = sec;
  updateTimeDisplay(sec);
}

function updateTimeDisplay(seconds) {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  timeDisplay.textContent = `${mins}:${secs}`;
}

function setSound(type) {
  clearInterval(currentInterval);
  audio.pause();
  video.pause();
  if (type === "rain") {
    audio.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
    video.src = "https://cdn.pixabay.com/video/2017/08/10/11059-229533237_large.mp4";
  } else {
    audio.src = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3";
    video.src = "https://cdn.pixabay.com/video/2022/10/14/134248-761517496_large.mp4";
  }
  audio.load();
  video.load();
  audio.play();
  video.play();
}

function togglePlay() {
  if (audio.paused) {
    audio.play();
    video.play();
    startTimer(duration);
    playBtn.textContent = "⏸";
  } else {
    audio.pause();
    video.pause();
    clearInterval(currentInterval);
    playBtn.textContent = "▶";
  }
}

function startTimer(seconds) {
  let time = seconds;
  clearInterval(currentInterval);
  currentInterval = setInterval(() => {
    time--;
    if (time <= 0) {
      clearInterval(currentInterval);
      audio.pause();
      video.pause();
      playBtn.textContent = "▶";
    }
    updateTimeDisplay(time);
  }, 1000);
}
