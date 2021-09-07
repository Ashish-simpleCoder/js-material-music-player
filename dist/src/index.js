import songListRenderer from './modules/songListrenderer.js'
import {music_arr} from "./modules/songArr.js"

const log = console.log
let isPlaying = false
localStorage.setItem('isPlaying',JSON.stringify(false))

songListRenderer(music_arr)

play_btn.addEventListener('click',(e)=>{
    e.stopPropagation()
    isPlaying = JSON.parse(localStorage.getItem('isPlaying'))
    if(isPlaying){
        isPlaying = false
        audio_element.pause()
    } else{
        isPlaying = true
        audio_element.play()
    }
    localStorage.setItem('isPlaying',JSON.stringify(isPlaying))
})

back_btn.addEventListener('click',(e)=>{
    e.stopPropagation()
    let index = JSON.parse(localStorage.getItem('index'))
    mini_song_img.src = music_arr[index-1].img
    mini_player.classList.remove('expand_mini_player')
})

audio_element.addEventListener('timeupdate',(e)=>{
    const {currentTime, duration} = e.target
    let total_mins = Math.floor(duration/60)
    let total_secs = Math.floor(duration%60)
    let curr_mins = Math.floor(currentTime/60)
    let curr_sec = Math.floor(currentTime%60)
    if(curr_sec < 10){
        curr_sec = "0"+curr_sec
    }
    if(total_secs<10){
        total_secs = "0"+total_secs
    }
    let percent = (currentTime/duration)*100
    progressive_bar.style.width = percent+"%"

    current_time.innerHTML = curr_mins +" : "+curr_sec
    if(total_mins && total_secs) total_time.innerHTML = total_mins +" : "+total_secs

    localStorage.setItem('current_min',JSON.stringify(curr_mins))
    localStorage.setItem('current_sec',JSON.stringify(curr_sec))
    localStorage.setItem('total_mins',JSON.stringify(total_mins))
    localStorage.setItem('total_secs',JSON.stringify(total_secs))
})
audio_element.addEventListener('ended',async()=>{
    const setSongDetailsLocalStorage = await import('./modules/setSongDetailsLocalStorage.js')
    setSongDetailsLocalStorage.default()
    const playNextMusic = await import('./modules/playNextMusic.js')
    playNextMusic.default(music_arr)
})
// addEventListener('touchendmovestart')

next_btn.addEventListener('click',async(e)=>{
    e.stopPropagation()
    const setSongDetailsLocalStorage = await import('./modules/setSongDetailsLocalStorage.js')
    setSongDetailsLocalStorage.default()
    const playNextMusic = await import('./modules/playNextMusic.js')
    playNextMusic.default(music_arr)
})

prev_btn.addEventListener('click',async(e)=>{
    e.stopPropagation()
    const setSongDetailsLocalStorage = await import('./modules/setSongDetailsLocalStorage.js')
    setSongDetailsLocalStorage.default()
    const playPrevMusic = await import('./modules/playPrevMusic.js')
    playPrevMusic.default(music_arr)
})

progress_bar_container.addEventListener('click',(e)=>{
    // (e.offsetX / e.srcElement.clientWidth)
    const {offsetX} = e
    const {clientWidth} = e.target
    const percent = (offsetX / clientWidth)*audio_element.duration
    audio_element.currentTime = percent
})


addEventListener('load',async()=>{
    let index = JSON.parse(localStorage.getItem('index'))
    if(index){
        const handleMiniPlayerAndSongPlay = await import('./modules/handleMiniPlayerAndSongPlay.js')
        handleMiniPlayerAndSongPlay.default(music_arr[index-1],index,'','from_local')
    }
})