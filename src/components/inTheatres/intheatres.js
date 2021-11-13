import MovieSlide from "../movieslide/movieslide"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function Intheatres({moviearray,title}){
    return(
        <section class="inTheatres container">
            <h2 class="slide__title">{title}</h2>
            <div class='movieBox'>
                <div class="movie_box_overflow">
                {moviearray.map((movie)=>{
                    
                    return <MovieSlide title={movie.original_title} domain={title} id={movie.id} image={IMG_URL+movie.poster_path} vote={movie.vote_average}/>})}
                </div>
            </div>
        </section>
    )
}

export default Intheatres