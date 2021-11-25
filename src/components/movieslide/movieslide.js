import { Link } from "react-router-dom";
import {useState,useEffect,useContext,useRef} from "react"
import user_array from "../../store/signinProvider";

function MovieSlide({title,image,vote,movie_id,domain,watchlist,id_array}){
    const [user] = useContext(user_array.Signin)
    const [isbooked,setisbooked]=useState('+ Watchlist')
    const [notify,setnotify]=useState()
    const id = useRef()
    useEffect(()=>{
        user&&
            id_array &&
                (id_array.includes(Number(movie_id))?
                setisbooked('Added')
                :setisbooked('+ Watchlist'))
    },[user,id_array,movie_id])


    async function handlesubmit(e){
        e.preventDefault()
            setisbooked('Added')
              await fetch("https://imdb-fullstack-app.herokuapp.com/user/movies/watchList/",{
          method:"POST",
          body:JSON.stringify({"user": user.user.id,
          "movie_id": movie_id,
          "movie_name": title,
          "image":image,
          "vote":vote,}
          ),
          headers:{'Content-Type':'application/json',
           'Authorization':`Token ${user.token}`}
        })}
        async function handlesubmit_delete(){
            
            setisbooked('+ Watchlist')
           await fetch("https://imdb-fullstack-app.herokuapp.com/user/movies/watchList/",{
            headers:{'Content-Type':'application/json',
       'Authorization':`Token ${user.token}`}})
       .then((body) => {
        return body.json();
      })
      .then((data) => {
        watchlist=data
        watchlist.forEach((element)=>{
            let num=Number(element.movie_id)
            let ids=Number(movie_id)
            if (ids===num){
                id.current=element.id} 
        })
      })
            fetch(`https://imdb-fullstack-app.herokuapp.com/user/movies/watchList/${id.current}/`,{
                method:"DELETE",
                headers:{
                    'Authorization':`Token ${user.token}`}
                })
                
            }
        
    return(
        <div className="movieslides">
            <img className="movie_img_potrait" src={image} alt={title}/>
            <div className="movieslides__content">
                <div clas="rating"><span className="star">★</span> {vote} <span className="hollow_star">☆</span></div>
                {domain==='Popular TV Shows' || 'Similar Movies'?<p className="movieslides__title">{title}</p>:
                <Link to={`/movieInfo/${movie_id}`} >
                    <p  className="movieslides__title">{title}</p>
                </Link>}
                
                {user?(!(isbooked==='+ Watchlist')?<button  onClick={handlesubmit_delete}   className="add_watchlist">{isbooked}</button>:
                (<button onClick={handlesubmit} className="add_watchlist">{isbooked}</button>)):
                <button onClick={()=>setnotify(notify?"":'Please Log In To Add Watchlist')}  className="add_watchlist">+ Watchlist</button>
                }

                {notify && <span onClick={()=>setnotify()} className="notify">{notify}</span>}
                <br/>
                {domain==='Popular TV Shows' || 'Similar Movies'?<p  className="trailer">⏵ Trailer</p>
                :
                <Link to={`/trailer/${movie_id}`} >
                    <p  className="trailer">⏵ Trailer</p>
                </Link>}
            </div>
        </div>
    )
}

export default MovieSlide