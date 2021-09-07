export default function handleMiniPlayer(song,current_song_index,next,from_local){
    current_song_index = song.id
    audio_element.setAttribute('src',song.src)
    // (from_local) && (audio_element.current_time = JSON.parse)
    from_local && (localStorage.setItem('isPlaying',JSON.stringify(false)))
    !from_local && (audio_element.play())

    if(next){
        mini_song_img.setAttribute('src',song.bigImg)
    }else{
        mini_song_img.setAttribute('src',song.img)
    }
    mini_song_title.textContent = song.name
    mini_song_artist.textContent = song.artist
    mini_player.classList.add('active_mini_player')

    if(localStorage.getItem('current_min')){
        current_time.innerHTML = JSON.parse(localStorage.getItem('current_min')) + ":"+JSON.parse(localStorage.getItem('current_sec'))
        total_time.innerHTML = JSON.parse(localStorage.getItem('total_mins')) + ":"+ JSON.parse(localStorage.getItem('total_secs'))
        audio_element.currentTime =  JSON.parse(localStorage.getItem('current_min'))*60 + JSON.parse(localStorage.getItem('current_sec'))
        // audio_element.duration =  JSON.parse(localStorage.getItem('total_mins'))*60 + JSON.parse(localStorage.getItem('total_secs'))
    }

    mini_player.addEventListener('click',(e)=>{
        e.stopPropagation()
        mini_player.classList.add('expand_mini_player')
        mini_song_img.src = song.bigImg
    })
    return current_song_index
}