import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Header, Search, Image, Icon, Grid, Label } from 'semantic-ui-react'
import { InfoContext } from '../../App'

var Spotify = require('spotify-web-api-js');
const SongsPreview = React.memo(({person})=>
{
        const { attractedUsers, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken, songs, artists } = React.useContext(InfoContext);
        var s = new Spotify();
        s.setAccessToken(accesstoken);
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

        return(<Label.Group>
                                                        {person['favoritesongs'].slice(0, 6).map(id =>
                                                                <GetSong id={id} />
                                                        )}
        </Label.Group>);
});
export default SongsPreview;