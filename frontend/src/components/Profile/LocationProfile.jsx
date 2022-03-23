import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';

export default function LocationProfile(props) {

  const { location } = props;

  const labels = ['Description', 'Photos', 'Reviews'];

  return (
    
    <Profile labels={labels} obj={normalizeObject(location)}>

    </Profile>
  );
  
}