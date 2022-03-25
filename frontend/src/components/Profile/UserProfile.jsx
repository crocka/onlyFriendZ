import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';

export default function UserProfile(props) {

  const { user } = props;

  console.log(user)
  
  const labels = ['Personal Summary', 'Favorite Places', 'Reviews'];

  return user ? (
    
    <Profile labels={labels} obj={ normalizeObject(user) }>

    </Profile>

  ) : null ;
  
}