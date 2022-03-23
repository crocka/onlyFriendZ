import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';

export default function UserProfile(props) {

  const { user } = props;
  
  const labels = ['Personal Summary', 'Favorite Places', 'Reviews', 'Contact me'];

  return (
    
    <Profile labels={labels} obj={normalizeObject(user)}>

    </Profile>

  );
  
}