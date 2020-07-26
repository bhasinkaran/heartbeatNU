import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Header, Divider, Grid, Loader, Button, Image } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../../App'
import ReturnMessage from './ReturnMessage'

const ReturnChats = ({ chatid }) => {
        const { chats } = React.useContext(InfoContext);
        let rel_messages = Object.values(chats[chatid]['chats']).slice(-5);

        return (
                <Container>
                        <Grid padded >
                                <Grid.Column>
                                        <Grid padded>
                                                <Grid.Column>
                                                        <Grid padded>
                                                                {rel_messages.map(index =>
                                                                        <ReturnMessage messageid={index} >
                                                                        </ReturnMessage>)}
                                                        </Grid>
                                                </Grid.Column>
                                        </Grid>
                                </Grid.Column>
                                {/* <Grid.Column> */}

                                {/* </Grid.Column> */}
                        </Grid>
                </Container>
        )
}
export default ReturnChats;