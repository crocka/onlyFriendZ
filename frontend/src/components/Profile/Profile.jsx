import React from 'react';
import Tabs from './Tabs';
import Summary from '../Summary';
import PictureWall from './PictureWall';
import ReviewList from './ReviewList';
import Alert from '@mui/material/Alert';


export default function Profile(props) {

  //obj={title, summary, imagesArray, reviewArray, ContactInfo, is_dangerous}
  //labels=array of string
  const { labels, obj, location_id, user_id, state } = props;

  return (

    <React.Fragment>
      {obj.is_dangerous ? (<Alert severity="error">This location is labelled as potentially dangerous. Please do not go alone!</Alert>) : ''}

      <Tabs tabLabels={labels}>
        <Summary key='1' obj={obj} ></Summary>
        <PictureWall key='2' images={obj.images} location_id={location_id} user_id={user_id} ></PictureWall>
        <ReviewList key='3' user_id={user_id} location_id={location_id} initialState={state}></ReviewList>
      </Tabs>

    </React.Fragment>

  );

};