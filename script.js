

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
//     return songUrls
// }



// document.addEventListener('DOMContentLoaded', async () => {

//     const songUrls = await fetchSongs();
//     console.log("Song URLs:", songUrls);

//     var audio = new Audio(songUrls[0])
//     audio.play();

//     audio.addEventListener("loadeddata", () => {
//         console.log(audio.duration, audio.currentSrc, audio.currentTime)
//     })
// });


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
    // Remove part before /songs/ and replace %20 with space
    const songPath = url.split('/songs/')[1];
    const decodedName = decodeURIComponent(songPath);
    return decodedName.replace('.mp3', '');
}


function displaySongs(songUrls) {
    const ul = document.querySelector('ul.songlist');
    // ul.innerHTML = ''; // Clear any existing content
    songUrls.forEach(url => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = url;
        a.textContent = formatSongName(url); // Display formatted song name
        li.appendChild(a);
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

})