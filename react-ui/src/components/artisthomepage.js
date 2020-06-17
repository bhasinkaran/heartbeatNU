
import React, {useState, useEffect, isValidElement, useContext} from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header} from 'semantic-ui-react'
import {Router , useParams} from  'react-router-dom';
import {dbArtists, dbPosts} from '../firebase/firebase'
import {AppContext} from '../context'
const mongoose = require('mongoose');
const s = new Spotify();

const ArtistHomepage = () =>{
        const {posts, setPosts, artists, setArtists, messages, setMessages, songs, setSongs, userid, setUserid, accesstoken, setaccesstoken, refreshtoken, setrefreshtoken} = useContext(AppContext);
        var  {artistid } = useParams();
     const [name, setName] = useState("");
     const [image, setImage]=useState("");
//      var array = [...Array(20).keys()];
//      const [indexarray, setIndex]=useState(array);
//      s.setAccessToken(accesstoken);
     useEffect(initializeState, []);
     function initializeState(){
     s.getArtist(artistid).then(
                res => {

                           setName(res.name);
                           if(res.images[0].url){
                                setImage(res.images[0].url);
                           }
                           else{
                                   setImage("https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80");
                           }
                       
                }).catch(err=>console.log(err));
     }
     return(
       
    <div className="HomepageArtist">
           
      <Grid>
        <Grid.Row >  
        {name}
        {accesstoken}
        {userid}
        <Image src={image}></Image>
        </Grid.Row>  
      </Grid>
      

    </div> 
        )
}

export default ArtistHomepage;