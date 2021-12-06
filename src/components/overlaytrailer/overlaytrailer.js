import { useState,useEffect } from "react"
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'

export default function Overlaytrailer({id,state,funcn,name,tvname}){
    const [vid,setvid] = useState()
    var url=''
    name?url='/movie/':url='/tv/'
    useEffect(() => {
        // GET VIDEOS URL
        return fetch(BASE_URL + url+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => fetch_video(videoData))
        },[id,url])
        function fetch_video(data){
            if(Array.isArray(data.results)){
            if (data.results.length>0){
            const {key}=data.results[0]
            setvid(`https://www.youtube.com/embed/${key}`)}}
        }
    return(
        <div onClick={funcn} className={`overlaytrailer__fullscreen ${state}`}>
            <iframe title="trailer" src={vid}/>
        </div>
    )
}