import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import ToggleBar from "../components/ToggleBar/togglebar";
import{ TogglebarVissibility } from "../store/toggleBarVisibility";

import { useEffect,useState,useContext } from "react";
import user_array from "../store/signinProvider";
import TopRated from "../components/topRated/topRated";
import Trailerlist from "../components/trailerlist/trailerlist";
import MovieContainer from "../components/movieContainer/movieContainer";


const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'
const API_URL = BASE_URL+"/movie/popular?"+API_KEY;
const TRENDING_URL = `${BASE_URL}/trending/all/day?${API_KEY}&language=en-US&page=1`
const TV_URL=`${BASE_URL}/tv/popular?${API_KEY}&language=en-US&page=1`
const TOP_RATED_URL=`${BASE_URL}/movie/top_rated?${API_KEY}&language=en-US&page=1`
const TOP_RATED_URL_TV=`${BASE_URL}/tv/top_rated?${API_KEY}&language=en-US&page=1`

function Home (){
  const [user] = useContext(user_array.Signin);
  const [movieList, setMovieList] = useState([]);
  const [trendingList,setTrending]=useState([]);
  const [tv,settv]=useState([]);
  const [toprated,settoprated]=useState([]);
  const [topratedtv,settopratedtv]=useState([]);
    useEffect(() => {
      fetch(API_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const result=data.results  
          setMovieList(result);
        })
    },[])
  
  
    useEffect(() => {
      fetch(TRENDING_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const result=data.results  
          setTrending(result);
        })
    },[])
  
    useEffect(() => {
      fetch(TV_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const result=data.results  
          settv(result);
        })
    },[])

    useEffect(() => {
      fetch(TOP_RATED_URL)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const result=data.results  
          settoprated(result);
        })
    },[])


    useEffect(() => {
      fetch(TOP_RATED_URL_TV)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const result=data.results  
          settopratedtv(result);
        })
    },[])
  
    const [movies,setMovies]=useState([])

    useEffect(()=>{
        user && fetch("https://movie-data-app5.herokuapp.com/user/movies/watchList/",{
            headers:{'Content-Type':'application/json',
       'Authorization':`Token ${user.token}`}})
       .then((body) => {
        return body.json();
      })
      .then((data) => {
        setMovies(data);
      })
      
    },[user])

    const [recent,setrecent]=useState([])
    useEffect(()=>{
      user && fetch("https://movie-data-app5.herokuapp.com/user/recent/recent/",{
          headers:{'Content-Type':'application/json',
     'Authorization':`Token ${user.token}`}})
     .then((body) => {
      return body.json();
    })
    .then((data) => {
      setrecent(data);
    })
    
  },[user])
    const topratedobj={'moviearray':toprated,'title':'Top Rated Movies','url':1}
    const topratedtvobj={'moviearray':topratedtv,'title':'Top Rated TV Shows','url':5}
    const movieobj={'moviearray':movieList,'title':'In Theatres','watchlist':movies,'url':2}
    const recentobj={'moviearray':recent,'title':'Recent Views','watchlist':movies,'url':6}
    const trendingobj={'moviearray':trendingList,'title':'Trending','watchlist':movies,'url':3}
    const tvobj={'moviearray':tv,'title':'Popular TV Shows','watchlist':'',url:4}

    return (
      <div className="App">
        <TogglebarVissibility>
          <Header/>
          <ToggleBar/>
        </TogglebarVissibility>
        <Hero/>
        {user && recent.length && <MovieContainer {...recentobj}/>}
        <MovieContainer {...trendingobj}/>
        <Trailerlist {...{trendingList}}/>
        <TopRated {...topratedobj}/>
        <MovieContainer {...movieobj}/>
        <TopRated {...topratedtvobj}/>
        <MovieContainer {...tvobj}/>

        {/* <TV {...tvobj}/> */}
        <Footer/>
      </div>
    );
}

export default Home