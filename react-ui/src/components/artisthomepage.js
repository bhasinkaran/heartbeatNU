
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
const mongoose = require('mongoose');
const s = new Spotify();

const ArtistHomepage = () =>{
     var  {artistid } = useParams();
     const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
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
     const ReturnReply = ({id})=>{
       if(replies && replies[id]){
         const[replier, setreplier]=useState("");
         var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`
         var replierid=replies[id]['posterid'];
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
          {replies[id]['content']}
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
               {replies[id]['likes'] != 0 ? Object.values(posts[id]['likes']).length:0}
             </Label>
             </Segment>
             </div>

         
         );
       }
       else{
         console.log(id);
         console.log(replies[id])
         console.log(replies)
         return <div>loading</div>
       }
      
     }
     const ReturnPost = ({id}) =>{
     const [poster, setPoster]=useState("");
    if(posts && posts[id]){
        var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`
        var time= DateToTime(posts[id]['createdAt'])
         const posterid=posts[id]['posterid'];
         axios.get(`${redirectUri}${posterid}`)
         .then(response => {
          setPoster(response.data[0]);
         })
         .catch(function (error) {
           console.log(error);
         });
         function handleSubmit(){
          console.log(document.getElementById("textareareply").value);
          const ref = dbReplies.push({
            'content':document.getElementById("textareareply").value,
            'posterid': user.id,
            'likes': 0,
            'replies': "None",
            "createdAt": {'.sv': 'timestamp'}
          });

          var key=ref.key;
          // if(artists[artistid]['posts']=="None"){
            console.log("here")
            dbPosts.child(id).child('replies').push(key);
          // }
         }
         function updateLike(){
          console.log("Called outside if/else.");
           if(posts[id]['likes']!=0 && Object.values(posts[id]['likes']).includes(user.id)){
             
            console.log("Called inside if");
             for(let i=0; i<Object.values(posts[id]['likes']).length; i++){
                if(Object.values(posts[id]['likes'])[i]==user.id){
                  var index=Object.keys(posts[id]['likes'])[i];
                  if(Object.values(posts[id]['likes']).length==1){
                    dbPosts.child(id).child('likes').set(0);
                  }
                  else{
                    dbPosts.child(id).child('likes').remove(index).then(console.log("Done")).catch(err=>console.log(err));
                  }
                  
                }
             }
             //remove
           }
           
           else{
            
            console.log("Called.")

            dbPosts.child(id).child('likes').push(user.id).then(console.log("Done")).catch(err=>console.log(err));;
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
              {posts[id]['content']}
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
               {posts[id]['likes'] != 0 ? Object.values(posts[id]['likes']).length:0}
             </Label>
             </Segment>
             {posts[id]['replies'] != "None" ? 
              Object.values(posts[id]['replies']).map(id => <ReturnReply id={id}></ReturnReply>)
            
             :""}
        <Segment attached='bottom'>
          <Form onSubmit={()=>handleSubmit()}>
            <TextArea id="textareareply" rows={2} placeholder='Reply to post' /> 
            <Form.Button fluid positive onClick = {()=>handleSubmit()} style={{marginTop:"10px"}}>Reply</Form.Button>  
          </Form> 
        </Segment>
          
             
             </div>
          
              
         )
       }
       else{
         return(<div></div>)
       }
     }

     const Posts = ()=>{
       function handleSubmit(){
        console.log(document.getElementById("textarea").value);
        const ref = dbPosts.push({
          'content':document.getElementById("textarea").value,
          'posterid': user.id,
          'likes': 0,
          'replies': "None",
          "createdAt": {'.sv': 'timestamp'}
          
        });
        var key=ref.key;
        // if(artists[artistid]['posts']=="None"){
          console.log("here")
          dbArtists.child(artistid).child('posts').push(key);
        // }
       }
      if(artists[artistid] && artists[artistid]['posts']=="None"){
        console.log(artists[artistid]);
        // console.log(artists[artistid]['posts']=="None");
        return( 
        <div>
        <Header style={{marginTop:"10px"}} textAlign='center' as='h3'>No Posts Yet</Header>
        <Form onSubmit={()=>handleSubmit()}>
          <TextArea id="textarea" rows={2} placeholder='Add a post' /> 
          <Form.Button fluid positive onClick = {()=>handleSubmit()} style={{marginTop:"10px"}}>Post</Form.Button>
        </Form>
        </div> 
        )
      }
      if(artists[artistid] && artists[artistid]['posts']!=="None"){
        console.log(Object.values(artists[artistid]['posts']));

        return(
          <div>
        
        <Grid>
          <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
          <Header style={{marginTop:"10px"}} textAlign='center' as='h3'>Add Post</Header>
        <Form onSubmit={()=>handleSubmit()}>
          <TextArea id="textarea" rows={2} placeholder='Add a post' /> 
          
          <Form.Button fluid positive onClick = {()=>handleSubmit()} style={{marginTop:"10px"}}>Post</Form.Button>
          <Divider ></Divider>
        </Form>
       
              {/* <Feed> */}
                 {Object.values(artists[artistid]['posts']).map(id=><ReturnPost id={id}/>)}
             {/* </Feed> */}
        </Grid.Column>
        <Grid.Column width={3}></Grid.Column>
        </Grid.Row>
        </Grid>
        </div> 
       
        )
        
      }
      return(<div>Loading</div>)
    }
     return(
     

    
    <div className="HomepageArtist">
           
      <Container>
      <Header as='h1' content={name} textAlign='center' dividing />
      <Image src={image} centered size='medium'></Image>
      <br></br>
      <br></br>
      {/* {image2 ? <Image src={image2} centered size='medium'></Image> : ""}
      {image3 ? <Image src={image3} centered size='medium'></Image> : ""} */}
      <Posts />
      

      </Container>

    </div> 
   
        )
}

export default ArtistHomepage;