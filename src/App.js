import Home from "./pages/home";
import Info from "./pages/info";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Trailer from "./pages/trailer";
import Watchlist from "./pages/watchlist";
import user_array from "./store/signinProvider";
import Registration from "./pages/Registration";
import TopratedPage from "./components/topratedpage/topRated_page";
import TVInfopage from "./pages/tvinfoPage";
import TvTrailer from "./pages/tvtrailer";

function App() {
  

  return (
    <>
    <Router>
      <user_array.Signinprovider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movieInfo/:id" component={Info} />
          <Route path="/tvInfo/:id" component={TVInfopage} />
          <Route path="/trailer/:id" component={Trailer}/>
          <Route path="/tvtrailer/:id" component={TvTrailer}/>
          <Route path="/watchlist" component={Watchlist}/>
          <Route path="/Registeration" component={Registration}/>
          <Route path="/page/:url" component={TopratedPage}/>
        </Switch>
      </user_array.Signinprovider>
    </Router>
    </>
  )
}
//gramarly
//https://novoresume.com/editor/resume/d9857fc0-95a8-11e9-907f-4dd21a7c2ccc
// https://api.themoviedb.org/3/movie/latest?api_key=4f131ce27b7e4bfcd74de86ff5191005&language=en-US
export default App;
