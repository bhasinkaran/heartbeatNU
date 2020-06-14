import axios from 'axios'
import {Map, Marker,Popup, TileLayer} from 'react-leaflet';
import React, {useState} from 'react';
import {Router , useParams} from  'react-router-dom';
import Spotify from 'spotify-web-api-js';
const mongoose = require('mongoose');
const s = new Spotify();

const Homepage = () =>{
  var {id, acces_token } = useParams();
    s.setAccessToken(acces_token)
  const[nowPlaying, setNowPlaying]=useState({name: "not checked",image:""});
  const [artists,setArtists]=useState(['None']);
  const [mongouser, settmongouser]=useState("");
  const [allusers, setAllusers] = useState("");
  function getNowPlaying(){
    s.getMyCurrentPlaybackState()
      .then((response)=>{
        // console.log(response)
        setNowPlaying({
          name: response.item.name,
          image: response.item.album.images[0].url
        })
      }
      )
  }
  function getTopArtists(){
    s.getMyTopArtists()
    .then((response)=>{
      console.log(response)
      
      setArtists(response.items)

    })
  }

  var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`


  axios.get(`${redirectUri}${id}`)
      .then(response => {
       settmongouser(response);
       console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

  axios.get(`${redirectUri}`)
      .then(response => {
       setAllusers(response);
       console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    


  function CheckLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
    })
  }
  
 return (
    <div className="App">
     <div id="map"></div>
     <button onClick = {()=>CheckLocation()}>
        geolocation test
      </button>
      <div>
      <div> Now Playing {nowPlaying.name}
      </div>
      <div>
        <img src={nowPlaying.image} width="250" >
        </img>
      </div>
      <div>{artists.map(obj=>obj['name'])}
      </div>
      <button onClick={()=>getNowPlaying()}>
        Check Now Playing
      </button>
      <button onClick={()=>getTopArtists()}>
        Check Top Artists
      </button>
      </div>
    </div>
  );
}

export default Homepage;
