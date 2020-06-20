
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnReply from './Reply'

const ReturnPost = React.memo(({item}) =>{
        const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);

        const [poster, setPoster]=useState("");
       if(item ){
           var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`
           var time= DateToTime(item['createdAt'])
            const posterid=item['posterid'];
            axios.get(`${redirectUri}${posterid}`)
            .then(response => {
             setPoster(response.data[0]);
            })
            .catch(function (error) {
              console.log(error);
            });
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
   
            function updateLike(){
             console.log("Called outside if/else.");
             console.log(Object.values(likes[item['likes']]));
   
              if(likes[item['likes']]!=0 && Object.values(likes[item['likes']]).includes(user.id)){
                
               console.log("Called inside if");
               console.log(Object.values(likes[item['likes']]));
                for(let i=0; i<Object.values(likes[item['likes']]).length; i++){
   
                   if(Object.values(likes[item['likes']])[i]==user.id){
                     var index=Object.keys(likes[item['likes']])[i];
                     if(Object.values(likes[item['likes']]).length==1){
                       dbLikes.child(item['likes']).set(0);
                     }
                     else{
                       dbLikes.child(item['likes']).remove(index).then(console.log("Done")).catch(err=>console.log(err));
                     }
                     
                   }
                }
   
              }
              
              else{
               
               console.log("Called.")
   
               dbLikes.child(item['likes']).push(user.id).then(console.log("Done")).catch(err=>console.log(err));;
              }
             
            }
   
            return(
             
             
             <div>
              <Segment attached>
                 <Grid centered columns = {2}>
   
                     <Grid.Column width={5}>
                    
              <Image circular src={poster.image} size='small' ></Image>
              <Header as='h5'> {`${poster.name} @ ${time}`}</Header>
              </Grid.Column>
              <Grid.Column width={10}>
                <Header as='h2'>
                 {item['content']}
                 </Header>
               
                 </Grid.Column>
              </Grid>
                   
   
              </Segment>
               <Segment raised attached style={{marginTop:"-15px"}}>
               <Button color='red' onClick={()=>{updateLike();}}>
                  <Icon name='heart' />
                    Like
                </Button>
                
   
                <Label as='a' basic color='red' pointing='left'>
                  {likes[item['likes']] != 0 ? Object.values(likes[item['likes']]).length:0}
                </Label>
                </Segment>
                {replies[item['replies']] != 0 ? 
                 Object.values(replies[item['replies']]).map(id => <ReturnReply key={id.posterid+id.createdAt} reply={id}></ReturnReply>)
               
                :""}
           <Segment attached='bottom'>
                   {/* onSubmit={()=>handleSubmitReply()} */}
             <Form >
               <TextArea id="textareareply" rows={2} placeholder='Reply to post' /> 
               <Form.Button fluid positive onClick = {()=>handleSubmitReply()} style={{marginTop:"10px"}}>Reply</Form.Button>  
             </Form> 
           </Segment>
             
                
                </div>       
            )
         }
          else{
            return(<div>Loading</div>)
          }
        });

export default ReturnPost;