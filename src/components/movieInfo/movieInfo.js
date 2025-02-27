import { useState ,useEffect} from "react";
import Cast from "../cast/cast";
import MovieSlide from "../movieslide/movieslide"
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
/* const MOVIE_URL = `${BASE_URL}/movie/${id}?${API_KEY}&language=en-US`
const SIMILAR_URL=`${BASE_URL}/movie/${id}/similar?${API_KEY}&language=en-US&page=1`
const CAST_URL=`${BASE_URL}/movie/${id}/credits?${API_KEY}&language=en-US`
const VIDEO_URL =BASE_URL + '/movie/'+id+'/videos?'+API_KEY */

function MovieInfo(props){
    const movieid=props.match.params.id
    const [vid,setvid]=useState('')
    const [movieinfo,setmovieinfo] =useState()
    const [similar,setsimilar] = useState()
    const [cast,setcast] = useState()

    var mainDiv=document.getElementById('similar_movies')

    function scrollright() {
        mainDiv.scrollLeft -= 400;
     }
     
     function scrollleft() {
        mainDiv.scrollLeft += 400;
     }
     setTimeout(function(){mainDiv? mainDiv.scrollLeft+=400:console.log() }, 6000);
     setTimeout(function(){mainDiv? mainDiv.scrollLeft+=800:console.log() }, 12000);
     setTimeout(function(){mainDiv? mainDiv.scrollLeft+=1200:console.log() }, 18000);
     // reverse
     setTimeout(function(){mainDiv? mainDiv.scrollLeft-=1200:console.log() }, 24000);
     setTimeout(function(){mainDiv? mainDiv.scrollLeft-=800:console.log() }, 30000);
     setTimeout(function(){mainDiv? mainDiv.scrollLeft-=500:console.log() }, 36000);
    var castobj=[]
    useEffect(() => {
        // GET VIDEOS URL
        return fetch(BASE_URL + '/movie/'+movieid+'/videos?'+API_KEY).then(res => res.json()).then(videoData => fetch_video(videoData))
        },[movieid])
        function fetch_video(data){
            if(Array.isArray(data.results)){
            if (data.results.length>0){
            const {key}=data.results[0]
            setvid(`https://www.youtube.com/embed/${key}`)}}
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
    cast && (
        castfilter.forEach(cast => {
        const {name,character,profile_path}=cast
        castobj.push({name,character,profile_path})
    }))
    useEffect(()=>{
        fetch(`${BASE_URL}/movie/${movieid}/similar?${API_KEY}&language=en-US&page=1`).then((response)=>response.json()).then((data)=>{setsimilar(data.results)})
    },[movieid])
    return (
        <>
            {movieinfo &&
        <div className="movieIframe container">
            <iframe className="info__iframe"src={vid} title='Trailer' frameBorder="0"></iframe> 
                <div className='movieInfo__title'>
                    <img className="movieInfo__image" alt={movieinfo.original_title} src={IMG_URL+movieinfo.poster_path}/>
                </div>
      </div>}

        {movieinfo  && <div className="movieInfo__content container">
                    <p className="movieInfo__name">
                    <span><div className='goldenletters'> Title  </div>:&nbsp; {movieinfo.original_title || movieinfo.original_name} </span>
                    <span> <div className='goldenletters'>Rating  </div>:&nbsp; {movieinfo.vote_average}</span> 
                    <span><div className='goldenletters'> Status   </div>:&nbsp; {movieinfo.status}</span>
                    <span><div className='goldenletters'> Budget   </div>:&nbsp; {movieinfo.budget} </span>
                    <span> <div className='goldenletters'>Release  </div>: &nbsp;{movieinfo.release_date} </span>
                    </p>
                <div className="movieInfo__overview">
                    {movieinfo.overview}
                </div>
                </div>}
                    <br/>
                <h3 className="casttitle container"><p>Cast</p></h3>
                <div className='cast container'>
                    {cast && cast.map((cast)=>
                    
                    <Cast value={cast}/>)}
                </div>
                <section className="movieContainer container">
                    <h2 className="slide__title">Similar Movies</h2>
                    <div className='movieBox'>
                    <button onClick={scrollright} className="prev_button similar_btnp">🢔</button>
                    <div id="similar_movies" className="movie_box_overflow movieinfo__slide container">
                        {similar && similar.map((movie)=>{
                            return  <MovieSlide title={movie.original_title} movie_id={movie.id} image={IMG_URL+movie.poster_path} vote={movie.vote_average.toFixed(1)}/>
                        })}
                    </div>
                    <button onClick={scrollleft} className="next_button similar_btnn">🢖</button>
                    </div>
                </section>
        </>
    )
}
export default MovieInfo