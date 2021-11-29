import MovieSlide from "../movieslide/movieslide"
import {useState,useEffect} from 'react'
import { Link } from "react-router-dom";

const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function TopratedPage(props){
  const url=props.match.params.url
  console.log(url)
  var urlpath=undefined
  var slicer=0
  var page_title=''
  
    const [value,setvalue]=useState()
    const [page,setpage]=useState(1)
    if (url==='1'){
      urlpath='/movie/top_rated?'
      page_title='Top Rated Movies'
      slicer=1
    }
    else if (url==='2'){
      urlpath='/movie/popular?'
      page_title="In Theatres"
    }
    else if (url==='3'){
      urlpath='/trending/all/day?'
      page_title='Trending'
    }
    else if(url==='4'){
      urlpath='/tv/popular?'
      page_title='TV Shows'
    }
    else if(url==='5'){
      urlpath='/tv/top_rated?'
      page_title='Top Rated TV Shows'
      console.log('tvtop')
    }
  // const TOP_RATED_URL=`${BASE_URL}/movie/top_rated?${API_KEY}&page=1`
    useEffect(() => {
      
        (page && urlpath )?fetch(`https://api.themoviedb.org/3${urlpath}api_key=4f131ce27b7e4bfcd74de86ff5191005&page=${page}`)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            const result=data.results  
            setvalue(result.slice(slicer,19));
          })
      :console.log(urlpath)},[page,urlpath,slicer])
      function prev(){
          if (page>1){
        setpage(page-1)
          }
      }
      function next(){
        setpage(page+1)
      }
      
    return(
        <>
        <Link to="/"><div className="back2Home container">Back To Home</div></Link>
        <br/><br/><br/><br/>
        <div className="back2Home container">{page_title}</div>
        <section className="Toprated__page container">
        <span className="page_button">
        <button className="page_prev" onClick={prev}>Prev</button>
        <span class="page_no">{page}</span>
        <button className="page_next" onClick={next}>Next</button>
        </span>
        <div className='movieBox'>
          <br/><br/><br/><br/>
            <div className="movie_box_overflow watchlist_wrap">
            {value ?value.map((movie)=>{ 
           return <MovieSlide key={movie.id}watchlist={value} title={movie.title || movie.original_name} 
           domain='In Theatres'
            id={movie.id} movie_id={movie.id} image={IMG_URL+movie.poster_path} vote={movie.vote}/>}):""}
            </div>
        </div>
        <span className="page_button">
        <button className="page_prev" onClick={prev}>Prev</button>
        <span class="page_no">{page}</span>
        <button className="page_next" onClick={next}>Next</button>
        </span>
        </section>
        </>
    )
}