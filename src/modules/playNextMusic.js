export default async function playNextMusic(music_arr){
    let index = JSON.parse(localStorage.getItem('index'))
    index = (index+1)%music_arr.length
    localStorage.setItem('index',JSON.stringify(index))
    const handleMiniPlayer = await import('./handleMiniPlayerAndSongPlay.js')
    handleMiniPlayer.default(music_arr[index-1],index,'next')
}