
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
export default function Cast(cast){
    const {name,character,profile_path}=cast.value
    return(
        <div className="movieslides castslide">
            
            {profile_path?<img className='cast_img' alt={name} src={IMG_URL+profile_path}/>
            :''}
            <div className="movieslides__content">
                <button className="add_watchlist castname"> {character}</button>
                <a href="www.google.com "  className="trailer castcharacter">{name}</a>
            </div>
            
        </div>
    )
}