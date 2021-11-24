import MovieSlide from "../movieslide/movieslide";

export default function Watchcomponent(values){
    const {value}=values
    return(
        <>
        <section className="inTheatres container">
        <h2  className="slide__title">Watchlist</h2>
        <div className='movieBox'>
            <div className="movie_box_overflow watchlist_wrap">
            {value.map((movie)=>{ 
           return <MovieSlide key={movie.id}watchlist={value} title={movie.movie_name} 
           domain='In Theatres'
            id={movie.movie_id} image={movie.image} vote={movie.vote}/>})}
            </div>
        </div>
        </section>
        </>
    )
}