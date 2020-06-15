import axios from 'axios'
import {Map, Marker,Popup, TileLayer} from 'react-leaflet';
import React, {useState, useEffect} from 'react';
import {Container} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import Spotify from 'spotify-web-api-js';
import FavoriteArtists from './favartists'
import PageHeader from './pageheader'
const mongoose = require('mongoose');
const s = new Spotify();

const Homepage = () =>{
  var {id, access_token, refresh_token } = useParams();
  console.log(access_token);
  s.setAccessToken(access_token);
  // s.setRefreshToken(refresh_token);
  const[nowPlaying, setNowPlaying]=useState({name: "not checked",image:""});
  const [artists,setArtists]=useState(['None']);
  const [mongouser, settmongouser]=useState("");
  const [allusers, setAllusers] = useState("");
  const [attractedUsers,setAttracted]=useState("");
  function getNowPlaying(){
    s.setAccessToken(access_token);
    s.getMyCurrentPlaybackState()
      .then((response)=>{
        // console.log(response)
        setNowPlaying({
          name: response.item.name,
          image: response.item.album.images[0].url
        })
      }
      ).catch(err=>console.log(err))
  }
  function getTopArtists(){
    s.setAccessToken(access_token)
    s.getMyTopArtists()
    .then((response)=>{
      console.log(response);
      setArtists(response.items)

    }).catch(err=>console.log(err))
  }

  var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`

useEffect( handleData, []);
  function handleData(){
    axios.get(`${redirectUri}${id}`)
      .then(response => {
       settmongouser(response.data[0]);
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
      if(allusers!=""){
        setAttracted(allusers.filter(item => item.gender == mongouser.type && item.id!=mongouser.id));
      }
    };
useEffect(rankAttractedTo, [attractedTo]);
function rankAttractedTo(){
  function comparedistance(a,b){
    let lat1=mongouser.location[0];
    let lon1=mongouser.location[1];
    let distance1=distance(lat1,lon1,a);
    let distance2=distance(lat1,lon1,b);
    return distance2-distance1;
  }
  function distance(lat1, lon1,user2) {
    let lat2 = user2.location[0];
    let lon2=user2.location[1];
    if ((lat1 == lat2) && (lon1 == lon2)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * lat1/180;
      var radlat2 = Math.PI * lat2/180;
      var theta = lon1-lon2;
      var radtheta = Math.PI * theta/180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180/Math.PI;
      dist = dist * 60 * 1.1515;
      return dist;
    }
   
  }
  console.log(attractedUsers);
  var copyUsers = attractedUsers;
  if(attractedUsers){
    copyUsers.sort(comparedistance);
    setAttracted(copyUsers);
  }
  
}

  function CheckLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
    })
  }
 return (
    <div className="App">
      <PageHeader access_token={access_token} id={id}/>
      <Container>
      {mongouser['favoriteartists'] ? <FavoriteArtists artists={mongouser['favoriteartists']} accesstoken={access_token}  /> : "" }
      </Container>
    </div>
  );
}

export default Homepage;


 {/* <div> Now Playing {nowPlaying.name}
      </div> */}
      {/* <div>
        <img src={nowPlaying.image} width="250" >
        </img>
      </div>
      <div>{artists.map(obj=>obj['name'])}
      </div> */}
      {/* <button onClick={()=>getNowPlaying()}>
        Check Now Playing
      </button>
      <button onClick={()=>getTopArtists()}>
        Check Top Artists
      </button> */}
       {/* <div id="map"></div> */}
     {/* <button onClick = {()=>CheckLocation()}>
        geolocation test
      </button> */}