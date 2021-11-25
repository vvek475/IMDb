import MovieSlide from "../movieslide/movieslide"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function Intheatres({moviearray,title,watchlist}){
    var movie_id_array=[]
    watchlist && watchlist.forEach((e)=>{
        movie_id_array.push(Number(e.movie_id))
    })
    
    return(
        <section className="inTheatres container">
            <h2 className="slide__title">{title}</h2>
            <div className='movieBox'>
                <div className="movie_box_overflow">
                {moviearray && moviearray.map((movie)=>(
                    movie.original_title && movie.vote_average>1 && <MovieSlide key={movie.id} watchlist={watchlist} title={movie.original_title} 
                    domain={title} movie_id={movie.id} id_array={movie_id_array} image={IMG_URL+movie.poster_path} vote={movie.vote_average}/>))
                }
                </div>
            </div>
        </section>
    )
}

export default Intheatres