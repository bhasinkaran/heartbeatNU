import axios from 'axios'
import {Redirect} from 'react-router-dom'
import _ from 'lodash'
import React, {useState, useEffect, useContext} from 'react';
import {Container, Search, Grid} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import Spotify from 'spotify-web-api-js';
import FavoriteArtists from './favartists'
import FavoriteSongs from './favsongs'
import HomePagePosts from './HomePagePosts'

import PageHeader from './pageheader'
import {InfoContext} from '../App'

const mongoose = require('mongoose');
const s = new Spotify();

const HomePageFeed = () =>{
  
  var {id, access_token, refresh_token } = useParams();
  const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken} = React.useContext(InfoContext);
  
  
  setAccesToken(access_token); // double check on the logic behind this. 
  setRefreshToken(refresh_token);
  s.setAccessToken(access_token);
  // s.setRefreshToken(refresh_token);
  const[nowPlaying, setNowPlaying]=useState({name: "not checked",image:""});
  const [value, setValue]=useState("");
  const [results, setResults]=useState([]);
  const [isLoading, setisLoading]=useState(false);
  const [result, setResult]=useState("");
  const [redirectArtist, setRedirectArtist]=useState(false);
  const [redirectTrack, setRedirectTrack]=useState(false);
  const [timeout, setTime]=useState(false);
  const [newTrack, setNewTrack]=useState(false);
  const [newArtist, setNewArtist]=useState(false);

  // const [newArtist]
  setTimeout(() => {
    setTime(true);
  }, 3000);

  var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`

        useEffect(handleData, []);
        function handleData() {
                axios.get(`${redirectUri}${id}`)
                        .then(response => {
                                setUser(response.data[0]);
                        })
                        .catch(function (error) {
                                console.log(error);
                        });
        };


 return (
    <div className="App">
      <Grid padded >
      <Grid.Row stretched>  
        <Grid.Column width = {3}>
        {user['favoritesongs'] ? <FavoriteSongs songs={user['favoritesongs']} accesstoken={access_token} refreshtoken={refresh_token}/> : "" }

        </Grid.Column>
    
        <Grid.Column width = {10}>
         {user ? <HomePagePosts /> : ""}
        </Grid.Column>
        
       
        <Grid.Column width = {3}> 
      {user['favoriteartists'] ? <FavoriteArtists artists={user['favoriteartists']} accesstoken={access_token} refreshtoken={refresh_token}/> : "" }
      </Grid.Column>
      </Grid.Row>
       </Grid>
       
      {redirectArtist ? <Redirect to={`/artist/${result.id}`} push={true} /> : ""}
      {redirectTrack ? <Redirect to={`/track/${result.id}`} push={true} /> : ""}

      {/* {!user   && timeout?  <Redirect to="/" push={true} /> : ""} */}
     
      

    </div>
  );
}

export default HomePageFeed;
