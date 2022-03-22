import React from 'react';
import Profile from './Profile';

export default function UserProfile(props) {

  const { user } = props;

  const labels = ['Personal Summary', 'Reviews', 'Contact me'];

  return (
    
    <Profile user={user} location={location} />

  );
  
}