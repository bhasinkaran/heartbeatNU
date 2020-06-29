import storage from '../firebase/firebase'
import React, { useState, useContext, createRef, useEffect } from 'react';
import { Header, Checkbox, Card, Container, Segment, Sticky, Grid, Input, GridRow, Divider, GridColumn } from 'semantic-ui-react';
import { Button, Form, Icon, Image, List, Label, Transition, Modal, Dropdown} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { Loader, Dimmer } from 'semantic-ui-react';
import { dbStudents } from '../firebase/firebase';
import axios from 'axios'
import {InfoContext} from '../App'


const SettingsPage = () => {
        const {replies, setReplies, artists, setArtists, messages, setMessages, songs, setSongs, posts, setPosts, likes, setLikes, user, setUser, accesstoken, setAccesToken, refreshtoken, setRefreshToken} = React.useContext(InfoContext);

        return(
                <div>
                        <Container>
                                <Grid centered>
                                        <Grid.Row>
                                             <Header as={'h2'}> Helloooo, {user.name}. What's up?</Header>   
                                        </Grid.Row>
                                        <Grid.Row>
                                                <Header as={'h3'}>So here's the information we have about you: No stalking we promise, haha.</Header>
                                        </Grid.Row>
                                        <Grid.Row>
                                                <Header as={'h4'}>Email: {user.email}</Header>
                                                <Grid.Row>
                                                <Header as={'h4'}>(FYI we also know your top artists/songs but that's just so that we can give you content that's relevant for you lol.) {user.email}</Header>
                                                </Grid.Row>
                                        </Grid.Row>
                                        <Grid.Row>
                                                {user.image==="https://pngimg.com/uploads/music_notes/music_notes_PNG84.png" ? 
                                                <Header>We don't have a picture for your account, but soon we'll allow you to upload one!</Header> : 
                                                <div>
                                                <Header>Here's a beautiful picture of you too :O </Header> 
                                                <Image circular src={user.image} size="large" />
                                                </div>
                                        }
                                        </Grid.Row>

                                </Grid>
                        </Container>
                </div>
        );
        
}
export default SettingsPage;