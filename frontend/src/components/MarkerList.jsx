import { Marker, Popup, Circle } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import LocationProfile from './Profile/LocationProfile';
import UserPreview from './Profile/UserPreview';
import LocationPreview from './Profile/LocationPreview';
import { getUserFromUserId } from '../helpers';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import SignIn from './SignIn'
import { useHistory } from "react-router-dom"
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';

let userIcon = L.icon({
  iconUrl: '../../../images/mapMarkerRed.png',
  shadowUrl: iconShadow,
  iconSize: [25, 25], // size of the icon
  iconAnchor: [25, 25], // point of the icon which will correspond to marker's location
  shadowAnchor: [20, 50]
});


export default function MarkerList(props) {

  const { state, initialPos } = props;

  const [position, setPosition] = useState(initialPos);

  const [positions, setPositions] = useState({});

  const [mount, setMount] = useState(false);

  // const [anchorEl, seAnchorEl] = React.useState(null);

  // console.log('state: ', state)

  const history = useHistory();

  // const [userOnHover, setUserOnHover] = useState(0);

  const userOnHover = useRef(null);

  const locationOnHover = useRef(null);

  const cookie = Cookies.get('UserID');

  useEffect(() => {

    const sub = props.cableApp.cable.subscriptions.create({ channel: 'MarkersChannel', user_id: cookie, position: position, emit: true },

      {
        received: (data) => {

          updateMarker(data);
          // console.log(positions)

        }

      });

    navigator.geolocation.watchPosition(position => {
      // console.log('watchPosition', position)

      const coords = position.coords;
      sub.send({ channel: 'MarkersChannel', user_id: cookie, position: [coords.latitude, coords.longitude] });
      setPosition([coords.latitude, coords.longitude]);
      // sub.send({ channel: 'MarkersChannel', user_id: cookie, position: position }, { received: (data) => updateMarker(data) })

      // console.log('insend',[coords.latitude, coords.longitude])
    });

    function updateMarker(data) {

      const key = Object.keys(data)[0];

      const value = data[key];

      if (data.emit === true) {

        sub.send({ channel: 'MarkersChannel', user_id: cookie, position: position, emit: false });

      }

      if (data["delete"] === true) {

        console.log(data.delete, 'deleeeeeeeeete')

        setPosition(prev => {

          const obj = { ...prev };

          delete obj[key];

          return obj;

        })

      } else {

        setPositions(prev => {

          const obj = { ...prev };

          // if(obj[key] === undefined) {

          // sub.send({ channel: 'MarkersChannel', user_id: cookie, position: position });
          // console.log('new connection detected')
          // }


          obj[key] = value;

          // console.log(obj)
          return obj;

        })
      }



      // console.log(positions)
    };

    return () => {

      // console.log('unsubscribe from markerschannel')
      // sub.unsubscribe();
    }

    // }
  }, []);


  function handleClick(id, purpose) {

    //route to user profile
    // setMount(false);
    // console.log(`Moving to /userprofile/${user_id}`);

    if (purpose === 'user') {

      history.push(`/userprofile/${id}`);

    } else if (purpose === 'location') {

      history.push(`/locationprofile/${id}`);

    }


  }

  function handleHover(id, purpose) {

    if (purpose === 'user') {

      userOnHover.current = id;

    } else if (purpose === 'location') {

      locationOnHover.current = id;

    }

    setMount(prev => !prev);

  }

  function handleOut(id, purpose) {

    setMount(prev => !prev);

    userOnHover.current = null;
    locationOnHover.current = null;

  }

  return state !== {} ? (

    <Fragment>
      {Object.keys(positions).map((user_id) => {

        return (

          <Fragment key={user_id}>


            < Marker draggable id={`marker-${user_id}`} key={user_id} position={positions[user_id]} stroke={false} icon={userIcon}

              eventHandlers={{
                click: () => {
                  handleClick(user_id, 'user');
                },

                mouseover: () => {
                  handleHover(user_id, 'user');

                  // appendUserProfile(user_id);
                  // e.target.openPopup();

                  // console.log(e)
                },

                mouseout: () => {
                  handleOut(user_id, 'user');
                  // e.target.closePopup();
                }
              }}
            >


            </Marker >

          </Fragment >

        );
      })
      }

      {//some location object/array with its coords

        Array.isArray(state.locations) ? (state.locations.map(location => {


          return (

            <Fragment key={location.id}>


              < Marker id={`marker-${location.id}`} key={location.id} position={[location.latitude, location.longitude]}

                eventHandlers={{
                  click: () => {
                    handleClick(location.id, 'location');
                  },

                  mouseover: () => {
                    handleHover(location.id, 'location');

                    // appendUserProfile(user_id);
                    // e.target.openPopup();

                    // console.log(e)
                  },

                  mouseout: () => {
                    handleOut(location.id, 'location');
                    // e.target.closePopup();
                  }
                }}
              >


              </Marker >

            </Fragment >
          );
        })) : null


      }

      <div>

        <Popover
          // id={user_id}
          // ref={userOnHover}
          open={mount}
          sx={{
            pointerEvents: 'none',
          }}

          anchorPosition={{
            vertical: 'bottom',
            horizontal: 'right',
          }}

          transformOrigin={{
            vertical: 'botton',
            horizontal: 'right',
          }}

          disableRestoreFocus
        >
          <Box

            id={`userPopoverBox`}
            sx={{
              zIndex: 'tooltip'
            }}
          >

            {userOnHover.current === null ? <LocationPreview id={locationOnHover.current} />

              : <UserPreview id={userOnHover.current} />}



          </Box>
          {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        </Popover>

      </div>

    </Fragment >
  ) : null;

};
//positions = {1: [locations]}
