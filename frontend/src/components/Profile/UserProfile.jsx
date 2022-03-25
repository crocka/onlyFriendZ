import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';
import useApplicationData from '../../hooks/useApplicationData.jsx';
import { useParams } from "react-router-dom";

export default function UserProfile(props) {

  const { id } = useParams();

  const [user, setUser] = React.useState({});

  const { getUser } = useApplicationData();

  React.useEffect(() => {

    getUser(id).then(response => {

      setUser(response.data);

    }).catch(err => console.error);

  }, []);

  const labels = ['Personal Summary', 'Favorite Places', 'Reviews'];

  return user ? (

    <Profile labels={labels} obj={normalizeObject(user)}>

    </Profile>

  ) : null;

}