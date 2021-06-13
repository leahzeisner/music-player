// DOM Elements

const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const audio = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const currentTimeEl = document.getElementById('current-time')
const durationEl = document.getElementById('duration')
const prevBtn = document.getElementById('prev')
const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')

let isPlaying = false
let songIndex = 0


// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
]



// Play
function playSong() {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    audio.play()
}

// Pause
function pauseSong() {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    audio.pause()
}

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName
    artist.textContent = song.artist
    audio.src = `music/${song.name}.mp3`
    image.src = `img/${song.name}.jpg`
}

// Play Previous Song
function prevSong() {
    if (songIndex === 0) {
        songIndex = songs.length - 1
    } else {
        songIndex--
    }
    loadSong(songs[songIndex])
    playSong()
}

// Play Next Song
function nextSong() {
    if (songIndex === songs.length - 1) {
        songIndex = 0
    } else {
        songIndex++
    }
    loadSong(songs[songIndex])
    playSong()
}

// Update Progress Bar & Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement
        
        // Update Progress Bar Width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`

        // Calculate Display For duration
        const durationMinutes = Math.floor(duration / 60)
        let durationSeconds = Math.floor(duration % 60)

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`
        }

        // Delay Switching duration Element to avoid NaN
        if (durationSeconds) {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`
        }

        // Calculate Display For current time
        const currentMinutes = Math.floor(currentTime / 60)
        let currentSeconds = Math.floor(currentTime % 60)

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`
        }
        currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth
    const clickX = e.offsetX
    const { duration } = audio
    audio.currentTime = (clickX / width) * duration
}






// Event Listeners

// Play or Pause
playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong())

// Previous or Next Song
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)

// Progress Bar Update
audio.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)

// Automatically Play Next Song
audio.addEventListener('ended', nextSong)







// On Load - Select First Song
loadSong(songs[songIndex])



