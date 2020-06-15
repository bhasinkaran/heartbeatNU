
import React, {useState, useEffect, isValidElement} from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image } from 'semantic-ui-react'

const mongoose = require('mongoose');
const s = new Spotify();

const FavoriteArtists = ({accesstoken, artists}) =>{
     const[artistnames,setNames]= useState([]);
     const[artistimages, setImages]=useState([]);
     var array = [...Array(20).keys()];
     const [indexarray, setIndex]=useState(array);
     
     
     s.setAccessToken(accesstoken);
     useEffect(initializeState, []);
    function initializeState() {
        var temp = [];
        var temp2 = [];
            for(let i = 0; i<artists.length; i++){
             s.getArtist(artists[i]).then(
                     res => {
                             temp.push(res.name);
                             temp2.push(res.images[0].url);
                             console.log(res);
                             setNames(temp);
                            setImages(temp2);
                     }).catch(err=>console.log(err));
     }
     console.log(temp);
     console.log(temp2);
     setNames(temp);
     setImages(temp2);

}
     var array = artists;
     console.log(array);
     function returnFavArtist(id){
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
                </Grid.Column>);
       }
        else{
                console.log(imageurl)
                return "null";
        }
     }
     function returnSecondFavArtist(id){
        var artist="";
         s.getArtist(id).then(res=>
                artists=res
        ).catch(err=>console.log(err));
        return(
           <Grid.Column mobile={16} tablet={8} computer={3} id = {id}>
                   <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
           </Grid.Column>);
     }
     function returnThirdFavArtist(id){
        var artist="";
        s.getArtist(id).then(res=>
               artists=res
       ).catch(err=>console.log(err));
        return(
           <Grid.Column mobile={16} tablet={8} computer={2} id = {id}>
                   <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
           </Grid.Column>);
     }
     return(
             array.length>0 ?
    <div className="FavoriteArtists">
      <Grid>
        <Grid.Row>  
        {artistimages.length > 15 ? indexarray.slice(0,4).map(id=>returnFavArtist(id)) : ""}
        </Grid.Row>
        {/* <Grid.Row>  
        {array.slice(4,9).map(id=>returnSecondFavArtist(id))}
        </Grid.Row>  
        <Grid.Row>  
        {array.slice(9,17).map(id=>returnThirdFavArtist(id))}
        </Grid.Row>   */}
      </Grid>
    </div> : ""
        )
}

export default FavoriteArtists;