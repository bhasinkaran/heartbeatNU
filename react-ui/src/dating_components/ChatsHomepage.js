import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Header, Divider, Grid, Loader, Button, Image, TextArea } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../App'
import ReturnChats from './ChatsComponents/ReturnChats'
import ReturnStartChat from  './ChatsComponents/ReturnStartChat'
import { dbChats, dbMessages } from '../firebase/firebase';
import WriteMessage from './ChatsComponents/WriteMessage';

const ChatsHomepage = () => {
        const { user, users, allusers, chats, messages } = React.useContext(InfoContext);
        const [activeItem, setActiveItem] = useState("");
        const [relevantChats, setRelevantChats] = useState([]);
        useEffect(() => {
                if (user && users) {
                        setRelevantChats(Object.values(users[user.id]['chats']));
                }
        }, [user, users])
        useEffect(() => {
                if (relevantChats.length > 0) {
                        setActiveItem(relevantChats[0]);
                }
        }, [relevantChats])
       
        if (user && users && chats && allusers&&activeItem)
                return (
                        <div>
                                
                                <Segment >
                                        {/* style={{ overflow: 'auto', maxHeight: 200 }} */}
                                        <Grid columns={2}>
                                                <Grid.Column width={3}>
                                                <Menu pointing vertical>
                                                {relevantChats.map(chatid => {
                                                        console.log(allusers)
                                                        var otherid = chats[chatid]['person2'] == user.id ? chats[chatid]['person1'] : chats[chatid]['person2'];
                                                        var obj = allusers.find(item => item.id = otherid)
                                                        // console.log(obj);
                                                        // console.log(otherid);

                                                        return (<Menu.Item
                                                                name={obj['fname']}
                                                                active={activeItem === chatid}
                                                                onClick={() => setActiveItem(chatid)}
                                                        />)
                                                })}

                                        </Menu>

                                                </Grid.Column>
                                                <Grid.Column width={13}>
                                                       
                                                        <Segment style={{maxHeight:"600px"}} fluid>
                                                                {chats[activeItem]['chats'] ? 
                                                                                 <ReturnChats chatid={activeItem}/> 
                                                                                : 
                                                                                <ReturnStartChat chatid={activeItem} />}
                                                                
                                                        </Segment>
                                                        <Segment fluid>
                                                               <WriteMessage chatid={activeItem}/>
                                                        </Segment>
                                                        
                                                       
                                                </Grid.Column>
                                        </Grid>
                                        

                                </Segment>
                        </div>
                )
        else {
                return <div>Not loaded</div>
        }
}

export default ChatsHomepage;