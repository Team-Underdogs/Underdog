import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/header.jsx';
import { BrowserRouter } from "react-router-dom";
import Background from './components/gradientbackground.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <Background>
      <App />
    </Background>
  </BrowserRouter>
);
