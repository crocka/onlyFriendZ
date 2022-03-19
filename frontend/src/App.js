import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import PopupWindow from './components/PopupWindow'
import Welcome from './components/Welcome.jsx'
import Map from './components/Map.jsx'
import Sidebar from './components/Sidebar.jsx'
import Fragment from 'react'

import './App.css';
function App() {
  return (
    <div>
      <Sidebar />
      <Map></Map>
      <PopupWindow>
        <SignUp></SignUp>
      </PopupWindow>
    </div>
  );
}

export default App;
