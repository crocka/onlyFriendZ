import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
// import ActionCableProvider from 'react-actioncable-provider';
import ActionCable from 'actioncable';
const ActionCableProvider = require('react-actioncable-provider');
 
const CableApp = {};
const cable = ActionCable.createConsumer('ws://localhost:3000/cable');

CableApp.cable = cable;
{/* <ActionCableProvider cable={cable}>...</ActionCableProvider>; */}

const rootElement = document.getElementById("root");
ReactDOM.render(
 
    <Router>  
      <App cableApp={CableApp} />
    </Router>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
