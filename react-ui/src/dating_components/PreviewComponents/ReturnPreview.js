import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card,Button, Segment, Header, Search, Image, Icon, Grid, Label } from 'semantic-ui-react'
import {InfoContext} from '../../App'
import {dbUsers} from '../../firebase/firebase'

import SongsPreview from './songspreview'

const ReturnPreview = ({increaseIndex, person }) => {
        const [number, setNumber] = useState(0);
        const [change, setChange] = useState(true);
        const {user}= useContext(InfoContext)
        function updateLike(){
                dbUsers.child(user.id).child('interested').push(person['id']);
                dbUsers.child(user.id).child('seen').push(person['id']);

                increaseIndex();
                console.log("IN SIDE")
        }
        useEffect(() => {
                setNumber((number + 1) % 3)
                setTimeout(() => {
                        setChange(!change);
                        console.log(change);
                }, 2000)
        }, [change])

        return (
                <Segment raised>
                        <Header size='huge' textAlign='center' >{person['name']}</Header>
                        <Header size='medium' style={{marginTop:"5px"}} textAlign='center' >Want to know {person['name']} better? </Header>

                        <Button.Group style={{marginBottom:"5px"}} fluid>
                                <Button onClick={()=>{
                                        increaseIndex()
                                        dbUsers.child(user.id).child('seen').push(person['id']);
                                }} >No</Button>
                                <Button.Or />
                                <Button positive onClick={updateLike}>Yes</Button>
                        </Button.Group>
                        <Image rounded centered src={person['datingimages'][number]} fluid size='huge' />
                        
                </Segment>
                // <div>
                //         <Card fluid>
                //                 {/* wrapped ui={false}  */}
                //                 <Card.Content>
                //                         <Card.Header size='massive' >{person['name']}</Card.Header>

                //                         <Card.Description>
                //                                 {/* <Header>Favorite Songs</Header> */}
                //                                 {/* <SongsPreview person={person} /> */}

                //                                 {/* {person['favoritesongs'].map(id=>getSong(id))} */}
                //                         </Card.Description>
                //                 </Card.Content>
                //                 <Image rounded centered src={person['datingimages'][number]} fluid size='huge' />

                //                 {/* <Card.Content extra>
                //                         <a>
                //                                 <Icon name='user' />
                //                                         22 Friends
                //                                  </a>
                //                 </Card.Content> */}
                //         </Card>
                // </div>
        );

}
export default ReturnPreview