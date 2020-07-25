import { Redirect } from 'react-router-dom'
import _ from 'lodash'
import React, { useState, useEffect, useContext } from 'react';
import { Container, Label, Header, Divider, Grid, Loader, Button, Image } from 'semantic-ui-react'
import { Router, useParams, Link } from 'react-router-dom';
import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../../App'

const ReturnMessage= React.memo(({messageid}) =>{
        const {user,messages} = React.useContext(InfoContext);
        let item = messages[messageid];
        return(
                <Label floating={item.sender==user.id ? 'left' : 'right'} basic color={item.sender==user.id ?'red' : 'blue'} pointing={item.sender==user.id ? 'left' : 'right'}>
                {item.content}
              </Label>
        )
        
});
export default ReturnMessage;