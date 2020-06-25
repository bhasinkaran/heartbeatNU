
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

const HomePagePosts = ({userLoaded}) =>{
     const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
     const [timeout, setTime]=useState(false);
     const [returnPosts, setReturnPosts]=useState([]);
     setTimeout(() => {
      setTime(true);
    }, 3000);
     if(user){
       localStorage.setItem('user', JSON.stringify(user));
     }
     else{
       setUser(JSON.parse(localStorage.getItem('user')));
     }
     
    
     if(userLoaded){
//  
     console.log(userLoaded);
     console.log(JSON.parse(localStorage.getItem('user')));
    //  useEffect(initializeState, []);
    initializeState();
     function initializeState(){
        // console.log(user);
        // console.log(user['favoriteartists']);
        console.log(userLoaded.favoriteartists);
        console.log(userLoaded['favoriteartists']);

       for(let i=0; i<userLoaded.favoriteartists.length;i++){
         var temp=[];
         console.log("Outside of IF");
        if(artists &&artists[userLoaded['favoriteartists'][i]] &&artists[userLoaded.favoriteartists[i]]['posts']!="None"){
          var values= Object.values(artists[userLoaded['favoriteartists'][i]]['posts']);
          console.log("Inside of IF");
          console.log("This is i ", i);  
          console.log(userLoaded['favoriteartists'][i]);
          console.log(values);

          if(values.length>=3){
            console.log("Here");
            temp.push(values.slice(-3));
            
          }
          else if(values.length>1){
            console.log("Here2");
            temp.push(values.slice(-2));
            

          }
          if(values.length==1){
            console.log("Here3");
            temp.push(values.slice(-1));
            
          }
          
          console.log("No posts to add for ", userLoaded.favoriteartists[i]);

          
         }
         else{
           return [];
         }
         
        }
        console.log("Ran initialize State");
        

      }
     return(
  
    <div className="HomepageFeed">
      <Container>
      <Header as='h1' content={"Homepagefeed"} textAlign='center' dividing />
     
      </Container>
    </div> 
   
        )
       }
      else{
        // if (timeout){
        //   return(<Redirect to="/" push={true} />);
        // }
        // else{
          return "Loading";
        // }
       
      }
}

export default HomePagePosts;

  