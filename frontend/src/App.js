import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import PopupWindow from './components/PopupWindow'
import Welcome from './components/Welcome.jsx'
import Map from './components/Map.jsx'
import Fragment from 'react'
import Location from './components/Location.jsx'
import './App.css';
function App() {
  return (
    <div>
      <Map></Map>
      <PopupWindow>
        <CreateLocation />
      </PopupWindow>
    </div>
  );
}

export default App;
