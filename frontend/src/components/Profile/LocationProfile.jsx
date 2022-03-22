import React from 'react';
import Profile from './Profile';

export default function LocationProfile(props) {

  const { location } = props;

  const labels = ['Description', 'Reviews', 'Location'];

  return (
    
    <Profile labels={labels}>

    </Profile>

  );
  
}