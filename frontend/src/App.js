import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import PopupWindow from './components/PopupWindow'
import Welcome from './components/Welcome.jsx'
import './App.css';
function App() {
  return (
    <PopupWindow>
    <Welcome />
    </PopupWindow>
  );
}

export default App;
