import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import PopupWindow from './components/PopupWindow'
import Welcome from './components/Welcome.jsx'
import Map from './components/Map.jsx'
import Sidebar from './components/Sidebar.jsx'
import Fragment from 'react'
import Location from './components/Location.jsx'
import CreateLocation from './components/CreateLocation'
import UserSummary from './components/Summary.jsx'
import { Switch, Route } from "react-router-dom";
import LocationForm from "./components/AddLocation/LocationForm.jsx"
import LocationMarker from './components/AddLocation/LocationMarker.jsx';
import * as React from 'react';
import ReviewList from './components/Profile/ReviewList';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie';

import PictureWall from './components/Profile/PictureWall';

import UserProfile from './components/Profile/UserProfile';

import useApplicationData from './hooks/useApplicationData.jsx';

import MarkerList from './components/MarkerList';

import './App.css';

function App(props) {

  const { getUser, state } = useApplicationData();
  const [response, setResponse] = useState({});
  const [userLogin, setUserLogin] = useState(false);
  const [initialPos, setInitialPos] = useState([]);

  const promise = new Promise(function (resolve, reject) {

    navigator.geolocation.getCurrentPosition(function (pos) {
      
      resolve([pos.coords.latitude, pos.coords.longitude]);

    })
  })

  promise.then(function (value) {
    setInitialPos(value);
  });

  
  useEffect(() => {

    function checkUserLogin() {
      if (Cookies.get('UserID')) {
        setUserLogin(true)
      } else {
        setUserLogin(false)
      }
    }

    checkUserLogin();

  }, [userLogin]);

  // useEffect(() => {

  //   function user() {

  //     let res;

  //     getUser(16).then(response => {

  //       console.log(response)

  //       res = response.data

  //       setResponse(res);

  //     }).catch(err => console.error);

  //   }

  //   console.log(userLogin)

  //   user();

  // }, []);

  console.log(initialPos)

  return (state && initialPos && response) ? (
    <div>
      <Sidebar response={response} />
      <Switch>
        {!userLogin && <Route exact from="/" render={props => <Welcome {...props} />} />}
        {!userLogin && <Route exact from="/welcome" render={props => <Welcome {...props} />} />}
        {!userLogin && <Route exact from="/signup" render={props => <SignUp {...props} />} />}
        {!userLogin && <Route exact from="/signin" render={props => <SignIn {...props} />} />}
        {userLogin && <Route exact from="/addlocation" render={props => <PopupWindow><LocationForm {...props} /></PopupWindow>} />}
        {!userLogin && <Route path='*' exact={true} component={Welcome} />}
      </Switch>

      <Map position={initialPos}>
        <MarkerList state={state} cableApp={props.cableApp} initialPos={initialPos} />
      </Map>

      {/* <SignIn cableApp={props.cableApp } </SignIn> 
        <LocationCard />
        {response.images.map((image) => {return (<img src={image} alt="" />);})}
        <UserProfile user={response} />
        <ReviewList reviewArray={userReview} state={state} user_id={16} /> */}

      {/* </ActionCableProvider> */}
    </div >
  ) : null;
}

export default App;