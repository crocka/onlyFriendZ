import { Marker, Popup } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import { getUserFromUserId } from '../helpers';
import React, { Fragment, useEffect, useState } from 'react';
import Cookies from 'js-cookie';

export default function MarkerList(props) {

  const { state, initialPos } = props;

  const [position, setPosition] = useState(initialPos);

  const [positions, setPositions] = useState({});

  const [mount, setMount] = useState(false);

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

  function handleClick() {

    //route to user profile
  }

  function handleHover() {

    setMount(true);

  }

  function handleOut() {

    setMount(false);

  }

  return state ? (

    <Fragment>
      {Object.keys(positions).map(user_id => {

        return (

          <Fragment>

            < Marker key={user_id} position={positions[user_id]}

              eventHandlers={{
                click: () => {
                  handleClick();
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

            {mount ? <UserProfile user={getUserFromUserId(state, user_id)} > </UserProfile> : ''}

          </Fragment >

        );
      })
      }
    </Fragment >
  ) : null;

};
//positions = {1: [locations]}
