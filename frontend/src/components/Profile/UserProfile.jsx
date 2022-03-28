import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';
import useApplicationData from '../../hooks/useApplicationData.jsx';
import { useParams } from "react-router-dom";

export default function UserProfile(props) {

  let { id } = useParams();

  if (id === undefined) {

    id = props.id;

  }

  const { state } = props;

  const [user, setUser] = React.useState({});

  const { getUser } = useApplicationData();

  React.useEffect(() => {

    getUser(id).then(response => {

      setUser(response.data);

    }).catch(err => console.error);

  }, []);

  const labels = ['Personal Summary', 'Favorite Places', 'Reviews'];

  return user ? (

    <Profile labels={labels} obj={normalizeObject(user)} user_id={id} state={state}>

    </Profile>

  ) : null;

}