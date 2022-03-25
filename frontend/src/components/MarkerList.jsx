import { Marker, Popup } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import { getUserFromUserId } from '../helpers';
import React, { Fragment, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import SignIn from './SignIn'
import { useHistory } from "react-router-dom"
import Tooltip from '@mui/material/Tooltip';

export default function MarkerList(props) {

  const { state, initialPos } = props;

  const [position, setPosition] = useState(initialPos);

  const [positions, setPositions] = useState({});

  const [mount, setMount] = useState(false);

  const history = useHistory();

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

  });

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
    console.log(`Moving to /userprofile/${user_id}`);
    history.push(`/userprofile/${user_id}`);
    
  }

  function handleHover() {

    setMount(prev => !prev);
    // console.log(mount)

  }

  function handleOut() {

    setMount(prev => !prev);
    // console.log(mount)

  }
  return state !== {} ? (

    <Fragment>
      {Object.keys(positions).map((user_id) => {

        return (

          <Fragment key={user_id}>
            < Marker key={user_id} position={positions[user_id]}

              eventHandlers={{
                click: () => {
                  handleClick(user_id);
                },

                mouseover: () => {
                  handleHover();
                },

                mouseout: () => {
                  handleOut();
                }
              }}
            >

            </Marker >

            {/* { mount===true ? '':<UserProfile user={getUserFromUserId(state, user_id)} > </UserProfile> } */}
          </Fragment >

        );
      })
      }

      { mount===true ? '': ''}
      
    </Fragment >
  ) : null;

};
//positions = {1: [locations]}
