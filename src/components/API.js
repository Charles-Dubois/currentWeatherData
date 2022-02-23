//dependances
import { useEffect, useContext } from "react";
import { CityContext } from "../App";

export default function API() {
  const cityInfos = useContext(CityContext);
  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityInfos.city}&limit=5&appid=ca1dd64b9fae08811d95e154d46897da`
    )
      .then((res) => res.json())
      //recupere les coordonnés de la ville
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${res[0].lat}&lon=${res[0].lon}&appid=ca1dd64b9fae08811d95e154d46897da`
        )
      ) // récupère la méto au coordonées récupérés²
      .then((res) => res.json())
      //! a retier
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }, [cityInfos.city]);

  return <p>Hello from API</p>;
}
