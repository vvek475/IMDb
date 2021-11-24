import { Link } from "react-router-dom";
import {useState,useEffect,useContext,useRef} from "react"
import { Signin } from "../../store/signinProvider";

function MovieSlide({title,image,vote,movie_id,domain,watchlist}){
    const [user] = useContext(Signin)
    const [isbooked,setisbooked]=useState()
    const [notify,setnotify]=useState()
    const id = useRef()
    var delete_id
    async function givebooked(){
        user?await fetch("http://127.0.0.1:8000/user/movies/watchList/",{
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
                setisbooked('Added');
            return('Added')}
            else{
                setisbooked('+ Watchlist')
                return ('+ Watchlist')
            }
        })
      })
      .catch((err) => { 
        console.log(err);
      }):console.log('Login')
    }



    /* watchlist?watchlist.forEach((element) => {
        let num=Number(element.movie_id)
        let ids=Number(movie_id)
        if (ids===num){
            id.current=element.id
            delete_id=element.id
            console.log(delete_id,element.movie_id)}
        }):console.log() */


    async function handlesubmit(e){
        e.preventDefault()
        console.log('added')
            setisbooked('Added')
              await fetch("http://127.0.0.1:8000/user/movies/watchList/",{
          method:"POST",
          body:JSON.stringify({"user": 1,
          "movie_id": movie_id,
          "movie_name": title,
          "image":image,
          "vote":vote,}
          ),
          headers:{'Content-Type':'application/json',
           'Authorization':`Token ${user.token}`}
        })}
        async function handlesubmit_delete(){
            

           await fetch("http://127.0.0.1:8000/user/movies/watchList/",{
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
                id.current=element.id
            console.log(id.current)} 
        })
      })
            console.log('delete',id.current)
            const response=fetch(`http://127.0.0.1:8000/user/movies/watchList/${id.current}/`,{
                method:"DELETE",
                headers:{
                    'Authorization':`Token ${user.token}`}
                })
                setisbooked('+ Watchlist')
            console.log(response)
            }
        
    function changebtn(){
        return(
            !(isbooked==='+ Watchlist')?<button onClick={handlesubmit_delete}  className="add_watchlist"> {givebooked()} + +</button>:
                (user?<button onClick={handlesubmit} className="add_watchlist"> {givebooked()}- - </button>:
                <button onClick={()=>setnotify(notify?"":'Please Log In To Add Watchlist')}  className="add_watchlist">+ Watchlist</button>)
                )
    } 

    return(
        <div className="movieslides">
            <img className="movie_img_potrait" src={image} alt={title}/>
            <div className="movieslides__content">
                <div clas="rating"><span className="star">★</span> {vote} <span className="hollow_star">☆</span></div>
                {domain==='Popular TV Shows'?<p className="movieslides__title">{title}</p>:
                <Link to={`/movieInfo/${movie_id}`} >
                    <p  className="movieslides__title">{title}</p>
                </Link>}
                {changebtn()}
                <span onClick={()=>setnotify()} className="notify">{notify}</span>
                <br/>
                {domain==='Popular TV Shows'?<p  className="trailer">⏵ Trailer</p>
                :
                <Link to={`/trailer/${movie_id}`} >
                    <p  className="trailer">⏵ Trailer</p>
                </Link>}
            </div>
        </div>
    )
}

export default MovieSlide