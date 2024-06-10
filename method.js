// Method 1(Doesnt really work)
// async function main() {
//     let a = await fetch("http://127.0.0.1:5500/songs/");
//     let response = await a.text();
//     console.log(response)
//     let div = document.createElement("div");
//     div.innerHTML = response;
//     let as = div.getElementsByTagName("a");
//     let songs = []
//     for (let index = 0; index < as.length; index++) {
//         const element = array[index];
//         if(element.href.endsWith(".mp3")){
//             songs.push(element.href)

//         }
//     }
//     return songs

// }

// async function main(){
//     let songs = await getSongs()
//     console.log(songs)

//     var audio = new Audio(songs[0]);
//     audio.play();
// }






// Method 2(Works for specific Songs)
// const ctx = new AudioContext();
// let audio;
// fetch("http://127.0.0.1:5500/songs/") -> (Dont add http link , instead add song file path)
// 	.then(data => data.arrayBuffer())
// 	.then(arrayBuffer => ctx.decodeAudioData(arrayBuffer))
// 	.then(decodedAudio => {
// 		audio = decodedAudio;
// 	})

// function playback() {
//     const playSound = ctx.createBufferSource();
//     playSound.buffer = audio;
//     playSound.connect(ctx.destination);
//     playSound.start(ctx.currentTime);
// }

// window.addEventListener("click", playback);






// Method 3(Works the best and plays all songs one by one in order)
// THIS WORRKS THE BEST:
// const ctx = new AudioContext();
//         let currentIndex = 0;
//         let songs = [];
//         let sources = [];

//         async function fetchSongs() {
//             const response = await fetch("http://127.0.0.1:5500/songs/");
//             const text = await response.text();
            
//             // Parse the HTML response to extract song URLs
//             const parser = new DOMParser();
//             const doc = parser.parseFromString(text, 'text/html');
//             const links = doc.querySelectorAll('a');
//             const songUrls = Array.from(links)
//                 .map(link => link.href)
//                 .filter(href => href.endsWith('.mp3'));

//             return songUrls;
//         }

//         async function loadAndDecodeSong(url) {
//             const response = await fetch(url);
//             const arrayBuffer = await response.arrayBuffer();
//             return await ctx.decodeAudioData(arrayBuffer);
//         }

//         async function loadSongs() {
//             const songUrls = await fetchSongs();
//             for (const url of songUrls) {
//                 const audioBuffer = await loadAndDecodeSong(url);
//                 songs.push(audioBuffer);
//             }
//         }

//         function playSong(index) {
//             if (index >= songs.length) return;

//             const playSound = ctx.createBufferSource();
//             playSound.buffer = songs[index];
//             playSound.connect(ctx.destination);
//             playSound.start();

//             playSound.onended = () => {
//                 playSong(index + 1);
//             };

//             sources.push(playSound);
//         }

//         document.getElementById('play').addEventListener('click', async () => {
//             await loadSongs();
//             playSong(currentIndex);
//         });


// Card Event listener

const cards = document.querySelectorAll('.card');
    let touchStartX = null;
    let touchStartY = null;
    cards.forEach(card => {
        card.addEventListener('click', async () => {
            if (touchStartX === null && touchStartY === null) {
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
            }
            // Reset touch start coordinates
            touchStartX = null;
            touchStartY = null;
        });

        card.addEventListener('touchstart', (event) => {
            // Store touch start coordinates
            touchStartX = event.touches[0].clientX;
            touchStartY = event.touches[0].clientY;
        });

        card.addEventListener('touchend', () => {
            // Reset touch start coordinates if no significant touch movement occurred
            if (touchStartX !== null && touchStartY !== null) {
                const touchEndX = event.changedTouches[0].clientX;
                const touchEndY = event.changedTouches[0].clientY;
                const dx = Math.abs(touchEndX - touchStartX);
                const dy = Math.abs(touchEndY - touchStartY);
                if (dx < 10 && dy < 10) {
                    touchStartX = null;
                    touchStartY = null;
                }
            }
        });
    });