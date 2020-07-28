import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Button, Segment, Header, Search, Image, Icon, Grid, Label, Divider } from 'semantic-ui-react'
import { InfoContext } from '../../App'
import { dbUsers, dbChats, } from '../../firebase/firebase'


const ReturnPreview = ({ increaseIndex, person }) => {
        const [number, setNumber] = useState(0);
        const [change, setChange] = useState(true);
        const { user, users } = useContext(InfoContext)
        function updateLike() {
                dbUsers.child(user.id).child('seen').push(person['id']);
                if (Object.values(users[person['id']]['interested']).includes(user.id)) {
                        dbUsers.child(user.id).child('matched').push(person['id']);
                        var key = dbChats.push({ person1: user.id, person2: person.id });
                        const k = key.getKey();
                        dbUsers.child(user.id).child('chats').push(k);
                        dbUsers.child(person.id).child('chats').push(k);
                }
                else {
                        dbUsers.child(user.id).child('interested').push(person['id']);
                }
                increaseIndex();
                console.log("IN SIDE")
        }
        // useEffect(() => {
        //         setNumber((number + 1) % 3)
        //         setTimeout(() => {
        //                 setChange(!change);
        //                 // console.log(change);
        //         }, 2000)
        // }, [change])
        const allquestions = ["What's the last song that was stuck in your head?",
        "Who's music taste has been most influential in your life?",
        "Who's the first person you send new music to?",
        "What do you miss most about being at a concert?",
        "What does music mean to you?",
        "What's a genre of music you haven't explored enough but want to revisit?",
        "An artist you’d like to meet?",
        "Your favorite throwback jams?"
      ]
        return (
                <Segment raised>
                        <Header size='huge' textAlign='center' >{person['name']}</Header>
                        <Header size='medium' style={{ marginTop: "5px" }} textAlign='center' >Want to know {person['name']} better? </Header>

                        <Button.Group style={{ marginBottom: "5px" }} fluid>
                                <Button onClick={() => {
                                        increaseIndex()
                                        dbUsers.child(user.id).child('seen').push(person['id']);
                                }} >No</Button>
                                <Button.Or />
                                <Button positive onClick={updateLike}>Yes</Button>
                        </Button.Group>
                        <Grid fluid colums={3}>
                                <Grid.Row>
                                        <Grid.Column width={2}>

                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                                <Image rounded centered src={person['datingimages'][number]} fluid />
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                                <Image rounded centered src={person['datingimages'][number]} fluid />

                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                                <Image rounded centered src={person['datingimages'][number]} fluid />

                                        </Grid.Column>
                                        <Grid.Column width={2}>

                                        </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                               <Grid.Column>
                                        <Header textAlign='center' as='h1' >{person['bio']}</Header>
                                        </Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                        <Grid.Column width={2}>

                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                                <Grid.Row>


                                                <Header as='h3'>
                                                        {allquestions[person['q1']]}
                                                </Header>
                                                </Grid.Row>
                                                <Grid.Row>
                                                        <Divider></Divider>
                                                </Grid.Row>
                                                <Grid.Row>

                                               
                                                <Header as='h2'>
                                                        {person['ans1']}
                                                </Header>
                                                </Grid.Row>
                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                                <Grid.Row>
                                        <Header as='h3'>
                                                        {allquestions[person['q2']]}
                                                </Header>
                                                </Grid.Row>
                                                <Grid.Row>
                                                        <Divider></Divider>
                                                </Grid.Row>
                                                <Grid.Row>

                                               
                                                <Header as='h2'>
                                                        {person['ans2']}
                                                </Header>
                                                </Grid.Row>

                                        </Grid.Column>
                                        <Grid.Column width={4}>
                                        <Grid.Row>
                                        <Header as='h4'>
                                                        {allquestions[person['q3']]}
                                                </Header>
                                                </Grid.Row>
                                                <Grid.Row>
                                                        <Divider></Divider>
                                                </Grid.Row>
                                                <Grid.Row>

                                               
                                                <Header as='h2'>
                                                        {person['ans3']}
                                                </Header>
                                                </Grid.Row>

                                        </Grid.Column>
                                        <Grid.Column width={2}>

                                        </Grid.Column>

                                </Grid.Row>

                        </Grid>

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