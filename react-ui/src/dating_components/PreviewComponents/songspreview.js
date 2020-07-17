import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Header, Search, Image, Icon, Grid, Label } from 'semantic-ui-react'
import { InfoContext } from '../../App'
import { dbSongs } from '../../firebase/firebase';

var Spotify = require('spotify-web-api-js');
const SongsPreview = React.memo(({ person }) => {
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
        const GetSong = React.memo(({ id }) => {
                console.log(colors[Math.floor(Math.random() * 13)])
                const [response, setResponse] = useState('');
                const [data, setData] = useState("");
                // useEffect(()=>{
                //         if(data!="")
                //         {
                //                 dbSongs.child(id).update(data);
                //         }
                // }, [data]);
                // if(songs  && !songs[id])
                // {
                s.getTrack(id).then(res => {
                        setResponse(res['name'] + " " + res['artists'][0]['name']);
                        // setData({
                        //         name: res['name'],
                        //         artist: res['artists'][0]['name'],
                        //         posts: "None",
                        //         image: res.album.images[0].url,
                        //         id: id,
                        // })
                });
                // }
                // else if(songs)
                // {
                //         setResponse(songs[id]['name'] + " - " + songs[id]['artist']);
                // }
                // else{
                //         setResponse("null");
                // }
                return (
                        <Label size='big' color={colors[Math.floor(Math.random() * 13)]}>
                                {response}
                        </Label>
                )
        });

        return (
                <Label.Group>
                        {person['favoritesongs'].slice(0, 6).map(id =>
                                <GetSong id={id} />
                        )}
                </Label.Group>);
});
export default SongsPreview;