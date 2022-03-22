import React, { useState, useEffect, useRef } from 'react';
import { MapContainer, MapConsumer, TileLayer, Marker, Popup, GeoJSON } from 'react-leaflet'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import Button from '@mui/material/Button';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

export default function Map(props) {
  const [colorMode, setColorMode] = useState("light");
  let testData = [{id: 1, title: "CN Tower", description: "The big tower in Toronto", coordinates:[43.6426, -79.3871]}, {id: 2, title: "Ontario Place", description: "Big park", coordinates:[43.6282, -79.4155]}]
  const dark = 'https:///cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
  const light =  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'

  const onClick = () => {
    setColorMode((colorMode) => (colorMode === "light" ? "dark" : "light"));
  };

    const styles = {
      "&MuiButton-contained": {
        backgroundColor: "white"
      }
    };

    const ref = useRef(null);
    useEffect(() => {
      if (ref.current) {
        ref.current.setUrl(colorMode === "light" ? light : dark);
      }
    }, [colorMode]);

  //   async function addGeoJson() {
  //     const response = await fetch("https://opendata.arcgis.com/datasets/923cb3294384488e8a4ffbeb3b8f6cb2_32.geojson");
  //     const data = await response.json();
  //     console.log(data);
  //     return (<GeoJSON data={data}></GeoJSON>);
  //     // return data;
  // }

  // navigator.geolocation.getCurrentPosition(info => {

  //   setPosition(info.coords);

  // });

  // console.log(position)
  // addGeoJson();

  return (

    <MapContainer doubleClickZoom={false} center={[43.6532, -79.3832]} zoom={13} style={{ backgroundColor: "white", ...props.style }}>

<TileLayer
        ref={ref}
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url={colorMode === "light" ? light : dark}
      />

      {/* <MapConsumer>
        {(map) => {
          console.log('map center:', map.getCenter())
          return null
        }}
      </MapConsumer> */}

      {testData.map(place => (
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

      {/* <Marker position={[43.6532, -79.3832]}>
        <Popup>You are here</Popup>
      </Marker> */}
      <Button sx={styles} variant="outlined" id="mode-switch" onClick={onClick}>{colorMode === "light" ? <DarkModeIcon style={{ color: 'black' }} /> : <WbSunnyIcon style={{ color: 'white' }} /> }</Button>
      {props.children}
    </MapContainer>

  );
}