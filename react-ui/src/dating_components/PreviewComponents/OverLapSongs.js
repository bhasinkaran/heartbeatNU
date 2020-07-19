
import React, { useState, useEffect, isValidElement, useContext } from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header, Search, Button, Container } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { InfoContext } from '../../App';
import NoneInCommon from './NoneInCommon';


const mongoose = require('mongoose');
const s = new Spotify();
const OverLapSongs = ({person}) => {
        const { accesstoken, user } = useContext(InfoContext);
        const [songnames, setNames] = useState([]);
        const [songimages, setImages] = useState([]);
        const [orderedSongs, setOrderedSongs] = useState([]);
        var array = [...Array(20).keys()];
        const [indexarray, setIndex] = useState(array);

        s.setAccessToken(accesstoken);
        useEffect(initializeState, [user]);
        var temp = [];
        var temp2 = [];
        var temp3 = [];
        function initializeState() {
                console.log(user);
                if (user) {


                        for (let i = 0; i < user['favoritesongs'].length; i++) {
                                //     console.log("This is songs",songs)
                                if(person['favoritesongs'].includes(user['favoritesongs'][i])){
                                        s.getTrack(user['favoritesongs'][i]).then(
                                                res => {
                                                        temp.push(res.name);
                                                        temp2.push(res.album.images[0].url);
                                                        temp3.push(user['favoritesongs'][i]);
                                                        //      console.log("Inside then")
                                                        //      console.log(res);
                                                        //      console.log(temp);
                                                        // if (temp.length == 20) {
                                                                setNames(temp);
                                                                setImages(temp2);
                                                                setOrderedSongs(temp3);
                                                        // }
        
                                                }).catch(err => console.log(err));
                                }
                        }
                }
        }

        const ReturnFavSong = ({ id }) => {
                var songName = songnames[id];
                var imageurl = songimages[id];
                // console.log(indexarray);
                // console.log(artistimages)
                if (imageurl) {
                        //      console.log(imageurl);
                       
                                // <Grid.Column key={id.toString()} mobile={16} tablet={8} computer={8} id={id}>
                                        {/* <Link to={`/track/${orderedSongs[id]}`} > */}
                                      

                                                {/* <Image size='small' rounded verticalAlign='middle' src={imageurl} />
                                                <Header style={{marginTop:"5px"}} size='small'>{songName}</Header> */}
                                                
                                        {/* </Link> */}

                                      
                                // </Grid.Column>
                                return(<div style={{marginTop:"-25px"}} key={id.toString()} id={id}>
                                {/* mobile={16} tablet={8} computer={8} */}
                                {/* <Link to={`/artist/${orderedArtists[id]}`} > */}
                                        <Image  style={{marginTop:"5px"}}  size='small' rounded src={imageurl} verticalAlign='middle' />
                                        <Header style={{marginTop:"5px"}} size='small'>{songName}</Header>
                                <br></br>
                        </div>

                                );
                               
                                
                }
                else {
                        // console.log(imageurl)
                        return "null";
                }
        }
        
        return (
                <div className="OverlappingSongs ">
                        <Header size='huge'>Song Matches</Header>
                        <Grid.Row >
                                {songimages.length > 0 ? indexarray.map(id => <ReturnFavSong key={id.toString()} id={id} />) : <NoneInCommon type={"favoritesongs"} person={person} /> }
                        </Grid.Row>
                </div>

        )
}

export default OverLapSongs;