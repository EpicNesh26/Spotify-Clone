

// // async function fetchSongs() {
// //     const response = await fetch("http://127.0.0.1:5500/songs/");
// //     const text = await response.text();

// //     // Parse the HTML response to extract song URLs
// //     const parser = new DOMParser();
// //     const doc = parser.parseFromString(text, 'text/html');
// //     const links = doc.querySelectorAll('a');
// //     const songUrls = Array.from(links)
// //         .map(link => link.href)
// //         .filter(href => href.endsWith('.mp3'));
// //     return songUrls
// // }



// // document.addEventListener('DOMContentLoaded', async () => {

// //     const songUrls = await fetchSongs();
// //     console.log("Song URLs:", songUrls);

// //     var audio = new Audio(songUrls[0])
// //     audio.play();

// //     audio.addEventListener("loadeddata", () => {
// //         console.log(audio.duration, audio.currentSrc, audio.currentTime)
// //     })
// // });


// async function fetchSongs() {
//     const response = await fetch("http://127.0.0.1:5500/songs/");
//     const text = await response.text();

//     // Parse the HTML response to extract song URLs
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(text, 'text/html');
//     const links = doc.querySelectorAll('a');
//     const songUrls = Array.from(links)
//         .map(link => link.href)
//         .filter(href => href.endsWith('.mp3'));
//     return songUrls;
// }

// function formatSongName(url) {
//     // Remove part before /songs/ and replace %20 with space
//     const songPath = url.split('/songs/')[1];
//     const decodedName = decodeURIComponent(songPath);
//     return decodedName.replace('.mp3', '');
// }


// function displaySongs(songUrls) {
//     const ul = document.querySelector('ul.songlist');
//     // ul.innerHTML = ''; // Clear any existing content
//     songUrls.forEach(url => {
//         const li = document.createElement('li');
//         const a = document.createElement('a');
//         a.href = url;
//         a.textContent = formatSongName(url); // Display formatted song name
//         li.appendChild(a);
//         ul.appendChild(li);
//     });
// }

// document.addEventListener('DOMContentLoaded', async () => {
//     const songUrls = await fetchSongs();
//     console.log("Song URLs:", songUrls);
//     displaySongs(songUrls);

//     if (songUrls.length > 0) {
//         var audio = new Audio(songUrls[0]);
//         audio.play();

//         audio.addEventListener("loadeddata", () => {
//             console.log(audio.duration, audio.currentSrc, audio.currentTime);
//         });
//     }

// })

async function fetchSongs() {
    const response = await fetch("http://127.0.0.1:5500/songs/");
    const text = await response.text();

    // Parse the HTML response to extract song URLs
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = doc.querySelectorAll('a');
    const songUrls = Array.from(links)
        .map(link => link.href)
        .filter(href => href.endsWith('.mp3'));
    return songUrls;
}

function formatSongName(url) {
    // Remove part before /songs/, decode URI components, and remove .mp3
    const songPath = url.split('/songs/')[1];
    const decodedName = decodeURIComponent(songPath);
    return decodedName.replace('.mp3', '');
}

function displaySongs(songUrls) {
    const ul = document.querySelector('ul.songlist');
    ul.innerHTML = ''; // Clear any existing content
    songUrls.forEach(url => {
        const li = document.createElement('li');
        li.style.display = 'flex';
        li.style.gap = '12px';
        // li.style.justifyContent = 'space-between';
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

        ul.appendChild(li);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const songUrls = await fetchSongs();
    console.log("Song URLs:", songUrls);
    displaySongs(songUrls);

    if (songUrls.length > 0) {
        var audio = new Audio(songUrls[0]);
        audio.play();

        audio.addEventListener("loadeddata", () => {
            console.log(audio.duration, audio.currentSrc, audio.currentTime);
        });
    }
});
