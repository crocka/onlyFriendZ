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
import Cookies from 'js-cookie'

import PictureWall from './components/Profile/PictureWall';

import UserProfile from './components/Profile/UserProfile';

import useApplicationData from './hooks/useApplicationData.jsx';

import './App.css';

function App(props) {

  const { getUser, state, getUserReviews } = useApplicationData();
  const [response, setResponse] = useState({});
  const [userLogin, setUserLogin] = useState(false);
  const [initialPos, setInitialPos] = useState([]);

  async function getInitialPosition() {

    await navigator.geolocation.getCurrentPosition(position => {

      const coords = position.coords;
      setInitialPos([coords.latitude, coords.longitude]);

    })

  };

  getInitialPosition();


  useEffect(() => {

    function user() {

      let res;

      getUser(Cookies.get('UserID')).then(response => {

        console.log(response)

        res = response.data

        setResponse(res);

      }).catch(err => console.error);

    }

    function checkUserLogin() {
      if (Cookies.get('UserID')) {
        setUserLogin(true)
      } else {
        setUserLogin(false)
      }
    }

    checkUserLogin();
    // if (userLogin === true) {
    user();
    // }


    //   getUserReviews(16).then(res => {

    //     console.log(res);
    //     setUserReview(res);

    //   }).catch(err => console.error);

  }, []);

  // console.log(response)

  console.log(state);

  return (
    <div>
      {/* <ActionCableProvider url={"ws://localhost:3000/cable"}> */}
        <Sidebar response={response} />
        <Switch>
          {!userLogin && <Route exact from="/" render={props => <Welcome {...props} />} />}
          {!userLogin && <Route exact from="/welcome" render={props => <Welcome {...props} />} />}
          {!userLogin && <Route exact from="/signup" render={props => <SignUp {...props} />} />}
          {!userLogin && <Route exact from="/signin" render={props => <SignIn {...props} />} />}
          {userLogin && <Route exact from="/addlocation" render={props => <PopupWindow><LocationForm {...props} /></PopupWindow>} />}
          {!userLogin && <Route path='*' exact={true} component={Welcome} />}
        </Switch>
        <Map cableApp={props.cableApp} state={state}>
          {state && <MarkerList state={state} /> }
        </Map>
        {/* <SignIn cableApp={props.cableApp } </SignIn> 
        <LocationCard />
        {response.images.map((image) => {return (<img src={image} alt="" />);})}
        <UserProfile user={response} />
        <ReviewList reviewArray={userReview} state={state} user_id={16} /> */}

      {/* </ActionCableProvider> */}
    </div >
  );
}

export default App;
