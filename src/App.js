//css
import styled from "styled-components";
import "./App.css";
//views
import Home from "./views/Home";
import Favorites from "./views/Favorites";
//componenents

// dependances
import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

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

  //creation d'un state
  const [city, setCity] = useState("");
  const [favorites, setFavorites] = useState([]);
  const [favoritesData, setFavoritesData] = useState([]);
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
          <StyledNav>
            <div className="navBar">
              <div className="link">
                <Link to="/">
                  <span>Home</span>
                </Link>

                <Link to="/favorites">
                  <span>favorites</span>
                </Link>
              </div>
            </div>
          </StyledNav>
          <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route exact path="/favorites" component={Favorites}></Route>
          </Switch>
          <StyledFooter>
            <div>
              <h3>Charles Dubois</h3>
              <p>
                <em>{new Date().toLocaleDateString("fr")}</em>
              </p>
            </div>
          </StyledFooter>
        </BrowserRouter>
      </CityContext.Provider>
    </>
  );
}
const StyledNav = styled.nav`
  .link {
    padding-left: 85%;
    padding-top: 1%;
  }
  span {
    padding: 3px;
    font-size: 1.3rem;
    color: white;
    border: solid 2px;
    background-color: grey;
    border-radius: 50%;
    margin-left: 10%;
  }
`;
const StyledFooter = styled.footer`
  div {
    display: flex;
    justify-content: space-between;

    color: white;
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 50px 0 1% 0;

    height: 50px;
  }
  h3,
  p {
    margin: 0 3% 0 3%;
  }
`;
