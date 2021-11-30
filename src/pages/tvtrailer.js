import { useEffect,useState } from "react";
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'

export default function TvTrailer(props){
    const id = props.match.params.id
    const [vid,setvid]=useState('')
    useEffect(() => {
        // VIDEO URL
    fetch(BASE_URL + '/tv/'+id+'/videos?'+API_KEY).then(res => res.json()).then(videoData => fetch_video(videoData))
    },[id])
    function fetch_video(data){
        const {key}=data.results[1]
        setvid(`https://www.youtube.com/embed/${key}`)
    }
    return (
        <div className='trailer__iframe'>
            <iframe title='trailer' src={vid}/>
        </div>
    )
}