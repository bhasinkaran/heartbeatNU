import axios from 'axios'
import firebase from 'firebase/app';
import 'firebase/database';
import React, {useState, useContext, useEffect} from 'react';
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
import {dbMessages, dbPosts, dbSongs, dbArtists, dbReplies, dbLikes} from './firebase/firebase';

const s = new Spotify();

export const InfoContext = React.createContext();
function App() {
  
  const [artists, setArtists]=useState("")
  const [messages, setMessages]=useState("")
  const [songs, setSongs]=useState("")
  const [posts, setPosts]=useState("")
  const [replies, setReplies]=useState("")
  const [likes, setLikes]=useState("");
  const [user, setUser]=useState("")
  const [accesstoken, setAccesToken]=useState("")
  const [refreshtoken, setRefreshToken]=useState("")
  
  React.useEffect(()=>{
    localStorage.setItem('user', JSON.stringify(user));
  }, []);
  React.useEffect(()=>{
    const data = localStorage.getItem('user');
    if(data){
      setUser(JSON.parse(data));
    }
    
  }, []);

  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setArtists(snap.val());
    }
    dbArtists.on('value', handleData, error => alert(error));
    return () => { dbArtists.off('value', handleData); };
  }, []);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setLikes(snap.val());
    }
    dbLikes.on('value', handleData, error => alert(error));
    return () => { dbLikes.off('value', handleData); };
  }, []);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setMessages(snap.val());
    }
    dbMessages.on('value', handleData, error => alert(error));
    return () => { dbMessages.off('value', handleData); };
  }, []);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setReplies(snap.val());
    }
    dbReplies.on('value', handleData, error => alert(error));
    return () => { dbReplies.off('value', handleData); };
  }, []);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setSongs(snap.val());
    }
    dbSongs.on('value', handleData, error => alert(error));
    return () => { dbSongs.off('value', handleData); };
  }, []);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setPosts(snap.val());
    }
    dbPosts.on('value', handleData, error => alert(error));
    return () => { dbPosts.off('value', handleData); };
  }, []);
 
  // const [context, setContext] = React.useState(info);
  return(
    <BrowserRouter>
      <InfoContext.Provider value={{replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs,posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken}}>
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