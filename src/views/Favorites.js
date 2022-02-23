import { useContext, useState, useEffect } from "react";
import { CityContext } from "../App";
import CityCard from "../components/CityCard";

export default function Favorites() {
  const cityInfos = useContext(CityContext);
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {}, [cityInfos.city]);

  const onclickTest = () => console.log(dataCity);
  const myCard = () => {
    return dataCity.length > 0
      ? dataCity.map((res, i) => {
          return <CityCard key={i} data={res}></CityCard>;
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
