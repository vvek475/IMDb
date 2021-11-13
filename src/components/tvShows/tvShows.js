import MovieSlide from "../movieslide/movieslide"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function TV({moviearray,title}){
    return(
        <section class="inTheatres container">
            <h2 class="slide__title">{title}</h2>
            <div class='movieBox'>
                <div class="movie_box_overflow">
                {moviearray?moviearray.map((movie)=>(
                <MovieSlide title={movie.original_name} domain={title}image={IMG_URL+movie.poster_path} vote={movie.vote_average}/>)):'loading'}
                </div>
            </div>
        </section>
    )
}

export default TV