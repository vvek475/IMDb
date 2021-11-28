import { Link } from "react-router-dom";
import MovieSlide from "../movieslide/movieslide"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function TV({moviearray,title,url}){
    var mainDiv=document.getElementById('movieBox__tv')

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
    return(
        <section className="inTheatres container">
            <Link to={`/page/${url}`} ><h2 className="slide__title">{title}<span className="fancy" children=" >>"></span></h2></Link>
            <div className='movieBox'>
                <button onClick={scrollright} className="prev_button">🢔</button>
                <div id="movieBox__tv" className="movie_box_overflow">
                {moviearray && moviearray.map((movie)=>(

                <MovieSlide key={movie.id} title={movie.original_name} domain={title}image={IMG_URL+movie.poster_path} 
                vote={movie.vote_average}/>))}
                </div>
                <button onClick={scrollleft} className="next_button">🢖</button>
            </div>
        </section>
    )
}

export default TV