import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Search, Grid } from 'semantic-ui-react'
import { Router, useParams } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import FavoriteArtists from '../components/favartists'
import FavoriteSongs from '../components/favsongs'
import HomePagePosts from '../components/HomePagePosts'

import PageHeader from './pageheader'
import { InfoContext } from '../App'

const MatchedPeople = () => {
        const { replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken } = React.useContext(InfoContext);
        var redirectUri= process.env.NODE_ENV == 'production' ? `https://pure-harbor-26317.herokuapp.com/users/` : `http://localhost:8888/users/`

        useEffect(handleData, []);
        function handleData() {
                axios.get(`${redirectUri}${id}`)
                        .then(response => {
                                settmongouser(response.data[0]);
                                setUser(response.data[0]);
                        })
                        .catch(function (error) {
                                console.log(error);
                        });

                axios.get(`${redirectUri}`)
                        .then(response => {
                                setAllusers(response.data);
                        })
                        .catch(function (error) {
                                console.log(error);
                        });
        };
        useEffect(attractedTo, [mongouser, allusers]);
        function attractedTo() {
                if (allusers != "") {
                        setAttracted(allusers.filter(item => item.gender == mongouser.type && item.id != mongouser.id));
                }
        };
        function rankAttractedTo() {
                function comparedistance(a, b) {
                        let lat1 = mongouser.location[0];
                        let lon1 = mongouser.location[1];
                        let distance1 = distance(lat1, lon1, a);
                        let distance2 = distance(lat1, lon1, b);
                        return distance2 - distance1;
                }
                function distance(lat1, lon1, user2) {
                        let lat2 = user2.location[0];
                        let lon2 = user2.location[1];
                        if ((lat1 == lat2) && (lon1 == lon2)) {
                                return 0;
                        }
                        else {
                                var radlat1 = Math.PI * lat1 / 180;
                                var radlat2 = Math.PI * lat2 / 180;
                                var theta = lon1 - lon2;
                                var radtheta = Math.PI * theta / 180;
                                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                                if (dist > 1) {
                                        dist = 1;
                                }
                                dist = Math.acos(dist);
                                dist = dist * 180 / Math.PI;
                                dist = dist * 60 * 1.1515;
                                return dist;
                        }
                }
        }

        console.log(user);
        return (
                <Container>
                        Matched Peeps
                </Container>
        );

}
export default MatchedPeople