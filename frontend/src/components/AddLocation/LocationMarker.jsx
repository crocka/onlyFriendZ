import {
  Marker,
  Popup,
  useMapEvents,
} from 'react-leaflet'

export default function LocationMarker(props) {
 
  const map = useMapEvents({
    click() {
      map.locate()
    },
    locationfound(e) {
      props.setPosition(e.latlng)
      map.flyTo(e.latlng, map.getZoom())
    },
  })

  return props.position === null ? null : (
    <Marker position={props.position}>
      <Popup>You are here</Popup>
    </Marker>
  )
}