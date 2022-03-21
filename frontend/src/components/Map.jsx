import React, {useState} from 'react';
import { MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map(props) {


  const [position, setPosition] = useState({});

  async function addGeoJson() {
    const response = await fetch("https://opendata.arcgis.com/datasets/923cb3294384488e8a4ffbeb3b8f6cb2_32.geojson");
    const data = await response.json();
    console.log(data);
    return (<GeoJSON data={data}></GeoJSON>);
    // return data;
}

navigator.geolocation.getCurrentPosition(info => {
  
  setPosition(info.coords);

});

// console.log(position)
// addGeoJson();

  return (
    <MapContainer center={[43.6532, -79.3832]} zoom={13} style={{ backgroundColor:"black"}}>
       
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[43.6532, -79.3832]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
    </MapContainer>
  );
}