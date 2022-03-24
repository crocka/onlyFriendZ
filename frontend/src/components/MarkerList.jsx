import { Marker, Popup } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import { getUserFromUserId } from '../helpers';
import React, {Fragment} from 'react';


export default function MarkerList(props) {

  const { state } = props;

  const [positions, setPositions] = useState({});

  useEffect(() => {

    const cookie = Cookies.get('UserID')
    //if logged in user
    if (cookie) {

      const sub = props.cableApp.cable.subscriptions.create({ channel: 'MarkersChannel', user_id: cookie, position: position }, { received: (data) => updateMarker(data) });

    }

  }, [position])


  navigator.geolocation.watchPosition(position => {

    const coords = position.coords;
    setPosition([coords.latitude, coords.longitude]);
    // props.cableApp.sub.send({lat: coords.latitude, lng: coords.longitude})

  });

  function updateMarker(data) {

    const key = Object.keys(data)[0];

    const value = data[key];

    setPositions(prev => {

      const obj = {...prev};
      obj[key] = value;
      return obj;

    })
  };

  return state ? (

    <Fragment>
      {Object.keys(positions).map(user_id => {

        return  (
          
          < Marker key={user_id} position={positions[user_id]}
          
          eventHandlers={{
            click: () => {
              console.log('marker clicked')
            },
          }}
          >
            <Popup>
              <p>sdafasfd</p>
              <UserProfile user={getUserFromUserId(state, user_id)} >

              </UserProfile>
            </Popup >
          </Marker >

        );
      })
      }
    </Fragment >
  ) : null;

};
//positions = {1: [locations]}
