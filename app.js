
const searchFunction = () => {
    const searchedText = document.getElementById('searched-text').value;
    
    const url = `https://api.lyrics.ovh/suggest/${searchedText}`;

    fetch(url)
    .then(res => res.json())
    .then(data => searchResult(data.data))
    .catch(error => displayError('কিতারে ভাই কি সার্চ দেও? রিলোড মারো মিয়া।'))
}

const searchResult = songs => {
    const searchList = document.getElementById('searchedResult');
    searchList.innerHTML = "";

    songs.forEach( song => {
        // console.log(song);
        const div = document.createElement('div');
        div.className = ' single-result row align-items-center my-3 p-3'
        div.innerHTML = `

                    <div class="col-md-9">
                        <h3 class="lyrics-name">${song.title}</h3>
                        <p class="author lead">Album by <span>${song.artist.name}</span></p>
                        <audio controls>
                                <source src="${song.preview}" type="audio/ogg">
                        </audio>
                    </div>
                    <div class="col-md-3 text-md-right text-center">
                        <button onclick="getLyrics('${song.artist.name}','${song.title}')" class="btn btn-success">Get Lyrics</button>
                    </div>

        `
        searchList.appendChild(div);
    });
}


const getLyrics = (artist , title) => {
    
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;
    
    fetch(url)
    .then(res => res.json())
    .then(data => searchLyrics(data.lyrics))
    .catch(error => displayError('ভাই এই গানের লিরিক্স নাই। আই কিত্তাম?'))
}

const searchLyrics =  lyrics => {
    const lyricsHolder = document.getElementById('search-lyrics');
    lyricsHolder.innerText = lyrics;
}


// error msg 
const displayError = errorMsg => {
    const errorHolder = document.getElementById('error-msg');
    errorHolder.innerText = errorHolder;
}
