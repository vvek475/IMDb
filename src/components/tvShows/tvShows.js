import MovieSlide from "../movieslide/movieslide"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function TV({moviearray,title}){
    var mainDiv=document.getElementById('movieBox__tv')

    function scrollright() {

        mainDiv.scrollLeft -= 400;
     }
     
     function scrollleft() {
        mainDiv.scrollLeft += 400;
     }
    return(
        <section className="inTheatres container">
            <h2 className="slide__title">{title}</h2>
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