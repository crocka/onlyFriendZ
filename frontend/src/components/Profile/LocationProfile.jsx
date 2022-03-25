import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';
import useApplicationData from '../../hooks/useApplicationData.jsx';

export default function LocationProfile(props) {

  const { location_id } = props;

  const labels = ['Description', 'Photos', 'Reviews'];

  const [location, setLocation] = React.useState({});

  const { getLocation } = useApplicationData();

  React.useEffect(() => {

    getLocation(location_id).then(response => {

      setLocation(response.data);

    }).catch(err => console.error);

  }, []);

  return location ? (
    
    <Profile labels={labels} obj={normalizeObject(location)}>

    </Profile>
  ) : null;
  
}