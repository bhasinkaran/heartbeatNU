import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Label, Header, Divider, Grid, Loader, Button, Image } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../../App'

const ReturnMessage = React.memo(({ otherpersonid, chatid, lastMine, lastTheirs, messageid }) => {
        const { user, messages, chats, allusers } = React.useContext(InfoContext);
        let item = messages[messageid];
        let length = item.content.length;
        let theirid = otherpersonid;
        // console.log(otherpersonid);
        // console.log(lastMine);
        // console.log(lastTheirs);
        if(allusers && theirid){
                // console.log(allusers.find(item => item.id == theirid).datingimages[0])
                // console.log(allusers.find(item => item.id == theirid))
                // console.log(user.datingimages[0])
        }
        

        // console.log(item.senderid == user.id)

        if (user!=null && messages!=null && chats!=null && allusers!=null)
                return (
                        <Grid.Column width={5} floated={item.senderid == user.id ? 'right' : 'left'}>
                                 {/* {messageid == lastMine ? <Image floated='right' size='mini' avatar src={user.datingimages[0]} /> : ""}
                                {messageid == lastTheirs && theirid!=""? <Image floated='mini'  size='small' avatar src={allusers.find(item => item.id == theirid).datingimages[0]} /> : ""}
                                 */}
                                 <Segment
                                 
                                        style={{
                                                "border-radius": "25px",
                                                "max-width": "300px",
                                                "word-wrap": "break-word",
                                        }}
                                        inverted
                                        rounded basic color={item.senderid == user.id ? 'red' : 'blue'} >
                                      {/*float: `${item.senderid == user.id ? 'right' : 'left'}`  */}
                                        <Header as='h5' style={{ "marginTop":"-10px"}} >{item.content}</Header>
                                </Segment>
                        </Grid.Column>






                )
                else{
                        console.log(user);
                        console.log(messages);
                        console.log(chats);
                        console.log(allusers);
                        console.log(user && messages & chats & allusers)
                        return('loading');
                }

});
export default ReturnMessage;

{/* <div style={{background: "#4CAF50",
  color: "white",
  padding: "15px",
  width: "50%",
  height: "50px",
  overflow: "scroll",
  "overflow-wrap": "break-word",
  border: "1px solid #ccc"
  }}>{item.content}</div> */}