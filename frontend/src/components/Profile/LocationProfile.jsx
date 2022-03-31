import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';
import useApplicationData from '../../hooks/useApplicationData.jsx';
import { useParams } from "react-router-dom";

export default function LocationProfile(props) {

  let { id } = useParams();

  if (id === undefined) {

    id = props.id;

  }

  const { state } = props;
  
  const [location, setLocation] = React.useState({});

  const { getLocation } = useApplicationData();

  React.useEffect(() => {

    getLocation(id).then(response => {

      setLocation(response.data);

    }).catch(err => console.error);

  }, []);
  
  const labels = ['Description', 'Photos', 'Reviews'];

  return location ? (
    
    <Profile labels={labels} obj={normalizeObject(location)} location_id={id} state={state} >

    </Profile>
  ) : null;
  
}