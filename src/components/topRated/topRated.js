import {useState,useEffect,useContext} from 'react'
import { Link } from 'react-router-dom';
import user_array from "../../store/signinProvider"
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function TopRated({moviearray,url,title}){
    const [user] = useContext(user_array.Signin)
    const [values,setvalues]=useState()
    const [more,setmore]=useState(6)
    const [collapse,setcollapse]=useState('more . . .')
    useEffect(() => {
        setvalues(moviearray.slice(1,more))
    }, [moviearray,more])
    function addMore(){
        if (more>=18){
            setmore(6)
            setcollapse('more . . .')
        }
        else if (more>=13){
            setcollapse('Collapse')
            setmore(more+4)
        }
        else{
            setmore(more+4)
        }
    }

    // Recent
    async function submitrecent(e,movie_id,title,image,vote){
        e.preventDefault()

        if (user){
            await fetch("https://movie-data-app5.herokuapp.com/user/recent/recent/",{
            method:"POST",
            body:JSON.stringify({"user": user.user.id,
            "movie_id": movie_id,
            "movie_name": title,
            "image":image,
            "vote":vote,}
            ),
            headers:{'Content-Type':'application/json',
            'Authorization':`Token ${user.token}`}
            })
        }
    } 
    return(
        <>
        <section className="toprated__div container">
        <Link to={`/page/${url}`} ><h2 className="slide__title">{title}<span className="fancy" children=" >>"></span></h2></Link>
            <div class="toprated__flex">
            {values && more && (values.map((movies)=>(
                <span className="movie_scroll">
                    <span onClick={(e)=>submitrecent(e,movies.id,movies.name,IMG_URL+movies.poster_path,movies.vote_average)}>{movies.name?<Link to={`/tvInfo/${movies.id}`} >
                        <img alt="movie" className="toprated_img" src={IMG_URL+movies.poster_path}/>
                    </Link>
                    :<Link to={`/movieInfo/${movies.id}`} >
                        <img alt="movie" className="toprated_img" src={IMG_URL+movies.poster_path}/>
                    </Link>}</span>
                    <div class="toprated__content">
                        
                    <span onClick={(e)=>submitrecent(e,movies.id,movies.name,IMG_URL+movies.poster_path,movies.vote_average)}>{movies.name?<Link to={`/tvInfo/${movies.id}`} >
                        <p className="toprated__title">{movies.title || movies.name}</p>
                    </Link>:<Link to={`/movieInfo/${movies.id}`} >
                        <p className="toprated__title">{movies.title || movies.name}</p>
                    </Link>}</span>
                    <p><span className="star">★ </span> {movies.vote_average}</p>
                    <p className="toprated__release">Release : {movies.release_date || movies.first_air_date}</p>
                    </div>
                </span>
            )))}
            <button className="toprated__add" onClick={addMore}>{collapse}</button>
            </div>
        </section>
        </>
    )
}