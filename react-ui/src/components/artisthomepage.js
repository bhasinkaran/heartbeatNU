
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Rail, Segment, Feed, FeedContent, Icon, Label} from 'semantic-ui-react'
import {Router , useParams, Redirect} from  'react-router-dom';
import {dbArtists, dbPosts, dbReplies, dbLikes} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
import ReturnPost from './Post'
import ReturnHomepagePost from './ReturnHomepagePost'
const mongoose = require('mongoose');
const s = new Spotify();

const ArtistHomepage = () =>{
     var  {artistid } = useParams();
     const [value, setValue]=useState("");
     const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
     if(user){
       localStorage.setItem('user', JSON.stringify(user));
     }
     
     
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
        'content':value,
        'posterid': user.id,
        'artistid': artistid,
        'likes': likeskey,
        'replies': replieskey,
        "createdAt": {'.sv': 'timestamp'},
        "type": "artist"
        
      });
      var key=ref.key;
      // if(artists[artistid]['posts']=="None"){
        console.log("here")
        dbArtists.child(artistid).child('posts').push(key);

      // }

      if(!user.postsfollowing.includes(key)){  
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
        // user.postsfollowing.push(id);
        // setUser()
        }
        setValue("");

     }
     if(user|| JSON.parse(localStorage.getItem('user'))){
// 
     console.log(user);
     console.log(JSON.parse(localStorage.getItem('user')));
     return(
  
    <div className="HomepageArtist">
      <Container>
      <br></br>
      <Header as='h1' content={name} textAlign='center' />
      <br></br>
      <img class="ui medium centered image" src={image} centered size='medium'></img>
      <br></br>
      <br></br>
      <div>
        <Header style={{marginTop:"10px"}} textAlign='center' as='h3'>Say something about this artist</Header>
        <Form onSubmit={()=>handleSubmit()}>
          <TextArea id="textarea" value={value} onChange={(e)=>setValue(e.target.value)} rows={2} placeholder='Add a post' /> 
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
          Object.values(artists[artistid]['posts']).map(id=>
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
      else{
        return(<Redirect to="/" push={true} />);
      }
}

export default ArtistHomepage;