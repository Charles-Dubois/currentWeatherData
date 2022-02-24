import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

//context
import { CityContext } from "../App";
//component
import CityCard from "../components/CityCard";

export default function Home() {
  //react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  // state ou est stocké la valeur de mon input
  const cityInfos = useContext(CityContext);
  const [currentSearch, setCurrentSearch] = useState("");
  const [dataCity, setDataCity] = useState();
  const handleSearch = (event) => {
    return setCurrentSearch(event.target.value);
  };

  useEffect(() => {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityInfos.city}&limit=5&appid=ca1dd64b9fae08811d95e154d46897da`
    )
      .then((res) => res.json())
      .then((res) =>
        fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${res[0].lat}&lon=${res[0].lon}&appid=ca1dd64b9fae08811d95e154d46897da`
        )
      )
      .then((res) => res.json())
      .then((res) => setDataCity(res))
      .catch((err) => console.log(err));
  }, [cityInfos.city]);

  // fonction pour changer le contexte par le state actuel
  const handleCity = () => {
    cityInfos.setCity(currentSearch);
  };
  const myCard = () => {
    return dataCity ? <CityCard data={dataCity}></CityCard> : null;
  };
  //!   A retier
  const test = () => console.log(dataCity);
  return (
    <div className="SearchBar">
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("city", {
            required: "this is required",
          })}
          placeholder="Search a city"
          type="text"
          onChange={handleSearch}
        />
        {<span>{errors.city?.message}</span>}
        <button onClick={handleCity}>Click</button>
      </form>
      {/* A retier */}
      <button onClick={test}>test</button>
      <button onClick={cityInfos.setFavorites}>Add to your favorites</button>
      {myCard()}
    </div>
  );
}
