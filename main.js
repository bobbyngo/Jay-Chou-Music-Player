const musicWrapper = document.querySelector('.music-wrapper');
const title = document.querySelector('#title');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const cover = document.querySelector('#cover');
const prevBtn = document.querySelector('#prev');
const playBtn = document.querySelector('#play');
const nextBtn = document.querySelector('#next');
const audio = document.querySelector('#audio');


const musicList = [
    'Faraway',
    'FailureAtLove',
    'HandWrittenPast',
    'WaitingForYou',
    'CannotOpenMouth'    
]
let songIndex = musicList.length - 1;

const musicTitle = [
    'Faraway',
    'Failure At Love',
    'Hand Written Past',
    'Waiting For You',
    'Cannot Open Mouth'    
]
let titleIndex = musicList.length - 1;


function loadSong(song){
    audio.src = `music/${song}.mp3`;
    cover.src = `images/${song}.jpg`;
}

function loadTitle(song) {
    title.innerText = song;
}
loadSong(musicList[songIndex])
loadTitle(musicTitle[titleIndex])


function playMusic() {
    musicWrapper.classList.add('play');
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');

    audio.play();
}


function pauseMusic() {
    musicWrapper.classList.remove('play');
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play'); 

    audio.pause();
}

function nextSong() {
    songIndex += 1;
    titleIndex += 1;
    if (songIndex > musicList.length - 1) {
        songIndex = 0;
        titleIndex = 0;
    }

    loadSong(musicList[songIndex]);
    loadTitle(musicTitle[titleIndex])
    playMusic();
}

function trackingProgress(e){
    const {duration, currentTime} = e.srcElement;
    const progressPercent = (currentTime/duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    
    audio.currentTime = clickX * duration / width
}

//Event Listener

playBtn.addEventListener('click', () =>{
    const playing = musicWrapper.classList.contains('play');

    if (!playing){
        playMusic();
    }else {
        pauseMusic();
    }
});

nextBtn.addEventListener('click', nextSong);


prevBtn.addEventListener('click', () => {
    songIndex -= 1;
    titleIndex -= 1;
    if (songIndex < 0) {
        songIndex = musicList.length - 1;
        titleIndex = musicList.length - 1;
    }

    loadSong(musicList[songIndex]);
    loadTitle(musicTitle[titleIndex])
    playMusic();
});


audio.addEventListener('timeupdate', trackingProgress);
audio.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgress);