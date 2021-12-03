import { useEffect,useState } from "react";
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'
const API_URL = BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
function Hero(){
    const [movieList, setMovieList] = useState([]);
    const [videos,setVideos] = useState('')
    const [Title,setTitle]=useState(['','',``])
    const [vid,setvid]=useState('')
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
    const video_movie=filtered_movies[0]
    if (movieList.length>1){
        var {id,poster_path,title,vote_average}=video_movie}
    useEffect(()=>{
            setVideos(id)
            setTitle([title,vote_average,`${IMG_URL+poster_path}`])
    },[id,movieList,poster_path,title,vote_average])
    
    const VIDEO_URL =BASE_URL + '/movie/'+videos+'/videos?'+API_KEY
    async function video() {
        const response=await fetch(VIDEO_URL)
        const data=await response.json()
        if (data.results){
        const {key}=await data.results[1]
        setvid(`https://www.youtube.com/embed/${key}`)}

        }
    videos && video()
    function changevideo(id,title,votes,image){
        setVideos(id)
        setTitle([title,votes,`${IMG_URL+image}`])
    }
    function returnvideo(){

        return (
            <>
            <iframe  className="hero__iframe"src={vid} title={Title[0]} frameBorder="0"></iframe>
            <div  className='hero__overiframe'>
                <img src={Title[2]} alt={Title[0]}/>
                <p className="hero__iframe__title">{Title[0]}</p>
                <p className="hero__iframe__text"></p>
            </div>
        </>)
    }
    return (
        <section className="hero container">
            {returnvideo()}
            
        <div className="hero__list__box">
            {filtered_movies.map((movies)=>(
                <span key={movies.id} className={`hero__list-box-list-items ${movies.id===videos ? 'active_trailer':''}`}>
                <img  onClick={()=>(changevideo(movies.id,movies.title,movies.vote_average,movies.poster_path))} src={IMG_URL + movies.poster_path} alt={movies.title} className="list-items-image"/>
                <div className="list-items-content">
                    <h4 onClick={()=>(changevideo(movies.id,movies.title,movies.vote_average,movies.poster_path))}className="list-item-title">{movies.title} <br/><br/>
                     </h4><h4><span className="star">★</span>&nbsp;&nbsp;&nbsp; {movies.vote_average}<br/></h4>
                </div>
            </span>
            ))}
        </div>
    </section>
    )
}

export default Hero