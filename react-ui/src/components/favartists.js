
import React, {useState, useEffect, isValidElement} from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header, Search, Button, Container} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import axios from 'axios'
const mongoose = require('mongoose');
const s = new Spotify();
const FavoriteArtists = ({accesstoken, artists, refreshtoken}) =>{
     const [artistnames,setNames]= useState([]);
     const [artistimages, setImages]=useState([]);
    
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
                        //      console.log(res);
                        //      console.log(temp);
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
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                <div  id={id}> 
                {/* mobile={16} tablet={8} computer={8} */}
                        <Link to={`/artist/${artists[id]}`} >
                        <Image size='massive' rounded fluid verticalAlign='middle' src={imageurl} />
                        <Header  size='massive'>{artistname}</Header>
                        </Link>
                        
                        <br></br>
                </div>);
       }
        else{
                console.log(imageurl)
                return "null";
        }
     }
     function returnSecondFavArtist(id){
        var artistname=artistnames[id];
        var imageurl=artistimages[id];
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                // <Grid.Row mobile={16} tablet={8} computer={4} id={id}> 
                <div  id={id}> 
                        <Link to={`/artist/${artists[id]}`} >
                                <Image fluid rounded src={imageurl} verticalAlign='middle' />
                                <Header size='huge'>{artistname}</Header>
                        </Link>
                        <br></br>
                </div>);
                // {/* </Grid.Row>); */}
       }
        else{
                console.log(imageurl)
                return "null";
        }
     }
     function returnThirdFavArtist(id){
        var artistname=artistnames[id];
        var imageurl=artistimages[id];
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={4} id={id}> 
                         <Link to={`/artist/${artists[id]}`} >
                                <Image fluid rounded src={imageurl} verticalAlign='middle' />
                                <Header size='large'>{artistname}</Header>
                        </Link>
                        <br></br>
                </Grid.Column>);
       }
        else{
                console.log(imageurl)
                return "null";
        }
     }
     
//      console.log(artistnames)
     return(
    <div className="FavoriteArtists ">
           
            
    
        <Header  size='huge'>Top Artist</Header>

        <Grid.Row >  
        {artistimages.length > 15 ? indexarray.slice(0,2).map(id=><ReturnFavArtist key = {id.toString()} id={id} />) : ""}
        </Grid.Row>
       
        <Grid.Row >  
        {artistimages.length > 15 ? indexarray.slice(2,4).map(id=><ReturnFavArtist key = {id.toString()}  id={id} />) : ""}
        </Grid.Row>
        
        <Grid.Row >  
        {artistimages.length > 15 ? indexarray.slice(4,6).map(id=><ReturnFavArtist key = {id.toString()}  id={id} />) : ""}
        </Grid.Row>
     
         <Grid.Row>  
        {artistimages.length > 15 ? indexarray.slice(6,10).map(id=>returnSecondFavArtist(id)):""}
        </Grid.Row>
       
        <Grid.Row>  
        {artistimages.length > 19 ? indexarray.slice(10,14).map(id=>returnSecondFavArtist(id)):""}
        </Grid.Row>
        
        <Grid.Row>  
        {artistimages.length > 19 ? indexarray.slice(14,21).map(id=>returnThirdFavArtist(id)):""}
        </Grid.Row> 
        
       
    </div> 
   
        )
}

export default FavoriteArtists;