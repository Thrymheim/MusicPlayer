const songs = [
    {
        title: "Lithium",
        artist: "Nirvana",
        file: "Lithium.mp3",
        cover: "LithiumCover.jpg"
    },
    {
        title: "Machina",
        artist: "Boy harsher and Mariana Saldaña",
        file: "Machina.mp3",
        cover: "MachinaCover.jpg"
    },
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const artist = document.getElementById('artist');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');
const volumeControl = document.getElementById('volume');

function loadSong(index) {
    const song = songs[index];
    audio.src = song.file;
    albumArt.src = song.cover;
    songTitle.textContent = song.title;
    artist.textContent = song.artist;
}

function playPause() {
    if (isPlaying) {
        audio.pause();
        playPauseBtn.textContent = '▶';
    } else {
        audio.play();
        playPauseBtn.textContent = '⏸';
    }
    isPlaying = !isPlaying;
}

function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progressBar.style.width = `${progressPercent}%`;
    
    currentTimeElement.textContent = formatTime(currentTime);
    durationElement.textContent = formatTime(duration);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration;
}

function changeVolume() {
    audio.volume = this.value;
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    if (isPlaying) audio.play();
}

// Event Listeners
playPauseBtn.addEventListener('click', playPause);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
volumeControl.addEventListener('input', changeVolume);
document.querySelector('.progress-container').addEventListener('click', setProgress);
document.getElementById('prevBtn').addEventListener('click', prevSong);
document.getElementById('nextBtn').addEventListener('click', nextSong);

// Initialize first song
loadSong(currentSongIndex);