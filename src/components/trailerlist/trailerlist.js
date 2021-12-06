import Trailerslide from "../trailerslide/trailerslide"

export default function  Trailerlist({trendingList}){

    var mainDiv=document.getElementById('trailerlist_scroll')
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
        <>
            <div className="container">
            <h2 className="slide__title">Trending Trailers</h2>
            </div>
        <div className="trailerlist__bg__img container">
            <div  className="trailerlist">
                <button className="prev_button trlbtnp" onClick={scrollright}>🢔</button>
                <div id="trailerlist_scroll" className="trailer__box">
                {trendingList.map((movie)=>{

                    return <Trailerslide id={movie.id} tvname={movie.original_name} name={movie.title} img={movie.backdrop_path}/>
                })}
                </div>
                <button onClick={scrollleft} className="next_button trlbtnn">🢖</button>
            </div>
        </div>
        </>
    )
}