import React from 'react';
import Profile from './Profile';
import normalizeObject from './normalizeObject';
import { useParams } from "react-router-dom";

export default function UserProfile(props) {

  const {id} = useParams();

  return (
    <div>
      This marker belongs to User ID = {id}
    </div>
  )

  // const { user } = props;

  // console.log(user)
  
  // const labels = ['Personal Summary', 'Favorite Places', 'Reviews'];

  // return user ? (
    
  //   <Profile labels={labels} obj={ normalizeObject(user) }>

  //   </Profile>

  // ) : null ;
  
}