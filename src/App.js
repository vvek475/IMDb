import Home from "./pages/home";
import Info from "./pages/info";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Trailer from "./pages/trailer";

function App() {

  return (
    <>
    <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movieInfo/:id" component={Info} />
          <Route path="/trailer/:id" component={Trailer}/>
        </Switch>
    </Router>
    </>
  )
}
//gramarly
//https://novoresume.com/editor/resume/d9857fc0-95a8-11e9-907f-4dd21a7c2ccc
// https://api.themoviedb.org/3/movie/latest?api_key=4f131ce27b7e4bfcd74de86ff5191005&language=en-US
export default App;
