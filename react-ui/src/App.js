import axios from 'axios'

import React, {useState} from 'react';
import {Router } from  'react-router-dom'

import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Homepage from './components/homepage';
import Login from './components/login'
import MapLeaflet from './components/MapLeaflet'
import {BrowserRouter, Route} from 'react-router-dom'
import Signup from './components/signup';
const s = new Spotify();

function App() {

  return(
    <BrowserRouter>
      <Route exact path="/signup" render={()=><Signup />} />
      <Route exact path="/" render={()=><Login />} />
      <Route exact path="/home/:id/:hash"  render = {()=> <Homepage ></Homepage>} />
      <Route exact path="/map" render={()=><MapLeaflet />} />
    </BrowserRouter>
  );
 
}

export default App;

//test for push 2