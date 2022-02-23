import { CityContext } from "../App";
import { useContext } from "react";
export default function CityCard(props) {
  const cityInfos = useContext(CityContext);

  return props.index !== undefined ? (
    <div style={{ color: "red" }}>
      <button onClick={() => props.onClick(props.index)}>Remove</button>
      <p>{props.data.name}</p>
    </div>
  ) : (
    <div style={{ color: "red" }}>
      <p>{props.data.name}</p>
    </div>
  );
}
