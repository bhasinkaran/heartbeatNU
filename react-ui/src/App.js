import axios from 'axios'
import firebase from 'firebase/app';
import 'firebase/database';
import React, {useState, useContext} from 'react';
import {Router } from  'react-router-dom'

import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Homepage from './components/homepage';
import Login from './components/login'
import MapLeaflet from './components/MapLeaflet'
import {BrowserRouter, Route} from 'react-router-dom'
import Signup from './components/signup';
import ArtistPage from './components/artisthomepage'
import {AppState} from './context'
const s = new Spotify();

function App() {
  const someState = useContext(AppState);
  const {songs,
    posts,
    messages,
    artists,
    userid,
    setuserid,
    accesstoken,
    setaccesstoken,
    refreshtoken,
    setrefreshtoken } = someState;

  return(
    <BrowserRouter>
      <Route exact path="/signup/:id/:access_token" render={()=><Signup />} />
      <Route exact path="/" render={()=><Login />} />
      <Route exact path="/home/:id/:access_token/:refresh_token"  render = {()=> <Homepage ></Homepage>} />
      <Route exact path="/artist/:artistid"  render = {()=> <ArtistPage ></ArtistPage>} />
      <Route exact path="/map" render={()=><MapLeaflet />} />
    </BrowserRouter>
  );
 
}

export default App;

//test for push 2