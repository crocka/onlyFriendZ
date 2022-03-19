import { MapContainer, TileLayer, Marker, Popup, GeoJSON} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

export default function Map(props) {

  async function addGeoJson() {
    const response = await fetch("https://ws.lioservices.lrc.gov.on.ca/arcgis1071a/rest/services/LIO_OPEN_DATA/LIO_Open01/MapServer/32/query?where=1%3D1&outFields=*&outSR=4326&f=json");
    const data = await response.json();
    return (<GeoJSON data={data}></GeoJSON>);
}


  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ backgroundColor:"black"}}>
       
      <TileLayer
        attribution='&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="http://cartodb.com/attributions">CartoDB</a>'
        url='https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'
        // url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* <Marker position={[51.505, -0.09]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker> */}
      {addGeoJson()}
    </MapContainer>
  );
}