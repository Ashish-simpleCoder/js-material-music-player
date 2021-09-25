
export default function songListRenderer(music_arr){
    music_arr.forEach(song=>{
        song_list_displayer.append(template(song))
    })
}
function template(song){
    let current_song_index = 0
    const div = document.createElement('div')
    div.innerHTML =`<div class='img_container'><img src='${song.img}'></img></div>
                    <div class='details'>
                        <h3>${song.name}</h3>
                        <p>${song.artist}</p>
                    </div>`
    div.classList.add('each_list')
    div.setAttribute('id',song.id)

    div.addEventListener('click',async function(e){
        e.stopPropagation()
        const x = e.clientX - this.getBoundingClientRect().left
        const y = e.clientY - this.getBoundingClientRect().top

        let span = document.createElement('span')
        span.classList.add('span_ripple')
        span.style.left = x+'px'
        span.style.top = y+'px'
        div.appendChild(span)
        setTimeout(()=>span.remove(),500)

        const setSongDetailsLocalStorage = await import('./setSongDetailsLocalStorage.js')
        setSongDetailsLocalStorage.default()
        // current_song_index = JSON.parse(localStorage.getItem('index')) || 0
        const handleMiniPlayer = await import('./handleMiniPlayerAndSongPlay.js')
        handleMiniPlayer.default(song,div.id)
        localStorage.setItem('index',JSON.stringify(parseInt(div.id)))

        play_btn.innerHTML = '<span><svg aria-hidden="true" focusable="false" data-prefix="far" data-icon="pause-circle" class="svg-inline--fa fa-pause-circle fa-w-16" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm96-280v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16zm-112 0v160c0 8.8-7.2 16-16 16h-48c-8.8 0-16-7.2-16-16V176c0-8.8 7.2-16 16-16h48c8.8 0 16 7.2 16 16z"></path></svg></span>'
    })
    return div
}