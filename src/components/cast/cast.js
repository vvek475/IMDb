
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export default function Cast(cast){
    const {name,character,profile_path}=cast.value
    return(
        <div className="movieslides castslide">
            
            {profile_path && name && character && <img className='cast_img' alt={name} src={IMG_URL+profile_path}/>
            }
            <div className="movieslides__content">
                <button className="add_watchlist castname"> {character}</button>
                <a href={`https://www.imdb.com/find?q=${name}&ref_=nv_sr_sm`}  target="blank" className="trailer castcharacter">{name}</a>
            </div>
            
        </div>
    )
}