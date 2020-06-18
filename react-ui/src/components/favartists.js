
import React, {useState, useEffect, isValidElement} from 'react';
import {Redirect} from 'react-router-dom'
import _ from 'lodash'
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header, Search, Button} from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import axios from 'axios'


const mongoose = require('mongoose');
const s = new Spotify();

const FavoriteArtists = ({accesstoken, artists, refreshtoken}) =>{
     const [artistnames,setNames]= useState([]);
     const [artistimages, setImages]=useState([]);
     const [isLoading, setisLoading]=useState(false);
     const [result, setResult]=useState("");
     var array = [...Array(20).keys()];
     const [indexarray, setIndex]=useState(array);
     const [redirect, setRedirect]=useState(false);
     const [value, setValue]=useState("");
     const [results, setResults]=useState([]);
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
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={8} id={id}> 
                        <Link to={`/artist/${artists[id]}`} >
                        <Image size='huge' rounded fluid verticalAlign='middle' src={imageurl} />
                        <Header  size='huge'>{artistname}</Header>
                        </Link>
                        
                        <br></br>
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
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={4} id={id}> 
                        <Link to={`/artist/${artists[id]}`} >
                                <Image fluid rounded src={imageurl} verticalAlign='middle' />
                                <Header size='huge'>{artistname}</Header>
                        </Link>
                        <br></br>
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
        // console.log(indexarray);
        // console.log(artistimages)
       if(imageurl)
       {
             console.log(imageurl);
             return(
                <Grid.Column mobile={16} tablet={8} computer={4} id={id}> 
                         <Link to={`/artist/${artists[id]}`} >
                                <Image fluid rounded src={imageurl} verticalAlign='middle' />
                                <Header size='huge'>{artistname}</Header>
                        </Link>
                        <br></br>
                </Grid.Column>);
       }
        else{
                console.log(imageurl)
                return "null";
        }
     }
     async function  handleSearchChange(valuee)  {
        setisLoading(true);
        setValue(valuee);
        console.log(valuee);
        const url='https://api.spotify.com/v1/search'+`?q=${encodeURIComponent(valuee)}`+"&type=artist"
        const res = await axios.get(url, {
                headers:{
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        'Authorization': 'Bearer ' + accesstoken 
                }
        });
        var temp=[];
        console.log(res);
        for(let i=0; i<res.data.artists.items.length; i++){
                let item=res.data.artists.items[i];
                console.log(item);
                if(item.images[0]){
                        temp.push({title: item.name, image: item.images[0].url, description: item.genres[0], price: item.popularity, id: item.id})

                }
                else{
                        //if no pictures just put a black picture
                        temp.push({title: item.name, image: "https://images.unsplash.com/photo-1554050857-c84a8abdb5e2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=564&q=80", description: item.genres[0], price: item.popularity, id: item.id})
                }
        }
               
     
        setResults(temp);
        // console.log(temp);
        setisLoading(false);
     }
//      console.log(artistnames)
     return(
    <div className="FavoriteArtists">
      <Grid>
      <Grid.Row stretched>  
      <Grid.Column>
           <Search
            loading={isLoading}
            onResultSelect={(e, {result})=>{
                    setResult(result);
                    setRedirect(true);
            }}
            onSearchChange={_.debounce((e, {value})=>handleSearchChange(value), 500, {
              leading: true,
            })}
            results={results}
            value={value}
            fluid
            input={{ fluid: true }}
        //     {...this.props}
          />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row >  
        {artistimages.length > 15 ? indexarray.slice(0,2).map(id=><ReturnFavArtist id={id} />) : ""}
        </Grid.Row>
       
        <Grid.Row >  
        {artistimages.length > 15 ? indexarray.slice(2,4).map(id=><ReturnFavArtist id={id} />) : ""}
        </Grid.Row>
        
        <Grid.Row >  
        {artistimages.length > 15 ? indexarray.slice(4,6).map(id=><ReturnFavArtist id={id} />) : ""}
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
      </Grid>
      {redirect ? <Redirect to={`/artist/${result.id}`} push={true} /> : ""} 

    </div> 
   
        )
}

export default FavoriteArtists;