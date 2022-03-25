import { Marker, Popup } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import { getUserFromUserId } from '../helpers';
import React, { Fragment, useEffect, useState } from 'react';
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

  const [anchorEl, seAnchorEl] = React.useState(null);

  const history = useHistory();

  useEffect(() => {

    const cookie = Cookies.get('UserID')
    //if logged in user
    if (cookie) {

      const sub = props.cableApp.cable.subscriptions.create({ channel: 'MarkersChannel', user_id: cookie, position: position }, { received: (data) => updateMarker(data) });

    }
  }, [position]);

  navigator.geolocation.watchPosition(position => {
    // console.log('watchPosition')

    const coords = position.coords;
    setPosition([coords.latitude, coords.longitude]);

  });

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

  function handleClick(user_id) {

    //route to user profile
    // setMount(false);
    // console.log(`Moving to /userprofile/${user_id}`);
    history.push(`/userprofile/${user_id}`);

  }

  function handleHover(user_id) {

    setMount(prev => !prev);
    // setAnchorEl(e.currentTarget);
    // console.log(mount)

    // document.getElementById(`marker-${user_id}`).append('<')

    document.getElementById(`popover-${user_id}`).appendChild(`<UserProfile id={user_id} />`);
  }

  function handleOut(user_id) {

    setMount(prev => !prev);
    document.getElementById(`popover-${user_id}`).removeChild();
    // setAnchorEl(null);
    // console.log(mount)

  }

  function handleUserProfile(user_id) {


  }


  return state !== {} ? (

    <Fragment>
      {Object.keys(positions).map((user_id) => {

        return (

          <Fragment key={user_id}>


            < Marker id={`marker-${user_id}`} key={user_id} position={positions[user_id]}

              eventHandlers={{
                click: () => {
                  handleClick(user_id);
                },

                mouseover: (user_id) => {
                  handleHover(user_id);

                  // appendUserProfile(user_id);
                  // e.target.openPopup();

                  // console.log(e)
                },

                mouseout: (user_id) => {
                  handleOut(user_id);
                  // e.target.closePopup();
                }
              }}
            >


            </Marker >

            <div>

              <Popover
                id={user_id}
                open={mount}
                // anchorEl={null}
                // onClose={handleOut}
                // disableAutoFocus={true}
                // anchorEl={anchorEl}
                // disableEnforceFocus={true}
                // onClose={handlePopoverClose}
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
                  id={`popover-${user_id}`}
                  sx={{
                    zIndex: 'tooltip'

                  }}
                >

                  {/* {handleUserProfile(user_id)} */}
                  {/* <UserProfile id={user_id} /> */}

                </Box>
                {/* <Typography sx={{ p: 2 }}>The content of the Popover.</Typography> */}
              </Popover>

            </div>

          </Fragment >

        );
      })
      }

      {/* {mount === true ? '' : ''} */}

    </Fragment >
  ) : null;

};
//positions = {1: [locations]}
