
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label} from 'semantic-ui-react'
import {Router , useParams, Redirect} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnPost from './Post'
const mongoose = require('mongoose');
const s = new Spotify();

const HomePagePosts = () =>{
     const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
     if(user){
       localStorage.setItem('user', JSON.stringify(user));
     }
     
     
    //  const [name, setName] = useState("");
    //  const [image, setImage]=useState("");
    //  const [postsShown, setPostsShown] = useState("");
//      const [image2, setImage2]=useState("");
//      const [image3, setImage3]=useState("");
//      const [valuee, setValuee]=useState("");
   

     useEffect(initializeState, []);
     function getArtistsPosts( artistid){
      if(artists &&artists[artistid] &&artists[artistid]['posts']!="None"){
       var values= Object.values(artists[artistid]['posts']);
       if(values.length>=3){
         return values.slice(-3);
       }
       else if(values.length>1){
         return values.slice(-2);
       }
       return values.slice(-1);
       
      }
      else{
        return [];
      }

    }
     function initializeState(){
       for(let i=0; user.favoriteartists;i++){
         var arrayRecentArtists = getArtistsPosts(user.favoriteartists[i]);
         console.log(arrayRecentArtists);
       }


    //  s.getArtist(artistid).then(
    //             res => {
    //                        setName(res.name);
    //                        if(res.images[0].url){
    //                           console.log(res.images[0].url);

    //                             setImage(res.images[0].url);
    //                        }
    //                        else{
    //                         setImage("https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80");
    //                       }
    //                        if(res.images[1].url){
    //                          console.log(res.images[1].url);
    //                         setImage2(res.images[1].url);
    //                       }
    //                       if(res.images[2].url){
    //                         console.log(res.images[2].url);

    //                         setImage3(res.images[2].url);
    //                       }
    //             }).catch(err=>console.log(err));
     }
     
    //  function handleSubmit(){
    //   console.log(document.getElementById("textarea").value);
    //   const likesref=dbLikes.push(0);
    //     const likeskey=likesref.getKey();
    //     console.log("Likes key is ", likeskey);
    //     const repliesref=dbReplies.push(0);
    //     const replieskey=repliesref.getKey();
    //     console.log("Likes key is ", likeskey);
    //     console.log("replies key is ", replieskey);

    //   const ref = dbPosts.push({
    //     'content':document.getElementById("textarea").value,
    //     'posterid': user.id,
    //     'likes': likeskey,
    //     'replies': replieskey,
    //     "createdAt": {'.sv': 'timestamp'}
        
    //   });
    //   var key=ref.key;
    //   // if(artists[artistid]['posts']=="None"){
    //     console.log("here")
    //     dbArtists.child(artistid).child('posts').push(key);
    //   // }
    //  }
     if(user|| JSON.parse(localStorage.getItem('user'))){
// 
     console.log(user);
     console.log(JSON.parse(localStorage.getItem('user')));
     return(
  
    <div className="HomepageFeed">
      {/* <Container>
      <Header as='h1' content={"Homepagefeed"} textAlign='center' dividing />
     
      </Container> */}
    </div> 
   
        )
      }
      else{
        return(<Redirect to="/" push={true} />);
      }
}

export default HomePagePosts;