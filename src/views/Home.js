import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
//context
import { CityContext } from "../App";
//component
import API from "../components/API";

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
  const handleSearch = (event) => {
    return setCurrentSearch(event.target.value);
  };
  // fonction pour changer le contexte par le state actuel
  const handleCity = () => {
    cityInfos.setCity(currentSearch);
  };
  //!   A retier
  const test = () => console.log(cityInfos.favorites);
  return (
    <>
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

      <API></API>
    </>
  );
}
