## Spotify Clone 
### Overview
This project is a simple Spotify clone built using HTML, CSS, and JavaScript. It allows users to play songs from different albums, control playback, and manage volume. The project demonstrates basic web development skills, including handling events, dynamically updating the DOM, and using the Fetch API to load resources. <br>

### Features
- Display multiple albums with clickable cards.
- Load songs from specific albums and display them in a playlist.
- Play, pause, and skip songs.
- Display the current song's information and duration.
- Show and update the song's current playback time.
- Adjust volume using a volume control button.
- Seek through the song using a draggable seek bar.
- Mobile-friendly touch support for album selection.

### Project Structure
The project is structured as follows:
```
├── index.html 
├── styles.css 
├── script.js 
├── songs/ 
│   ├── Album1/  
│   │   ├── song1.mp3 
│   │   ├── song2.mp3 
│   │   └── ... 
│   └── Album2/ 
│       ├── song1.mp3 
│       ├── song2.mp3 
│       └── ...
└── svg/  
    ├── play.svg 
    ├── pause.svg 
    ├── previous.svg 
    ├── next.svg 
    └── ... 
```

### How It Works
### HTML
The HTML file contains the basic structure of the Spotify clone, including the album cards, playlist, playback controls, and the seek bar.

### CSS
The CSS file is responsible for the styling of the project. It includes styles for the album cards, playlist, playback controls, and the seek bar.

### JavaScript
The JavaScript file contains the core logic of the project:

1. **Fetching Songs:**
  - The fetchSongs function fetches songs from a specific album folder and returns an array of song URLs.
2. **Event Handling:**
  - Event listeners are added to album cards to load songs from the corresponding album when clicked
  - Event listeners are added to playback controls (play, pause, previous, next) to manage song playback.
  - Event listeners are added to the seek bar to allow seeking through the song.
  - Event listeners are added to the volume control button to adjust the volume.
3. **Playing Songs:**
  - Songs are played using the Audio object. The current song's information and duration are displayed and updated as the song plays.
4. **Mobile Support:**
  - Touch event listeners are added to album cards to support song loading on mobile devices.

### Example Code
Here is a snippet of the JavaScript code used to load songs and handle playback:
```
document.addEventListener('DOMContentLoaded', () => {
    // Fetch and display songs from an album when a card is clicked
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('click', async () => {
            const album = card.getAttribute('data-album');
            const songUrls = await fetchSongs(album);
            displaySongs(songUrls);
        });
    });

    // Play/pause button event listener
    document.getElementById('play').addEventListener('click', togglePlayPause);

    // Previous and next button event listeners
    document.getElementById('previous').addEventListener('click', playPreviousSong);
    document.getElementById('next').addEventListener('click', playNextSong);
});

// Fetch songs from a specific album
async function fetchSongs(album) {
    const response = await fetch(`songs/${album}/`);
    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, 'text/html');
    const links = doc.querySelectorAll('a');
    const songUrls = Array.from(links)
        .map(link => link.href)
        .filter(href => href.endsWith('.mp3'));
    return songUrls;
}

// Display songs in the playlist
function displaySongs(songUrls) {
    const songList = document.querySelector('.songlist');
    songList.innerHTML = '';
    songUrls.forEach(songUrl => {
        const songName = decodeURIComponent(songUrl.split('/').pop().replace('.mp3', ''));
        const li = document.createElement('li');
        li.innerHTML = `
            <div style="display: flex; gap: 12px;">
                <img class="invert" style="width: 20px;" src="svg/music.svg" alt="">
                <div class="info">
                    <div>${songName}</div>
                    <div>Nesh</div>
                </div>
                <div class="playnow">
                    <img class="invert play-song" src="svg/play.svg" data-url="${songUrl}" alt="">
                </div>
            </div>
        `;
        songList.appendChild(li);
    });
}
```

### How to Run
1. Clone or download the project to your local machine.
2. Open index.html in a web browser.
3. Click on an album card to load and display the songs in the playlist.
4. Use the playback controls to play, pause, skip, or adjust the volume of the songs.

### Future Improvements
- Add more albums and songs.
- Improve the UI/UX with better styling and animations.
- Add a search feature to find specific songs or albums.
- Implement a backend to manage and serve the songs more efficiently.
- Fix the Touch feature of albums for mobile/tabs.

### Contributing
Contributions are welcome! If you would like to contribute to this project, please follow these steps:
1. Fork the repository: Click the "Fork" button at the top right of the repository page to create a copy of the repository on your GitHub account.
2. Clone the repository: Use the following command to clone your forked repository to your local machine: <br>
   `git clone https://github.com/EpicNesh26/spotify-clone.git`
3. Make your changes: Implement your feature or bugfix in the code.
4. Commit your changes: Use the following commands to add your changes and commit them with a descriptive message: <br>
  ` git add -A ` <br>
  ` git commit --m "Your Commit Message" `
5. Push your changes: Push your changes to your forked repository: <br>
   `git push origin feature-name`
6. Create a Pull Request: Go to the original repository on GitHub and create a pull request from your forked repository. Provide a clear description of your changes and why they should be merged.
7. Review and Merge: Your pull request will be reviewed, and if everything looks good, it will be merged into the main branch.

### License
This project is licensed under the MIT License. Feel free to use and modify it as you like.





