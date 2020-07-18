import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Search, Grid } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import OverLapArtists from './PreviewComponents/OverLapArtists'
import OverLapSongs from './PreviewComponents/OverLapSongs'
// import HomePagePosts from '../components/HomePagePosts'
import MatchedPeople from './matchedpeople'
import ReturnPreview from './PreviewComponents/ReturnPreview'
import { Button } from 'semantic-ui-react'
import { InfoContext } from '../App'

const mongoose = require('mongoose');
const s = new Spotify();

const DatingHomePageFeed = () => {

  var { id, access_token, refresh_token } = useParams();
  const { replies, setReplies, artists, setArtists, messages, setMessages, orderedAttracted, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken } = React.useContext(InfoContext);

  var redirectUri = process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`
  const [index, setIndex] = useState(0);
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

  setAccesToken(access_token); // double check on the logic behind this. 
  setRefreshToken(refresh_token);
  s.setAccessToken(access_token);
  // s.setRefreshToken(refresh_token);

  const [isLoading, setisLoading] = useState(false);
  const [result, setResult] = useState("");
  const [redirectArtist, setRedirectArtist] = useState(false);
  const [redirectTrack, setRedirectTrack] = useState(false);
  const [timeout, setTime] = useState(false);

  // const [newArtist]
  setTimeout(() => {
    setTime(true);
  }, 3000);


  return (
    <div className="App">
      <Grid padded >
        <Grid.Row stretched>
          <Grid.Column width={3}>
            {user['favoritesongs'] &&  orderedAttracted&&orderedAttracted.length > index? <OverLapSongs person={orderedAttracted[index]} /> : ""}

          </Grid.Column>


          <Grid.Column width={10}>
            {user && user['location'] && user['location'].length > 0 && orderedAttracted&&orderedAttracted.length > index ? <ReturnPreview person={orderedAttracted[index]} /> :
              user && user['location'] && user['location'].length > 0 ? "No matches yet."
                :
                <Button as={Link} to={`/signup/${user['id']}/${accesstoken}/${refreshtoken}`} > Complete your dating profile signup process! </Button>}
          </Grid.Column>


          <Grid.Column width={3}>
            {user['favoriteartists'] &&  orderedAttracted&&orderedAttracted.length > index ? <OverLapArtists  person={orderedAttracted[index]} /> : ""}
          </Grid.Column>
        </Grid.Row>
      </Grid>

      {redirectArtist ? <Redirect to={`/artist/${result.id}`} push={true} /> : ""}
      {redirectTrack ? <Redirect to={`/track/${result.id}`} push={true} /> : ""}


    </div>
  );
}

export default DatingHomePageFeed;

