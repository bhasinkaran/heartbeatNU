
import React, { useState, useEffect, isValidElement } from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header,Divider, Search, Button, Container } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { InfoContext } from '../../App';
import axios from 'axios'
import NoneInCommon from './NoneInCommon'
const mongoose = require('mongoose');
const s = new Spotify();

const OverLapArtists = ({person}) => {
        const { accesstoken, user } = React.useContext(InfoContext);
        const [artistnames, setNames] = useState([]);
        const [artistimages, setImages] = useState([]);
        const [orderedArtists, setOrdererdArtists] = useState([]);

        var array = [...Array(20).keys()];
        const [indexarray, setIndex] = useState(array);

        s.setAccessToken(accesstoken);
        useEffect(initializeState, [user]);
        var temp = [];
        var temp2 = [];
        var temp3 = [];
        function initializeState() {
                //     console.log(artists);
                if(user)
                for (let i = 0; i < user['favoriteartists'].length; i++) {
                        if(person && person['favoriteartists'].includes(user['favoriteartists'][i])){
                                s.getArtist(user['favoriteartists'][i]).then(
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
                                                        setOrdererdArtists(temp3);
                                                // }
        
                                        }).catch(err => console.log(err));
                                }
                       
                }
                //      console.log(temp);
                //      console.log(temp2);
                //      setNames(temp);
                //      setImages(temp2);


        }

        const ReturnFavArtist = ({ id }) => {
                var artistname = artistnames[id];
                var imageurl = artistimages[id];
                // console.log(indexarray);
                // console.log(artistimages)
                if (imageurl) {
                        //      console.log(imageurl);
                        return (
                                <div style={{marginTop:"-25px"}} key={id.toString()} id={id}>
                                        {/* mobile={16} tablet={8} computer={8} */}
                                        {/* <Link to={`/artist/${orderedArtists[id]}`} > */}
                                                <Image  style={{marginTop:"5px"}}  size='small' rounded src={imageurl} verticalAlign='middle' />
                                                <Header style={{marginTop:"5px"}} size='small'>{artistname}</Header>
                                        <br></br>
                                </div>);
                }
                else {
                        return null;
                }
        }
        

        return (
                <div className="FavoriteArtists ">
                        <Header size='huge'>Artist Matches</Header>
                       <Divider hidden/>
                                {artistimages.length > 0 ? indexarray.map(id => <ReturnFavArtist key={id.toString()} id={id} />) : <NoneInCommon person = {person} type="favoriteartists"/>}
                        
                </div>
        )
}



export default OverLapArtists;