console.log("Lets start Javascript")


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

document.addEventListener('DOMContentLoaded', async () => {
    const songUrls = await fetchSongs();
    console.log("Song URLs:", songUrls);
    var audio = new Audio(songUrls[0])
    audio.play();

    audio.addEventListener("loadeddata", () => {
        console.log(audio.duration, audio.currentSrc, audio.currentTime)
    })
});

