import React from 'react';
import Profile from './Profile';
import PictureWall from './PictureWall';

export default function UserProfile(props) {

  const { user } = props;

  const labels = ['Personal Summary', 'Favorite Places', 'Reviews', 'Contact me'];

  return (
    
    <Profile labels={labels}>
      <UserSummary></UserSummary>
      <PictureWall images={user.images}></PictureWall>
      <ReviewList></ReviewList>
      <Contact></Contact>
    </Profile>

  );
  
}