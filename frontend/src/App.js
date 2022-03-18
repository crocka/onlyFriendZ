import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'
import PopupWindow from './components/PopupWindow'
import './App.css';
function App() {
  return (
    <PopupWindow>
    <SignUp />
    </PopupWindow>
  );
}

export default App;
