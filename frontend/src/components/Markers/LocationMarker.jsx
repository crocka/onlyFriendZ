export default function LocationMarker(props) {
  const { location } = props;

  {location.map(place => (
    <Marker 
    key={place.id} 
    position={place.coordinates}
    >
    <Popup>
      <div>
        <h2>{place.title}</h2>
        <p>{place.description}</p>
      </div>
    </Popup>
    </Marker>
  ))}
}
