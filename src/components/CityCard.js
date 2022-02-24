import styled from "styled-components";
import { CityContext } from "../App";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useContext } from "react";
import "leaflet/dist/leaflet.css";

export default function CityCard(props) {
  const cityInfos = useContext(CityContext);
  function localStore(city) {
    return localStorage.setItem("default", city);
  }

  return props.index !== undefined ? (
    <StyledCard className={props.data.weather[0].main || "none"}>
      <div className="card">
        <button onClick={() => localStore(props.data.name)}>Home</button>
        <button onClick={() => props.onClick(props.index)}>Remove</button>
        <h4>{props.data.name}</h4>
        <p>{props.data.weather[0].description}</p>
        <p>Temperature : {Math.floor(props.data.main.temp - 273.5)}°C</p>
        <img
          className="background"
          s
          src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
        />
        <p>
          Felt temperature : {Math.floor(props.data.main.feels_like - 273.5)}°C
        </p>
        <p>Humidity : {props.data.main.humidity}%</p>
        <img
          className="background"
          src={`/weather/${props.data.weather[0].main}.jpg`}
        />
      </div>
    </StyledCard>
  ) : (
    <StyledCard>
      <div className="card">
        <h4>{props.data.name}</h4>

        <button onClick={() => localStore(cityInfos.city)}>Default</button>
        <p>{props.data.weather[0].description}</p>
        <p>Temperature : {Math.floor(props.data.main.temp - 273.5)}°C</p>
        <img
          src={`http://openweathermap.org/img/wn/${props.data.weather[0].icon}@2x.png`}
        />
        <p>
          Felt temperature : {Math.floor(props.data.main.feels_like - 273.5)}°C
        </p>
        <p>Humidity : {props.data.main.humidity}%</p>
        <img
          className="background"
          src={`/weather/${props.data.weather[0].main}.jpg`}
        />
      </div>

      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: "500px" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[51.505, -0.09]}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </MapContainer>
    </StyledCard>
  );
}
//style="background-image: url('img_girl.jpg');
const StyledCard = styled.section`
  p {
    color: white;
  }
  .background {
    /* height: 100%; */
    height: 60%;
    width: 50%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity: 90%;
    z-index: -1;
  }
  .card {
    text-align: center;
  }
  .map {
    height: 500px;
  }
  .leaflet-container {
    height: 800px;
    width: 500px;
  }
`;
