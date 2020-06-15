
import React, {useState, useEffect, isValidElement} from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header} from 'semantic-ui-react'

const mongoose = require('mongoose');
const s = new Spotify();

const FavoriteArtists = ({accesstoken, artists}) =>{
     const[artistnames,setNames]= useState([]);
     const[artistimages, setImages]=useState([]);
     var array = [...Array(20).keys()];
     const [indexarray, setIndex]=useState(array);
     s.setAccessToken(accesstoken);
     useEffect(initializeState, []);
     var temp = [];
     var temp2 = [];
    function initializeState() {
       
            for(let i = 0; i<artists.length; i++){
             s.getArtist(artists[i]).then(
                     res => {
                             temp.push(res.name);
                             temp2.push(res.images[0].url);
                             console.log(res);
                             console.log(temp);
                             if(temp.length==20){
                                setNames(temp);
                                setImages(temp2);
                             }
                            
                     }).catch(err=>console.log(err));
     }
     console.log(temp);
     console.log(temp2);
//      setNames(temp);
//      setImages(temp2);
     

}
    
     const ReturnFavArtist=({id}) =>{
        var artistname=artistnames[id];
        var imageurl=artistimages[id];
        console.log(indexarray);
        console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={4} id={id}> 
                        <Image src={imageurl} />
                        <Header size='huge'>{artistname}</Header>
                </Grid.Column>);
       }
        else{
                console.log(imageurl)
                return "null";
        }
     }
     function returnSecondFavArtist(id){
        var artistname=artistnames[id];
        var imageurl=artistimages[id];
        console.log(indexarray);
        console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={3} id={id}> 
                        <Image src={imageurl} />
                        <Header size='large'>{artistname}</Header>
                </Grid.Column>);
       }
        else{
                console.log(imageurl)
                return "null";
        }
     }
     function returnThirdFavArtist(id){
        var artistname=artistnames[id];
        var imageurl=artistimages[id];
        console.log(indexarray);
        console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={2} id={id}> 
                        <Image src={imageurl} />
                        <Header size='medium'>{artistname}</Header>
                </Grid.Column>);
       }
        else{
                console.log(imageurl)
                return "null";
        }
     }
     console.log(artistnames)
     return(
       
    <div className="FavoriteArtists">
      <Grid>
        <Grid.Row>  
        {artistimages.length > 15 ? indexarray.slice(0,4).map(id=><ReturnFavArtist id={id} />) : "broooooo"}
        </Grid.Row>
         <Grid.Row>  
        {artistimages.length > 15 ? array.slice(4,9).map(id=>returnSecondFavArtist(id)):""}
        </Grid.Row>  
        <Grid.Row>  
        {artistimages.length > 17 ? array.slice(9,17).map(id=>returnThirdFavArtist(id)):""}
        </Grid.Row>  
      </Grid>
    </div> 
   
        )
}

export default FavoriteArtists;