import axios from 'axios'

import React, {useState} from 'react';
import {Router , useParams} from  'react-router-dom'

import Spotify from 'spotify-web-api-js';
const s = new Spotify();

const Homepage = () =>{
 var redirectableLogin= process.env.NODE_ENV === 'production' ? `https://pure-harbor-26317.herokuapp.com/login` : `http://localhost:8888/login`;
  
 return (
    <div >

     <a href= {redirectableLogin } onClick = {() => setLoggedIn(true)}>

      <button>Log in with spotify</button> 
      </a>
     
      
      </div>
      
  );
}

export default Homepage;
