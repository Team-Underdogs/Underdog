import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Header from './components/Header.jsx';
import { BrowserRouter } from "react-router-dom";
import Background from './components/Background.jsx';

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Header />
    <Background>
      <App />
    </Background>
  </BrowserRouter>
);
