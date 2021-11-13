import { useContext } from "react";
import MovieProvider from "../../store/movieProvider";
import { Link } from "react-router-dom";

function MovieSlide({title,image,vote,id,domain}){
    const [,setmovieid]=useContext(MovieProvider)
    return(
        <div class="movieslides">
            <img class="movie_img_potrait" src={image} alt={title}/>
            <div class="movieslides__content">
                <div clas="rating"><span class="star">★</span> {vote} <span class="hollow_star">☆</span></div>
                {domain==='Popular TV Shows'?<p class="movieslides__title">{title}</p>:
                <Link to="/movieInfo" >
                    <p onClick={()=>(setmovieid(id))} class="movieslides__title">{title}</p>
                </Link>}
                <button class="add_watchlist"> + Watchlist</button>
                {domain==='Popular TV Shows'?<p  class="trailer">⏵ Trailer</p>
                :
                <Link to="/movieInfo" >
                    <p  onClick={()=>(setmovieid(id))} class="trailer">⏵ Trailer</p>
                </Link>}
            </div>
        </div>
    )
}

export default MovieSlide