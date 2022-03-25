import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';
import useApplicationData from '../../hooks/useApplicationData.jsx';

export default function UserProfile(props) {

  const { user_id } = props;

  const [user, setUser] = React.useState({});

  const { getUser } = useApplicationData();

  React.useEffect(() => {

    getUser(user_id).then(response => {

      setUser(response.data);

    }).catch(err => console.error);

  }, []);

  const labels = ['Personal Summary', 'Favorite Places', 'Reviews'];

  return user ? (

    <Profile labels={labels} obj={normalizeObject(user)}>

    </Profile>

  ) : null;

}