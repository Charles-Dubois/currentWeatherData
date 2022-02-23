//css
import "./App.css";
//views
import Home from "./views/Home";
import Favorites from "./views/Favorites";
//componenents
import API from "./components/API";
// dependances
import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
//! creation dun contexte vide stocké la ville recherché
export const CityContext = createContext("");
//corps de fonction
export default function App() {
  const handleFavorites = () => {
    if (favorites.length < 3) {
      setFavorites((prevState) => {
        return [...prevState, city];
      });
    } else return alert("You cannot have more than 3 favorites city");
  };

  //!creation d'un state ou est stocké la ville recherché
  const [city, setCity] = useState("paris");
  const [favorites, setFavorites] = useState([]);
  const context = {
    city: city,
    setCity: setCity,
    favorites: favorites,
    setFavorites: handleFavorites,
  };

  return (
    <>
      <CityContext.Provider value={context}>
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
      </CityContext.Provider>
    </>
  );
}
