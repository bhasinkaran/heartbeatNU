
import React, { useState, useEffect, isValidElement } from 'react';
import Spotify from 'spotify-web-api-js';
import { Grid, Image, Header, Search, Button, Container } from 'semantic-ui-react'
import { Link, Redirect } from 'react-router-dom'
import { InfoContext } from '../../App';
import axios from 'axios'
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
                                                console.log(res.name)
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
                                <div key={id.toString()} id={id}>
                                        {/* mobile={16} tablet={8} computer={8} */}
                                        <Link to={`/artist/${orderedArtists[id]}`} >
                                                <Image size='small' rounded src={imageurl} verticalAlign='middle' />
                                                <Header size='small'>{artistname}</Header>
                                        </Link>

                                        <br></br>
                                </div>);
                }
                else {
                        // console.log(imageurl)
                        return null;
                }
        }
        

        return (
                <div className="FavoriteArtists ">

                        <Header size='huge'>Artist Matches</Header>

                        <Grid.Row >
                                {artistimages.length > 0 ? indexarray.map(id => <ReturnFavArtist key={id.toString()} id={id} />) : ""}
                        </Grid.Row>

                        {/* <Grid.Row >
                                {artistimages.length > 15 ? indexarray.slice(2, 4).map(id => <ReturnFavArtist key={id.toString()} id={id} />) : ""}
                        </Grid.Row>

                        <Grid.Row >
                                {artistimages.length > 15 ? indexarray.slice(4, 6).map(id => <ReturnFavArtist key={id.toString()} id={id} />) : ""}
                        </Grid.Row>

                        <Grid.Row>
                                {artistimages.length > 15 ? indexarray.slice(6, 10).map(id => returnSecondFavArtist(id)) : ""}
                        </Grid.Row>

                        <Grid.Row>
                                {artistimages.length > 19 ? indexarray.slice(10, 14).map(id => returnSecondFavArtist(id)) : ""}
                        </Grid.Row>

                        <Grid.Row>
                                {artistimages.length > 19 ? indexarray.slice(14, 21).map(id => returnThirdFavArtist(id)) : ""}
                        </Grid.Row> */}


                </div>

        )
}


export default OverLapArtists;