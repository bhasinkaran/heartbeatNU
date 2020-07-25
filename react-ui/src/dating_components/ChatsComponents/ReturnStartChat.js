import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Label, Header, Divider, Grid, Loader, Button, Image } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../../App'

const ReturnStartChat = ({chatid})=>
{
        const { allusers,user,chats } = React.useContext(InfoContext);

        const [relevant, setRelevant]=useState("");
        useEffect(()=>
        {
                if(chats[chatid]['person1']==user.id){
                        setRelevant(allusers.find( doc=>doc.id==chats[chatid]['person2']))
                }
                else{
                        setRelevant(allusers.find( doc=>doc.id==chats[chatid]['person1']))
                }
                
        }, [allusers,chats,chatid]);
        useEffect(()=>{
                console.log(relevant);
        },[relevant]);
        return(
                <Segment>
                        Start your first message with {relevant['fname']}
                </Segment>
 
        )
}
export default ReturnStartChat;