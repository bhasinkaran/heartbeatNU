
import React, {useState, useEffect, isValidElement, useContext, useRef} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label, Loader} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnReply from './Reply'

const  AddReply =({item })=> {
        const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);

        function eventhandler(e) {
                if (e.code === 'Enter') {
                 handleSubmitReply();
                  console.log("Go");
               }
             console.log("Works");
            }

        function handleSubmitReply(){
                console.log(document.getElementById("textareareply").value);
                const likesref=dbLikes.push(0);
                const likeskey=likesref.getKey();
                console.log("Likes key is ", likeskey);
               
            
                const ref = dbReplies.child(item['replies']).push({
                  'content':document.getElementById("textareareply").value,
                  'posterid': user.id,
                  'likes': likeskey,
                  "createdAt": {'.sv': 'timestamp'}
                });
            
              }
        useEffect(() => {
          
      
          window.addEventListener("keyup", eventhandler);
          return () => {
            window.removeEventListener("keyup", eventhandler);
          };
        }, []);
      
        return(
                    
        <div>
                <TextArea id="textareareply" rows={1} placeholder='Reply to post' /> 
                <Form.Button fluid positive onClick = {()=>handleSubmitReply()} style={{marginTop:"10px"}}>Reply</Form.Button> 
       </div>
)}

export default AddReply;