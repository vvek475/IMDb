import {useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function TopRated({moviearray,url,title}){
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
    return(
        <>
        <section className="toprated__div container">
        <Link to={`/page/${url}`} ><h2 className="slide__title">{title}<span className="fancy" children=" >>"></span></h2></Link>
            <div class="toprated__flex">
            {values && more && (values.map((movies)=>(
                <span className="movie_scroll">
                    <Link to={`/movieInfo/${movies.id}`} >
                        <img alt="movie" className="toprated_img" src={IMG_URL+movies.poster_path}/>
                    </Link>
                    <div class="toprated__content">
                    <Link to={`/movieInfo/${movies.id}`} >
                        <p className="toprated__title">{movies.title || movies.name}</p>
                    </Link>
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