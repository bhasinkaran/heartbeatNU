import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Header, Search, Image, Icon, Grid, Label } from 'semantic-ui-react'
import { Router, useParams } from 'react-router-dom';
import Spotify from 'spotify-web-api-js';
import FavoriteArtists from '../components/favartists'
import FavoriteSongs from '../components/favsongs'
import HomePagePosts from '../components/HomePagePosts'

import PageHeader from './pageheader'
import SongsPreview from './PreviewComponents/songspreview'
import { InfoContext } from '../App'

const ReturnPreview = ({ person }) => {
        const { attractedUsers, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken, songs, artists } = React.useContext(InfoContext);
        const [number, setNumber] = useState(0);
        const [change, setChange] = useState(true);
        const colors = [
                'red',
                'orange',
                'yellow',
                'olive',
                'green',
                'teal',
                'blue',
                'violet',
                'purple',
                'pink',
                'brown',
                'grey',
                'black',
              ];
        useEffect(() => {
                setNumber((number + 1) % 3)
                setTimeout(() => {
                        setChange(!change);
                        console.log(change);
                }, 2000)
        }, [change])
        var Spotify = require('spotify-web-api-js');
        var s = new Spotify();
        s.setAccessToken(accesstoken);
        const GetSong = ({ id }) => {
                
                console.log(colors[Math.floor(Math.random()*13)])
                const [response, setResponse] = useState('');
                s.getTrack(id).then(res => {
                        setResponse(res['name'] + " " + res['artists'][0]['name']);

                });
                return (
                        <Label size='big' color={colors[Math.floor(Math.random()*13)]}>
                                {response}
                        </Label>)
        }

        return (
                <div>
                        <Card fluid>
                                <Image rounded centered src={person['datingimages'][number]} fluid size='huge' />
                                {/* wrapped ui={false}  */}
                                <Card.Content>
                                        <Card.Header>{person['name']}</Card.Header>

                                        <Card.Description>
                                                <SongsPreview person={person} />

                                                {/* {person['favoritesongs'].map(id=>getSong(id))} */}
                                        </Card.Description>
                                </Card.Content>
                                <Card.Content extra>
                                        <a>
                                                <Icon name='user' />
        22 Friends
      </a>
                                </Card.Content>
                        </Card>
                </div>
        );

}
export default ReturnPreview