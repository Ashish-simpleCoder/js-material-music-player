
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
        const handleMiniPlayer = await import('./handleMiniPlayerAndSongPlay.js')
        current_song_index = JSON.parse(localStorage.getItem('index')) || 0
        // if(current_song_index == song.id){
        //     return
        // }
        current_song_index = handleMiniPlayer.default(song,current_song_index)
        localStorage.setItem('index',JSON.stringify(current_song_index))
    })
    return div
}