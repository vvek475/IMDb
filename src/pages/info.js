import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import MovieInfo from "../components/movieInfo/movieInfo"
import ToggleBar from "../components/ToggleBar/togglebar"
import { TogglebarVissibility } from "../store/toggleBarVisibility"

function Info (props){
    return (
        <>
        <TogglebarVissibility>
          <Header/>
          <ToggleBar/>
        </TogglebarVissibility>
        <MovieInfo {...props}/>
        <Footer/>
        </>
    )
}

export default Info