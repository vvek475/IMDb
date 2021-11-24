import MovieSlide from "../movieslide/movieslide"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function TV({moviearray,title}){
    return(
        <section className="inTheatres container">
            <h2 className="slide__title">{title}</h2>
            <div className='movieBox'>
                <div className="movie_box_overflow">
                {moviearray?moviearray.map((movie)=>(
                <MovieSlide key={movie.id} title={movie.original_name} domain={title}image={IMG_URL+movie.poster_path} vote={movie.vote_average}/>)):'loading'}
                </div>
            </div>
        </section>
    )
}

export default TV