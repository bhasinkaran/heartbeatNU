
import React, {useState, useEffect, isValidElement, useContext, useRef} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label, Loader} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnReply from './Reply'
import AddReply from './AddReply';

const ReturnPost = React.memo(({item, id, includeHeader}) =>{
        const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs,posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken} = React.useContext(InfoContext);
        const [poster, setPoster]=useState("");
        const [showReply, setShowReply]=useState(false);
        const [type, setType]=useState("track");
        const [artistName, setArtistName]=useState("");
        const [trackName, setTrackName]=useState("");
        const arrayColors = ['red','orange','yellow','olive','green','teal','blue','violet','purple','pink','brown','grey','black'];
        const number = Math.floor((Math.random() * 12) );

        const replyRef = useRef();
        useEffect(()=>{
           if(item && item['artistid'] && artists){
              setType('artist');
              setArtistName(artists[item['artistid']]['name']);
            }
            else if (item && item['trackid'] && songs){
              setType('track');
              setTrackName(songs[item['trackid']]['name']);
              console.log("here!")
            }
        }, [item])

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



              }
             
            }
   
            
           if((artistName || trackName)){
            return(
              <div>
               <Segment attached>
                  
                  {poster ? 
                   <Grid centered >
                        <Grid.Row>
                          <div>

                     <Image circular src={poster.image} size="small" avatar ></Image>

                     {includeHeader ?   <Header as={'h3'}>{`${poster.name}`} {"posted to  "}{ type== 'artist' ?  artistName : trackName}{"'s wall"}</Header> : <Header as={'h3'}>{`${poster.name}`}</Header>}
                       </div>
                </Grid.Row>
                     <Grid.Row>
                       <Grid.Column width={16} style={{alignContent:"center"}}>
                         <Segment centered color={arrayColors[number]}> 
                          <Header as="h1">{item['content']}</Header>

                         </Segment>
                      </Grid.Column>
                      </Grid.Row>
                      <Grid.Row style={{marginTop:"-20px", marginBottom: "-10px"}}>
                   <Grid.Column width={8}>
                  <Header  as="h3" color='gray' >
                   {likes[item['likes']] != 0 ? Object.values(likes[item['likes']]).length :0}
                   {' Likes & '}
                   {replies[item['replies']] != 0 ? Object.values(replies[item['replies']]).length :0}
                   {' Replies'}
                 </Header>
                 </Grid.Column>
                 <Grid.Column width={3}>
 
                 </Grid.Column>
                 <Grid.Column width={5}>
                 <Header  as="h3" color='gray' >
                   {`${time}`}
                 </Header>
                 </Grid.Column>
                   
                   
                      </Grid.Row>
               </Grid>
                 : <div>
                   <Loader active inline='centered' />
                 </div>
                   }
               </Segment>
                 {replies[item['replies']] != 0 && showReply? 
                  Object.values(replies[item['replies']]).map(id => <ReturnReply key={id.posterid+id.createdAt} reply={id}></ReturnReply>)
                
                 :""}
                
            <Segment attached='bottom'>
                    {/* onSubmit={()=>handleSubmitReply()} */}
              <Form >
               <AddReply item={item} id={id} />
                <Button fluid onClick={()=>{updateLike();}} >
                   <Icon color="" name='heart' />
                     { Object.values(likes[item['likes']]).includes(user.id) ? "Unlike": "Like"}
                   </Button> 
              </Form> 
            </Segment>
            {replies[item['replies']] != 0 && !showReply? 
                <Form.Button fluid positive onClick = {()=>setShowReply(true)} style={{marginTop:"10px"}}>Show Replies</Form.Button> 
 
                 :
                 replies[item['replies']] != 0 ? <Form.Button fluid positive onClick = {()=>setShowReply(false)} style={{marginTop:"10px"}}>Hide Replies</Form.Button> 
                   : ""
                 }
                 </div>       
             )

          }
         
         }
          else{
            return(
              <div>
            <Loader active inline='centered' />
            {/* {id} */}
            </div>
            
            )
          }
        });

        
export default ReturnPost;

// useEffect(() => {
//   const div = replyRef.current;
//   // subscribe event
//   div.addEventListener("keyup", function(e) {
//     if (e.code === 'Enter') {
//      handleSubmitReply();
//       console.log("Go");
//    }
//  console.log("Works");
// });
//   return () => {
//     // unsubscribe event
//     div.removeEventListener("keyup", function(e) {
//       if (e.code === 'Enter') {
//        handleSubmitReply();
//         console.log("Go");
//      }
//    console.log("Works");
//   });}
// }, []);