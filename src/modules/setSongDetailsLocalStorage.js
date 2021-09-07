export default async function setSongDetailsLocalStorage(){
    localStorage.setItem('current_min',JSON.stringify(0))
    localStorage.setItem('current_sec',JSON.stringify(0))
    localStorage.setItem('total_mins',JSON.stringify(0))
    localStorage.setItem('total_secs',JSON.stringify(0))
    localStorage.setItem('isPlaying',JSON.stringify(true))
}