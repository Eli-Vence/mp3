const player = document.querySelector('.player'),
  btnPlay = document.querySelector('.play'),
  btnPrev = document.querySelector('.prev'),
  btnNext = document.querySelector('.next'),
  imgPlay = document.querySelector('.img__src'),
  audio = document.querySelector('.audio'),
  progressContainer = document.querySelector('.progress__container'),
  progress = document.querySelector('.progress'),
  nameSong = document.querySelector('.song'),
  imgCover = document.querySelector('.cover__img');

//Songs
const songs = ['Track1', 'Track2', 'Track3'];

//Defoult song
let songIndex = 0;

//Init
const loadSong = (song) => {
  nameSong.innerHTML = song;
  audio.src = `audio/${song}.mp3`;
};

loadSong(songs[songIndex]);

//Play
const playSong = () => {
  player.classList.add('play');
  imgCover.classList.add('active');
  imgPlay.src = 'images/pause.png';
  audio.play();
};

//Pause
const pauseSong = () => {
  player.classList.remove('play');
  imgCover.classList.remove('active');
  imgPlay.src = 'images/play.png';
  audio.pause();
};

btnPlay.addEventListener('click', () => {
  const isPlaying = player.classList.contains('play');
  if (isPlaying) {
    pauseSong();
  } else {
    playSong();
  }
});

// Next song
const nextSong = () => {
  songIndex++;

  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

btnNext.addEventListener('click', nextSong);

// Prev Song

const prevSong = () => {
  songIndex--;

  if (songIndex < 0) {
    songIndex = songs.length - 1;
    songIndex = 0;
  }

  loadSong(songs[songIndex]);
  playSong();
};

btnPrev.addEventListener('click', prevSong);

// Progress bar
const updateProgress = (e) => {
  const { duration, currentTime } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
  console.log(currentTime);
};
audio.addEventListener('timeupdate', updateProgress);

// Set progress
const setProgress = (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  console.log(clickX);
  console.log(width);
  audio.currentTime = (clickX / width) * audio.duration;
};
progressContainer.addEventListener('click', setProgress);

//Autoplay
audio.addEventListener('ended', nextSong);
