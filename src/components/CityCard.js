export default function CityCard(props) {
  return (
    <div style={{ color: "red" }}>
      <p>{props.data.name}</p>
      {/* <p>{props.data.weather[0].description}</p> */}
    </div>
  );
}
