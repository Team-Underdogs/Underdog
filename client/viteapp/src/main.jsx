import React from 'react'
import {createRoot} from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'
import App from './App.jsx'
import './index.css'
import Header from './components/header.jsx';
import Background from './components/Background.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <Auth0Provider
    domain='underdogs.au.auth0.com'
    clientId='AY57nakZIliDj4G0uq6ubNmdJj54kPTG'
    cacheLocation='localstorage'
    useRefreshTokens
    authorizationParams={{
      redirect_uri: 'http://localhost:3000'
    }}
    >
    <BrowserRouter>
      <Header />
      <Background>
        <App/>
      </Background>
    </BrowserRouter>
  </Auth0Provider>
);
