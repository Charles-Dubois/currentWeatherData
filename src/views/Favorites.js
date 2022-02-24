import { useContext, useState, useEffect } from "react";
import { CityContext } from "../App";
import CityCard from "../components/CityCard";

export default function Favorites() {
  const cityInfos = useContext(CityContext);
  const [dataCity, setDataCity] = useState([]);

  useEffect(() => {}, [cityInfos.city]);

  const onclickTest = () => {
    console.log(`les noms des favoris = `);
    console.log(cityInfos.favorites);
    console.log(`les infos des favoris =`);
    console.log(dataCity);
  };

  function removeFromFavorites(param) {
    dataCity.slice(param);
    cityInfos.favorites.slice(param);
  }

  const MyCard = () => {
    return dataCity.length > 0
      ? dataCity.map((res, i) => {
          if (i === dataCity.length) {
            return (
              <div key={i}>
                <CityCard
                  data={res}
                  index={i}
                  onClick={removeFromFavorites}
                ></CityCard>
              </div>
            );
          }
        })
      : null;
  };

  // function MyCard() {
  //   useEffect(() => {
  //     return dataCity
  //       ? dataCity.map((res, i) => {
  //           return (
  //             <div key={i}>
  //               <CityCard
  //                 data={res}
  //                 index={i}
  //                 onClick={removeFromFavorites}
  //               ></CityCard>
  //             </div>
  //           );
  //         })
  //       : null;
  //   }, [cityInfos.favorites.length]);
  // }

  function handleDataCity(data) {
    return setDataCity((prevState) => {
      return [...prevState, data];
    });
  }

  useEffect(() => {
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
  }, [cityInfos.favorites]);

  return (
    <div>
      <button onClick={onclickTest}>
        Afficher les données des pays favoris
      </button>
      {MyCard()}
    </div>
  );
}
