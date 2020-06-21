import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
const mongoose = require('mongoose');
const s = new Spotify();

const ReturnReply = React.memo(({reply})=>{
        const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);

        if(reply){
          const[replier, setreplier]=useState("");
          var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`
          var replierid=reply['posterid'];
           axios.get(`${redirectUri}${replierid}`)
           .then(response => {
            setreplier(response.data[0]);
           })
           .catch(function (error) {
             console.log(error);
           });
          
          return (
         <div>
           <Segment attached>
               <Grid centered columns = {2}>
  
                   <Grid.Column width={5}>
                  
            <Image circular src={replier.image} size='tiny' ></Image>
            </Grid.Column>
            <Grid.Column width={10}>
            <Header as='h4'>
           {reply['content']}
          </Header>
             
               </Grid.Column>
            </Grid>
                 
  
            </Segment>
             <Segment raised attached style={{marginTop:"-15px"}}>
             <Button color='red'>
                <Icon name='heart' />
                  Like
              </Button>
              
  
              <Label as='a' basic color='red' pointing='left'>
                {likes[reply['likes']] != 0 ? Object.values(likes[reply['likes']]).length:0}
              </Label>
              </Segment>
              </div>
  
          
          );
        }
       
        
         else{
         
          console.log("Loading")
           return <div>loading</div>
         }
        
       });

export default ReturnReply;