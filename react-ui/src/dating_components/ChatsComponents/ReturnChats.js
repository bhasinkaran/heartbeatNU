import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Header, Divider, Grid, Loader, Button, Image } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../../App'
import ReturnMessage from './ReturnMessage'

const ReturnChats = ({ otherpersonid,chatid }) => {
        const { chats,messages,allusers ,user} = React.useContext(InfoContext);
        let rel_messages = Object.values(chats[chatid]['chats']);
        const[lastMine, setLastMine]=useState("");
        const[lastTheirs, setLastTheirs]=useState("");
        let person1=false; 
        let person2=false; 
        const theyArePerson1=chats[chatid]['person2']==user.id ? true : false;
        useEffect(()=>{
                for(let i=rel_messages.length-1; i>=0;i--)
                {
                        if(messages[rel_messages[i]]['senderid']==chats[chatid]['person1']  && !person1){
                                if(chats[chatid]['person1']==user.id){
                                        setLastMine(rel_messages[i]);
                                        
                                }
                                else{
                                        setLastTheirs(rel_messages[i]);
                                }
                                person1=true;
                        }
                        if(messages[rel_messages[i]]['senderid']==chats[chatid]['person2'] && !person2){
                                if(chats[chatid]['person2']==user.id){
                                        setLastMine(rel_messages[i]);
                                }
                                else{
                                        setLastTheirs(rel_messages[i]);
                                }
                                person2=true;
                        }
                }
        },[rel_messages, chats, messages] )
        


        return (
                <Container>
                        <Grid >
                                        
                                                        {rel_messages.map(index =>
                                                                <Grid.Row style={{marginTop:"1px", "padding":"1px"}}>
                                                                        <ReturnMessage key={index} lastMine={lastMine} chatid={chatid} otherpersonid={otherpersonid} lastTheirs={lastTheirs} messageid={index} >
                                                                        </ReturnMessage>
                                                                </Grid.Row>
                                                                
                                                                )}
                                        
                        </Grid>
                </Container>
        )
}
export default ReturnChats;