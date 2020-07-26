import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Label, Header, Divider, Grid, Loader, Button, Image } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../../App'

const ReturnMessage = React.memo(({ messageid }) => {
        const { user, messages } = React.useContext(InfoContext);
        let item = messages[messageid];
        let length = item.content.length;
        console.log(item.senderid == user.id)
        return (
               
                       
                <Grid.Column width={5} floated={item.senderid == user.id ? 'right' : 'left'}>
                        <Segment 
                                style={{
                                        "border-radius": "25px", 
                                        "max-width": "300px",
                                        "word-wrap": "break-word",
                                }}
                                inverted 
                                rounded basic color={item.senderid == user.id ? 'red' : 'blue'} >
                                <Header>{item.content}</Header>
                        </Segment>
                        </Grid.Column>
                        
                        
                      
                       

                
        )

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