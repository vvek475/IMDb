import { useState ,useEffect,useContext} from "react";
import { Link } from "react-router-dom";
import MovieProvider from "../../store/movieProvider";
import Cast from "../cast/cast";
import MovieSlide from "../movieslide/movieslide"
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
/* const MOVIE_URL = `${BASE_URL}/movie/${id}?${API_KEY}&language=en-US`
const SIMILAR_URL=`${BASE_URL}/movie/${id}/similar?${API_KEY}&language=en-US&page=1`
const CAST_URL=`${BASE_URL}/movie/${id}/credits?${API_KEY}&language=en-US`
const VIDEO_URL =BASE_URL + '/movie/'+id+'/videos?'+API_KEY */

function MovieInfo(){
    const [movieid,]=useContext(MovieProvider)
    const [vid,setvid]=useState('')
    const [movieinfo,setmovieinfo] =useState()
    const [similar,setsimilar] = useState()
    const [cast,setcast] = useState()

    var castobj=[]
    useEffect(() => {
        // GET VIDEOS URL
        return fetch(BASE_URL + '/movie/'+movieid+'/videos?'+API_KEY).then(res => res.json()).then(videoData => fetch_video(videoData))
        },[movieid])
        function fetch_video(data){
            if (data.results.length>0){
            const {key}=data.results[0]
            setvid(`https://www.youtube.com/embed/${key}`)}
        }
    useEffect(()=>{
        // GET MOVIE URL
        fetch(`${BASE_URL}/movie/${movieid}?${API_KEY}&language=en-US`).then((response)=>response.json()).then((data)=>{setmovieinfo(data)})
    },[movieid])
    useEffect(()=>{
        //GET CAST URL
        fetch(`${BASE_URL}/movie/${movieid}/credits?${API_KEY}&language=en-US`).then((response)=>response.json()).then((data)=>{setcast(data.cast)})
    },[movieid])
    var castfilter=''
    cast?castfilter=cast.slice(0,10):castfilter=''
    cast?(
        castfilter.forEach(cast => {
        const {name,character,profile_path}=cast
        castobj.push({name,character,profile_path})
    })):console.log('none')
    useEffect(()=>{
        fetch(`${BASE_URL}/movie/${movieid}/similar?${API_KEY}&language=en-US&page=1`).then((response)=>response.json()).then((data)=>{setsimilar(data.results)})
    },[movieid])
    return (
        <>
        <Link to="/"><div class="back2Home container">Back To Home</div></Link>
            {movieinfo?
        <div class="movieIframe container">
            <iframe class="info__iframe"src={vid} title='Trailer' frameborder="0"></iframe> 
                <div class='movieInfo__title'>
                    <img class="movieInfo__image" alt={movieinfo.original_title} src={IMG_URL+movieinfo.poster_path}/>
                </div>
      </div>  :''}

        {movieinfo?<div class="movieInfo__content container">
                    <p class="movieInfo__name">
                    <span><div class='goldenletters'> Title  </div>:&nbsp; {movieinfo.original_title} </span>
                    <span> <div class='goldenletters'>Rating  </div>:&nbsp; {movieinfo.vote_average}</span> 
                    <span><div class='goldenletters'> Status   </div>:&nbsp; {movieinfo.status}</span>
                    <span><div class='goldenletters'> Budget   </div>:&nbsp; {movieinfo.budget} </span>
                    <span> <div class='goldenletters'>Release  </div>: &nbsp;{movieinfo.release_date} </span>
                    </p>
                <div class="movieInfo__overview">
                    {movieinfo.overview}
                </div>
                </div>:''}
                <h3 class="casttitle container"><p>Cast</p></h3>
                <div class='cast container'>
                    {cast?cast.map((cast)=><Cast value={cast}/>):''}
                </div>
                <section class="inTheatres container">
                    <h2 class="slide__title">Similar Movies</h2>
                    <div class='movieBox'></div>
                    <div class="movie_box_overflow movieinfo__slide container">
                        {similar?similar.map((movie)=>{
                            return  <MovieSlide title={movie.original_title} id={movie.id} image={IMG_URL+movie.poster_path} vote={movie.vote_average.toFixed(1)}/>
                        }):''}
                    </div>
                </section>
        </>
    )
}
export default MovieInfo