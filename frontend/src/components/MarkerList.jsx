import { Marker, Popup } from 'react-leaflet';
import UserProfile from './Profile/UserProfile';
import { getUserFromUserId } from '../helpers';
import React, {Fragment} from 'react';


export default function MarkerList(props) {

  const { positions, state } = props;

  return (

    <Fragment>
      {Object.keys(positions).map(user_id => {

        return (
          
          < Marker key={user_id} position={positions[user_id]} >
            {/* <Popup>
              <UserProfile user={getUserFromUserId(state, user_id)} >
              </UserProfile>
            </Popup > */}
          </Marker >

        );
      })
      }
    </Fragment >
  );

};
//positions = {1: [locations]}
//return(
{/* <Fragment>
//<div>
//</div>


// <p></p>
</Fragment> */}
// ); */}