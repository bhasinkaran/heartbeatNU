import axios from 'axios'
import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Card, Header, Search, Image, Icon, Grid, Label } from 'semantic-ui-react'


import SongsPreview from './songspreview'

const ReturnPreview = ({ person }) => {

        const [number, setNumber] = useState(0);
        const [change, setChange] = useState(true);

        useEffect(() => {
                setNumber((number + 1) % 3)
                setTimeout(() => {
                        setChange(!change);
                        console.log(change);
                }, 2000)
        }, [change])

        return (
                <div>
                        <Card fluid>
                                <Image rounded centered src={person['datingimages'][number]} fluid size='huge' />
                                {/* wrapped ui={false}  */}
                                <Card.Content>
                                        <Card.Header>{person['name']}</Card.Header>

                                        <Card.Description>
                                                <Header>Favorite Songs</Header>
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