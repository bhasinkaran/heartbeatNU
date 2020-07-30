
import React, {useState, useEffect, isValidElement, useContext, useRef} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label, Loader} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbUsers, dbChats, dbMessages} from '../../firebase/firebase'
import {InfoContext} from '../../App'
import DateToTime from '../../DateToTime'

const  WriteMessage =({chatid})=> {
        const {chats,user} = React.useContext(InfoContext);
        const [value,setValue]=useState("");
        const refKey = useRef();
                function eventhandler(e) {
                  // console.log(e);
                if (e.key === 'Enter') {
                 handleSubmitMessage();
                 
               }
              //  console.log("Works outside");
            }

        function handleSubmitMessage(){
                // console.log(document.getElementById("textareareply").value);
                const messageref=dbMessages.push({
                        'content':value,
                        'senderid': user.id,
                        'chatid':chatid,
                        "createdAt": {'.sv': 'timestamp'}
                      });
                const messageKey=messageref.getKey();
                // console.log("Likes key is ", likeskey);
               
                dbChats.child(chatid).child('chats').push(messageKey);
                setValue("")
                }
                 

       
            
              
        
      
        return(
                    
        <div fluid>
                <TextArea fluid onKeyUp={(e) => eventhandler(e)} ref={refKey} id="textareareply" value={value} onChange={(e)=>{
                  setValue(e.target.value);
                  // console.log(e.target.value);
                }} rows={2} placeholder='Write a message...' /> 
                {/* <Form.Button fluid positive onClick = {()=>handleSubmitReply()} style={{marginTop:"10px"}}>Reply</Form.Button>  */}
       </div>
)}

export default WriteMessage;