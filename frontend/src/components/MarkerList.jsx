import { Marker, Popup } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import { getUserFromUserId } from '../helpers';
import * as React from 'react';


export default function MarkerList(props) {

  const { positions, state } = props;

  return (

    <React.Fragment>
      {Object.keys(positions).map(user_id => {

        return (

          < Marker position={positions[user_id]} >
            <Popup>
              <UserProfile user={getUserFromUserId(state, user_id)} >
              </UserProfile>
            </Popup >
          </Marker >

        );
      })
      }
    </React.Fragment >
  );

};
