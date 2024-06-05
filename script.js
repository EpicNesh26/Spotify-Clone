
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");})


let currentAudio = null;
let currentSongIndex = 0;
let songUrls = [];
let playtimeInterval = null;

async function fetchSongs(album) {
    const response = await fetch(`http://127.0.0.1:5500/songs/${album}/`);
    const text = await response.text();

    // Parse the HTML response to extract song URLs
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = doc.querySelectorAll('a');
    songUrls = Array.from(links)
        .map(link => link.href)
        .filter(href => href.endsWith('.mp3'));
    return songUrls;
}

function formatSongName(url) {
    // Extract the song name from the URL and decode it
    const songPath = url.split('/').pop();
    const decodedName = decodeURIComponent(songPath);
    return decodedName.replace('.mp3', '');
}

function displaySongs(songUrls) {
    const ul = document.querySelector('ul.songlist');
    ul.innerHTML = ''; // Clear any existing content
    songUrls.forEach((url, index) => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.gap = '12px';
        li.style.justifyContent = 'space-between';
        li.style.alignItems = 'center';

        const img = document.createElement('img');
        img.className = 'invert';
        img.style.width = '20px';
        img.src = 'svg/music.svg';
        img.alt = '';

        const infoDiv = document.createElement('div');
        infoDiv.className = 'info';

        const songNameDiv = document.createElement('div');
        songNameDiv.textContent = formatSongName(url);

        const artistDiv = document.createElement('div');
        artistDiv.textContent = 'Nesh';

        infoDiv.appendChild(songNameDiv);
        infoDiv.appendChild(artistDiv);

        const playNowDiv = document.createElement('div');
        playNowDiv.className = 'playnow';
        playNowDiv.style.display = 'flex';
        playNowDiv.style.gap = '6px';
        playNowDiv.style.alignItems = 'center';

        const playImg = document.createElement('img');
        playImg.className = 'invert';
        playImg.src = 'svg/play.svg';
        playImg.alt = '';

        playNowDiv.appendChild(playImg);

        li.appendChild(img);
        li.appendChild(infoDiv);
        li.appendChild(playNowDiv);

        playImg.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevent the click event from bubbling up to the li
            playSong(index);
        });

        ul.appendChild(li);
    });
}

function playSong(index) {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio = null;
        clearInterval(playtimeInterval);
    }
    currentSongIndex = index;
    currentAudio = new Audio(songUrls[currentSongIndex]);
    currentAudio.play();
    updatePlayPauseIcon(true);

    currentAudio.addEventListener("loadeddata", () => {
        console.log(currentAudio.duration, currentAudio.currentSrc, currentAudio.currentTime);
        updateSongInfo();
    });

    currentAudio.addEventListener('timeupdate', () => {
        updateSeekBar();
        updateSongInfo();
    });

    currentAudio.addEventListener('ended', () => {
        clearInterval(playtimeInterval);
        playNextSong(); // Play next song when current one ends
    });

    playtimeInterval = setInterval(updateSongInfo, 1000); // Update every second
}

function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songUrls.length;
    playSong(currentSongIndex);
}

function playPreviousSong() {
    currentSongIndex = (currentSongIndex - 1 + songUrls.length) % songUrls.length;
    playSong(currentSongIndex);
}

function togglePlayPause() {
    if (currentAudio) {
        if (currentAudio.paused) {
            currentAudio.play();
            updatePlayPauseIcon(true);
            playtimeInterval = setInterval(updateSongInfo, 1000); // Resume updating playtime
        } else {
            currentAudio.pause();
            updatePlayPauseIcon(false);
            clearInterval(playtimeInterval); // Pause updating playtime
        }
    }
}

function updatePlayPauseIcon(isPlaying) {
    const playButton = document.getElementById('play');
    if (isPlaying) {
        playButton.src = 'svg/pause.svg';
    } else {
        playButton.src = 'svg/play.svg';
    }
}

function updateSongInfo() {
    if (!currentAudio) return;
    const songInfoDiv = document.querySelector('.songinfo');
    const songTimeDiv = document.querySelector('.songtime');
    const songName = formatSongName(songUrls[currentSongIndex]);
    const currentTime = currentAudio ? formatTime(currentAudio.currentTime) : '0:00';
    const duration = currentAudio ? formatTime(currentAudio.duration) : '0:00';

    songInfoDiv.textContent = songName;
    songTimeDiv.textContent = `${currentTime} / ${duration}`;
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
}

function updateSeekBar() {
    if (!currentAudio) return;
    const seekbar = document.querySelector('.seekbar');
    const circle = document.querySelector('.seekbar .circle');
    const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
    circle.style.left = `calc(${percentage}% - ${circle.offsetWidth / 2}px)`;
}

function seek(event) {
    const seekbar = document.querySelector('.seekbar');
    const rect = seekbar.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const percentage = offsetX / rect.width;
    if (currentAudio) {
        currentAudio.currentTime = percentage * currentAudio.duration;
    }
}

function initSeekBar() {
    const seekbar = document.querySelector('.seekbar');
    const circle = document.querySelector('.seekbar .circle');

    let isDragging = false;

    circle.addEventListener('mousedown', () => {
        isDragging = true;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            seek(event);
        }
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
        }
    });

    seekbar.addEventListener('click', (event) => {
        seek(event);
    });
}

const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', async () => {
            const album = card.getAttribute('data-album');
            console.log(`Fetching songs from album: ${album}`);
            if (album) {
                try {
                    const songUrls = await fetchSongs(album);
                    console.log(`Songs fetched: ${songUrls}`);
                    displaySongs(songUrls);
                } catch (error) {
                    console.error(`Error fetching songs for album ${album}:`, error);
                }
            }
        });
    


    // Set up play buttons
    document.getElementById('play').addEventListener('click', togglePlayPause);
    document.getElementById('previous').addEventListener('click', playPreviousSong);
    document.getElementById('next').addEventListener('click', playNextSong);
});

document.querySelector(".hamburger").addEventListener("click", ()=>{
    document.querySelector(".left").style.left ="0"
})

document.querySelector(".hamburger1").addEventListener("click", ()=>{
    document.querySelector(".left").style.left ="-110%"
})

    