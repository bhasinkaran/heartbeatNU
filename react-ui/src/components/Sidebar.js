import { Icon, Menu, Segment, Sidebar } from 'semantic-ui-react'
import { InfoContext } from '../App'
import { Router, useParams, Link } from 'react-router-dom';
import React, { useState, useEffect, useContext } from 'react';

const  SideBar=() =>{
        const { visible, setVisible, user, accesstoken } = React.useContext(InfoContext);

        return <Sidebar
        as={Menu}
        animation='overlay'
        icon='labeled'
        inverted
        onHide={() => setVisible(false)}
        vertical
        visible={visible}
        width='thin'
>
        <Menu.Item as={Link} to={`/${user.id}/${accesstoken}`} onClick={()=> setTimeout(() => setVisible(false), 500)}> 
                <Icon name='home' />
Home
</Menu.Item>
<Menu.Item as={Link} to='/tracks' onClick={()=> setTimeout(() => setVisible(false), 500)}> 
                <Icon name='chat' />
Songs
</Menu.Item>
{/* as={Link} to='/student/profile' */}
        <Menu.Item as={Link} to='/artists' onClick={()=>setTimeout(() => setVisible(false), 500)} >
                <Icon name='street view' />
Artits
</Menu.Item>
{/* as={Link} to='/student/goals' */}
        <Menu.Item  onClick={()=>setTimeout(() => setVisible(false), 500)} >
                <Icon name='bolt' />
Goals
</Menu.Item>
{/* as={Link} to='/student/requests' */}
        {/* <Menu.Item  onClick={()=>setTimeout(() => setVisible(false), 500)} >
                <Icon name='question' />
Requests
</Menu.Item> */}
        {/* <Menu.Item as={Link} to='/student/coaches' onClick={()=>setTimeout(() => setVisible(false), 500)} >
                <Icon name='address card' />
Coaches
</Menu.Item> */}
        {/* <Menu.Item as={Link} to='/student/colleges'onClick={()=>setTimeout(() => setVisible(false), 500)} >
                <Icon name='paper plane' />
Colleges
</Menu.Item>
<Menu.Item onClick={()=>setTimeout(() => setVisible(false), 500)} >
                <Icon name='paper plane' />
Milestones
</Menu.Item> */}
</Sidebar>
}
export default SideBar;