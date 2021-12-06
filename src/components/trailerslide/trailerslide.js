import { useState } from "react"
import Overlaytrailer from "../overlaytrailer/overlaytrailer";
const IMG_URL = 'https://image.tmdb.org/t/p/w500';

export default function Trailerslide({id,name,tvname,img}){
    const [visibility,setvisibility]=useState('hide')
    const [display,setdisplay] = useState('block')
    function toggle(){
        setdisplay(display==='none'?'block':'none')
    }
    return(<>
        { <div  title={name} className="trailerslides" style={{background:`url(${IMG_URL+img}) no-repeat`}}>
            <img alt="play" onClick={()=>{setvisibility("show");setdisplay('block')}} className="playbutton" src='https://i.postimg.cc/G24qYjyR/play-button.png'/>
            { visibility==='show'&& <Overlaytrailer id={id} name={name} tvname={tvname} state={display} funcn={toggle}/>}
            <h3 className="trailer__title">{name ||tvname}</h3>
        </div>}
        </>
    )
}