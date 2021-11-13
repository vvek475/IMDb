import Home from "./pages/home";
import Info from "./pages/info";
import { Movieselectfuncn } from "./store/movieProvider";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

function App() {

  return (
    <>
    <Router>
      <Movieselectfuncn>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movieInfo" component={Info} />
        </Switch>
      </Movieselectfuncn>
    </Router>
    </>
  )
}
export default App;
