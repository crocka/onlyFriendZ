import React from 'react';
import Tabs from './Tabs';
import Summary from '../Summary';
import PictureWall from './PictureWall';
import ReviewList from './ReviewList';
import Contact from '../Contact';
import Alert from '@mui/material/Alert';


export default function Profile(props) {

  //obj={title, summary, imagesArray, reviewArray, ContactInfo, is_dangerous}
  //labels=array of string
  const { labels, obj } = props;

  return (

    <React.Fragment>
      {obj.is_dangerous ? (<Alert severity="error">This location is labelled as potentially dangerous. Please do not go alone!</Alert>) : ''}

      <Tabs tabLabels={labels}>
        <Summary title={obj.title} summary={obj.summary} ></Summary>
        <PictureWall images={obj.images}></PictureWall>
        <ReviewList></ReviewList>
        <Contact></Contact>
      </Tabs>
    </React.Fragment>

  );

};