import axios from 'axios'
import {Map, Marker,Popup, TileLayer} from 'react-leaflet';
import L from 'leaflet';
import React, {useState} from 'react';
import {Router , useParams} from  'react-router-dom'
import './homepage.css'
import Spotify from 'spotify-web-api-js';
import leafGreen from '../assets/leaf-green.png';
import leafRed from '../assets/leaf-red.png';
import leafOrange from '../assets/leaf-orange.png';
import leafShadow from '../assets/leaf-shadow.png';
const s = new Spotify();

const Homepage = () =>{
  var {id, hash } = useParams();
    s.setAccessToken(hash)
  const[nowPlaying, setNowPlaying]=useState({name: "not checked",image:""})
  const [artists,setArtists]=useState(['None'])
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
  axios.get(`http://localhost:8888/users/${id}`)
      .then(response => {
       console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
  function CheckLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
    })
  }
  var icons = {
    greenIcon: {
      lat: 35.787449,
      lng: -78.6438197,
    },
    redIcon: {
      lat: 35.774416,
      lng: -78.633271,
    },
    orangeIcon: {
      lat: 35.772790,
      lng: -78.652305,
    },
    zoom: 13
  }

  var myIcon = L.icon({
    iconUrl: leafGreen,
    shadowUrl: leafShadow,
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -86]
  })
 return (
    <div className="App">
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
