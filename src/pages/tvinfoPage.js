import Footer from "../components/footer/footer"
import Header from "../components/header/header"
import ToggleBar from "../components/ToggleBar/togglebar"
import TVInfo from "../components/tvinfo/tvinfo"
import { TogglebarVissibility } from "../store/toggleBarVisibility"

function TVInfopage (props){
    return (
        <>
        <TogglebarVissibility>
          <Header/>
          <ToggleBar/>
        </TogglebarVissibility>
        <TVInfo {...props}/>
        <Footer/>
        </>
    )
}

export default TVInfopage