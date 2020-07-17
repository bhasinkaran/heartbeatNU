
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes, dbSongs} from '../firebase/firebase'
import {InfoContext} from '../App'
import ReturnPost from './Post'
import ReturnReply from './Reply'
import DateToTime from '../DateToTime'
import ReturnHomepagePost from './ReturnHomepagePost'
const mongoose = require('mongoose');
const s = new Spotify();

const TrackPage = () =>{
     var  {trackid } = useParams();
     const [value, setValue]=useState("");
     const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
     localStorage.setItem('user', JSON.stringify(user));
     const [name, setName] = useState("");
     const[artistName, setArtistName]=useState("");
     const [image, setImage]=useState("");
     const [image2, setImage2]=useState("");
     const [image3, setImage3]=useState("");
     const [valuee, setValuee]=useState("");
     if(songs && !songs[trackid] && name&& artistName){
      const constant = {
        id: trackid,
        name: name,
        posts: "None",
        artist: artistName
      }
      const dataToPush = {
        [trackid]: constant
      }  
      dbSongs.update(dataToPush);
     }
//      var array = [...Array(20).keys()];
//      const [indexarray, setIndex]=useState(array);
//      s.setAccessToken(accesstoken);
        // console.log(context);
     useEffect(initializeState, []);
     function initializeState(){
     s.getTrack(trackid).then(
                res => {
                  console.log(res);
                           setName(res.name);
                           setArtistName(res.artists[0].name)
                           if(res.album.images[0].url){
                              console.log("THE IMAGE",res.album.images[0].url);

                                setImage(res.album.images[0].url);
                           }
                           else{
                            setImage("https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80");
                          }
                          //  if(res.images[1].url){
                          //    console.log(res.images[1].url);
                          //   setImage2(res.images[1].url);
                          // }
                          // if(res.images[2].url){
                          //   console.log(res.images[2].url);

                          //   setImage3(res.images[2].url);
                          // }

                           
                       
                }).catch(err=>console.log(err));
     }
    
     
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
        'content':valuee,
        'posterid': user.id,
        'trackid': trackid,
        'likes': likeskey,
        'replies': replieskey,
        "createdAt": {'.sv': 'timestamp'},
        
      });
      var key=ref.key;
      // if(artists[artistid]['posts']=="None"){
        console.log("here")
        dbSongs.child(trackid).child('posts').push(key);
      // }
      var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/addpost/` : `http://localhost:8888/users/addpost/`
      axios.post(`${redirectUri}${user.id}/${key}`)
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
      temp.postsfollowing.push(key);
      console.log(temp);
      setUser(temp);

      setValuee("");
     }
     
     return(
  
    <div className="HomepageTrack">
      <Container>
      <Header as='h1' content={name} textAlign='center' dividing />
      <Image src={image} centered size='medium'></Image>
      <br></br>
      <br></br>
      <div>
        <Header style={{marginTop:"10px"}} textAlign='center' as='h3'>Say something about this song</Header>
        <Form onSubmit={()=>handleSubmit()}>
          <TextArea id="textarea" value={valuee} onChange={(e)=>setValuee(e.target.value)} rows={2} placeholder='Add a post' /> 
          <Form.Button fluid positive  style={{marginTop:"10px"}}>Post</Form.Button>
          {/* onClick = {()=>handleSubmit()} */}
        </Form>
      </div> 
      <div>
      <Grid>
          <Grid.Row>
          <Grid.Column width={3}></Grid.Column>
          <Grid.Column width={10}>
        {songs && songs[trackid] && songs[trackid]['posts']!="None" ? 
         Object.values(songs[trackid]['posts']).map(id=>
          <Segment raised style={{marginTop: "40px"}}>
              <ReturnHomepagePost key={id.toString()} item={posts[id]} id={id} includeHeader={false} />
        </Segment>
        ) 
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

export default TrackPage;