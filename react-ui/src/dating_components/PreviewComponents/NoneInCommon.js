import React, { useState, useEffect, isValidElement } from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header, Search, Button, Container } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { InfoContext } from '../../App';
const s = new Spotify();
const NoneInCommon = ({ person, type }) => {
        // console.log(type);
        // console.log(person);
        var array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        const { accesstoken, user } = React.useContext(InfoContext);

        const [names, setNames] = useState([]);
        const [images, setImages] = useState([]);
        var temp = [];
        var temp2 = [];
        var temp3 = [];
        s.setAccessToken(accesstoken);
        useEffect(initializeState, [person]);
        function initializeState(){
                        for (let i = 0; i < person[type].length; i++) {
                                // console.log(type);
                                // console.log(person[type]);
                                if(type=='favoriteartists'){
                                        s.getArtist(person[type][i]).then(
                                                res => {
                                                        //      console.log(artists[i]);
                                                        temp.push(res.name);
                                                        // console.log(res.name)
                                                        temp2.push(res.images[0].url);
                                                        temp3.push(user['favoriteartists'][i]);
                                                        //      console.log(temp);
                                                        //      console.log(res);
                                                        //      console.log(temp);
                                                        // if (temp.length == 20) {
                                                        //      console.log(temp);
                                                        setNames(temp);
                                                        setImages(temp2);
                                                        // setOrdererdArtists(temp3);
                                                        // }
                        
                                                }).catch(err => console.log(err));
                                }
                                else
                                {
                                        // console.log("In here")
                                        s.getTrack(person[type][i]).then(
                                                res => {
                                                        //      console.log(artists[i]);
                                                        temp.push(res.name);
                                                        temp2.push(res.album.images[0].url);
                                                        // temp3.push(user['favoriteartists'][i]);
                                                        //      console.log(temp);
                                                        //      console.log(res);
                                                        //      console.log(temp);
                                                        if (temp.length == person[type].length) {
                                                        //      console.log(temp);
                                                                setNames(temp);
                                                                setImages(temp2);
                                                                // console.log(temp);
                                                        // setOrdererdArtists(temp3);
                                                        }
                        
                                                }).catch(err => console.log(err));
                                }
                                
                        }
        } 
        const ReturnPreview=({id})=>{

                var name = names[id];
                var image = images[id];
                // console.log(indexarray);
                // console.log(artistimages)
                if (image) {
                        //      console.log(imageurl);
                        return (
                               
                                        <div style={{marginTop:"-25px"}} key={id.toString()} id={id}>
                                                <Image  style={{marginTop:"5px"}} size='small' rounded verticalAlign='middle' src={image} />
                                                <Header style={{marginTop:"5px"}} size='small'>{name}</Header>
                                               
                                        <br></br>
                                        </div>
                               
                                );
                }
                else {
                        // console.log(imageurl)
                        return null;
                }
        }
        
        return (
                <div>
                        <Header>{person['name']} doesn't have any in common, but they can talk to you about their favorites including:</Header>
                        <br></br>
                        {names.map((item,index)=>
                                <ReturnPreview id={index}/>
                        )}
                </div>
        )
}
export default NoneInCommon