import { Link,useLocation } from "react-router-dom";
import {useContext,useState,useEffect} from 'react'
import TogglebarVissibilityContext from '../../store/toggleBarVisibility'
import SignIn from "../Signin/signin";
import user_array from "../../store/signinProvider";
const API_KEY="api_key=4f131ce27b7e4bfcd74de86ff5191005"
const BASE_URL ='https://api.themoviedb.org/3'
const SEARCH_URL=`${BASE_URL}/search/multi?${API_KEY}&query=`
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

function Header(){
    const [,,Togglevisibility]=useContext(TogglebarVissibilityContext)
    const [search,setsearch]=useState()
    const [result,setresult]=useState([])  
    const [signinvisibility,setsigninvisibility]=useState(false)
    const [user,setuser]=useContext(user_array.Signin)
    const location=useLocation()
    useEffect(() => {
        search && fetch(SEARCH_URL+search)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            setresult(data.results) 
            console.log(data)
          })
      },[search])

    return (
        <header>
        <div className="navbar">
            <img alt="logo" className="header_logo" src="https://i.postimg.cc/hGCGtFS2/imgbin-ticket-cinema-film-png.png"/>
            
            <span onClick={Togglevisibility} className="navbar__toggle-bar">&#9776; MENU</span>
            <input onChange={(e)=>setsearch(e.target.value)} placeholder='SEARCH' className="navbar__searchbar"/>
            <Link to="/watchlist"><img className="watchlist_img" alt="watchlist" title="WATCHLIST" src="https://i.postimg.cc/rpBgjgRN/Bookmark.png"/>
            </Link><div className="signin__button">{!user?<span className="navbar__signin text-medium" 
            onClick={()=>setsigninvisibility(signinvisibility?false:true)}>SignIn </span>:
                
            (<><span className="navbar__signin text-medium" 
            onClick={()=>setuser()}>
                Logout</span>
                <span className="navbar__signin text-medium"><br/>Hi! {user && user.user.username}</span></>)}
            {!user && <Link to={{pathname:'/Registeration', state:{prevPath: location.pathname}}}>
                <span className="navbar__signin text-medium">/ SignUp</span>
            </Link>}</div>
        </div>

        {!user && <SignIn className={`signIn__div ${signinvisibility?'active':''}`}/>}
        <div className={`searchResult ${result?(result.length >0 && search?'active':''):''}`}>
            <div className="close" onClick={()=>(setresult([]))}>&#x2716;</div>
            {result && result.length >0 && result.map((result)=>(
                result.poster_path &&<>
                <div className="search__box" >
                    <box>
                <Link to={`/movieInfo/${result.id}`}><img alt="" src={IMG_URL+result.poster_path}/></Link>
                <Link to={`/movieInfo/${result.id}`}><span /* onClick={()=>(setmovieid(result.id))} */ className="search_title">{result.original_title || result.original_name}
                <br/>RELEASE : {result.release_date}<span className="star">★ {result.vote_average}</span></span></Link>
                </box>
                <p>{result.overview}</p></div>
                </>
            ))}
        </div>
    </header>
    )
}
export default Header