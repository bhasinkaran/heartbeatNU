import { Header, Segment, Grid, Icon, Search } from 'semantic-ui-react';
import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import _ from 'lodash'
import axios from 'axios'
import { InfoContext } from '../App'
import { Sidebar } from 'semantic-ui-react'
import { Button, Dropdown, Menu } from 'semantic-ui-react'




const PageHeaderDating = () => {
  const {users, user,  accesstoken, refreshtoken, setNoMatchModal, setNoMessagesModal } = React.useContext(InfoContext);
  const [activeItem, setActiveItem] = useState('home');
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [result, setResult] = useState("");
  const [redirectLogout, setRedirectLogout] = useState(false);
  const [redirectSettings, setRedirectSettings] = useState(false);
  const [logout, setLogout] = useState(false);
  const [home, setRedirectHome] = useState(false);
  function switchActive(){
    if(activeItem=='messages'){
      setNoMessagesModal(true);
    }
    if(activeItem=='matches'){
      setNoMatchModal(true);
    }
    setActiveItem('home');
    return(<Redirect to={`/dating/home/${user.id}/${accesstoken}/${refreshtoken}`} push={true} />)
  }

  return (
    <div style={{marginBottom:"-10px"}} >
      
      <Grid centered >
        <Grid.Row>
          
          <Grid.Column width='16'>
            <Menu inverted color={'purple'} size='large' widths={4} >
              <Menu.Item
                name='Up Next LOGO'
                
              />
              <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={() => setActiveItem('home')}
              />
              <Menu.Item
                name='messages'
                active={activeItem === 'messages'}
                onClick={() => setActiveItem('messages')}
              />
              <Menu.Item
                name='Matches'
                active={activeItem === 'matches'}
                onClick={() => setActiveItem('matches')}
              />

            </Menu>
          </Grid.Column>
        </Grid.Row>
      </Grid>



      { redirectLogout ? <Redirect to={`/`} push={true} /> : "" }
  { redirectSettings ? <Redirect to={`/settings`} push={true} /> : "" }
  { activeItem === 'home' && user && accesstoken && refreshtoken? <Redirect to={`/dating/home/${user.id}/${accesstoken}/${refreshtoken}`} push={true} /> : "" }
  { activeItem === 'messages' &&  user && users[user.id]['chats']? <Redirect to={`/dating/messages`} push={true} /> : 
   activeItem === 'messages' ? switchActive() : "" }
   { activeItem === 'matches' &&  user && users[user.id]['matches']? <Redirect to={`/dating/matches`} push={true} /> : 
   activeItem === 'matches' ? 
   switchActive()
    : "" }

    </div >

  );
};

export default PageHeaderDating;