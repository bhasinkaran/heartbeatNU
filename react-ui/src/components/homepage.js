import axios from 'axios'

import React, {useState} from 'react';
import {Router , useParams} from  'react-router-dom'

import Spotify from 'spotify-web-api-js';
const s = new Spotify();

const Homepage = () =>{
  var {hash } = useParams();
  function getHashParams() {
    var x=4
    var hashParams = {};
    var e, r = /([^&;=]+)=?([^&;]*)/g,
        q = hash.substring(1);
    while ( e = r.exec(q)) {
       hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    return hashParams;
  }
  var hashParams=getHashParams();
  var temp=false;
  if( hash!="login" )
  {
    temp=true;
    s.setAccessToken(hash)
  }


  const [loggedIn, setLoggedIn]=useState(temp)
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

  function CheckLocation(){
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log(position);
    })
  }
 var redirectableLogin= process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/login` : `http://localhost:8888/login`;
  
 return (
    <div className="App">
     
    {!loggedIn ? 
  <div>
     <a href= {redirectableLogin } onClick = {() => setLoggedIn(true)}>

      <button>Log in with spotify</button> 
      </a>
      <button onClick = {()=>CheckLocation()}>
        geolocation test
      </button>
      
      </div>
      :
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
    }
    </div>
  );
}

export default Homepage;
