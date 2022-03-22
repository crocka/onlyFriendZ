import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import PopupWindow from './components/PopupWindow'
import Welcome from './components/Welcome.jsx'
import Map from './components/Map.jsx'
import Sidebar from './components/Sidebar.jsx'
import Fragment from 'react'
import Location from './components/Location.jsx'
import CreateLocation from './components/CreateLocation'
import UserSummary from './components/UserSummary.jsx'
import {Switch, Route} from "react-router-dom";
import LocationForm from "./components/AddLocation/LocationForm.jsx"
import LocationMarker from './components/AddLocation/LocationMarker.jsx';
import * as React from 'react';

import PictureWall from './components/Profile/PictureWall';

import './App.css';
function App() {



  return (
    <div>
      <Sidebar />
      <Switch>
        <Route exact from="/welcome" render={props => <PopupWindow><Welcome {...props} /></PopupWindow>} />
        <Route exact from="/signup" render={props => <PopupWindow><SignUp {...props} /></PopupWindow>} />
        <Route exact from="/signin" render={props => <PopupWindow><SignIn {...props} /></PopupWindow>} />
        <Route exact from="/addlocation" render={props => <PopupWindow><LocationForm {...props} /></PopupWindow>} />
      </Switch>
      <Map></Map>
      <PopupWindow>
<<<<<<< HEAD
        {/* <SignIn></SignIn> */}
        {/* <PictureWall /> */}
=======
        <SignIn></SignIn>
        {/* <LocationCard /> */}
>>>>>>> 7de00f483a0412c6ecb32371c3377f3c363a1011
      </PopupWindow>
    </div>
  );
}

export default App;
