import axios from 'axios'
import firebase from 'firebase/app';
import 'firebase/database';
import React, {useState, useContext, useEffect} from 'react';
import {Router, Redirect } from  'react-router-dom'
import logo from './logo.svg';
import './App.css';
import Spotify from 'spotify-web-api-js';
import Homepage from './components/homepage';
import Login from './components/login'
import {Segment, Sidebar} from 'semantic-ui-react'
import SideBar from './components/Sidebar'
import MapLeaflet from './components/MapLeaflet'
import {BrowserRouter, Route} from 'react-router-dom'
import Signup from './dating_components/signup';
import ArtistPage from './components/artisthomepage'
import TrackPage from './components/trackhomepage'
import PageHeader from './components/pageheader'
import {dbMessages, dbChats, dbPosts, dbSongs, dbUsers, dbArtists, dbReplies, dbLikes} from './firebase/firebase';
import SettingsPage from './components/settingspage';
import FavoriteArtists from './components/favartists'
import FavoriteSongs from './components/favsongs';
import DatingHomePageFeed from './dating_components/DatingHomepage';
import DatingLogin from './dating_components/DatingLogin'
import PageHeaderDating from './dating_components/pageheaderdating';
import NoMatchModal from './dating_components/EdgeCaseModals/NoMatchModal';
import NoMessagesModal from './dating_components/EdgeCaseModals/NoMessageModal';
import ChatsHomepage from './dating_components/ChatsHomepage';

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
  function withMenuDating(page){
    return(
      <div>
        <PageHeaderDating accesstoken={accesstoken} id={user.id}/>
        <NoMatchModal />
        <NoMessagesModal />
        {/* <Sidebar.Pushable as={Segment}>
        <SideBar />
        <Sidebar.Pusher> */}
          {page}
        {/* </Sidebar.Pusher>
      </Sidebar.Pushable> */}

      </div>
    )
  }
  
  const [chats, setChats]=useState("")
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
  const [allusers, setAllusers] = useState("");
  const [attractedUsers,setAttracted]=useState("");
  const [orderedAttracted,setOrderedAttracted]=useState("");
  const [users, setUsers]=useState("");
  const [nomatchmodal, setNoMatchModal]=useState(false);
  const [nomessagemodal, setNoMessagesModal]=useState(false);

  // useEffect(()=>console.log(nomatchmodal), [nomatchmodal]);
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
  axios.get(`${redirectUri}`)
      .then(response => {
       setAllusers(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    };
// useEffect(attractedTo, [user, allusers]);
//   function attractedTo(){
//       if(allusers!="" && user){
//         // console.log(allusers);
//         // console.log(user);
//         setAttracted(allusers.filter(item => item.gender == user.type && item.id!=user.id));
//       }
//     };
    useEffect(() => {
      const handleData = snap => {
        if (snap.val()) setUsers(snap.val());
      }
      dbUsers.on('value', handleData, error => alert(error));
      return () => { dbUsers.off('value', handleData); };
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
      if (snap.val()) setChats(snap.val());
    }
    dbChats.on('value', handleData, error => alert(error));
    return () => { dbChats.off('value', handleData); };
  }, []);
  useEffect(() => {
    const handleData = snap => {
      if (snap.val()) setReplies(snap.val());
    }
    dbReplies.on('value', handleData, error => alert(error));
    return () => { dbReplies.off('value', handleData); };
  }, []);
  useEffect(() => {
    const handleData = snap => 
    {
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
  useEffect(rankAttractedTo, [user, users,allusers]);
        function rankAttractedTo(){
          function comparedistance(a,b){
            let lat1=user.location[0];
            let lon1=user.location[1];
            let score1=matchMusic(a,user);
            let score2=matchMusic(b,user);
            // let distance1=distance(lat1,lon1,a);
            // let distance2=distance(lat1,lon1,b);

            // distance2/
            // distance1/
            // find a way to use distance eventually once off campus etc.
            return Math.min(score2,1)-Math.min(score1,1);
          }
          
          function matchMusic(a,b){
            let score=0;
            let arr1=a['favoritesongs'];
            let arr2=b['favoritesongs'];
            let arr3=a['favoriteartists'];
            let arr4=b['favoriteartists'];
            let intersection1=arr1.filter(x=>arr2.includes(x));
            let intersection2=arr3.filter(x=>arr4.includes(x));
            return intersection1.length+intersection2.length;
          }
          // console.log(attractedUsers);
          var copyUsers = allusers;
          if(allusers&&users&&user&&users[user.id]){
            // console.log(allusers);
            // console.log(user);

            console.log(copyUsers.filter(partner=>((!Object.values(users[user.id]['seen']).includes(partner.id))) && ((partner.id!=user.id))));
            var toset=copyUsers.filter(partner=>((!Object.values(users[user.id]['seen']).includes(partner.id))) && ((partner.id!=user.id))).sort(comparedistance);
            console.log(toset);
            setOrderedAttracted(toset);
          }
        }
 
  return(
    <BrowserRouter>
      <InfoContext.Provider value={{nomatchmodal, setNoMatchModal,nomessagemodal, setNoMessagesModal, replies, users, allusers, attractedUsers,orderedAttracted, setReplies, artists, setArtists, messages, setMessages, songs, setSongs,posts, setPosts, likes, setLikes, user, setUser, chats,visible, setVisible, accesstoken, setAccesToken, refreshtoken, setRefreshToken}}>
        {/* NEARIFY ROUTES */}
        <Route exact path="/signup/:id/:access_token/:refresh_token" render={()=> <Signup />} />
        {/* <Route exact path="/" render={()=><Login />} /> */}
        <Route exact path="/" render={()=><Redirect to='/dating' />} />

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
        <Route exact path="/dating/home/:id/:access_token/:refresh_token" render={()=>withMenuDating(<DatingHomePageFeed />)} />
        <Route exact path="/dating" render={()=><DatingLogin />} />
        <Route exact path="/dating/messages" render={()=><ChatsHomepage />} />


      </InfoContext.Provider>
    </BrowserRouter>
  );
}

export default App;

//test for push 2

// function distance(lat1, lon1,user2) {
//   let lat2 = user2.location[0];
//   let lon2=user2.location[1];
//   if ((lat1 == lat2) && (lon1 == lon2)) {
//     return 0;
//   }
//   else {
//     var radlat1 = Math.PI * lat1/180;
//     var radlat2 = Math.PI * lat2/180;
//     var theta = lon1-lon2;
//     var radtheta = Math.PI * theta/180;
//     var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//     if (dist > 1) {
//       dist = 1;
//     }
//     dist = Math.acos(dist);
//     dist = dist * 180/Math.PI;
//     dist = dist * 60 * 1.1515;
//     return dist;
//   }
 
// }