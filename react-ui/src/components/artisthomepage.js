
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

const ArtistHomepage = () =>{
     var  {artistid } = useParams();
     const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
     localStorage.setItem('user', JSON.stringify(user));
     const [name, setName] = useState("");
     const [image, setImage]=useState("");
     const [image2, setImage2]=useState("");
     const [image3, setImage3]=useState("");
     const [valuee, setValuee]=useState("");
     if(artists && !artists[artistid] && name){
      const constant = {
        id: artistid,
        name: name,
        posts: "None",
      }
      const dataToPush = {
        [artistid]: constant
      }  
      dbArtists.update(dataToPush);
     }
//      var array = [...Array(20).keys()];
//      const [indexarray, setIndex]=useState(array);
//      s.setAccessToken(accesstoken);
        // console.log(context);
     useEffect(initializeState, []);
     function initializeState(){
     s.getArtist(artistid).then(
                res => {
                           setName(res.name);
                           if(res.images[0].url){
                              console.log(res.images[0].url);

                                setImage(res.images[0].url);
                           }
                           else{
                            setImage("https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80");
                          }
                           if(res.images[1].url){
                             console.log(res.images[1].url);
                            setImage2(res.images[1].url);
                          }
                          if(res.images[2].url){
                            console.log(res.images[2].url);

                            setImage3(res.images[2].url);
                          }

                           
                       
                }).catch(err=>console.log(err));
     }
    
     const ReturnReply = React.memo(({reply})=>{
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
     const ReturnPost = React.memo(({item}) =>{
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
          <Form onSubmit={()=>handleSubmitReply()}>
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
     function handleSubmit(){
      console.log(document.getElementById("textarea").value);
      const likesref=dbLikes.push(0);
        const likeskey=likesref.getKey();
        console.log("Likes key is ", likeskey);
        const repliesref=dbReplies.push(0);
        const replieskey=repliesref.getKey();
        console.log("Likes key is ", likeskey);
        console.log("replies key is ", replieskey);

      const ref = dbPosts.push({
        'content':document.getElementById("textarea").value,
        'posterid': user.id,
        'likes': likeskey,
        'replies': replieskey,
        "createdAt": {'.sv': 'timestamp'}
        
      });
      var key=ref.key;
      // if(artists[artistid]['posts']=="None"){
        console.log("here")
        dbArtists.child(artistid).child('posts').push(key);
      // }
     }
     
     return(
  
    <div className="HomepageArtist">
      <Container>
      <Header as='h1' content={name} textAlign='center' dividing />
      <Image src={image} centered size='medium'></Image>
      <br></br>
      <br></br>
      <div>
        <Header style={{marginTop:"10px"}} textAlign='center' as='h3'>Say something about this artist</Header>
        <Form onSubmit={()=>handleSubmit()}>
          <TextArea id="textarea" rows={2} placeholder='Add a post' /> 
          <Form.Button fluid positive  style={{marginTop:"10px"}}>Post</Form.Button>
          {/* onClick = {()=>handleSubmit()} */}
        </Form>
      </div> 
      <div>
      <Grid>
          <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
        {artists && artists[artistid] && artists[artistid]['posts']!="None" ? 
          Object.values(artists[artistid]['posts']).map(id=><ReturnPost key={id.toString()} item={posts[id]}/>) 
          : " "}
          </Grid.Column>
          <Grid.Column width={3}></Grid.Column>
          </Grid.Row>
          </Grid>
          </div> 
      </Container>
    </div> 
   
        )
}

export default ArtistHomepage;