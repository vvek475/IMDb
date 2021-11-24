import Footer from "../components/footer/footer";
import Header from "../components/header/header";
import Hero from "../components/hero/hero";
import Intheatres from "../components/inTheatres/intheatres";
import ToggleBar from "../components/ToggleBar/togglebar";
import{ TogglebarVissibility } from "../store/toggleBarVisibility";

import { useEffect,useState } from "react";
import TV from "../components/tvShows/tvShows";
import signinProvider from "../store/signinProvider";
import { useContext } from "react/cjs/react.development";
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'
const API_URL = BASE_URL+"/discover/movie?sort_by=popularity.desc&"+API_KEY;
const TRENDING_URL = `${BASE_URL}/trending/all/day?${API_KEY}`
const TV_URL=`${BASE_URL}/tv/popular?${API_KEY}&language=en-US&page=1`

function Home (){
  const [movieList, setMovieList] = useState([]);
  const [trendingList,setTrending]=useState([]);
  const [tv,settv]=useState();
  const [user] = useContext(signinProvider.Signin);
 
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
  
    const [movies,setMovies]=useState([])

    useEffect(()=>{
        user && fetch("https://imdb-fullstack-app.herokuapp.com/user/movies/watchList/",{
            headers:{'Content-Type':'application/json',
       'Authorization':`Token ${user.token}`}})
       .then((body) => {
        return body.json();
      })
      .then((data) => {
        setMovies(data);
      })
      
    },[user])
    const trendingobj={'moviearray':trendingList,'title':'Trending','watchlist':movies}
    const movieobj={'moviearray':movieList,'title':'In Theatres','watchlist':movies}
    const tvobj={'moviearray':tv,'title':'Popular TV Shows','watchlist':''}
  
    return (
      <div className="App">
        <TogglebarVissibility>
          <Header/>
          <ToggleBar/>
        </TogglebarVissibility>
        <Hero/>
        <Intheatres {...trendingobj}/>
        <Intheatres {...movieobj}/>
        <TV {...tvobj}/>
        <Footer/>
      </div>
    );
}

export default Home