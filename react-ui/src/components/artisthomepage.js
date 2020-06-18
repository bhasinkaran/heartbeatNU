
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header, Container, Form, TextArea, Button, SegmentGroup, Segment} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts} from '../firebase/firebase'
import {InfoContext} from '../App'
const mongoose = require('mongoose');
const s = new Spotify();

const ArtistHomepage = () =>{
     var  {artistid } = useParams();
     const {artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, userid, setUserid, accesstoken, setAccesToken, refreshtoken, setRefreshtoken} = React.useContext(InfoContext);
     const [name, setName] = useState("");
     const [image, setImage]=useState("");
     const [image2, setImage2]=useState("");
     const [image3, setImage3]=useState("");
     if(artists && !artists[artistid]){
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
       if(posts && posts[id]){
         return(
           <Segment></Segment>
         )
       }
     }
     const Posts = ()=>{
      if(artists[artistid] && artists[artistid]['posts']=="None"){
        console.log(artists[artistid]);
        console.log(artists[artistid]['posts']=="None");
        return( 
        <div>
        <Header style={{marginTop:"10px"}} textAlign='center' as='h3'>No Posts Yet</Header>
        <Form>
          <TextArea rows={2} placeholder='Add a post' />
          <Button fluid positive style={{marginTop:"10px"}}>Post</Button>
        </Form>
        </div> 
        )
      }
      if(artists[artistid] && artists[artistid]['posts']=="None"){
        artists[artistid]['posts'].map(id=><ReturnPost id={id}/>);
      }
      return(<div>Loading</div>)
    }
     return(
     

    
    <div className="HomepageArtist">
           
      <Container>
      <Header as='h1' content={name} textAlign='center' dividing />
      <Image src={image} centered size='medium'></Image>
      {/* {image2 ? <Image src={image2} centered size='medium'></Image> : ""}
      {image3 ? <Image src={image3} centered size='medium'></Image> : ""} */}
      <Posts />
      

      </Container>

    </div> 
   
        )
}

export default ArtistHomepage;