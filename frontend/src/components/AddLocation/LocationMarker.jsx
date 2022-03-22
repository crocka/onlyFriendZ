import {
  useMapEvents
} from 'react-leaflet';

export default function LocationMarker(props) {
 
  const map = useMapEvents({

    dblclick(e) {
      map.locate()
      props.setPosition(e.latlng)
      // setPosition(e.latlng)
    },
    // locationfound(e) {
    //   // props.setPosition(e.latlng)
    //   map.flyTo(e.latlng, map.getZoom())
    // },
  })

  return null;
}