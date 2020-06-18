
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import axios from 'axios'
import {Divider, Grid, Image, Header, Container, Form, TextArea, Button, Segment, Feed, FeedContent, Icon} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts} from '../firebase/firebase'
import {InfoContext} from '../App'
import DateToTime from '../DateToTime'
const mongoose = require('mongoose');
const s = new Spotify();

const ArtistHomepage = () =>{
     var  {artistid } = useParams();
     const {artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
     const [name, setName] = useState("");
     const [image, setImage]=useState("");
    //  const [poster, setPoster]=useState("");
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
     const ReturnPost = ({id}) =>{
       var poster=""
       if(posts && posts[id]){
        var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`
        var time= DateToTime(posts[id]['createdAt'])
         const posterid=posts[id]['posterid'];
         axios.get(`${redirectUri}${posterid}`)
         .then(response => {
          poster = response.data[0];
         })
         .catch(function (error) {
           console.log(error);
         });
         return(
           <Feed.Event>
              <Feed.Label>
                  <img src={poster.image} />
              </Feed.Label>
             <FeedContent>
               <Feed.Extra text>
                {posts[id]['content']} {`  - ${poster.name} @ ${time}`}
               </Feed.Extra>
               <Feed.Meta>
                  <Feed.Like>
                    <Icon name='like' />{posts[id]['likes']} Likes
                  </Feed.Like>
                </Feed.Meta>
             </FeedContent>
           </Feed.Event>
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
       
              <Feed>
                 {Object.values(artists[artistid]['posts']).map(id=><ReturnPost id={id}/>)}
             </Feed>
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