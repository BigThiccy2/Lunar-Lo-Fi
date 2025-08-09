const audioPlayer = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const prevTrackBtn = document.getElementById('prev-track-btn');
const nextTrackBtn = document.getElementById('next-track-btn');
const volumeSlider = document.getElementById('volume-slider');
const songTitleElem = document.querySelector('.song-title');
const artistNameElem = document.querySelector('.artist-name');
const albumArtElem = document.querySelector('.album-art');
const songList = document.querySelector('.song-list');
const backgroundOptions = document.querySelector('.background-options');
const backgroundOverlay = document.querySelector('.background-overlay');

let currentTrackIndex = 0;
const playlist = [
    {
        title: "Dreamscape Drifter",
        artist: "Stardust Beats",
        src: "Audio/chill-lofi-ambient-373046.mp3",
        albumArt: "images/album-art-placeholder.png"
    },
    {
        title: "Night City Grooves",
        artist: "Neon Echo",
        src: "Audio/lofi-girl-lofi-hiphop-beats-328177.mp3",
        albumArt: "images/album-art-2.png" // Make sure to create this image
    },
    {
        title: "Cosmic Chill",
        artist: "Lunar Dreams",
        src: "Audio/lofi-lofi-music-380581.mp3",
        albumArt: "images/album-art-3.png" // Make sure to create this image
    },
        {
        title: "Spring Lofi",
        artist: "Lunar Dreams",
        src: "Audio/spring-lofi-vibes-lofi-music-340019.mp3",
        albumArt: "images/album-art-3.png" // Make sure to create this image
    },

    {
        title: "Coffee Lofi",
        artist: "Sakura Lofi",
        src: "Audio/CoffeeLofi.mp3",
        albumArt: "Video/CoffeePixelArt.gif" // Make sure to create this image
    }
];

// Function to load and play a track
function loadTrack(index) {
    currentTrackIndex = index;
    const track = playlist[currentTrackIndex];
    audioPlayer.src = track.src;
    songTitleElem.textContent = track.title;
    artistNameElem.textContent = track.artist;
    albumArtElem.src = track.albumArt;
    audioPlayer.play();
    playPauseBtn.textContent = "Pause";
}

// Play/Pause functionality
playPauseBtn.addEventListener('click', () => {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playPauseBtn.textContent = "Pause";
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = "Play";
    }
});

// Previous track functionality
prevTrackBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentTrackIndex);
});

// Next track functionality
nextTrackBtn.addEventListener('click', () => {
    currentTrackIndex = (currentTrackIndex + 1) % playlist.length;
    loadTrack(currentTrackIndex);
});

// Volume control
volumeSlider.addEventListener('input', () => {
    audioPlayer.volume = volumeSlider.value;
});

// Song list selection
songList.addEventListener('click', (event) => {
    if (event.target.tagName === 'LI') {
        const selectedSrc = event.target.dataset.src;
        const selectedIndex = playlist.findIndex(track => track.src === selectedSrc);
        if (selectedIndex !== -1) {
            loadTrack(selectedIndex);
        }
    }
});

// Background selection
backgroundOptions.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('bg-option')) {
        const bgType = event.target.dataset.bgType;
        const bgSrc = event.target.dataset.src;

        if (bgType === 'image') {
            backgroundOverlay.style.backgroundImage = `url(${bgSrc})`;
            backgroundOverlay.innerHTML = ''; // Clear any existing video
        } else if (bgType === 'video') {
            // Create a video element and append it to the overlay
            backgroundOverlay.style.backgroundImage = 'none'; // Remove image background
            backgroundOverlay.innerHTML = `<video autoplay loop muted src="${bgSrc}"></video>`;
            const videoElem = backgroundOverlay.querySelector('video');
            videoElem.style.width = '100%';
            videoElem.style.height = '100%';
            videoElem.style.objectFit = 'cover';
        }
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    loadTrack(currentTrackIndex);
    audioPlayer.volume = volumeSlider.value;
    backgroundOverlay.style.backgroundImage = `url(images/lunar-cityscape.jpg)`; // Set initial background
});
