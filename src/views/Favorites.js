import { useContext, useState, useEffect } from "react";
import { CityContext } from "../App";
import CityCard from "../components/CityCard";

export default function Favorites() {
  const cityInfos = useContext(CityContext);
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {}, [cityInfos.city]);
  //TODO partie a reprendre
  const onclickTest = () => {
    console.log(`les noms des favoris = `);
    console.log(cityInfos.favorites);
    console.log(`les infos des favoris =`);
    console.log(dataCity);
  };
  //* Cette fonction fait sont job
  function removeFromNomDesFavoris(param) {
    cityInfos.favorites.splice(param);
  }
  //* cette fonction ne fonctionne pas
  function removeFromInfosDesFavoris(param) {
    dataCity.favorites.splice(param);
  }
  //TODO fin de partie a reprendre
  const myCard = () => {
    return dataCity.length > 0
      ? dataCity.map((res, i) => {
          return (
            <div key={i}>
              <CityCard
                data={res}
                index={i}
                onClick={removeFromInfosDesFavoris}
              ></CityCard>
            </div>
          );
        })
      : null;
  };
  function handleDataCity(data) {
    return setDataCity((prevState) => {
      return [...prevState, data];
    });
  }

  useEffect(() => {
    if (cityInfos.favorites.length > 0) {
      cityInfos.favorites.map((result) => {
        return fetch(
          `http://api.openweathermap.org/geo/1.0/direct?q=${result}&limit=5&appid=ca1dd64b9fae08811d95e154d46897da`
        )
          .then((res) => res.json())
          .then((res) =>
            fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${res[0].lat}&lon=${res[0].lon}&appid=ca1dd64b9fae08811d95e154d46897da`
            )
          )
          .then((res) => res.json())
          .then((res) => handleDataCity(res))
          .catch((err) => console.log(err));
      });
    } else {
      return null;
    }
  }, [cityInfos.favorites]);

  return (
    <div>
      <button onClick={onclickTest}>
        Afficher les données des pays favoris
      </button>
      {myCard()}
    </div>
  );
}
