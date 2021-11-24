import { useEffect,useState } from "react";
import { useContext } from "react/cjs/react.development";
import Watchcomponent from "../components/watchcomponent/watchcomponent";
import { Signin } from "../store/signinProvider";
import { Link } from "react-router-dom";
export default function Watchlist(){
    const [user] = useContext(Signin)
    const [movies,setMovies]=useState([])
    useEffect(()=>{
        user?fetch("http://127.0.0.1:8000/user/movies/watchList/",{
            headers:{'Content-Type':'application/json',
       'Authorization':`Token ${user.token}`}})
       .then((body) => {
        return body.json();
      })
      .then((data) => {
        console.log(data)
        setMovies(data);
        
      })
      .catch((err) => { 
        console.log(err);
      }):console.log()
      
    },[user])
    return(
        <section className="inTheatres container">
        <div className='movieBox'>
            <Link to="/"><div className="back2Home container">Back To Home</div></Link>
            <div className="movie_box_overflow">
                {movies.length>0?<Watchcomponent value={movies}/>:user?<h1 className="watchlist__warning container">OOps add some movies to view here</h1>
                :<h1 className="watchlist__warning container">OOps you have'nt logged in yet !!!</h1>}
            </div>
        </div>
        </section>
    )
}