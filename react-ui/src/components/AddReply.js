
import React, {useState, useEffect, isValidElement, useContext, useRef} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label, Loader} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnReply from './Reply'

const  AddReply =({item , id})=> {
        const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
        const [value,setValue]=useState("");
        const refKey = useRef();
                function eventhandler(e) {
                  console.log(e);
                if (e.key === 'Enter') {
                 handleSubmitReply();
                 console.log("Works");
               }
               console.log("Works outside");
            }

        function handleSubmitReply(){
                console.log(document.getElementById("textareareply").value);
                const likesref=dbLikes.push(0);
                const likeskey=likesref.getKey();
                console.log("Likes key is ", likeskey);
               
                const ref = dbReplies.child(item['replies']).push({
                  'content':value,
                  'posterid': user.id,
                  'likes': likeskey,
                  "createdAt": {'.sv': 'timestamp'}
                });
                if(!user.postsfollowing.includes(id)){  
                var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/addpost/` : `http://localhost:8888/users/addpost/`
                axios.post(`${redirectUri}${user.id}/${id}`)
                .then(response => {
                     console.log("updated!", response);
                })
                .catch(function (error) {
                     console.log(error);
                  });
                var temp= user;
                console.log(temp);
                // var array = temp.postsfollowing;
                // array.add(id);
                temp.postsfollowing.push(id);
                console.log(temp);
                setUser(temp);
                // user.postsfollowing.push(id);
                // setUser()
                }
                 

      setValue("")
            
              }
        // useEffect(() => {
        //   refKey.current.addEventListener("keyup", eventhandler);
        //   return () => {
        //         refKey.current.removeEventListener("keyup", eventhandler);
        //   };
        // }, []);
      
        return(
                    
        <div>
                <TextArea onKeyUp={(e) => eventhandler(e)} ref={refKey} id="textareareply" value={value} onChange={(e)=>{
                  setValue(e.target.value);
                  console.log(e.target.value);
                }} rows={1} placeholder='Reply to post' /> 
                {/* <Form.Button fluid positive onClick = {()=>handleSubmitReply()} style={{marginTop:"10px"}}>Reply</Form.Button>  */}
       </div>
)}

export default AddReply;