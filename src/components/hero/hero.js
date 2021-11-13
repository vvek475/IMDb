import { useEffect,useState } from "react";
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'
const API_URL = BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
function Hero(){
    const [movieList, setMovieList] = useState([]);
    const [videos,setVideos] = useState('580489')
    const [title,setTitle]=useState(['Venom: Let There Be Carnage','8',`${IMG_URL}/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg`])
    const [vid,setvid]=useState('')
    const [visibility,setvisibility]=useState('hero__overiframe active')
    useEffect(() => {
        fetch(API_URL)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const result=data.results  
            setMovieList(result);
        })
    },[])
    const filtered_movies=movieList.slice(0,3)
    const VIDEO_URL =BASE_URL + '/movie/'+videos+'/videos?'+API_KEY
    useEffect(() => {
    fetch(VIDEO_URL).then(res => res.json()).then(videoData => fetch_video(videoData))
    })
    function fetch_video(data){
        const {key}=data.results[1]
        setvid(`https://www.youtube.com/embed/${key}`)
    }
    function changevideo(id,title,votes,image){
        setVideos(id)
        setTitle([title,votes,`${IMG_URL+image}`])
    }
    function returnvideo(){

        return (
            <>
        <iframe  class="hero__iframe"src={vid} title={title[0]} frameborder="0"></iframe>
        <div onClick={()=>(setvisibility('hero__overiframe'))} class={visibility}>
        <img src={title[2]} alt={title[0]}/>
        <p class="hero__iframe__title">{title[0]}</p>
        <p class="hero__iframe__text"></p>
        </div>
        </>)
    }
    return (
        <section class="hero container">
            {returnvideo()}
            
        <div class="hero__list__box">
            {filtered_movies.map((movies)=>(
                <span class="hero__list-box-list-items">
                <img  onClick={()=>(changevideo(movies.id,movies.title,movies.vote_average,movies.poster_path))} src={IMG_URL + movies.poster_path} alt={movies.title} class="list-items-image"/>
                <div class="list-items-content">
                    <h4 onClick={()=>(changevideo(movies.id,movies.title,movies.vote_average,movies.poster_path))}class="list-item-title">{movies.title} <br/><br/>
                     </h4><h4><span class="star">★</span>&nbsp;&nbsp;&nbsp; {movies.vote_average}<br/></h4>
                    {/* {movies.overview} */}
                </div>
            </span>
            ))}
        </div>
    </section>
    )
}

export default Hero