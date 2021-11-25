import { useContext,useState,useEffect } from "react";
import { Link } from "react-router-dom";
import TogglebarVissibilityContext from "../../store/toggleBarVisibility";
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'
const SEARCH_URL=`${BASE_URL}/search/movie?${API_KEY}&query=`
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function ToggleBar(){
    const [visibility,,TogglebarVissibility]=useContext(TogglebarVissibilityContext)
    const [result,setresult]=useState([])
    const [searchvis,setsearchvis]=useState()
    const [search,setsearch]=useState()
    useEffect(() => {
        search && fetch(SEARCH_URL+search)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setresult(data.results) 
          })
      },[search])

    return (
        <div  className={`toggleBar ${visibility ? 'active' : ''}`}>
            <div className="toggleBar__content container">
            <div className="toggleBar__logo">
            <img class="search_logo" alt="search" onClick={()=>setsearchvis(true)} src="https://i.postimg.cc/9f8QrGBd/search-logo.png"/>
                    <input  onChange={(e)=>setsearch(e.target.value)} className={`search_bar_toggle ${searchvis?'active_block':''}`} />
                    <span onClick={()=>{setsearchvis(false);setresult();setsearch()}} className={`close close_toggle ${searchvis?'active_block':''}`}>&#x2716;</span>
                    {console.log(result)}
                <span onClick={TogglebarVissibility} className="close">&#9776;</span>
            </div>
            <div className={`searchResult searhResult_toggle ${result?(result.length >0?'active':''):''}`}>
            {result && result.length >0 && result.map((result)=>(
                result.poster_path &&<>
                <div className="search__box search__box__toggle" >
                    <box>
                <Link to={`/movieInfo/${result.id}`}><img alt="" src={IMG_URL+result.poster_path}/></Link>
                <Link to={`/movieInfo${result.id}`}>
                    <span /* onClick={()=>(setmovieid(result.id))} */ className="search_title">{result.original_title}</span>
                </Link>
                </box></div>
                </>
            ))}
        </div>
            <div className="toggleBar__anchors">
                <div className="toggleBar__anchorlist">
                    <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/watchlist"><li>Watchlist</li></Link>
                        <li>Box Office</li>
                    <li><a target="blank" href="https://vivek8teen.netlify.app/#contact">Contact</a></li>
                    </ul>
                </div>
                    <span className="toggleBar__anchor__svg"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="ipc-icon ipc-icon--movie" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M18 4v1h-2V4c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v1H6V4c0-.55-.45-1-1-1s-1 .45-1 1v16c0 .55.45 1 1 1s1-.45 1-1v-1h2v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h2v1c0 .55.45 1 1 1s1-.45 1-1V4c0-.55-.45-1-1-1s-1 .45-1 1zM8 17H6v-2h2v2zm0-4H6v-2h2v2zm0-4H6V7h2v2zm10 8h-2v-2h2v2zm0-4h-2v-2h2v2zm0-4h-2V7h2v2z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="ipc-icon ipc-icon--television" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M21 3H3c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h5v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h5c1.1 0 1.99-.9 1.99-2L23 5a2 2 0 0 0-2-2zm-1 14H4c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h16c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1z"></path></svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" className="ipc-icon ipc-icon--star-circle-filled" viewBox="0 0 24 24" fill="currentColor" role="presentation"><path fill="none" d="M0 0h24v24H0V0z"></path><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.23 15.39L12 15.45l-3.22 1.94a.502.502 0 0 1-.75-.54l.85-3.66-2.83-2.45a.505.505 0 0 1 .29-.88l3.74-.32 1.46-3.45c.17-.41.75-.41.92 0l1.46 3.44 3.74.32a.5.5 0 0 1 .28.88l-2.83 2.45.85 3.67c.1.43-.36.77-.74.54z"></path></svg>
                    </span>
            </div>
            </div>
        </div>
    )
}
export default ToggleBar