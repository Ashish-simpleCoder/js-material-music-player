export default function handleMiniPlayer(song,current_song_index,next,from_local){
    audio_element.setAttribute('src',song.src)
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

    play_btn.innerHTML = '<span><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="pause-circle" class="svg-inline--fa fa-pause-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"></path></svg></span>'
    if(from_local){
        play_btn.innerHTML ='<span><svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play-circle" class="svg-inline--fa fa-play-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm115.7 272l-176 101c-15.8 8.8-35.7-2.5-35.7-21V152c0-18.4 19.8-29.8 35.7-21l176 107c16.4 9.2 16.4 32.9 0 42z"></path></svg></span>'
    }
    song_list_displayer.style.paddingBottom = '10vh'

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