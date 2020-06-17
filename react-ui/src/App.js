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
  const [artists, setArtists]=useState("")
  const [messages, setMessages]=useState("")
  const [songs, setSongs]=useState("")
  const [userid, setUserid]=useState("")
  const [accesstoken, setAccesToken]=useState("")
  const [refreshtoken, setRefreshtoken]=useState("")
  
 
  // const [context, setContext] = React.useState(info);
  return(
    <BrowserRouter>
      <InfoContext.Provider value={{artists, setArtists, messages, setMessages, songs, setSongs, userid, setUserid, accesstoken, setAccesToken, refreshtoken, setRefreshtoken}}>
        <Route exact path="/signup/:id/:access_token" render={()=><Signup />} />
        <Route exact path="/" render={()=><Login />} />
        
        <Route exact path="/home/:id/:access_token/:refresh_token"  render = {()=> <Homepage ></Homepage>} />
    
       
        <Route exact path="/artist/:artistid"  render = {()=> <ArtistPage ></ArtistPage>} />
       
        <Route exact path="/map" render={()=><MapLeaflet />} />
      </InfoContext.Provider>
    </BrowserRouter>
  );
}

export default App;

//test for push 2