import songListRenderer from './modules/songListrenderer.js'
import {music_arr} from "./modules/songArr.js"

const log = console.log
let isPlaying = false
localStorage.setItem('isPlaying',JSON.stringify(false))

songListRenderer(music_arr)

play_btn.addEventListener('click',function(e){
    e.stopPropagation()
    isPlaying = JSON.parse(localStorage.getItem('isPlaying'))
    if(isPlaying){
        isPlaying = false
        audio_element.pause()
        this.innerHTML = '<span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg></span>'
    } else{
        isPlaying = true
        audio_element.play()
        this.innerHTML = '<span><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="pause-circle" class="svg-inline--fa fa-pause-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"></path></svg></span>'

    }
    localStorage.setItem('isPlaying',JSON.stringify(isPlaying))
})

back_btn.addEventListener('click',(e)=>{
    e.stopPropagation()
    let index = JSON.parse(localStorage.getItem('index'))
    mini_song_img.src = music_arr[index].img
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
    audio_element.currentTime = 0;
    const playNextMusic = await import('./modules/playNextMusic.js')
    playNextMusic.default(music_arr)
    mini_song_img.style.animation = 'animate_img 0.3s ease forwards'
    setTimeout(()=> mini_song_img.style.animation = '',350)
})
prev_btn.addEventListener('click',async(e)=>{
    e.stopPropagation()
    audio_element.currentTime = 0;
    const setSongDetailsLocalStorage = await import('./modules/setSongDetailsLocalStorage.js')
    setSongDetailsLocalStorage.default()
    const playPrevMusic = await import('./modules/playPrevMusic.js')
    playPrevMusic.default(music_arr)
    mini_song_img.style.animation = 'animate_img_back 0.3s ease forwards'
    setTimeout(()=> mini_song_img.style.animation = '',350)

})

progress_bar_container.addEventListener('click',(e)=>{
    const {offsetX} = e
    const {clientWidth} = e.target
    const percent = (offsetX / clientWidth)*audio_element.duration
    audio_element.currentTime = percent
})


// addEventListener('load',async()=>{
//     let index = JSON.parse(localStorage.getItem('index'))
//     if(index == 0 || index){
//         const handleMiniPlayerAndSongPlay = await import('./modules/handleMiniPlayerAndSongPlay.js')
//         handleMiniPlayerAndSongPlay.default(music_arr[index],index,'','from_local')
//     }
// })

audio_element.addEventListener('loadstart',()=>{
    mini_song_img.classList.add('hide_song_img')
    img_container_loader.classList.remove('hide_song_loader')
})
audio_element.addEventListener('canplay',()=>{
    mini_song_img.classList.remove('hide_song_img')
    img_container_loader.classList.add('hide_song_loader')
})



dark_mode_btn.addEventListener('click',()=>{
    document.body.classList.toggle('dark_mode')
    if(dark_mode_btn.innerHTML == '🌚'){
        dark_mode_btn.innerHTML = '🌞';
    }else{
        dark_mode_btn.innerHTML = '🌚';

    }
})