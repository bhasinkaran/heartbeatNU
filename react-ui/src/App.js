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
import ChangeContext from "./components/ChangeContext";
import ViewChange from "./components/ViewChange";
const s = new Spotify();

export const InfoContext = React.createContext();
function App() {
  const info = {
    artists: null,
    messages: null,
    songs: null,
    userid: null,
    accesstoken: null,
    refreshtoken: null
  };

  const [context, setContext] = React.useState(info);
  return(
    <BrowserRouter>
        <Route exact path="/signup/:id/:access_token" render={()=><Signup />} />
        <Route exact path="/" render={()=><Login />} />
        <InfoContext.Provider value={[context, setContext]}>
        <Route exact path="/home/:id/:access_token/:refresh_token"  render = {()=> <Homepage ></Homepage>} />
        </InfoContext.Provider>
        <InfoContext.Provider value={[context, setContext]}>
        <Route exact path="/artist/:artistid"  render = {()=> <ArtistPage ></ArtistPage>} />
        </InfoContext.Provider>
        <Route exact path="/map" render={()=><MapLeaflet />} />
     
    </BrowserRouter>
  );
  // const [context, setContext] = React.useState(info);
  // return (
  //   <InfoContext.Provider value={[context, setContext]}>
  //      <BrowserRouter>
  //  <Route exact path="/check1" render={()=> <ChangeContext />} />
  //  <Route exact path="/check2" render={()=> <ViewChange />} />
  //       </BrowserRouter>
      
  //   </InfoContext.Provider>);
 
}

export default App;

//test for push 2