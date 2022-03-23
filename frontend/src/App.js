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
import {Switch, Route} from "react-router-dom";
import LocationForm from "./components/AddLocation/LocationForm.jsx"
import LocationMarker from './components/AddLocation/LocationMarker.jsx';
import * as React from 'react';

import PictureWall from './components/Profile/PictureWall';

import useApplicationData from './hooks/useApplicationData.jsx'

import './App.css';
function App() {

  const { state } = useApplicationData;

  console.log(state)
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
        <SignIn></SignIn>
        {/* <LocationCard /> */}
      </PopupWindow>
    </div>
  );
}

export default App;
