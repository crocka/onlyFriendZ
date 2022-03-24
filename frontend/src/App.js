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
<<<<<<< HEAD
import * as React from 'react';
import ReviewList from './components/Profile/ReviewList';
=======
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'

>>>>>>> 981070568f2297d7d3c3f10e2b730a7b99e3fb80
import PictureWall from './components/Profile/PictureWall';

import UserProfile from './components/Profile/UserProfile';

import useApplicationData from './hooks/useApplicationData.jsx';

import './App.css';
function App() {

<<<<<<< HEAD
  const { getUser, state, getUserReviews } = useApplicationData();
  const [response, setResponse] = React.useState({});
  const [userReview, setUserReview] = React.useState([]);

=======
  const { getUser } = useApplicationData();
  const [response, setResponse] = useState({});
  const [userLogin, setUserLogin] = useState(false);
>>>>>>> 981070568f2297d7d3c3f10e2b730a7b99e3fb80

  // console.log(state)

  useEffect(() => {

    function user() {

      let res;

      getUser(16).then(response => {

        console.log(response)

        res = response.data

        setResponse(res);

      }).catch(err => console.error);

    }

  function checkUserLogin() {
    if(Cookies.get('UserID')) {
      setUserLogin(true)
    } else {
      setUserLogin(false)
    }
  }

    user();
    checkUserLogin();


    getUserReviews(16).then(res => {

      console.log(res);
      setUserReview(res);

    }).catch(err => console.error);

  }, [])

  // console.log(response)



  return (
    <div>
      <Sidebar />
      <Switch>
        {!userLogin && <Route exact from="/" render={props => <Welcome {...props} />} />}
        {!userLogin && <Route exact from="/welcome" render={props => <Welcome {...props} />} />}
        {!userLogin && <Route exact from="/signup" render={props => <SignUp {...props} />} />}
        {!userLogin && <Route exact from="/signin" render={props => <SignIn {...props} />} />}
        {userLogin && <Route exact from="/addlocation" render={props => <PopupWindow><LocationForm {...props} /></PopupWindow>} />}
        {!userLogin && <Route path='*' exact={true} component={Welcome} />}
      </Switch>
      <Map></Map>
      {/* <PopupWindow> */}
        {/* <SignIn></SignIn> */}
        {/* <LocationCard /> */}
        {/* {response.images.map((image) => {return (<img src={image} alt="" />);})} */}
        {/* <UserProfile user={response} /> */}
<<<<<<< HEAD
        {/* <ReviewList reviewArray={userReview} state={state} user_id={16} /> */}
      </PopupWindow>
=======
      {/* </PopupWindow> */}
>>>>>>> 981070568f2297d7d3c3f10e2b730a7b99e3fb80
    </div>

  );
}

export default App;
