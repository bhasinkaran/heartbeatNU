
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

const ReturnPost = React.memo(({item, id}) =>{
        const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
        const [poster, setPoster]=useState("");
        const [showReply, setShowReply]=useState(false);
    
        const replyRef = useRef();

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
   
            
          
        
            return(
             
             
             <div>
              <Segment attached>
                 
                 {poster ? 
                  <Grid centered >
                    <Grid.Row>
                     <Grid.Column width={5}>        
                          <Image circular src={poster.image} size='medium' ></Image>
                          <Grid.Row>
                        <Header as={"h4"} textAlign="center" style={{marginTop:
                        "10px"}}>
                            {`${poster.name}`}
                        </Header>
                        </Grid.Row>
                      </Grid.Column>
                      <Grid.Column width={11}>
                         <Label as='a' basic color='red' size="huge" pointing='left' style={{marginTop:"12px"}}>
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
          else{
            return(<Loader active inline='centered' />)
          }
        });

        function useEventListener(eventName, handler, element = window){
          // Create a ref that stores handler
          const savedHandler = useRef();
          
          // Update ref.current value if handler changes.
          // This allows our effect below to always get latest handler ...
          // ... without us needing to pass it in effect deps array ...
          // ... and potentially cause effect to re-run every render.
          useEffect(() => {
            savedHandler.current = handler;
          }, [handler]);
        
          useEffect(
            () => {
              // Make sure element supports addEventListener
              // On 
              const isSupported = element && element.addEventListener;
              if (!isSupported) return;
              
              // Create event listener that calls handler function stored in ref
              const eventListener = event => savedHandler.current(event);
              
              // Add event listener
              element.addEventListener(eventName, eventListener);
              
              // Remove event listener on cleanup
              return () => {
                element.removeEventListener(eventName, eventListener);
              };
            },
            [eventName, element] // Re-run if eventName or element changes
          );
        };

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