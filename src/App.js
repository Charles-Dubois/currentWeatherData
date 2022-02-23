import "./App.css";
import Home from "./views/Home";
import Favorites from "./views/Favorites";
import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
export const NameContext = createContext("light");
export default function App() {
  const [setUpState, setSetUpState] = useState("");
  const context = {
    setUpState: setUpState,
    setSetUpState: setSetUpState,
  };
  return (
    <>
      <NameContext.Provider value={context}>
        <BrowserRouter>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/favorites">favorites</Link>
          </nav>

          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/favorites" component={Favorites}></Route>
          </Switch>
          <footer>
            <h3>Charles Dubois</h3>
            <p>{new Date().toLocaleDateString("fr")}</p>
          </footer>
        </BrowserRouter>
      </NameContext.Provider>
    </>
  );
}
