import { Marker, Popup, Circle } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import LocationProfile from './Profile/LocationProfile';
import { getUserFromUserId } from '../helpers';
import React, { Fragment, useEffect, useState, useRef } from 'react';
import Cookies from 'js-cookie';
import SignIn from './SignIn'
import { useHistory } from "react-router-dom"
import Card from '@mui/material/Card';
import Popover from '@mui/material/Popover';
import Box from '@mui/material/Box';
import { modalUnstyledClasses } from '@mui/material';

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

  useEffect(() => {

    const cookie = Cookies.get('UserID')
    //if logged in user
    if (cookie) {

      const sub = props.cableApp.cable.subscriptions.create({ channel: 'MarkersChannel', user_id: cookie, position: position }, { received: (data) => updateMarker(data) });

    }
  }, [position]);

  setInterval(() => {


    navigator.geolocation.watchPosition(position => {
      // console.log('watchPosition')

      const coords = position.coords;
      setPosition([coords.latitude, coords.longitude]);

    });



  }, 1000);

  // console.log(positions)

  function updateMarker(data) {

    const key = Object.keys(data)[0];

    const value = data[key];

    setPositions(prev => {

      const obj = { ...prev };
      obj[key] = value;
      return obj;

    })
  };

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


            < Circle draggable id={`marker-${user_id}`} key={user_id} center={positions[user_id] } fillColor="blue" radius={100}

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


            </Circle >

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

          anchorOrigin={{
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

            {userOnHover.current === null ?  <LocationProfile id={locationOnHover.current} />
            
            : <UserProfile id={userOnHover.current} />} 
            
           

          </Box>
          {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
        </Popover>

      </div>

    </Fragment >
  ) : null;

};
//positions = {1: [locations]}
