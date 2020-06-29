
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label} from 'semantic-ui-react'
import {Router , useParams, Redirect} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnPost from './Post'
import ReturnHomepagePost from './ReturnHomepagePost'
const mongoose = require('mongoose');
const s = new Spotify();

const HomePagePosts = () =>{
     const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
    //  const [timeout, setTime]=useState(false);
     const [returnPosts, setReturnPosts]=useState([]);
     const [orderedTime, setOrderedTime]=useState(false);
     const arrayColors = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey','black'];
     const number = Math.floor((Math.random() * 12) );
     useEffect(initializeState, [artists, songs, posts]);
     function initializeState(){
      // console.log(user);
      // console.log(user['favoriteartists']);
      // console.log(user);
      // console.log(user.favoriteartists);
      // console.log(user['favoriteartists']);

      var temp=[];
     for(let i=0; i<user.favoriteartists.length;i++){
      //  console.log("Outside of IF");
      //  console.log("This is i ", i);  
      //  console.log(user['favoriteartists'][i]);
       if(artists && artists[user['favoriteartists'][i]]){
        console.log(artists[user['favoriteartists'][i]]['name']);

       }
       console.log(artists);

      if(artists &&artists[user['favoriteartists'][i]] &&artists[user.favoriteartists[i]]['posts']!="None"){
        var values= Object.values(artists[user['favoriteartists'][i]]['posts']);
        // console.log("Inside of IF");
        // console.log("This is i ", i);  
        // console.log(user['favoriteartists'][i]);
        // console.log(values);

        if(values.length>=3){
          // console.log("Here");
          values.slice(-3).map(id=>temp.push(id));
        }

        else if(values.length>1){
          console.log("Here2");
          values.slice(-2).map(id=>temp.push(id));;
        }

        else if(values.length==1){
          // console.log("Here3");
          values.slice(-1).map(id=>temp.push(id));;
        }
 
       }
      }
      for(let i=0; i<user.favoritesongs.length;i++){
        // console.log("Outside of IF");
       if(songs &&songs[user['favoritesongs'][i]] &&songs[user.favoritesongs[i]]['posts']!="None"){
         var values= Object.values(songs[user['favoritesongs'][i]]['posts']);
        //  console.log("Inside of IF");
        //  console.log("This is i ", i);  
        //  console.log(user['favoriteartists'][i]);
        //  console.log(values);

         if(values.length>=3){
          //  console.log("Here");
           values.slice(-3).map(id=>temp.push(id));
         }

         else if(values.length>1){
          //  console.log("Here2");
           values.slice(-2).map(id=>temp.push(id));;
         }

         else if(values.length==1){
          //  console.log("Here3");
           values.slice(-1).map(id=>temp.push(id));;
         }
        }
       }
       if(posts){
         temp.sort((a,b)=>posts[b]['createdAt']-posts[a]['createdAt']);
         setReturnPosts(temp);
         setOrderedTime(true);
       }
       setReturnPosts(temp);
      // console.log("Ran initialize State");
      

    }
    
     if(user){
       localStorage.setItem('user', JSON.stringify(user));
     }
     else{
       setUser(JSON.parse(localStorage.getItem('user')));
     }
     
    
     if(user && artists && songs && returnPosts.length>0){
//  
    //  console.log(user);
    //  console.log(JSON.parse(localStorage.getItem('user')));
    
    // initializeState();
     
     return(
  
    <div className="HomepageFeed">
      <Container>
      <Header as='h1' content={"What's been up with your favorite music?"} textAlign='center' dividing />
      {/* {returnPosts.length > 0 ? returnPosts.map(id=> <ReturnHomePagePost postid={id} />) : "No posts as yet"} */}
     {returnPosts && posts && orderedTime? returnPosts.map(id => 
      <Segment color={arrayColors[number]} raised style={{marginTop: "40px"}}>
        <ReturnHomepagePost item={posts[id]} id={id} includeHeader={true} />
      </Segment>
      ) 
      : " "}
      <Header as="h1" > To start using the website, go to an artist's or song's page and then leave a post, reply or like! We hope this can be a place to talk about music!! If you like the idea, share this so we can build a community. </Header>
      
     {/* <ReturnHomepagePost item={posts['-MAUybwcC0MyDfwFhnqg']} id={'-MAUybwcC0MyDfwFhnqg'} /> */}
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

  