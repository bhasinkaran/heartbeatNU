import axios from 'axios'
import {Redirect} from 'react-router-dom'
import _ from 'lodash'
import React, {useState, useEffect, useContext} from 'react';
import {Container, Search, Grid} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import Spotify from 'spotify-web-api-js';
import FavoriteArtists from './favartists'
import FavoriteSongs from './favsongs'

import PageHeader from './pageheader'
import {InfoContext} from '../App'

const mongoose = require('mongoose');
const s = new Spotify();

const Homepage = () =>{
  
  var {id, access_token, refresh_token } = useParams();
  const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken} = React.useContext(InfoContext);
  
  
  setAccesToken(access_token); // double check on the logic behind this. 
  setRefreshToken(refresh_token);
  s.setAccessToken(access_token);
  // s.setRefreshToken(refresh_token);
  const[nowPlaying, setNowPlaying]=useState({name: "not checked",image:""});
  const [mongouser, settmongouser]=useState("");
  const [allusers, setAllusers] = useState("");
  const [attractedUsers,setAttracted]=useState("");
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
  
  useEffect(handleState, []);
  function handleState()
  {
    // setContext(context => ({ ...context, userid: id }));
    console.log("Did the job!")
  }
  var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`

useEffect( handleData, []);
  function handleData(){
    axios.get(`${redirectUri}${id}`)
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
      if(allusers!=""){
        setAttracted(allusers.filter(item => item.gender == mongouser.type && item.id!=mongouser.id));
      }
    };
// useEffect(rankAttractedTo, [attractedTo]);
// function rankAttractedTo(){
//   function comparedistance(a,b){
//     let lat1=mongouser.location[0];
//     let lon1=mongouser.location[1];
//     let distance1=distance(lat1,lon1,a);
//     let distance2=distance(lat1,lon1,b);
//     return distance2-distance1;
//   }
//   function distance(lat1, lon1,user2) {
//     let lat2 = user2.location[0];
//     let lon2=user2.location[1];
//     if ((lat1 == lat2) && (lon1 == lon2)) {
//       return 0;
//     }
//     else {
//       var radlat1 = Math.PI * lat1/180;
//       var radlat2 = Math.PI * lat2/180;
//       var theta = lon1-lon2;
//       var radtheta = Math.PI * theta/180;
//       var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
//       if (dist > 1) {
//         dist = 1;
//       }
//       dist = Math.acos(dist);
//       dist = dist * 180/Math.PI;
//       dist = dist * 60 * 1.1515;
//       return dist;
//     }
   
//   }
//   // console.log(attractedUsers);
//   var copyUsers = attractedUsers;
//   if(attractedUsers){
//     copyUsers.sort(comparedistance);
//     setAttracted(copyUsers);
//   }
  
// }

async function  handleSearchChange(valuee)  {
  setisLoading(true);
  setValue(valuee);
  console.log(valuee);
  const url='https://api.spotify.com/v1/search'+`?q=${encodeURIComponent(valuee)}`+"&type=artist"
  const res = await axios.get(url, {
          headers:{
                  "Accept": "application/json",
                  "Content-Type": "application/json",
                  'Authorization': 'Bearer ' + accesstoken 
          }
  });
  var temp=[];
  console.log(res);
  var max=res.data.artists.items.length;
  var realistic=10;
  if(max<realistic){
    realistic=max;
  }
  for(let i=0; i<realistic; i++){
          let item=res.data.artists.items[i];
          console.log(item);
          if(item.images[0]){
                  temp.push({title: item.name, image: item.images[0].url, description: item.genres[0], price: item.popularity, id: item.id, type: "artist"})

          }
          else{
                  //if no pictures just put a black picture
                  temp.push({title: item.name, image: "https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80", description: item.genres[0], price: item.popularity, id: item.id, type: "artist"})
          }
  }

  const urltrack='https://api.spotify.com/v1/search'+`?q=${encodeURIComponent(valuee)}`+"&type=track"

  const ressong = await axios.get(urltrack, {
    headers:{
            "Accept": "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + accesstoken 
    }
});
console.log("this is res SONG",ressong);
var max=ressong.data.tracks.items.length;
var realistic=10;
if(max<realistic){
  realistic=max;
}
for(let i=0; i<realistic; i++){
    let item=ressong.data.tracks.items[i];
    console.log(item);
    if(item.album.images[0]){
            temp.push({title: item.name, image: item.album.images[0].url, description: item.album.name, price: item.popularity, id: item.id, type: "track"})

    }
    else{
            //if no pictures just put a black picture
            // temp.push({title: item.name, image: ", description: item.genres[0], price: item.popularity, id: item.id})
            temp.push({title: item.name, image: "https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80", description: item.album.name, price: item.popularity, id: item.id, type: "track"})

          }
}
  temp.sort((a,b)=>{
   if( a.price > b.price ){
     return -1;
   }
   else{
     return 1;
   };
  })       
  console.log(temp);

  setResults(temp);
  // console.log(temp);
  setisLoading(false);
}
 return (
    <div className="App">
      <PageHeader access_token={access_token} id={id}/>
      {/* {userid} */}
      {/* <Container> */}
      <Container>
            <Search
            loading={isLoading}
            onResultSelect={(e, {result})=>{
                    setResult(result);
                    console.log(result);
                    // setRedirect(true);
                    if(result.type=="artist"){
                      setRedirectArtist(true);
                    }
                    else{
                      setRedirectTrack(true);
                    }
                    
            }}
            onSearchChange={_.debounce((e, {value})=>handleSearchChange(value), 500, {
              leading: true,
            })}
            results={results}
            value={value}
            fluid
            input={{ fluid: true }}
        //     {...this.props}
          />
            </Container>
            <Grid padded >
      <Grid.Row stretched>  


        <Grid.Column width = {3}>
        {mongouser['favoritesongs'] ? <FavoriteSongs songs={mongouser['favoritesongs']} accesstoken={access_token} refreshtoken={refresh_token}/> : "" }

        </Grid.Column>

        
        <Grid.Column width = {10}>
          FEED
        </Grid.Column>
        
       
        <Grid.Column width = {3}> 
      {mongouser['favoriteartists'] ? <FavoriteArtists artists={mongouser['favoriteartists']} accesstoken={access_token} refreshtoken={refresh_token}/> : "" }
      </Grid.Column>
      </Grid.Row>
       </Grid>
       
      {redirectArtist ? <Redirect to={`/artist/${result.id}`} push={true} /> : ""}
      {redirectTrack ? <Redirect to={`/track/${result.id}`} push={true} /> : ""}

      {/* {redirectsong ? <Redirect to={`/song/${result.id}`} push={true} /> : ""} */}

      {/* {!user   && timeout?  <Redirect to="/" push={true} /> : ""} */}
     
      

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

      // function getNowPlaying(){
      //   s.setAccessToken(access_token);
      //   s.getMyCurrentPlaybackState()
      //     .then((response)=>{
      //       // console.log(response)
      //       setNowPlaying({
      //         name: response.item.name,
      //         image: response.item.album.images[0].url
      //       })
      //     }
      //     ).catch(err=>console.log(err))
      // }
      // function getTopArtists(){
      //   s.setAccessToken(access_token)
      //   s.getMyTopArtists()
      //   .then((response)=>{
      //     console.log(response);
      //     // setArtists(response.items)
      
    
      //   }).catch(err=>console.log(err))
      // }