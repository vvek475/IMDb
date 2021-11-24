import MovieSlide from "../movieslide/movieslide"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function Intheatres({moviearray,title,watchlist}){
    
    return(
        <section className="inTheatres container">
            <h2 className="slide__title">{title}</h2>
            <div className='movieBox'>
                <div className="movie_box_overflow">
                {moviearray.map((movie)=>{
                    
                    return <MovieSlide key={movie.id} watchlist={watchlist} title={movie.original_title} 
                    domain={title} movie_id={movie.id} image={IMG_URL+movie.poster_path} vote={movie.vote_average}/>})}
                </div>
            </div>
        </section>
    )
}

export default Intheatres