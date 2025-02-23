const songs = [
    {
        title: "Lithium",
        artist: "Nirvana",
        file: "Lithium.mp3",
        cover: "LithiumCover.jpg",
        lyrics: `
[Verse 1]
I'm so happy, 'cause today I found my friends
They're in my head
I'm so ugly, that's okay, 'cause so are you
Broke our mirrors
Sunday morning is every day, for all I care
And I'm not scared
Light my candles in a daze, 'cause I've found God

[Pre-Chorus]
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah, yeah

[Verse 2]
I'm so lonely, that's okay, I shaved my head
And I'm not sad
And just maybe I'm to blame for all I've heard
But I'm not sure
I'm so excited, I can't wait to meet you there
And I don't care
I'm so horny, that's okay, my will is good
[Pre-Chorus]
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah, yeah

[Chorus]
I like it, I'm not gonna crack
I miss you, I'm not gonna crack
I love you, I'm not gonna crack
I killed you, I'm not gonna crack
I like it, I'm not gonna crack
I miss you, I'm not gonna crack
I love you, I'm not gonna crack
I killed you, I'm not gonna crack

[Verse 1]
I'm so happy, 'cause today I found my friends
They're in my head
I'm so ugly, that's okay, 'cause so are you
Broke our mirrors
Sunday morning is every day, for all I care
And I'm not scared
Light my candles in a daze, 'cause I've found God

[Pre-Chorus]
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah
Yeah, yeah, yeah

[Chorus]
I like it, I'm not gonna crack
I miss you, I'm not gonna crack
I love you, I'm not gonna crack
I killed you, I'm not gonna crack
I like it, I'm not gonna crack
I miss you, I'm not gonna crack
I love you, I'm not gonna crack
I killed you, I'm not gonna crack`
    },
    {
        title: "Machina",
        artist: "Boy harsher and Mariana Saldaña",
        file: "Machina.mp3",
        cover: "MachinaCover.jpg",
        lyrics: `[Verse 1]
Machina electrónico
Artificial sensación frío
Machina electrónico
Doméstico corazón frío

[Chorus]
(I can't) Spend the night with you
(I can't) Stay to dance with you
(I can't) End my night with you
(I can't) Feel your heart beat too

[Verse 2]
Machina electrónico
Artificial sensación frío
Machina electrónico
Doméstico corazón frío

[Chorus]
(I can't) Spend the night with you
(I can't) Stay to dance with you
(I can't) End my night with you
(I can't) Feel your heart beat too

[Bridge]
Electrónico-co-co
Elec—
Elec-electrónico
—Co-co, —co-co
Electrónico, —co-co
Elec-electróni-trónico
[Chorus]
(I can't) Spend the night with you
(I can't) Stay to dance with you
(I can't) End my night with you
(I can't) Feel your heart beat too

[Outro]
Elec-elec-elec-elec
Electrónico`
    }
];

let currentSongIndex = 0;
let isPlaying = false;
let audio = new Audio();

const albumArt = document.getElementById('albumArt');
const songTitle = document.getElementById('songTitle');
const artistEl = document.getElementById('artist');
const playPauseBtn = document.getElementById('playPauseBtn');
const progressBar = document.getElementById('progressBar');
const currentTimeElement = document.getElementById('currentTime');
const durationElement = document.getElementById('duration');
const volumeControl = document.getElementById('volume');
const lyricsContainer = document.getElementById('lyricsContainer');
const lyricsText = document.getElementById('lyricsText');
const closeLyrics = document.getElementById('closeLyrics');

function loadSong(index) {
    const song = songs[index];
    audio.src = song.file;
    albumArt.src = song.cover;
    songTitle.textContent = song.title;
    artistEl.textContent = song.artist;
    
    if (index < songs.length - 1) {
        const nextSong = new Audio(songs[index + 1].file);
    }
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
    if (!isNaN(duration)) {
        durationElement.textContent = formatTime(duration);
    }
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
    if (!isNaN(duration)) {
        audio.currentTime = (clickX / width) * duration;
    }
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

function showLyrics() {
    lyricsText.textContent = songs[currentSongIndex].lyrics;
    lyricsContainer.style.display = 'flex';
}

function hideLyrics() {
    lyricsContainer.style.display = 'none';
}

playPauseBtn.addEventListener('click', playPause);
audio.addEventListener('timeupdate', updateProgress);
audio.addEventListener('ended', nextSong);
volumeControl.addEventListener('input', changeVolume);
document.querySelector('.progress-container').addEventListener('click', setProgress);
document.getElementById('prevBtn').addEventListener('click', prevSong);
document.getElementById('nextBtn').addEventListener('click', nextSong);
albumArt.addEventListener('click', showLyrics);
closeLyrics.addEventListener('click', hideLyrics);
lyricsContainer.addEventListener('click', (e) => {
    if (e.target === lyricsContainer) hideLyrics();
});

loadSong(currentSongIndex);
