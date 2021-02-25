const url = 'https://itunes.apple.com/search?term=';
let resultContainer = document.querySelector(".all-results");
let audioPlayer = document.querySelector('audio')

let topButton = document.querySelector(".back-top-button");
let moreButton = document.querySelector(".load-more-button");

let form = document.querySelector("form");


form.addEventListener('submit', e => {

    e.preventDefault();
    clearSongs();
    getSongs();

})


topButton.addEventListener('click', e => {
    document.documentElement.scrollTop = 0;
    muteAllSongs();
})

moreButton.addEventListener('click', e => {
    clearSongs();
    try {
        let limit = parseInt(document.querySelector('span').innerHTML.split(" ")[2])

        console.log('limit',limit+25)
        getSongs(limit+25)
    } catch (error) {
        console.log(error)
    }

})


document.addEventListener('click', e => {

    if (e.target.className === "song-container" || e.target.className === "album-image") {
        // console.log("preview url " +e.target.parentElement.id)
        // audioPlayer.src = e.target.parentElement.id;
        // audioPlayer.volume = .3;
        let audioContainer = e.target.parentElement.querySelector(".music-container")
        let musicPlayer = audioContainer.querySelector(".music")

        if (audioContainer.classList.contains('hide_div')) {
            audioContainer.classList.remove('hide_div')
            muteAllSongs()
            musicPlayer.play();
        } else {
            audioContainer.classList.add('hide_div')
            musicPlayer.pause()
        }


    }
})



////////////////////////////////////////////////////////////////
function clearSongs() {
    let songs = document.querySelectorAll('.song-container')

    for (let song of songs) {
        song.remove();
    }
}

function muteAllSongs() {
    let allSongs = document.querySelectorAll('.music')

    allSongs.forEach(function(audio) {
        audio.pause();
    })
}

function getSongs(limit=25) {
    let tempURL = 'https://proxy-itunes-api.glitch.me/search?term='
    // let userInput = formatSearchString(document.querySelector(".user-input").value);
    // let limit;
    let userInput = document.querySelector(".user-input").value
    let userLimitInput = parseInt(document.querySelector(".limit-input").value);
    if (userLimitInput > 0) {
        limit = userLimitInput
    } 


    // Hard code a limit for now
    fetch (url + userInput + "&limit=" + limit + "&media=music")
        .then(res => res.json())
        .then(data => {
            console.log(data);
            console.log(data.results[0].artistViewURL)
            for (let song of data.results) {
                if (song.trackName !== undefined) {
                    renderSong(song);
                }
            }
            // for (let song of data.results) {
            //     renderSong(song);
            // }
        })

    userInput = "";
    let searchResultsText = document.querySelector('span')
    searchResultsText.innerHTML = `Search Results: ${limit} songs`
}



function renderSong(song) {

    let songContainer = document.createElement('div');
    songContainer.className = "song-container";
    songContainer.id = song.previewUrl;
    
    let songTrackName = document.createElement('div');
    songTrackName.className = 'song-trackName';
    songTrackName.innerHTML = song.trackName;

    let artistName = document.createElement('p');
    artistName.className = 'artist-name';
    artistName.innerHTML = song.artistName;

    let albumTitle = document.createElement('p');
    albumTitle.className = 'album-title';
    albumTitle.innerHTML = song.collectionName;

    let albumImg = document.createElement('img');
    albumImg.className = 'album-image';
    albumImg.src = song.artworkUrl100;


    let releaseDate = document.createElement('p');
    releaseDate.className = 'release-date';
    let newDate = new Date(song.releaseDate)
    releaseDate.innerHTML = "Released: "+newDate.toLocaleDateString();

    
    let musicContainer = document.createElement('div');
    musicContainer.className = 'music-container';
    musicContainer.classList.add('hide_div')
    let figure = document.createElement('figure');
    let audio = document.createElement('audio');
    audio.className = 'music'
    audio.volume = .3;
    audio.src = song.previewUrl;
    audio.controls = true;
    figure.appendChild(audio)





    musicContainer.appendChild(figure);




    songContainer.appendChild(albumImg);
    songContainer.appendChild(musicContainer);
    songContainer.appendChild(songTrackName);
    songContainer.appendChild(albumTitle);
    songContainer.appendChild(artistName);
    songContainer.appendChild(releaseDate);


    resultContainer.appendChild(songContainer);


}