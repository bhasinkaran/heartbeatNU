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
import {Segment, Sidebar} from 'semantic-ui-react'
import SideBar from './components/Sidebar'
import MapLeaflet from './components/MapLeaflet'
import {BrowserRouter, Route} from 'react-router-dom'
import Signup from './components/signup';
import ArtistPage from './components/artisthomepage'
import TrackPage from './components/trackhomepage'
import PageHeader from './components/pageheader'
import {dbMessages, dbPosts, dbSongs, dbArtists, dbReplies, dbLikes} from './firebase/firebase';
import SettingsPage from './components/settingspage';
import FavoriteArtists from './components/favartists'
import FavoriteSongs from './components/favsongs';
import DatingHomePageFeed from './dating_components/DatingHomepage';
import DatingLogin from './dating_components/DatingLogin'

const s = new Spotify();

export const InfoContext = React.createContext();
function App() {
  function withMenu(page){
    return(
      <div>
        <PageHeader accesstoken={accesstoken} id={user.id}/>
        <Sidebar.Pushable as={Segment}>
        <SideBar />
        <Sidebar.Pusher>
          {page}
        </Sidebar.Pusher>
      </Sidebar.Pushable>

      </div>
    )
    
  }
  
  
  const [artists, setArtists]=useState("")
  const [messages, setMessages]=useState("")
  const [songs, setSongs]=useState("")
  const [posts, setPosts]=useState("")
  const [replies, setReplies]=useState("")
  const [likes, setLikes]=useState("");
  const [user, setUser]=useState("")
  const [accesstoken, setAccesToken]=useState("")
  const [refreshtoken, setRefreshToken]=useState("")
  const [visible, setVisible] = useState(false);
  const [mongouser, settmongouser]=useState("");
  const [allusers, setAllusers] = useState("");
  const [attractedUsers,setAttracted]=useState("");

  
  React.useEffect(()=>{
    if(user){
      localStorage.setItem('user', JSON.stringify(user));
    }
   
  }, [user]);
  React.useEffect(()=>{
    const data = localStorage.getItem('user');
    if(data){
      setUser(JSON.parse(data));
    }
    
  }, []);
  var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`
  useEffect( handleData, [user]);
  function handleData(){
    if(user)
    axios.get(`${redirectUri}${user['id']}`)
      .then(response => {
       settmongouser(response.data[0]);
       setUser(response.data[0]);
      })
      .catch(function (error) {
        console.log(error);
      });

  axios.get(`${redirectUri}`)
      .then(response => {
       setAllusers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };
useEffect(attractedTo, [mongouser, allusers]);
  function attractedTo(){
      if(allusers!="" && mongouser){
        setAttracted(allusers.filter(item => item.gender == mongouser.type && item.id!=mongouser.id));
      }
    };

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
      <InfoContext.Provider value={{replies, mongouser, allusers, attractedUsers, setReplies, artists, setArtists, messages, setMessages, songs, setSongs,posts, setPosts, likes, setLikes, user, setUser, visible, setVisible, accesstoken, setAccesToken, refreshtoken, setRefreshToken}}>
        {/* NEARIFY ROUTES */}
        <Route exact path="/signup/:id/:access_token" render={()=> <Signup />} />
        <Route exact path="/" render={()=><Login />} />
        <Route exact path="/settings" render={()=>withMenu(<SettingsPage />)} />
        
        <Route exact path="/home/:id/:access_token/:refresh_token"  render = {()=> withMenu(<Homepage ></Homepage>)} />
        {/* <Route exact path="/home/:id/:access_token/:refresh_token"  render = {()=> withMenu(<div >Hello</div>)} /> */}

        <Route exact path="/artist/:artistid"  render = {()=> withMenu(<ArtistPage ></ArtistPage>)} />
        <Route exact path="/track/:trackid"  render = {()=> withMenu(<TrackPage ></TrackPage>)} />
        <Route exact path="/tracks"  render = {()=> withMenu(<FavoriteSongs />) } />
        <Route exact path="/artists"  render = {()=> withMenu(<FavoriteArtists />) } />

        {/* <Route exact path="/artist/:artistid/:bool"  render = {()=> <ArtistPage ></ArtistPage>} /> */}

        <Route exact path="/map" render={()=><MapLeaflet />} />



        {/* DATING ROUTES */}
        <Route exact path="/dating/home/:id/:access_token/:refresh_token" render={()=><DatingHomePageFeed />} />
        <Route exact path="/dating" render={()=><DatingLogin />} />


      </InfoContext.Provider>
    </BrowserRouter>
  );
}

export default App;

//test for push 2