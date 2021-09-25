export default async function playNextMusic(music_arr){
    let index = JSON.parse(localStorage.getItem('index'))
    console.log(index)
    index = (index+1)%music_arr.length
    localStorage.setItem('index',JSON.stringify(index))
    await (await import('./handleMiniPlayerAndSongPlay.js')).default(music_arr[index],index,'next')
    localStorage.setItem('isPlaying',JSON.stringify(true))
}