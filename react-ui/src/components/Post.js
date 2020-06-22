
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label, Loader} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnReply from './Reply'

const ReturnPost = React.memo(({item}) =>{
        const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
        const [poster, setPoster]=useState("");
        const [showReply, setShowReply]=useState(false);

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
                 
                 {poster ? 
                  <Grid centered >
                    <Grid.Row>
                     <Grid.Column width={5}>        
                          <Image circular src={poster.image} size='medium' ></Image>
                          <Grid.Row>
                        <Header as={"h4"} textAlign="center" >
                            {`${poster.name}`}
                        </Header>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column width={11}>
                         <Label as='a' basic color='red' size="huge" pointing='left' style={{marginTop:"15px"}}>
                            {item['content']}
                        </Label>
                     </Grid.Column>
                     </Grid.Row>
                     <Grid.Row style={{marginTop:"-20px", marginBottom: "-10px"}}>
                  <Grid.Column width={8}>
                 <Header  as="h5" color='gray' >
                  {likes[item['likes']] != 0 ? Object.values(likes[item['likes']]).length :0}
                  {' Likes & '}
                  {replies[item['replies']] != 0 ? Object.values(replies[item['replies']]).length :0}
                  {' Replies'}
                </Header>
                </Grid.Column>
                <Grid.Column width={3}>

                </Grid.Column>
                <Grid.Column width={5}>
                <Header  as="h5" color='gray' >
                  {`${time}`}
                </Header>
                </Grid.Column>
                  
                  
                     </Grid.Row>
                     {/* <Grid.Column width={3} >
                       <Button color='red' size="mini" onClick={()=>{updateLike();}}>
                         <Icon name='heart' />
                            Like
                       </Button>

                     </Grid.Column> */}
              </Grid>
                : <Loader active inline='centered' />  }
              </Segment>
               {/* <Segment raised attached style={{marginTop:"-15px"}}> */}
               {/* <Button color='red' onClick={()=>{updateLike();}}>
                  <Icon name='heart' />
                    Like
                </Button> */}
                
   
                {/* <Label as='a' basic color='red' pointing='left'>
                  {likes[item['likes']] != 0 ? Object.values(likes[item['likes']]).length:0}
                </Label>
                <Header style={{textAlign:"center", marginTop:"-10px"}} as='h6'> {`${time}`}</Header> */}

                {/* </Segment> */}
                {replies[item['replies']] != 0 && showReply? 
                 Object.values(replies[item['replies']]).map(id => <ReturnReply key={id.posterid+id.createdAt} reply={id}></ReturnReply>)
               
                :""}
               
           <Segment attached='bottom'>
                   {/* onSubmit={()=>handleSubmitReply()} */}
             <Form >
               <TextArea id="textareareply" rows={1} placeholder='Reply to post' /> 
               <Form.Button fluid positive onClick = {()=>handleSubmitReply()} style={{marginTop:"10px"}}>Reply</Form.Button> 
               <Button fluid onClick={()=>{updateLike();}} >
                  <Icon color="" name='heart' />
                    Like
                  </Button> 
             </Form> 
           </Segment>
           {replies[item['replies']] != 0 && !showReply? 
               <Form.Button fluid positive onClick = {()=>setShowReply(true)} style={{marginTop:"10px"}}>Show Replies</Form.Button> 

                :
                <Form.Button fluid positive onClick = {()=>setShowReply(false)} style={{marginTop:"10px"}}>Hide Replies</Form.Button> 

                }
             
                
                </div>       
            )
         }
          else{
            return(<Loader active inline='centered' />)
          }
        });

export default ReturnPost;