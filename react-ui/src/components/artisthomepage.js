
import React, {useState, useEffect, isValidElement} from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header} from 'semantic-ui-react'
const mongoose = require('mongoose');
const s = new Spotify();

const ArtistHomepage = ({accesstoken, artist}) =>{
     var array = [...Array(20).keys()];
     const [indexarray, setIndex]=useState(array);
     s.setAccessToken(accesstoken);
     useEffect(initializeState, []);
     var temp = [];
     var temp2 = [];
    
    
    
     return(
       
    <div className="HomepageArtist">
      <Grid>
        <Grid.Row >  
        
        </Grid.Row>  
      </Grid>

    </div> 
        )
}

export default ArtistHomepage;