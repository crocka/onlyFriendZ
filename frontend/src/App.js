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
import LocationProfile from './components/Profile/LocationProfile';

import useApplicationData from './hooks/useApplicationData.jsx';

import MarkerList from './components/MarkerList';

import './App.css';

function App(props) {

  let userId = Cookies.get('UserID');

  const [userLogin, setUserLogin] = useState(userId);

  const { getUser, state } = useApplicationData();

  const [response, setResponse] = useState({});

  const [initialPos, setInitialPos] = useState([]);

  useEffect(() => {

    const promise = new Promise(function (resolve, reject) {

      navigator.geolocation.getCurrentPosition(function (pos) {

        resolve([pos.coords.latitude, pos.coords.longitude]);

      })
    })

    promise.then(function (value) {
      setInitialPos(value);
    });

    setUserLogin(Cookies.get('UserID'));

  }, []);

  useEffect(() => {

    if(userLogin) {

      getUser(userLogin).then(response => {

        // console.log(response)
  
        setResponse(response.data);
  
      }).catch(err => console.error);

    }

  }, [userLogin]);

  // console.log(userLogin)


  console.log(initialPos)
  // console.log(isEmptyObject(state))
  // console.log(initialPos.length === 0)
  // console.log(response == {})
  // console.log(state == {} || initialPos == [] || response == {});

  // console.log(Object.keys(state).length === 0)

  
  return (initialPos.length === 0) ? null : (
    <div>
      {/* the response is a empty if user is not logged in, so we also need to pass in the userLogin to render the Avatar only when user is logged in */}
      <Sidebar response={response} />
      <Switch>
        {!userLogin && <Route exact from="/" render={props => <Welcome {...props} />} />}
        {!userLogin && <Route exact from="/welcome" render={props => <Welcome {...props} />} />}
        {!userLogin && <Route exact from="/signup" render={props => <SignUp {...props} />} />}
        {!userLogin && <Route exact from="/signin" render={props => <SignIn {...props} />} />}
        {userLogin && <Route exact from="/addlocation" render={props => <PopupWindow><LocationForm {...props} initialPos={initialPos} /></PopupWindow>} />}
        {userLogin && <Route path="/userprofile/:id" render={props => <PopupWindow><UserProfile {...props} /></PopupWindow>} />}
        {userLogin && <Route path="/locationprofile/:id" render={props => <PopupWindow><LocationProfile {...props} /></PopupWindow>} />}
        {!userLogin && <Route path='*' exact={true} component={Welcome} />}
      </Switch>

      <Map position={initialPos}>
        {userId === undefined ? '' : <MarkerList state={state} cableApp={props.cableApp} initialPos={initialPos} user={response} />}
      </Map>

      {/* <SignIn cableApp={props.cableApp } </SignIn> 
        <LocationCard />
        {response.images.map((image) => {return (<img src={image} alt="" />);})}
        <UserProfile user={response} />
        <ReviewList reviewArray={userReview} state={state} user_id={16} /> */}
      {/* <PopupWindow><LocationProfile location_id={20} /></PopupWindow> */}
      {/* </ActionCableProvider> */}
    </div >
  );
}

export default App;