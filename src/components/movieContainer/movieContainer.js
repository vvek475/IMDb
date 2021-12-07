import { Link } from "react-router-dom";
import MovieSlide from "../movieslide/movieslide"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function MovieContainer({moviearray,title,watchlist,url}){
    var movie_id_array=[]
    watchlist && watchlist.forEach((e)=>{
        movie_id_array.push(Number(e.movie_id))
    })
    var mainDiv=document.getElementById(title)
    function scrollright() {
        mainDiv.scrollLeft -= 400;
     }
     
     function scrollleft() {
        mainDiv.scrollLeft += 400;
     }
    const array=moviearray
    var arr=[]
    var arr3=[]
    var arr2=[]
    /* not to repeat movies in recent */
    array.forEach((element)=>{
        if (!arr2.includes(element.movie_id)){
            arr.push(element.id)
            arr2.push(element.movie_id)
            arr3.push(element)
        }
    })
    arr3.reverse()
    setTimeout(function(){mainDiv? mainDiv.scrollLeft+=400:console.log() }, 6000);
    setTimeout(function(){mainDiv? mainDiv.scrollLeft+=800:console.log() }, 12000);
    setTimeout(function(){mainDiv? mainDiv.scrollLeft+=1200:console.log() }, 18000);
    // reverse
    setTimeout(function(){mainDiv? mainDiv.scrollLeft-=1200:console.log() }, 24000);
    setTimeout(function(){mainDiv? mainDiv.scrollLeft-=800:console.log() }, 30000);
    setTimeout(function(){mainDiv? mainDiv.scrollLeft-=500:console.log() }, 36000);
    return(
        <section className="movieContainer container">
            {title!=='Recent Views'?<Link to={`/page/${url}`} >
                <h2 className="slide__title">{title}<span className="fancy" children=" >>"></span></h2></Link>: 
                <h2 className="slide__title">{title}</h2>}
            <div  className='movieBox'>
            <button className="prev_button" onClick={scrollright}>🢔</button>
                <div id={title}  className="movie_box_overflow">
                {title!=='Recent Views'?moviearray && moviearray.map((movie)=>(
                    (movie.original_title || movie.original_name) && movie.vote_average>1 && <MovieSlide key={movie.id} watchlist={watchlist} title={movie.original_title} tvname={ movie.original_name} 
                    movie_id={movie.id} id_array={movie_id_array} image={IMG_URL+movie.poster_path} vote={movie.vote_average}/>))
                :/* Recent */
               moviearray && arr3.map((movie)=>{
                    return <MovieSlide key={movie.id} watchlist={watchlist} title={movie.movie_name} 
                    domain={title} movie_id={movie.movie_id} id_array={movie_id_array} image={movie.image} vote={movie.vote}/>})}
                </div>
                <button onClick={scrollleft} className="next_button">🢖</button>
            </div>
        </section>
    )
}

export default MovieContainer